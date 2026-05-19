import type { Metadata } from "next";
import ControlCentreWidget from "@/app/control-centre/ControlCentreWidget";
import { buildEngineControlCentreSeed } from "@/app/_lib/engine-control-centre-seed";
import { buildVerticalControlCentreSeed } from "@/app/_lib/vertical-control-centre-seed";
import { engineBySlug, verticalBySlug } from "@/app/_lib/engines";

export const metadata: Metadata = {
  title: "Control Centre — brief Engine Labs in two minutes",
  description:
    "Type a problem. Get a draft Statement Of Work and a starting price. No call required.",
};

export default async function ControlCentrePage({
  searchParams,
}: {
  searchParams: Promise<{ engine?: string; vertical?: string }>;
}) {
  const { engine: engineSlug, vertical: verticalSlug } = await searchParams;
  const engine = engineSlug ? engineBySlug(engineSlug) : undefined;
  const vertical = verticalSlug ? verticalBySlug(verticalSlug) : undefined;
  const prefilledBrief = engine
    ? buildEngineControlCentreSeed(engine)
    : vertical
      ? buildVerticalControlCentreSeed(vertical)
      : "";
  const widgetKey = engineSlug ?? verticalSlug ?? "default";
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div aria-hidden className="subtle-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 pt-20 pb-12 md:pt-28 md:pb-14">
          <p className="eyebrow">The Control Centre</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Brief it. We draft it.{" "}
            <span className="text-brand">You decide.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            Type the thing slowing your business down. We&apos;ll reply within 1
            business day with a draft scope and a starting price band in AUD.
            Two to four minutes for most briefs. No call required.
          </p>
        </div>
      </section>

      <section
        className="border-b border-section-brief-border bg-section-brief px-4 py-12 text-section-brief-fg md:py-16"
        aria-label="Control Centre"
      >
        <div className="mx-auto max-w-2xl">
          <ControlCentreWidget
            key={widgetKey}
            prefilledBrief={prefilledBrief}
          />
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            <Tile
              title="What it does"
              body="Reads your brief, asks up to five clarifying questions, recommends one or more Engines, and drafts a one-page Statement Of Work (SOW) with a price band."
            />
            <Tile
              title="What it won't do"
              body="Quote a fixed price for ambiguous work. Promise a business outcome. Take on builds the contract pack excludes."
            />
            <Tile
              title="How long it takes"
              body="Two to four minutes for most briefs — a short clarifying chat, then a structured recommendation and scope band. We still review every brief before work starts."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Tile({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-paper p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
        {title}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-2">{body}</p>
    </div>
  );
}
