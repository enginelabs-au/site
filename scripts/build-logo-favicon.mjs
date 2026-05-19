/**
 * Build tab icons from the light-mode mark (navy tree on paper).
 * SVG favicon clips to a circle; PNG fallbacks use a proper alpha matte.
 *
 * Run from site/: node scripts/build-logo-favicon.mjs
 */

import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const SOURCE = resolve("public/logo.png");
const OUT_PNG = resolve("public/logo-favicon.png");
const OUT_SVG = resolve("public/favicon.svg");
const APPLE = resolve("public/apple-touch-icon.png");

function circleAlphaBuffer(size) {
  const buf = Buffer.alloc(size * size * 4);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 0.5;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      const i = (y * size + x) * 4;
      let a = 0;
      if (d <= r - 0.5) a = 255;
      else if (d <= r + 0.5) a = Math.round(255 * (r + 0.5 - d));

      if (a > 0) {
        buf[i] = 255;
        buf[i + 1] = 255;
        buf[i + 2] = 255;
        buf[i + 3] = a;
      }
    }
  }
  return buf;
}

async function buildPngIcon(size, outPath) {
  const inset = Math.max(4, Math.round(size * 0.12));
  const markSize = size - inset * 2;

  const mark = await sharp(SOURCE)
    .resize(markSize, markSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const circleBg = await sharp(circleAlphaBuffer(size), {
    raw: { width: size, height: size, channels: 4 },
  })
    .png()
    .toBuffer();

  await sharp(circleBg)
    .composite([{ input: mark, gravity: "center" }])
    .png({ compressionLevel: 9, force: true })
    .toFile(outPath);

  console.log(`Wrote ${outPath} (${size}x${size}, circular PNG)`);
}

async function buildSvgIcon(size, outPath) {
  const inset = Math.max(4, Math.round(size * 0.12));
  const markSize = size - inset * 2;
  const r = size / 2;

  const markB64 = (
    await sharp(SOURCE)
      .resize(markSize, markSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer()
  ).toString("base64");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <clipPath id="clip"><circle cx="${r}" cy="${r}" r="${r}"/></clipPath>
  <g clip-path="url(#clip)">
    <circle cx="${r}" cy="${r}" r="${r}" fill="#ffffff"/>
    <image href="data:image/png;base64,${markB64}" x="${inset}" y="${inset}" width="${markSize}" height="${markSize}" preserveAspectRatio="xMidYMid meet"/>
  </g>
</svg>`;

  await writeFile(outPath, svg, "utf8");
  console.log(`Wrote ${outPath} (circular SVG)`);
}

async function main() {
  await buildSvgIcon(32, OUT_SVG);
  await buildPngIcon(32, OUT_PNG);
  await buildPngIcon(180, APPLE);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
