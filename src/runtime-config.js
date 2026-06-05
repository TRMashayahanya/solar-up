/** Public runtime config from server (API keys safe for browser restriction). */

let cached = null;

export async function getRuntimeConfig() {
  if (cached) return cached;
  try {
    const res = await fetch("/api/config");
    if (res.ok) cached = await res.json();
  } catch {
    /* offline / static host */
  }
  if (!cached) cached = { googleMapsApiKey: "" };
  return cached;
}

export function getGoogleMapsApiKey() {
  return cached?.googleMapsApiKey || "";
}
