"use client";

import Link from "next/link";
import { ENGINES } from "@/app/_lib/engines";
import { useCurrency } from "@/app/_components/CurrencyProvider";
import CurrencySelector from "@/app/_components/CurrencySelector";

export default function HomePricingTable() {
  const { formatBand, disclaimer } = useCurrency();

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-lg border border-section-pricing-surface-border bg-section-pricing-surface text-section-pricing-surface-fg shadow-md">
        <div className="flex items-center justify-between gap-4 border-b border-section-pricing-surface-border bg-black/10 px-4 py-3 text-xs font-medium uppercase tracking-wide text-section-pricing-surface-fg-muted dark:bg-white/5 md:hidden">
          <span>Engine</span>
          <CurrencySelector label="Band (AUD)" align="right" />
        </div>
        <ul className="divide-y divide-section-pricing-surface-border md:hidden">
          {ENGINES.map((engine) => (
            <li key={engine.slug} className="px-4 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <Link
                  href={`/engines/${engine.slug}`}
                  className="min-w-0 break-words text-[0.95rem] font-medium text-section-pricing-surface-fg hover:text-brand"
                >
                  {engine.name}
                </Link>
                <span className="shrink-0 whitespace-nowrap text-[0.85rem] text-section-pricing-surface-fg">
                  {formatBand(engine.priceFrom, engine.priceTo)}
                </span>
              </div>
              <dl className="mt-2 space-y-1.5 text-[0.8rem] text-section-pricing-surface-fg-muted">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.06em]">
                    Replaces
                  </dt>
                  <dd className="break-words leading-snug">{engine.replaces}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.06em]">
                    Timeline
                  </dt>
                  <dd>{engine.timeline}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <table className="hidden w-full text-left text-sm md:table">
          <thead className="border-b border-section-pricing-surface-border bg-black/10 text-xs font-medium uppercase tracking-wide text-section-pricing-surface-fg-muted dark:bg-white/5">
            <tr>
              <th className="px-4 py-3">Engine</th>
              <th className="px-4 py-3">Replaces</th>
              <th className="px-4 py-3">Timeline</th>
              <th className="px-4 py-3 text-right">
                <CurrencySelector label="Band (AUD)" align="right" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-section-pricing-surface-border">
            {ENGINES.map((engine) => (
              <tr key={engine.slug} className="hover:bg-white/5">
                <td className="px-4 py-3 align-top">
                  <Link
                    href={`/engines/${engine.slug}`}
                    className="font-medium text-section-pricing-surface-fg hover:text-brand"
                  >
                    {engine.name}
                  </Link>
                </td>
                <td className="px-4 py-3 align-top text-[0.85rem] text-section-pricing-surface-fg-muted">
                  {engine.replaces}
                </td>
                <td className="px-4 py-3 align-top text-[0.85rem] text-section-pricing-surface-fg-muted">
                  {engine.timeline}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right align-top text-[0.85rem]">
                  {formatBand(engine.priceFrom, engine.priceTo)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[0.75rem] leading-relaxed text-section-pricing-fg-muted">{disclaimer}</p>
    </>
  );
}
