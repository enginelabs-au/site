import { callOpenRouter } from "@/app/_lib/recommender/openrouter";
import {
  finalizeParsedContact,
  parseContactIntakeHeuristic,
  shouldUseLlmForContactParse,
  type ParsedContactIntake,
} from "@/app/_lib/recommender/contact-intake";
import { extractJsonObject } from "@/app/_lib/recommender/parse";

export type { ParsedContactIntake };

const PARSE_SYSTEM_PROMPT = `You extract visitor contact details from one free-text reply in a website intake form.

Output ONLY one JSON object (no markdown):
{"visitor_name":"<string>","visitor_email":"<string>"}

Rules:
- visitor_name: the person's real name only — first and last if given. Strip connectors and filler (e.g. "and", "&", "my name is", "email is", "contact:"). Never include an email address.
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
    typeof raw.visitor_name === "string" ? raw.visitor_name : "";
  const email =
    typeof raw.visitor_email === "string" ? raw.visitor_email : "";
  return finalizeParsedContact({ visitorName: name, visitorEmail: email });
}

/** @deprecated Use parseContactIntakeHeuristic */
export function parseContactIntakeFallback(
  rawText: string,
  knownName?: string,
): ParsedContactIntake {
  return parseContactIntakeHeuristic(rawText, knownName);
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

  const heuristic = parseContactIntakeHeuristic(trimmed, params.knownName);

  if (
    !shouldUseLlmForContactParse(trimmed, params.intakeStep, heuristic)
  ) {
    return {
      parsed: finalizeParsedContact(heuristic, params.knownName),
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
      maxTokens: 96,
    });

    const jsonText = extractJsonObject(llm.content);
    const raw = JSON.parse(jsonText) as Record<string, unknown>;
    const parsed = finalizeParsedContact(
      normalizeParsed(raw),
      params.knownName,
    );

    return {
      parsed,
      costUsd: llm.costUsd,
      promptTokens: llm.promptTokens,
      completionTokens: llm.completionTokens,
    };
  } catch {
    return {
      parsed: finalizeParsedContact(heuristic, params.knownName),
      costUsd: 0,
      promptTokens: 0,
      completionTokens: 0,
    };
  }
}
