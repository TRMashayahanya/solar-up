import { computePowerQuestState } from "../src/power-quest.js";
import { PACKAGES } from "../src/packages.js";
import { size } from "../src/sizing.js";

let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    failed++;
  }
}

function case_(label, fn) {
  try {
    fn();
    console.log("ok", label);
  } catch (e) {
    console.error("FAIL:", label, e.message);
    failed++;
  }
}

const pkg0 = PACKAGES[0];
const pkg3 = PACKAGES[3];

case_("zero load", () => {
  const s = computePowerQuestState(null, 0, 0);
  assert(s.phase === "charge", "phase charge");
  assert(s.fillFrac === 0, "fill 0");
  assert(s.litIndex === -1, "no lit");
});

case_("low load in charge zone", () => {
  const s = computePowerQuestState(null, 100, 300);
  assert(s.phase === "charge", "phase");
  assert(s.fillFrac > 0 && s.fillFrac < 0.16, "fill in runway");
  assert(s.qualifyingPct === 50, "50% at 100W");
});

case_("at unlock threshold", () => {
  const s = computePowerQuestState(null, 200, 0);
  assert(s.qualified === true, "qualified");
  assert(s.phase === "package", "package phase");
});

case_("first package fill not 100% (regression)", () => {
  const sizing = { kvaReq: 3.2, pkg: pkg0, fit: { customQuote: false } };
  const s = computePowerQuestState(sizing, 250, 900);
  assert(s.litIndex === 0, "tier 0");
  assert(s.fillFrac > 0.16 && s.fillFrac < 0.35, "fill ~first tier not full: " + s.fillFrac);
});

case_("charge→package unlock fill stays in runway band", () => {
  const before = computePowerQuestState(null, 180, 600);
  assert(before.phase === "charge", "still charging");
  const after = computePowerQuestState({ kvaReq: 3.2, pkg: pkg0, fit: {} }, 220, 800);
  assert(after.phase === "package", "now package");
  assert(after.fillPct < 40, "bar must not jump to 100% on unlock, got " + after.fillPct);
});

case_("tier increases monotonically", () => {
  const tiers = [];
  for (let i = 0; i < PACKAGES.length; i++) {
    const p = PACKAGES[i];
    const sizing = { kvaReq: p.kva, pkg: p, fit: { customQuote: false } };
    const s = computePowerQuestState(sizing, 500 + i * 200, 2000 + i * 500);
    tiers.push({ i, fill: s.fillFrac, lit: s.litIndex });
  }
  for (let j = 1; j < tiers.length; j++) {
    assert(
      tiers[j].fill >= tiers[j - 1].fill - 0.01,
      "fill monotonic " + j + ": " + tiers[j - 1].fill + " -> " + tiers[j].fill
    );
  }
});

case_("higher package has higher fill", () => {
  const s0 = computePowerQuestState(
    { kvaReq: 3.2, pkg: pkg0, fit: {} },
    400,
    1200
  );
  const s3 = computePowerQuestState(
    { kvaReq: pkg3.kva, pkg: pkg3, fit: {} },
    2000,
    4000
  );
  assert(s3.fillFrac > s0.fillFrac, "pkg3 > pkg0 fill");
  assert(s3.litIndex > s0.litIndex, "pkg3 > pkg0 index");
});

case_("custom quote", () => {
  const s = computePowerQuestState(
    { kvaReq: 12, pkg: PACKAGES[PACKAGES.length - 1], fit: { customQuote: true } },
    8000,
    20000
  );
  assert(s.phase === "boss", "boss");
  assert(s.fillFrac === 1, "full bar");
  assert(s.custom === true, "custom flag");
});

case_("null sizing but qualified by watts", () => {
  const s = computePowerQuestState(null, 250, 800);
  assert(s.qualified === true, "qualified");
  assert(s.litIndex === 0, "default tier 0");
  assert(s.fillFrac >= 0.16, "past runway");
});

case_("tierKey stable format", () => {
  const s = computePowerQuestState(null, 50, 0);
  assert(s.tierKey === "charge:0", "charge key");
  const s2 = computePowerQuestState({ kvaReq: 3.2, pkg: pkg0, fit: {} }, 250, 900);
  assert(s2.tierKey === "package:0", "package key");
});

case_("fill never exceeds 1", () => {
  for (const peak of [0, 50, 199, 200, 500, 3000, 9000]) {
    for (const wh of [0, 400, 749, 750, 2000, 15000]) {
      const s = computePowerQuestState(
        { kvaReq: 11, pkg: PACKAGES[PACKAGES.length - 1], fit: { customQuote: peak > 5000 } },
        peak,
        wh
      );
      assert(s.fillFrac <= 1.0001, "fill <=1 at " + peak + "/" + wh + " got " + s.fillFrac);
      assert(s.fillFrac >= 0, "fill >=0");
    }
  }
});

case_("activePkg name when qualified", () => {
  const s = computePowerQuestState({ kvaReq: 3.2, pkg: pkg0, fit: {} }, 250, 900);
  assert(s.activePkg && s.activePkg.name, "has name");
});

case_("integration with size() — light load", () => {
  const list = [{ id: "led", label: "LED lights", w: 60, h: 6 }];
  const sz = size(list);
  const s = computePowerQuestState(sz, sz.pW, sz.dWh);
  assert(s.phase === "charge" || s.phase === "package", "valid phase");
  assert(s.fillPct >= 0 && s.fillPct <= 100, "valid pct");
});

case_("integration — charge to package transition steps", () => {
  const steps = [];
  const loads = [
    [{ id: "led", w: 40, h: 4 }],
    [{ id: "led", w: 120, h: 6 }],
    [{ id: "led", w: 120, h: 6 }, { id: "wifi", w: 30, h: 24 }],
    [{ id: "fridge", w: 150, h: 12 }, { id: "tv", w: 120, h: 5 }],
    [{ id: "fridge", w: 200, h: 12 }, { id: "wm", w: 500, h: 2 }],
  ];
  let prevKey = null;
  for (const list of loads) {
    const sz = size(list);
    const s = computePowerQuestState(sz, sz.pW, sz.dWh);
    steps.push({ key: s.tierKey, fill: s.fillPct, lit: s.litIndex });
    if (prevKey && prevKey !== s.tierKey) {
      assert(s.fillPct >= 0, "fill ok after tier change");
    }
    prevKey = s.tierKey;
  }
  assert(steps.length === loads.length, "all steps");
});

case_("integration — tier keys only change forward on increasing load", () => {
  const list = [];
  let prevLit = -1;
  const adds = [
    { w: 50, h: 5 },
    { w: 80, h: 6 },
    { w: 150, h: 10 },
    { w: 400, h: 8 },
    { w: 800, h: 6 },
    { w: 1500, h: 5 },
  ];
  for (const a of adds) {
    list.push({ id: "x" + list.length, label: "Appliance", w: a.w, h: a.h });
    const sz = size(list);
    const s = computePowerQuestState(sz, sz.pW, sz.dWh);
    if (s.litIndex >= 0) assert(s.litIndex >= prevLit, "lit index non-decreasing");
    prevLit = Math.max(prevLit, s.litIndex);
  }
});

console.log(failed ? "\n" + failed + " failed" : "\nAll passed");
process.exit(failed ? 1 : 0);
