import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FAQAccordion from "@/app/_components/FAQAccordion";
import { SentencePara } from "@/app/_components/typography";
import { HOMEPAGE_FAQ } from "@/app/_lib/faq";
import { JsonLd, faqPageSchema } from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

export default function HomeFaqSection() {
  const siteUrl = getSiteUrl();
  return (
    <section
      id="faq"
      aria-labelledby="home-faq-heading"
      className="scroll-mt-16 border-t border-border bg-background px-4 py-14 md:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">FAQ</p>
        <h2
          id="home-faq-heading"
          className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]"
        >
          Frequently asked questions.
        </h2>
        <SentencePara className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-2">
          The contracts answer all of these in more detail. These are the
          plain-English versions.
        </SentencePara>
        <div className="mt-8">
          <FAQAccordion items={HOMEPAGE_FAQ} idPrefix="home-faq" />
        </div>
        <Link
          href="/faq"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          See the full FAQ
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <JsonLd data={faqPageSchema(HOMEPAGE_FAQ, siteUrl + "/")} />
    </section>
  );
}
