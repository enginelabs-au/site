import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionSection from "@/app/_components/MotionSection";
import BuiltOnStrip from "@/app/_components/BuiltOnStrip";
import { SentencePara } from "@/app/_components/typography";
import {
  JsonLd,
  breadcrumbSchema,
  personCamSchema,
} from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

export const metadata: Metadata = {
  title: "About Engine Labs — one operator, one catalog",
  description:
    "One-operator AI build studio in Sydney, NSW. Why this lane. What “one operator” does and doesn't mean.",
};

export default function AboutPage() {
  const siteUrl = getSiteUrl();
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-3xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">About Engine Labs</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            One operator. One company.{" "}
            <span className="text-brand">One catalog.</span>
          </h1>
          <SentencePara className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            Engine Labs is a one-operator AI build studio in Sydney, NSW,
            run by Cam Douglas as a sole trader (ABN 13 141 459 638). The
            contracts, the Control Centre, the Engines and the support all
            come from one accountable person — no account-manager layer.
          </SentencePara>
        </div>
      </section>

      <MotionSection>
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="prose">
            <h2 id="who">Who is behind Engine Labs?</h2>
            <SentencePara>
              Cam Douglas. Sole trader, based in Sydney, NSW, Australia.
              Operating as Engine Labs (ABN 13 141 459 638). Public contact{" "}
              <a href="mailto:hello@enginelabs.com.au">
                hello@enginelabs.com.au
              </a>
              .
            </SentencePara>

            <h2>Why one operator</h2>
            <SentencePara>
              Most agency-shaped firms answer to overhead first and clients
              second. A staffed studio has to keep eight people billable.
              Engine Labs has to keep one person honest.
            </SentencePara>
            <SentencePara>
              The price points work because the overhead is one person, one
              laptop, one contract pack and a tightly productised service
              menu. The Control Centre exists in part to make sure that
              overhead stays low — every brief gets a draft scope before any
              human time is spent.
            </SentencePara>
            <SentencePara>
              For clients, this means a direct line to the person doing the
              work, with no telephone game. It also means the work is gated to
              scopes a one-operator studio can actually finish: productised
              Engines, fixed scope, fixed price, weekly checkpoints, defect-fix
              period, then opt-in support.
            </SentencePara>

            <h2>Who we build for</h2>
            <SentencePara>
              We are a Sydney-based product build studio focused on agentic
              workflows for small businesses, agencies and founder-led teams.
              The catalog is the kind of work we have been quietly retiring for
              years — drafted replies, weekly written reads, supplier paperwork,
              candidate intake, MVPs — now productised with published spec sheets
              and fixed AUD pricing.
            </SentencePara>
            <SentencePara>
              Engine Labs sits in this lane — labour
              replacement for SMBs — and stays out of regulated decision systems,
              mission-critical infrastructure, and enterprise compliance work.
              That is where a one-operator studio has the highest leverage and
              the lowest risk of overpromising.
            </SentencePara>
            <SentencePara>
              The long view is to keep the Control Centre, the spec sheets and
              the contract pack tight enough that the business stays one-operator
              for as long as possible. Growth is the Lab — public builds, not
              headcount.
            </SentencePara>

            <h2>What “one operator” doesn't mean</h2>
            <SentencePara>
              <strong>We work with named subcontractors and tool vendors.</strong>{" "}
              Engine Labs is the firm a client engages; the SOW names any
              subcontractor before they touch the work. The list is short and the
              same names appear repeatedly.
            </SentencePara>
            <SentencePara>
              <strong>Confidentiality is contractual.</strong> Client work stays
              confidential unless explicitly disclosed. The Lab posts are synthetic
              builds Engine Labs fully owns — never client work in disguise.
            </SentencePara>

            <h2>The boilerplate</h2>
            <p>
              <em>An agentic company, building agentic companies.</em>
            </p>
            <SentencePara>
              Engine Labs is a one-operator AI build studio. We design and ship
              Engines — small, productised AI workflows, agents and internal tools
              — that retire repeatable work inside small businesses, agencies and
              founder-led teams. Every build comes with a fixed scope, a fixed
              price, a published spec sheet and a clean handover. No retainers
              required, no enterprise theatre, no promises we can&apos;t back up in
              a contract.
            </SentencePara>
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

      <BuiltOnStrip variant="compact" />

      <section className="border-t border-border bg-paper-2">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-xs leading-relaxed text-ink-3">
            Engine Labs is an Australian sole trader trading as Cam Douglas
            (ABN 13 141 459 638), governed by the laws of New South Wales.
            Public contact: hello@enginelabs.com.au.
          </p>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([{ name: "About", path: "/about" }], siteUrl)}
      />
      <JsonLd data={personCamSchema(siteUrl)} />
    </>
  );
}
