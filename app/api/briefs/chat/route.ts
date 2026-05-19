import { NextResponse } from "next/server";
import { appendBrief } from "@/app/_lib/briefs-store";
import { isRecommenderConfigured, recommenderConfig } from "@/app/_lib/recommender/config";
import { buildHandoffEmail } from "@/app/_lib/recommender/build-handoff-email";
import { formatRecommenderMarkdown } from "@/app/_lib/recommender/format-markdown";
import { prepareMessagesForApi } from "@/app/_lib/recommender/prepare-messages";
import { runRecommender } from "@/app/_lib/recommender/run-recommender";
import {
  CONTACT_INTAKE_ASK_EMAIL_ONLY,
  CONTACT_INTAKE_ASK_NAME,
  contactIntakeAskEmail,
  isValidVisitorEmail,
  isValidVisitorName,
  parseVisitorContactFields,
  stripContactIntakeFromTranscript,
} from "@/app/_lib/recommender/contact-intake";
import { checkMessageScope, OUT_OF_SCOPE_REPLY } from "@/app/_lib/recommender/scope-guard";
import { attachUserCookie, getOrCreateUserId } from "@/app/_lib/recommender/session";
import type { ChatMessage } from "@/app/_lib/recommender/types";
import {
  addUsageCost,
  canAffordRequest,
  isOverSpendCap,
  readUserUsage,
  remainingBudgetUsd,
} from "@/app/_lib/recommender/usage";

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: string }).role;
    const content = (item as { content?: string }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") continue;
    const maxLen =
      role === "user"
        ? recommenderConfig.maxInputCharsPerMessage
        : Math.max(recommenderConfig.maxInputCharsPerMessage, 1400);
    const trimmed = content.trim().slice(0, maxLen);
    if (!trimmed) continue;
    out.push({ role, content: trimmed });
  }
  return out.slice(-recommenderConfig.maxContextMessages);
}

