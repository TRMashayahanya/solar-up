import React from "react";

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
      "aria-hidden": true,
    },
    p.children
  );
}

const path = (d) => React.createElement("path", { d });
const line = (x1, y1, x2, y2) => React.createElement("line", { x1, y1, x2, y2 });
const rect = (a) => React.createElement("rect", a);
const circ = (a) => React.createElement("circle", a);

export function LedIco(p) {
  return React.createElement(Svg, p, path("M9 18h6M10 22h4M12 6a4 4 0 014 4c0 2-2 3-2 5H10c0-2-2-3-2-4a4 4 0 014-4z"));
}
export function FanIco(p) {
  return React.createElement(Svg, p, path("M12 12c2.5-4 7-4 7 0s-4.5 4-7 0-7-4-7 0 4.5 4 7 0z"), path("M12 12v10"));
}
export function WifiIco(p) {
  return React.createElement(Svg, p, path("M5 12.55a11 11 0 0114 0M8.5 16.42a6 6 0 017 0M12 20h.01"));
}
export function PhoneIco(p) {
  return React.createElement(Svg, p, path("M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"));
}
export function TvIco(p) {
  return React.createElement(Svg, p, path("M7 21h10M9 17V7a2 2 0 012-2h2a2 2 0 012 2v10"));
}
export function AcIco(p) {
  return React.createElement(Svg, p, path("M12 2v20M2 12h20M5 5l14 14M19 5L5 19"));
}
export function SatelliteIco(p) {
  return React.createElement(Svg, p, path("M4.9 4.9l4.2 4.2M16.1 16.1l4.2 4.2M2 12h4M18 12h4M12 2v4M12 18v4"));
}
export function FridgeIco(p) {
  return React.createElement(Svg, p, rect({ x: "6", y: "2", width: "12", height: "20", rx: "2" }), line("6", "10", "18", "10"), line("9", "6", "9", "8"));
}
export function FreezerIco(p) {
  return React.createElement(Svg, p, rect({ x: "6", y: "2", width: "12", height: "20", rx: "2" }), line("12", "6", "12", "18"), line("8", "10", "16", "10"), line("8", "14", "16", "14"));
}
export function KettleIco(p) {
  return React.createElement(Svg, p, path("M6 8h12l-1 10a2 2 0 01-2 2H9a2 2 0 01-2-2L6 8z"), path("M6 8V6a2 2 0 012-2h1"));
}
export function MicroIco(p) {
  return React.createElement(Svg, p, rect({ x: "4", y: "8", width: "16", height: "12", rx: "2" }), line("8", "4", "8", "8"), line("16", "4", "16", "8"), line("12", "12", "12", "16"));
}
export function ShowerIco(p) {
  return React.createElement(Svg, p, path("M4 4h16v4a6 6 0 01-6 6v6"), line("8", "20", "16", "20"));
}
export function CameraIco(p) {
  return React.createElement(Svg, p, path("M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"), circ({ cx: "12", cy: "13", r: "4" }));
}
export function BellIco(p) {
  return React.createElement(Svg, p, path("M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"), path("M13.73 21a2 2 0 01-3.46 0"));
}
export function GateIco(p) {
  return React.createElement(Svg, p, path("M3 21h18M5 21V7l7-5 7 5v14"), line("9", "21", "9", "13"), line("15", "21", "15", "13"));
}
export function PoolIco(p) {
  return React.createElement(Svg, p, path("M2 12c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4 2-4 4-4 2 4 4 4"));
}
export function PumpIco(p) {
  return React.createElement(Svg, p, line("12", "2", "12", "8"), path("M8 6l4-4 4 4"), line("6", "14", "18", "14"), line("8", "18", "16", "18"), line("12", "10", "12", "22"));
}
export function LaptopIco(p) {
  return React.createElement(Svg, p, rect({ x: "4", y: "6", width: "16", height: "10", rx: "1" }), line("2", "18", "22", "18"));
}
export function MonitorIco(p) {
  return React.createElement(Svg, p, rect({ x: "4", y: "5", width: "16", height: "11", rx: "1" }), line("8", "20", "16", "20"));
}
export function PrinterIco(p) {
  return React.createElement(Svg, p, path("M6 9V3h12v6"), rect({ x: "6", y: "14", width: "12", height: "7" }), path("M6 18H4a2 2 0 01-2-2v-5h20v5a2 2 0 01-2 2h-2"));
}
export function WasherIco(p) {
  return React.createElement(Svg, p, rect({ x: "5", y: "3", width: "14", height: "18", rx: "2" }), circ({ cx: "12", cy: "13", r: "4" }));
}
export function DryerIco(p) {
  return React.createElement(Svg, p, rect({ x: "5", y: "3", width: "14", height: "18", rx: "2" }), line("12", "7", "12", "17"), line("9", "12", "15", "12"));
}

