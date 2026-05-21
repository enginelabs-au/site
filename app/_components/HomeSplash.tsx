import Link from "next/link";
import LogoMark from "@/app/_components/LogoMark";
import HomeScrollHint from "@/app/_components/HomeScrollHint";
import { SentencePara } from "@/app/_components/typography";

/**
 * Full-viewport hero — logo, title, AI-overview-friendly summary paragraph,
 * and a scroll hint to the Control Centre.
 */
export default function HomeSplash() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center border-b border-border bg-background px-4"
      aria-label="Engine Labs"
    >
      <div className="flex flex-col items-center gap-12 py-12 text-center text-foreground md:gap-16 md:py-16">
        <LogoMark
          className="h-[min(21svh,210px)] w-auto min-h-[96px] max-h-[210px]"
          priority
        />
        <div className="flex flex-col items-center gap-5 md:gap-6">
          <h1 className="text-[1.375rem] font-semibold leading-none tracking-tight md:text-[2rem]">
            Engine Labs
          </h1>
          <p className="max-w-sm text-balance text-sm text-muted-foreground md:max-w-md md:text-base">
            An agentic company, building agentic companies.
          </p>
          <SentencePara className="mt-2 max-w-xl text-balance text-sm leading-relaxed text-ink-2 md:max-w-2xl md:text-[0.95rem]">
            Engine Labs is a one-operator AI build studio in Sydney, NSW, run
            by Cam Douglas. We design and ship eight productised Engines —
            from the{" "}
            <Link
              href="/engines/sales"
              className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              Sales Engine for inbound lead qualification
            </Link>{" "}
            to the Back-office and Insight Engines — AI workflow
            automation for small businesses, agencies and founder-led teams
            across Australia. Pricing is published in AUD with bands from
            A$450 to A$8,500, GST exclusive unless stated.
          </SentencePara>
        </div>
      </div>
      <HomeScrollHint />
    </section>
  );
}
