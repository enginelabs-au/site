/**
 * Build tab icons from the light-mode mark (navy tree on paper).
 * Site dark mode inverts the same PNG via CSS; favicons must not use that filter.
 *
 * Run from site/: node scripts/build-logo-favicon.mjs
 */

import sharp from "sharp";
import { resolve } from "node:path";

const SOURCE = resolve("public/logo.png");
const OUT = resolve("public/logo-favicon.png");
const APPLE = resolve("public/apple-touch-icon.png");
const PAPER = { r: 255, g: 255, b: 255, alpha: 1 };

async function buildIcon(size, outPath) {
  const mark = await sharp(SOURCE)
    .resize(size - 8, size - 8, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: PAPER,
    },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`Wrote ${outPath} (${size}x${size})`);
}

async function main() {
  await buildIcon(32, OUT);
  await buildIcon(180, APPLE);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
