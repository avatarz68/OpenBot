import { describe, expect, test } from "bun:test";
import { translate } from "../src/lib/i18n";
import { resolveLocale, toLocale } from "../src/lib/i18n/locale";

describe("choosing a language", () => {
  test("a person's choice beats the deployment, and the deployment beats the browser", () => {
    expect(
      resolveLocale({ chosen: "en", deploymentDefault: "de", browser: ["de"] }),
    ).toBe("en");
    expect(resolveLocale({ deploymentDefault: "de", browser: ["en-US"] })).toBe(
      "de",
    );
    expect(resolveLocale({ browser: ["fr-FR", "de-AT"] })).toBe("de");
  });

  test("falls back to English when nothing names a language the app has", () => {
    expect(resolveLocale({ browser: ["fr", "ja"] })).toBe("en");
    expect(resolveLocale({})).toBe("en");
    expect(toLocale("xx")).toBeNull();
  });

  test("regional tags and case do not matter", () => {
    expect(toLocale("de-CH")).toBe("de");
    expect(toLocale("DE_at")).toBe("de");
  });
});

describe("translating", () => {
  test("shows the English text when there is no German for it", () => {
    expect(translate("de", "Some string nobody translated")).toBe(
      "Some string nobody translated",
    );
  });

  test("puts named values in, in either language", () => {
    expect(translate("en", "Hello, {name}", { name: "Ada" })).toBe(
      "Hello, Ada",
    );
    expect(translate("de", "Hello, {name} {missing}", { name: "Ada" })).toBe(
      "Hello, Ada {missing}",
    );
  });
});
