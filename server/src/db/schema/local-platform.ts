import {
  bigserial,
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * The embedded local platform's state (src/local-platform). Used only when OpenBot runs without
 * CopilotKit Intelligence. Deliberately no foreign keys into the rest of the schema: a thread id is
 * the platform's own key, the same one the runtime hands out.
 */
export const localThreads = pgTable(
  "local_threads",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    agentId: text("agent_id").notNull(),
    name: text("name"),
    archived: boolean("archived").notNull().default(false),
    learningContainerId: text("learning_container_id"),
    lastRunAt: timestamp("last_run_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("local_threads_user_idx").on(table.userId, table.updatedAt),
  ],
);

/** One AG-UI event per row, in arrival order. The message history is folded from these. */
export const localThreadEvents = pgTable(
  "local_thread_events",
  {
    seq: bigserial("seq", { mode: "number" }).primaryKey(),
    threadId: text("thread_id").notNull(),
    event: jsonb("event").$type<Record<string, unknown>>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("local_thread_events_thread_idx").on(table.threadId, table.seq),
  ],
);

/** At most one live run per thread. */
export const localThreadLocks = pgTable("local_thread_locks", {
  threadId: text("thread_id").primaryKey(),
  runId: text("run_id").notNull(),
  joinToken: text("join_token").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
