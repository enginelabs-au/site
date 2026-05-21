import { getSiteUrl } from "@/app/_lib/site-url";
import type { Engine } from "@/app/_lib/engines";
import { organizationRef } from "./entities";

/**
 * Stable `@id` for an Engine when referenced as a schema.org Service.
 * Used by /engines/[slug] and as ItemList items on /engines and /pricing.
 */
export function engineServiceId(
  slug: string,
  siteUrl: string = getSiteUrl(),
): string {
  return `${siteUrl}/engines/${slug}#service`;
}

export function engineServiceSchema(
  engine: Engine,
  siteUrl: string = getSiteUrl(),
) {
  const url = `${siteUrl}/engines/${engine.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": engineServiceId(engine.slug, siteUrl),
    name: engine.name,
    description: engine.oneLiner,
    serviceType: engine.stackTiers.join(", "),
    category: "AI build studio",
    url,
    provider: organizationRef(siteUrl),
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    audience: {
      "@type": "BusinessAudience",
      name: "Small businesses, agencies and founder-led teams",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AUD",
      lowPrice: String(engine.priceFrom),
      highPrice: String(engine.priceTo),
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: engine.priceFrom,
        maxPrice: engine.priceTo,
        priceCurrency: "AUD",
        valueAddedTaxIncluded: false,
      },
      offerCount: String(engine.tiers.length),
      offers: engine.tiers.map((tier) => ({
        "@type": "Offer",
        name: `${engine.name} · ${tier.name}`,
        priceCurrency: "AUD",
        price: String(tier.price),
        priceSpecification: {
          "@type": "PriceSpecification",
          price: tier.price,
          priceCurrency: "AUD",
          valueAddedTaxIncluded: false,
        },
        description: tier.blurb,
        url,
      })),
    },
  };
}
