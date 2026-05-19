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
function circleMaskSvg(size) {
  const r = size / 2;
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${r}" cy="${r}" r="${r}" fill="white"/>
    </svg>`,
  );
}

async function buildIcon(size, outPath) {
  const inset = Math.max(4, Math.round(size * 0.1));
  const markSize = size - inset * 2;

  const mark = await sharp(SOURCE)
    .resize(markSize, markSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const circleBg = await sharp(circleMaskSvg(size)).png().toBuffer();

  const composed = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: circleBg },
      { input: mark, gravity: "center" },
    ])
    .png()
    .toBuffer();

  await sharp(composed)
    .composite([{ input: circleBg, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`Wrote ${outPath} (${size}x${size}, circular)`);
}

async function main() {
  await buildIcon(32, OUT);
  await buildIcon(180, APPLE);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
