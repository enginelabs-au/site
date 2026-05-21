import type { Metadata } from "next";
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
import { engineMdxComponents, SentencePara } from "@/app/_components/typography";
import {
  JsonLd,
  breadcrumbSchema,
  engineServiceSchema,
} from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

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

  const siteUrl = getSiteUrl();

  type MdxComponent = React.ComponentType<{ components?: typeof engineMdxComponents }>;
  let MDX: MdxComponent | null = null;
  try {
    const mod = await import(`@/content/engines/${slug}.mdx`);
    MDX = mod.default as MdxComponent;
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
              <SentencePara className="mt-6 max-w-prose text-base leading-relaxed text-ink-2 md:text-[1.0625rem]">
                {engine.oneLiner} It replaces {engine.replaces.replace(/\.$/, "")}
                , and the AI workflow automation build ships in {engine.timeline}.
                Starting price band: A${engine.priceFrom.toLocaleString("en-AU")}–A$
                {engine.priceTo.toLocaleString("en-AU")} AUD, GST exclusive
                unless stated, scoped in the Control Centre for small
                businesses and founder-led teams in Australia.
              </SentencePara>
              <div className="mt-8">
                <Link
                  href={`/control-centre?engine=${engine.slug}`}
                  className="group/cta inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
                >
                  Configure this in the Control Centre
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </div>

              <dl className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DlStat term="Replaces" detail={engine.replaces} />
                <DlStat
                  term="Price band"
                  detail={
                    <EnginePriceStat
                      from={engine.priceFrom}
                      to={engine.priceTo}
                    />
                  }
                  note="scoped in the Control Centre"
                />
                <DlStat term="Typical timeline" detail={engine.timeline} />
                <DlStat
                  term="Stack tier"
                  detail={engine.stackTiers.join(" · ")}
                  note="Typical integrations listed in the spec sheet below"
                />
              </dl>
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

      <section
        aria-labelledby={`${engine.slug}-what-it-does-heading`}
        className="border-t border-border bg-paper-2 px-4 py-12 md:py-14"
      >
        <div className="mx-auto max-w-[50rem]">
          <p className="eyebrow">Spec sheet</p>
          <h2
            id={`${engine.slug}-what-it-does-heading`}
            className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]"
          >
            What does the {engine.name} do?
          </h2>
          <SentencePara className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
            The published spec sheet below covers the work it retires, the
            inputs and outputs, typical integrations, what&apos;s in and
            out of scope, the commercial detail and the tiered price bands.
          </SentencePara>
        </div>
      </section>

      {MDX ? <MDX components={engineMdxComponents} /> : null}

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
        <div className="mx-auto max-w-5xl px-4 py-24 text-center">
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

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Engines", path: "/engines" },
            { name: engine.name, path: `/engines/${engine.slug}` },
          ],
          siteUrl,
        )}
      />
      <JsonLd data={engineServiceSchema(engine, siteUrl)} />
    </>
  );
}

function DlStat({
  term,
  detail,
  note,
}: {
  term: string;
  detail: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="rounded-md border border-border bg-paper p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
        {term}
      </dt>
      <dd className="mt-2 text-sm leading-snug text-foreground">{detail}</dd>
      {note ? <p className="mt-1 text-xs text-ink-3">{note}</p> : null}
    </div>
  );
}
