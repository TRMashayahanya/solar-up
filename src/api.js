/** Save lead details for marketing (server stores in data/leads.jsonl). */

export async function submitLead(payload) {
  let res;
  try {
    res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return saveLeadOffline(payload);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status >= 500) return saveLeadOffline(payload);
    throw new Error(data.error || "Could not save your details. Please try again.");
  }
  return data;
}

function saveLeadOffline(payload) {
  try {
    const key = "solarup-leads";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push({ ...payload, savedAt: new Date().toISOString(), offline: true });
    localStorage.setItem(key, JSON.stringify(list));
    return { ok: true, offline: true };
  } catch {
    throw new Error("Could not reach the server. Run node server.mjs and try again.");
  }
}
