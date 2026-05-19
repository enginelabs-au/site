/** Server-only Control Centre / OpenRouter configuration. */

function num(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

export const recommenderConfig = {
  openRouterApiKey: (process.env.OPENROUTER_API_KEY ?? "").trim(),
  model: process.env.OPENROUTER_MODEL ?? "anthropic/claude-opus-4.7",
  siteUrl: process.env.OPENROUTER_SITE_URL ?? "https://enginelabs.com.au",
  appName: process.env.OPENROUTER_APP_NAME ?? "Engine Labs",

  userSpendCapUsd: num("CONTROL_CENTRE_USER_SPEND_CAP_USD", 1),
  /** Clarifying JSON — short questions only. */
  maxClarifyOutputTokens: num("CONTROL_CENTRE_MAX_CLARIFY_OUTPUT_TOKENS", 384),
  /** Recommendation JSON — needs more room than a single clarify turn. */
  maxRecommendOutputTokens: num("CONTROL_CENTRE_MAX_RECOMMEND_OUTPUT_TOKENS", 1536),
  maxInputCharsPerMessage: num("CONTROL_CENTRE_MAX_INPUT_CHARS_PER_MESSAGE", 600),
  maxUserTurns: num("CONTROL_CENTRE_MAX_USER_TURNS", 5),
  maxContextMessages: num("CONTROL_CENTRE_MAX_CONTEXT_MESSAGES", 10),
  minReserveUsd: num("CONTROL_CENTRE_MIN_RESERVE_USD", 0.08),
} as const;

export function isRecommenderConfigured(): boolean {
  return Boolean(recommenderConfig.openRouterApiKey);
}
