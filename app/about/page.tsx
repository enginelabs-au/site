import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionSection from "@/app/_components/MotionSection";

export const metadata: Metadata = {
  title: "About Engine Labs — one operator, one catalog",
  description:
    "One-operator AI build studio. Why this lane. What “one operator” does and doesn't mean.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div aria-hidden className="subtle-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">About Engine Labs</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            One operator. One company.{" "}
            <span className="text-brand">One catalog.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            Engine Labs is a one-operator AI build studio. The contracts, the
            Control Centre, the Engines and the support all come from one
            accountable team — no account-manager layer.
          </p>
        </div>
      </section>

      <MotionSection>
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="prose">
            <h2>Why one operator</h2>
            <p>
              Most agency-shaped firms answer to overhead first and clients
              second. A staffed studio has to keep eight people billable.
              Engine Labs has to keep one person honest.
            </p>
            <p>
              The price points work because the overhead is one person, one
              laptop, one contract pack and a tightly productized service
              menu. The Control Centre exists in part to make sure that
              overhead stays low — every brief gets a draft scope before any
              human time is spent.
            </p>
            <p>
              For clients, this means a direct line to the person doing the
              work, with no telephone game. It also means the work is gated to
              scopes a one-operator studio can actually finish: productized
              Engines, fixed scope, fixed price, weekly checkpoints, defect-fix
              period, then opt-in support.
            </p>

            <h2>Who we are</h2>
            <p>
              We are a Sydney-based product build studio focused on agentic
              workflows for small businesses, agencies and founder-led teams.
              The catalog is the kind of work we have been quietly retiring for
              years — drafted replies, weekly written reads, supplier paperwork,
              candidate intake, MVPs — now productized with published spec sheets
              and fixed AUD pricing.
            </p>
            <p>
              Engine Labs sits in this lane — labour
              replacement for SMBs — and stays out of regulated decision systems,
              mission-critical infrastructure, and enterprise compliance work.
              That is where a one-operator studio has the highest leverage and
              the lowest risk of overpromising.
            </p>
            <p>
              The long view is to keep the Control Centre, the spec sheets and
              the contract pack tight enough that the business stays one-operator
              for as long as possible. Growth is the Lab — one build per week,
              public — not headcount.
            </p>

            <h2>What “one operator” doesn't mean</h2>
            <p>
              <strong>We work with named subcontractors and tool vendors.</strong>{" "}
              Engine Labs is the firm a client engages; the SOW names any
              subcontractor before they touch the work. The list is short and the
              same names appear repeatedly.
            </p>
            <p>
              <strong>Confidentiality is contractual.</strong> Client work stays
              confidential unless explicitly disclosed. The Lab posts are synthetic
              builds Engine Labs fully owns — never client work in disguise.
            </p>

            <h2>The boilerplate</h2>
            <p>
              <em>An agentic company, building agentic companies.</em>
            </p>
            <p>
              Engine Labs is a one-operator AI build studio. We design and ship
              Engines — small, productized AI workflows, agents and internal tools
              — that retire repeatable work inside small businesses, agencies and
              founder-led teams. Every build comes with a fixed scope, a fixed
              price, a published spec sheet and a clean handover. No retainers
              required, no enterprise theatre, no promises we can&apos;t back up in
              a contract.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href="mailto:hello@enginelabs.com.au"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Email us
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/control-centre"
              className="inline-flex items-center justify-center rounded-md border border-border bg-paper px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-rule-strong hover:bg-paper-3"
            >
              Open the Control Centre
            </Link>
          </div>
        </div>
      </MotionSection>

      <section className="border-t border-border bg-paper-2">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-xs leading-relaxed text-ink-3">
            Engine Labs is an Australian sole trader trading as Cam Douglas
            (ABN 13 141 459 638), governed by the laws of New South Wales.
            Public contact: hello@enginelabs.com.au.
          </p>
        </div>
      </section>
    </>
  );
}
