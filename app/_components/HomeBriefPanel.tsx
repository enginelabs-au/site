"use client";

import { ControlConsoleSection } from "@/app/_components/AsciiBrainBackground";
import ControlCentre from "@/app/_components/ControlCentre";
import {
  CONTROL_CENTRE_NEXUS_CLASS,
  CONTROL_CENTRE_PRESETS,
} from "@/app/_lib/control-centre-widget";

export default function HomeBriefPanel() {
  return (
    <ControlConsoleSection id="brief" aria-labelledby="brief-heading">
      <h2
        id="brief-heading"
        className="text-center text-xl font-semibold tracking-tight text-section-brief-fg drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] md:text-2xl"
      >
        Control Centre
      </h2>
      <p className="mt-2 text-center text-sm text-section-brief-fg-muted drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] md:text-base">
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
    </ControlConsoleSection>
  );
}
