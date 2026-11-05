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
| `OPENBOT_PUBLIC_URL` | öffentliche Adresse. Browser verbinden sich dann über `<Adresse>/api/local-platform/client`. Ohne sie und ohne `APP_DIST_DIR` wird `127.0.0.1` genommen, was nur auf derselben Maschine geht |
| `APP_DIST_DIR` | gesetzt, wenn der Server die App selbst ausliefert (so im Container-Image). Dann bekommt der Browser den Pfad `/api/local-platform/client` auf der eigenen Herkunft, unabhängig vom öffentlichen Namen |
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

## Docker und Kubernetes

- **Image:** Das Image baut die App mit dem Mandanten aus dem Build-Argument `TENANT_PACKAGE_DIR` (Standard `../examples/impppact`). Darin stecken Produktname und Standardsprache. Ein anderer Mandant: `--build-arg TENANT_PACKAGE_DIR=../examples/<name>`. Ein lokaler Produktions-Build mit dieser Einstellung enthält „ImPPPactBot“ und `defaultLocale: "de"`.
- **Compose:** `docker-compose.yml` gibt `TENANT_PACKAGE_DIR` (Standard `impppact`), `INTELLIGENCE_MODE`, `LOCAL_PLATFORM_PORT` und `OPENBOT_PUBLIC_URL` an den Server weiter. Beide Dockerfiles (`Dockerfile` und `server/Dockerfile`, das Compose nutzt) kennen das Build-Argument `TENANT_PACKAGE_DIR`.
- **Geprüft mit Docker:** `docker compose config` ist gültig und zeigt für den Server `INTELLIGENCE_MODE=local` und den Mandanten `impppact`. Der PostgreSQL-Container (`pgvector/pgvector:pg17`) nimmt alle 76 Migrationen an, einschließlich der Tabellen der eingebauten Plattform. Server und App gegen diesen Container: Chat, Stopp, Kanäle, Gedächtnis und Verlauf nach Neustart funktionieren. Ein Server, der die gebaute App selbst ausliefert (wie im Image), reicht mit Port 3001 allein: Titel „ImPPPactBot“, Sprache Deutsch, Chat über die weitergeleitete Verbindung.
- **Mit Docker gestartet:** Das Server-Image (`server/Dockerfile`, 2,2 GB) wurde gebaut, und `docker compose --profile openbot up -d server worker` startete PostgreSQL, die Migration, den Server und den Worker (Server „healthy“). Die App auf Port 3010 zeigt „ImPPPactBot“ auf Deutsch, die acht Bots sind angelegt, und im Browser funktionieren Chat über die weitergeleitete Verbindung und der Verlauf nach einem Neustart des Server-Containers. Das Sprachmodell war ein Ersatz auf dem Host (`OPENAI_CONTAINER_BASE_URL`).
- **Voraussetzung dafür:** das Verzeichnis `.openbot` muss vor dem ersten Start existieren (`mkdir .openbot`), sonst verweigert Docker den Bind-Mount. `scripts/start.sh` legt es an.
- **Hinter einem Proxy, der TLS abfängt:** `bun install` im Build scheitert mit `SELF_SIGNED_CERT_IN_CHAIN`. Abhilfe ohne Änderung am Repository: eine Kopie von `server/Dockerfile`, die vor `RUN bun install` die CA des Proxys einbindet (`COPY --from=ca ca-bundle.crt /tmp/ca-bundle.crt` und `ENV NODE_EXTRA_CA_CERTS=/tmp/ca-bundle.crt`), gebaut mit `docker build -f <Kopie> -t openbot-server:latest --build-context ca=<Ordner mit der CA> .`. Danach `IMAGE_PULL_POLICY=never`, damit Compose das Image nicht neu baut.
- **Nicht gestartet:** `agent-computer`, `supervisor` und die Beispiel-Bots (große Images, brauchen die Computer-Dienste). Ohne sie meldet der Server Fehler beim Setzen der Netzrichtlinie, der Chat läuft trotzdem. Hinweis: `docker-compose.yml` veröffentlicht Ports zusätzlich auf `[::1]`. Auf einem Rechner ohne IPv6 scheitert der Start deshalb mit „address family not supported“.
- **Helm:** Der Standardmandant im Chart ist `impppact`. **Der lokale Modus ist im Chart noch nicht eingebaut.** `templates/validation.yaml` und `templates/secret.yaml` verlangen weiterhin `config.intelligence.*` und `secrets.intelligenceApiKey`, und die Umgebung des Servers kennt `INTELLIGENCE_MODE` nicht. Nötig ist: ein Wert `config.intelligence.mode`, die beiden Prüfungen nur ohne `local` und die Umgebungsvariable `INTELLIGENCE_MODE=local` im gemeinsamen Env-Block (`templates/_helpers.tpl`). Ich habe das nicht geändert, weil in der Sitzung kein `helm` zum Rendern und Prüfen zur Verfügung stand.

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
- Der Betrieb hinter einem Reverse-Proxy mit `OPENBOT_PUBLIC_URL`. Die Weiterleitung ist getestet, der Start über Compose auf einem Rechner mit Reverse-Proxy nicht.
- Mehrere Personen gleichzeitig.
