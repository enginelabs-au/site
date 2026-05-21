"use client";

import Link from "next/link";
import { useCurrency } from "@/app/_components/CurrencyProvider";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  FileText,
  LifeBuoy,
  Rocket,
  Send,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Engine, EngineSlug } from "@/app/_lib/engines";

const ENGINE_ICONS: Record<EngineSlug, LucideIcon> = {
  sales: ArrowUpRight,
  ops: Workflow,
  support: LifeBuoy,
  insight: BarChart3,
  founder: Rocket,
  knowledge: BookOpen,
  "back-office": FileText,
  outreach: Send,
};

const STACK_PRIMARY: Record<EngineSlug, string> = {
  sales: "Sales",
  ops: "Operations",
  support: "Customer Service",
  insight: "Reporting",
  founder: "MVP",
  knowledge: "Docs",
  "back-office": "Admin",
  outreach: "Support",
};

/**
 * A single Engine row, designed to sit inside a `divide-y divide-border`
 * outer card (see `<EngineList>` consumers). Mirrors the row-divided list
 * pattern used in the reference's "Choose your Engine" section.
 */
export default function EngineCard({
  engine,
  pinned,
}: {
  engine: Engine;
  pinned?: boolean;
  index?: number;
}) {
  const { formatBand } = useCurrency();
  const Icon = ENGINE_ICONS[engine.slug];
  return (
    <Link
      href={`/engines/${engine.slug}`}
      className={`group flex items-start gap-5 p-6 transition-colors hover:bg-paper-3/50 ${
        pinned ? "bg-paper-3/30" : ""
      }`}
    >
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-paper-3 text-ink-2 transition-colors group-hover:text-brand"
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-[1.0625rem] font-semibold tracking-tight text-foreground">
            {engine.name}
          </h3>
          <span className="rounded-full bg-paper-3 px-2.5 py-0.5 text-xs text-ink-3">
            {STACK_PRIMARY[engine.slug]}
          </span>
          {pinned ? (
            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
              Recommended
            </span>
          ) : null}
        </div>

        <p className="text-sm leading-relaxed text-ink-2">
          {engine.homeOneLiner}
        </p>

        <div className="mt-1 flex flex-col gap-1 text-xs text-ink-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2">
          <span className="min-w-0 break-words">
            <span className="text-ink-2">Replaces</span>
            <span aria-hidden className="mx-1.5">
              ·
            </span>
            <span>{engine.replaces}</span>
          </span>
          <span
            aria-hidden
            className="hidden shrink-0 sm:inline"
          >
            ·
          </span>
          <span className="shrink-0 whitespace-nowrap font-medium text-ink-2">
            {formatBand(engine.priceFrom, engine.priceTo)}
          </span>
        </div>
      </div>

      <ArrowRight
        className="mt-2 h-4 w-4 shrink-0 text-ink-3 transition-all group-hover:translate-x-0.5 group-hover:text-foreground"
        aria-hidden
      />
    </Link>
  );
}
