import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ASSETS = join(__dirname, '..', 'src', 'assets');
const OUT = join(ASSETS, 'optimized');

const TARGETS = [
  { match: /^LOGO-KVI\.png$/i, format: 'webp', maxWidth: 600, quality: 90 },
  { match: /^hero_\d+\.jpe?g$/i, format: 'webp', maxWidth: 1920, quality: 78 },
];

const fmtKb = (n) => `${(n / 1024).toFixed(1)} KB`;

async function run() {
  await mkdir(OUT, { recursive: true });
  const files = await readdir(ASSETS);
  let totalIn = 0;
  let totalOut = 0;

  for (const file of files) {
    const target = TARGETS.find((t) => t.match.test(file));
    if (!target) continue;

    const inPath = join(ASSETS, file);
    const { name } = parse(file);
    const outPath = join(OUT, `${name}.${target.format}`);

    const inStat = await stat(inPath);
    let pipeline = sharp(inPath).resize({ width: target.maxWidth, withoutEnlargement: true });

    if (target.format === 'webp') {
      pipeline = pipeline.webp({ quality: target.quality, effort: 6 });
    } else if (target.format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: target.quality, mozjpeg: true });
    } else if (target.format === 'png') {
      pipeline = pipeline.png({ compressionLevel: 9 });
    }

    const info = await pipeline.toFile(outPath);
    totalIn += inStat.size;
    totalOut += info.size;

    const pct = (((inStat.size - info.size) / inStat.size) * 100).toFixed(1);
    console.log(`${file.padEnd(20)} ${fmtKb(inStat.size).padStart(10)}  →  ${fmtKb(info.size).padStart(10)}  (-${pct}%)`);
  }

  const totalPct = (((totalIn - totalOut) / totalIn) * 100).toFixed(1);
  console.log('─'.repeat(60));
  console.log(`TOTAL              ${fmtKb(totalIn).padStart(10)}  →  ${fmtKb(totalOut).padStart(10)}  (-${totalPct}%)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
