import type { RecommenderResponse } from "@/app/_lib/recommender/types";

/** Join non-empty blocks with a blank line between each section. */
function joinBlocks(blocks: string[]): string {
  return blocks.filter((b) => b.trim()).join("\n\n");
}

/** Turn model JSON into a short, readable chat message (no raw JSON to visitors). */
export function formatRecommenderForVisitor(parsed: RecommenderResponse): string {
  if (parsed.type === "clarify") {
    const blocks: string[] = [];
    if (parsed.preface?.trim()) blocks.push(parsed.preface.trim());
    for (const q of parsed.questions.slice(0, 2)) {
      const trimmed = q.trim();
      if (trimmed) blocks.push(trimmed);
    }
    return joinBlocks(blocks);
  }

  const blocks: string[] = [];
  blocks.push(parsed.summary_in_visitor_framing.trim());

  if (parsed.outcome === "decline" || parsed.outcome === "escalate") {
    if (parsed.decline_or_escalation_message?.trim()) {
      blocks.push(parsed.decline_or_escalation_message.trim());
    }
    return joinBlocks(blocks);
  }

  for (const engine of parsed.recommended_engines.slice(0, 3)) {
    blocks.push(
      `${engine.name} (${engine.tier}) — ${engine.price_band_aud} · ${engine.typical_timeline_weeks} weeks`,
    );
    blocks.push(engine.why_it_fits.trim());
  }

  const sow = parsed.draft_sow_seed;
  if (sow.project_snapshot?.trim()) {
    blocks.push(`Scope: ${sow.project_snapshot.trim()}`);
  }
  if (sow.price_aud?.trim() && sow.price_aud !== "from A$0 (AUD)") {
    blocks.push(`Band: ${sow.price_aud.trim()}`);
  }
  if (parsed.sensitive_area_flag && parsed.sensitive_area_reason?.trim()) {
    blocks.push(`Note: ${parsed.sensitive_area_reason.trim()}`);
  }

  blocks.push(
    "We'll review this and reply within one business day (Sydney) with a refined SOW.",
  );

  return joinBlocks(blocks);
}
