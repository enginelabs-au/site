import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FAQAccordion, { type FAQItem } from "@/app/_components/FAQAccordion";
import MotionSection from "@/app/_components/MotionSection";
import { SentencePara } from "@/app/_components/typography";
import { engineBySlug } from "@/app/_lib/engines";
import type { ProblemPage as ProblemPageData } from "@/app/_lib/problem-pages";
import {
  JsonLd,
  breadcrumbSchema,
  engineServiceId,
  faqPageSchema,
} from "@/app/_lib/json-ld";
import { organizationRef } from "@/app/_lib/json-ld/entities";
import { getSiteUrl } from "@/app/_lib/site-url";

/**
 * Shared renderer for the eight problem-led landing pages.
 *
 * Each page under /app/<slug>/page.tsx imports this component and passes
 * its `ProblemPage` data record. The renderer emits:
 *
 * - visible breadcrumb (Home → Solutions → page name)
 * - H1 + 2–3 sentence summary
 * - H2 sections: What is, Who is it for, What does it replace, Inputs,
 *   Outputs, How much does it cost, Integrations, What should not be
 *   automated, How Engine Labs builds it
 * - FAQ accordion with FAQPage JSON-LD
 * - Service JSON-LD referenced via the mapped Engine's @id
 * - BreadcrumbList JSON-LD
 * - CTA prose links
 */
export default function ProblemPage({ page }: { page: ProblemPageData }) {
  const engine = engineBySlug(page.engineSlug);
  if (!engine) {
    throw new Error(
      `ProblemPage: no engine found for slug ${page.engineSlug}`,
    );
  }
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${page.slug}`;

  const faqItems: FAQItem[] = page.faqs.map((f) => ({ q: f.q, a: f.a }));

  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-4xl px-4 pt-16 pb-12 md:pt-20 md:pb-16">
          <p className="text-sm text-ink-3">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span className="mx-1.5 text-ink-3/60">/</span>
            <span className="text-foreground">{page.h1}</span>
          </p>
          <p className="eyebrow mt-8">Solution</p>
          <h1 className="mt-3 text-balance text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem]">
            {page.h1}
          </h1>
          <SentencePara className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            {page.summary.split(page.engineName)[0]}
            <Link
              href={`/engines/${engine.slug}`}
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              {page.engineName}
            </Link>
            {page.summary.split(page.engineName).slice(1).join(page.engineName)}
          </SentencePara>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/control-centre?engine=${engine.slug}`}
              className="group/cta inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Brief this in the Control Centre
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
            <Link
              href={`/engines/${engine.slug}`}
              className="inline-flex items-center justify-center rounded-md border border-border bg-paper px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-rule-strong hover:bg-paper-3"
            >
              See the {page.engineName} spec sheet
            </Link>
          </div>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <h2 className="text-[1.75rem] font-medium tracking-tight text-foreground md:text-[2rem]">
            What is {page.topic}?
          </h2>
          <SentencePara className="mt-4 text-base leading-relaxed text-ink-2 md:text-lg">
            {page.whatIsIt}
          </SentencePara>

          <h2 className="mt-12 text-[1.5rem] font-medium tracking-tight text-foreground md:text-[1.75rem]">
            Who is it for?
          </h2>
          <SentencePara className="mt-3 text-base leading-relaxed text-ink-2">
            {page.whoIsItFor}
          </SentencePara>

          <h2 className="mt-12 text-[1.5rem] font-medium tracking-tight text-foreground md:text-[1.75rem]">
            What does it replace?
          </h2>
          <SentencePara className="mt-3 text-base leading-relaxed text-ink-2">
            {page.whatItReplaces}
          </SentencePara>

          <h2 className="mt-12 text-[1.5rem] font-medium tracking-tight text-foreground md:text-[1.75rem]">
            What inputs does it need?
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-2">
            {page.inputs.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <h2 className="mt-12 text-[1.5rem] font-medium tracking-tight text-foreground md:text-[1.75rem]">
            What does the system output?
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-2">
            {page.outputs.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <h2 className="mt-12 text-[1.5rem] font-medium tracking-tight text-foreground md:text-[1.75rem]">
            How much does it cost?
          </h2>
          <SentencePara className="mt-3 text-base leading-relaxed text-ink-2">
            The {engine.name} price band runs from A$
            {engine.priceFrom.toLocaleString("en-AU")} to A$
            {engine.priceTo.toLocaleString("en-AU")} AUD, GST exclusive unless
            stated, scoped in the Control Centre. See the{" "}
            <Link
              href="/pricing"
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              full pricing schedule
            </Link>{" "}
            for tiered detail.
          </SentencePara>

          <h2 className="mt-12 text-[1.5rem] font-medium tracking-tight text-foreground md:text-[1.75rem]">
            What tools can it integrate with?
          </h2>
          <SentencePara className="mt-3 text-base leading-relaxed text-ink-2">
            {page.integrations}
          </SentencePara>

          <h2 className="mt-12 text-[1.5rem] font-medium tracking-tight text-foreground md:text-[1.75rem]">
            What should not be automated?
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-2">
            {page.exclusions.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-3">
            See{" "}
            <Link
              href="/what-we-dont-do"
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              what we don&apos;t do
            </Link>{" "}
            for the full exclusion list.
          </p>

          <h2 className="mt-12 text-[1.5rem] font-medium tracking-tight text-foreground md:text-[1.75rem]">
            How Engine Labs builds it
          </h2>
          <SentencePara className="mt-3 text-base leading-relaxed text-ink-2">
            {page.buildProcess} The full six-step Build → Run loop is on{" "}
            <Link
              href="/methodology"
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              the methodology page
            </Link>
            .
          </SentencePara>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-[1.75rem] font-medium tracking-tight text-foreground md:text-[2rem]">
            Questions about {page.topic}.
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
            Brief {page.topic} in the Control Centre.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-2 md:text-lg">
            Read the{" "}
            <Link
              href={`/engines/${engine.slug}`}
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              {page.engineName} spec sheet
            </Link>{" "}
            for the full scope, the{" "}
            <Link
              href="/pricing"
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              pricing schedule
            </Link>{" "}
            for tiered detail, or open the{" "}
            <Link
              href="/control-centre"
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              Control Centre
            </Link>{" "}
            to brief it directly.
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
              Browse the Engine catalog
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(
          [{ name: page.h1, path: `/${page.slug}` }],
          siteUrl,
        )}
      />
      <JsonLd data={faqPageSchema(faqItems, pageUrl)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": engineServiceId(engine.slug, siteUrl),
          name: page.h1,
          alternateName: engine.name,
          description: page.summary,
          serviceType: engine.stackTiers.join(", "),
          category: "AI build studio",
          url: pageUrl,
          provider: organizationRef(siteUrl),
          areaServed: { "@type": "Country", name: "Australia" },
          audience: {
            "@type": "BusinessAudience",
            name: "Small businesses, agencies and founder-led teams",
          },
          mainEntityOfPage: pageUrl,
        }}
      />
    </>
  );
}
