import { appendBrief } from "@/app/_lib/briefs-store";
import { buildHandoffEmail } from "@/app/_lib/recommender/build-handoff-email";
import { formatRecommenderMarkdown } from "@/app/_lib/recommender/format-markdown";
import type { ChatMessage, RecommendationResponse } from "@/app/_lib/recommender/types";

export type FinalizedRecommendation = {
  reply: string;
  handoff: {
    subject: string;
    body: string;
    seedBrief: string;
    recommendationMarkdown: string;
    visitorName: string;
    visitorEmail: string;
  };
  briefId?: string;
};

/** Build handoff + optional brief store from an already-generated recommendation. */
export async function finalizeRecommendation(params: {
  parsed: RecommendationResponse;
  seedBrief: string;
  messages: ChatMessage[];
  visitorName: string;
  visitorEmail: string;
  surface?: string;
}): Promise<FinalizedRecommendation> {
  const reply = formatRecommenderMarkdown(params.parsed);
  const emailPackage = buildHandoffEmail({
    seedBrief: params.seedBrief,
    messages: params.messages,
    parsed: params.parsed,
    visitorName: params.visitorName,
    visitorEmail: params.visitorEmail,
  });

  const handoff = {
    subject: emailPackage.subject,
    body: emailPackage.body,
    seedBrief: params.seedBrief,
    recommendationMarkdown: emailPackage.recommendationMarkdown,
    visitorName: params.visitorName,
    visitorEmail: params.visitorEmail,
  };

  let briefId: string | undefined;
  try {
    const stored = await appendBrief({
      id: crypto.randomUUID(),
      brief: params.seedBrief,
      email: params.visitorEmail,
      surface: params.surface?.slice(0, 64) ?? "unknown",
      createdAt: new Date().toISOString(),
      status: "recommendation",
      transcript: params.messages.concat({ role: "assistant", content: reply }),
      recommendation: params.parsed,
    });
    briefId = stored.id;
  } catch (err) {
    console.warn("[finalizeRecommendation] brief store failed", err);
  }

  return { reply, handoff, briefId };
}
