/** Deterministic contact intake before brief / handoff email generation. */

import type { ChatMessage } from "@/app/_lib/recommender/types";

export const CONTACT_INTAKE_ASK_NAME =
  "Before we generate a brief, can you please provide your name and contact email? This information will only be stored in our email thread.";

export const CONTACT_INTAKE_ASK_EMAIL_ONLY =
  "Thanks. What is your contact email?";

const CONTACT_FILLER =
  /\b(and|&|email|e-mail|e mail|is|my|name|contact|the|at|address|please|thanks|thank you)\b/gi;

const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export function contactIntakeAskEmail(visitorName: string): string {
  const first =
    normalizeVisitorName(visitorName).split(/\s+/)[0] || "there";
  return `Thanks, ${first}. What is your contact email?`;
}

/** Title-case each word; keep letters, spaces, apostrophe, hyphen only. */
export function normalizeVisitorName(raw: string): string {
  let text = raw.trim();
  if (!text) return "";

  const email = text.match(EMAIL_PATTERN)?.[0];
  if (email) text = text.replace(email, " ");

  text = text
    .replace(CONTACT_FILLER, " ")
    .replace(/[^ \p{L}'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";

  const words = text.split(/\s+/).filter(Boolean).map((word) => {
    if (word.includes("-")) {
      return word
        .split("-")
        .map((part) => titleCaseWord(part))
        .join("-");
    }
    if (/^o'/i.test(word) && word.length > 2) {
      return `O'${titleCaseWord(word.slice(2))}`;
    }
    if (/^mc/i.test(word) && word.length > 2) {
      return `Mc${titleCaseWord(word.slice(2))}`;
    }
    return titleCaseWord(word);
  });

  return words.join(" ").slice(0, 120);
}

function titleCaseWord(part: string): string {
  const lower = part.toLowerCase();
  if (!lower) return "";
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/** Extract first valid email; lowercase; strip invalid characters. */
export function normalizeVisitorEmail(raw: string): string {
  const match = raw.match(EMAIL_PATTERN);
  if (!match?.[0]) return "";
  const email = match[0].toLowerCase().replace(/[^a-z0-9@._%+-]/g, "");
  return isValidVisitorEmail(email) ? email.slice(0, 320) : "";
}

export function isValidVisitorName(value: string): boolean {
  const t = normalizeVisitorName(value);
  if (t.length < 2 || t.length > 120) return false;
  if (/@/.test(t)) return false;
  return /[\p{L}]/u.test(t);
}

export function isValidVisitorEmail(value: string): boolean {
  const t = normalizeVisitorEmail(value);
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

export function parseVisitorContactFields(payload: Record<string, unknown>): {
  visitorName: string;
  visitorEmail: string;
} {
  const rawName =
    typeof payload.visitorName === "string" ? payload.visitorName : "";
  const rawEmail =
    typeof payload.visitorEmail === "string" ? payload.visitorEmail : "";
  const visitorName = isValidVisitorName(rawName)
    ? normalizeVisitorName(rawName)
    : "";
  const visitorEmail = isValidVisitorEmail(rawEmail)
    ? normalizeVisitorEmail(rawEmail)
    : "";
  return { visitorName, visitorEmail };
}

export type ParsedContactIntake = {
  visitorName: string;
  visitorEmail: string;
};

/** Cheap regex + normalisation — no model call. */
export function parseContactIntakeHeuristic(
  rawText: string,
  knownName?: string,
): ParsedContactIntake {
  const trimmed = rawText.trim().slice(0, 600);
  const email = normalizeVisitorEmail(trimmed);
  let name = knownName ? normalizeVisitorName(knownName) : "";

  if (!name) {
    let remainder = trimmed;
    if (email) remainder = remainder.replace(email, "");
    name = normalizeVisitorName(remainder);
  }

  return {
    visitorName: isValidVisitorName(name) ? name : "",
    visitorEmail: email,
  };
}

/** Use the model only when heuristic parsing is ambiguous or incomplete. */
export function shouldUseLlmForContactParse(
  rawText: string,
  intakeStep: "initial" | "email_only",
  heuristic: ParsedContactIntake,
): boolean {
  const trimmed = rawText.trim();
  const emailMatches = trimmed.match(EMAIL_PATTERN) ?? [];
  if (emailMatches.length > 1) return true;

  if (intakeStep === "email_only") {
    return !heuristic.visitorEmail;
  }

  const { visitorName, visitorEmail } = heuristic;
  if (visitorName && visitorEmail) return false;
  if (visitorName && !visitorEmail && !trimmed.includes("@")) return false;
  if (
    !visitorName &&
    visitorEmail &&
    trimmed.replace(visitorEmail, "").trim().length < 4
  ) {
    return false;
  }

  if (!visitorName && !visitorEmail) return true;

  const messy =
    /[^\p{L}\p{N}@.\s,'\-]/u.test(trimmed) ||
    /\b(and|&|@)\b/i.test(trimmed) ||
    trimmed.length > 80;
  return messy;
}

export function finalizeParsedContact(
  parsed: ParsedContactIntake,
  knownName?: string,
): ParsedContactIntake {
  let visitorName = parsed.visitorName
    ? normalizeVisitorName(parsed.visitorName)
    : "";
  const visitorEmail = parsed.visitorEmail
    ? normalizeVisitorEmail(parsed.visitorEmail)
    : "";

  if (knownName?.trim()) {
    const known = normalizeVisitorName(knownName);
    if (isValidVisitorName(known)) visitorName = known;
  }

  return {
    visitorName: isValidVisitorName(visitorName) ? visitorName : "",
    visitorEmail: isValidVisitorEmail(visitorEmail) ? visitorEmail : "",
  };
}

/** True when a user line is only contact intake (name/email), not brief content. */
export function isContactIntakeUserMessage(
  content: string,
  visitorName?: string,
  visitorEmail?: string,
): boolean {
  const trimmed = content.trim();
  if (!trimmed || trimmed.length > 200) return false;

  const msgEmail = normalizeVisitorEmail(trimmed);
  const msgName = normalizeVisitorName(
    msgEmail ? trimmed.replace(msgEmail, "") : trimmed,
  );

  if (msgEmail && trimmed.length < 140) {
    const withoutEmail = trimmed.replace(msgEmail, "").trim();
    if (
      !withoutEmail ||
      /^[\s,;&+|/\\-]+$/i.test(withoutEmail) ||
      (msgName && withoutEmail.replace(CONTACT_FILLER, "").trim().length < 3)
    ) {
      return true;
    }
  }

  if (visitorName && visitorEmail) {
    const normName = normalizeVisitorName(visitorName).toLowerCase();
    const normEmail = visitorEmail.toLowerCase();
    const lower = trimmed.toLowerCase();
    if (
      lower.includes(normEmail) &&
      (lower.includes(normName) || /^[\w\s.@,&-]+$/.test(trimmed))
    ) {
      const briefLike =
        /\b(engine|configure|want|need|help|staff|drive|sop|business)\b/i.test(
          trimmed,
        );
      if (!briefLike) return true;
    }
  }

  if (
    msgName &&
    visitorName &&
    msgName.toLowerCase() === normalizeVisitorName(visitorName).toLowerCase() &&
    !msgEmail &&
    trimmed.length < 60
  ) {
    return true;
  }

  return false;
}

/** Remove contact-intake replies from the thread used for recommendations / handoff. */
export function stripContactIntakeFromTranscript(
  messages: ChatMessage[],
  visitorName?: string,
  visitorEmail?: string,
): ChatMessage[] {
  const name = visitorName?.trim() ? normalizeVisitorName(visitorName) : "";
  const email = visitorEmail?.trim()
    ? normalizeVisitorEmail(visitorEmail)
    : "";

  return messages.filter(
    (m) =>
      m.role !== "user" ||
      !isContactIntakeUserMessage(m.content, name, email),
  );
}
