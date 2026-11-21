import { productFeedTsv } from "@/app/_lib/product-feed";

export const dynamic = "force-static";

/** Hosted product feed for ChatGPT Business. Regenerates from the Engine catalog. */
export function GET() {
  return new Response(productFeedTsv(), {
    headers: {
      "Content-Type": "text/tab-separated-values; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
