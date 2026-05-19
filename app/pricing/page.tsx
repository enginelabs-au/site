import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionSection from "@/app/_components/MotionSection";
import PriceBand from "@/app/_components/PriceBand";
import PricingAmount, { PricingAmountFrom } from "@/app/_components/PricingAmount";
import HomePricingTable from "@/app/_components/HomePricingTable";
import { ENGINES } from "@/app/_lib/engines";

export const metadata: Metadata = {
  title: "Engine Labs pricing — starting prices",
  description:
    "Four tiers — Basic, Standard, Premium, Custom. Every Engine priced from a published band. Scoping workshop for ambiguous briefs.",
};

const TIERS = [
  {
    name: "Basic",
    suits: "One Engine, single source/channel, single tool, narrow scope.",
    fromAud: 450,
    notes: "Fixed-price for genuinely narrow scopes.",
  },
  {
    name: "Standard",
    suits: "One Engine with multiple sources or integrations, or a focused stack.",
    fromAud: 1200,
    notes: "Most Sales / Support / Ops / Knowledge briefs land here.",
  },
  {
    name: "Premium",
    suits: "Multi-source, multi-integration, custom tone or workflow library.",
    fromAud: 3500,
    notes: "Includes documentation and accuracy benchmarks.",
  },
  {
    name: "Custom",
    suits: "Stacked Engines, ambiguous scope, larger MVPs, integration-heavy builds.",
    fromAud: null as number | null,
    notes: "Workshop fee is credited against the final fee if you proceed.",
  },
];

