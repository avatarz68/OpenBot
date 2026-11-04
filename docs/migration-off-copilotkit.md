# Migration plan: ImPPPact without CopilotKit

Goal: run the platform with open-source parts only. Decisions so far:

- Keep **AG-UI** (`@ag-ui/*`, open protocol). It is how Bots speak; it is not a CopilotKit service.
- Replace **CopilotKit Intelligence** (threads, realtime gateway, memory, learning) with PostgreSQL, our own WebSocket/SSE layer and **Mem0** for memory.
- Replace **`@copilotkit/runtime`** with our own Hono + AG-UI client layer.
- Replace **`@copilotkit/react-core`** with **assistant-ui** (MIT) plus our own AG-UI hooks.

Status: analysis only. No application code has been changed yet.

## Where CopilotKit is used today

| Area | Files | What it does |
| --- | --- | --- |
| Intelligence client | `server/src/intelligence-client.ts`, `server/src/intelligence-entitlement-check.ts`, `server/src/self-host-banner.ts` | Account, entitlement, banner |
| Turn runner and threads | `server/src/copilot.ts` (2.2k lines), `server/src/index.ts`, `toolkit/src/run-turn.ts` (restates runtime internals by hand), `toolkit/src/copilotkit/*`, `server/src/agents/handoff-*.ts` | Thread lifecycle, leases, runner over the realtime gateway |
| Memory | `server/src/memory/intelligence.ts` (+ store, ingestion, routes) | Durable per-person memory and recall |
| Learning | `server/src/learning/*` (about 2.5k lines) | Learned skills, containers, sharing |
| Recorder, telemetry | `server/src/recorder/*`, `server/src/telemetry/product-boundaries.ts` | Runtime hooks |
| Browser app | about 30 files importing `@copilotkit/react-core/v2` (`app/src/lib/copilot/*`, `app/src/components/channels/*`) | Chat, composer, attachments, frontend tools, human-in-the-loop, generative UI, A2UI |
| Other | `extension/` (`@copilotkit/learning`), `desktop/src-tauri`, `scripts/` (setup-learning, Composio provisioning), `charts/`, `docs/` | Provisioning, patches, packaging |

## Phases

Each phase must leave `bun run test` green and the product startable.

1. **Seams.** Define ports in `toolkit/src/ports.ts` style for `ThreadStore`, `TurnRunner`, `MemoryStore`, `LearningStore`. Make existing code depend on the ports, with the CopilotKit implementation as the first adapter. No behaviour change.
2. **Postgres thread store and runner.** Threads, messages, leases and run state in PostgreSQL; own streaming transport to the browser (SSE first). Replaces the realtime gateway. This is the largest step.
3. **Mem0 memory adapter.** Self-hosted Mem0 on Postgres with pgvector. Keep the existing OpenBot-side rows for what Mem0 has no field for (paused, source, visibility); map as `memory/intelligence.ts` does today.
4. **Learning.** Either port learned skills to Postgres or remove the feature behind a flag. Decide after phase 2.
5. **Frontend.** Replace `CopilotProvider`, `CopilotChat`, `useAgent`, `useFrontendTool`, `useHumanInTheLoop`, `useRenderTool` and the generative-UI/A2UI renderers with assistant-ui and thin AG-UI hooks. Port approval tools and sandboxed tools first, they carry the governance.
6. **Cleanup.** Remove the packages, the `@copilotkit/learning` patch, `setup-learning`, Composio provisioning via the CopilotKit CLI, CopilotKit telemetry and banner, then rewrite `.env.example`, charts and docs.

## Risks

- `toolkit/src/run-turn.ts` and `history-sanitize.ts` mirror runtime internals line by line. Behaviour that is only implicit today (resume entries, tool-result ordering, stall and watchdog handling) needs its own tests before it is replaced.
- About 100 tests mention CopilotKit; many use recorded Intelligence traffic fixtures.
- Upstream updates from the original project become hard to merge after phase 2.
- Phase 1 should be reviewed before anything else is built on it.
