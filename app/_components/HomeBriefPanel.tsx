"use client";

import ControlCentre from "@/app/_components/ControlCentre";
import {
  CONTROL_CENTRE_NEXUS_CLASS,
  CONTROL_CENTRE_PRESETS,
} from "@/app/_lib/control-centre-widget";

export default function HomeBriefPanel() {
  return (
    <section
      id="brief"
      className="border-b border-section-brief-border bg-section-brief px-4 py-12 text-section-brief-fg md:py-16"
      aria-labelledby="brief-heading"
    >
      <div className="mx-auto max-w-2xl">
        <h2
          id="brief-heading"
          className="text-center text-xl font-semibold tracking-tight md:text-2xl"
        >
          Control Centre
        </h2>
        <p className="mt-2 text-center text-sm text-section-brief-fg-muted md:text-base">
          Describe the problem — we&apos;ll recommend an Engine and draft a scope.
        </p>
        <div className="mt-6">
          <ControlCentre
            variant="nexus"
            introAnimation="view"
            presetPrompts={[...CONTROL_CENTRE_PRESETS]}
            showHeaderLinks={false}
            className={CONTROL_CENTRE_NEXUS_CLASS}
          />
        </div>
      </div>
    </section>
  );
}
