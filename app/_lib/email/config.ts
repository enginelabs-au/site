/** Server-only contact / Resend configuration. */

const DEFAULT_FROM = "Engine Labs <hello@enginelabs.com.au>";
/** Resend test sender — works before custom domain DNS is verified (dev only). */
const DEV_FALLBACK_FROM = "Engine Labs <onboarding@resend.dev>";

export const emailConfig = {
  contactTo: (process.env.CONTACT_TO_EMAIL ?? "hello@enginelabs.com.au").trim(),
  resendApiKey: (process.env.RESEND_API_KEY ?? "").trim(),
  from: (process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM).trim(),
  /** Optional override when primary from fails (e.g. domain pending verification). */
  fallbackFrom: (process.env.RESEND_FALLBACK_FROM ?? "").trim(),
} as const;

export function isResendConfigured(): boolean {
  return Boolean(emailConfig.resendApiKey);
}

export function devFallbackFrom(): string {
  return emailConfig.fallbackFrom || DEV_FALLBACK_FROM;
}

export function isDomainVerificationError(message: string): boolean {
  return /domain is not verified|not verified/i.test(message);
}
