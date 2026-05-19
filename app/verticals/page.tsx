import type { Metadata } from "next";
import VerticalCard from "@/app/_components/VerticalCard";
import MotionSection from "@/app/_components/MotionSection";
import { VERTICALS } from "@/app/_lib/engines";

export const metadata: Metadata = {
  title: "Engine Labs for your business",
  description:
    "Six verticals: founders, agencies, trades, e-commerce, recruiters, coaches. The same Engines, a different stack.",
};

export default function VerticalsIndexPage() {
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">Built for</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Six kinds of business{" "}
            <span className="text-brand">already asking us for this.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            The Engines are the same. The way they stack, the example briefs
            and the integrations differ by who you are. Pick the closest fit —
            the Control Centre will tailor from there.
          </p>
        </div>
      </section>
      <MotionSection>
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <div className="overflow-hidden rounded-xl border border-border bg-paper">
            <div className="divide-y divide-border">
              {VERTICALS.map((v) => (
                <VerticalCard key={v.slug} vertical={v} />
              ))}
            </div>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
