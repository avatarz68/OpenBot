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

test("the platform is licensed but offers no features, so memory stays in OpenBot", async () => {
  const response = await fetch(`${base}/api/entitlements/runtime`);
  expect(response.status).toBe(200);
  const body = (await response.json()) as {
    status: string;
    entitlement: { active: boolean; features: Record<string, boolean> };
  };
  expect(body.status).toBe("ready");
  expect(body.entitlement.active).toBe(true);
  // `features.memory` is what OpenBot reads to use Intelligence memory; it must be absent.
  expect(body.entitlement.features.memory).toBeUndefined();
});

/** A Phoenix client that records every frame it receives, as a browser would. */
function openSocket(path: string) {
  return new Promise<{
    socket: WebSocket;
    frames: unknown[][];
    send: (frame: unknown[]) => void;
    until: (predicate: (frames: unknown[][]) => boolean) => Promise<void>;
  }>((resolve, reject) => {
    const socket = new WebSocket(
      `ws://127.0.0.1:${server.port}${path}`,
      "phoenix",
    );
    const frames: unknown[][] = [];
    const waiters: (() => void)[] = [];
    socket.onmessage = (message) => {
      frames.push(JSON.parse(String(message.data)));
      for (const wake of waiters.splice(0)) wake();
    };
    socket.onerror = () => reject(new Error(`could not open ${path}`));
    socket.onopen = () =>
      resolve({
        socket,
        frames,
        send: (frame) => socket.send(JSON.stringify(frame)),
        until: (predicate) =>
          new Promise((done, fail) => {
            const timer = setTimeout(
              () => fail(new Error(`timed out; saw ${JSON.stringify(frames)}`)),
              4000,
            );
            const check = () => {
              if (predicate(frames)) {
                clearTimeout(timer);
                done();
              } else waiters.push(check);
            };
            check();
          }),
      });
  });
}

const eventsOf = (frames: unknown[][], name = "ag_ui_event") =>
  frames.filter((f) => f[3] === name).map((f) => f[4] as { type: string });

test("a browser needs a valid join token and only for its own thread", async () => {
  await client.getOrCreateThread({ threadId: "t4", userId: "a", agentId: "x" });
  const refused = await fetch(
    `http://127.0.0.1:${server.port}/client/websocket?join_token=forged`,
  );
  expect(refused.status).toBe(401);

  const connect = (await (
    await fetch(`${base}/api/threads/t4/connect`, {
      method: "POST",
      body: JSON.stringify({ userId: "a", agentId: "x" }),
    })
  ).json()) as { joinToken: string };
  const { frames, send, until } = await openSocket(
    `/client/websocket?join_token=${connect.joinToken}`,
  );
  send(["1", "1", "thread:someone-elses", "phx_join", {}]);
  await until((f) => f.some((x) => x[3] === "phx_reply"));
  expect(
    (frames.find((f) => f[3] === "phx_reply")?.[4] as { status: string })
      .status,
  ).toBe("error");
});

test("a browser replays history, follows a live run and can stop it", async () => {
  await client.getOrCreateThread({ threadId: "t5", userId: "a", agentId: "x" });

  // The runner delivers the first run completely before anyone watches.
  const runner = await openSocket("/runner/websocket");
  runner.send(["1", "1", "ingestion:r1", "phx_join", { thread_id: "t5" }]);
  const stamp = (id: string, event: Record<string, unknown>) => ({
    ...event,
    runId: "r1",
    metadata: { cpki_event_id: id, cpki_event_seq: 1 },
  });
  for (const [i, event] of [
    { type: "RUN_STARTED", threadId: "t5", input: { messages: [] } },
    { type: "RUN_FINISHED", threadId: "t5" },
  ].entries())
    runner.send([
      "1",
      String(i + 2),
      "ingestion:r1",
      "event",
      stamp(`e${i}`, event),
    ]);
  await runner.until((f) => f.length >= 3);

  const token = async () =>
    (
      (await (
        await fetch(`${base}/api/threads/t5/connect`, {
          method: "POST",
          body: JSON.stringify({ userId: "a", agentId: "x" }),
        })
      ).json()) as { joinToken: string }
    ).joinToken;

  // Connecting later replays the finished run, then says it is complete and idle.
  const viewer = await openSocket(
    `/client/websocket?join_token=${await token()}`,
  );
  viewer.send([
    "9",
    "9",
    "thread:t5",
    "phx_join",
    { stream_mode: "connect", last_seen_event_id: null },
  ]);
  await viewer.until((f) => f.some((x) => x[3] === "stream_idle"));
  expect(eventsOf(viewer.frames).map((e) => e.type)).toEqual([
    "RUN_STARTED",
    "RUN_FINISHED",
  ]);
  expect(viewer.frames.some((f) => f[3] === "replay_complete")).toBe(true);

  // Resuming from the last event sees nothing twice.
  const resumed = await openSocket(
    `/client/websocket?join_token=${await token()}`,
  );
  resumed.send([
    "9",
    "9",
    "thread:t5",
    "phx_join",
    { stream_mode: "connect", last_seen_event_id: "e1" },
  ]);
  await resumed.until((f) => f.some((x) => x[3] === "stream_idle"));
  expect(eventsOf(resumed.frames)).toEqual([]);

  // A second run is followed live, and a stop reaches the runner that is delivering it.
  runner.send(["1", "20", "ingestion:r2", "phx_join", { thread_id: "t5" }]);
  const live = await openSocket(
    `/client/websocket?join_token=${await token()}`,
  );
  live.send([
    "7",
    "7",
    "thread:t5",
    "phx_join",
    { stream_mode: "run", run_id: "r2" },
  ]);
  await live.until((f) => f.some((x) => x[3] === "phx_reply"));
  runner.send([
    "1",
    "21",
    "ingestion:r2",
    "event",
    {
      type: "RUN_STARTED",
      threadId: "t5",
      runId: "r2",
      metadata: { cpki_event_id: "f0", cpki_event_seq: 1 },
    },
  ]);
  await live.until((f) => eventsOf(f).some((e) => e.type === "RUN_STARTED"));

  live.send(["7", "8", "thread:t5", "stop_run", { run_id: "r2" }]);
  await runner.until((f) => f.some((x) => x[3] === "ag-ui"));
  expect(runner.frames.find((f) => f[3] === "ag-ui")?.[4]).toEqual({
    type: "CUSTOM",
    name: "stop",
  });

  for (const s of [runner, viewer, resumed, live]) s.socket.close();
});
