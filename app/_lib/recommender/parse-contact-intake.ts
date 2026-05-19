import { callOpenRouter } from "@/app/_lib/recommender/openrouter";
import {
  isValidVisitorEmail,
  isValidVisitorName,
} from "@/app/_lib/recommender/contact-intake";
import { extractJsonObject } from "@/app/_lib/recommender/parse";

export type ParsedContactIntake = {
  visitorName: string;
  visitorEmail: string;
};

const PARSE_SYSTEM_PROMPT = `You extract visitor contact details from one free-text reply in a website intake form.

Output ONLY one JSON object (no markdown):
{"visitor_name":"<string>","visitor_email":"<string>"}

Rules:
- visitor_name: the person's real name only — first and last if given. Strip connectors and filler (e.g. "and", "&", "my name is", "email is", "contact:"). Never include an email address or the word "and" unless part of a surname.
- visitor_email: exactly one email address in standard form, lowercased, or "" if none present.
- If the reply is only an email, visitor_name must be "".
- If the reply is only a name, visitor_email must be "".
- Do not invent or guess missing fields.`;

function buildUserMessage(params: {
  rawText: string;
  intakeStep: "initial" | "email_only";
  knownName?: string;
}): string {
  if (params.intakeStep === "email_only" && params.knownName?.trim()) {
    return `Known name (already collected): ${params.knownName.trim()}\nVisitor reply (extract email; keep known name): ${params.rawText.trim()}`;
  }
  return `Visitor reply (extract name and/or email): ${params.rawText.trim()}`;
}

function normalizeParsed(raw: Record<string, unknown>): ParsedContactIntake {
  const name =
    typeof raw.visitor_name === "string"
      ? raw.visitor_name.trim().slice(0, 120)
      : "";
  let email =
    typeof raw.visitor_email === "string"
      ? raw.visitor_email.trim().toLowerCase().slice(0, 320)
      : "";
  if (email && !isValidVisitorEmail(email)) email = "";
  const cleanName = isValidVisitorName(name) ? name : "";
  return { visitorName: cleanName, visitorEmail: email };
}

/** Regex fallback when the model call fails — email via pattern, name is remainder cleaned. */
export function parseContactIntakeFallback(
  rawText: string,
  knownName?: string,
): ParsedContactIntake {
  const emailMatch = rawText.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  );
  const email = emailMatch?.[0]?.toLowerCase().trim() ?? "";
  let name = knownName?.trim() ?? "";

  if (!name && emailMatch) {
    name = rawText
      .replace(emailMatch[0], "")
      .replace(/\b(and|&|email|e-mail|is|my|name|contact)\b/gi, " ")
      .replace(/[,;:|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  } else if (!name) {
    name = rawText.trim();
  }

  return {
    visitorName: isValidVisitorName(name) ? name : "",
    visitorEmail: isValidVisitorEmail(email) ? email : "",
  };
}

export async function parseContactIntakeWithLlm(params: {
  rawText: string;
  intakeStep: "initial" | "email_only";
  knownName?: string;
  userId: string;
}): Promise<{
  parsed: ParsedContactIntake;
  costUsd: number;
  promptTokens: number;
  completionTokens: number;
}> {
  const trimmed = params.rawText.trim().slice(0, 600);
  if (!trimmed) {
    return {
      parsed: { visitorName: "", visitorEmail: "" },
      costUsd: 0,
      promptTokens: 0,
      completionTokens: 0,
    };
  }

  try {
    const llm = await callOpenRouter({
      systemPrompt: PARSE_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildUserMessage({ ...params, rawText: trimmed }),
        },
      ],
      userId: params.userId,
      maxTokens: 128,
    });

    const jsonText = extractJsonObject(llm.content);
    const raw = JSON.parse(jsonText) as Record<string, unknown>;
    let parsed = normalizeParsed(raw);

    if (params.intakeStep === "email_only" && params.knownName?.trim()) {
      parsed = {
        visitorName: isValidVisitorName(params.knownName)
          ? params.knownName.trim()
          : parsed.visitorName,
        visitorEmail: parsed.visitorEmail,
      };
    }

    return {
      parsed,
      costUsd: llm.costUsd,
      promptTokens: llm.promptTokens,
      completionTokens: llm.completionTokens,
    };
  } catch {
    return {
      parsed: parseContactIntakeFallback(trimmed, params.knownName),
      costUsd: 0,
      promptTokens: 0,
      completionTokens: 0,
    };
  }
}
