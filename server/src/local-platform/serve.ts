import type { Database } from "../db/client";
import { createLocalPlatform } from "./platform";
import { PostgresThreadStore } from "./postgres-store";

/**
 * Starts the embedded platform on loopback, for a deployment that runs with
 * `INTELLIGENCE_MODE=local`.
 *
 * Loopback only: the runner and the browser gateway reach it as `127.0.0.1`, and nothing outside
 * this machine can. REST calls must carry the derived key; the WebSocket relies on the loopback
 * binding. A deployment whose browsers cannot reach `127.0.0.1` sets
 * `INTELLIGENCE_BROWSER_GATEWAY_WS_URL` to an address that proxies to this port.
 */
export function startLocalPlatform(options: {
  database: Database;
  port: number;
  apiKey: string;
}) {
  const platform = createLocalPlatform({
    store: new PostgresThreadStore(options.database),
    apiKey: options.apiKey,
  });
  return Bun.serve({
    hostname: "127.0.0.1",
    port: options.port,
    fetch: (request, server) =>
      platform.fetch(request, server as never) as never,
    websocket: platform.websocket as never,
  });
}
