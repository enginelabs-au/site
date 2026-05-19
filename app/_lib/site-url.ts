/** Canonical production URL for metadata, sitemap, and JSON-LD. */
export function getSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production") {
    return "https://www.enginelabs.com.au";
  }
  return "http://localhost:3000";
}
