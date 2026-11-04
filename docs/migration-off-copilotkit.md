# ImPPPactBot ohne CopilotKit Intelligence

Dieses Dokument beschreibt, wie ImPPPactBot ohne das gehostete CopilotKit-Konto läuft, was dafür gebaut wurde und was bewusst fehlt. Der übrige Teil von `docs/` stammt vom Upstream-Projekt und geht noch von CopilotKit Intelligence aus.

## Ergebnis

Mit `INTELLIGENCE_MODE=local` (Standard in `.env.example`) startet der Server ohne CopilotKit-Konto, Schlüssel oder Lizenz. Threads, Verlauf und Läufe liegen in der eigenen PostgreSQL-Datenbank. Es wird nichts an CopilotKit gesendet.

Weiter genutzt werden die MIT-lizenzierten Pakete `@copilotkit/runtime` und `@copilotkit/react-core` (Chat-Oberfläche und Lauf-Steuerung) sowie das offene Protokoll AG-UI. Ersetzt ist nur der gehostete Dienst *Intelligence*.

## Aufbau

Die eingebaute Plattform (`server/src/local-platform/`) spricht dieselbe Schnittstelle wie Intelligence, deshalb läuft der übrige Code unverändert:

| Teil | Aufgabe |
| --- | --- |
| `platform.ts` | REST unter `/api/threads` (anlegen, lesen, umbenennen, archivieren, löschen, Nachrichtenverlauf, Sperre, Zugangsdaten für Browser), `/runner/websocket` für den Lauf, `/client/websocket` für Browser |
| `store.ts`, `postgres-store.ts` | Zustand: Arbeitsspeicher (Tests) oder PostgreSQL (Tabellen `local_threads`, `local_thread_events`, `local_thread_locks`) |
| `fold.ts` | setzt den Nachrichtenverlauf aus dem Ereignisprotokoll eines Threads zusammen |
| `serve.ts` | startet die Plattform beim Serverstart auf `127.0.0.1:LOCAL_PLATFORM_PORT` (Standard 4390) |
| `http-server.ts` | leitet Browser-Sockets unter `/api/local-platform/client/websocket` an die Plattform weiter |

Ablauf einer Nachricht: Der Browser startet über die Laufzeit einen Lauf. Die Laufzeit sperrt den Thread, verbindet sich als Runner mit der Plattform und schickt die Ereignisse des Bots (AG-UI). Die Plattform speichert sie und verteilt sie live an den Browser. Beim Neuladen oder nach einem Neustart setzt der Browser mit der zuletzt gesehenen Ereignis-ID fort, und die Plattform spielt nur das Fehlende nach. Der Stopp-Knopf erreicht den Runner über den offenen Kanal. Endet ein Lauf, egal wie, gibt die Plattform die Sperre frei.

## Konfiguration

| Variable | Bedeutung |
| --- | --- |
| `INTELLIGENCE_MODE=local` | schaltet die eingebaute Plattform ein |
| `LOCAL_PLATFORM_PORT` | Port auf Loopback, Standard 4390 |
| `OPENBOT_PUBLIC_URL` | öffentliche Adresse. Browser verbinden sich dann über `<Adresse>/api/local-platform/client`. Ohne sie wird `127.0.0.1` genommen, was nur auf derselben Maschine geht |
| `INTELLIGENCE_BROWSER_GATEWAY_WS_URL` | überschreibt die Browser-Adresse |

Die gehosteten Einstellungen (`INTELLIGENCE_API_URL`, `INTELLIGENCE_GATEWAY_WS_URL`, `CPK_INTELLIGENCE_API_KEY`) sind in `.env.example` auskommentiert. Sie gelten nur, wenn `INTELLIGENCE_MODE` nicht `local` ist.

## Sicherheit

- Die Plattform lauscht nur auf Loopback. Der Runner-Zugang weist Verbindungen ab, die über einen Proxy kamen (`x-forwarded-for`) oder nicht von Loopback stammen.
- Browser brauchen ein signiertes Token, das auf einen Thread und eine Person lautet und 12 Stunden gilt. Gefälschte oder fremde Token werden abgewiesen.
- Die Weiterleitung im Server prüft wie jeder Socket die Herkunft (`TRUSTED_ORIGINS`). Das Token der Plattform ist ihr Berechtigungsnachweis.
- Produkt-Telemetrie ist im lokalen Modus aus, auch bei ausdrücklichem Opt-in. Die Telemetrie der CopilotKit-Laufzeit ist ebenfalls abgeschaltet.

## Was es im lokalen Modus nicht gibt

- **Automatisches Learning, Trajectories und gelernte Fähigkeiten.** Sie hängen an Intelligence.
- **Gedächtnis in Intelligence.** Das Gedächtnis liegt in OpenBots eigener Datenbank. Die Plattform meldet eine aktive Lizenz ohne Funktionen, damit die Oberfläche keine Lizenzhinweise zeigt und das Gedächtnis lokal bleibt.
- **Echtzeit-Aktualisierung der Thread-Liste** in einem zweiten Fenster. Die Liste wird beim Laden über REST gelesen.
- **Die Inspector-Ansicht** der Laufzeit.

## Verbleibende CopilotKit-Bezüge

- Die Pakete `@copilotkit/runtime`, `@copilotkit/react-core`, `@copilotkit/shared` (MIT) und `@copilotkit/aimock` (nur Tests). `@copilotkit/learning` steckt nur in der Browser-Erweiterung.
- Der Code für den gehosteten Modus bleibt erhalten, damit Upstream-Änderungen übernehmbar bleiben. Er ist ohne `INTELLIGENCE_MODE=local` aktiv.
- `scripts/setup-composio.ts` und `scripts/setup-learning.ts` nutzen die CopilotKit-CLI. `scripts/start.sh` überspringt beide im lokalen Modus. Apps über Composio gehen dort mit einem eigenen `COMPOSIO_API_KEY`.
- Das Self-Host-Banner und die Onboarding-Seite „Deploy it for your organization“ (mit Link zum CopilotKit-Vertrieb) sind im lokalen Modus ausgeblendet. Der Code dazu liegt weiter in `app/src/components/layout/self-host-banner.tsx`.
- `README.openbot.md`, `docs/` und die Helm-Charts beschreiben den Upstream-Betrieb.

## Tests

```bash
export TEST_DATABASE_URL=postgres://postgres:postgres@localhost:5432/openbot_test
bun test server/tests/local-platform.test.ts \
  server/tests/local-platform-store.test.ts \
  server/tests/local-platform-runtime.test.ts \
  server/tests/local-platform-gateway.test.ts
```

`local-platform-runtime.test.ts` fährt die echte Laufzeit im lokalen Modus gegen die Plattform. `local-platform-gateway.test.ts` prüft die Weiterleitung für Browser, einschließlich des ersten Frames beim Verbindungsaufbau.

## Noch nicht geprüft

- Ein Durchlauf mit einem echten Sprachmodell.
- Der Betrieb über Docker Compose und Helm mit `OPENBOT_PUBLIC_URL` hinter einem Reverse-Proxy. Die Weiterleitung ist getestet, ein Start mit Compose in dieser Sitzung nicht (kein Docker).
- Mehrere Personen gleichzeitig.
