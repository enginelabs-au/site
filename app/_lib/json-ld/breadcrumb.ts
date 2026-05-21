import { getSiteUrl } from "@/app/_lib/site-url";

export type BreadcrumbCrumb = { name: string; path: string };

/**
 * BreadcrumbList JSON-LD builder. `path` should start with "/" (e.g. "/engines").
 * The first crumb is the page itself; root "Home" is prepended automatically.
 */
export function breadcrumbSchema(
  crumbs: BreadcrumbCrumb[],
  siteUrl: string = getSiteUrl(),
) {
  const full: BreadcrumbCrumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.path === "/" ? "" : c.path}`,
    })),
  };
}
