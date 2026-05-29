import { PACKAGES } from "./packages.js";

export const SUN_HOURS = 5.5;
export const ARRAY_EFF = 0.77;
export const BATTERY_USABLE_FRAC = 0.8;
/** Conservative usable output from hybrid inverter kVA (W). */
export const INV_UTIL = 0.88;
/** Daily solar generation must cover load × this factor. */
export const SOLAR_LOAD_MARGIN = 1.15;
/** Minimum backup hours at peak load when battery is the limit. */
export const MIN_BACKUP_HOURS = 4;
/** Night / cloudy reserve as fraction of daily Wh. */
export const BATTERY_DAILY_FRAC = 0.38;

const BATTERY_RE =
  /(?:(\d+)\s*x\s*)?(\d+)\s*v\s*(\d+)\s*ah/gi;

function parseBatteryNominalWh(includes) {
  let total = 0;
  const text = (includes || []).join(" ");
  let m;
  BATTERY_RE.lastIndex = 0;
  while ((m = BATTERY_RE.exec(text))) {
    const count = m[1] ? parseInt(m[1], 10) : 1;
    const volts = parseInt(m[2], 10);
    const ah = parseInt(m[3], 10);
    total += count * volts * ah;
  }
  return total;
}

export function enrichPackage(pkg) {
  const batteryNominalWh = parseBatteryNominalWh(pkg.includes);
  const usableBatteryWh = Math.round(batteryNominalWh * BATTERY_USABLE_FRAC);
  const dailyGenWh = Math.round(pkg.panelCount * pkg.panelW * SUN_HOURS * ARRAY_EFF);
  const usableInverterW = Math.round(pkg.kva * 1000 * INV_UTIL);
  return {
    ...pkg,
    batteryNominalWh,
    usableBatteryWh,
    dailyGenWh,
    usableInverterW,
  };
}

export const PACKAGES_RICH = PACKAGES.map(enrichPackage);

/**
 * @param {{ id?: string, label?: string, w: number, h: number }[]} list
 */
export function analyzeLoad(list) {
  let peakW = 0;
  let dailyWh = 0;
  const items = list || [];
  const flags = {
    geyser: false,
    acLarge: false,
    acSmall: false,
    borehole: false,
    boreholeLarge: false,
    pool: false,
    gate: false,
    dryer: false,
    deepFreezer: false,
    washingMachine: false,
  };

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const w = it.w || 0;
    const h = it.h || 0;
    peakW += w;
    dailyWh += w * h;
    const t = ((it.id || "") + " " + (it.label || "")).toLowerCase();

    if (/geyser|water heater|shower/i.test(t)) flags.geyser = true;
    if (/deep freezer|deep freeze/i.test(t)) flags.deepFreezer = true;
    if (/freezer/i.test(t) && !flags.deepFreezer) flags.deepFreezer = /deep|chest/i.test(t);
    if (/borehole|booster pump/i.test(t)) {
      flags.borehole = true;
      if (w >= 1200) flags.boreholeLarge = true;
    }
    if (/pool pump|pool/i.test(t)) flags.pool = true;
    if (/gate motor|gate/i.test(t)) flags.gate = true;
    if (/dryer|tumble/i.test(t)) flags.dryer = true;
    if (/washing machine|washer/i.test(t)) flags.washingMachine = true;
    if (/\bac\b|air con|aircon|hp\)/i.test(t) || /ac \(/i.test(t)) {
      if (w >= 1500) flags.acLarge = true;
      else flags.acSmall = true;
    }
  }

  return { peakW, dailyWh, flags, items };
}

/** Minimum package tier from appliance mix (matches Energi Tech package intent). */
export function minKvaFromFlags(flags, peakW) {
  if (flags.geyser || flags.dryer || flags.acLarge || peakW > 4500) return 6.2;
  if (flags.pool || flags.boreholeLarge || flags.acSmall || peakW > 3200) return 5.5;
  if (flags.borehole || flags.deepFreezer || peakW > 2400) return 3.5;
  if (peakW > 1800) return 4.2;
  return 3.2;
}

export function peakMarginFromFlags(flags) {
  let margin = 1.22;
  if (flags.geyser) margin = Math.max(margin, 1.38);
  if (flags.acLarge || flags.dryer) margin = Math.max(margin, 1.35);
  if (flags.boreholeLarge || flags.pool) margin = Math.max(margin, 1.28);
  if (flags.washingMachine || flags.gate) margin = Math.max(margin, 1.25);
  return margin;
}

function backupHoursRequired(peakW, dailyWh, flags) {
  let hours = MIN_BACKUP_HOURS;
  if (dailyWh > 12000 || flags.geyser) hours = 5;
  if (dailyWh > 20000 || flags.acLarge) hours = 6;
  return hours;
}

/** Per-appliance backup need — avoids sizing 5h at geyser peak when it runs ~1h/day. */
function batteryWhRequired(list, peakW, dailyWh, flags) {
  const hours = backupHoursRequired(peakW, dailyWh, flags);
  let fromLoads = 0;

  for (let i = 0; i < list.length; i++) {
    const it = list[i];
    const w = it.w || 0;
    const runH = it.h || 0;
    if (w <= 0) continue;

    const t = ((it.id || "") + " " + (it.label || "")).toLowerCase();
    const shortCycle =
      runH <= 2 && w >= 800 && (/geyser|washer|dryer|kettle|iron|microwave|pump|gate/i.test(t) || w >= 1500);

    if (shortCycle) {
      fromLoads += w * Math.min(1.5, hours);
      fromLoads += w * runH * 0.3;
    } else {
      fromLoads += w * Math.min(runH, hours);
    }
  }

  return Math.max(fromLoads, dailyWh * BATTERY_DAILY_FRAC);
}

