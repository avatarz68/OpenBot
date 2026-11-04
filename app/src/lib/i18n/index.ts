import { useSyncExternalStore } from "react";
import { appConfig } from "@/lib/generated/application-config";
import { de } from "./de";
import { LOCALE_STORAGE_KEY, type Locale, resolveLocale } from "./locale";

export type { Locale } from "./locale";
export { LOCALES } from "./locale";

/**
 * Text for people, in the language they chose.
 *
 * The English text is the key. A string that has no entry in the active catalogue shows as written,
 * so a screen nobody has translated yet is English, never blank, and the source stays readable where
 * it is used: `t("New chat")`. Values go in by name: `t("Hello, {name}", { name })`.
 */
const catalogues: Record<Locale, Record<string, string>> = { en: {}, de };

function read(): Locale {
  let chosen: string | null = null;
  try {
    chosen = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    // Storage can be unavailable; the deployment's default and the browser still decide.
  }
  const search =
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("lang");
  // Tests set this so the language they assert in does not depend on the tenant they were built for.
  const forced = (globalThis as { __OPENBOT_LOCALE__?: string })
    .__OPENBOT_LOCALE__;
  return resolveLocale({
    chosen: forced ?? search ?? chosen,
    deploymentDefault: (appConfig.brand as { defaultLocale?: string })
      .defaultLocale,
    browser: typeof navigator === "undefined" ? [] : navigator.languages,
  });
}

let current: Locale = read();
const listeners = new Set<() => void>();

function announce() {
  if (typeof document !== "undefined") document.documentElement.lang = current;
  for (const listener of listeners) listener();
}
announce();

export function getLocale(): Locale {
  return current;
}

/** Switches the language everywhere at once and remembers the choice in this browser. */
export function setLocale(next: Locale) {
  if (next === current) return;
  current = next;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  } catch {
    // The switch still applies for this visit.
  }
  announce();
}

export function translate(
  locale: Locale,
  text: string,
  values?: Record<string, string | number>,
): string {
  const template = catalogues[locale][text] ?? text;
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    name in values ? String(values[name]) : whole,
  );
}

/** For text outside a component: a toast, an error built in a mutation. Reads the language now. */
export function t(text: string, values?: Record<string, string | number>) {
  return translate(current, text, values);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The active language, re-rendering the caller when it changes. */
export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getLocale, getLocale);
}

/** `t`, bound to the language the component was rendered in. Use this inside components. */
export function useT() {
  const locale = useLocale();
  return (text: string, values?: Record<string, string | number>) =>
    translate(locale, text, values);
}
