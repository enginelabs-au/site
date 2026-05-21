import { getSiteUrl } from "@/app/_lib/site-url";

/**
 * Centralised JSON-LD entity definitions for Engine Labs.
 *
 * Every page-level schema references these via `@id` so search engines can
 * resolve a single canonical Organization / Person / WebSite graph node
 * regardless of which page they crawled it from.
 */

export function organizationId(siteUrl: string = getSiteUrl()): string {
  return `${siteUrl}/#organization`;
}

export function personCamId(siteUrl: string = getSiteUrl()): string {
  return `${siteUrl}/about#cam-douglas`;
}

export function websiteId(siteUrl: string = getSiteUrl()): string {
  return `${siteUrl}/#website`;
}

export function organizationRef(siteUrl: string = getSiteUrl()) {
  return { "@id": organizationId(siteUrl) };
}

export function personCamRef(siteUrl: string = getSiteUrl()) {
  return { "@id": personCamId(siteUrl) };
}

/** Full Organization node, including ContactPoint and founder reference. */
export function organizationSchema(siteUrl: string = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(siteUrl),
    name: "Engine Labs",
    legalName: "Cam Douglas trading as Engine Labs",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
    image: `${siteUrl}/logo.png`,
    email: "hello@enginelabs.com.au",
    description:
      "One-operator AI build studio in Sydney, Australia. Eight productised Engines for admin, replies and reporting — fixed scope, published pricing, clean handover.",
    foundingDate: "2026",
    founder: personCamRef(siteUrl),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    knowsAbout: [
      "AI workflow automation",
      "AI agents",
      "Internal tools",
      "Business dashboards",
      "Startup MVPs",
    ],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ABN",
      value: "13 141 459 638",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@enginelabs.com.au",
        areaServed: "AU",
        availableLanguage: ["en"],
      },
    ],
  };
}

/** Founder Person node. No sameAs — no verified public profile URLs in repo. */
export function personCamSchema(siteUrl: string = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personCamId(siteUrl),
    name: "Cam Douglas",
    jobTitle: "Operator",
    worksFor: organizationRef(siteUrl),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    url: `${siteUrl}/about`,
  };
}

export function websiteSchema(siteUrl: string = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(siteUrl),
    name: "Engine Labs",
    url: siteUrl,
    inLanguage: "en-AU",
    publisher: organizationRef(siteUrl),
  };
}
