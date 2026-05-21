import { getSiteUrl } from "@/app/_lib/site-url";
import type { LabPostMeta } from "@/app/_lib/content";
import { organizationRef, personCamRef } from "./entities";

/**
 * BlogPosting/Article JSON-LD for a Lab post.
 * Falls back to /logo.png when no per-post image asset exists.
 * `wordCount` is optional — pass it in only when cheap to compute.
 */
export function labArticleSchema(
  post: LabPostMeta,
  options: { wordCount?: number; image?: string } = {},
  siteUrl: string = getSiteUrl(),
) {
  const url = `${siteUrl}/lab/${post.slug}`;
  const image = options.image ?? `${siteUrl}/logo.png`;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description: post.subtitle ?? "A build from the Engine Labs Lab.",
    image,
    inLanguage: "en-AU",
    author: personCamRef(siteUrl),
    publisher: organizationRef(siteUrl),
  };
  if (post.date_published) {
    data.datePublished = post.date_published;
    data.dateModified = post.date_published;
  }
  if (typeof options.wordCount === "number") {
    data.wordCount = options.wordCount;
  }
  if (typeof post.read_time_minutes === "number") {
    data.timeRequired = `PT${post.read_time_minutes}M`;
  }
  return data;
}
