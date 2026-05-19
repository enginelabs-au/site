import type { ChatMessage } from "@/app/_lib/recommender/types";
import type { RecommendationResponse } from "@/app/_lib/recommender/types";
import { formatVisitorSignatureName } from "@/app/_lib/recommender/visitor-signature";

/** Injected into the recommender system prompt — LLM must fill contact_handoff on every recommendation. */
export const CONTACT_HANDOFF_PROMPT = `# Contact handoff email (required on every recommendation)
Include contact_handoff in the recommendation JSON. This becomes the visitor's pre-filled message when they tap "Send your brief".

contact_handoff rules:
- email_subject: "Control Centre brief — {engine name(s) or Discovery call} | {3–6 word problem label from visitor words}"
- email_body: plain text only (use \\n for line breaks). No markdown headings with #. Use ALL CAPS section labels exactly as below.
- Write in the visitor's first person ("I", "my", "we").
- Pull facts only from the thread and your recommendation — no invented tools, budgets, or deadlines.
- Vary content by outcome:
  - recommend: emphasise chosen Engine(s), tier, price band, what they provide, success outcome.
  - escalate or empty recommended_engines: emphasise unknowns, sensitive areas, and that they want a discovery call.
  - decline: polite ask whether a narrower scope could work; do not pitch an Engine.
- Keep email_body under 900 words. Be scannable — short bullets, not paragraphs of filler.
- Do not paste the full chat transcript; summarise in "CONTEXT FROM OUR CHAT" (max 5 bullets).

email_body structure (use these section labels in order; omit a section only if truly empty):

Hi Engine Labs,

I'm sending my Control Centre brief from your website.

WHAT I NEED HELP WITH
{1–3 sentences in the visitor's words}

CONTEXT FROM OUR CHAT
- {bullet}
(up to 5 bullets)

SUGGESTED DIRECTION
{Engine name(s), tier, price band, timeline — or discovery call if none}

SUCCESS LOOKS LIKE
{from draft_sow_seed.business_outcome}

WHAT I'LL PROVIDE
- {from what_visitor_provides across engines}

CONSTRAINTS & NOTES
{sensitive flags, exclusions, integrations mentioned — or "None noted."}

NEXT STEP I'M ASKING FOR
{discovery call / refined SOW / paid scoping — match suggested_next_step}

Thanks,
{visitor first name or full name if known from intake — end with a full stop, e.g. "Cam." — otherwise "Your name"}`;

export function buildFallbackHandoffEmail(params: {
  seedBrief: string;
  messages: ChatMessage[];
  parsed: RecommendationResponse;
  visitorName?: string;
}): { subject: string; body: string } {
  const { parsed, seedBrief, messages } = params;

  const engineNames =
    parsed.recommended_engines.length > 0
      ? parsed.recommended_engines.map((e) => e.name).join(" + ")
      : "Discovery call";

  const problemLabel = seedBrief.trim().split(/\s+/).slice(0, 6).join(" ");
  const subject = `Control Centre brief — ${engineNames} | ${problemLabel || "New brief"}`;

  const userBullets = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.trim())
    .filter(Boolean)
    .slice(0, 5)
    .map((c) => `- ${c.length > 220 ? `${c.slice(0, 217)}…` : c}`);

  const engineBlock =
    parsed.recommended_engines.length > 0
      ? parsed.recommended_engines
          .map(
            (e) =>
              `- ${e.name} (${e.tier}) — ${e.price_band_aud}, ~${e.typical_timeline_weeks} weeks. ${e.why_it_fits}`,
          )
          .join("\n")
      : "- Discovery call to map scope — no single Engine locked yet.";

  const provides = [
    ...new Set(
      parsed.recommended_engines.flatMap((e) => e.what_visitor_provides).filter(Boolean),
    ),
  ];
  const providesBlock = provides.length
    ? provides.map((p) => `- ${p}`).join("\n")
    : "- To confirm on the discovery call.";

  const constraints: string[] = [];
  if (parsed.sensitive_area_flag && parsed.sensitive_area_reason.trim()) {
    constraints.push(`- Sensitive area: ${parsed.sensitive_area_reason.trim()}`);
  }
  for (const e of parsed.recommended_engines) {
    for (const ex of e.exclusions) {
      constraints.push(`- Out of scope: ${ex}`);
    }
  }
  if (parsed.classification.rationale?.trim()) {
    constraints.push(`- ${parsed.classification.rationale.trim()}`);
  }
  const constraintsBlock = constraints.length ? constraints.join("\n") : "- None noted.";

  const nextStep =
    parsed.suggested_next_step === "paid_scoping_workshop"
      ? "Paid scoping workshop, then a refined SOW."
      : parsed.suggested_next_step === "decline"
        ? "Whether a narrower scope could be a fit."
        : parsed.recommended_engines.length === 0
          ? "A free discovery call to map scope and pricing."
          : "A refined SOW and next steps within one business day (Sydney).";

  const body = [
    "Hi Engine Labs,",
    "",
    "I'm sending my Control Centre brief from your website.",
    "",
    "WHAT I NEED HELP WITH",
    parsed.summary_in_visitor_framing.trim() || seedBrief.trim(),
    "",
    "CONTEXT FROM OUR CHAT",
    userBullets.length ? userBullets.join("\n") : `- ${seedBrief.trim()}`,
    "",
    "SUGGESTED DIRECTION",
    engineBlock,
    "",
    "SUCCESS LOOKS LIKE",
    parsed.draft_sow_seed.business_outcome.trim() ||
      parsed.draft_sow_seed.project_snapshot.trim() ||
      "To be confirmed on the discovery call.",
    "",
    "WHAT I'LL PROVIDE",
    providesBlock,
    "",
    "CONSTRAINTS & NOTES",
    constraintsBlock,
    "",
    "NEXT STEP I'M ASKING FOR",
    nextStep,
    "",
    "Thanks,",
    formatVisitorSignatureName(params.visitorName ?? ""),
  ].join("\n");

  return { subject, body };
}
