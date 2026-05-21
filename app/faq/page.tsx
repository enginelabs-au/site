import type { Metadata } from "next";
import FAQAccordion from "@/app/_components/FAQAccordion";
import MotionSection from "@/app/_components/MotionSection";
import { SentencePara } from "@/app/_components/typography";
import { FULL_FAQ } from "@/app/_lib/faq";
import {
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  slugify,
} from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

export const metadata: Metadata = {
  title: "Engine Labs FAQ — the contract questions, answered",
  description:
    "IP, pricing, third-party tools, AI review, data, support, what we decline. Plain English.",
};

export default function FAQPage() {
  const siteUrl = getSiteUrl();
  const allItems = FULL_FAQ.flatMap((group) => group.items);
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-4xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">FAQ</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Frequently asked questions.
          </h1>
          <SentencePara className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            Engagement, AI and human review, data and privacy, pricing,
            IP and ownership, support, and the boundaries of what Engine
            Labs builds. The contracts answer all of these in more detail;
            these are the plain-English versions.
          </SentencePara>
        </div>
      </section>

      <MotionSection>
        <div className="mx-auto max-w-4xl px-4 py-20">
          <div className="space-y-14">
            {FULL_FAQ.map((group) => (
              <section
                key={group.heading}
                id={`group-${slugify(group.heading)}`}
                className="scroll-mt-24"
              >
                <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
                  {group.heading}
                </h2>
                <div className="mt-4">
                  <FAQAccordion
                    items={group.items}
                    idPrefix={`faq-${slugify(group.heading)}`}
                  />
                </div>
              </section>
            ))}
          </div>
        </div>
      </MotionSection>

      <JsonLd
        data={breadcrumbSchema([{ name: "FAQ", path: "/faq" }], siteUrl)}
      />
      <JsonLd data={faqPageSchema(allItems, `${siteUrl}/faq`)} />
    </>
  );
}
