import type { Metadata } from "next";
import EngineCard from "@/app/_components/EngineCard";
import MotionSection from "@/app/_components/MotionSection";
import { ENGINES } from "@/app/_lib/engines";

export const metadata: Metadata = {
  title: "The Engine Labs catalog — 8 productized Engines",
  description:
    "Sales, Ops, Support, Insight, Founder, Knowledge, Back-office and Outreach Engines. Starting prices in AUD. Scope in the Control Centre.",
};

export default function EnginesIndexPage() {
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">The catalog</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Eight Engines. <span className="text-brand">One catalog.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            Each Engine is a productized build with a published spec sheet, a
            starting price, and a real handover. Stack them if you need to —
            the Control Centre will tell you which combination fits your
            brief.
          </p>
        </div>
      </section>
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
    </>
  );
}
