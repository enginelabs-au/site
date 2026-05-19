/**
 * Display currencies. Base list prices are stored in AUD.
 * Rates are indicative for planning — not live FX.
 */

export type CurrencyCode = "AUD" | "USD" | "GBP" | "EUR" | "NZD" | "SGD";

export type CurrencyMeta = {
  code: CurrencyCode;
  label: string;
  /** Multiply AUD amount by this rate to get display amount. */
  rateFromAud: number;
  /** Prefix/symbol shown before the number (e.g. A$, $, £). */
  prefix: string;
};

export const CURRENCIES: CurrencyMeta[] = [
  { code: "AUD", label: "Australian dollar", rateFromAud: 1, prefix: "A$" },
  { code: "USD", label: "US dollar", rateFromAud: 0.65, prefix: "$" },
  { code: "GBP", label: "British pound", rateFromAud: 0.52, prefix: "£" },
  { code: "EUR", label: "Euro", rateFromAud: 0.6, prefix: "€" },
  { code: "NZD", label: "New Zealand dollar", rateFromAud: 1.08, prefix: "NZ$" },
  { code: "SGD", label: "Singapore dollar", rateFromAud: 0.88, prefix: "S$" },
];

export const DEFAULT_CURRENCY: CurrencyCode = "AUD";

export function currencyMeta(code: CurrencyCode): CurrencyMeta {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function convertFromAud(amountAud: number, code: CurrencyCode): number {
  const { rateFromAud } = currencyMeta(code);
  return Math.round(amountAud * rateFromAud);
}

export function formatAmount(
  amountAud: number,
  code: CurrencyCode,
  opts?: { compact?: boolean },
): string {
  const meta = currencyMeta(code);
  const value = convertFromAud(amountAud, code);
  const formatted = value.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return `${meta.prefix}${formatted}`;
}

export function formatPriceBand(
  fromAud: number,
  toAud: number | undefined,
  code: CurrencyCode,
): string {
  if (toAud !== undefined && toAud !== fromAud) {
    return `from ${formatAmount(fromAud, code)} → ${formatAmount(toAud, code)}`;
  }
  return `from ${formatAmount(fromAud, code)}`;
}

export const CURRENCY_DISCLAIMER =
  "Converted amounts are indicative (base prices in AUD). GST exclusive unless stated.";
