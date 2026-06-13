/**
 * Stage sound module checks — exports and wiring.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    failed++;
  }
}

function ok(msg) {
  console.log("ok", msg);
}

const src = fs.readFileSync(path.join(ROOT, "src/stage-sounds.js"), "utf8");
const app = fs.readFileSync(path.join(ROOT, "src/App.js"), "utf8");

ok("stage-sounds exports playStageSound");
assert(src.includes("export function playStageSound"), "playStageSound export");
assert(src.includes("export function initStageSounds"), "initStageSounds export");

for (const id of ["property", "sized", "package", "install", "checkout", "complete"]) {
  assert(src.includes(id + "("), "profile " + id);
  assert(app.includes('playStageSound("' + id + '")') || app.includes("playStageSound('" + id + "')"), "App wires " + id);
}

assert(src.includes("prefers-reduced-motion"), "respects reduced motion");
assert(app.includes("initStageSounds"), "App unlocks audio on gesture");

if (failed) {
  console.error("\n" + failed + " test(s) failed");
  process.exit(1);
}
console.log("\nAll stage sound tests passed.");
