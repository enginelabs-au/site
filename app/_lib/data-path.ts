import path from "node:path";

/** Vercel serverless allows writes under /tmp only; local dev uses .data/. */
export function dataRoot(): string {
  if (process.env.VERCEL) return path.join("/tmp", "enginelabs-data");
  return path.join(process.cwd(), ".data");
}
