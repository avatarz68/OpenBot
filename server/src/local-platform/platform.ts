import { foldMessages } from "./fold";
import type { StoredEvent, StoredThread, ThreadStore } from "./store";

/**
 * An embedded thread platform for deployments that run without CopilotKit Intelligence.
 *
 * It answers the part of the Intelligence contract that OpenBot's runtime and browser use for
 * conversations, in the same wire format, so `@copilotkit/runtime` and the browser SDK run against
 * it unchanged (point `INTELLIGENCE_API_URL` and `INTELLIGENCE_GATEWAY_WS_URL` at it):
 *
 * - REST under `/api/threads`: thread records, the message history folded from a thread's events,
 *   the run lock, and the credentials a browser needs to watch a thread.
 * - `/runner/websocket`: the runner pushes a run's events on `ingestion:<runId>`. Loopback only.
 * - `/client/websocket`: a browser joins `thread:<id>` with a signed join token, replays what it
 *   missed and then follows the run live. It can ask for the run to stop.
 *
 * What it deliberately does not do: memory recall, learning containers, trajectories and realtime
 * thread-list updates. It reports no entitlements, which is what makes OpenBot keep memory in its
 * own database; the browser's thread list is read over REST.
 */

export type LocalPlatformOptions = {
  store: ThreadStore;
  /** Authorises REST requests (`Authorization: Bearer`) and signs browser join tokens. */
  apiKey?: string;
  /** Lock lifetime when the caller names none. */
  defaultLockTtlSeconds?: number;
  /** How long a browser join token stays valid. */
  joinTokenTtlSeconds?: number;
  now?: () => number;
};

type Viewer = {
  socket: PlatformSocket;
  topic: string;
  joinRef: string | null;
  /** True while history is being replayed; live events wait in `buffer`. */
  replaying: boolean;
  buffer: StoredEvent[];
  /** Ids already sent during replay, so a live copy is not sent twice. */
  seen: Set<string>;
};

type SocketData = {
  kind: "runner" | "client";
  /** Who a browser socket was issued for, from its join token. */
  tokenThreadId?: string;
  tokenUserId?: string;
  joined: Map<string, string | null>;
  /** The thread an `ingestion:<runId>` topic was joined for, from the join payload. */
  ingestThread: Map<string, string>;
};

type Frame = [string | null, string | null, string, string, unknown];

type PlatformSocket = {
  data: SocketData;
  send(payload: string): unknown;
};

export type LocalPlatform = {
  fetch(
    request: Request,
    server: {
      upgrade(request: Request, options: unknown): boolean;
      requestIP?(request: Request): { address: string } | null;
    },
  ): Promise<Response | undefined>;
  websocket: {
    open(socket: PlatformSocket): void;
    message(socket: PlatformSocket, message: string | Buffer): Promise<void>;
    close(socket: PlatformSocket): void;
  };
};

const json = (body: unknown, status = 200) => Response.json(body, { status });
const notFound = () => json({ error: "not_found" }, 404);

const LOOPBACK = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);
const eventId = (event: StoredEvent | undefined) =>
  (event?.metadata as { cpki_event_id?: string } | undefined)?.cpki_event_id;
const isTerminal = (event: StoredEvent) =>
  event.type === "RUN_FINISHED" || event.type === "RUN_ERROR";

