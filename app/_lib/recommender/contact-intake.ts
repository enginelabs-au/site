/** Deterministic contact intake before brief / handoff email generation. */

export const CONTACT_INTAKE_ASK_NAME =
  "Before we generate a brief, can you please provide your name and contact email? This information will only be stored in our email thread.";

export const CONTACT_INTAKE_ASK_EMAIL_ONLY =
  "Thanks. What is your contact email?";

export function contactIntakeAskEmail(visitorName: string): string {
  const first = visitorName.trim().split(/\s+/)[0] || "there";
  return `Thanks, ${first}. What is your contact email?`;
}

export function isValidVisitorName(value: string): boolean {
  const t = value.trim();
  if (t.length < 2 || t.length > 120) return false;
  if (/@/.test(t)) return false;
  return /[\p{L}\p{N}]/u.test(t);
}

export function isValidVisitorEmail(value: string): boolean {
  const t = value.trim();
  if (t.length > 320) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

export function parseVisitorContactFields(payload: Record<string, unknown>): {
  visitorName: string;
  visitorEmail: string;
} {
  return {
    visitorName:
      typeof payload.visitorName === "string" ? payload.visitorName.trim() : "",
    visitorEmail:
      typeof payload.visitorEmail === "string" ? payload.visitorEmail.trim() : "",
  };
}
