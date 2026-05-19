import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionSection from "@/app/_components/MotionSection";

export const metadata: Metadata = {
  title: "What Engine Labs doesn't do — and won't promise",
  description:
    "Regulated decisions, mission-critical infrastructure, SOC2, cold outreach, scraping. Out of scope. Here's why.",
};

const DONT_DO_LONG = [
  {
    headline:
      "We don't build systems that make legal, medical, financial, employment, credit, insurance, immigration, housing or safety decisions on behalf of humans.",
    body: "Those decisions need a regulated professional, not an agent. Drawn from MSA §3 and Addendum §5 — the contracts disclaim automated regulated decisions, full stop.",
    insteadLabel: "What we can do instead",
    instead:
      "Build the admin layer around regulated work — intake forms for a law firm, supplier paperwork for a clinic, candidate screening drafts for a recruiter to review.",
  },
  {
    headline:
      "We don't take on production-grade cyber security, penetration testing, SOC2 / ISO certification or regulated compliance ownership.",
    body: "MSA §3 explicitly excludes “senior software engineering consultancy, cyber security auditor, regulated engineering firm, enterprise architect, or compliance officer” from our role.",
    insteadLabel: "Where to go instead",
    instead:
      "Specialist firms (ASD-aligned consultancies, accredited SOC2 auditors). We can refer; we can't be them.",
  },
  {
    headline:
      "We don't build mission-critical infrastructure where a failure has material legal, financial or safety consequence.",
    body: "Pricing §5 lists this as out-of-scope. A one-operator studio cannot meet the redundancy, monitoring and incident-response posture mission-critical work requires.",
    insteadLabel: "Where to go instead",
    instead:
      "A senior engineering firm with on-call rotation and an SRE practice. We're happy to recommend names.",
  },
  {
    headline:
      "We don't scrape restricted platforms, extract data from sources that breach platform terms, or build mass-cold-outreach systems on unconsented lists.",
    body: "Addendum §5 and §7 plus ACMA spam rules. The Outreach Engine exists, but only on permissioned data — your CRM, your opted-in list, an existing business relationship.",
    insteadLabel: "What we can do instead",
    instead:
      "Build outreach Engines on top of consented contact lists, with throttling, unsubscribe handling and human review on the first batch.",
  },
  {
    headline:
      "We don't take on managed hosting, 24/7 monitoring, or enterprise DevOps.",
    body: "MSA §3 and Pricing §5. We're not a managed services provider. Engines run on your accounts, in your tools, on third-party providers we don't control (MSA §11).",
    insteadLabel: "Where to go instead",
    instead:
      "Managed services providers, or an in-house platform team. The handover pack documents the dependencies so you can decide where to put that capability.",
  },
];

const WONT_PROMISE_LONG = [
  {
    headline:
      "We won't promise a revenue lift, lead volume, conversion rate, response time or AI accuracy number.",
    body: "MSA §16 disclaims outcome guarantees explicitly. Anyone who does promise these is making it up.",
    instead:
      "We commit to: a fixed scope, a fixed price for in-scope work, a defect-fix period, and a documented handover. The outcome is yours to measure.",
  },
  {
    headline:
      "We won't promise uptime guarantees beyond what the underlying third-party tools offer.",
    body: "MSA §11. Your Engines run on OpenAI / Anthropic / Zapier / Slack / Stripe and the rest. We don't control them.",
    instead:
      "We document the dependencies on day one. If a provider drops a model or changes a price, we tell you and quote any rework.",
  },
  {
    headline: "We won't promise that an AI output will always be correct.",
    body: "Addendum §4. The human-review step is non-negotiable for anything that touches a customer, contract, account or person's record.",
    instead:
      "Drafts queued for one-click send. Confidence flags on extraction. Citations on knowledge answers. The human is in the loop where it matters.",
  },
  {
    headline: "We won't quote a fixed price for unclear scope.",
    body: "Pricing §7. Larger or ambiguous projects begin with a paid scoping workshop credited against the final fee.",
    instead:
      "Open the Control Centre, tell us what's slowing you down, and we'll either give you a band or recommend the workshop.",
  },
];

const REFERRALS = [
  {
    label: "SOC2 / regulated compliance",
    to: "an accredited auditor",
  },
  { label: "Penetration testing", to: "a CREST-registered Australian firm" },
  { label: "Lawyer", to: "your jurisdiction's law society referral service" },
  {
    label: "Financial / tax adviser",
    to: "a CA-ANZ or CPA Australia-registered practitioner",
  },
  {
    label: "Mission-critical SaaS engineering",
    to: "a senior product-engineering consultancy (we'll suggest one if you ask)",
  },
];

export default function WhatWeDontDoPage() {
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div aria-hidden className="subtle-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">Boundaries</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            What we don't do,{" "}
            <span className="text-brand">and what we won't promise.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            Most agencies hide this in the fine print. We put it on its own
            page. If your brief lands here, the Control Centre will say so
            and offer a referral.
          </p>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-24">
          <p className="eyebrow">Excluded scope</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            What we don't do.
          </h2>
          <div className="mt-10 space-y-5">
            {DONT_DO_LONG.map((item, i) => (
              <article
                key={i}
                className="rounded-xl border border-border bg-paper p-6 md:p-7"
              >
                <h3 className="text-base font-semibold leading-snug text-foreground md:text-lg">
                  {item.headline}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-2 md:text-base">
                  {item.body}
                </p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.06em] text-brand">
                    {item.insteadLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2 md:text-base">
                    {item.instead}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-24">
          <p className="eyebrow">No promises</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            What we won't promise.
          </h2>
          <div className="mt-10 space-y-5">
            {WONT_PROMISE_LONG.map((item, i) => (
              <article
                key={i}
                className="rounded-xl border border-border bg-paper p-6 md:p-7"
              >
                <h3 className="text-base font-semibold leading-snug text-foreground md:text-lg">
                  {item.headline}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-2 md:text-base">
                  {item.body}
                </p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.06em] text-brand">
                    What we will commit to
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2 md:text-base">
                    {item.instead}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-24">
          <p className="eyebrow">Why</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Why we publish this.
          </h2>
          <div className="prose mt-6">
            <p>
              Showing the boundaries closes faster than puffy claims. For a
              senior buyer making a A$3,500–A$8,500 decision, explicit
              exclusions are a trust accelerator, not a deterrent.
            </p>
            <p>
              The language on this page is drawn directly from the contract
              pack — MSA §3, §16, Addendum §5, Pricing §5–§7. There is no
              version of these statements that sales-friendly copy can
              soften without breaking the contract underneath.
            </p>
            <p>
              If your brief looks like one of these categories, we'll decline
              politely and tell you where to go. You'll get the explanation
              in plain English, not a vague “not a fit”.
            </p>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-24">
          <p className="eyebrow">Referrals</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Where to go instead.
          </h2>
          <p className="mt-4 text-base text-ink-2">
            Generic recommendations only — we don't take kickbacks, and we
            don't have any formal referral arrangements.
          </p>
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-paper">
            <ul className="divide-y divide-border">
              {REFERRALS.map((r) => (
                <li key={r.label} className="px-6 py-5">
                  <p className="text-base font-semibold text-foreground">
                    {r.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{r.to}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MotionSection>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="eyebrow">Get started</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Use the Control Centre anyway — we might still be the right fit.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-2 md:text-lg">
            Most briefs we see have one regulated layer wrapped around a
            perfectly buildable admin layer. The Control Centre will tell
            you which is which.
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
