import { Resend } from "resend";
import {
  devFallbackFrom,
  emailConfig,
  isDomainVerificationError,
  isResendConfigured,
} from "@/app/_lib/email/config";

export type ContactEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  surface: string;
};

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(emailConfig.resendApiKey);
  }
  return resendClient;
}

function buildTextBody(payload: ContactEmailPayload): string {
  const lines = [
    `From: ${payload.name} <${payload.email}>`,
    `Surface: ${payload.surface}`,
    "",
    payload.message,
  ];
  return lines.join("\n");
}

/**
 * Sends via Resend when RESEND_API_KEY is set. Returns false if not configured
 * (caller should still persist to local inbox).
 */
async function sendOnce(
  from: string,
  payload: ContactEmailPayload,
): Promise<{ id?: string; errorMessage?: string }> {
  const { data, error } = await getResend().emails.send({
    from,
    to: [emailConfig.contactTo],
    replyTo: payload.email,
    subject: payload.subject,
    text: buildTextBody(payload),
  });

  if (error) {
    return {
      errorMessage:
        typeof error.message === "string" ? error.message : "Resend send failed",
    };
  }

  return { id: data?.id };
}

export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<{ sent: boolean; providerId?: string; usedFallbackFrom?: boolean }> {
  if (!isResendConfigured()) {
    return { sent: false };
  }

  let result = await sendOnce(emailConfig.from, payload);

  if (
    result.errorMessage &&
    isDomainVerificationError(result.errorMessage) &&
    process.env.NODE_ENV === "development" &&
    emailConfig.from !== devFallbackFrom()
  ) {
    console.warn(
      "[contact] Primary from not verified; retrying with Resend test sender:",
      devFallbackFrom(),
    );
    result = await sendOnce(devFallbackFrom(), payload);
    if (!result.errorMessage) {
      return { sent: true, providerId: result.id, usedFallbackFrom: true };
    }
  }

  if (result.errorMessage) {
    throw new Error(result.errorMessage);
  }

  return { sent: true, providerId: result.id };
}