function packageMeetsLoad(pkg, req) {
  const invOk = pkg.usableInverterW >= req.requiredInverterW;
  const batOk = pkg.usableBatteryWh >= req.requiredBatteryWh;
  const solarOk = pkg.dailyGenWh >= req.requiredSolarWh;
  return invOk && batOk && solarOk;
}

function fitMetrics(pkg, req, peakW) {
  const backupHoursAtPeak =
    peakW > 0 ? Math.round((pkg.usableBatteryWh / peakW) * 10) / 10 : 0;
  const solarCoverage =
    req.dailyWh > 0 ? Math.min(999, Math.round((pkg.dailyGenWh / req.dailyWh) * 100)) : 0;
  return {
    backupHoursAtPeak,
    solarCoverage,
    inverterHeadroomPct:
      req.requiredInverterW > 0
        ? Math.round(((pkg.usableInverterW - req.requiredInverterW) / req.requiredInverterW) * 100)
        : 0,
  };
}

/**
 * Pick smallest package that satisfies inverter, battery, and solar constraints.
 * @param {{ peakW: number, dailyWh: number, flags: object }} load
 */
export function pickPackageForLoad(load) {
  const peakW = load.peakW || 0;
  const dailyWh = load.dailyWh || 0;
  const flags = load.flags || {};
  const items = load.items || [];
  const peakMargin = peakMarginFromFlags(flags);
  const minKva = minKvaFromFlags(flags, peakW);

  const req = {
    dailyWh,
    requiredInverterW: Math.ceil(peakW * peakMargin),
    requiredBatteryWh: Math.ceil(batteryWhRequired(items, peakW, dailyWh, flags)),
    requiredSolarWh: Math.ceil(dailyWh * SOLAR_LOAD_MARGIN),
    peakMargin,
    minKva,
  };

  const sorted = [...PACKAGES_RICH].sort((a, b) => a.kva - b.kva);
  const floor = sorted.filter((p) => p.kva >= minKva);

  for (let i = 0; i < floor.length; i++) {
    const pkg = floor[i];
    if (packageMeetsLoad(pkg, req)) {
      const metrics = fitMetrics(pkg, req, peakW);
      return {
        pkg,
        req,
        adequate: true,
        customQuote: false,
        metrics,
        notes: buildFitNotes(pkg, req, metrics, peakW),
      };
    }
  }

  const largest = sorted[sorted.length - 1];
  const metrics = fitMetrics(largest, req, peakW);

  if (packageMeetsLoad(largest, req)) {
    return {
      pkg: largest,
      req,
      adequate: true,
      customQuote: false,
      metrics,
      notes: buildFitNotes(largest, req, metrics, peakW),
    };
  }

  return {
    pkg: largest,
    req,
    adequate: false,
    customQuote: true,
    metrics,
    notes: buildCustomQuoteNotes(load, req, largest, peakW),
  };
}

function buildCustomQuoteNotes(load, req, largest, peakW) {
  const gaps = [];
  if (largest.usableInverterW < req.requiredInverterW) {
    gaps.push(
      "Inverter need ~" +
        Math.ceil(req.requiredInverterW / 100) / 10 +
        " kW+ (largest package " +
        largest.kva +
        " kVA)"
    );
  }
  if (largest.usableBatteryWh < req.requiredBatteryWh) {
    gaps.push(
      "Battery need ~" +
        Math.round(req.requiredBatteryWh / 1000) +
        " kWh+ (10.2Kva package ~" +
        Math.round(largest.usableBatteryWh / 1000) +
        " kWh usable)"
    );
  }
  if (largest.dailyGenWh < req.requiredSolarWh) {
    gaps.push(
      "Solar need ~" +
        Math.round(req.requiredSolarWh / 1000) +
        " kWh/day yield (largest ~" +
        Math.round(largest.dailyGenWh / 1000) +
        " kWh/day)"
    );
  }

  const notes = [
    "Your load (" +
      peakW.toLocaleString() +
      "W peak · " +
      Math.round(req.dailyWh).toLocaleString() +
      " Wh/day) exceeds our largest standard package (10.2Kva).",
    "Request a custom quote — Energi Tech will design to your appliances and site.",
  ];
  if (gaps.length) notes.push("Sizing gaps: " + gaps.join(" · ") + ".");
  return notes;
}

function buildFitNotes(pkg, req, metrics, peakW) {
  const notes = [];
  notes.push(
    "Sized for " +
      peakW.toLocaleString() +
      "W peak (simultaneous) and " +
      Math.round(req.dailyWh).toLocaleString() +
      " Wh/day with " +
      Math.round(req.peakMargin * 100 - 100) +
      "% inverter headroom."
  );
  notes.push(
    "~" +
      metrics.backupHoursAtPeak +
      "h battery at peak load · ~" +
      metrics.solarCoverage +
      "% of daily use from solar (avg sun)."
  );
  if (metrics.solarCoverage < 100) {
    notes.push("Heavy daily use — grid or generator may supplement on cloudy days.");
  }
  if (pkg.kva >= 6.2 && (req.requiredInverterW > 4000)) {
    notes.push("Large loads (geyser / AC / pumps) — stagger high-draw appliances where possible.");
  }
  return notes;
}

/** @deprecated Use pickPackageForLoad */
export function pickPackage(kvaRequired) {
  const need = Math.max(3.2, kvaRequired || 0);
  const sorted = [...PACKAGES_RICH].sort((a, b) => a.kva - b.kva);
  return sorted.find((p) => p.kva >= need) || sorted[sorted.length - 1];
}
