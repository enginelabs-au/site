import { getSiteUrl } from "@/app/_lib/site-url";
import type { Engine } from "@/app/_lib/engines";
import { engineServiceId } from "./service";

/**
 * ItemList JSON-LD enumerating Engines as Service @id references.
 * Used by /engines and /pricing — the underlying Service nodes are emitted
 * by each individual /engines/[slug] page.
 */
export function engineItemListSchema(
  engines: Engine[],
  args: { name: string; pagePath: string; description?: string },
  siteUrl: string = getSiteUrl(),
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}${args.pagePath}#engine-list`,
    name: args.name,
    description: args.description,
    numberOfItems: engines.length,
    itemListElement: engines.map((engine, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/engines/${engine.slug}`,
      item: {
        "@type": "Service",
        "@id": engineServiceId(engine.slug, siteUrl),
        name: engine.name,
        url: `${siteUrl}/engines/${engine.slug}`,
        description: engine.oneLiner,
      },
    })),
  };
}
