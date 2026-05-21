import Link from "next/link";
import type { FAQItem } from "@/app/_components/FAQAccordion";
import {
  ENGINES,
  engineBySlug,
  type Vertical,
} from "@/app/_lib/engines";

/**
 * Generate per-vertical FAQ items driven entirely by data already in
 * `app/_lib/engines.ts`. No invented facts — answers reference the
 * existing stack, hookLine, exampleBrief and (when present) caveat.
 */
export function verticalFaqItems(v: Vertical): FAQItem[] {
  const stackEngines = v.stack
    .map((s) => engineBySlug(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const stackEnginePrices = stackEngines.map((e) => e.priceFrom);
  const stackMinPrice = stackEnginePrices.length
    ? Math.min(...stackEnginePrices)
    : Math.min(...ENGINES.map((e) => e.priceFrom));
  const timelines = stackEngines.map((e) => e.timeline);

  const items: FAQItem[] = [
    {
      q: `What does Engine Labs do for ${v.shortName}?`,
      a: <>{v.hookLine}</>,
    },
    {
      q: `Which Engines does Engine Labs recommend for ${v.shortName}?`,
      a: (
        <>
          The recommended stack is{" "}
          {stackEngines.map((e, i) => (
            <span key={e.slug}>
              {i > 0 ? (i === stackEngines.length - 1 ? " and " : ", ") : null}
              <Link
                href={`/engines/${e.slug}`}
                className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
              >
                {e.name}
              </Link>
            </span>
          ))}
          . The Control Centre tells you which to start with and how to add
          the others later.
        </>
      ),
    },
    {
      q: `How much does an Engine Labs build cost for ${v.shortName}?`,
      a: (
        <>
          The recommended {v.shortName} stack starts from A$
          {stackMinPrice.toLocaleString("en-AU")} AUD per Engine (GST exclusive
          unless stated), scoped in the Control Centre. See the{" "}
          <Link
            href="/pricing"
            className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
          >
            full pricing schedule
          </Link>{" "}
          for tiered bands.
        </>
      ),
    },
    {
      q: `How long does an Engine Labs build take for ${v.shortName}?`,
      a: (
        <>
          The Engines in the recommended {v.shortName} stack typically ship
          in {Array.from(new Set(timelines)).join(" / ")}, depending on
          tier and integration count.
        </>
      ),
    },
    {
      q: `What's an example brief from ${v.shortName}?`,
      a: <>{v.exampleBrief}</>,
    },
  ];

  if (v.caveat) {
    items.push({
      q: `Are there any limits on what Engine Labs will build for ${v.shortName}?`,
      a: <>{v.caveat}</>,
    });
  }

  return items;
}
