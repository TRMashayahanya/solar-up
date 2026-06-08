import { analyzeLoad, pickPackageForLoad, enrichPackage } from "./package-sizing.js";
import { getPackageById } from "./packages.js";

/** Build a quote-ready sizing object from a catalog package (no load survey). */
export function sizeFromPackage(pkgOrId) {
  const raw = typeof pkgOrId === "string" ? getPackageById(pkgOrId) : pkgOrId;
  if (!raw) return null;
  const pkg = enrichPackage(raw);
  const pc = pkg.panelCount;
  const pan = { brand: "JINKO", name: pkg.panelW + "W panels", w: pkg.panelW, price: 0 };
  const bc = pkg.batteryCount;
  const bat = {
    brand: "Lithium",
    name: pkg.includes.find((x) => /battery/i.test(x)) || "Battery bank",
    wh: pkg.usableBatteryWh,
    price: 0,
  };
  const inv = { brand: "Energi Tech", name: pkg.name, kva: pkg.kva, price: pkg.price };
  const dailyGenWh = pkg.dailyGenWh;
  const pW = Math.round(pkg.usableInverterW * 0.65);
  const dWh = Math.round(dailyGenWh * 0.75);
  const sWh = Math.round((dWh / 0.85 / 0.8) * 1.05);
  const bk = pW > 0 ? Math.round((pkg.usableBatteryWh / pW) * 10) / 10 : 0;

  return {
    dWh,
    pW,
    kvaReq: pkg.kva,
    pkg,
    inv,
    bat,
    bc,
    pan,
    pc,
    tot: pkg.price,
    kva: pkg.kva,
    sWh,
    bk,
    dailyGenWh,
    solarCoverage: dWh > 0 ? Math.min(999, Math.round((dailyGenWh / dWh) * 100)) : 0,
    appList: [],
    fromCatalog: true,
    fit: {
      adequate: true,
      customQuote: false,
      peakMargin: 0,
      minKva: pkg.kva,
      requiredInverterW: pkg.usableInverterW,
      requiredBatteryWh: pkg.usableBatteryWh,
      requiredSolarWh: dailyGenWh,
      inverterHeadroomPct: 0,
      notes: [],
    },
  };
}

export function size(list) {
  const load = analyzeLoad(list);
  const pick = pickPackageForLoad(load);
  const { pkg, req, adequate, customQuote, metrics, notes } = pick;

  if (customQuote) {
    const kvaReq = Math.round((req.requiredInverterW / 1000) * 10) / 10;
    return {
      dWh: Math.round(load.dailyWh),
      pW: Math.round(load.peakW),
      kvaReq,
      pkg,
      inv: { brand: "Energi Tech", name: "Custom system", kva: kvaReq, price: 0 },
      bat: { brand: "Lithium", name: "Sized to your load", wh: req.requiredBatteryWh, price: 0 },
      bc: 0,
      pan: { brand: "Solar", name: "Sized to your load", w: 0, price: 0 },
      pc: 0,
      tot: 0,
      kva: kvaReq,
      sWh: Math.round((load.dailyWh / 0.85 / 0.8) * 1.05),
      bk: load.peakW > 0 ? Math.round((req.requiredBatteryWh / load.peakW) * 10) / 10 : 0,
      dailyGenWh: req.requiredSolarWh,
      solarCoverage: 0,
      fit: {
        adequate,
        customQuote: true,
        peakMargin: req.peakMargin,
        minKva: req.minKva,
        requiredInverterW: req.requiredInverterW,
        requiredBatteryWh: req.requiredBatteryWh,
        requiredSolarWh: req.requiredSolarWh,
        inverterHeadroomPct: metrics.inverterHeadroomPct,
        referencePkg: pkg,
        notes,
      },
    };
  }

  const pc = pkg.panelCount;
  const pan = { brand: "JINKO", name: pkg.panelW + "W panels", w: pkg.panelW, price: 0 };
  const bc = pkg.batteryCount;
  const bat = {
    brand: "Lithium",
    name: pkg.includes.find((x) => /battery/i.test(x)) || "Battery bank",
    wh: pkg.usableBatteryWh,
    price: 0,
  };
  const inv = { brand: "Energi Tech", name: pkg.name, kva: pkg.kva, price: pkg.price };

  const dailyGenWh = pkg.dailyGenWh;
  const solarCoverage =
    load.dailyWh > 0 ? Math.min(999, Math.round((dailyGenWh / load.dailyWh) * 100)) : 0;
  const sWh = Math.round((load.dailyWh / 0.85 / 0.8) * 1.05);
  const bk = load.peakW > 0 ? Math.round((pkg.usableBatteryWh / load.peakW) * 10) / 10 : 0;

  return {
    dWh: Math.round(load.dailyWh),
    pW: Math.round(load.peakW),
    kvaReq: Math.round((req.requiredInverterW / 1000) * 10) / 10,
    pkg,
    inv,
    bat,
    bc,
    pan,
    pc,
    tot: pkg.price,
    kva: pkg.kva,
    sWh,
    bk,
    dailyGenWh,
    solarCoverage,
    fit: {
      adequate,
      customQuote: false,
      peakMargin: req.peakMargin,
      minKva: req.minKva,
      requiredInverterW: req.requiredInverterW,
      requiredBatteryWh: req.requiredBatteryWh,
      requiredSolarWh: req.requiredSolarWh,
      inverterHeadroomPct: metrics.inverterHeadroomPct,
      notes,
    },
  };
}

export { downloadQuotePdf as doPrint } from "./pdf.js";
