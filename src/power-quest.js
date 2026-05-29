import { PACKAGES } from "./packages.js";

function clamp01(x) {
  return Math.max(0, Math.min(1, Number(x) || 0));
}

/**
 * Pure progress state for Power Quest meter (no React).
 * @param {object|null} sizingLike — result from size()
 * @param {number} peakW
 * @param {number} dailyWh
 */
export function computePowerQuestState(sizingLike, peakW, dailyWh) {
  const pkgs = [...PACKAGES].sort((a, b) => a.kva - b.kva);
  const pkgsCount = pkgs.length;
  const custom = !!(sizingLike?.fit && sizingLike.fit.customQuote);
  const pkgId = sizingLike?.pkg?.id || null;
  const hitFromPkg = pkgId ? pkgs.findIndex((p) => p.id === pkgId) : -1;

  const emptyZoneFrac = 0.16;
  const unlockW = 200;
  const unlockWh = 750;
  const peak = Math.max(0, Number(peakW) || 0);
  const daily = Math.max(0, Number(dailyWh) || 0);
  const qualifyScore = Math.min(1, Math.max(peak / unlockW, daily / unlockWh));

  const qualified = custom || qualifyScore >= 1;
  const qualifyingPct = qualified ? 100 : Math.round(qualifyScore * 100);

  let hitIdx = -1;
  if (qualified && !custom) {
    if (hitFromPkg >= 0) hitIdx = hitFromPkg;
    else {
      const targetKva = Math.max(0, Number(sizingLike?.kvaReq) || 0);
      for (let i = 0; i < pkgs.length; i++) {
        if (targetKva <= pkgs[i].kva + 0.001) {
          hitIdx = i;
          break;
        }
      }
      if (hitIdx < 0) hitIdx = pkgs.length - 1;
    }
  }

  if (qualified && !custom && hitIdx < 0) hitIdx = 0;

  const pkgSpan = Math.max(0.001, 1 - emptyZoneFrac);
  const tierSteps = Math.max(1, pkgsCount - 1);
  let tierProgress = 0;

  if (qualified && hitIdx >= 0 && !custom) {
    const upper = pkgs[hitIdx];
    const lowerKva = hitIdx > 0 ? pkgs[hitIdx - 1].kva : 0;
    const targetKva = Math.max(
      lowerKva,
      Number(sizingLike?.kvaReq) || upper.kva
    );
    const spanKva = Math.max(0.001, upper.kva - lowerKva);
    tierProgress = clamp01((targetKva - lowerKva) / spanKva);
  }

  const tierPos = qualified && !custom ? clamp01((hitIdx + tierProgress) / tierSteps) : 0;
  const fillFrac = custom
    ? 1
    : qualified
      ? emptyZoneFrac + tierPos * pkgSpan
      : qualifyScore * emptyZoneFrac;

  const litIndex = custom ? pkgsCount - 1 : hitIdx;
  const phase = custom ? "boss" : qualified ? "package" : "charge";
  const tierKey = phase + ":" + (custom ? "x" : qualified ? String(litIndex) : "0");

  return {
    pkgs,
    pkgsCount,
    custom,
    qualified,
    qualifyingPct,
    hitIdx,
    litIndex,
    fillFrac,
    fillPct: Math.round(fillFrac * 1000) / 10,
    emptyZoneFrac,
    tierKey,
    phase,
    firstPkg: pkgs[0],
    activePkg: litIndex >= 0 && litIndex < pkgsCount ? pkgs[litIndex] : null,
  };
}
