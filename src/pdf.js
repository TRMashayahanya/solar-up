import { buildQuoteDocument } from "./quote.js";

function loadHtml2Pdf() {
  if (typeof window !== "undefined" && window.html2pdf) return Promise.resolve(window.html2pdf);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-solarup="html2pdf"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.html2pdf));
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    s.dataset.solarup = "html2pdf";
    s.onload = () => resolve(window.html2pdf);
    s.onerror = () => reject(new Error("Could not load PDF library"));
    document.head.appendChild(s);
  });
}

/**
 * Generate and download a PDF quote (falls back to print dialog if library fails).
 */
export async function downloadQuotePdf(client, sz, appList, propLabel, deliveryQuote) {
  const { ref, body } = buildQuoteDocument(client, sz, appList, propLabel, deliveryQuote);
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none";
  wrap.innerHTML = body;
  document.body.appendChild(wrap);
  const el = wrap.querySelector(".su-quote");

  try {
    const html2pdf = await loadHtml2Pdf();
    await html2pdf()
      .set({
        margin: [8, 8, 8, 8],
        filename: "SolarApp-Quote-" + ref + ".pdf",
        image: { type: "jpeg", quality: 0.96 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .from(el)
      .save();
    return { ref, mode: "pdf" };
  } catch (err) {
    console.warn("PDF download failed, opening print view:", err);
    printQuoteFallback(client, sz, appList, propLabel, deliveryQuote);
    return { ref, mode: "print" };
  } finally {
    document.body.removeChild(wrap);
  }
}

export function printQuoteFallback(client, sz, appList, propLabel, deliveryQuote) {
  const { ref, body } = buildQuoteDocument(client, sz, appList, propLabel, deliveryQuote);
  const html =
    "<!DOCTYPE html><html><head><meta charset='utf-8'><title>SolarApp " +
    ref +
    "</title></head><body style='margin:0;background:#fff'>" +
    body +
    "<script>window.onload=function(){window.print()}</script></body></html>";
  const w = window.open("", "_blank", "width=860,height=750");
  if (w) {
    w.document.write(html);
    w.document.close();
  }
}

/** @deprecated Use downloadQuotePdf */
export async function doPrint(client, sz, appList, propLabel, deliveryQuote) {
  return downloadQuotePdf(client, sz, appList, propLabel, deliveryQuote);
}
