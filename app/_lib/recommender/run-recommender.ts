import { recommenderConfig } from "@/app/_lib/recommender/config";
import { callOpenRouter } from "@/app/_lib/recommender/openrouter";
import { buildFallbackHandoffEmail } from "@/app/_lib/recommender/handoff-email-template";
import { parseRecommenderResponse } from "@/app/_lib/recommender/parse";
import type { RecommendationResponse } from "@/app/_lib/recommender/types";
import { buildRecommenderSystemPrompt } from "@/app/_lib/recommender/system-prompt";
import type { ChatMessage, RecommenderResponse } from "@/app/_lib/recommender/types";

const REPAIR_SYSTEM_APPEND = `

CRITICAL: Your previous reply was not valid JSON. Reply with ONE valid JSON object only — no markdown, no prose.
If the visitor has already answered enough (Engine, data sources, deliverables, volume), emit type "recommendation" now.
Keep draft_sow_seed minimal: max 3 bullets per array field.`;

export type RecommenderRunResult = {
  parsed: RecommenderResponse;
  costUsd: number;
  promptTokens: number;
  completionTokens: number;
  rawContent: string;
};

export async function runRecommender(params: {
  messages: ChatMessage[];
  userId: string;
  seedBrief: string;
  userTurns: number;
  surface?: string;
  /** After contact intake — emit recommendation even if turn count is low. */
  forceRecommend?: boolean;
}): Promise<RecommenderRunResult> {
  const mustRecommendNow =
    Boolean(params.forceRecommend) ||
    params.userTurns >= recommenderConfig.maxUserTurns - 1;

  const systemPrompt = buildRecommenderSystemPrompt({
    visitorLocale: "en-AU",
    utcNow: new Date().toISOString(),
    seedBrief: params.seedBrief,
    userTurns: params.userTurns,
    maxUserTurns: recommenderConfig.maxUserTurns,
    mustRecommendNow,
  });

  const maxTokens = mustRecommendNow
    ? recommenderConfig.maxRecommendOutputTokens
    : recommenderConfig.maxClarifyOutputTokens;

  let totalCost = 0;
  let promptTokens = 0;
  let completionTokens = 0;
  let lastContent = "";

  for (let attempt = 0; attempt < 2; attempt++) {
    let llm;
    try {
      llm = await callOpenRouter({
        systemPrompt: attempt === 0 ? systemPrompt : systemPrompt + REPAIR_SYSTEM_APPEND,
        messages: params.messages,
        userId: params.userId,
        maxTokens:
          attempt === 0
            ? maxTokens
            : recommenderConfig.maxRecommendOutputTokens,
      });
    } catch (err) {
      if (mustRecommendNow) {
        console.warn("[runRecommender] OpenRouter failed, using escalation", err);
        return buildDiscoveryCallEscalation(params.seedBrief, {
          costUsd: totalCost,
          promptTokens,
          completionTokens,
          rawContent: lastContent,
        });
      }
      throw err;
    }

    totalCost += llm.costUsd;
    promptTokens += llm.promptTokens;
    completionTokens += llm.completionTokens;
    lastContent = llm.content;

    try {
      const parsed = parseRecommenderResponse(llm.content);
      if (mustRecommendNow && parsed.type === "clarify") {
        if (attempt === 0) continue;
        return buildDiscoveryCallEscalation(params.seedBrief, {
          costUsd: totalCost,
          promptTokens,
          completionTokens,
          rawContent: lastContent,
        });
      }
      return {
        parsed,
        costUsd: totalCost,
        promptTokens,
        completionTokens,
        rawContent: lastContent,
      };
    } catch {
      if (attempt === 1) break;
    }
  }

  if (mustRecommendNow || params.userTurns >= 3) {
    return buildDiscoveryCallEscalation(params.seedBrief, {
      costUsd: totalCost,
      promptTokens,
      completionTokens,
      rawContent: lastContent,
    });
  }

  throw new Error("Failed to parse recommender response after retry.");
}

/** No default Engine — invite a discovery call when we cannot determine fit. */
function buildDiscoveryCallEscalation(
  seedBrief: string,
  usage: Pick<RecommenderRunResult, "costUsd" | "promptTokens" | "completionTokens" | "rawContent">,
): RecommenderRunResult {
  const base: RecommendationResponse = {
    type: "recommendation",
    outcome: "escalate",
    summary_in_visitor_framing: `You described: ${seedBrief.slice(0, 200)}${seedBrief.length > 200 ? "…" : ""}.`,
    classification: {
      engine_fit: [],
      scope_size: "custom",
      risk_tier: "green",
      data_class: "internal",
      confidence: 0.5,
      rationale: "Could not confidently map to one Engine from the available context.",
    },
    recommended_engines: [],
    sensitive_area_flag: false,
    sensitive_area_reason: "",
    suggested_next_step: "talk_to_cam",
    decline_or_escalation_message:
      "We couldn't confidently match this to one of our eight Engines from the thread alone. Book a free 20-minute discovery call — we'll clarify scope and send a starting price band afterward.",
    draft_sow_seed: {
      project_snapshot: "",
      business_outcome: "",
      included_deliverables: [],
      exclusions: [],
      milestones: [],
      price_aud: "from A$0 (AUD)",
      assumptions: [],
    },
    contact_handoff: { email_subject: "", email_body: "" },
  };

  const handoff = buildFallbackHandoffEmail({
    seedBrief,
    messages: [{ role: "user", content: seedBrief }],
    parsed: base,
  });
  const parsed: RecommenderResponse = {
    ...base,
    contact_handoff: { email_subject: handoff.subject, email_body: handoff.body },
  };

  return { parsed, ...usage };
}
