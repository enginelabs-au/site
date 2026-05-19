import { NextResponse } from "next/server";
import { appendBrief } from "@/app/_lib/briefs-store";
import { readFile } from "node:fs/promises";
import path from "node:path";

const DATA_FILE = path.join(process.cwd(), ".data", "briefs.json");

/**
 * Persists Control Centre briefs to .data/briefs.json.
 * Live AI conversation uses POST /api/briefs/chat (OpenRouter).
 */

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const { brief, email, surface, transcript, recommendation } = (payload ?? {}) as Record<
    string,
    unknown
  >;

  if (!brief || typeof brief !== "string" || !brief.trim()) {
    return NextResponse.json(
      { error: "Brief is required." },
      { status: 400 },
    );
  }

  const emailValue =
    typeof email === "string" && /.+@.+\..+/.test(email)
      ? email.trim().slice(0, 320)
      : "";

  const stored = await appendBrief({
    id: crypto.randomUUID(),
    brief: brief.trim().slice(0, 8000),
    email: emailValue,
    surface: (surface ?? "unknown").toString().slice(0, 64),
    createdAt: new Date().toISOString(),
    status: recommendation ? "recommendation" : "received",
    transcript: Array.isArray(transcript)
      ? (transcript as Array<{ role: string; content: string }>)
          .filter(
            (m) =>
              m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string",
          )
          .map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content.slice(0, 4000),
          }))
      : undefined,
    recommendation: recommendation ?? undefined,
  });

  return NextResponse.json(
    {
      ok: true,
      message: "Thanks — we'll review within 1 business day.",
      id: stored.id,
    },
    { status: 201 },
  );
}

export async function GET() {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const count = Array.isArray(parsed) ? parsed.length : 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
