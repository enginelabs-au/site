import type { Vertical } from "@/app/_lib/engines";

/** Initial Control Centre message when arriving from a vertical page. */
export function buildVerticalControlCentreSeed(vertical: Vertical): string {
  return [
    `I want to configure Engines for ${vertical.cardName.replace(/^For /i, "")}.`,
    "",
    vertical.exampleBrief,
  ].join("\n");
}
