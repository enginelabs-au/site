import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MotionSection from "@/app/_components/MotionSection";
import { COMPARE_PAGES } from "@/app/_lib/compare-pages";
import { JsonLd, breadcrumbSchema } from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

export const metadata: Metadata = {
  title: "Compare Engine Labs — VAs, Zapier, AI agencies",
  description:
    "Compare Engine Labs against hiring a VA, a Zapier consultant or a traditional AI automation agency, plus a neutral AI vs workflow automation explainer.",
  alternates: { canonical: "/compare" },
};

const SUMMARIES: Record<string, string> = {
  "engine-labs-vs-hiring-a-va":
    "A productised AI workflow build versus ongoing human admin hours. Use this if you are deciding between hiring a virtual assistant and building an Engine that drafts and routes the repeatable work.",
  "engine-labs-vs-zapier-consultant":
    "Productised AI Engines versus no-code connector consulting. Use this if your workflow needs AI drafting, RAG or classification on top of trigger-action logic.",
  "engine-labs-vs-ai-automation-agency":
    "A productised catalog with published bands versus open-scope agency engagements. Use this if you want a fixed scope, a fixed price and a documented six-step methodology.",
  "ai-automation-vs-workflow-automation":
    "A neutral explainer of the two layers — what each is best at, how they combine, and which Engine carries which weight.",
};

export default function CompareIndexPage() {
  const siteUrl = getSiteUrl();
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-4xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">Compare</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.5rem]">
            Compare Engine Labs.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            Four short, factual comparisons for buyers weighing Engine Labs
            against a virtual assistant, a Zapier consultant, a traditional
            AI automation agency, or the broader AI automation vs workflow
            automation question. Even-handed, no disparagement, no
            outcome promises.
          </p>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <ul className="space-y-3">
            {COMPARE_PAGES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/compare/${p.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-paper p-5 transition-colors hover:border-brand md:p-6"
                >
                  <div>
                    <h2 className="text-base font-semibold text-foreground md:text-lg">
                      {p.h1}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      {SUMMARIES[p.slug]}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>

      <JsonLd
        data={breadcrumbSchema(
          [{ name: "Compare", path: "/compare" }],
          siteUrl,
        )}
      />
    </>
  );
}
