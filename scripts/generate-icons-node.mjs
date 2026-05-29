#!/usr/bin/env node
/** Build PNG app icons — gold sun on dark background (macOS sips). */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const iconsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "icons");

const BG = [4, 6, 8];
const GOLD = [232, 197, 71];
const GLOW = [232, 197, 71];

function drawIcon(size) {
  const cx = size / 2;
  const cy = size / 2;
  const cornerR = size * 0.211;
  const data = Buffer.alloc(size * size * 3);

  function insideRoundRect(x, y) {
    if (x < 0 || y < 0 || x >= size || y >= size) return false;
    const r = cornerR;
    if (x < r && y < r && Math.hypot(r - x, r - y) > r) return false;
    if (x >= size - r && y < r && Math.hypot(x - (size - r), r - y) > r) return false;
    if (x < r && y >= size - r && Math.hypot(r - x, y - (size - r)) > r) return false;
    if (x >= size - r && y >= size - r && Math.hypot(x - (size - r), y - (size - r)) > r) return false;
    return true;
  }

  function setPixel(x, y, rgb) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    if (!insideRoundRect(x, y)) return;
    const i = (y * size + x) * 3;
    data[i] = rgb[0];
    data[i + 1] = rgb[1];
    data[i + 2] = rgb[2];
  }

  function blendPixel(x, y, rgb, a) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    if (!insideRoundRect(x, y)) return;
    const i = (y * size + x) * 3;
    data[i] = Math.round(data[i] * (1 - a) + rgb[0] * a);
    data[i + 1] = Math.round(data[i + 1] * (1 - a) + rgb[1] * a);
    data[i + 2] = Math.round(data[i + 2] * (1 - a) + rgb[2] * a);
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (insideRoundRect(x, y)) setPixel(x, y, BG);
    }
  }

  const ringR = size * 0.226;
  const ringW = Math.max(3, size * 0.031);
  const coreR = size * 0.086;
  const rayLen = size * 0.195;
  const rayInner = size * 0.117;
  const rayW = Math.max(3, size * 0.035);

  function drawDisc(px, py, radius, rgb, alpha) {
    const r2 = radius * radius;
    for (let y = Math.floor(py - radius); y <= Math.ceil(py + radius); y++) {
      for (let x = Math.floor(px - radius); x <= Math.ceil(px + radius); x++) {
        const d2 = (x - px) ** 2 + (y - py) ** 2;
        if (d2 <= r2) blendPixel(x, y, rgb, alpha);
      }
    }
  }

  function drawRing(px, py, radius, stroke, rgb) {
    const inner = radius - stroke;
    const outer = radius + stroke;
    for (let y = Math.floor(py - outer); y <= Math.ceil(py + outer); y++) {
      for (let x = Math.floor(px - outer); x <= Math.ceil(px + outer); x++) {
        const d = Math.hypot(x - px, y - py);
        if (d >= inner && d <= outer) setPixel(x, y, rgb);
      }
    }
  }

  function drawRay(angle) {
    const x0 = cx + Math.cos(angle) * rayInner;
    const y0 = cy + Math.sin(angle) * rayInner;
    const x1 = cx + Math.cos(angle) * (rayInner + rayLen);
    const y1 = cy + Math.sin(angle) * (rayInner + rayLen);
    const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = x0 + (x1 - x0) * t;
      const py = y0 + (y1 - y0) * t;
      drawDisc(px, py, rayW / 2, GOLD, 1);
    }
  }

  drawDisc(cx, cy, ringR + ringW * 2, GLOW, 0.12);
  for (let i = 0; i < 8; i++) drawRay((Math.PI / 4) * i - Math.PI / 2);
  drawRing(cx, cy, ringR, ringW, GOLD);
  drawDisc(cx, cy, coreR, GOLD, 0.38);

  const header = Buffer.from(`P6\n${size} ${size}\n255\n`, "ascii");
  return Buffer.concat([header, data]);
}

function toPng(ppmPath, pngPath) {
  execFileSync("sips", ["-s", "format", "png", ppmPath, "--out", pngPath], { stdio: "pipe" });
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
