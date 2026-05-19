import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { dataRoot } from "@/app/_lib/data-path";

const DATA_DIR = dataRoot();
const DATA_FILE = path.join(DATA_DIR, "briefs.json");

export type StoredBrief = {
  id: string;
  brief: string;
  email: string;
  surface: string;
  createdAt: string;
  status: "received" | "recommendation";
  transcript?: Array<{ role: "user" | "assistant"; content: string }>;
  recommendation?: unknown;
};

async function readBriefs(): Promise<StoredBrief[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    if (!raw.trim()) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredBrief[]) : [];
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return [];
    }
    throw err;
  }
}

async function writeBriefs(briefs: StoredBrief[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(briefs, null, 2), "utf8");
}

export async function appendBrief(stored: StoredBrief): Promise<StoredBrief> {
  const briefs = await readBriefs();
  briefs.push(stored);
  await writeBriefs(briefs);
  return stored;
}
