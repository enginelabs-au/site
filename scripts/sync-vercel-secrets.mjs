/**
 * Re-sync sensitive env vars from local .env to Vercel (production + preview).
 * Run from site/: node --env-file=.env scripts/sync-vercel-secrets.mjs
 */

import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const SECRETS = ["OPENROUTER_API_KEY", "RESEND_API_KEY"];
const TARGETS = ["production", "preview"];

function parseEnvFile(path) {
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function setOnVercel(name, value, target) {
  const args = ["env", "add", name, target, "--force", "--sensitive"];
  const r = spawnSync("vercel", args, {
    input: value,
    stdio: ["pipe", "inherit", "inherit"],
    cwd: resolve("."),
  });
  if (r.status !== 0) {
    throw new Error(`vercel env add ${name} ${target} failed (${r.status})`);
  }
  console.log(`set ${name} (${target}) len=${value.length}`);
}

const env = parseEnvFile(resolve(".env"));
for (const name of SECRETS) {
  const value = env[name]?.trim();
  if (!value) {
    console.error(`Missing ${name} in .env`);
    process.exit(1);
  }
  for (const target of TARGETS) {
    setOnVercel(name, value, target);
  }
}
