/** Solar vs grid — simple pollution savings estimates for Zimbabwe. */

const KG_CO2_PER_KWH = 0.52;

export function environmentalImpact(dWh, dailyGenWh) {
  const dailyKwh = (dailyGenWh > 0 ? dailyGenWh : dWh * 1.15) / 1000;
  const solarKwhYear = Math.round(dailyKwh * 365);
  const co2KgYear = Math.round(solarKwhYear * KG_CO2_PER_KWH);
  const trees = Math.max(1, Math.round(co2KgYear / 21));
  const carKm = Math.round(co2KgYear / 0.12);

  return {
    solarKwhYear,
    co2KgYear,
    co2Tonnes: (co2KgYear / 1000).toFixed(1),
    trees,
    carKm,
  };
}
