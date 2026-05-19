import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENGINES } from "@/app/_lib/engines";
import { ENGINE_DISPLAY } from "@/app/_lib/engine-display";

/**
 * Homepage Engines list — icon row, category badge, one-liner, chevron (reference UI).
 */
export default function EnginesHomeList() {
  return (
    <ul className="mt-8 divide-y divide-section-engines-surface-border overflow-hidden rounded-lg border border-section-engines-surface-border bg-section-engines-surface shadow-sm">
      {ENGINES.map((engine) => {
        const { badge, Icon } = ENGINE_DISPLAY[engine.slug];
        return (
          <li key={engine.slug}>
            <Link
              href={`/engines/${engine.slug}`}
              className="group flex items-start gap-4 px-4 py-4 transition-colors hover:bg-section-engines/40 sm:items-center sm:py-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-section-engines-surface-border bg-section-engines text-section-engines-fg">
                <Icon className="h-[1.15rem] w-[1.15rem] stroke-[1.5]" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-[0.95rem] font-semibold text-section-engines-fg sm:text-base">
                    {engine.name}
                  </span>
                  <span className="rounded-full border border-section-engines-surface-border bg-section-engines px-2 py-0.5 text-[0.68rem] font-medium text-section-engines-fg-muted">
                    {badge}
                  </span>
                </span>
                <span className="mt-1 block text-[0.875rem] leading-relaxed text-section-engines-fg-muted">
                  {engine.oneLiner}
                </span>
              </span>
              <ArrowRight
                className="mt-1 h-4 w-4 shrink-0 text-section-engines-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-section-engines-fg sm:mt-0"
                aria-hidden
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
