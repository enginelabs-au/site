import { NextResponse } from "next/server";
import { isRecommenderConfigured, recommenderConfig } from "@/app/_lib/recommender/config";
import {
  finalizeParsedContact,
  isValidVisitorName,
  normalizeVisitorName,
  resolveContactIntakeStep,
  type ContactIntakeStep,
} from "@/app/_lib/recommender/contact-intake";
import { parseContactIntakeWithLlm } from "@/app/_lib/recommender/parse-contact-intake";
import { attachUserCookie, getOrCreateUserId } from "@/app/_lib/recommender/session";
import {
  addUsageCost,
  canAffordRequest,
  isOverSpendCap,
  readUserUsage,
  remainingBudgetUsd,
} from "@/app/_lib/recommender/usage";

export async function POST(req: Request) {
  if (!isRecommenderConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "Control Centre AI is not configured." },
      { status: 503 },
    );
  }

  const { userId, isNew } = await getOrCreateUserId();
  const usage = await readUserUsage(userId);

  if (isOverSpendCap(usage) || !canAffordRequest(usage)) {
    return attachUserCookie(
      NextResponse.json(
        {
          error: "session_cap_reached",
          message: "Session limit reached. Email hello@enginelabs.com.au to continue.",
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
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { rawText, intakeStep, knownName } = (payload ?? {}) as Record<string, unknown>;
  if (typeof rawText !== "string" || !rawText.trim()) {
    return NextResponse.json({ error: "rawText is required." }, { status: 400 });
  }

  const step: ContactIntakeStep =
    intakeStep === "email_only" ? "email_only" : "name_only";
  const known =
    typeof knownName === "string" && isValidVisitorName(knownName)
      ? normalizeVisitorName(knownName)
      : undefined;

  try {
    const result = await parseContactIntakeWithLlm({
      rawText: rawText.trim().slice(0, recommenderConfig.maxInputCharsPerMessage),
      intakeStep: step,
      knownName: known,
      userId,
    });

    let updatedUsage = usage;
    try {
      updatedUsage = await addUsageCost(userId, result.costUsd);
    } catch (usageErr) {
      console.warn("[briefs/parse-contact] usage write failed", usageErr);
    }
    const finalized = finalizeParsedContact(result.parsed, known);
    const resolved = resolveContactIntakeStep({
      intakeStep: step,
      visitorName: finalized.visitorName,
      visitorEmail: finalized.visitorEmail,
      knownName: known,
    });

    return attachUserCookie(
      NextResponse.json({
        ok: true,
        visitorName: resolved.visitorName,
        visitorEmail: resolved.visitorEmail,
        nextStep: resolved.nextStep,
        ready: resolved.ready,
        budgetRemainingUsd: remainingBudgetUsd(updatedUsage),
      }),
      userId,
      isNew,
    );
  } catch (err) {
    console.error("[briefs/parse-contact]", err);
    return attachUserCookie(
      NextResponse.json(
        { error: "parse_failed", message: "Could not read your name or email. Try again." },
        { status: 502 },
      ),
      userId,
      isNew,
    );
  }
}
