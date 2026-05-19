"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Hammer,
  Rocket,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Vertical, VerticalSlug } from "@/app/_lib/engines";

const VERTICAL_ICONS: Record<VerticalSlug, LucideIcon> = {
  founders: Rocket,
  agencies: Briefcase,
  trades: Hammer,
  ecommerce: ShoppingBag,
  recruiters: Users,
  coaches: GraduationCap,
};

/**
 * A single Vertical row, designed to sit inside a `divide-y divide-border`
 * outer card. Mirrors the same row-divided pattern as `EngineCard`.
 */
export default function VerticalCard({ vertical }: { vertical: Vertical }) {
  const Icon = VERTICAL_ICONS[vertical.slug];
  return (
    <Link
      href={`/verticals/${vertical.slug}`}
      className="group flex items-start gap-5 p-6 transition-colors hover:bg-paper-3/50"
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
            {vertical.cardName}
          </h3>
          <span className="rounded-full bg-paper-3 px-2.5 py-0.5 text-xs text-ink-3">
            Built for
          </span>
        </div>

        <p className="text-sm leading-relaxed text-ink-2">
          “{vertical.pain}”
        </p>

        <div className="mt-1 text-xs text-ink-3">
          <span className="text-ink-2">Stack</span>&nbsp;·&nbsp;
          {vertical.stack
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "))
            .join(" + ")}
        </div>
      </div>

      <ArrowRight
        className="mt-2 h-4 w-4 shrink-0 text-ink-3 transition-all group-hover:translate-x-0.5 group-hover:text-foreground"
        aria-hidden
      />
    </Link>
  );
}
