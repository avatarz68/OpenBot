import { describe, expect, test } from "bun:test";
import { fileURLToPath } from "node:url";
import { loadTenantPackage } from "../src/tenant-package";

describe("the ImPPPact tenant package", () => {
  test("loads with its own brand and the PPP Bots", async () => {
    const tenantPackage = await loadTenantPackage(
      fileURLToPath(new URL("../../examples/impppact", import.meta.url)),
    );

    expect(tenantPackage.tenantId).toBe("impppact");
    expect(tenantPackage.productName).toBe("ImPPPactBot");
    const ids = tenantPackage.agents.map((agent) => agent.id);
    for (const id of [
      "general-assistant",
      "knowledge",
      "ppp-transaction-advisor",
      "funding-matcher",
      "stakeholder-mapper",
      "ppp-cashflow-analyst",
      "esg-grievance-reviewer",
      "proposal-writer",
    ]) {
      expect(ids).toContain(id);
    }
  });
});
