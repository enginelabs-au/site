import type { ChatMessage } from "@/app/_lib/recommender/types";
import type { RecommenderResponse } from "@/app/_lib/recommender/types";
import { formatRecommenderMarkdown } from "@/app/_lib/recommender/format-markdown";
import { buildFallbackHandoffEmail } from "@/app/_lib/recommender/handoff-email-template";
import { formatVisitorSignatureName } from "@/app/_lib/recommender/visitor-signature";

function applyVisitorSignature(body: string, visitorName: string): string {
  if (!visitorName.trim()) return body;
  const signed = formatVisitorSignatureName(visitorName);
  return body
    .replace(/\nYour name\.?\s*$/i, `\n${signed}`)
    .replace(/\nYour name\s*$/i, `\n${signed}`)
    .replace(/\[Visitor name placeholder[^\]]*\]/gi, signed)
    .replace(
      new RegExp(`\\n${escapeRegExp(visitorName.trim())}\\.?(?=\\s*$)`, "m"),
      `\n${signed}`,
    );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildHandoffEmail(params: {
  seedBrief: string;
  messages: ChatMessage[];
  parsed: RecommenderResponse;
  visitorName?: string;
  visitorEmail?: string;
}): { subject: string; body: string; recommendationMarkdown: string } {
  const recommendationMarkdown = formatRecommenderMarkdown(params.parsed);

  if (params.parsed.type !== "recommendation") {
    return {
      subject: "Control Centre brief",
      body: params.seedBrief.trim(),
      recommendationMarkdown,
    };
  }

  const fallback = buildFallbackHandoffEmail({
    seedBrief: params.seedBrief,
    messages: params.messages,
    parsed: params.parsed,
    visitorName: params.visitorName,
    visitorEmail: params.visitorEmail,
  });

  const llmSubject = params.parsed.contact_handoff.email_subject.trim();
  const llmBody = params.parsed.contact_handoff.email_body.trim();
  const body = applyVisitorSignature(
    llmBody || fallback.body,
    params.visitorName ?? "",
  );

  return {
    subject: llmSubject || fallback.subject,
    body,
    recommendationMarkdown,
  };
}
