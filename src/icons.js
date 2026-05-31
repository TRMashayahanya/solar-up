import React from "react";
import { SUN_RING, SUN_RAY_D } from "./sun-icon-geometry.js";

function Svg(p) {
  const s = p.s || 18;
  const c = p.c || "currentColor";
  return React.createElement(
    "svg",
    {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: c,
      strokeWidth: p.sw || "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    p.children
  );
}

const path = (d) => React.createElement("path", { d });
const line = (x1, y1, x2, y2) => React.createElement("line", { x1, y1, x2, y2 });
const poly = (pts) => React.createElement("polygon", { points: pts });
const rect = (a) => React.createElement("rect", a);
const circ = (a) => React.createElement("circle", a);
const pline = (pts) => React.createElement("polyline", { points: pts });

export function SunIco(p) {
  return React.createElement(
    Svg,
    { s: p.s || 20, c: p.c, sw: "1.2" },
    circ({ cx: String(SUN_RING.cx), cy: String(SUN_RING.cy), r: String(SUN_RING.r) }),
    path(SUN_RAY_D)
  );
}
export function LeafIco(p) {
  return React.createElement(Svg, { s: p.s || 18, c: p.c, sw: "1.2" }, path("M11 20A7 7 0 014 13c0-6 7-11 7-11s7 5 7 11a7 7 0 01-7 7z"), path("M11 20v-9"));
}
export function HomeIco(p) {
  return React.createElement(Svg, { s: p.s || 24, c: p.c, sw: "1.2" }, path("M3 10L12 3l9 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1z"), path("M9 21V12h6v9"));
}
export function AptIco(p) {
  return React.createElement(Svg, { s: p.s || 24, c: p.c, sw: "1.2" }, rect({ x: "3", y: "2", width: "18", height: "20", rx: "1" }), path("M9 2v20M3 8h6M3 13h6M3 18h6M15 8h3M15 13h3M15 18h3"));
}
export function OffIco(p) {
  return React.createElement(Svg, { s: p.s || 24, c: p.c, sw: "1.2" }, path("M2 20h20M4 20V8l8-6 8 6v12"), path("M10 20v-5h4v5"), path("M9 10h2M13 10h2M9 14h2M13 14h2"));
}
export function ShpIco(p) {
  return React.createElement(Svg, { s: p.s || 24, c: p.c, sw: "1.2" }, path("M3 9l1-6h16l1 6"), path("M3 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0"), path("M5 21V9M19 9v12M5 21h14M9 21v-5h6v5"));
}
export function FrmIco(p) {
  return React.createElement(Svg, { s: p.s || 24, c: p.c, sw: "1.2" }, path("M3 21h18M5 21V10l7-7 7 7v11"), path("M10 21v-6h4v6"), path("M15 10h3v5h-3z"));
}
export function SchIco(p) {
  return React.createElement(Svg, { s: p.s || 24, c: p.c, sw: "1.2" }, path("M22 10v11H2V10l10-8z"), path("M6 21v-7h12v7M12 2v6"));
}
export function EstIco(p) {
  return React.createElement(Svg, { s: p.s || 24, c: p.c, sw: "1.2" }, path("M2 20h20M4 20V9l5-5h6l5 5v11"), path("M9 20v-6h6v6M9 9h6"));
}
export function ZapIco(p) {
  return React.createElement(Svg, { s: p.s || 16, c: p.c }, poly("13 2 3 14 12 14 11 22 21 10 12 10 13 2"));
}
export function BatIco(p) {
  return React.createElement(Svg, { s: p.s || 16, c: p.c }, rect({ x: "2", y: "7", width: "16", height: "10", rx: "2" }), path("M22 11v2"), path("M7 12h6"));
}
export function PanIco(p) {
  return React.createElement(Svg, { s: p.s || 16, c: p.c }, rect({ x: "2", y: "4", width: "20", height: "14", rx: "2" }), line("8", "4", "8", "18"), line("14", "4", "14", "18"), line("2", "11", "22", "11"));
}
export function ShldIco(p) {
  return React.createElement(Svg, { s: p.s || 16, c: p.c }, path("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"));
}
export function ArrRIco(p) {
  return React.createElement(Svg, { s: p.s || 15, c: p.c, sw: "1.8" }, path("M5 12h14M12 5l7 7-7 7"));
}
export function ArrLIco(p) {
  return React.createElement(Svg, { s: p.s || 15, c: p.c, sw: "1.8" }, path("M19 12H5M12 19l-7-7 7-7"));
}
export function ChatIco(p) {
  return React.createElement(Svg, { s: p.s || 16, c: p.c, sw: "1.5" }, path("M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"));
}
export function SndIco(p) {
  return React.createElement(Svg, { s: p.s || 14, c: p.c, sw: "1.8" }, line("22", "2", "11", "13"), poly("22 2 15 22 11 13 2 9 22 2"));
}
export function XcoIco(p) {
  return React.createElement(Svg, { s: p.s || 14, c: p.c, sw: "2" }, line("18", "6", "6", "18"), line("6", "6", "18", "18"));
}
export function BotIco(p) {
  return React.createElement(Svg, { s: p.s || 18, c: p.c }, rect({ x: "3", y: "8", width: "18", height: "13", rx: "2" }), path("M12 8V4M8 4h8M8 14h.01M16 14h.01M9 18h6"));
}
export function RetIco(p) {
  return React.createElement(Svg, { s: p.s || 14, c: p.c, sw: "1.8" }, pline("1 4 1 10 7 10"), path("M3.51 15a9 9 0 102.13-9.36L1 10"));
}
export function SpkIco(p) {
  return React.createElement(Svg, { s: p.s || 14, c: p.c }, path("M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"));
}
export function MinIco(p) {
  return React.createElement(Svg, { s: p.s || 13, c: p.c, sw: "2.2" }, line("5", "12", "19", "12"));
}
export function PlsIco(p) {
  return React.createElement(Svg, { s: p.s || 13, c: p.c, sw: "2.2" }, line("12", "5", "12", "19"), line("5", "12", "19", "12"));
}
export function PrtIco(p) {
  return React.createElement(Svg, { s: p.s || 15, c: p.c, sw: "1.8" }, path("M6 9V2h12v7"), path("M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"), rect({ x: "6", y: "14", width: "12", height: "8" }));
}
export function UsrIco(p) {
  return React.createElement(Svg, { s: p.s || 16, c: p.c }, path("M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"), circ({ cx: "12", cy: "7", r: "4" }));
}
export function PhIco(p) {
  return React.createElement(Svg, { s: p.s || 16, c: p.c }, path("M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"));
}
export function LocIco(p) {
  return React.createElement(Svg, { s: p.s || 16, c: p.c }, path("M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"), circ({ cx: "12", cy: "10", r: "3" }));
}
export function VanIco(p) {
  return React.createElement(
    Svg,
    { s: p.s || 18, c: p.c, sw: "1.5" },
    path("M3 8h11v8H3V8z"),
    path("M14 10h4l3 4v2h-7v-6z"),
    circ({ cx: "7", cy: "18", r: "2" }),
    circ({ cx: "17", cy: "18", r: "2" }),
    line("3", "8", "5", "4"),
    line("14", "10", "12", "4")
  );
}
export function NoteIco(p) {
  return React.createElement(Svg, { s: p.s || 16, c: p.c }, path("M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"), pline("14 2 14 8 20 8"), line("16", "13", "8", "13"), line("16", "17", "8", "17"), pline("10 9 9 9 8 9"));
}
export function SearchIco(p) {
  return React.createElement(
    Svg,
    { s: p.s || 18, c: p.c, sw: "1.8" },
    circ({ cx: "11", cy: "11", r: "7" }),
    line("20", "20", "16.5", "16.5")
  );
}
export function WalletIco(p) {
  return React.createElement(
    Svg,
    { s: p.s || 18, c: p.c, sw: "1.5" },
    path("M19 7H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z"),
    path("M16 14h.01"),
    path("M3 10h18")
  );
}

export function NavHomeIco(p) {
  return React.createElement(Svg, { s: p.s || 22, c: p.c, sw: "1.5" }, path("M4 10.5L12 4l8 6.5V19a1 1 0 01-1 1H5a1 1 0 01-1-1v-8.5z"));
}
export function NavCatalogIco(p) {
  return React.createElement(Svg, { s: p.s || 22, c: p.c, sw: "1.5" }, rect({ x: "4", y: "4", width: "7", height: "7", rx: "1.5" }), rect({ x: "13", y: "4", width: "7", height: "7", rx: "1.5" }), rect({ x: "4", y: "13", width: "7", height: "7", rx: "1.5" }), rect({ x: "13", y: "13", width: "7", height: "7", rx: "1.5" }));
}
export function NavSizeIco(p) {
  return React.createElement(Svg, { s: p.s || 22, c: p.c, sw: "1.5" }, line("4", "6", "20", "6"), line("4", "12", "20", "12"), line("4", "18", "20", "18"), circ({ cx: "8", cy: "6", r: "1.2", fill: p.c || "currentColor", stroke: "none" }), circ({ cx: "14", cy: "12", r: "1.2", fill: p.c || "currentColor", stroke: "none" }), circ({ cx: "10", cy: "18", r: "1.2", fill: p.c || "currentColor", stroke: "none" }));
}
export function NavQuoteIco(p) {
  return React.createElement(Svg, { s: p.s || 22, c: p.c, sw: "1.5" }, path("M8 4h11a1 1 0 011 1v12a1 1 0 01-1 1H9l-4 3V5a1 1 0 011-1z"), line("9", "9", "17", "9"), line("9", "13", "14", "13"));
}
export function MoonIco(p) {
  return React.createElement(Svg, { s: p.s || 18, c: p.c, sw: "1.3" }, path("M20 14.5A8.5 8.5 0 1111.5 4a6.5 6.5 0 108.5 10.5z"));
}
/** Light mode — bulb, not the brand sun. */
export function BulbIco(p) {
  return React.createElement(
    Svg,
    { s: p.s || 18, c: p.c, sw: "1.35" },
    path("M9 18h6"),
    path("M10 22h4"),
    path("M12 2a6 6 0 016 6c0 2.2-1.1 4.1-2.8 5.3L14 16h-4l-.2-2.7C8.1 12.1 7 10.2 7 8a6 6 0 016-6z")
  );
}
