import { and, asc, desc, eq } from "drizzle-orm";
import type { Database } from "../db/client";
import {
  localThreadEvents,
  localThreadLocks,
  localThreads,
} from "../db/schema";
import type {
  StoredEvent,
  StoredThread,
  ThreadLock,
  ThreadStore,
} from "./store";

type Row = typeof localThreads.$inferSelect;

const toThread = (row: Row): StoredThread => ({
  id: row.id,
  userId: row.userId,
  agentId: row.agentId,
  name: row.name,
  archived: row.archived,
  createdAt: row.createdAt.toISOString(),
  updatedAt: row.updatedAt.toISOString(),
  ...(row.lastRunAt ? { lastRunAt: row.lastRunAt.toISOString() } : {}),
  learningContainerId: row.learningContainerId,
});

/** The local platform's state in the deployment's PostgreSQL, so a restart forgets nothing. */
export class PostgresThreadStore implements ThreadStore {
  constructor(private readonly db: Database) {}

  async getThread(id: string) {
    const [row] = await this.db
      .select()
      .from(localThreads)
      .where(eq(localThreads.id, id));
    return row ? toThread(row) : undefined;
  }

  async createThread(thread: StoredThread) {
    await this.db.insert(localThreads).values({
      id: thread.id,
      userId: thread.userId,
      agentId: thread.agentId,
      name: thread.name,
      archived: thread.archived,
      learningContainerId: thread.learningContainerId ?? null,
      createdAt: new Date(thread.createdAt),
      updatedAt: new Date(thread.updatedAt),
    });
  }

  async updateThread(
    id: string,
    changes: Partial<Pick<StoredThread, "name" | "archived" | "lastRunAt">>,
  ) {
    const [row] = await this.db
      .update(localThreads)
      .set({
        ...(changes.name !== undefined ? { name: changes.name } : {}),
        ...(changes.archived !== undefined
          ? { archived: changes.archived }
          : {}),
        ...(changes.lastRunAt !== undefined
          ? { lastRunAt: new Date(changes.lastRunAt) }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(localThreads.id, id))
      .returning();
    return row ? toThread(row) : undefined;
  }

  async deleteThread(id: string) {
    await this.db.transaction(async (tx) => {
      await tx
        .delete(localThreadEvents)
        .where(eq(localThreadEvents.threadId, id));
      await tx
        .delete(localThreadLocks)
        .where(eq(localThreadLocks.threadId, id));
      await tx.delete(localThreads).where(eq(localThreads.id, id));
    });
  }

  async listThreads(filter: {
    userId: string;
    agentId?: string;
    includeArchived: boolean;
  }) {
    const rows = await this.db
      .select()
      .from(localThreads)
      .where(
        and(
          eq(localThreads.userId, filter.userId),
          filter.agentId === undefined
            ? undefined
            : eq(localThreads.agentId, filter.agentId),
          filter.includeArchived ? undefined : eq(localThreads.archived, false),
        ),
      )
      .orderBy(desc(localThreads.updatedAt));
    return rows.map(toThread);
  }

  async appendEvents(threadId: string, events: StoredEvent[]) {
    if (events.length === 0) return;
    await this.db
      .insert(localThreadEvents)
      .values(events.map((event) => ({ threadId, event })));
  }

  async events(threadId: string) {
    const rows = await this.db
      .select({ event: localThreadEvents.event })
      .from(localThreadEvents)
      .where(eq(localThreadEvents.threadId, threadId))
      .orderBy(asc(localThreadEvents.seq));
    return rows.map((row) => row.event as StoredEvent);
  }

  async lock(threadId: string): Promise<ThreadLock | undefined> {
    const [row] = await this.db
      .select()
      .from(localThreadLocks)
      .where(eq(localThreadLocks.threadId, threadId));
    return row
      ? {
          runId: row.runId,
          joinToken: row.joinToken,
          expiresAt: row.expiresAt.getTime(),
        }
      : undefined;
  }

  async setLock(threadId: string, lock: ThreadLock | undefined) {
    if (!lock) {
      await this.db
        .delete(localThreadLocks)
        .where(eq(localThreadLocks.threadId, threadId));
      return;
    }
    const values = {
      runId: lock.runId,
      joinToken: lock.joinToken,
      expiresAt: new Date(lock.expiresAt),
    };
    await this.db
      .insert(localThreadLocks)
      .values({ threadId, ...values })
      .onConflictDoUpdate({
        target: localThreadLocks.threadId,
        set: values,
      });
  }
}

