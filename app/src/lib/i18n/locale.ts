/** The languages the app can be shown in. English is the source language of every string. */
export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_STORAGE_KEY = "openbot-locale";

/** `de-AT`, `de_CH` and `DE` all mean German; anything the app has no catalogue for means nothing. */
export function toLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  const language = value.toLowerCase().split(/[-_]/)[0];
  return (LOCALES as readonly string[]).includes(language ?? "")
    ? (language as Locale)
    : null;
}

/**
 * Which language to open in.
 *
 * What the person chose wins. Failing that, the deployment's own default, because a company that
 * runs OpenBot in German wants every colleague to see German whatever their browser says. Failing
 * that, the browser's languages in order, and English when none of them is one the app has.
 */
export function resolveLocale(input: {
  chosen?: string | null;
  deploymentDefault?: string | null;
  browser?: readonly string[];
}): Locale {
  return (
    toLocale(input.chosen) ??
    toLocale(input.deploymentDefault) ??
    (input.browser ?? []).map(toLocale).find((locale) => locale !== null) ??
    "en"
  );
}
