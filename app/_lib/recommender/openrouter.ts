import { recommenderConfig } from "@/app/_lib/recommender/config";
import type { ChatMessage } from "@/app/_lib/recommender/types";

type OpenRouterUsage = {
  prompt_tokens?: number;
  completion_tokens?: number;
  cost?: number;
};

type OpenRouterResult = {
  content: string;
  costUsd: number;
  promptTokens: number;
  completionTokens: number;
};

/** Fallback pricing for anthropic/claude-opus-4.7 if usage.cost missing (USD per 1M tokens). */
const FALLBACK_INPUT_PER_M = 15;
const FALLBACK_OUTPUT_PER_M = 75;

function estimateCostUsd(usage: OpenRouterUsage): number {
  if (typeof usage.cost === "number" && usage.cost > 0) return usage.cost;
  const inTok = usage.prompt_tokens ?? 0;
  const outTok = usage.completion_tokens ?? 0;
  return (inTok / 1_000_000) * FALLBACK_INPUT_PER_M + (outTok / 1_000_000) * FALLBACK_OUTPUT_PER_M;
}

export async function callOpenRouter(params: {
  systemPrompt: string;
  messages: ChatMessage[];
  userId: string;
  maxTokens?: number;
}): Promise<OpenRouterResult> {
  const apiMessages = [
    { role: "system" as const, content: params.systemPrompt },
    ...params.messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${recommenderConfig.openRouterApiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": recommenderConfig.siteUrl,
      "X-OpenRouter-Title": recommenderConfig.appName,
    },
    body: JSON.stringify({
      model: recommenderConfig.model,
      messages: apiMessages,
      max_tokens: params.maxTokens ?? recommenderConfig.maxClarifyOutputTokens,
      temperature: 0.25,
      response_format: { type: "json_object" },
      user: params.userId,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenRouter ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    usage?: OpenRouterUsage;
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenRouter returned empty content.");

  const usage = data.usage ?? {};
  return {
    content,
    costUsd: estimateCostUsd(usage),
    promptTokens: usage.prompt_tokens ?? 0,
    completionTokens: usage.completion_tokens ?? 0,
  };
}
