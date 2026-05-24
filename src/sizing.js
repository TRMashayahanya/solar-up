import { INVS, BATS, PANS } from "./data.js";

const SUN_HOURS = 5.5;
const ARRAY_EFF = 0.77;
const GEN_MARGIN = 1.2;
const INV_HEADROOM = 1.3;

function pickPanels(requiredArrayW, dWh) {
  let best = null;
  for (const pan of PANS) {
    let pc = Math.max(2, Math.ceil(requiredArrayW / pan.w));
    pc = Math.min(pc, 24);
    const dailyGen = pc * pan.w * SUN_HOURS * ARRAY_EFF;
    if (dailyGen < dWh * GEN_MARGIN && pc < 24) {
      pc = Math.min(24, Math.ceil((dWh * GEN_MARGIN) / (pan.w * SUN_HOURS * ARRAY_EFF)));
    }
    const cost = pc * pan.price;
    if (!best || cost < best.cost) best = { pan, pc, cost, dailyGen };
  }
  return best;
}

export function size(list) {
  let dWh = 0;
  let pW = 0;
  for (let i = 0; i < list.length; i++) {
    dWh += list[i].w * list[i].h;
    pW += list[i].w;
  }
  const kvaReq = (pW * INV_HEADROOM) / 1000;
  let inv = INVS[INVS.length - 1];
  for (let j = 0; j < INVS.length; j++) {
    if (INVS[j].kva >= kvaReq) {
      inv = INVS[j];
      break;
    }
  }
  const bWh = (dWh / 0.85 / 0.8) * 1.05;
  let bat = bWh > 4000 ? BATS[2] : bWh > 2000 ? BATS[1] : BATS[0];
  let bc = Math.max(1, Math.ceil(bWh / bat.wh));
  if (bc > 4) {
    bat = BATS[2];
    bc = Math.max(1, Math.ceil(bWh / bat.wh));
  }
  bc = Math.min(bc, 8);

  const targetGenWh = dWh * GEN_MARGIN;
  const requiredArrayW = targetGenWh / (SUN_HOURS * ARRAY_EFF);
  const panelPick = pickPanels(requiredArrayW, dWh);
  const pan = panelPick.pan;
  const pc = panelPick.pc;
  const dailyGenWh = Math.round(panelPick.dailyGen);
  const solarCoverage = dWh > 0 ? Math.min(999, Math.round((dailyGenWh / dWh) * 100)) : 0;

  const tot = inv.price + bat.price * bc + pan.price * pc;
  const sWh = bat.wh * bc;
  const bk = pW > 0 ? Math.round((sWh * 0.8) / pW) : 0;
  return {
    dWh: Math.round(dWh),
    pW: Math.round(pW),
    inv,
    bat,
    bc,
    pan,
    pc,
    tot,
    kva: inv.kva,
    sWh,
    bk,
    dailyGenWh,
    solarCoverage,
  };
}

export { downloadQuotePdf as doPrint } from "./pdf.js";