export async function POST(req: Request) {
  if (!isRecommenderConfigured()) {
    return NextResponse.json(
      {
        error:
          "Control Centre AI is not configured. Add OPENROUTER_API_KEY to .env or .env.local (see .env.example), then restart the dev server.",
      },
      { status: 503 },
    );
  }

  const { userId, isNew } = await getOrCreateUserId();
  const usage = await readUserUsage(userId);

  if (isOverSpendCap(usage)) {
    return attachUserCookie(
      NextResponse.json(
        {
          error: "session_cap_reached",
          message:
            "You've reached the session limit for AI scoping on this device. Email hello@enginelabs.com.au and we'll pick up from here.",
          budgetRemainingUsd: 0,
        },
        { status: 429 },
      ),
      userId,
      isNew,
    );
  }

  if (!canAffordRequest(usage)) {
    return attachUserCookie(
      NextResponse.json(
        {
          error: "session_cap_reached",
          message:
            "Not enough session budget left for another AI turn. Email hello@enginelabs.com.au to continue.",
          budgetRemainingUsd: remainingBudgetUsd(usage),
        },
        { status: 429 },
      ),
      userId,
      isNew,
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { messages: rawMessages, surface } = (payload ?? {}) as Record<string, unknown>;
  const payloadRecord = (payload ?? {}) as Record<string, unknown>;
  const { visitorName, visitorEmail } = parseVisitorContactFields(payloadRecord);
  const finalizeBrief = payloadRecord.finalizeBrief === true;
  const messages = stripContactIntakeFromTranscript(
    prepareMessagesForApi(sanitizeMessages(rawMessages)),
    visitorName,
    visitorEmail,
  );

  const userTurns = messages.filter((m) => m.role === "user").length;
  const latestUser = [...messages].reverse().find((m) => m.role === "user");
  if (userTurns === 0) {
    return NextResponse.json({ error: "At least one user message is required." }, { status: 400 });
  }
  if (userTurns > recommenderConfig.maxUserTurns) {
    return attachUserCookie(
      NextResponse.json(
        {
          error: "turn_limit",
          message: "Maximum clarifying turns reached. We'll follow up by email.",
        },
        { status: 400 },
      ),
      userId,
      isNew,
    );
  }

  if (latestUser && !finalizeBrief) {
    const scope = checkMessageScope(latestUser.content, userTurns - 1);
    if (!scope.allowed) {
      return attachUserCookie(
        NextResponse.json({
          ok: true,
          reply: OUT_OF_SCOPE_REPLY,
          responseType: "out_of_scope",
          budgetRemainingUsd: remainingBudgetUsd(usage),
        }),
        userId,
        isNew,
      );
    }
  }

  const seedBrief = messages.find((m) => m.role === "user")?.content ?? "";

  function contactIntakeResponse(step: "name" | "email") {
    const reply =
      step === "name"
        ? CONTACT_INTAKE_ASK_NAME
        : visitorName
          ? contactIntakeAskEmail(visitorName)
          : CONTACT_INTAKE_ASK_EMAIL_ONLY;
    return attachUserCookie(
      NextResponse.json({
        ok: true,
        reply,
        responseType: "contact_intake",
        intakeStep: step,
        budgetRemainingUsd: remainingBudgetUsd(usage),
      }),
      userId,
      isNew,
    );
  }

  const mustRecommendNow = userTurns >= recommenderConfig.maxUserTurns - 1;

  if (finalizeBrief || mustRecommendNow) {
    if (!isValidVisitorName(visitorName)) {
      return contactIntakeResponse("name");
    }
    if (!isValidVisitorEmail(visitorEmail)) {
      return contactIntakeResponse("email");
    }
  }

  try {
    const result = await runRecommender({
      messages,
      userId,
      seedBrief,
      userTurns,
      surface: typeof surface === "string" ? surface : undefined,
      forceRecommend: finalizeBrief,
    });

    const updatedUsage = await addUsageCost(userId, result.costUsd);
    const { parsed } = result;
    const reply = formatRecommenderMarkdown(parsed);

    let briefId: string | undefined;
    let handoff:
      | {
          subject: string;
          body: string;
          seedBrief: string;
          recommendationMarkdown: string;
          visitorName: string;
          visitorEmail: string;
        }
      | undefined;

    if (parsed.type === "recommendation") {
      if (!isValidVisitorName(visitorName)) {
        return contactIntakeResponse("name");
      }
      if (!isValidVisitorEmail(visitorEmail)) {
        return contactIntakeResponse("email");
      }

      const emailPackage = buildHandoffEmail({
        seedBrief,
        messages,
        parsed,
        visitorName,
        visitorEmail,
      });
      handoff = {
        subject: emailPackage.subject,
        body: emailPackage.body,
        seedBrief,
        recommendationMarkdown: emailPackage.recommendationMarkdown,
        visitorName,
        visitorEmail,
      };
      const stored = await appendBrief({
        id: crypto.randomUUID(),
        brief: seedBrief,
        email: visitorEmail,
        surface: typeof surface === "string" ? surface.slice(0, 64) : "unknown",
        createdAt: new Date().toISOString(),
        status: "recommendation",
        transcript: messages.concat({ role: "assistant", content: reply }),
        recommendation: parsed,
      });
      briefId = stored.id;
    }

    return attachUserCookie(
      NextResponse.json({
        ok: true,
        reply,
        responseType: parsed.type,
        outcome: parsed.type === "recommendation" ? parsed.outcome : undefined,
        briefId,
        handoff,
        budgetRemainingUsd: remainingBudgetUsd(updatedUsage),
        usage: {
          costUsd: result.costUsd,
          promptTokens: result.promptTokens,
          completionTokens: result.completionTokens,
        },
      }),
      userId,
      isNew,
    );
  } catch (err) {
    console.error("[briefs/chat]", err);
    return attachUserCookie(
      NextResponse.json(
        {
          error: "llm_failed",
          message: "Something went wrong generating a reply. Try again shortly.",
        },
        { status: 502 },
      ),
      userId,
      isNew,
    );
  }
}
