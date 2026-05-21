import type { Metadata } from "next";
import ControlCentreWidget from "@/app/control-centre/ControlCentreWidget";
import { ControlConsoleSection } from "@/app/_components/AsciiBrainBackground";
import { SentencePara } from "@/app/_components/typography";
import { buildEngineControlCentreSeed } from "@/app/_lib/engine-control-centre-seed";
import { buildVerticalControlCentreSeed } from "@/app/_lib/vertical-control-centre-seed";
import { engineBySlug, verticalBySlug } from "@/app/_lib/engines";
import {
  JsonLd,
  breadcrumbSchema,
  controlCentreWebApplicationSchema,
} from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

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
  const siteUrl = getSiteUrl();
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-4xl px-4 pt-20 pb-12 md:pt-28 md:pb-14">
          <p className="eyebrow">The Control Centre</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Brief it. We draft it.{" "}
            <span className="text-brand">You decide.</span>
          </h1>
          <SentencePara className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            The Engine Labs Control Centre is a free web tool: type the thing
            slowing your business down, answer up to five clarifying
            questions, and receive a recommended Engine plus a draft
            Statement Of Work with a price band in AUD. Two to four minutes
            for most briefs; we still review every brief within one business
            day before work starts.
          </SentencePara>
        </div>
      </section>

      <ControlConsoleSection aria-label="Control Centre">
        <ControlCentreWidget
          key={widgetKey}
          prefilledBrief={prefilledBrief}
        />
      </ControlConsoleSection>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            <Tile
              title="What does the Control Centre do?"
              body="Reads your brief, asks up to five clarifying questions, recommends one or more Engines, and drafts a one-page Statement Of Work (SOW) with a price band."
            />
            <Tile
              title="What won't the Control Centre do?"
              body="Quote a fixed price for ambiguous work. Promise a business outcome. Take on builds the contract pack excludes."
            />
            <Tile
              title="How long does it take?"
              body="Two to four minutes for most briefs — a short clarifying chat, then a structured recommendation and scope band. We still review every brief before work starts."
            />
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(
          [{ name: "Control Centre", path: "/control-centre" }],
          siteUrl,
        )}
      />
      <JsonLd data={controlCentreWebApplicationSchema(siteUrl)} />
    </>
  );
}

function Tile({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-paper p-6">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <SentencePara className="mt-3 text-sm leading-relaxed text-ink-2">{body}</SentencePara>
    </div>
  );
}
