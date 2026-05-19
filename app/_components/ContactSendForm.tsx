"use client";

import { useEffect, useState } from "react";
import { RotateCcw, Send } from "lucide-react";
import {
  BRIEF_HANDOFF_EVENT,
  clearBriefHandoff,
  loadBriefHandoff,
} from "@/app/_lib/brief-handoff";
import {
  normalizeVisitorEmail,
  normalizeVisitorName,
} from "@/app/_lib/recommender/contact-intake";

type ContactSendFormProps = {
  className?: string;
  variant?: "default" | "inverse";
};

export default function ContactSendForm({
  className = "",
  variant = "default",
}: ContactSendFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [wasDelivered, setWasDelivered] = useState(false);
  function resetForm() {
    setName("");
    setEmail("");
    setMessage("");
    setError(null);
    setSuccessMessage(null);
    setWasDelivered(false);
    clearBriefHandoff();
    setStatus("idle");
  }

  useEffect(() => {
    function applyHandoff() {
      const handoff = loadBriefHandoff();
      if (!handoff) return;

      const mode = handoff.mode ?? (handoff.emailBody?.trim() ? "brief" : "blank");

      if (mode === "blank") {
        setName("");
        setEmail("");
        setMessage("");
        return;
      }

      if (handoff.visitorName?.trim()) {
        setName(normalizeVisitorName(handoff.visitorName));
      }
      if (handoff.visitorEmail?.trim()) {
        setEmail(normalizeVisitorEmail(handoff.visitorEmail));
      }

      if (mode === "contact_only") {
        setMessage("");
        return;
      }

      if (handoff.emailBody?.trim()) {
        setMessage(handoff.emailBody);
      }
    }

    applyHandoff();
    window.addEventListener(BRIEF_HANDOFF_EVENT, applyHandoff);
    window.addEventListener("hashchange", applyHandoff);
    window.addEventListener("focus", applyHandoff);

    return () => {
      window.removeEventListener(BRIEF_HANDOFF_EVENT, applyHandoff);
      window.removeEventListener("hashchange", applyHandoff);
      window.removeEventListener("focus", applyHandoff);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    setSuccessMessage(null);
    setWasDelivered(false);

    const handoff = loadBriefHandoff();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: handoff?.emailSubject,
          surface: handoff?.surface ?? "contact-form",
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
        detail?: string;
        delivered?: boolean;
      };
      if (!res.ok) {
        const hint = data.detail ? ` (${data.detail})` : "";
        throw new Error(
          (data.message ?? data.error ?? "Send failed") + hint,
        );
      }
      setName("");
      setEmail("");
      setMessage("");
      clearBriefHandoff();
      setStatus("idle");
      setSuccessMessage(
        data.message ??
          "We'll reply within one business day (Sydney time).",
      );
      setWasDelivered(data.delivered === true);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send. Try again.");
    }
  }

  const isInverse = variant === "inverse";
  const labelClass = isInverse ? "text-paper-inverse-fg-muted" : "text-muted-foreground";
  const inputClass = isInverse
    ? "border-paper-inverse-rule bg-paper-inverse text-paper-inverse-fg placeholder:text-paper-inverse-fg-muted"
    : "border-border bg-background text-foreground";

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={`mb-1 block text-xs font-medium ${labelClass}`}>
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "sending"}
            className={`w-full rounded-md border px-3 py-2 text-sm ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={`mb-1 block text-xs font-medium ${labelClass}`}>
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sending"}
            className={`w-full rounded-md border px-3 py-2 text-sm ${inputClass}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={`mb-1 block text-xs font-medium ${labelClass}`}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={14}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "sending"}
          placeholder="Describe your challenge, or complete the Control Centre first to auto-fill a structured brief."
          className={`w-full resize-y rounded-md border px-3 py-2 font-mono text-[0.8rem] leading-relaxed ${inputClass}`}
        />
      </div>

      {error ? <p className="text-xs text-warn">{error}</p> : null}

      {successMessage ? (
        <p className={`text-sm ${isInverse ? "text-paper-inverse-fg" : "text-foreground"}`}>
          {wasDelivered ? "Sent" : "Received"} — {successMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending" || !message.trim()}
          className="btn-primary"
        >
          <Send className="h-4 w-4" aria-hidden />
          {status === "sending" ? "Sending…" : "Send to Engine Labs"}
        </button>
        <button
          type="button"
          onClick={resetForm}
          disabled={status === "sending"}
          className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
            isInverse
              ? "border-paper-inverse-rule text-paper-inverse-fg-muted hover:bg-paper-inverse-fg/10 hover:text-paper-inverse-fg"
              : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Reset
        </button>
      </div>
    </form>
  );
}
