import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  ENGINES,
  VERTICALS,
  engineBySlug,
  verticalBySlug,
} from "@/app/_lib/engines";
import EngineCard from "@/app/_components/EngineCard";
import MotionSection from "@/app/_components/MotionSection";

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = verticalBySlug(slug);
  if (!v) return {};
  return {
    title: v.metaTitle,
    description: v.metaDescription,
  };
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = verticalBySlug(slug);
  if (!v) notFound();

  const stackEngines = v.stack
    .map((s) => engineBySlug(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const stackSet = new Set(v.stack);
  const otherEngines = ENGINES.filter((e) => !stackSet.has(e.slug));

  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-12 md:pb-16">
          <p className="text-sm text-ink-3">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span className="mx-1.5 text-ink-3/60">/</span>
            <Link href="/verticals" className="transition-colors hover:text-foreground">
              Built for
            </Link>
            <span className="mx-1.5 text-ink-3/60">/</span>
            <span className="text-foreground">{v.shortName}</span>
          </p>
          <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12 lg:items-start">
            <div>
              <p className="eyebrow">{v.hero.eyebrow}</p>
              <h1 className="mt-3 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
                {v.hero.h1}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
                {v.hero.subhead}
              </p>
              <blockquote className="mt-8 border-l-2 border-rule-strong pl-5 text-base text-ink-3">
                “{v.pain}”
              </blockquote>
              {v.caveat ? (
                <div className="mt-7 rounded-md border border-border bg-paper p-5 text-sm leading-relaxed text-ink-2">
                  {v.caveat}
                </div>
              ) : null}
              <div className="mt-8">
                <Link
                  href={`/control-centre?vertical=${v.slug}`}
                  className="group/cta inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
                >
                  Configure this in the Control Centre
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <aside className="mt-10 lg:mt-16 lg:sticky lg:top-24">
              <div className="rounded-xl border border-border bg-paper p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
                  Configure your stack
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  Describe your situation and we&apos;ll recommend which Engine to
                  start with for your {v.shortName} business — and how to add the
                  rest of the stack later.
                </p>
                <Link
                  href={`/control-centre?vertical=${v.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
                >
                  Open the Control Centre
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="mt-5 rounded-md border border-border bg-paper-2 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                    Recommended stack
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {stackEngines.map((e) => (
                      <li key={e.slug}>
                        <Link
                          href={`/engines/${e.slug}`}
                          className="text-sm text-foreground transition-colors hover:text-brand"
                        >
                          {e.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="#stack"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-ink-2 transition-colors hover:text-brand"
                >
                  See stack breakdown
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div id="stack" className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <p className="eyebrow">The {v.shortName} stack</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Three Engines.{" "}
            <span className="text-brand">
              One operator&apos;s worth of work, off your plate.
            </span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            This is the stack we recommend for most {v.shortName} businesses.
            The Control Centre will tell you which one to start with and how
            to add the others later.
          </p>
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-paper">
            <div className="divide-y divide-border">
              {stackEngines.map((e, i) => (
                <EngineCard key={e.slug} engine={e} pinned index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-[1.75rem]">
            The full catalog
          </h2>
          <p className="mt-3 text-base text-ink-2">
            Everything else, in case the Control Centre recommends a stack
            that includes one of these.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-paper">
            <div className="divide-y divide-border">
              {otherEngines.map((e) => (
                <EngineCard key={e.slug} engine={e} />
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

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
              href={`/control-centre?vertical=${v.slug}`}
              className="group/cta inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Open the Control Centre
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
            <Link
              href="/verticals"
              className="inline-flex items-center justify-center rounded-md border border-border bg-paper px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-rule-strong hover:bg-paper-3"
            >
              Browse all verticals
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
