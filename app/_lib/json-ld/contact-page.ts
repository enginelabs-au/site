import { getSiteUrl } from "@/app/_lib/site-url";
import { organizationRef } from "./entities";

/**
 * ContactPage JSON-LD with embedded ContactPoint.
 */
export function contactPageSchema(siteUrl: string = getSiteUrl()) {
  const url = `${siteUrl}/contact`;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#contact-page`,
    url,
    name: "Contact Engine Labs",
    inLanguage: "en-AU",
    isPartOf: organizationRef(siteUrl),
    about: organizationRef(siteUrl),
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@enginelabs.com.au",
      areaServed: "AU",
      availableLanguage: ["en"],
    },
  };
}
