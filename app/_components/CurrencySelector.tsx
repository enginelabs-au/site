"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CURRENCIES } from "@/app/_lib/currency";
import { useCurrency } from "@/app/_components/CurrencyProvider";

type CurrencySelectorProps = {
  /** e.g. "Band (AUD)" — code in parentheses is replaced with active currency */
  label?: string;
  className?: string;
  align?: "left" | "right";
};

/**
 * Clickable currency control — updates prices site-wide via CurrencyProvider.
 */
export default function CurrencySelector({
  label,
  className = "",
  align = "right",
}: CurrencySelectorProps) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const displayLabel =
    label?.replace(/\([A-Z]{3}\)/, `(${currency})`) ?? `Band (${currency})`;

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-inherit transition-colors hover:bg-muted/80 hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Price band currency: ${currency}. Click to change.`}
      >
        <span>{displayLabel}</span>
        <ChevronDown
          className={`h-3 w-3 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Select currency"
          className={`absolute z-50 mt-1 min-w-[10rem] overflow-hidden rounded-md border border-border bg-background py-1 text-[0.8125rem] shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {CURRENCIES.map((c) => (
            <li key={c.code} role="option" aria-selected={c.code === currency}>
              <button
                type="button"
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-4 px-3 py-2 text-left transition-colors hover:bg-muted ${
                  c.code === currency ? "bg-muted/60 font-medium text-foreground" : "text-ink-2"
                }`}
              >
                <span>{c.code}</span>
                <span className="text-xs text-muted-foreground">{c.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
