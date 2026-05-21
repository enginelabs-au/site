import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FAQAccordion, { type FAQItem } from "@/app/_components/FAQAccordion";
import MotionSection from "@/app/_components/MotionSection";
import ResponsiveTable, {
  type ResponsiveTableColumn,
} from "@/app/_components/ResponsiveTable";
import { SentencePara } from "@/app/_components/typography";
import type {
  ComparePage as ComparePageData,
  CompareRow,
} from "@/app/_lib/compare-pages";
import {
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
} from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

/**
 * Shared renderer for the four /compare/* pages.
 *
 * Even-handed, factual structure: H1 + 2-sentence summary, a comparison
 * table, two short "when X is the better fit" sections, an FAQ block,
 * and prose CTA links. Emits BreadcrumbList and FAQPage JSON-LD.
 */
export default function ComparePage({ page }: { page: ComparePageData }) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/compare/${page.slug}`;
  const faqItems: FAQItem[] = page.faqs.map((f) => ({ q: f.q, a: f.a }));

  const comparisonColumns: ResponsiveTableColumn<CompareRow>[] = [
    {
      key: "attribute",
      header: "Attribute",
      cell: (row) => row.attribute,
      primary: true,
      tdClassName: "font-medium text-foreground",
    },
    {
      key: "optionA",
      header: page.optionAName,
      cell: (row) => row.optionA,
    },
    {
      key: "optionB",
      header: page.optionBName,
      cell: (row) => row.optionB,
    },
  ];

  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-4xl px-4 pt-16 pb-12 md:pt-20 md:pb-16">
          <p className="text-sm text-ink-3">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span className="mx-1.5 text-ink-3/60">/</span>
            <Link
              href="/compare"
              className="transition-colors hover:text-foreground"
            >
              Compare
            </Link>
            <span className="mx-1.5 text-ink-3/60">/</span>
            <span className="text-foreground">{page.h1}</span>
          </p>
          <p className="eyebrow mt-8">Compare</p>
          <h1 className="mt-3 text-balance text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem]">
            {page.h1}
          </h1>
          <SentencePara className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            {page.summary}
          </SentencePara>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="eyebrow">Side by side</p>
          <h2 className="mt-4 text-[1.75rem] font-medium tracking-tight text-foreground md:text-[2rem]">
            {page.optionAName} vs {page.optionBName}.
          </h2>
          <ResponsiveTable
            className="mt-8"
            ariaLabel={`${page.optionAName} vs ${page.optionBName}`}
            columns={comparisonColumns}
            rows={page.comparisonRows}
            rowKey={(row) => row.attribute}
          />
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto grid max-w-4xl gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="text-[1.25rem] font-semibold tracking-tight text-foreground md:text-[1.4rem]">
              {page.whenOptionAWins.heading}
            </h2>
            <SentencePara className="mt-3 text-base leading-relaxed text-ink-2">
              {page.whenOptionAWins.body}
            </SentencePara>
          </div>
          <div>
            <h2 className="text-[1.25rem] font-semibold tracking-tight text-foreground md:text-[1.4rem]">
              {page.whenOptionBWins.heading}
            </h2>
            <SentencePara className="mt-3 text-base leading-relaxed text-ink-2">
              {page.whenOptionBWins.body}
            </SentencePara>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-[1.75rem] font-medium tracking-tight text-foreground md:text-[2rem]">
            Questions on this comparison.
          </h2>
          <div className="mt-8">
            <FAQAccordion items={faqItems} idPrefix={`${page.slug}-faq`} />
          </div>
        </div>
      </MotionSection>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:py-24">
          <p className="eyebrow">Get started</p>
          <h2 className="mt-4 text-[1.75rem] font-medium tracking-tight text-foreground md:text-[2rem]">
            Brief it in the Control Centre.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-2 md:text-lg">
            Browse the{" "}
            <Link
              href="/engines"
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              Engine catalog
            </Link>
            , review the{" "}
            <Link
              href="/pricing"
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              pricing schedule
            </Link>
            , or open the{" "}
            <Link
              href="/control-centre"
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              Control Centre
            </Link>{" "}
            and we will recommend the right Engine for your brief.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/control-centre"
              className="group/cta inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Open the Control Centre
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-md border border-border bg-paper px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-rule-strong hover:bg-paper-3"
            >
              All comparisons
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Compare", path: "/compare" },
            { name: page.h1, path: `/compare/${page.slug}` },
          ],
          siteUrl,
        )}
      />
      <JsonLd data={faqPageSchema(faqItems, pageUrl)} />
    </>
  );
}
