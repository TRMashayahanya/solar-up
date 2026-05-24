function lights() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}

export const PRESETS = {
  small_home: {
    qtys: {
      ess_led: lights(3, 2, 2),
      ess_fan: 2,
      ess_wifi: 1,
      ess_phone: 2,
      off_laptop: 1,
      kit_fridge: 1,
      kit_kettle: 1,
      lng_tv: 1,
      lng_dstv: 1,
      bath_geyser: 1,
      out_seclight: 2,
      out_alarm: 1,
      lnd_wash: 1,
    },
    skipCats: ["water", "laundry", "bedroom"],
  },
  apartment: {
    qtys: {
      ess_led: lights(2, 1, 1),
      ess_fan: 1,
      ess_wifi: 1,
      ess_phone: 2,
      off_laptop: 1,
      kit_fridge: 1,
      kit_micro: 1,
      lng_tv: 1,
      bath_geyser: 1,
      out_alarm: 1,
    },
    skipCats: ["water", "laundry", "outdoor", "bedroom"],
  },
  family_home: {
    qtys: {
      ess_led: lights(5, 2, 3, 3),
      ess_fan: lights(3, 1),
      ess_wifi: 1,
      ess_phone: 3,
      off_laptop: 2,
      off_desk: 1,
      off_printer: 1,
      bed_tv: 2,
      bed_ac: 1,
      kit_fridge: 1,
      kit_kettle: 1,
      lng_tv: 1,
      lng_dstv: 1,
      bath_geyser: 1,
      out_seclight: 4,
      out_cctv: 4,
      out_alarm: 1,
      lnd_wash: 1,
      wp_1: 1,
    },
    skipCats: [],
  },
  office: {
    qtys: {
      ess_led: lights(4, 1, 2),
      ess_wifi: 1,
      off_laptop: 4,
      off_desk: 2,
      off_printer: 1,
      kit_fridge: 1,
      out_seclight: 2,
      out_cctv: 2,
      out_alarm: 1,
    },
    skipCats: ["bedroom", "lounge", "laundry", "water", "bathroom"],
  },
  shop: {
    qtys: {
      ess_led: lights(4, 6),
      ess_wifi: 1,
      off_laptop: 1,
      kit_fridge: 1,
      out_seclight: 6,
      out_cctv: 6,
      out_alarm: 1,
      out_gate: 1,
    },
    skipCats: ["bedroom", "bathroom", "laundry", "water", "lounge"],
  },
  farm: {
    qtys: {
      ess_led: 6,
      ess_fan: 4,
      ess_wifi: 1,
      off_laptop: 1,
      bed_tv: 1,
      kit_fridge: 1,
      kit_freeze: 1,
      lng_tv: 1,
      bath_geyser: 2,
      out_seclight: 8,
      out_cctv: 6,
      wp_2: 1,
      lnd_wash: 1,
    },
    skipCats: [],
  },
  school: {
    qtys: {
      ess_led: lights(8, 12, 6),
      ess_wifi: 2,
      off_laptop: 6,
      off_desk: 2,
      off_printer: 2,
      kit_fridge: 2,
      bath_geyser: 2,
      out_seclight: 10,
      out_cctv: 8,
      out_alarm: 1,
      wp_1: 1,
    },
    skipCats: ["bedroom", "lounge", "laundry"],
  },
  large_home: {
    qtys: {
      ess_led: lights(8, 4),
      ess_fan: 5,
      ess_wifi: 1,
      ess_phone: 3,
      off_laptop: 3,
      off_desk: 1,
      off_printer: 1,
      bed_tv: 3,
      bed_ac: 2,
      kit_fridge: 1,
      kit_freeze: 1,
      lng_tv: 2,
      lng_ac: 1,
      bath_geyser: 2,
      out_seclight: 6,
      out_cctv: 6,
      out_pool: 1,
      lnd_wash: 1,
      lnd_dryer: 1,
      wp_1: 1,
    },
    skipCats: [],
  },
};

export function applyPreset(propValue) {
  const preset = PRESETS[propValue] || PRESETS.family_home;
  const skipped = {};
  for (const id of preset.skipCats || []) skipped[id] = true;
  const qtys = { ...preset.qtys };
  for (const k of Object.keys(qtys)) {
    if (!qtys[k]) delete qtys[k];
  }
  return { qtys, skipped };
}
