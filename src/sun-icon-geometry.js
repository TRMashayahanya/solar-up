/**
 * SolarApp sun mark — single source of truth for in-app SunIco and install/PWA icons.
 * viewBox 0 0 24 24 · stroke-only (no fill on ring) · stroke-width 1.2 · #E8C547
 */

export const ICON_VERSION = "sun2";
export const SUN_VIEWBOX = 24;

export const SUN_BG = "#040608";
export const SUN_STROKE = "#E8C547";
export const SUN_STROKE_WIDTH = 1.2;

/** Rounded app-tile corner radius in viewBox units (≈108px at 512). */
export const SUN_ICON_CORNER_RX = 5.0625;

export const SUN_RING = { cx: 12, cy: 12, r: 4.5 };

/** Same path as SunIco — do not edit without updating the rasterizer. */
export const SUN_RAY_D =
  "M12 1.5v3M12 19.5v3M3.22 3.22l2.12 2.12M18.66 18.66l2.12 2.12M1.5 12h3M19.5 12h3M3.22 20.78l2.12-2.12M18.66 5.34l2.12-2.12";

/** Line segments [x0, y0, x1, y1] in viewBox coordinates. */
export const SUN_RAY_SEGMENTS = [
  [12, 1.5, 12, 4.5],
  [12, 19.5, 12, 22.5],
  [3.22, 3.22, 5.34, 5.34],
  [18.66, 18.66, 20.78, 20.78],
  [1.5, 12, 4.5, 12],
  [19.5, 12, 22.5, 12],
  [3.22, 20.78, 5.34, 18.66],
  [18.66, 5.34, 20.78, 3.22],
];

/** Drop-shadow on home brand at 28px — scale glow for raster icons. */
export function sunGlowRadiusPx(iconPx) {
  return (14 * iconPx) / 28;
}

export function sunIconSvgMarkup() {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SUN_VIEWBOX} ${SUN_VIEWBOX}" fill="none">` +
    `<rect width="${SUN_VIEWBOX}" height="${SUN_VIEWBOX}" rx="${SUN_ICON_CORNER_RX}" fill="${SUN_BG}"/>` +
    `<g stroke="${SUN_STROKE}" stroke-width="${SUN_STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round">` +
    `<circle cx="${SUN_RING.cx}" cy="${SUN_RING.cy}" r="${SUN_RING.r}"/>` +
    `<path d="${SUN_RAY_D}"/>` +
    `</g></svg>`
  );
}
