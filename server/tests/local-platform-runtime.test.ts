import { afterAll, beforeAll, expect, test } from "bun:test";
import type { RunAgentInput } from "@ag-ui/client";
import { createActorAgentResolver } from "../src/agents/agent-resolver";
import { createAgentFetch } from "../src/agents/endpoint";
import { loadConfig } from "../src/config";
import { mountCopilotRuntime, registeredAgentFromRow } from "../src/copilot";
import { createLocalPlatform } from "../src/local-platform/platform";
import { MemoryThreadStore } from "../src/local-platform/store";
import { testEnvironment } from "./support/environment";

/**
 * The runtime, run in `INTELLIGENCE_MODE=local`, against the embedded platform and nothing else.
 *
 * A person's message goes through the real runtime handler to a Bot that answers over AG-UI. What
 * comes back is read the two ways the product reads it: the message history over REST, and the
 * browser's realtime join with the token the run response handed out.
 */

let bot: ReturnType<typeof Bun.serve>;
let platform: ReturnType<typeof Bun.serve>;
let port: number;

async function freePort() {
  const probe = Bun.serve({ port: 0, fetch: () => new Response("") });
  const found = probe.port as number;
  probe.stop(true);
  return found;
}

beforeAll(async () => {
  bot = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    async fetch(request) {
      const input = (await request.json()) as RunAgentInput;
      const events = [
        { type: "RUN_STARTED", threadId: input.threadId, runId: input.runId },
        { type: "TEXT_MESSAGE_START", messageId: "reply", role: "assistant" },
        {
          type: "TEXT_MESSAGE_CONTENT",
          messageId: "reply",
          delta: "Phase eins ist die Projektdefinition.",
        },
        { type: "TEXT_MESSAGE_END", messageId: "reply" },
        { type: "RUN_FINISHED", threadId: input.threadId, runId: input.runId },
      ];
      return new Response(
        events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join(""),
        { headers: { "content-type": "text/event-stream" } },
      );
    },
  });
  port = await freePort();
});

afterAll(() => {
  bot.stop(true);
  platform?.stop(true);
});

test("a run in local mode is stored and can be replayed to a browser", async () => {
  const config = loadConfig(
    testEnvironment({
      INTELLIGENCE_MODE: "local",
      LOCAL_PLATFORM_PORT: String(port),
    }),
  );
  expect(config.runtime.platform).toBe("local");

  const local = createLocalPlatform({
    store: new MemoryThreadStore(),
    apiKey: config.runtime.intelligence.apiKey,
  });
  platform = Bun.serve({
    hostname: "127.0.0.1",
    port,
    fetch: (request, server) => local.fetch(request, server as never) as never,
    websocket: local.websocket as never,
  });

  const agent = registeredAgentFromRow({
    id: "advisor",
    name: "advisor",
    type: "remote_ag_ui",
    configuration: { endpoint: `http://127.0.0.1:${bot.port}/advisor/ag-ui` },
    title: "Advisor",
    roleDescription: "Answer.",
  });
  if (agent?.type !== "remote_ag_ui") throw new Error("bot did not parse");

  const person = { id: "colleague", name: "Colleague" };
  const runtime = mountCopilotRuntime(
    config,
    createActorAgentResolver({
      model: { provider: "openai", defaultModel: "unused" },
      loadAgents: async () => [agent],
      resolveModelApiKey: async () => null,
      agentFetch: createAgentFetch({ allowPrivateHosts: true }),
    }),
    async () => person,
    async () => ({ id: person.id, role: "user" }),
  );

  const response = await runtime.handler.fetch(
    new Request("http://127.0.0.1/api/copilotkit/agent/advisor/run", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        threadId: "thread-1",
        runId: "run-1",
        state: {},
        messages: [{ id: "ask", role: "user", content: "Welche Phase?" }],
        tools: [],
        context: [],
        forwardedProps: {},
      } satisfies RunAgentInput),
    }),
  );
  expect(response.status).toBe(200);
  const credentials = (await response.json()) as {
    joinToken: string;
    realtime: { clientUrl: string; topic: string };
  };
  expect(credentials.realtime.topic).toBe("thread:thread-1");

  // The history over REST, once the runner has delivered everything.
  const authorization = {
    Authorization: `Bearer ${config.runtime.intelligence.apiKey}`,
  };
  let messages: { role: string; content?: string }[] = [];
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const read = (await (
      await fetch(
        `http://127.0.0.1:${port}/api/threads/thread-1/messages?userId=colleague`,
        { headers: authorization },
      )
    ).json()) as { messages: typeof messages };
    messages = read.messages;
    if (messages.some((m) => m.role === "assistant")) break;
    await Bun.sleep(25);
  }
  expect(messages.map((m) => [m.role, m.content])).toEqual([
    ["user", "Welche Phase?"],
    ["assistant", "Phase eins ist die Projektdefinition."],
  ]);

  // The browser's side: join with the token the run handed out and read the run back.
  const socket = new WebSocket(
    `${credentials.realtime.clientUrl}/websocket?join_token=${credentials.joinToken}`,
    "phoenix",
  );
  const seen: unknown[][] = [];
  socket.onmessage = (m) => seen.push(JSON.parse(String(m.data)));
  await new Promise((resolve) => {
    socket.onopen = resolve;
  });
  socket.send(
    JSON.stringify([
      "1",
      "1",
      "thread:thread-1",
      "phx_join",
      { stream_mode: "connect", last_seen_event_id: null },
    ]),
  );
  const finished = Date.now() + 5_000;
  while (Date.now() < finished && !seen.some((f) => f[3] === "replay_complete"))
    await Bun.sleep(25);
  socket.close();
  const types = seen
    .filter((f) => f[3] === "ag_ui_event")
    .map((f) => (f[4] as { type: string }).type);
  expect(types).toContain("RUN_STARTED");
  expect(types).toContain("RUN_FINISHED");
});
