/**
 * Server-side scope gate — brief scoping only. Blocks off-topic input
 * without calling the LLM. Always returns the same copy.
 */

export const OUT_OF_SCOPE_REPLY =
  "Sorry, that's out of scope for this discussion. What problems is your business facing?";

const OFF_TOPIC_PATTERNS: RegExp[] = [
  /^(hi|hello|hey|yo|sup|thanks|thank you|ok|okay|cool|cheers)[\s!.?]*$/i,
  /^(who are you|what are you|what can you do|help me|how does this work)[\s?!.]*$/i,
  /write (me )?(some )?code|debug this|fix (this|my) (bug|code)|python script|javascript function/i,
  /explain (what|how)|teach me|tutorial on|step by step guide/i,
  /\b(chatgpt|gpt-?4|claude|gemini)\b/i,
  /tell me (a )?joke|write (a )?poem|story about|roleplay/i,
  /weather|football|cricket|recipe for|movie recommendation/i,
  /political|election|religion|dating advice/i,
  /homework|essay for|assignment due/i,
  /scrape|scraping|linkedin|cold (email|outreach|dm)/i,
];

const BRIEF_SIGNALS =
  /\b(lead|enquir|inbox|ticket|support|invoice|receipt|xero|quickbooks|workflow|automate|mvp|prototype|founder|crm|hubspot|slack|notion|report|dashboard|sop|wiki|outreach|email list|agency|tradie|plumber|hire|staff|hours a week|manual|repeatable|engine labs|scope|sow)\b/i;

export type ScopeCheck =
  | { allowed: true }
  | { allowed: false; reply: typeof OUT_OF_SCOPE_REPLY };

export function checkMessageScope(text: string, turnIndex: number): ScopeCheck {
  const trimmed = text.trim();
  if (!trimmed) return { allowed: false, reply: OUT_OF_SCOPE_REPLY };

  if (turnIndex === 0 && trimmed.length < 12 && !BRIEF_SIGNALS.test(trimmed)) {
    if (OFF_TOPIC_PATTERNS.some((p) => p.test(trimmed))) {
      return { allowed: false, reply: OUT_OF_SCOPE_REPLY };
    }
  }

  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { allowed: false, reply: OUT_OF_SCOPE_REPLY };
    }
  }

  if (trimmed.length > 80 && !BRIEF_SIGNALS.test(trimmed) && turnIndex === 0) {
    return { allowed: false, reply: OUT_OF_SCOPE_REPLY };
  }

  return { allowed: true };
}
