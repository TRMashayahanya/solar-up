#!/usr/bin/env node
/**
 * Build PNG app icons — rasterize sun-icon-geometry (same as home SunIco).
 * macOS: uses sips for PPM → PNG.
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  SUN_VIEWBOX,
  SUN_BG,
  SUN_STROKE,
  SUN_STROKE_WIDTH,
  SUN_ICON_CORNER_RX,
  SUN_RING,
  SUN_RAY_SEGMENTS,
  sunGlowRadiusPx,
  sunIconSvgMarkup,
} from "../src/sun-icon-geometry.js";

const iconsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "icons");

const BG = [4, 6, 8];
const GOLD = [232, 197, 71];

function distToSegment(px, py, x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - x0, py - y0);
  let t = ((px - x0) * dx + (py - y0) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x0 + t * dx), py - (y0 + t * dy));
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function insideRoundRect(x, y, size, cornerR) {
  if (x < 0 || y < 0 || x >= size || y >= size) return false;
  const r = cornerR;
  if (x < r && y < r && Math.hypot(r - x, r - y) > r) return false;
  if (x >= size - r && y < r && Math.hypot(x - (size - r), r - y) > r) return false;
  if (x < r && y >= size - r && Math.hypot(r - x, y - (size - r)) > r) return false;
  if (x >= size - r && y >= size - r && Math.hypot(x - (size - r), y - (size - r)) > r) return false;
  return true;
}

function drawIcon(size) {
  const scale = size / SUN_VIEWBOX;
  const cx = (SUN_RING.cx * size) / SUN_VIEWBOX;
  const cy = (SUN_RING.cy * size) / SUN_VIEWBOX;
  const ringR = SUN_RING.r * scale;
  const strokeW = SUN_STROKE_WIDTH * scale;
  const halfStroke = strokeW / 2;
  const cornerR = SUN_ICON_CORNER_RX * scale;
  const aa = Math.max(0.75, strokeW * 0.12);
  const glowR = sunGlowRadiusPx(size);

  const rays = SUN_RAY_SEGMENTS.map(([x0, y0, x1, y1]) => [
    (x0 * size) / SUN_VIEWBOX,
    (y0 * size) / SUN_VIEWBOX,
    (x1 * size) / SUN_VIEWBOX,
    (y1 * size) / SUN_VIEWBOX,
  ]);

  const data = Buffer.alloc(size * size * 3);

  function setPixel(x, y, rgb) {
    if (!insideRoundRect(x, y, size, cornerR)) return;
    const i = (y * size + x) * 3;
    data[i] = rgb[0];
    data[i + 1] = rgb[1];
    data[i + 2] = rgb[2];
  }

  function blendPixel(x, y, rgb, a) {
    if (!insideRoundRect(x, y, size, cornerR)) return;
    const i = (y * size + x) * 3;
    data[i] = Math.round(data[i] * (1 - a) + rgb[0] * a);
    data[i + 1] = Math.round(data[i + 1] * (1 - a) + rgb[1] * a);
    data[i + 2] = Math.round(data[i + 2] * (1 - a) + rgb[2] * a);
  }

  function strokeCoverage(px, py) {
    let minDist = Infinity;
    for (const [x0, y0, x1, y1] of rays) {
      minDist = Math.min(minDist, distToSegment(px, py, x0, y0, x1, y1));
    }
    const ringDist = Math.abs(Math.hypot(px - cx, py - cy) - ringR);
    minDist = Math.min(minDist, ringDist);
    return smoothstep(halfStroke + aa, halfStroke - aa, minDist);
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!insideRoundRect(x, y, size, cornerR)) continue;
      setPixel(x, y, BG);

      const px = x + 0.5;
      const py = y + 0.5;
      const cov = strokeCoverage(px, py);
      if (cov > 0) blendPixel(x, y, GOLD, cov);

      let minDist = Infinity;
      for (const [x0, y0, x1, y1] of rays) {
        minDist = Math.min(minDist, distToSegment(px, py, x0, y0, x1, y1));
      }
      minDist = Math.min(minDist, Math.abs(Math.hypot(px - cx, py - cy) - ringR));
      if (minDist < glowR) {
        const glowA = 0.38 * (1 - minDist / glowR) * (1 - minDist / glowR);
        if (glowA > 0.01) blendPixel(x, y, GOLD, glowA);
      }
    }
  }

  const header = Buffer.from(`P6\n${size} ${size}\n255\n`, "ascii");
  return Buffer.concat([header, data]);
}

function toPng(ppmPath, pngPath) {
  execFileSync("sips", ["-s", "format", "png", ppmPath, "--out", pngPath], { stdio: "pipe" });
}

fs.writeFileSync(path.join(iconsDir, "icon.svg"), sunIconSvgMarkup() + "\n");
console.log("Wrote icon.svg from sun-icon-geometry");

for (const [size, name] of [
  [192, "icon-192.png"],
  [512, "icon-512.png"],
  [180, "apple-touch-icon.png"],
]) {
  const ppm = path.join(iconsDir, `_tmp-${size}.ppm`);
  const png = path.join(iconsDir, name);
  const ss = size >= 180 ? 2 : 1;
  const renderSize = size * ss;
  fs.writeFileSync(ppm, drawIcon(renderSize));
  toPng(ppm, png);
  fs.unlinkSync(ppm);
  if (ss > 1) {
    execFileSync("sips", ["-z", String(size), String(size), png], { stdio: "pipe" });
  }
  console.log("Created", name, `(${size}px, SunIco geometry${ss > 1 ? ", 2× supersampled" : ""})`);
}
