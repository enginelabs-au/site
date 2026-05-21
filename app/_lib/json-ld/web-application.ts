import { getSiteUrl } from "@/app/_lib/site-url";
import { organizationRef } from "./entities";

/**
 * WebApplication JSON-LD for the Control Centre tool.
 * Describes the scoping/recommender widget that lives on /control-centre.
 */
export function controlCentreWebApplicationSchema(
  siteUrl: string = getSiteUrl(),
) {
  const url = `${siteUrl}/control-centre`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#webapp`,
    name: "Engine Labs Control Centre",
    url,
    description:
      "Type a problem, get clarifying questions, a recommended Engine and a draft Statement Of Work with a starting price band — in two to four minutes, no call required.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript enabled in a modern browser.",
    inLanguage: "en-AU",
    isAccessibleForFree: true,
    creator: organizationRef(siteUrl),
    publisher: organizationRef(siteUrl),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AUD",
    },
  };
}
