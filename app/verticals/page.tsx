import type { Metadata } from "next";
import VerticalCard from "@/app/_components/VerticalCard";
import MotionSection from "@/app/_components/MotionSection";
import { SentencePara } from "@/app/_components/typography";
import { VERTICALS } from "@/app/_lib/engines";
import { JsonLd, breadcrumbSchema } from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

export const metadata: Metadata = {
  title: "Engine Labs for your business",
  description:
    "Six verticals: founders, agencies, trades, e-commerce, recruiters, coaches. The same Engines, a different stack.",
};

const NOT_FOR = [
  "Anyone needing regulated decision-making (legal, medical, financial, employment, credit, insurance, immigration, housing or safety).",
  "Mission-critical infrastructure where a failure has material legal, financial or safety consequence.",
  "Enterprise SOC2 / ISO / HIPAA compliance ownership, penetration testing or managed 24/7 hosting.",
  "Cold outreach on unconsented lists, scraping restricted platforms, or auto-send of customer-facing messages without human review.",
];

export default function VerticalsIndexPage() {
  const siteUrl = getSiteUrl();
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">Built for</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Six kinds of business{" "}
            <span className="text-brand">already asking us for this.</span>
          </h1>
          <SentencePara className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            Engine Labs builds the same eight productised Engines for six
            recurring business shapes: solo founders, marketing and creative
            agencies, trades and service businesses, e-commerce stores,
            recruiters, and coaches. The Engines are the same — the way they
            stack, the example briefs, and the integrations differ by who
            you are. Pick the closest fit, and the Control Centre will
            tailor a recommendation from there.
          </SentencePara>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-20">
          <div>
            <p className="eyebrow">Who this is for</p>
            <h2 className="mt-4 text-2xl font-medium tracking-tight text-foreground md:text-[1.75rem]">
              Who Engine Labs is for.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-ink-2 md:text-base">
              {VERTICALS.map((v) => (
                <li key={v.slug} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-3 h-px w-3 flex-none bg-rule-strong"
                  />
                  <span>
                    <strong className="font-semibold text-foreground">
                      {v.cardName.replace(/^For /, "")}
                    </strong>
                    {" — "}
                    {v.pain}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Who this is not for</p>
            <h2 className="mt-4 text-2xl font-medium tracking-tight text-foreground md:text-[1.75rem]">
              Who Engine Labs is not for.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-ink-2 md:text-base">
              {NOT_FOR.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-3 h-px w-3 flex-none bg-rule-strong"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MotionSection>

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

      <JsonLd
        data={breadcrumbSchema(
          [{ name: "Built for", path: "/verticals" }],
          siteUrl,
        )}
      />
    </>
  );
}
