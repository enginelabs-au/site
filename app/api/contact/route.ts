import { NextResponse } from "next/server";
import { appendContactInbox } from "@/app/_lib/email/contact-inbox";
import { sendContactEmail } from "@/app/_lib/email/send-contact-email";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { name, email, message, subject, surface } = (payload ?? {}) as Record<
    string,
    string | undefined
  >;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const entry = {
    id: crypto.randomUUID(),
    name: name.trim().slice(0, 120),
    email: email.trim().slice(0, 320),
    subject: (subject ?? "Website contact — Engine Labs").trim().slice(0, 200),
    message: message.trim().slice(0, 20000),
    surface: (surface ?? "contact").slice(0, 64),
    createdAt: new Date().toISOString(),
  };

  try {
    const { sent, providerId } = await sendContactEmail({
      name: entry.name,
      email: entry.email,
      subject: entry.subject,
      message: entry.message,
      surface: entry.surface,
    });

    await appendContactInbox({
      ...entry,
      delivered: sent,
      providerId,
    });

    return NextResponse.json({
      ok: true,
      delivered: sent,
      message: sent
        ? "Message sent. We'll reply within one business day (Sydney time)."
        : "Message received. We'll reply within one business day (Sydney time).",
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[contact] Resend:", detail);

    await appendContactInbox({ ...entry, delivered: false }).catch(() => {});

    return NextResponse.json(
      {
        error: "send_failed",
        message:
          "Could not send right now. Email hello@enginelabs.com.au directly.",
        detail: process.env.NODE_ENV === "development" ? detail : undefined,
      },
      { status: 502 },
    );
  }
}
