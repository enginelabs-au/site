"use client";

import { useCurrency } from "@/app/_components/CurrencyProvider";

export default function EnginePriceStat({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const { formatBand } = useCurrency();
  return <>{formatBand(from, to)}</>;
}