export function createLocalPlatform(
  options: LocalPlatformOptions,
): LocalPlatform {
  const { store } = options;
  const now = options.now ?? Date.now;
  const defaultTtl = options.defaultLockTtlSeconds ?? 20;
  const tokenTtl = (options.joinTokenTtlSeconds ?? 12 * 60 * 60) * 1000;
  const secret = options.apiKey ?? crypto.randomUUID();
  /** Browsers watching a thread, for live fan-out. */
  const viewers = new Map<string, Set<Viewer>>();
  /** The runner socket and topic delivering each run, so a stop can reach it. */
  const runners = new Map<string, { socket: PlatformSocket; topic: string }>();

  const sign = (body: string) =>
    new Bun.CryptoHasher("sha256", secret).update(body).digest("base64url");

  /** `<base64url claims>.<signature>`: which thread and person a browser may watch as. */
  function issueJoinToken(threadId: string, userId: string) {
    const body = Buffer.from(
      JSON.stringify({ t: threadId, u: userId, e: now() + tokenTtl }),
    ).toString("base64url");
    return `${body}.${sign(body)}`;
  }

  function readJoinToken(token: string | null) {
    if (!token) return undefined;
    const [body, signature] = token.split(".");
    if (!body || !signature || sign(body) !== signature) return undefined;
    try {
      const claims = JSON.parse(Buffer.from(body, "base64url").toString()) as {
        t: string;
        u: string;
        e: number;
      };
      return claims.e > now() ? claims : undefined;
    } catch {
      return undefined;
    }
  }

  const present = (thread: StoredThread) => ({
    id: thread.id,
    name: thread.name,
    archived: thread.archived,
    agentId: thread.agentId,
    createdById: thread.userId,
    createdAt: thread.createdAt,
    updatedAt: thread.updatedAt,
    lastUpdatedAt: thread.updatedAt,
    ...(thread.lastRunAt ? { lastRunAt: thread.lastRunAt } : {}),
    learningContainerId: thread.learningContainerId ?? null,
  });

  const frame = (
    joinRef: string | null,
    ref: string | null,
    topic: string,
    event: string,
    payload: unknown,
  ) => JSON.stringify([joinRef, ref, topic, event, payload]);

  const push = (viewer: Viewer, event: string, payload: unknown) => {
    viewer.socket.send(
      frame(viewer.joinRef, null, viewer.topic, event, payload),
    );
  };

  function deliver(viewer: Viewer, event: StoredEvent) {
    const id = eventId(event);
    if (id && viewer.seen.has(id)) return;
    push(viewer, "ag_ui_event", event);
    if (isTerminal(event)) push(viewer, "stream_idle", { latestEventId: id });
  }

  async function ingest(threadId: string, events: StoredEvent[]) {
    if (events.length === 0) return;
    await store.appendEvents(threadId, events);
    if (events.some((event) => event.type === "RUN_STARTED"))
      await store.updateThread(threadId, {
        lastRunAt: new Date(now()).toISOString(),
      });
    for (const viewer of viewers.get(threadId) ?? []) {
      for (const event of events) {
        if (viewer.replaying) viewer.buffer.push(event);
        else deliver(viewer, event);
      }
    }
  }

  async function activeLock(threadId: string) {
    const lock = await store.lock(threadId);
    if (lock && lock.expiresAt > now()) return lock;
    if (lock) await store.setLock(threadId, undefined);
    return undefined;
  }

  async function rest(request: Request, url: URL): Promise<Response> {
    if (options.apiKey) {
      if (request.headers.get("authorization") !== `Bearer ${options.apiKey}`)
        return json({ error: "unauthorized" }, 401);
    }
    const segments = url.pathname.split("/").filter(Boolean);
    const method = request.method;

    if (url.pathname === "/api/entitlements/runtime" && method === "GET")
      // Active, so the SDK treats the deployment as licensed and shows no licence notices, but with
      // no features: memory is `features.memory`, so OpenBot keeps it in its own database, and there
      // is no learning or trajectory capture.
      return json({
        status: "ready",
        entitlement: {
          active: true,
          source: "selfHostedDeploymentLicense",
          features: {},
          limits: {},
        },
      });

    if (segments[0] !== "api" || segments[1] !== "threads") return notFound();

    if (
      segments.length === 3 &&
      segments[2] === "subscribe" &&
      method === "POST"
    ) {
      // Realtime thread-list updates are not offered; the credentials exist so the browser's join
      // succeeds and the list is read over REST.
      const body = (await request.json().catch(() => ({}))) as {
        userId?: string;
      };
      return json({
        joinToken: issueJoinToken("*", body.userId ?? ""),
        joinCode: "local",
      });
    }

    if (segments.length === 2) {
      if (method === "GET") {
        const userId = url.searchParams.get("userId") ?? "";
        const threads = await store.listThreads({
          userId,
          agentId: url.searchParams.get("agentId") ?? undefined,
          includeArchived: url.searchParams.get("includeArchived") === "true",
        });
        const limit = Number(url.searchParams.get("limit") ?? threads.length);
        return json({
          threads: threads.slice(0, limit).map(present),
          joinCode: "local",
          nextCursor: null,
        });
      }
      if (method === "POST") {
        const body = (await request.json()) as {
          threadId: string;
          userId: string;
          agentId: string;
          name?: string;
          learningContainerId?: string;
        };
        if (await store.getThread(body.threadId))
          return json({ error: "conflict" }, 409);
        const stamp = new Date(now()).toISOString();
        const thread: StoredThread = {
          id: body.threadId,
          userId: body.userId,
          agentId: body.agentId,
          name: body.name ?? null,
          archived: false,
          createdAt: stamp,
          updatedAt: stamp,
          learningContainerId: body.learningContainerId ?? null,
        };
        await store.createThread(thread);
        return json({ thread: present(thread) }, 201);
      }
      return notFound();
    }

    const threadId = decodeURIComponent(segments[2] as string);
    const thread = await store.getThread(threadId);
    const rest = segments[3];

    if (rest === undefined) {
      if (method === "GET") {
        const userId = url.searchParams.get("userId");
        if (!thread || (userId !== null && thread.userId !== userId))
          return notFound();
        return json({ thread: present(thread) });
      }
      if (method === "PATCH") {
        if (!thread) return notFound();
        const body = (await request.json()) as {
          name?: string | null;
          archived?: boolean;
          userId?: string;
        };
        if (body.userId !== undefined && body.userId !== thread.userId)
          return notFound();
        const next = await store.updateThread(threadId, {
          ...(body.name !== undefined ? { name: body.name } : {}),
          ...(body.archived !== undefined ? { archived: body.archived } : {}),
        });
        return json({ thread: present(next as StoredThread) });
      }
      if (method === "DELETE") {
        if (!thread) return notFound();
        await store.deleteThread(threadId);
        return new Response(null, { status: 204 });
      }
      return notFound();
    }

    if (rest === "messages" && method === "GET") {
      const userId = url.searchParams.get("userId");
      if (!thread || (userId !== null && thread.userId !== userId))
        return notFound();
      const messages = foldMessages(await store.events(threadId));
      if (url.searchParams.get("fields") === "id")
        return json({ messages: messages.map((m) => ({ id: m.id })) });
      return json({ messages });
    }

    if (rest === "connect" && method === "POST") {
      // What a browser needs to open a thread it did not start: a token, and the run in flight.
      const body = (await request.json().catch(() => ({}))) as {
        userId?: string;
      };
      if (
        !thread ||
        (body.userId !== undefined && thread.userId !== body.userId)
      )
        return new Response(null, { status: 204 });
      const held = await activeLock(threadId);
      return json({
        threadId,
        runId: held?.runId ?? null,
        joinToken: issueJoinToken(threadId, thread.userId),
      });
    }

    if (rest === "lock") {
      if (!thread) return notFound();
      const body = (await request.json().catch(() => ({}))) as {
        runId?: string;
        ttlSeconds?: number;
      };
      const held = await activeLock(threadId);
      if (method === "POST") {
        if (held && held.runId !== body.runId)
          return json({ error: "thread_locked" }, 409);
        const ttl = body.ttlSeconds ?? defaultTtl;
        const joinToken = issueJoinToken(threadId, thread.userId);
        await store.setLock(threadId, {
          runId: body.runId as string,
          joinToken,
          expiresAt: now() + ttl * 1000,
        });
        return json({
          threadId,
          runId: body.runId,
          joinToken,
          ttlSeconds: ttl,
        });
      }
      if (method === "PATCH") {
        if (!held || held.runId !== body.runId)
          return json({ error: "lock_mismatch" }, 409);
        const ttl = body.ttlSeconds ?? defaultTtl;
        await store.setLock(threadId, {
          ...held,
          expiresAt: now() + ttl * 1000,
        });
        return json({ ttlSeconds: ttl });
      }
      if (method === "DELETE") {
        if (held && held.runId === body.runId)
          await store.setLock(threadId, undefined);
        return new Response(null, { status: 204 });
      }
    }

    return notFound();
  }

  /** A browser joined `thread:<id>`: replay what it missed, then follow live. */
  async function joinThread(
    socket: PlatformSocket,
    topic: string,
    joinRef: string | null,
    params: Record<string, unknown> | undefined,
  ): Promise<boolean> {
    const threadId = topic.slice("thread:".length);
    const { tokenThreadId, tokenUserId } = socket.data;
    if (tokenThreadId !== threadId || tokenUserId === undefined) return false;
    const thread = await store.getThread(threadId);
    if (!thread || thread.userId !== tokenUserId) return false;

    const viewer: Viewer = {
      socket,
      topic,
      joinRef,
      replaying: true,
      buffer: [],
      seen: new Set(),
    };
    const set = viewers.get(threadId) ?? new Set();
    set.add(viewer);
    viewers.set(threadId, set);

    const stored = await store.events(threadId);
    const isRun = params?.stream_mode === "run";
    let replay: StoredEvent[];
    if (isRun) {
      const runId = String(params?.run_id ?? "");
      replay = stored.filter((event) => event.runId === runId);
    } else {
      const cursor =
        typeof params?.last_seen_event_id === "string"
          ? params.last_seen_event_id
          : null;
      const at = cursor
        ? stored.findIndex((event) => eventId(event) === cursor)
        : -1;
      replay = at === -1 ? stored : stored.slice(at + 1);
    }
    for (const event of replay) {
      push(viewer, "ag_ui_event", event);
      const id = eventId(event);
      if (id) viewer.seen.add(id);
    }
    const latestEventId = eventId(stored[stored.length - 1]);
    if (!isRun) push(viewer, "replay_complete", { latestEventId });
    viewer.replaying = false;
    for (const event of viewer.buffer.splice(0)) deliver(viewer, event);
    if (!isRun && !(await activeLock(threadId)))
      push(viewer, "stream_idle", { latestEventId });
    return true;
  }

  function leave(socket: PlatformSocket, topic: string) {
    socket.data.joined.delete(topic);
    if (topic.startsWith("thread:")) {
      const set = viewers.get(topic.slice("thread:".length));
      for (const viewer of set ?? [])
        if (viewer.socket === socket && viewer.topic === topic)
          set?.delete(viewer);
    }
    if (topic.startsWith("ingestion:")) {
      const runId = topic.slice("ingestion:".length);
      if (runners.get(runId)?.socket === socket) runners.delete(runId);
    }
  }

  return {
    async fetch(request, server) {
      const url = new URL(request.url);
      const isRunner = url.pathname === "/runner/websocket";
      const isClient =
        url.pathname === "/client/websocket" ||
        url.pathname === "/socket/websocket";
      if (isRunner || isClient) {
        let data: SocketData;
        if (isRunner) {
          // The runner is this server. Anything that reached the port through a proxy is not.
          const address = server.requestIP?.(request)?.address;
          if (
            request.headers.has("x-forwarded-for") ||
            (address !== undefined && !LOOPBACK.has(address))
          )
            return new Response("forbidden", { status: 403 });
          data = { kind: "runner", joined: new Map(), ingestThread: new Map() };
        } else {
          const claims = readJoinToken(url.searchParams.get("join_token"));
          if (!claims) return new Response("unauthorized", { status: 401 });
          data = {
            kind: "client",
            tokenThreadId: claims.t,
            tokenUserId: claims.u,
            joined: new Map(),
            ingestThread: new Map(),
          };
        }
        // A browser only accepts a subprotocol it asked for, and Phoenix's browser client asks for
        // none; the Node client in the runner is the one that expects "phoenix" back.
        const requested = request.headers.get("sec-websocket-protocol");
        const upgraded = server.upgrade(request, {
          data,
          ...(requested
            ? {
                headers: {
                  "Sec-WebSocket-Protocol":
                    requested.split(",")[0]?.trim() ?? "phoenix",
                },
              }
            : {}),
        });
        return upgraded
          ? undefined
          : new Response("upgrade failed", { status: 400 });
      }
      return rest(request, url);
    },
    websocket: {
      open() {},
      async message(socket, raw) {
        const [joinRef, ref, topic, event, payload] = JSON.parse(
          String(raw),
        ) as Frame;
        const reply = (
          status: "ok" | "error",
          response: unknown = {},
        ): void => {
          socket.send(
            frame(joinRef, ref, topic, "phx_reply", { status, response }),
          );
        };

        if (topic === "phoenix") return reply("ok");

        if (event === "phx_leave") {
          leave(socket, topic);
          return reply("ok");
        }

        if (socket.data.kind === "client") {
          if (event === "phx_join") {
            socket.data.joined.set(topic, joinRef);
            if (!topic.startsWith("thread:")) {
              // Thread-list and memory metadata topics: joined, never pushed to.
              return reply("ok");
            }
            const joined = await joinThread(
              socket,
              topic,
              joinRef,
              payload as Record<string, unknown> | undefined,
            );
            if (!joined) {
              leave(socket, topic);
              return reply("error", { reason: "unauthorized" });
            }
            return reply("ok");
          }
          if (event === "stop_run") {
            const runId = String(
              (payload as { run_id?: string })?.run_id ?? "",
            );
            const runner = runners.get(runId);
            runner?.socket.send(
              frame(null, null, runner.topic, "ag-ui", {
                type: "CUSTOM",
                name: "stop",
              }),
            );
            return reply("ok");
          }
          return reply("ok");
        }

        // The runner.
        if (event === "phx_join") {
          socket.data.joined.set(topic, joinRef);
          const joinedThread = (payload as { thread_id?: string } | null)
            ?.thread_id;
          if (topic.startsWith("ingestion:")) {
            if (joinedThread) socket.data.ingestThread.set(topic, joinedThread);
            runners.set(topic.slice("ingestion:".length), { socket, topic });
          }
          return reply("ok", { capabilities: ["runner_event_batch_v1"] });
        }
        if (
          topic.startsWith("ingestion:") &&
          (event === "event" || event === "events")
        ) {
          const threadId = socket.data.ingestThread.get(topic) ?? "";
          const events =
            event === "events"
              ? ((payload as { events: StoredEvent[] }).events ?? [])
              : [payload as StoredEvent];
          await ingest(
            threadId || (events[0]?.threadId as string) || "",
            events,
          );
          return reply("ok");
        }
        return reply("ok");
      },
      close(socket) {
        for (const topic of [...socket.data.joined.keys()])
          leave(socket, topic);
      },
    },
  };
}
