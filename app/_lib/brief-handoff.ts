/** Client-side brief package passed from Control Centre → contact form. */

export const BRIEF_HANDOFF_KEY = "engine-labs-brief-handoff";
export const BRIEF_HANDOFF_EVENT = "engine-labs-brief-handoff";

/** brief = full pre-filled message; contact_only = name/email only; blank = empty form */
export type BriefHandoffMode = "brief" | "contact_only" | "blank";

export type BriefHandoff = {
  createdAt: string;
  seedBrief: string;
  recommendationMarkdown: string;
  emailSubject: string;
  emailBody: string;
  visitorName?: string;
  visitorEmail?: string;
  surface?: string;
  mode?: BriefHandoffMode;
};

export function saveBriefHandoff(handoff: BriefHandoff): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    BRIEF_HANDOFF_KEY,
    JSON.stringify({ ...handoff, mode: handoff.mode ?? "brief" }),
  );
  window.dispatchEvent(new CustomEvent(BRIEF_HANDOFF_EVENT));
}

/** Notify contact forms on the same page (e.g. homepage widget → #send). */
export function notifyBriefHandoffReady(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BRIEF_HANDOFF_EVENT));
}

export function loadBriefHandoff(): BriefHandoff | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(BRIEF_HANDOFF_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BriefHandoff;
  } catch {
    return null;
  }
}

export function clearBriefHandoff(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(BRIEF_HANDOFF_KEY);
}
