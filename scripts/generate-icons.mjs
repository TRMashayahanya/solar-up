#!/usr/bin/env node
/**
 * Creates PNG icons for iOS/Android install (run once before publish).
 * Requires: npx (comes with Node) — no project install needed.
 *
 *   node scripts/generate-icons.mjs
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "icons");
const svg = path.join(dir, "icon.svg");

if (!fs.existsSync(svg)) {
  console.error("Missing icons/icon.svg");
  process.exit(1);
}

const sizes = [
  [192, "icon-192.png"],
  [512, "icon-512.png"],
  [180, "apple-touch-icon.png"],
];

console.log("Generating PNG icons with npx sharp…");
for (const [size, name] of sizes) {
  const out = path.join(dir, name);
  const code = `
    const sharp = require('sharp');
    sharp(${JSON.stringify(svg)})
      .resize(${size}, ${size})
      .png()
      .toFile(${JSON.stringify(out)})
      .then(() => console.log('wrote ${name}'))
      .catch(e => { console.error(e); process.exit(1); });
  `;
  execSync(`npx --yes sharp-cli resize ${size} ${size} -i "${svg}" -o "${out}" 2>/dev/null || npx --yes -p sharp -e ${JSON.stringify(code)}`, {
    stdio: "inherit",
    cwd: path.join(dir, ".."),
  });
}
console.log("Done. Commit icons/*.png before deploying.");
