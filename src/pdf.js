import { buildQuoteDocument } from "./quote.js";

import { PDF_FONTS_URL } from "./quote.js";

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

function ensurePdfFonts() {
  let link = document.querySelector('link[data-solarup="pdf-fonts"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = PDF_FONTS_URL;
    link.dataset.solarup = "pdf-fonts";
    document.head.appendChild(link);
  }
  if (document.fonts && document.fonts.load) {
    return document.fonts.ready.catch(() => {});
  }
  return new Promise((r) => setTimeout(r, 400));
}

/**
 * Generate and download a PDF quote (falls back to print dialog if library fails).
 */
export async function downloadQuotePdf(client, sz, appList, propLabel, deliveryQuote) {
  const { ref, body } = buildQuoteDocument(client, sz, appList, propLabel, deliveryQuote);
  const wrap = document.createElement("div");
  wrap.style.cssText =
    "position:fixed;left:0;top:0;width:720px;z-index:-1;opacity:0.01;pointer-events:none;overflow:visible";
  wrap.innerHTML = body;
  document.body.appendChild(wrap);
  const el = wrap.querySelector(".su-quote");

  if (!el) {
    document.body.removeChild(wrap);
    printQuoteFallback(client, sz, appList, propLabel, deliveryQuote);
    return { ref, mode: "print" };
  }

  try {
    await ensurePdfFonts();
    await new Promise((r) => setTimeout(r, 350));
    const html2pdf = await loadHtml2Pdf();
    await html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: "SolarApp-Quote-" + ref + ".pdf",
        image: { type: "jpeg", quality: 0.96 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          windowWidth: 720,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      })
      .from(el)
      .save();
    return { ref, mode: "pdf" };
  } catch (err) {
    console.warn("PDF download failed, opening print view:", err);
    printQuoteFallback(client, sz, appList, propLabel, deliveryQuote);
    return { ref, mode: "print" };
  } finally {
    if (wrap.parentNode) document.body.removeChild(wrap);
  }
}

export function printQuoteFallback(client, sz, appList, propLabel, deliveryQuote) {
  const { ref, body } = buildQuoteDocument(client, sz, appList, propLabel, deliveryQuote);
  const html =
    "<!DOCTYPE html><html><head><meta charset='utf-8'><title>SolarApp " +
    ref +
    "</title><link rel='stylesheet' href='" +
    PDF_FONTS_URL +
    "'></head><body style='margin:0;background:#FFFCF8'>" +
    body +
    "<script>window.onload=function(){setTimeout(function(){window.print()},600)}</script></body></html>";
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
