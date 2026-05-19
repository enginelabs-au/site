import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import EnginesHomeList from "@/app/_components/EnginesHomeList";
import HomePricingTable from "@/app/_components/HomePricingTable";
import { VERTICALS } from "@/app/_lib/engines";

type SectionTone = "engines" | "methodology" | "pricing";

const SECTION_SHELL: Record<
  SectionTone,
  { bg: string; border: string; fg: string; muted: string }
> = {
  engines: {
    bg: "bg-section-engines",
    border: "border-section-engines-border",
    fg: "text-section-engines-fg",
    muted: "text-section-engines-fg-muted",
  },
  methodology: {
    bg: "bg-section-methodology",
    border: "border-section-methodology-border",
    fg: "text-section-methodology-fg",
    muted: "text-section-methodology-fg-muted",
  },
  pricing: {
    bg: "bg-section-pricing",
    border: "border-section-pricing-border",
    fg: "text-section-pricing-fg",
    muted: "text-section-pricing-fg-muted",
  },
};

/**
 * Homepage sections below the brief panel. Each band uses a distinct section tone.
 */
export default function HomeRepoReadme() {
  return (
    <div aria-label="Engine Labs overview">
      <SectionShell id="engines" tone="engines">
        <SectionEngines />
      </SectionShell>
      <SectionShell id="who-we-build-for" tone="engines">
        <SectionWhoWeBuildFor />
      </SectionShell>
      <SectionShell id="methodology" tone="methodology">
        <SectionMethodology />
      </SectionShell>
      <SectionShell id="pricing" tone="pricing">
        <SectionPricing />
      </SectionShell>
    </div>
  );
}

function SectionShell({
  id,
  tone,
  children,
}: {
  id?: string;
  tone: SectionTone;
  children: ReactNode;
}) {
  const shell = SECTION_SHELL[tone];
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-t px-4 py-14 md:py-20 ${shell.bg} ${shell.border} ${shell.fg}`}
    >
      <div className="mx-auto min-w-0 max-w-3xl">{children}</div>
    </section>
  );
}

function SectionHeading({
  title,
  subtitle,
  mutedClass,
  children,
}: {
  title: string;
  subtitle: string;
  mutedClass: string;
  children?: ReactNode;
}) {
  return (
    <header>
      <h2 className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">{title}</h2>
      <p className={`mt-3 max-w-2xl text-[0.95rem] leading-relaxed ${mutedClass}`}>{subtitle}</p>
      {children}
    </header>
  );
}

function SectionEngines() {
  const shell = SECTION_SHELL.engines;
  return (
    <article>
      <SectionHeading
        title="Eight Engines. Productised. Priced."
        subtitle="Specialised AI systems you can deploy standalone or stack — each with a published spec sheet, a starting price, and a real handover."
        mutedClass={shell.muted}
      >
        <Link
          href="/engines"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          See the full catalog
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </SectionHeading>
      <EnginesHomeList />
    </article>
  );
}

function SectionWhoWeBuildFor() {
  const shell = SECTION_SHELL.engines;
  return (
    <article>
      <SectionHeading
        title="Six kinds of business already asking for this."
        subtitle="The Engines are the same. The way they stack, the example briefs and the integrations differ by who you are. Pick the closest fit — the Control Centre will tailor from there."
        mutedClass={shell.muted}
      >
        <Link
          href="/verticals"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          See all verticals
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </SectionHeading>
      <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {VERTICALS.map((v) => (
          <li key={v.slug}>
            <Link
              href={`/verticals/${v.slug}`}
              className="flex items-center justify-between gap-3 rounded-md border border-section-engines-surface-border bg-section-engines-surface px-3 py-2.5 text-sm shadow-sm transition-colors hover:border-brand"
            >
              <span className="font-medium text-section-engines-fg">{v.cardName}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-section-engines-fg-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SectionMethodology() {
  const shell = SECTION_SHELL.methodology;
  return (
    <article>
      <SectionHeading
        title="Brief, scope, build, hand over."
        subtitle="One loop, six steps. No mystery discovery phase — you brief it, we scope it, we build it, you accept it, you get the handover, and you choose whether we stay on to run it."
        mutedClass={shell.muted}
      />

      <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {METHODOLOGY_STEPS.map((step, i) => (
          <li
            key={step.title}
            className="rounded-lg border border-section-methodology-card-border bg-section-methodology-card px-4 py-4 text-section-methodology-card-fg"
          >
            <span className="text-xs font-medium text-section-methodology-card-muted">
              Step {i + 1}
            </span>
            <h3 className="mt-1 text-sm font-semibold">{step.title}</h3>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-section-methodology-card-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10 border-t border-section-methodology-border pt-10">
        <h3 className="text-base font-semibold">The same Addendum, on every build.</h3>
        <p className={`mt-2 max-w-2xl text-[0.9rem] leading-relaxed ${shell.muted}`}>
          Every Statement Of Work we sign attaches the AI, Data and Security Addendum. Four data
          classes. Human approval before any customer-facing send. Third-party tools you own and
          can audit.
        </p>
        <Link
          href="/methodology"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          Read the methodology
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function SectionPricing() {
  const shell = SECTION_SHELL.pricing;
  return (
    <article>
      <SectionHeading
        title="Starting prices. Visible."
        subtitle="Every Engine is priced from a published band for a narrow, clearly accepted scope. Larger or ambiguous projects start with a paid scoping workshop and a custom Statement Of Work (SOW)."
        mutedClass={shell.muted}
      >
        <Link
          href="/pricing"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          See full pricing
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </SectionHeading>

      <HomePricingTable />

      <p className={`mt-4 text-[0.85rem] leading-relaxed ${shell.muted}`}>
        The Control Centre will give you a band — not a fixed quote — and we will
        confirm the final SOW before any work begins. GST exclusive unless stated.
      </p>
    </article>
  );
}

const METHODOLOGY_STEPS = [
  {
    title: "Brief",
    body: "Use the Control Centre. Two to four minutes. You get a recommendation and a draft Statement Of Work (SOW).",
  },
  {
    title: "Scope",
    body: "We review the draft, refine it, and send a final SOW with a fixed price for in-scope work. Larger or ambiguous briefs start with a paid scoping workshop.",
  },
  {
    title: "Build",
    body: "Weekly checkpoints. Your access stays your access — we work in your tools where possible.",
  },
  {
    title: "Acceptance",
    body: "Tested against the acceptance criteria written into the SOW. No “is it done?” — there's a checklist.",
  },
  {
    title: "Handover",
    body: "Repo, credentials, prompts, run-book, known limitations. Yours to keep.",
  },
  {
    title: "Run mode (optional)",
    body: "If you want us to keep an eye on it, you choose a support plan (Basic Care, Standard Care, Priority Care). If not, you own it and we're available for Change Requests.",
  },
];
