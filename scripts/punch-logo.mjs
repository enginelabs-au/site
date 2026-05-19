/**
 * Punch the baked-in light-grey ground out of the source tree-mark PNG and
 * write a true RGBA-transparent `site/public/logo.png`.
 *
 * The Engine Labs source raster has THREE pixel classes:
 *   1. Transparent border pixels (alpha=0, RGB=0)        → preserve as-is
 *   2. Opaque light-grey "ground" around the tree        → ZERO alpha
 *   3. Opaque navy fills (the actual mark)               → preserve as-is
 *
 * Algorithm (simple lightness gate):
 *   • For each pixel with alpha > 0:
 *       - Compute luminance (perceptual, Rec. 709 weights).
 *       - If luminance ≥ LUMA_BG       → fully transparent (alpha=0).
 *       - If luminance ≤ LUMA_INK      → fully opaque (alpha=255). Keep RGB.
 *       - Otherwise (anti-aliased edge): keep RGB, scale alpha so light edges
 *         fade out smoothly (alpha = (LUMA_BG - L) / (LUMA_BG - LUMA_INK)).
 *
 * Tuned for the Cam-supplied filled-version source: the navy fills sit in the
 * 0–0.20 luminance range, the grey ground is ~0.78, anti-aliased edges land
 * in between.
 *
 * Run: `node scripts/punch-logo.mjs <source-png> [output-path]`.
 */

import sharp from "sharp";
import { resolve } from "node:path";

const LUMA_INK = 0.30; // ≤ this → fully opaque ink
const LUMA_BG = 0.66;  // ≥ this → fully transparent

async function main() {
  const src = resolve(
    process.argv[2] ??
      "/Users/camdouglas/.cursor/projects/Users-camdouglas-enginelabs/assets/Screenshot_2026-05-19_at_11.55.08_am-7c05c708-b95d-473d-bff9-4bc87cab8938.png",
  );
  const outPath = resolve(process.argv[3] ?? "public/logo.png");

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  if (channels !== 4) throw new Error(`Expected 4 channels, got ${channels}`);

  let stripped = 0, kept = 0, ramped = 0, alreadyTransparent = 0;
  const out = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) {
      // Already transparent — preserve.
      out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 0;
      alreadyTransparent++;
      continue;
    }

    // Rec. 709 luminance, 0..1.
    const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    if (luma >= LUMA_BG) {
      out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 0;
      stripped++;
    } else if (luma <= LUMA_INK) {
      out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = a;
      kept++;
    } else {
      // Edge ramp: scale source alpha by lightness — fade light edges out.
      const t = (LUMA_BG - luma) / (LUMA_BG - LUMA_INK); // 1 at ink, 0 at bg
      out[i] = r; out[i + 1] = g; out[i + 2] = b;
      out[i + 3] = Math.round(a * t);
      ramped++;
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath);

  const total = width * height;
  const pct = (n) => ((n / total) * 100).toFixed(2);
  console.log(
    `Wrote ${outPath} (${width}x${height}). already-transparent ${alreadyTransparent} (${pct(alreadyTransparent)}%), bg-stripped ${stripped} (${pct(stripped)}%), ink-kept ${kept} (${pct(kept)}%), ramped ${ramped} (${pct(ramped)}%).`,
  );

  const meta = await sharp(outPath).metadata();
  console.log(
    `Output meta: ${meta.width}x${meta.height} hasAlpha=${meta.hasAlpha} channels=${meta.channels}`,
  );

  // Verify a few sample points in the OUTPUT.
  const { data: vData, info: vInfo } = await sharp(outPath).raw().toBuffer({ resolveWithObject: true });
  const at = (x, y) => {
    const i = (y * vInfo.width + x) * 4;
    return [vData[i], vData[i+1], vData[i+2], vData[i+3]];
  };
  const samples = [
    [5, 5, "TL corner"],
    [width - 6, 5, "TR corner"],
    [319, 14, "near-top opaque region (was grey bg)"],
    [310, 300, "centre"],
    [Math.floor(width / 2), Math.floor(height / 2), "exact centre"],
  ];
  for (const [x, y, label] of samples) {
    console.log(`  ${label} (${x},${y}): rgba=[${at(x, y).join(",")}]`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
