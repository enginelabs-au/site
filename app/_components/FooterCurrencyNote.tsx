"use client";

import CurrencySelector from "@/app/_components/CurrencySelector";
import { useCurrency } from "@/app/_components/CurrencyProvider";

export default function FooterCurrencyNote() {
  const { disclaimer } = useCurrency();
  return (
    <div className="mt-3 flex flex-wrap items-center justify-end gap-3 sm:mt-0">
      <span className="text-xs text-ink-3">{disclaimer}</span>
      <CurrencySelector label="Currency (AUD)" className="text-xs text-ink-3" />
    </div>
  );
}
