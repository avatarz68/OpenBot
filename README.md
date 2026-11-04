# ImPPPactBot

KI-Assistent für die Arbeit von ImPPPact an Public-Private-Partnership-Projekten. Er läuft auf der eigenen Infrastruktur, die Daten liegen in der eigenen PostgreSQL-Datenbank, und er braucht **kein CopilotKit-Konto**.

ImPPPactBot ist ein Fork von [CopilotKit/openbot](https://github.com/CopilotKit/openbot) (MIT-Lizenz, siehe [LICENSE](LICENSE)). Die allgemeine Beschreibung des Upstream-Projekts steht unverändert in [README.openbot.md](README.openbot.md).

> **Stand:** Beta. Chat, Stopp, Kanäle und Verlauf sind im Browser geprüft (siehe [Stand der Prüfung](#stand-der-prüfung)). Ein Durchlauf mit einem echten Sprachmodell und der vollständige Start über `scripts/start.sh` mit Docker stehen noch aus. Die Oberfläche ist teilweise deutsch (siehe [Deutsche Oberfläche](#deutsche-oberfläche)).

## Die Bots

Jeder Bot ist ein Kollege mit eigenem Kanal. Er antwortet in der Sprache der Anfrage (Deutsch als Standard), nennt die Quelle jeder Zahl und jeder Aussage, sagt ausdrücklich, wenn das Material zu etwas schweigt, und erfindet nichts. Er berät und bereitet vor, entscheiden tut ein Mensch.

| Bot | Aufgabe |
| --- | --- |
| PPP-Transaktionsberater | Eine PPP-Transaktion Phase für Phase strukturieren und bewerten: Projektdefinition, Value for Money, Risikoverteilung, Vertragsstruktur, Vergabe, Financial Close |
| Fördermittel-Matcher | Wiederaufbau- und Infrastrukturprojekte (etwa in der Ukraine) passenden Finanzierungsquellen zuordnen, mit veröffentlichten Kriterien samt Quelle und Datum |
| Stakeholder-Mapper | Stakeholder, Interessen, Einfluss und Belege abbilden, Annahmen getrennt ausweisen |
| PPP-Cashflow-Analyst | Cashflow-Logik aufsetzen und prüfen: Capex, Opex, Entgelte, Schuldendienst, DSCR, Sensitivitäten |
| ESG- und Beschwerdeprüfer | Umwelt- und Sozialunterlagen und Beschwerdemechanismen gegen die geltenden Standards prüfen, Lücken benennen |
| Angebotsschreiber | Angebote, One-Pager und Berichte im ImPPPact-Ton entwerfen, Lücken als Platzhalter markieren |
| Allgemeiner Assistent, Wissen | Alltagshilfe und Fragen zu ImPPPact-Dokumenten |

Die Definitionen liegen in `examples/impppact/agents/*.yaml`, die Kanäle in `examples/impppact/channels.yaml`, der Produktname in `examples/impppact/brand.yaml`. Einen Bot hinzuzufügen heißt, eine YAML-Datei in `agents/` anzulegen.

## Ohne CopilotKit-Konto

Upstream hängt an *CopilotKit Intelligence*, einem gehosteten Dienst für dauerhafte Threads, Gedächtnis und Echtzeit-Verbindung. ImPPPactBot ersetzt ihn durch eine **eingebaute Plattform** (`server/src/local-platform/`), die im Server mitläuft:

- Threads, Ereignisse und die Sperre pro Lauf liegen in PostgreSQL (Tabellen `local_threads`, `local_thread_events`, `local_thread_locks`).
- Sie spricht dieselbe Schnittstelle wie der gehostete Dienst (REST und Phoenix-WebSocket), sodass die MIT-lizenzierten Pakete `@copilotkit/runtime` und `@copilotkit/react-core` unverändert laufen.
- Das Gedächtnis liegt in OpenBots eigener Datenbank. Automatisches Learning, Trajectories und Echtzeit-Aktualisierung der Thread-Liste gibt es im lokalen Modus nicht.
- Es wird nichts an CopilotKit gesendet (Telemetrie ist abgeschaltet).

Eingeschaltet wird das mit `INTELLIGENCE_MODE=local`. Das ist in `.env.example` der Standard. Der Rest der Intelligence-Einstellungen wird dann ignoriert. Aufbau, Konfiguration, Sicherheit und Grenzen stehen in [docs/migration-off-copilotkit.md](docs/migration-off-copilotkit.md).

Die Plattform lauscht nur auf `127.0.0.1:4390` (`LOCAL_PLATFORM_PORT`). Der Zugang für Browser ist über signierte, auf Thread und Person begrenzte Token geschützt, der Zugang der Laufzeit nur von dieser Maschine aus. Mit `OPENBOT_PUBLIC_URL` erreichen Browser auf anderen Rechnern die Plattform über den Server selbst (`/api/local-platform/client`), ohne zusätzlichen Port.

## Voraussetzungen

- [Bun](https://bun.sh) 1.4 oder neuer
- PostgreSQL 16 oder neuer mit der Erweiterung **pgvector** (`docker-compose.yml` bringt `pgvector/pgvector:pg17` mit)
- Docker, wenn die Bots einen eigenen Browser („Computer“) nutzen sollen
- Ein Sprachmodell: ein OpenAI-Schlüssel oder ein OpenAI-kompatibler Endpunkt (`OPENAI_BASE_URL`)

## Start

```bash
cp .env.example .env
bun install
```

In `.env` den Modellschlüssel eintragen (`OPENAI_API_KEY=`). `TENANT_PACKAGE_DIR` zeigt schon auf `../examples/impppact`, `INTELLIGENCE_MODE=local` ist gesetzt. Den öffentlichen Beispielschlüssel `KEY_ENCRYPTION_KEY` vor jedem Einsatz außerhalb des eigenen Rechners ersetzen:

```bash
openssl rand -base64 32
```

Dann alles starten (Docker-Dienste, Server, Prüfung, App):

```bash
bash scripts/start.sh
```

Die App läuft danach auf Port 3010. Beim ersten Öffnen führt ein kurzer Einstieg durch die Funktionen.

Für Entwicklung ohne Docker genügt eine laufende PostgreSQL mit pgvector. Dann `DATABASE_URL` setzen, `bun server/scripts/migrate.ts` ausführen, und Server und App einzeln starten:

```bash
cd server && bun src/index.ts
```

```bash
cd app && bun run dev --host 127.0.0.1 --port 3010
```

Ohne Anmeldedienst gilt jede Anfrage als ein lokaler Administrator (`OPENBOT_SINGLE_USER=true`). Für mehrere Personen die Anmeldung (Google, Microsoft oder Okta) einrichten, wie in [README.openbot.md](README.openbot.md#sign-in) beschrieben.

## Deutsche Oberfläche

Die App öffnet auf Deutsch, weil `examples/impppact/brand.yaml` `default_locale: de` setzt. Jede Person kann unter Einstellungen → Sprache auf Englisch umstellen (gespeichert im Browser). Ohne Angabe im Mandanten gilt die Sprache des Browsers, sonst Englisch.

Übersetzt sind die täglichen Wege: Seitenleiste, Chat mit Eingabefeld und Meldungen, neue Unterhaltung, Gruppen, Sprachanruf, Verbindungen, Fähigkeiten, Gedächtnis, Einstellungen, Freigaben, die Seiten eines einzelnen Bots (Profil, Aktivität, Zugriff, Einrichtung, Teilen, Routinen, Zuständigkeiten) und der Einstieg. **Noch englisch** sind unter anderem Admin, Audit, Passwörter, die Komponenten-Galerie und die Skins. Die Bots antworten unabhängig davon in der Sprache der Anfrage.

So kommt ein Text dazu:

1. Im Quelltext `t("English text")` aus `@/lib/i18n` verwenden. Der englische Text ist der Schlüssel. Werte stehen benannt darin: `t("Hello, {name}", { name })`.
2. In `app/src/lib/i18n/de.ts` die deutsche Übersetzung unter demselben Schlüssel eintragen („Sie“, kurze Sätze, Wortschatz nach dem Glossar in `.claude/skills/openbot-copy`).

`bun test app/tests/i18n.test.ts` schlägt fehl, wenn ein `t()`-Text keine Übersetzung hat oder die Übersetzung andere `{Werte}` enthält. Fehlt eine Übersetzung zur Laufzeit, zeigt die App den englischen Text.

## Tests

```bash
export TEST_DATABASE_URL=postgres://postgres:postgres@localhost:5432/openbot_test
bun test server/tests/local-platform.test.ts server/tests/local-platform-store.test.ts server/tests/local-platform-runtime.test.ts server/tests/impppact-package.test.ts
```

Die Testdatenbank braucht vorher `bun server/scripts/migrate.ts` mit `DATABASE_URL` auf dieselbe Datenbank.

## Stand der Prüfung

Im echten Browser (Chromium), mit einer Attrappe als Modell, gegen den Server im lokalen Modus:

- Nachricht an einen Bot, Antwort live
- Verlauf nach Neuladen der Seite und nach Neustart des Servers
- Stopp-Knopf bei einer langen Antwort, danach nächste Nachricht
- Unterhaltung über „New chat“ mit einem Bot, Eintrag in der Seitenleiste, Wiederöffnen über die Adresse

Noch nicht geprüft: ein echtes Sprachmodell, der Computer-Dienst der Bots (braucht Docker), Freigaben, mehrere Personen gleichzeitig, Betrieb hinter einem Reverse-Proxy.

## Weitere Dokumentation

- [Architektur](docs/architecture.md), [Konfiguration](docs/configuration.md), [Bereitstellung](docs/deployment.md) (Upstream, teils noch auf CopilotKit Intelligence bezogen)
- [Betrieb ohne CopilotKit](docs/migration-off-copilotkit.md)
