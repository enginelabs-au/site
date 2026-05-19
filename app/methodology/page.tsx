import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import MotionSection from "@/app/_components/MotionSection";

export const metadata: Metadata = {
  title: "How Engine Labs works — methodology and downloads",
  description:
    "Intake, scope, build, acceptance, handover. Every checklist published. CC-licensed for your reuse.",
};

const STEPS = [
  {
    title: "Brief",
    body: "Use the Control Centre. Two to four minutes. You get a recommendation and a draft Statement Of Work (SOW). Briefs that fall inside our exclusion list are politely declined and we explain why.",
  },
  {
    title: "Scope",
    body: "We review the draft, refine it, and send a final SOW with a fixed price for in-scope work. Larger or ambiguous briefs start with a paid scoping workshop credited against the final fee.",
  },
  {
    title: "Build",
    body: "Weekly checkpoints. Your access stays your access — we work in your tools where possible. No surprises, no big-bang reveals.",
  },
  {
    title: "Acceptance",
    body: "Tested against the acceptance criteria written into the SOW. No “is it done?” — there's a checklist.",
  },
  {
    title: "Handover",
    body: "Repo, credentials, prompts, run-book, known limitations. Yours to keep. The Engine runs in your tools, on your accounts, with your data.",
  },
  {
    title: "Run mode (optional)",
    body: "If you want us to keep an eye on it, you choose a Support plan (Basic Care, Standard Care, Priority Care). If not, you own it and we're available for Change Requests.",
  },
];

const ARTEFACTS = [
  {
    name: "Client Intake Questionnaire",
    desc: "The questions every brief eventually has to answer. Use it to pre-empt the Control Centre's clarifying turns.",
    handover: "Handover Pack §1",
  },
  {
    name: "Scope Confirmation Checklist",
    desc: "What goes into a SOW so a fixed-price quote actually holds.",
    handover: "Handover Pack §2",
  },
  {
    name: "Access & Credential Checklist",
    desc: "How we collect, use and rotate the credentials you give us — and how you take them back.",
    handover: "Handover Pack §3",
  },
  {
    name: "Acceptance Form template",
    desc: "What the client signs when the build matches the SOW.",
    handover: "Handover Pack §5",
  },
  {
    name: "Handover Checklist",
    desc: "Everything you receive when a build ends.",
    handover: "Handover Pack §6",
  },
  {
    name: "Sample SOW",
    desc: "A fully filled-out SOW with a fictional client. The format is the same one our Control Centre drafts.",
    handover: "Sample",
  },
  {
    name: "Sample Change Request",
    desc: "How a scope change is priced and signed without re-doing the whole SOW.",
    handover: "Sample",
  },
  {
    name: "Sample Production Sign-off",
    desc: "What we ask before anything you build with us is allowed to send to a customer.",
    handover: "Addendum §11",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-4xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">The methodology</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            How we work.{" "}
            <span className="text-brand">Take it, use it, copy it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            Process is not a moat. Showing you how we work is faster than
            telling you we're good.
          </p>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-24">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            The Build → Run loop.
          </h2>
          <p className="mt-4 text-base text-ink-2">
            One loop, six steps, same for every build.
          </p>
          <ol className="mt-10 overflow-hidden rounded-xl border border-border bg-paper">
            <div className="divide-y divide-border">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-5 px-6 py-6">
                  <span className="font-mono text-xs text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div id="downloads" className="mx-auto max-w-5xl px-4 py-20 md:py-24">
          <p className="eyebrow">Artefacts</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            Downloadable artefacts.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-2">
            CC-licensed for reuse with attribution. Each PDF carries the line:{" "}
            <em>
              “Adapted from the Engine Labs contract pack. Not legal advice.”
            </em>
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {ARTEFACTS.map((a) => (
              <div
                key={a.name}
                className="flex flex-col gap-3 rounded-xl border border-border bg-paper p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      {a.name}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.06em] text-ink-3">
                      {a.handover}
                    </p>
                  </div>
                  <span className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-paper-3 px-2 text-xs text-ink-3">
                    <Download className="h-3 w-3" />
                    PDF · stub
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-ink-2">{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-ink-3">
            PDF downloads are not attached yet — descriptions match the contract
            pack. See{" "}
            <Link
              href="/lab/building-the-control-centre-that-built-itself"
              className="text-foreground underline underline-offset-4 decoration-1 hover:text-brand"
            >
              the Lab case study
            </Link>{" "}
            for what shipped in the first build.
          </p>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-24">
          <p className="eyebrow">Boundaries</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            What this doesn't replace.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-2 md:text-lg">
            A real conversation with a lawyer or accountant. These are working
            artefacts, not legal counsel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/control-centre"
              className="group/cta inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Use the Control Centre
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
            <Link
              href="/engines"
              className="inline-flex items-center justify-center rounded-md border border-border bg-paper px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-rule-strong hover:bg-paper-3"
            >
              See the Engine catalog
            </Link>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
