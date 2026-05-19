/** Ensure the sign-off name ends with a full stop. */
export function formatVisitorSignatureName(visitorName: string): string {
  const t = visitorName.trim();
  if (!t) return "Your name";
  return /[.!?]$/.test(t) ? t : `${t}.`;
}
