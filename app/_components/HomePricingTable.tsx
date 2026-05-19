"use client";

import Link from "next/link";
import { ENGINES } from "@/app/_lib/engines";
import { useCurrency } from "@/app/_components/CurrencyProvider";
import CurrencySelector from "@/app/_components/CurrencySelector";
import TableScroll from "@/app/_components/TableScroll";

export default function HomePricingTable() {
  const { formatBand, disclaimer } = useCurrency();

  return (
    <>
      <TableScroll className="mt-8 rounded-lg border border-section-pricing-surface-border bg-section-pricing-surface text-section-pricing-surface-fg shadow-md">
        <table className="w-max min-w-[36rem] text-left text-sm">
          <thead className="border-b border-section-pricing-surface-border bg-black/10 text-xs font-medium uppercase tracking-wide text-section-pricing-surface-fg-muted dark:bg-white/5">
            <tr>
              <th className="px-4 py-3">Engine</th>
              <th className="px-4 py-3">Replaces</th>
              <th className="hidden px-4 py-3 md:table-cell">Timeline</th>
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
                <td className="hidden px-4 py-3 align-top text-[0.85rem] text-section-pricing-surface-fg-muted md:table-cell">
                  {engine.timeline}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right align-top text-[0.85rem]">
                  {formatBand(engine.priceFrom, engine.priceTo)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <p className="mt-3 text-[0.75rem] leading-relaxed text-section-pricing-fg-muted">{disclaimer}</p>
    </>
  );
}
