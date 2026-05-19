import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ENGINES, engineBySlug, VERTICALS } from "@/app/_lib/engines";
import EngineCard from "@/app/_components/EngineCard";
import VerticalCard from "@/app/_components/VerticalCard";
import PriceBand from "@/app/_components/PriceBand";
import EnginePriceStat from "@/app/_components/EnginePriceStat";
import {
  EngineRelatedBand,
  EngineVerticalsBand,
} from "@/app/_components/engine-spec";

export function generateStaticParams() {
  return ENGINES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const engine = engineBySlug(slug);
  if (!engine) return {};
  return {
    title: `${engine.name} by Engine Labs`,
    description: engine.oneLiner.slice(0, 155),
  };
}

export default async function EnginePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const engine = engineBySlug(slug);
  if (!engine) notFound();

  let MDX: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/engines/${slug}.mdx`);
    MDX = mod.default as React.ComponentType;
  } catch {
    MDX = null;
  }

  const related = engine.related
    .map((r) => engineBySlug(r))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const suggestedVerticals = engine.verticals
    .map((v) => VERTICALS.find((x) => x.slug === v))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div aria-hidden className="subtle-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-12 md:pb-16">
          <p className="text-sm text-ink-3">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span className="mx-1.5 text-ink-3/60">/</span>
            <Link href="/engines" className="transition-colors hover:text-foreground">
              Engines
            </Link>
            <span className="mx-1.5 text-ink-3/60">/</span>
            <span className="text-foreground">{engine.name}</span>
          </p>
          <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12 lg:items-start">
            <div>
              <p className="eyebrow">Engine</p>
              <h1 className="mt-3 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
                {engine.name}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
                {engine.oneLiner}
              </p>
              <div className="mt-8">
                <Link
                  href={`/control-centre?engine=${engine.slug}`}
                  className="group/cta inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
                >
                  Configure this in the Control Centre
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Stat label="Replaces" value={engine.replaces} />
                <Stat
                  label="Price band"
                  value={
                    <EnginePriceStat from={engine.priceFrom} to={engine.priceTo} />
                  }
                  note="scoped in the Control Centre"
                />
                <Stat label="Typical timeline" value={engine.timeline} />
                <Stat label="Stack tier" value={engine.stackTiers.join(" · ")} />
              </div>
            </div>

            <aside className="mt-10 lg:mt-16 lg:sticky lg:top-24">
              <div className="rounded-xl border border-border bg-paper p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
                  Configure this Engine
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  Describe your situation and we&apos;ll come back with a draft scope
                  tailored to your channels, tools and qualification rules.
                </p>
                <Link
                  href={`/control-centre?engine=${engine.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
                >
                  Open the Control Centre
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="mt-5">
                  <PriceBand
                    from={engine.priceFrom}
                    to={engine.priceTo}
                    variant="card"
                    note={engine.priceNote}
                  />
                </div>
                <Link
                  href="/pricing"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-ink-2 transition-colors hover:text-brand"
                >
                  See full pricing schedule
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {MDX ? <MDX /> : null}

      <EngineRelatedBand title="Related Engines">
        <div className="overflow-hidden rounded-xl border border-section-engines-surface-border bg-section-engines-surface shadow-sm">
          <div className="divide-y divide-section-engines-surface-border">
            {related.map((r) => (
              <EngineCard key={r.slug} engine={r} />
            ))}
          </div>
        </div>
      </EngineRelatedBand>

      <EngineVerticalsBand
        title="Suggested for"
        subtitle="Verticals where this Engine carries most of the weight in the recommended stack."
      >
        <div className="overflow-hidden rounded-xl border border-section-methodology-card-border bg-section-methodology-card shadow-sm">
          <div className="divide-y divide-border">
            {suggestedVerticals.map((v) => (
              <VerticalCard key={v.slug} vertical={v} />
            ))}
          </div>
        </div>
      </EngineVerticalsBand>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="eyebrow">Get started</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Configure this in the Control Centre.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-2 md:text-lg">
            Two to four minutes. A draft scope and a starting price band — no call
            required.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={`/control-centre?engine=${engine.slug}`}
              className="group/cta inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Open the Control Centre
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
            <Link
              href="/engines"
              className="inline-flex items-center justify-center rounded-md border border-border bg-paper px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-rule-strong hover:bg-paper-3"
            >
              Browse the catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: ReactNode;
  note?: string;
}) {
  return (
    <div className="rounded-md border border-border bg-paper p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
        {label}
      </p>
      <div className="mt-2 text-sm leading-snug text-foreground">{value}</div>
      {note ? <p className="mt-1 text-xs text-ink-3">{note}</p> : null}
    </div>
  );
}
