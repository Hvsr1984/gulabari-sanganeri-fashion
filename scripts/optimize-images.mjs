/**
 * GULABARI — image pipeline.
 *
 *   1. Re-encodes every content photograph in public/images to a lean,
 *      progressive mozjpeg (quality 82, 4:4:4 chroma) capped at a sane
 *      maximum width. Source files drop from ~16 MB to ~3 MB, which keeps
 *      the repo light and makes `next/image` transforms cheap.
 *   2. Emits src/lib/image-blur.ts — a map of 12px-wide base64 WebP
 *      placeholders so every <Image> can render an instant, on-brand
 *      blur-up instead of an empty box (kills the flash + reserves space).
 *   3. Builds public/images/og-gulabari.jpg (1200x630) for social cards
 *      and src/app/icon.png + src/app/apple-icon.png for the favicon,
 *      composed from the real brand lockup.
 *
 * Run with: npm run images
 */
import sharp from "sharp";
import { readdir, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const IMAGES = path.join(ROOT, "public", "images");

/** Files that are brand marks / already small — only re-encoded, never resized. */
const BRAND_MARKS = new Set([
  "gulabari-emblem-transparent.png",
  "gulabari-logo-light.png",
  "gulabari-logo-transparent.png",
  "gulabari-logo.jpg",
  "gulabari-navbar-brand.png",
  "gulabari-wordmark-transparent.png",
]);

/** Maximum source width per file (Next generates the responsive set downstream). */
const MAX_WIDTH = 1800;

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function optimizePhotographs() {
  const files = (await readdir(IMAGES)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  let before = 0;
  let after = 0;
  const report = [];

  for (const file of files) {
    const full = path.join(IMAGES, file);
    const originalSize = (await stat(full)).size;
    const image = sharp(full, { failOn: "none" });
    const meta = await image.metadata();
    const isBrand = BRAND_MARKS.has(file);

    let pipeline = sharp(full, { failOn: "none" });
    if (!isBrand && meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    // Brand marks stay PNG (alpha); photographs become progressive mozjpeg.
    const buffer =
      meta.format === "png"
        ? await pipeline.png({ compressionLevel: 9, palette: true, quality: 88 }).toBuffer()
        : await pipeline
            .jpeg({ quality: 82, mozjpeg: true, progressive: true, chromaSubsampling: "4:4:4" })
            .toBuffer();

    if (buffer.length < originalSize) {
      await writeFile(full, buffer);
      before += originalSize;
      after += buffer.length;
      report.push(
        `  ${file.padEnd(38)} ${kb(originalSize).padStart(8)} → ${kb(buffer.length).padStart(8)}`
      );
    } else {
      report.push(`  ${file.padEnd(38)} ${kb(originalSize).padStart(8)}   (kept)`);
    }
  }

  console.log("Photograph re-encode:");
  console.log(report.join("\n"));
  console.log(
    `  Total: ${kb(before)} → ${kb(after)} (-${Math.round((1 - after / before) * 100)}%)\n`
  );
}

async function writeBlurMap() {
  const files = (await readdir(IMAGES)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  const entries = [];

  for (const file of files.sort()) {
    const meta = await sharp(path.join(IMAGES, file)).metadata();
    const aspect = meta.width && meta.height ? meta.width / meta.height : 1;
    const width = 16;
    const height = Math.max(8, Math.round(width / aspect));
    // Tiny, heavily compressed stand-in used as the blur-up placeholder.
    const tiny = await sharp(path.join(IMAGES, file))
      .resize(width, height, { fit: "cover" })
      .webp({ quality: 32 })
      .toBuffer();
    entries.push(
      `  "/images/${file}": { blurDataURL: "data:image/webp;base64,${tiny.toString("base64")}", width: ${meta.width}, height: ${meta.height} },`
    );
  }

  const out = `/**
 * GENERATED FILE — do not edit by hand.
 * Regenerate with \`npm run images\`.
 *
 * Intrinsic dimensions + a ~200 byte blur-up placeholder for every photograph
 * in public/images. Used by <CraftImage> to reserve layout space (CLS = 0)
 * and to render an instant branded blur while the real photo streams in.
 */
export type ImageMeta = {
  blurDataURL: string;
  width: number;
  height: number;
};

export const IMAGE_META: Record<string, ImageMeta> = {
${entries.join("\n")}
};

export const fallbackImageMeta: ImageMeta = {
  blurDataURL:
    "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoIAAgAAUAmJaQAA3AA/vuUAAA=",
  width: 1200,
  height: 1500,
};

export function imageMeta(src: string): ImageMeta {
  return IMAGE_META[src] ?? fallbackImageMeta;
}
`;

  await writeFile(path.join(ROOT, "src", "lib", "image-blur.ts"), out);
  console.log(`Wrote src/lib/image-blur.ts (${entries.length} images)\n`);
}

async function buildSocialAndIcons() {
  const emblem = await sharp(path.join(IMAGES, "gulabari-emblem-transparent.png"))
    .resize({ height: 150 })
    .toBuffer();

  // --- Social card: 1200x630, fabric ground + brand lockup -------------
  const base = await sharp(path.join(IMAGES, "hero-sanganeri.jpg"))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .toBuffer();

  const og = await sharp(base)
    .modulate({ brightness: 0.62, saturation: 1.05 })
    .composite([
      {
        input: Buffer.from(
          `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stop-color="#16243d" stop-opacity="0.30"/>
                 <stop offset="100%" stop-color="#16243d" stop-opacity="0.82"/>
               </linearGradient>
             </defs>
             <rect width="1200" height="630" fill="url(#g)"/>
             <rect x="0" y="596" width="1200" height="34" fill="#9c3b2e" opacity="0.92"/>
           </svg>`
        ),
        top: 0,
        left: 0,
      },
      { input: emblem, top: 190, left: 600 - 75 },
      {
        input: Buffer.from(
          `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
             <text x="600" y="408" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
                   font-size="86" letter-spacing="16" fill="#f8f5ee">GULABARI</text>
             <text x="600" y="452" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
                   font-size="21" letter-spacing="9" fill="#e8ded0">JAIPUR</text>
             <text x="600" y="516" text-anchor="middle" font-family="Georgia, serif" font-style="italic"
                   font-size="27" fill="#ede5d5">Authentic Sanganeri Hand Block Printing</text>
             <text x="600" y="556" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
                   font-size="15" letter-spacing="6" fill="#c9b9a4">NATURAL BOTANICAL DYES · SINCE 1620</text>
           </svg>`
        ),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 86, mozjpeg: true, progressive: true })
    .toBuffer();

  await writeFile(path.join(IMAGES, "og-gulabari.jpg"), og);
  console.log(`Wrote public/images/og-gulabari.jpg (${kb(og.length)})\n`);

  // --- Favicons -------------------------------------------------------
  const icon = await sharp(path.join(IMAGES, "gulabari-emblem-transparent.png"))
    .resize(512, 512, { fit: "contain", background: { r: 248, g: 245, b: 238, alpha: 1 } })
    .png()
    .toBuffer();
  const appleIcon = await sharp(icon).resize(180, 180).png().toBuffer();

  await mkdir(path.join(ROOT, "src", "app"), { recursive: true });
  await writeFile(path.join(ROOT, "src", "app", "icon.png"), icon);
  await writeFile(path.join(ROOT, "src", "app", "apple-icon.png"), appleIcon);
  console.log("Wrote src/app/icon.png + src/app/apple-icon.png\n");
}

async function main() {
  await optimizePhotographs();
  await writeBlurMap();
  await buildSocialAndIcons();
  console.log("Image pipeline complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