const SUPPORT_PLANS = [
  {
    name: "Basic Care",
    targetResponse: "Next business day (Sydney, Mon–Fri)",
    fromAud: 300,
    notes: "Defect fixes and small Change Requests, capped hours per month.",
  },
  {
    name: "Standard Care",
    targetResponse: "Within 4 business hours (Sydney, Mon–Fri)",
    fromAud: 650,
    notes: "Includes monthly health-check and one tool-change rework per quarter.",
  },
  {
    name: "Priority Care",
    targetResponse: "Within 1 business hour (Sydney, Mon–Fri)",
    fromAud: 1200,
    notes:
      "For Engines that touch revenue daily. Targets, not resolution guarantees (SLA §1).",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div aria-hidden className="subtle-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Starting prices.{" "}
            <span className="text-brand">GST exclusive unless stated.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            Every Engine is priced from a published band. That&apos;s the starting
            tier for narrow, clearly accepted scope. Larger or unclear projects begin
            with a paid scoping workshop.
          </p>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-20 md:py-24">
          <p className="eyebrow">The four tiers</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Four shapes of brief.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className="flex h-full flex-col gap-3 rounded-xl border border-border bg-paper p-6"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {t.name}
                </h3>
                <p className="text-sm leading-relaxed text-ink-2">{t.suits}</p>
                <div className="mt-2 text-sm">
                  <div className="font-medium text-foreground">
                    {t.fromAud != null ? (
                      <PricingAmountFrom amountAud={t.fromAud} />
                    ) : (
                      "Starts with a paid scoping workshop"
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-3">
                    scoped in the Control Centre
                  </div>
                </div>
                <p className="mt-auto pt-2 text-xs text-ink-3">{t.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-20 md:py-24">
          <p className="eyebrow">Per-Engine bands</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Per-Engine price bands.
          </h2>
          <p className="mt-4 text-base text-ink-2">
            All starting prices are scoped in the Control Centre. Use the currency selector on the table to view indicative conversions.
          </p>
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-paper">
            <table className="w-full text-sm">
              <thead className="bg-paper-3 text-xs uppercase tracking-[0.06em] text-ink-3">
                <tr>
                  <th className="px-5 py-3.5 text-left font-semibold">
                    Engine
                  </th>
                  <th className="px-5 py-3.5 text-left font-semibold">
                    Replaces
                  </th>
                  <th className="px-5 py-3.5 text-left font-semibold">
                    Price band
                  </th>
                  <th className="px-5 py-3.5 text-left font-semibold">
                    Timeline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ENGINES.map((e) => (
                  <tr key={e.slug}>
                    <td className="px-5 py-5">
                      <Link
                        href={`/engines/${e.slug}`}
                        className="font-medium text-foreground transition-colors hover:text-brand"
                      >
                        {e.name}
                      </Link>
                      {e.priceNote ? (
                        <p className="mt-1 text-xs text-ink-3">{e.priceNote}</p>
                      ) : null}
                    </td>
                    <td className="px-5 py-5 text-ink-2">{e.replaces}</td>
                    <td className="px-5 py-5">
                      <PriceBand
                        from={e.priceFrom}
                        to={e.priceTo}
                        variant="inline"
                      />
                    </td>
                    <td className="px-5 py-5 text-sm text-ink-3">
                      {e.timeline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-20 md:py-24">
          <p className="eyebrow">Workshop</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Paid scoping workshop.
          </h2>
          <p className="mt-4 max-w-3xl text-base text-ink-2 md:text-lg">
            For stacked, ambiguous or larger builds. A 60–90 minute structured
            workshop with us, a written one-page recommendation, and a
            custom Statement Of Work (SOW). The workshop fee is credited against the final fee
            if you proceed.
          </p>
          <div className="mt-7 inline-flex flex-wrap items-center gap-3 rounded-xl border border-border bg-paper px-5 py-4 text-sm">
            <span className="text-ink-3">Workshop</span>
            <span className="font-medium text-foreground"><PricingAmountFrom amountAud={750} /></span>
            <span className="text-ink-3">·</span>
            <span className="text-ink-3">credited if you proceed</span>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-20 md:py-24">
          <p className="eyebrow">Support</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Support plans (separate, opt-in).
          </h2>
          <p className="mt-4 max-w-3xl text-base text-ink-2">
            Support is not bundled with builds. After the included defect-fix
            period (7–14 days, SLA §2) you choose whether to opt in. Response
            targets below are targets, not resolution guarantees.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {SUPPORT_PLANS.map((p) => (
              <div
                key={p.name}
                className="flex h-full flex-col gap-3 rounded-xl border border-border bg-paper p-6"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {p.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.06em] text-ink-3">
                  Response target
                </p>
                <p className="text-sm text-foreground">{p.targetResponse}</p>
                <p className="text-sm font-medium text-foreground"><PricingAmountFrom amountAud={p.fromAud} /> / month</p>
                <p className="mt-auto pt-2 text-xs leading-relaxed text-ink-3">
                  {p.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-20 md:py-24 md:grid-cols-2">
          <div>
            <p className="eyebrow">Always</p>
            <h2 className="mt-4 text-2xl font-medium tracking-tight text-foreground md:text-[1.75rem]">
              What's always included.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-ink-2 md:text-base">
              <li>Handover pack: repo, credentials, prompts, run-book.</li>
              <li>Defect-fix period (7–14 days per SLA §2).</li>
              <li>Documented dependency list.</li>
              <li>One scoping conversation with us before sign.</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Never</p>
            <h2 className="mt-4 text-2xl font-medium tracking-tight text-foreground md:text-[1.75rem]">
              What's never included by default.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-ink-2 md:text-base">
              <li>Managed hosting or 24/7 monitoring (R4).</li>
              <li>Third-party tool subscriptions (you pay your providers).</li>
              <li>
                Regulated compliance work (SOC2 / ISO / HIPAA / penetration
                testing).
              </li>
              <li>
                Outcome guarantees on revenue, leads, conversion or accuracy
                (R1).
              </li>
            </ul>
          </div>
        </div>
      </MotionSection>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="eyebrow">Get started</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Get my starting price in the Control Centre.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-2 md:text-lg">
            GST exclusive unless stated. Base prices are in AUD; use the currency
            selector to view indicative conversions.
            Third-party tool subscriptions (AI providers, integrations,
            hosting) are billed to you directly.
          </p>
          <Link
            href="/control-centre"
            className="group/cta mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
          >
            Open the Control Centre
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
