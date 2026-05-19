/**
 * Remove baked-in black (or near-black) background from logo.png.
 * Keeps the navy tree fills. Writes back to public/logo.png.
 *
 * Run from site/: node scripts/key-logo-black-bg.mjs
 */

import sharp from "sharp";
import { resolve } from "node:path";

const BLACK_MAX = 28; // rgb channels at or below → transparent

async function main() {
  const path = resolve("public/logo.png");
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);

  let keyed = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= BLACK_MAX && g <= BLACK_MAX && b <= BLACK_MAX) {
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
      keyed++;
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(path);

  console.log(
    `Keyed ${keyed} black pixels on ${width}x${height} → ${path}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
