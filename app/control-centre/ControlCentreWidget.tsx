"use client";

import ControlCentre from "@/app/_components/ControlCentre";
import {
  CONTROL_CENTRE_NEXUS_CLASS,
  CONTROL_CENTRE_PRESETS,
} from "@/app/_lib/control-centre-widget";

export default function ControlCentreWidget({
  prefilledBrief = "",
}: {
  prefilledBrief?: string;
}) {
  return (
    <ControlCentre
      variant="nexus"
      introAnimation="mount"
      surface="control-centre-page"
      presetPrompts={[...CONTROL_CENTRE_PRESETS]}
      prefilledBrief={prefilledBrief}
      showHeaderLinks={false}
      className={CONTROL_CENTRE_NEXUS_CLASS}
    />
  );
}
