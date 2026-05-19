import type { ChatMessage } from "@/app/_lib/recommender/types";

/** UI-only intros — never send to the model. */
const STATIC_INTROS = new Set([
  "Describe what's slowing your business down. We'll recommend an Engine and draft a scope.",
  "Describe your biggest operational challenge. We'll recommend an Engine and outline a starting scope.",
]);

/** Strip welcome copy and map to API-safe thread. */
export function prepareMessagesForApi(raw: ChatMessage[]): ChatMessage[] {
  return raw.filter((m) => {
    if (m.role === "assistant" && STATIC_INTROS.has(m.content.trim())) {
      return false;
    }
    return true;
  });
}
