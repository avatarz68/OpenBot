import { afterAll, beforeAll, expect, test } from "bun:test";
import { loadConfig } from "../src/config";
import { startHttpServer } from "../src/http-server";
import { createLocalPlatform } from "../src/local-platform/platform";
import { MemoryThreadStore } from "../src/local-platform/store";
import { testEnvironment } from "./support/environment";

/**
 * A browser on another machine reaches the embedded platform through the server's own port, because
 * the platform listens on loopback. The socket is relayed, and the browser's first frame, the
 * channel join, must not be lost while the relay's inward socket is still opening.
 */

let platform: ReturnType<typeof Bun.serve>;
let front: { stop(closeActiveConnections?: boolean): Promise<void> };
let frontPort: number;
let platformPort: number;

async function freePort() {
  const probe = Bun.serve({ port: 0, fetch: () => new Response("") });
  const found = probe.port as number;
  probe.stop(true);
  return found;
}

beforeAll(async () => {
  platformPort = await freePort();
  frontPort = await freePort();
  const local = createLocalPlatform({ store: new MemoryThreadStore() });
  platform = Bun.serve({
    hostname: "127.0.0.1",
    port: platformPort,
    fetch: (request, server) => local.fetch(request, server as never) as never,
    websocket: local.websocket as never,
  });
  const config = loadConfig(
    testEnvironment({
      INTELLIGENCE_MODE: "local",
      LOCAL_PLATFORM_PORT: String(platformPort),
      OPENBOT_PUBLIC_URL: "https://bots.example.com",
    }),
  );
  expect(config.runtime.intelligence.browserGatewayWsUrl).toBe(
    "wss://bots.example.com/api/local-platform/client",
  );
  front = startHttpServer({
    port: frontPort,
    config,
    resolveRequestActor: async () => ({ id: "u", name: "u", role: "user" }),
    agentProfileStore: {} as never,
    computerGateway: undefined,
    app: { fetch: () => new Response("not found", { status: 404 }) },
  });
});

afterAll(async () => {
  await front.stop(true);
  platform.stop(true);
});

test("the browser's join arrives through the relay on its first frame", async () => {
  const base = `http://127.0.0.1:${platformPort}`;
  await fetch(`${base}/api/threads`, {
    method: "POST",
    body: JSON.stringify({ threadId: "g1", userId: "a", agentId: "x" }),
  });
  const { joinToken } = (await (
    await fetch(`${base}/api/threads/g1/connect`, {
      method: "POST",
      body: JSON.stringify({ userId: "a", agentId: "x" }),
    })
  ).json()) as { joinToken: string };

  const socket = new WebSocket(
    `ws://127.0.0.1:${frontPort}/api/local-platform/client/websocket?join_token=${joinToken}`,
  );
  const frames: unknown[][] = [];
  socket.onmessage = (message) => frames.push(JSON.parse(String(message.data)));
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = () => reject(new Error("the relay refused the socket"));
  });
  // Sent the moment the socket opens, as the browser's Phoenix client does.
  socket.send(
    JSON.stringify([
      "1",
      "1",
      "thread:g1",
      "phx_join",
      { stream_mode: "connect", last_seen_event_id: null },
    ]),
  );
  const deadline = Date.now() + 5000;
  while (
    Date.now() < deadline &&
    !frames.some((frame) => frame[3] === "replay_complete")
  )
    await Bun.sleep(25);
  socket.close();

  expect(frames.find((f) => f[3] === "phx_reply")?.[4]).toMatchObject({
    status: "ok",
  });
  expect(frames.some((f) => f[3] === "replay_complete")).toBe(true);
});

test("a forged token is refused by the platform behind the relay", async () => {
  const socket = new WebSocket(
    `ws://127.0.0.1:${frontPort}/api/local-platform/client/websocket?join_token=forged`,
  );
  const outcome = await new Promise<string>((resolve) => {
    socket.onopen = () => {
      // The relay accepts the upgrade first; the platform's refusal closes the socket behind it.
      socket.onclose = () => resolve("closed");
    };
    socket.onerror = () => resolve("refused");
    setTimeout(() => resolve("still open"), 3000);
  });
  socket.close();
  expect(["closed", "refused"]).toContain(outcome);
});
