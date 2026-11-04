import type { StoredEvent } from "./store";

type Message = Record<string, unknown> & { id: string; role: string };

/**
 * Turns a thread's event log into the message history a client reads.
 *
 * The runner puts the run's input messages on `RUN_STARTED`, so a person's turn arrives as an event
 * like everything else. Assistant text and tool calls are folded from their start/content/end
 * triples, and a `TOOL_CALL_RESULT` becomes a `tool` message. A message seen twice (the same input
 * replayed by the next run) keeps its first position.
 */
export function foldMessages(events: StoredEvent[]): Message[] {
  const order: string[] = [];
  const byId = new Map<string, Message>();
  const put = (message: Message) => {
    if (!byId.has(message.id)) order.push(message.id);
    byId.set(message.id, message);
  };

  for (const event of events) {
    switch (event.type) {
      case "RUN_STARTED": {
        const input = event.input as { messages?: Message[] } | undefined;
        for (const message of input?.messages ?? []) {
          if (message?.id && !byId.has(message.id)) put({ ...message });
        }
        break;
      }
      case "TEXT_MESSAGE_START": {
        const id = String(event.messageId);
        put({
          id,
          role: String(event.role ?? "assistant"),
          content: "",
        });
        break;
      }
      case "TEXT_MESSAGE_CONTENT": {
        const message = byId.get(String(event.messageId));
        if (message)
          message.content = `${String(message.content ?? "")}${String(event.delta ?? "")}`;
        break;
      }
      case "TOOL_CALL_START": {
        const parentId = event.parentMessageId
          ? String(event.parentMessageId)
          : undefined;
        const call = {
          id: String(event.toolCallId),
          type: "function",
          function: { name: String(event.toolCallName), arguments: "" },
        };
        const parent = parentId ? byId.get(parentId) : undefined;
        if (parent) {
          const calls = (parent.toolCalls as unknown[] | undefined) ?? [];
          parent.toolCalls = [...calls, call];
        } else {
          put({
            id: parentId ?? `tool-call-owner-${String(event.toolCallId)}`,
            role: "assistant",
            toolCalls: [call],
          });
        }
        break;
      }
      case "TOOL_CALL_ARGS": {
        for (const message of byId.values()) {
          const calls = message.toolCalls as
            | { id: string; function: { arguments: string } }[]
            | undefined;
          const call = calls?.find((c) => c.id === String(event.toolCallId));
          if (call) call.function.arguments += String(event.delta ?? "");
        }
        break;
      }
      case "TOOL_CALL_RESULT": {
        put({
          id: String(event.messageId),
          role: "tool",
          toolCallId: String(event.toolCallId),
          content: String(event.content ?? ""),
        });
        break;
      }
      case "MESSAGES_SNAPSHOT": {
        for (const message of (event.messages as Message[]) ?? []) {
          if (message?.id) put({ ...message });
        }
        break;
      }
    }
  }
  return order.map((id) => byId.get(id) as Message);
}
