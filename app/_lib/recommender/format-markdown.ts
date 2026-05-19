import type { RecommenderResponse } from "@/app/_lib/recommender/types";

const DISCOVERY_CALL =
  "We couldn't pin this to one Engine from the thread alone. Book a **free 20-minute discovery call** and we'll map scope and pricing with you.";

function bulletList(items: string[]): string {
  const rows = items.filter((s) => s.trim()).map((s) => `- ${s.trim()}`);
  return rows.length ? rows.join("\n") : "";
}

/** Visitor-facing markdown (never raw JSON). */
export function formatRecommenderMarkdown(parsed: RecommenderResponse): string {
  if (parsed.type === "clarify") {
    const parts: string[] = [];
    if (parsed.preface?.trim()) parts.push(parsed.preface.trim());
    for (const q of parsed.questions.slice(0, 2)) {
      if (q.trim()) parts.push(q.trim());
    }
    return parts.join("\n\n");
  }

  if (
    parsed.outcome === "escalate" ||
    parsed.outcome === "decline" ||
    parsed.recommended_engines.length === 0
  ) {
    const parts = [parsed.summary_in_visitor_framing.trim()];
    if (parsed.decline_or_escalation_message?.trim()) {
      parts.push(parsed.decline_or_escalation_message.trim());
    } else if (parsed.outcome === "escalate" || parsed.recommended_engines.length === 0) {
      parts.push(DISCOVERY_CALL);
    }
    parts.push(
      "Use **Send your brief** below — we'll receive your thread and this summary by email.",
    );
    return parts.filter(Boolean).join("\n\n");
  }

  const lines: string[] = [];
  lines.push(parsed.summary_in_visitor_framing.trim());
  lines.push("");

  for (const engine of parsed.recommended_engines.slice(0, 3)) {
    lines.push(`### ${engine.name} (${engine.tier})`);
    lines.push(
      `**Band:** ${engine.price_band_aud} · **Timeline:** ${engine.typical_timeline_weeks} weeks`,
    );
    lines.push("");
    lines.push(engine.why_it_fits.trim());
    if (engine.what_visitor_provides.length) {
      lines.push("");
      lines.push("**You provide:**");
      lines.push(bulletList(engine.what_visitor_provides));
    }
    if (engine.exclusions.length) {
      lines.push("");
      lines.push("**Out of scope:**");
      lines.push(bulletList(engine.exclusions));
    }
    lines.push("");
  }

  const sow = parsed.draft_sow_seed;
  if (sow.project_snapshot?.trim()) {
    lines.push("### Scope snapshot");
    lines.push(sow.project_snapshot.trim());
    lines.push("");
  }
  if (sow.price_aud?.trim() && sow.price_aud !== "from A$0 (AUD)") {
    lines.push(`**Starting band:** ${sow.price_aud.trim()}`);
    lines.push("");
  }
  if (parsed.sensitive_area_flag && parsed.sensitive_area_reason?.trim()) {
    lines.push(`**Note:** ${parsed.sensitive_area_reason.trim()}`);
    lines.push("");
  }

  lines.push(
    "We'll review within one business day (Sydney) and reply with a refined SOW. Use **Send your brief** below to email us this thread.",
  );

  return lines.join("\n").trim();
}
