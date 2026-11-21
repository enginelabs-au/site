import { ENGINES } from "@/app/_lib/engines";
import { getSiteUrl } from "@/app/_lib/site-url";

/**
 * OpenAI product feed, one row per Engine, generated from the catalog.
 * https://developers.openai.com/commerce/specs/feed
 */
const COLUMNS = [
  "item_id",
  "title",
  "description",
  "url",
  "brand",
  "seller_name",
  "seller_url",
  "image_url",
  "availability",
  "price",
  "target_countries",
  "store_country",
] as const;

function cell(value: string): string {
  if (/[\t\n\r"]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

export function productFeedTsv(siteUrl = getSiteUrl()): string {
  const image = `${siteUrl}/logo.png`;
  const rows = ENGINES.map((engine) => {
    const description = [
      engine.oneLiner,
      `Replaces ${engine.replaces.replace(/\.$/, "")}.`,
      `Fixed scope, delivered in ${engine.timeline}. Starting price, GST exclusive.`,
    ].join(" ");
    const values: Record<(typeof COLUMNS)[number], string> = {
      item_id: `engine-${engine.slug}`,
      title: engine.name,
      description,
      url: `${siteUrl}/engines/${engine.slug}`,
      brand: "Engine Labs",
      seller_name: "Engine Labs",
      seller_url: siteUrl,
      image_url: image,
      availability: "in_stock",
      price: `${engine.priceFrom.toFixed(2)} AUD`,
      target_countries: '["AU"]',
      store_country: "AU",
    };
    return COLUMNS.map((column) => cell(values[column])).join("\t");
  });
  return [COLUMNS.join("\t"), ...rows].join("\n") + "\n";
}
