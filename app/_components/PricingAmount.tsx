"use client";

import { useCurrency } from "@/app/_components/CurrencyProvider";

export default function PricingAmount({ amountAud }: { amountAud: number }) {
  const { formatAmount } = useCurrency();
  return <>{formatAmount(amountAud)}</>;
}

export function PricingAmountFrom({ amountAud }: { amountAud: number }) {
  const { formatAmount } = useCurrency();
  return <>from {formatAmount(amountAud)}</>;
}
