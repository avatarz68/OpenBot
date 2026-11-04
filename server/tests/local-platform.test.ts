import { afterAll, beforeAll, expect, test } from "bun:test";
import { CopilotKitIntelligence } from "@copilotkit/runtime/v2";
import { createLocalPlatform } from "../src/local-platform/platform";
import { MemoryThreadStore } from "../src/local-platform/store";

let server: ReturnType<typeof Bun.serve>;
let client: CopilotKitIntelligence;
let base: string;

beforeAll(() => {
  const platform = createLocalPlatform({ store: new MemoryThreadStore() });
  server = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    fetch: (request, srv) => platform.fetch(request, srv as never) as never,
    websocket: platform.websocket as never,
  });
  base = `http://127.0.0.1:${server.port}`;
  client = new CopilotKitIntelligence({
    apiUrl: base,
    wsUrl: `ws://127.0.0.1:${server.port}/runner`,
    apiKey: "local",
  });
});

afterAll(() => server.stop(true));

function converse(topic: string, frames: unknown[][]) {
  return new Promise<unknown[][]>((resolve, reject) => {
    const socket = new WebSocket(
      `ws://127.0.0.1:${server.port}/runner/websocket`,
      "phoenix",
    );
    const replies: unknown[][] = [];
    socket.onopen = () => {
      for (const frame of frames) socket.send(JSON.stringify(frame));
    };
    socket.onmessage = (message) => {
      replies.push(JSON.parse(String(message.data)));
      if (replies.length === frames.length) {
        socket.close();
        resolve(replies);
      }
    };
    socket.onerror = () => reject(new Error(`socket error on ${topic}`));
  });
}

test("a thread is created, found, renamed and listed for its owner only", async () => {
  const { thread, created } = await client.getOrCreateThread({
    threadId: "t1",
    userId: "alice",
    agentId: "ppp-transaction-advisor",
  });
  expect(created).toBe(true);
  expect(thread.id).toBe("t1");

  const again = await client.getOrCreateThread({
    threadId: "t1",
    userId: "alice",
    agentId: "ppp-transaction-advisor",
  });
  expect(again.created).toBe(false);

  await client.updateThread({
    threadId: "t1",
    userId: "alice",
    agentId: "ppp-transaction-advisor",
    updates: { name: "Kyiv water PPP" },
  });
  const mine = await client.listThreads({
    userId: "alice",
    agentId: "ppp-transaction-advisor",
  });
  expect(mine.threads.map((t) => t.name)).toEqual(["Kyiv water PPP"]);
  const theirs = await client.listThreads({
    userId: "bob",
    agentId: "ppp-transaction-advisor",
  });
  expect(theirs.threads).toEqual([]);
});

test("a second run is refused while the first holds the lock", async () => {
  await client.getOrCreateThread({ threadId: "t2", userId: "a", agentId: "x" });
  const held = await client.ɵacquireThreadLock({
    threadId: "t2",
    runId: "r1",
    userId: "a",
    agentId: "x",
  });
  expect(held.runId).toBe("r1");
  await expect(
    client.ɵacquireThreadLock({
      threadId: "t2",
      runId: "r2",
      userId: "a",
      agentId: "x",
    }),
  ).rejects.toMatchObject({ status: 409 });
  await client.ɵcleanupThreadLock({ threadId: "t2", runId: "r1" });
  const next = await client.ɵacquireThreadLock({
    threadId: "t2",
    runId: "r2",
    userId: "a",
    agentId: "x",
  });
  expect(next.runId).toBe("r2");
});

test("events pushed by a runner become the thread's message history", async () => {
  await client.getOrCreateThread({ threadId: "t3", userId: "a", agentId: "x" });
  const run = (event: string, payload: unknown) => [
    "1",
    "2",
    "ingestion:r1",
    event,
    payload,
  ];
  await converse("ingestion:r1", [
    ["1", "1", "ingestion:r1", "phx_join", { thread_id: "t3", run_id: "r1" }],
    run("event", {
      type: "RUN_STARTED",
      threadId: "t3",
      runId: "r1",
      input: {
        messages: [{ id: "u1", role: "user", content: "Welche Phase?" }],
      },
    }),
    run("event", {
      type: "TEXT_MESSAGE_START",
      messageId: "a1",
      role: "assistant",
    }),
    run("event", {
      type: "TEXT_MESSAGE_CONTENT",
      messageId: "a1",
      delta: "Projekt",
    }),
    run("event", {
      type: "TEXT_MESSAGE_CONTENT",
      messageId: "a1",
      delta: "definition.",
    }),
    run("event", { type: "TEXT_MESSAGE_END", messageId: "a1" }),
    run("event", { type: "RUN_FINISHED", threadId: "t3", runId: "r1" }),
  ]);

  const history = await client.getThreadMessages({
    threadId: "t3",
    userId: "a",
  });
  expect(
    history.messages.map((m) => [m.role, (m as { content?: string }).content]),
  ).toEqual([
    ["user", "Welche Phase?"],
    ["assistant", "Projektdefinition."],
  ]);
});

test("the platform reports no entitlements, so memory stays in OpenBot", async () => {
  const response = await fetch(`${base}/api/entitlements/runtime`);
  expect(response.status).toBe(200);
});
