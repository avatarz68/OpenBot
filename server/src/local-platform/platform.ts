import { foldMessages } from "./fold";
import type { StoredEvent, StoredThread, ThreadStore } from "./store";

/**
 * An embedded thread platform for deployments that run without CopilotKit Intelligence.
 *
 * It answers the part of the Intelligence contract that OpenBot's runtime uses for conversations:
 * thread records, the message history folded from a thread's events, the run lock, the runner's
 * WebSocket (`ingestion:<runId>`) and the live channel a viewer joins (`thread:<id>`). It speaks
 * the same wire format, so `@copilotkit/runtime` runs against it unchanged: point
 * `INTELLIGENCE_API_URL` and `INTELLIGENCE_GATEWAY_WS_URL` at it.
 *
 * What it deliberately does not do: memory recall, learning containers and trajectories. It reports
 * no entitlements, which is what makes OpenBot keep memory in its own database.
 */

export type LocalPlatformOptions = {
  store: ThreadStore;
  /** When set, every REST request must carry `Authorization: Bearer <apiKey>`. */
  apiKey?: string;
  /** Lock lifetime when the caller names none. */
  defaultLockTtlSeconds?: number;
  now?: () => number;
};

type SocketData = {
  /** Topics this socket has joined, with the join ref each was joined under. */
  joined: Map<string, string | null>;
  /** The thread an `ingestion:<runId>` topic was joined for, from the join payload. */
  ingestThread: Map<string, string>;
};

type Frame = [string | null, string | null, string, string, unknown];

export type LocalPlatform = {
  fetch(
    request: Request,
    server: {
      upgrade(request: Request, options: unknown): boolean;
    },
  ): Promise<Response | undefined>;
  websocket: {
    open(socket: PlatformSocket): void;
    message(socket: PlatformSocket, message: string | Buffer): Promise<void>;
    close(socket: PlatformSocket): void;
  };
};

type PlatformSocket = {
  data: SocketData;
  send(payload: string): unknown;
};

const json = (body: unknown, status = 200) => Response.json(body, { status });
const notFound = () => json({ error: "not_found" }, 404);

export function createLocalPlatform(
  options: LocalPlatformOptions,
): LocalPlatform {
  const { store } = options;
  const now = options.now ?? Date.now;
  const defaultTtl = options.defaultLockTtlSeconds ?? 20;
  /** Sockets viewing a thread, for live fan-out. */
  const viewers = new Map<string, Set<PlatformSocket>>();

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

  async function ingest(threadId: string, events: StoredEvent[]) {
    if (events.length === 0) return;
    await store.appendEvents(threadId, events);
    const stamp = new Date(now()).toISOString();
    if (events.some((event) => event.type === "RUN_STARTED"))
      await store.updateThread(threadId, { lastRunAt: stamp });
    for (const socket of viewers.get(threadId) ?? []) {
      const ref = socket.data.joined.get(`thread:${threadId}`) ?? null;
      for (const event of events)
        socket.send(
          frame(ref, null, `thread:${threadId}`, "ag_ui_event", event),
        );
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
      // No memory, learning or trajectories: OpenBot falls back to its own stores.
      return json({
        status: "ready",
        entitlement: {
          active: false,
          source: "selfHostedDeploymentLicense",
          features: {},
          limits: {},
        },
      });

    if (segments[0] !== "api" || segments[1] !== "threads") return notFound();

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
        const joinToken = crypto.randomUUID();
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

  return {
    async fetch(request, server) {
      const url = new URL(request.url);
      if (
        url.pathname === "/runner/websocket" ||
        url.pathname === "/client/websocket" ||
        url.pathname === "/socket/websocket"
      ) {
        const upgraded = server.upgrade(request, {
          data: {
            joined: new Map(),
            ingestThread: new Map(),
          } satisfies SocketData,
          headers: { "Sec-WebSocket-Protocol": "phoenix" },
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

        if (event === "phx_join") {
          socket.data.joined.set(topic, joinRef);
          const joinedThread = (payload as { thread_id?: string } | null)
            ?.thread_id;
          if (topic.startsWith("ingestion:") && joinedThread)
            socket.data.ingestThread.set(topic, joinedThread);
          if (topic.startsWith("thread:")) {
            const threadId = topic.slice("thread:".length);
            const set = viewers.get(threadId) ?? new Set();
            set.add(socket);
            viewers.set(threadId, set);
          }
          return reply("ok", { capabilities: ["runner_event_batch_v1"] });
        }

        if (event === "phx_leave") {
          socket.data.joined.delete(topic);
          if (topic.startsWith("thread:"))
            viewers.get(topic.slice("thread:".length))?.delete(socket);
          return reply("ok");
        }

        if (topic.startsWith("ingestion:")) {
          const threadId = socket.data.ingestThread.get(topic) ?? "";
          if (event === "event" || event === "events") {
            const events =
              event === "events"
                ? ((payload as { events: StoredEvent[] }).events ?? [])
                : [payload as StoredEvent];
            const resolved = threadId || (events[0]?.threadId as string) || "";
            await ingest(resolved, events);
          }
          return reply("ok");
        }
        return reply("ok");
      },
      close(socket) {
        for (const topic of socket.data.joined.keys()) {
          if (topic.startsWith("thread:"))
            viewers.get(topic.slice("thread:".length))?.delete(socket);
        }
      },
    },
  };
}
