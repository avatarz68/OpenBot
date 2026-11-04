import { afterAll, describe, expect, test } from "bun:test";
import { createDatabase } from "../src/db/client";
import { PostgresThreadStore } from "../src/local-platform/postgres-store";
import {
  MemoryThreadStore,
  type ThreadStore,
} from "../src/local-platform/store";
import { TEST_POOL, testDatabaseUrl } from "./support/database";

const database = createDatabase(testDatabaseUrl(), TEST_POOL);
const prefix = `store-${crypto.randomUUID()}`;

afterAll(async () => {
  const store = new PostgresThreadStore(database);
  for (const id of ["a", "b"]) await store.deleteThread(`${prefix}-${id}`);
});

const stores: [string, () => ThreadStore][] = [
  ["memory", () => new MemoryThreadStore()],
  ["postgres", () => new PostgresThreadStore(database)],
];

for (const [name, make] of stores) {
  describe(`${name} thread store`, () => {
    const id = (suffix: string) => `${prefix}-${suffix}`;
    const thread = (suffix: string, userId = `${prefix}-user`) => ({
      id: id(suffix),
      userId,
      agentId: "agent",
      name: null,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    test("creates, reads, renames, archives and deletes a thread", async () => {
      const store = make();
      await store.createThread(thread("a"));
      expect((await store.getThread(id("a")))?.name).toBeNull();

      await store.updateThread(id("a"), { name: "Kyiv" });
      expect((await store.getThread(id("a")))?.name).toBe("Kyiv");

      const user = `${prefix}-user`;
      expect(
        (await store.listThreads({ userId: user, includeArchived: false })).map(
          (t) => t.id,
        ),
      ).toContain(id("a"));
      await store.updateThread(id("a"), { archived: true });
      expect(
        (await store.listThreads({ userId: user, includeArchived: false })).map(
          (t) => t.id,
        ),
      ).not.toContain(id("a"));
      expect(
        (await store.listThreads({ userId: user, includeArchived: true })).map(
          (t) => t.id,
        ),
      ).toContain(id("a"));

      await store.deleteThread(id("a"));
      expect(await store.getThread(id("a"))).toBeUndefined();
    });

    test("keeps events in order and drops them with the thread", async () => {
      const store = make();
      await store.createThread(thread("b"));
      await store.appendEvents(id("b"), [{ type: "A" }, { type: "B" }]);
      await store.appendEvents(id("b"), [{ type: "C" }]);
      expect((await store.events(id("b"))).map((e) => e.type)).toEqual([
        "A",
        "B",
        "C",
      ]);
      await store.deleteThread(id("b"));
      expect(await store.events(id("b"))).toEqual([]);
    });

    test("holds, replaces and clears a lock", async () => {
      const store = make();
      await store.createThread(thread("a"));
      expect(await store.lock(id("a"))).toBeUndefined();
      const expiresAt = Date.now() + 20_000;
      await store.setLock(id("a"), { runId: "r1", joinToken: "t", expiresAt });
      expect((await store.lock(id("a")))?.runId).toBe("r1");
      await store.setLock(id("a"), { runId: "r2", joinToken: "t2", expiresAt });
      expect((await store.lock(id("a")))?.runId).toBe("r2");
      await store.setLock(id("a"), undefined);
      expect(await store.lock(id("a"))).toBeUndefined();
      await store.deleteThread(id("a"));
    });
  });
}
