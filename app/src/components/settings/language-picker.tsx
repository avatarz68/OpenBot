import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLocale, LOCALES, type Locale, setLocale, t } from "@/lib/i18n";

/** Each language in its own words, so somebody who cannot read the current one can still find theirs. */
const NAMES: Record<Locale, string> = { en: "English", de: "Deutsch" };

/**
 * Choose the language. Saved in this browser. The page reloads, so every screen, including the ones
 * that read their text once, shows the new language at the same moment.
 */
export function LanguagePicker() {
  const locale = getLocale();
  return (
    <Item size="sm">
      <ItemContent>
        <ItemTitle>{t("Language")}</ItemTitle>
        <ItemDescription>
          {t("Choose the language for menus and messages in this browser.")}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Select
          value={locale}
          onValueChange={(value) => {
            const next = LOCALES.find((known) => known === value);
            if (next && next !== locale) {
              setLocale(next);
              window.location.reload();
            }
          }}
        >
          <SelectTrigger aria-label={t("Language")}>
            <SelectValue>{NAMES[locale]}</SelectValue>
          </SelectTrigger>
          <SelectContent align="end" alignItemWithTrigger={false}>
            {LOCALES.map((id) => (
              <SelectItem key={id} value={id}>
                {NAMES[id]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ItemActions>
    </Item>
  );
}
