import { describe, expect, test } from "bun:test";
import { fileURLToPath } from "node:url";
import {
  loadTenantPackage,
  validateTenantPackage,
} from "../src/tenant-package";

describe("the ImPPPact tenant package", () => {
  test("loads with its own brand and the PPP Bots", async () => {
    const tenantPackage = await loadTenantPackage(
      fileURLToPath(new URL("../../examples/impppact", import.meta.url)),
    );

    expect(tenantPackage.tenantId).toBe("impppact");
    expect(tenantPackage.productName).toBe("ImPPPactBot");
    expect(tenantPackage.defaultLocale).toBe("de");
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

  test("refuses a default language that is not a language tag", () => {
    expect(() =>
      validateTenantPackage({
        brand: "tenant: { id: x, product_name: X, default_locale: Deutsch }",
        agents: "agents: []",
        channels: "channels: []",
        model:
          "model: { provider: openai, credential_secret_ref: k, default_model: m }",
        knowledge: "sources: []",
        themeCss: "",
      } as never),
    ).toThrow("default_locale");
  });
});
