import type { ClarifyResponse, RecommendationResponse, RecommenderResponse } from "@/app/_lib/recommender/types";

export function extractJsonObject(raw: string): string {
  const trimmed = raw.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) return fence[1].trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

/** Close truncated JSON objects/arrays so JSON.parse can succeed. */
function repairTruncatedJson(text: string): string {
  let repaired = text.trim();
  const openBraces = (repaired.match(/\{/g) ?? []).length;
  const closeBraces = (repaired.match(/\}/g) ?? []).length;
  const openBrackets = (repaired.match(/\[/g) ?? []).length;
  const closeBrackets = (repaired.match(/\]/g) ?? []).length;

  if (repaired.endsWith(",")) repaired = repaired.slice(0, -1);

  for (let i = 0; i < openBrackets - closeBrackets; i++) repaired += "]";
  for (let i = 0; i < openBraces - closeBraces; i++) repaired += "}";

  return repaired;
}

function normalizeClarify(parsed: Record<string, unknown>): ClarifyResponse {
  const questions = Array.isArray(parsed.questions)
    ? parsed.questions.filter((q): q is string => typeof q === "string").slice(0, 2)
    : [];
  return {
    type: "clarify",
    turn: typeof parsed.turn === "number" ? parsed.turn : 1,
    preface: typeof parsed.preface === "string" ? parsed.preface : "",
    questions,
    internal_state:
      parsed.internal_state && typeof parsed.internal_state === "object"
        ? (parsed.internal_state as Record<string, unknown>)
        : undefined,
  };
}

function normalizeRecommendation(parsed: Record<string, unknown>): RecommendationResponse {
  const classification =
    parsed.classification && typeof parsed.classification === "object"
      ? (parsed.classification as Record<string, unknown>)
      : {};

  const engines = Array.isArray(parsed.recommended_engines)
    ? parsed.recommended_engines
        .filter((e): e is Record<string, unknown> => Boolean(e) && typeof e === "object")
        .slice(0, 3)
    : [];

  const sow =
    parsed.draft_sow_seed && typeof parsed.draft_sow_seed === "object"
      ? (parsed.draft_sow_seed as Record<string, unknown>)
      : {};

  const strList = (v: unknown, max = 4) =>
    Array.isArray(v)
      ? v.filter((x): x is string => typeof x === "string").slice(0, max)
      : [];

  return {
    type: "recommendation",
    outcome:
      parsed.outcome === "escalate" || parsed.outcome === "decline"
        ? parsed.outcome
        : "recommend",
    summary_in_visitor_framing:
      typeof parsed.summary_in_visitor_framing === "string"
        ? parsed.summary_in_visitor_framing
        : "Based on your brief, here is a starting scope.",
    classification: {
      engine_fit: strList(classification.engine_fit, 4),
      scope_size:
        typeof classification.scope_size === "string" ? classification.scope_size : "standard",
      risk_tier:
        typeof classification.risk_tier === "string" ? classification.risk_tier : "green",
      data_class:
        typeof classification.data_class === "string" ? classification.data_class : "internal",
      confidence:
        typeof classification.confidence === "number" ? classification.confidence : 0.75,
      rationale:
        typeof classification.rationale === "string"
          ? classification.rationale
          : "Fits the described work pattern.",
    },
    recommended_engines: engines.map((e) => ({
      slug: typeof e.slug === "string" ? e.slug : "insight_engine",
      name: typeof e.name === "string" ? e.name : "Insight Engine",
      why_it_fits: typeof e.why_it_fits === "string" ? e.why_it_fits : "",
      tier: typeof e.tier === "string" ? e.tier : "standard",
      price_band_aud:
        typeof e.price_band_aud === "string" ? e.price_band_aud : "from A$1,200",
      typical_timeline_weeks:
        typeof e.typical_timeline_weeks === "string" ? e.typical_timeline_weeks : "2-4",
      what_visitor_provides: strList(e.what_visitor_provides, 3),
      exclusions: strList(e.exclusions, 3),
    })),
    sensitive_area_flag: Boolean(parsed.sensitive_area_flag),
    sensitive_area_reason:
      typeof parsed.sensitive_area_reason === "string" ? parsed.sensitive_area_reason : "",
    suggested_next_step:
      typeof parsed.suggested_next_step === "string"
        ? parsed.suggested_next_step
        : "talk_to_cam",
    decline_or_escalation_message:
      typeof parsed.decline_or_escalation_message === "string"
        ? parsed.decline_or_escalation_message
        : "",
    draft_sow_seed: {
      project_snapshot:
        typeof sow.project_snapshot === "string" ? sow.project_snapshot : "",
      business_outcome: typeof sow.business_outcome === "string" ? sow.business_outcome : "",
      included_deliverables: strList(sow.included_deliverables, 4),
      exclusions: strList(sow.exclusions, 4),
      milestones: strList(sow.milestones, 4),
      price_aud: typeof sow.price_aud === "string" ? sow.price_aud : "from A$0 (AUD)",
      assumptions: strList(sow.assumptions, 3),
    },
    contact_handoff: normalizeContactHandoff(parsed.contact_handoff),
  };
}

function normalizeContactHandoff(raw: unknown): {
  email_subject: string;
  email_body: string;
} {
  if (!raw || typeof raw !== "object") {
    return { email_subject: "", email_body: "" };
  }
  const ch = raw as Record<string, unknown>;
  return {
    email_subject:
      typeof ch.email_subject === "string" ? ch.email_subject.trim().slice(0, 200) : "",
    email_body:
      typeof ch.email_body === "string" ? ch.email_body.trim().slice(0, 12000) : "",
  };
}

export function parseRecommenderResponse(raw: string): RecommenderResponse {
  const jsonText = extractJsonObject(raw);
  const attempts = [jsonText, repairTruncatedJson(jsonText)];

  let lastError: unknown;
  for (const attempt of attempts) {
    try {
      const parsed = JSON.parse(attempt) as Record<string, unknown>;
      if (parsed.type === "clarify") return normalizeClarify(parsed);
      if (parsed.type === "recommendation") return normalizeRecommendation(parsed);
      lastError = new Error("Invalid recommender response type.");
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to parse recommender JSON.");
}
