import { normalizeVisitorName } from "@/app/_lib/recommender/contact-intake";

/** Ensure the sign-off name ends with a full stop. */
export function formatVisitorSignatureName(visitorName: string): string {
  const t = normalizeVisitorName(visitorName);
  if (!t) return "Your name";
  return /[.!?]$/.test(t) ? t : `${t}.`;
}
