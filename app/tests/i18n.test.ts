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

describe("the German catalogue", () => {
  const stripComments = (source: string) =>
    source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

  async function sourceTexts() {
    const texts = new Map<string, string>();
    const glob = new Bun.Glob("**/*.{ts,tsx}");
    for await (const file of glob.scan({ cwd: "app/src" })) {
      if (file.endsWith("lib/i18n/de.ts") || file.includes(".test.")) continue;
      const source = stripComments(await Bun.file(`app/src/${file}`).text());
      for (const match of source.matchAll(/\bt\(\s*("(?:[^"\\]|\\.)*")/g))
        texts.set(JSON.parse(match[1] as string) as string, file);
    }
    return texts;
  }

  test("has a German text for every string the app asks to translate", async () => {
    const { de } = await import("../src/lib/i18n/de");
    const missing = [...(await sourceTexts())]
      .filter(([text]) => !(text in de))
      .map(([text, file]) => `${file}: ${text}`);
    expect(missing).toEqual([]);
  });

  test("keeps every named value of the English text, and nothing else", async () => {
    const { de } = await import("../src/lib/i18n/de");
    const names = (text: string) =>
      [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
    for (const [english, german] of Object.entries(de)) {
      expect(german.trim()).not.toBe("");
      expect([english, names(german)]).toEqual([english, names(english)]);
    }
  });
});
