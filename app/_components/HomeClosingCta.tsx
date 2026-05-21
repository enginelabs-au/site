import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { SentencePara } from "@/app/_components/typography";

/**
 * Closing CTA band — inverse card; colours follow light/dark via paper-inverse tokens.
 */
export default function HomeClosingCta() {
  return (
    <section
      className="scroll-mt-16 border-t border-section-cta-border bg-section-cta px-4 py-14 md:py-20"
      aria-labelledby="closing-cta-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-paper-inverse-rule bg-paper-inverse px-6 py-12 text-center text-paper-inverse-fg shadow-lg md:px-12 md:py-14">
          <p
            className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Get started
          </p>
          <h2
            id="closing-cta-heading"
            className="mt-4 text-balance text-2xl font-semibold tracking-tight md:text-[2rem]"
          >
            Ready to engineer the work instead of hiring for it?
          </h2>
          <SentencePara className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-relaxed text-paper-inverse-fg-muted">
            Open the Control Centre. Describe what&apos;s slowing you down — we&apos;ll
            recommend an Engine, outline a starting scope, and send a price band.
          </SentencePara>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/control-centre" className="btn-primary">
              <Calendar className="h-4 w-4" aria-hidden />
              Open the Control Centre
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p className="mt-10 text-[0.72rem] leading-relaxed text-paper-inverse-fg-muted">
            Engine Labs · An agentic company, building agentic companies.
          </p>
        </div>
      </div>
    </section>
  );
}
