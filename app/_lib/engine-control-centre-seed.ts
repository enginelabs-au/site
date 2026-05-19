import type { Engine } from "@/app/_lib/engines";

/** Initial Control Centre message when arriving from an Engine page. */
export function buildEngineControlCentreSeed(engine: Engine): string {
  return [
    `I want to configure the ${engine.name}.`,
    "",
    engine.oneLiner,
  ].join("\n");
}