export function BedIco(p) {
  return React.createElement(Svg, p, path("M3 7v11M3 7h18v4H3z"), line("7", "7", "7", "5"), line("11", "5", "11", "7"), line("5", "15", "19", "15"));
}
export function SofaIco(p) {
  return React.createElement(Svg, p, path("M4 12V8a2 2 0 012-2h12a2 2 0 012 2v4"), path("M4 12v4h16v-4"), line("6", "16", "6", "18"), line("18", "16", "18", "18"));
}
export function KitchenIco(p) {
  return React.createElement(Svg, p, rect({ x: "4", y: "4", width: "16", height: "4", rx: "1" }), line("6", "8", "6", "20"), line("18", "8", "18", "20"), line("10", "12", "14", "12"));
}
export function LockIco(p) {
  return React.createElement(Svg, p, path("M7 11V7a5 5 0 0110 0v4"), rect({ x: "5", y: "11", width: "14", height: "10", rx: "2" }));
}
export function DropletIco(p) {
  return React.createElement(Svg, p, path("M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"));
}
export function DeskIco(p) {
  return React.createElement(Svg, p, line("3", "10", "21", "10"), path("M5 10V6h14v4"), line("8", "14", "8", "18"), line("16", "14", "16", "18"));
}
export function WashIco(p) {
  return React.createElement(Svg, p, path("M6 3h12l1 3H5l1-3z"), rect({ x: "4", y: "9", width: "16", height: "12", rx: "1" }));
}
export function SparkIco(p) {
  return React.createElement(Svg, p, path("M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z"));
}
export function DefaultIco(p) {
  return React.createElement(Svg, p, circ({ cx: "12", cy: "12", r: "3" }), path("M12 2v2M12 20v2M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"));
}

const APPLIANCE_MAP = {
  led: LedIco,
  fan: FanIco,
  wifi: WifiIco,
  phone: PhoneIco,
  tv: TvIco,
  ac: AcIco,
  satellite: SatelliteIco,
  fridge: FridgeIco,
  freezer: FreezerIco,
  kettle: KettleIco,
  microwave: MicroIco,
  shower: ShowerIco,
  camera: CameraIco,
  bell: BellIco,
  gate: GateIco,
  pool: PoolIco,
  pump: PumpIco,
  laptop: LaptopIco,
  monitor: MonitorIco,
  printer: PrinterIco,
  washer: WasherIco,
  dryer: DryerIco,
  other: DefaultIco,
};

const CATEGORY_MAP = {
  essentials: SparkIco,
  accessories: LaptopIco,
  bedroom: BedIco,
  lounge: SofaIco,
  kitchen: KitchenIco,
  bathroom: ShowerIco,
  outdoor: LockIco,
  water: DropletIco,
  laundry: WashIco,
  other: DefaultIco,
};

export function ApplianceIcon({ iconKey, s = 18, c = "currentColor" }) {
  const Ico = APPLIANCE_MAP[iconKey] || DefaultIco;
  return React.createElement(Ico, { s, c });
}

export function CategoryIcon({ iconKey, s = 16, c = "currentColor" }) {
  const Ico = CATEGORY_MAP[iconKey] || DefaultIco;
  return React.createElement(Ico, { s, c });
}

export function IconTile({ children, size = 40, color = "#E8C547", active }) {
  return React.createElement(
    "div",
    {
      style: {
        width: size,
        height: size,
        borderRadius: size > 36 ? 10 : 8,
        background: active ? color + "22" : "rgba(255,255,255,.04)",
        border: "1px solid " + (active ? color + "55" : "rgba(255,255,255,.1)"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: color,
      },
    },
    children
  );
}
