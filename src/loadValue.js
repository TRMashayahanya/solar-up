import { environmentalImpact } from "./environment.js";

export function loadValueInsights(pW, dWh, applianceCount, dailyGenWh) {
  const n = applianceCount || 0;
  const kwhDay = dWh > 0 ? (dWh / 1000).toFixed(1) : "0";
  const monthlyKwh = (dWh / 1000) * 30;
  const gridSave = Math.max(8, Math.round(monthlyKwh * 0.11));
  const eco = environmentalImpact(dWh, dailyGenWh || 0);

  return {
    badge: "Your solar match",
    benefit: null,
    peakLabel: "Peak",
    peakSub: n ? n + " items selected" : "Add items below",
    dailyLabel: "Daily",
    dailySub: kwhDay + " kWh/day",
    valueLine: dWh > 500 ? "~$" + gridSave + "/mo grid savings potential" : null,
    eco,
  };
}
