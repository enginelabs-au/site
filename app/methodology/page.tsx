import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionSection from "@/app/_components/MotionSection";
import { SentencePara } from "@/app/_components/typography";
import {
  JsonLd,
  breadcrumbSchema,
  howToSchema,
  type HowToStep,
} from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

export const metadata: Metadata = {
  title: "How Engine Labs works — methodology and downloads",
  description:
    "Intake, scope, build, acceptance, handover. Every checklist published. CC-licensed for your reuse.",
};

const STEPS: HowToStep[] = [
  {
    name: "Brief",
    text: "Use the Control Centre. Two to four minutes. You get a recommendation and a draft Statement Of Work (SOW). Briefs that fall inside our exclusion list are politely declined and we explain why.",
  },
  {
    name: "Scope",
    text: "We review the draft, refine it, and send a final SOW with a fixed price for in-scope work. Larger or ambiguous briefs start with a paid scoping workshop credited against the final fee.",
  },
  {
    name: "Build",
    text: "Weekly checkpoints. Your access stays your access — we work in your tools where possible. No surprises, no big-bang reveals.",
  },
  {
    name: "Acceptance",
    text: "Tested against the acceptance criteria written into the SOW. No “is it done?” — there's a checklist.",
  },
  {
    name: "Handover",
    text: "Repo, credentials, prompts, run-book, known limitations. Yours to keep. The Engine runs in your tools, on your accounts, with your data.",
  },
  {
    name: "Run mode (optional)",
    text: "If you want us to keep an eye on it, you choose a Support plan (Basic Care, Standard Care, Priority Care). If not, you own it and we're available for Change Requests.",
  },
];

export default function MethodologyPage() {
  const siteUrl = getSiteUrl();
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-4xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">The methodology</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            How we work.{" "}
            <span className="text-brand">Take it, use it, copy it.</span>
          </h1>
          <SentencePara className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            Every Engine Labs build follows the same six steps in order:
            brief, scope, build, acceptance, handover, and an optional run
            mode. Cadence is weekly checkpoints during build, a defect-fix
            period (7–14 days) after acceptance, and opt-in Support after
            that. Process is not a moat — showing you how we work is faster
            than telling you we&apos;re good.
          </SentencePara>
        </div>
      </section>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-24">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            What are the six steps of the Build → Run loop?
          </h2>
          <p className="mt-4 text-base text-ink-2">
            One loop, six steps, same for every build.
          </p>
          <ol className="mt-10 overflow-hidden rounded-xl border border-border bg-paper">
            <div className="divide-y divide-border">
              {STEPS.map((step, i) => (
                <li
                  key={step.name}
                  id={`step-${i + 1}`}
                  className="scroll-mt-24 flex gap-5 px-6 py-6"
                >
                  <span className="font-mono text-xs text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {step.name}
                    </h3>
                    <SentencePara className="mt-1 text-sm leading-relaxed text-ink-2">
                      {step.text}
                    </SentencePara>
                  </div>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-24">
          <p className="eyebrow">Boundaries</p>
          <h2 className="mt-4 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.5rem]">
            What does this methodology not replace?
          </h2>
          <SentencePara className="mt-4 max-w-2xl text-base text-ink-2 md:text-lg">
            A real conversation with a lawyer or accountant. The six steps
            above describe how Engine Labs builds — they are not legal
            counsel, not a regulated compliance framework, and not a substitute
            for the contract pack (MSA, SOW, SLA and Addendum) we attach to
            every engagement.
          </SentencePara>
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

      <JsonLd
        data={breadcrumbSchema(
          [{ name: "Methodology", path: "/methodology" }],
          siteUrl,
        )}
      />
      <JsonLd
        data={howToSchema(
          {
            name: "The Engine Labs Build → Run loop",
            description:
              "Six-step productised methodology used on every Engine Labs build: brief, scope, build, acceptance, handover, run mode.",
            pagePath: "/methodology",
            steps: STEPS,
          },
          siteUrl,
        )}
      />
    </>
  );
}
