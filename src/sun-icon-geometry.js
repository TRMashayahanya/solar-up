/**
 * SolarApp sun mark — single source of truth for in-app SunIco and install/PWA icons.
 * viewBox 0 0 24 24 · stroke-only · stroke-width 1.2 · #E8C547 on #040608
 */

export const ICON_VERSION = "sun4";
export const SUN_VIEWBOX = 24;

export const SUN_BG = "#040608";
export const SUN_STROKE = "#E8C547";
export const SUN_STROKE_WIDTH = 1.2;

export const SUN_RING = { cx: 12, cy: 12, r: 4.5 };

/** Same path as SunIco — do not edit without updating the rasterizer. */
export const SUN_RAY_D =
  "M12 1.5v3M12 19.5v3M3.22 3.22l2.12 2.12M18.66 18.66l2.12 2.12M1.5 12h3M19.5 12h3M3.22 20.78l2.12-2.12M18.66 5.34l2.12-2.12";

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

/** Furthest ray tip from centre (12,12) — used to fit the mark in the tile safe zone. */
export const SUN_OUTER_RADIUS = 12.414;

/** iOS / maskable safe inset — ~10% margin on each side of the 24×24 tile. */
export const ICON_TILE_CORNER_RX = 5.0625;
export const ICON_SUN_SCALE = (SUN_VIEWBOX / 2 - 2.55) / SUN_OUTER_RADIUS;

export function mapIconPoint(x, y) {
  return [(x - 12) * ICON_SUN_SCALE + 12, (y - 12) * ICON_SUN_SCALE + 12];
}

export function sunIconSvgMarkup() {
  const t = `translate(12 12) scale(${ICON_SUN_SCALE}) translate(-12 -12)`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SUN_VIEWBOX} ${SUN_VIEWBOX}" fill="none">`,
    `<rect width="${SUN_VIEWBOX}" height="${SUN_VIEWBOX}" rx="${ICON_TILE_CORNER_RX}" fill="${SUN_BG}"/>`,
    `<g transform="${t}" stroke="${SUN_STROKE}" stroke-width="${SUN_STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round">`,
    `<circle cx="${SUN_RING.cx}" cy="${SUN_RING.cy}" r="${SUN_RING.r}"/>`,
    `<path d="${SUN_RAY_D}"/>`,
    `</g>`,
    `</svg>`,
  ].join("");
}
