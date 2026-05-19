"use client";

import { useCurrency } from "@/app/_components/CurrencyProvider";

type PriceBandProps = {
  from: number;
  to?: number;
  variant?: "default" | "inline" | "card" | "tag";
  note?: string;
  className?: string;
};

export default function PriceBand({
  from,
  to,
  variant = "default",
  note,
  className,
}: PriceBandProps) {
  const { formatBand } = useCurrency();
  const longForm = formatBand(from, to);

  if (variant === "tag") {
    return (
      <span
        className={`inline-flex items-center rounded-md border border-border bg-paper-2 px-2 py-0.5 text-[0.78rem] text-ink-2 ${
          className ?? ""
        }`}
      >
        {longForm}
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <span className={`text-[0.92rem] text-foreground ${className ?? ""}`}>
        <span className="font-medium">{longForm}</span>
        <span className="ml-2 text-ink-3">scoped in the Control Centre</span>
        {note ? <span className="ml-2 text-ink-3">· {note}</span> : null}
      </span>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`rounded-md border border-border bg-paper-2 px-3.5 py-3 text-[0.85rem] leading-tight ${
          className ?? ""
        }`}
      >
        <div className="text-[0.78rem] uppercase tracking-[0.06em] text-ink-3">
          Price band
        </div>
        <div className="mt-1.5 font-medium text-foreground">{longForm}</div>
        <div className="mt-0.5 text-ink-3">scoped in the Control Centre</div>
        {note ? <div className="mt-1.5 text-ink-3">{note}</div> : null}
      </div>
    );
  }

  return (
    <div className={`text-[0.92rem] ${className ?? ""}`}>
      <div className="font-medium text-foreground">{longForm}</div>
      <div className="text-ink-3">
        scoped in the Control Centre{note ? ` · ${note}` : ""}
      </div>
    </div>
  );
}
