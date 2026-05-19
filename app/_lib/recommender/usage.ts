import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { recommenderConfig } from "@/app/_lib/recommender/config";

const USAGE_DIR = path.join(process.cwd(), ".data", "usage");

export type UserUsage = {
  userId: string;
  totalCostUsd: number;
  requestCount: number;
  updatedAt: string;
};

function usagePath(userId: string): string {
  const safe = userId.replace(/[^a-zA-Z0-9-]/g, "");
  return path.join(USAGE_DIR, `${safe}.json`);
}

export async function readUserUsage(userId: string): Promise<UserUsage> {
  try {
    const raw = await readFile(usagePath(userId), "utf8");
    const parsed = JSON.parse(raw) as UserUsage;
    return {
      userId,
      totalCostUsd: Number(parsed.totalCostUsd) || 0,
      requestCount: Number(parsed.requestCount) || 0,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return {
        userId,
        totalCostUsd: 0,
        requestCount: 0,
        updatedAt: new Date().toISOString(),
      };
    }
    throw err;
  }
}

export async function addUsageCost(
  userId: string,
  costUsd: number,
): Promise<UserUsage> {
  const usage = await readUserUsage(userId);
  const next: UserUsage = {
    userId,
    totalCostUsd: usage.totalCostUsd + costUsd,
    requestCount: usage.requestCount + 1,
    updatedAt: new Date().toISOString(),
  };
  await mkdir(USAGE_DIR, { recursive: true });
  await writeFile(usagePath(userId), JSON.stringify(next, null, 2), "utf8");
  return next;
}

export function remainingBudgetUsd(usage: UserUsage): number {
  return Math.max(0, recommenderConfig.userSpendCapUsd - usage.totalCostUsd);
}

export function isOverSpendCap(usage: UserUsage): boolean {
  return usage.totalCostUsd >= recommenderConfig.userSpendCapUsd;
}

export function canAffordRequest(usage: UserUsage): boolean {
  return remainingBudgetUsd(usage) >= recommenderConfig.minReserveUsd;
}
