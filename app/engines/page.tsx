import type { Metadata } from "next";
import Link from "next/link";
import EngineCard from "@/app/_components/EngineCard";
import MotionSection from "@/app/_components/MotionSection";
import ResponsiveTable, {
  type ResponsiveTableColumn,
} from "@/app/_components/ResponsiveTable";
import { SentencePara } from "@/app/_components/typography";
import { ENGINES, type Engine, type EngineSlug } from "@/app/_lib/engines";
import {
  JsonLd,
  breadcrumbSchema,
  engineItemListSchema,
} from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";
import { PROBLEM_PAGES } from "@/app/_lib/problem-pages";

const WORKFLOW_SEARCH_PHRASE: Record<EngineSlug, string> = {
  sales: "AI lead response automation",
  ops: "AI operations workflow automation",
  support: "AI support ticket triage",
  insight: "AI reporting dashboard automation",
  founder: "AI MVP prototype builder",
  knowledge: "AI internal knowledge base chatbot",
  "back-office": "AI back-office automation",
  outreach: "AI outreach drafting assistant",
};

export const metadata: Metadata = {
  title: "The Engine Labs catalog — 8 productised Engines",
  description:
    "Sales, Ops, Support, Insight, Founder, Knowledge, Back-office and Outreach Engines. Starting prices in AUD. Scope in the Control Centre.",
};

export default function EnginesIndexPage() {
  const siteUrl = getSiteUrl();
  const minFrom = Math.min(...ENGINES.map((e) => e.priceFrom));
  const maxTo = Math.max(...ENGINES.map((e) => e.priceTo));
  const workflowColumns: ResponsiveTableColumn<Engine>[] = [
    {
      key: "workflow",
      header: "Workflow",
      cell: (engine) => engine.oneLiner,
    },
    {
      key: "engine",
      header: "Best Engine",
      cell: (engine) => (
        <Link
          href={`/engines/${engine.slug}`}
          className="font-medium text-foreground transition-colors hover:text-brand"
        >
          {engine.name}
        </Link>
      ),
      primary: true,
    },
    {
      key: "search",
      header: "Typical buyer search",
      mobileLabel: "Typical search",
      cell: (engine) => WORKFLOW_SEARCH_PHRASE[engine.slug],
      tdClassName: "text-ink-3",
    },
  ];
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">The catalog</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Eight Engines. <span className="text-brand">One catalog.</span>
          </h1>
          <SentencePara className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            Each Engine is a productised AI workflow automation build with a
            published spec sheet, a starting price in AUD, and a real
            handover pack. The catalog is built for small businesses,
            agencies and founder-led teams in Australia; price bands run
            from A${minFrom.toLocaleString("en-AU")} to A$
            {maxTo.toLocaleString("en-AU")}, GST exclusive unless stated.
            Stack Engines together if you need to — the Control Centre tells
            you which combination fits your brief.
          </SentencePara>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="eyebrow">Definition</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            What is an Engine?
          </h2>
          <SentencePara className="mt-5 text-base leading-relaxed text-ink-2 md:text-lg">
            An Engine is a small, productised AI workflow, agent or internal
            tool that retires a specific slice of repeatable business work —
            an inbound sales inbox, a weekly report, a supplier paperwork
            pile, a how-do-we-do-X question. Every Engine ships with a fixed
            scope, a published price band, a defect-fix period and a clean
            handover pack you keep.
          </SentencePara>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
          <p className="eyebrow">By workflow</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Which Engine retires which workflow?
          </h2>
          <p className="mt-4 max-w-3xl text-base text-ink-2">
            One row per Engine. Use this table if you know the work you want
            to retire but you are not sure which Engine name to look for.
          </p>
          <ResponsiveTable
            className="mt-8"
            ariaLabel="Engine by workflow"
            columns={workflowColumns}
            rows={ENGINES}
            rowKey={(engine) => engine.slug}
          />
        </div>
      </MotionSection>

      <MotionSection>
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <div className="overflow-hidden rounded-xl border border-border bg-paper">
            <div className="divide-y divide-border">
              {ENGINES.map((engine) => (
                <EngineCard key={engine.slug} engine={engine} />
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="eyebrow">By problem</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Browse by problem.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-2">
            Eight problem-led landing pages, one per Engine — for buyers
            searching by the workflow they want to retire rather than the
            Engine name.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PROBLEM_PAGES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="flex items-center justify-between gap-3 rounded-md border border-border bg-paper px-4 py-3 text-sm transition-colors hover:border-brand"
                >
                  <span className="font-medium text-foreground">
                    {p.h1}
                  </span>
                  <span className="text-xs text-ink-3">
                    {p.engineName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>

      <JsonLd
        data={breadcrumbSchema(
          [{ name: "Engines", path: "/engines" }],
          siteUrl,
        )}
      />
      <JsonLd
        data={engineItemListSchema(
          ENGINES,
          {
            name: "Engine Labs catalog",
            pagePath: "/engines",
            description:
              "Eight productised AI Engines with published spec sheets and AUD price bands.",
          },
          siteUrl,
        )}
      />
    </>
  );
}
