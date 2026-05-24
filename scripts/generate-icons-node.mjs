#!/usr/bin/env node
/** Build PNG icons without npm — uses macOS sips (PPM → PNG). */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const iconsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "icons");

function drawIcon(size) {
  const bg = [10, 18, 8];
  const gold = [232, 197, 71];
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.22;
  const stroke = Math.max(2, Math.round(size / 28));
  const data = Buffer.alloc(size * size * 3);

  function setPixel(x, y, rgb) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 3;
    data[i] = rgb[0];
    data[i + 1] = rgb[1];
    data[i + 2] = rgb[2];
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= r) {
        if (d >= r - stroke) setPixel(x, y, gold);
        else setPixel(x, y, bg);
      } else setPixel(x, y, bg);
    }
  }

  const header = Buffer.from(`P6\n${size} ${size}\n255\n`, "ascii");
  return Buffer.concat([header, data]);
}

function toPng(ppmPath, pngPath) {
  execFileSync("sips", ["-s", "format", "png", ppmPath, "--out", pngPath], {
    stdio: "pipe",
  });
}

for (const [size, name] of [
  [192, "icon-192.png"],
  [512, "icon-512.png"],
  [180, "apple-touch-icon.png"],
]) {
  const ppm = path.join(iconsDir, `_tmp-${size}.ppm`);
  const png = path.join(iconsDir, name);
  fs.writeFileSync(ppm, drawIcon(size));
  toPng(ppm, png);
  fs.unlinkSync(ppm);
  console.log("Created", name);
}
