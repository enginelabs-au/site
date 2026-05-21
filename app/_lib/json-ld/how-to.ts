import { getSiteUrl } from "@/app/_lib/site-url";

export type HowToStep = { name: string; text: string };

/**
 * Build a schema.org HowTo from a list of steps.
 * Used by /methodology to expose the six-step Build → Run loop.
 */
export function howToSchema(
  args: {
    name: string;
    description: string;
    pagePath: string;
    steps: HowToStep[];
  },
  siteUrl: string = getSiteUrl(),
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${siteUrl}${args.pagePath}#howto`,
    name: args.name,
    description: args.description,
    inLanguage: "en-AU",
    step: args.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${siteUrl}${args.pagePath}#step-${i + 1}`,
    })),
  };
}
