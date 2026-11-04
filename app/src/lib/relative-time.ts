import { getLocale, t } from "@/lib/i18n";

const RELATIVE_UNITS = [
  { limit: 60_000, divisor: 1_000, unit: "second" },
  { limit: 3_600_000, divisor: 60_000, unit: "minute" },
  { limit: 86_400_000, divisor: 3_600_000, unit: "hour" },
  { limit: 604_800_000, divisor: 86_400_000, unit: "day" },
  { limit: Number.POSITIVE_INFINITY, divisor: 604_800_000, unit: "week" },
] as const;

/** Built per call: the language can differ from the browser's, and it is cheap. */
const relativeFormat = {
  format: (value: number, unit: Intl.RelativeTimeFormatUnit) =>
    new Intl.RelativeTimeFormat(getLocale(), { numeric: "auto" }).format(
      value,
      unit,
    ),
};

/** The compact units, "5m" in English. German reads "5 Min." and so on. */
const SHORT_LABEL: Record<"m" | "h" | "d" | "w", Record<string, string>> = {
  m: { en: "m", de: " Min." },
  h: { en: "h", de: " Std." },
  d: { en: "d", de: " T." },
  w: { en: "w", de: " Wo." },
};

/** Locale-aware relative timestamp, e.g. "2 minutes ago". */
export function relativeTime(iso: string): string {
  const time = new Date(iso).getTime();
  // An invalid date used to flow into `Math.abs(NaN)` comparisons and `format(-NaN)`, which
  // answers "NaN weeks ago" or throws depending on ICU. Return the input unchanged instead.
  if (!Number.isFinite(time)) return iso;
  const elapsed = Date.now() - time;
  const scale =
    RELATIVE_UNITS.find(({ limit }) => Math.abs(elapsed) < limit) ??
    RELATIVE_UNITS[RELATIVE_UNITS.length - 1];
  return relativeFormat.format(
    -Math.round(elapsed / scale.divisor),
    scale.unit,
  );
}

const SHORT_UNITS = [
  { limit: 3_600_000, divisor: 60_000, suffix: "m" },
  { limit: 86_400_000, divisor: 3_600_000, suffix: "h" },
  { limit: 604_800_000, divisor: 86_400_000, suffix: "d" },
  { limit: Number.POSITIVE_INFINITY, divisor: 604_800_000, suffix: "w" },
] as const;

/**
 * The sidebar's compact timestamp: "now", "5m", "3h", "2d", "6w".
 *
 * Rounded down, so a unit never shows its own upper bound ("60m"). A time slightly ahead of this
 * clock, from a server whose clock runs fast, reads as "now" rather than a negative number.
 */
export function relativeTimeShort(iso: string, now: Date = new Date()): string {
  const time = new Date(iso).getTime();
  if (!Number.isFinite(time)) return iso;
  const elapsed = now.getTime() - time;
  if (elapsed < 60_000) return t("now");
  const scale =
    SHORT_UNITS.find(({ limit }) => elapsed < limit) ??
    SHORT_UNITS[SHORT_UNITS.length - 1];
  const label = SHORT_LABEL[scale.suffix];
  return `${Math.floor(elapsed / scale.divisor)}${label[getLocale()] ?? scale.suffix}`;
}
