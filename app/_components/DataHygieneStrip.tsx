import { ShieldCheck } from "lucide-react";

export default function DataHygieneStrip({
  retention = "session",
}: {
  retention?: "session" | "90-day";
}) {
  const retentionCopy =
    retention === "session"
      ? "Drafts are kept for your session only."
      : "Drafts are kept for 90 days unless you save the brief.";
  return (
    <div className="flex items-start gap-2 rounded-md border border-border bg-paper-2 px-3 py-2.5 text-[0.82rem] leading-relaxed text-ink-2">
      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-none text-ink-3" aria-hidden />
      <span>
        Don't paste secrets, API keys or sensitive personal information here.{" "}
        <span className="text-ink-3">{retentionCopy}</span>
      </span>
    </div>
  );
}
