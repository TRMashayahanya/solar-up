/**
 * Premium stage-completion sounds — Web Audio synthesis (no assets, works offline).
 * One distinct tone per ordering milestone; respects reduced-motion preference.
 */

/** @typedef {'property'|'sized'|'package'|'packageUnlock'|'install'|'checkout'|'complete'} StageSoundId */

let ctx = null;
let unlocked = false;
const lastAt = /** @type {Record<string, number>} */ ({});

const STAGE_GAIN = 0.052;

function prefersQuiet() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function getCtx() {
  if (!ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    ctx = new Ctx();
  }
  return ctx;
}

/** Call once after first user gesture so mobile browsers allow playback. */
export function initStageSounds() {
  if (unlocked || typeof window === "undefined") return;
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume().catch(() => {});
  unlocked = true;
}

function tone(c, freq, t0, dur, gain, type = "sine") {
  const osc = c.createOscillator();
  const g = c.createGain();
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(Math.min(4200, freq * 3.2), t0);
  filter.Q.setValueAtTime(0.6, t0);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), t0 + 0.014);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(filter);
  filter.connect(g);
  g.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.04);
}

function playNotes(notes, { gap = 0.075, dur = 0.26, gain = STAGE_GAIN } = {}) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + 0.015;
  notes.forEach((n, i) => {
    const g = gain * (1 - i * 0.06);
    tone(c, n.freq, t0 + i * gap, n.dur || dur, g, n.type || "sine");
    if (n.harmonic) tone(c, n.harmonic, t0 + i * gap, (n.dur || dur) * 0.85, g * 0.28, "triangle");
  });
}

/** Distinct premium profiles per funnel stage. */
const PROFILES = {
  /** Home — property type chosen */
  property() {
    playNotes([{ freq: 523.25, dur: 0.2 }]);
  },
  /** Sizer — load calculated, package matched */
  sized() {
    playNotes([
      { freq: 440, dur: 0.18 },
      { freq: 554.37, dur: 0.24 },
      { freq: 659.25, dur: 0.3, harmonic: 1318.5 },
    ]);
  },
  /** Products — package picked, heading to quote */
  package() {
    playNotes([
      { freq: 587.33, dur: 0.2 },
      { freq: 739.99, dur: 0.28, harmonic: 1479.98 },
    ]);
  },
  /** Sizer — new solar package tier unlocked while building load */
  packageUnlock(tierIndex = 0) {
    const lift = Math.min(3, Math.max(0, tierIndex)) * 0.06;
    playNotes(
      [
        { freq: 523.25 * (1 + lift), dur: 0.11, type: "triangle" },
        { freq: 659.25 * (1 + lift), dur: 0.14 },
        { freq: 830.61 * (1 + lift), dur: 0.17, harmonic: 1661.22 * (1 + lift) },
        { freq: 1046.5 * (1 + lift), dur: 0.24 },
      ],
      { gap: 0.048, dur: 0.2, gain: STAGE_GAIN * 1.12 }
    );
  },
  /** Quote — installation location confirmed */
  install() {
    playNotes([
      { freq: 493.88, dur: 0.22, type: "triangle" },
      { freq: 659.25, dur: 0.32 },
    ], { gap: 0.09, gain: STAGE_GAIN * 0.95 });
  },
  /** Quote — opening PDF / client details */
  checkout() {
    playNotes([
      { freq: 523.25, dur: 0.16 },
      { freq: 659.25, dur: 0.18 },
      { freq: 783.99, dur: 0.22 },
      { freq: 987.77, dur: 0.28, harmonic: 1975.53 },
    ], { gap: 0.065, gain: STAGE_GAIN * 1.05 });
  },
  /** PDF ready — order milestone complete */
  complete() {
    playNotes([
      { freq: 659.25, dur: 0.2 },
      { freq: 830.61, dur: 0.22 },
      { freq: 987.77, dur: 0.26 },
      { freq: 1174.66, dur: 0.34, harmonic: 2349.32 },
    ], { gap: 0.08, gain: STAGE_GAIN * 0.9 });
  },
};

/**
 * Play a stage-completion sound (debounced per stage).
 * @param {StageSoundId} id
 */
export function playStageSound(id) {
  if (typeof window === "undefined" || prefersQuiet()) return;
  const fn = PROFILES[id];
  if (!fn) return;

  const now = Date.now();
  if (lastAt[id] && now - lastAt[id] < 700) return;
  lastAt[id] = now;

  initStageSounds();
  const c = getCtx();
  if (!c) return;

  const run = () => {
    try {
      fn();
    } catch {
      /* ignore audio errors */
    }
  };

  if (c.state === "suspended") {
    c.resume().then(run).catch(() => {});
  } else {
    run();
  }
}

export const STAGE_SOUND_IDS = Object.keys(PROFILES);

/**
 * Play when the sizer unlocks a new package tier (first qualify or tier step-up).
 * @param {number} [tierIndex]
 */
export function playPackageUnlockSound(tierIndex = 0) {
  if (typeof window === "undefined" || prefersQuiet()) return;

  const key = "packageUnlock:" + tierIndex;
  const now = Date.now();
  if (lastAt[key] && now - lastAt[key] < 480) return;
  lastAt[key] = now;

  initStageSounds();
  const c = getCtx();
  if (!c) return;

  const run = () => {
    try {
      PROFILES.packageUnlock(tierIndex);
    } catch {
      /* ignore audio errors */
    }
  };

  if (c.state === "suspended") {
    c.resume().then(run).catch(() => {});
  } else {
    run();
  }
}
