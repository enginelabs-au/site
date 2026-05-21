import {
  JsonLd,
  organizationSchema,
  personCamSchema,
  websiteSchema,
} from "@/app/_lib/json-ld";

/**
 * Global JSON-LD — Organization, founder Person, and WebSite.
 * Page-level schemas (Service, FAQPage, BreadcrumbList, Article, etc.)
 * are emitted inline by individual pages and `@id`-reference these nodes.
 */
export default function SiteJsonLd() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={personCamSchema()} />
      <JsonLd data={websiteSchema()} />
    </>
  );
}
