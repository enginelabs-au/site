import type { Metadata } from "next";
import MotionSection from "@/app/_components/MotionSection";

export const metadata: Metadata = {
  title: "Engine Labs terms of service",
  description:
    "Plain-English summary of the Master Services Agreement and contract pack. The MSA is the binding doc.",
};

export default function TermsPage() {
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-3xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">Terms</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Terms of service.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            The full Master Services Agreement is the binding document. This
            page is a plain-English summary of what's in it. If they differ,
            the MSA wins.
          </p>
          <p className="mt-4 text-xs text-ink-3">
            Not legal advice. Engine Labs is an Australian sole
            trader trading as Cam Douglas (ABN 13 141 459 638), governed by
            the laws of New South Wales.
          </p>
        </div>
      </section>

      <MotionSection>
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="prose">
            <h2>The contract pack</h2>
            <ul>
              <li>
                <strong>Master Services Agreement (MSA).</strong> The
                agreement that governs every build.
              </li>
              <li>
                <strong>Statement of Work (SOW).</strong> The per-project
                scope, price and milestones, attached to the MSA.
              </li>
              <li>
                <strong>Pricing & Package Schedule.</strong> The price
                reference document.
              </li>
              <li>
                <strong>AI, Data and Security Addendum.</strong> How your
                data is handled and what humans must approve.
              </li>
              <li>
                <strong>Support and Maintenance SLA Addendum.</strong>{" "}
                Applies only if your SOW includes a support plan.
              </li>
            </ul>

            <h2>IP ownership (R6, MSA §13)</h2>
            <p>
              You own the bespoke deliverables built specifically for you, on
              full payment. Engine Labs retains its templates, prompts and
              reusable patterns; you receive a perpetual licence to use them
              as part of your deliverable. Your data stays yours.
            </p>

            <h2>Liability</h2>
            <p>
              Liability is capped at the fees paid for the project under the
              relevant SOW. We disclaim consequential, indirect and
              loss-of-profit damages to the maximum extent permitted by
              Australian law.
            </p>

            <h2>Payment terms</h2>
            <p>
              Stripe AU. AUD. GST exclusive unless stated. Payment Links
              issued per milestone. Default deposit 30%; final payment due on
              acceptance. Builds over A$2,500 use milestone billing per the
              SOW.
            </p>

            <h2>Change requests (MSA §8)</h2>
            <p>
              Mid-build additions are scoped, priced and signed as Change
              Requests. The original SOW is unchanged unless explicitly
              amended.
            </p>

            <h2>Acceptance (MSA §9)</h2>
            <p>
              Each SOW lists acceptance criteria. Acceptance is a checklist,
              not a vibe. Defect-fix period of 7–14 days follows acceptance
              per SLA §2.
            </p>

            <h2>Termination</h2>
            <p>
              Either party can terminate for material breach with 14 days'
              written notice and an opportunity to cure. On termination, you
              receive a handover of work-to-date and pay for work completed
              up to the termination date.
            </p>

            <h2>Third-party tools (MSA §11, R8)</h2>
            <p>
              Your Engines run on third-party providers we don't control. If
              a model is deprecated, an API breaks, a price changes or a
              policy changes, we'll tell you and quote any rework. We don't
              promise uptime beyond what those providers offer.
            </p>

            <h2>What we don't do (R3, R4, R9)</h2>
            <p>
              No regulated decision systems, no mission-critical
              infrastructure, no SOC2 / ISO certification ownership, no
              scraping, no cold outreach. The full list is on{" "}
              <a href="/what-we-dont-do">/what-we-dont-do</a>.
            </p>

            <h2>Outcome guarantees (R1)</h2>
            <p>
              We don't promise revenue, leads, conversion rate, response time
              or AI accuracy figures. Anyone who does is making it up.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms and every SOW are governed by the laws of New South
              Wales, Australia, with exclusive jurisdiction in NSW courts.
            </p>

            <h2>Download the pack</h2>
            <p>
              The full contract pack is available on request via{" "}
              <a href="mailto:hello@enginelabs.com.au">
                hello@enginelabs.com.au
              </a>
              .
            </p>
            <p className="text-[0.92rem] text-ink-3">
              Engine Labs is an Australian sole trader trading as Cam Douglas
              (ABN 13 141 459 638), governed by the laws of New South Wales,
              Australia.
            </p>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
