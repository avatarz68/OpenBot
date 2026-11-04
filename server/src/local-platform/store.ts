/**
 * The state of the embedded local platform: threads, their event logs and the run lock.
 *
 * An interface, so the in-memory store used by tests and a PostgreSQL store can stand behind the
 * same platform. Nothing here knows about HTTP or WebSockets.
 */

export type StoredThread = {
  id: string;
  userId: string;
  agentId: string;
  name: string | null;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  lastRunAt?: string;
  learningContainerId?: string | null;
};

/** One AG-UI event as the runner delivered it, in arrival order. */
export type StoredEvent = Record<string, unknown> & { type: string };

export type ThreadLock = {
  runId: string;
  joinToken: string;
  expiresAt: number;
};

export interface ThreadStore {
  getThread(id: string): Promise<StoredThread | undefined>;
  createThread(thread: StoredThread): Promise<void>;
  updateThread(
    id: string,
    changes: Partial<Pick<StoredThread, "name" | "archived" | "lastRunAt">>,
  ): Promise<StoredThread | undefined>;
  deleteThread(id: string): Promise<void>;
  listThreads(filter: {
    userId: string;
    agentId?: string;
    includeArchived: boolean;
  }): Promise<StoredThread[]>;
  appendEvents(threadId: string, events: StoredEvent[]): Promise<void>;
  events(threadId: string): Promise<StoredEvent[]>;
  lock(threadId: string): Promise<ThreadLock | undefined>;
  setLock(threadId: string, lock: ThreadLock | undefined): Promise<void>;
}

export class MemoryThreadStore implements ThreadStore {
  readonly #threads = new Map<string, StoredThread>();
  readonly #events = new Map<string, StoredEvent[]>();
  readonly #locks = new Map<string, ThreadLock>();

  async getThread(id: string) {
    return this.#threads.get(id);
  }

  async createThread(thread: StoredThread) {
    this.#threads.set(thread.id, thread);
  }

  async updateThread(
    id: string,
    changes: Partial<Pick<StoredThread, "name" | "archived" | "lastRunAt">>,
  ) {
    const thread = this.#threads.get(id);
    if (!thread) return undefined;
    const next = {
      ...thread,
      ...changes,
      updatedAt: new Date().toISOString(),
    };
    this.#threads.set(id, next);
    return next;
  }

  async deleteThread(id: string) {
    this.#threads.delete(id);
    this.#events.delete(id);
    this.#locks.delete(id);
  }

  async listThreads(filter: {
    userId: string;
    agentId?: string;
    includeArchived: boolean;
  }) {
    return [...this.#threads.values()]
      .filter(
        (thread) =>
          thread.userId === filter.userId &&
          (filter.agentId === undefined || thread.agentId === filter.agentId) &&
          (filter.includeArchived || !thread.archived),
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async appendEvents(threadId: string, events: StoredEvent[]) {
    const log = this.#events.get(threadId) ?? [];
    log.push(...events);
    this.#events.set(threadId, log);
  }

  async events(threadId: string) {
    return [...(this.#events.get(threadId) ?? [])];
  }

  async lock(threadId: string) {
    return this.#locks.get(threadId);
  }

  async setLock(threadId: string, lock: ThreadLock | undefined) {
    if (lock) this.#locks.set(threadId, lock);
    else this.#locks.delete(threadId);
  }
}
