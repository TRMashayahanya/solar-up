import {
  OUTSIDE_DEALER_ADVISORY,
  OUTSIDE_DELIVERY_PER_KM_USD,
  OUTSIDE_DELIVERY_FREE_KM,
  HARARE_INSTALL_INCLUDED_NOTE,
  PACKAGE_PRICE_NOTE,
  deliveryPricingLabel,
} from "./delivery.js";
import { environmentalImpact } from "./environment.js";

/** Printed quotations expire after this many calendar days from issue. */
export const QUOTE_VALIDITY_DAYS = 5;

export function getQuoteValidity(fromDate = new Date()) {
  const issued = new Date(fromDate);
  const validUntil = new Date(fromDate);
  validUntil.setDate(validUntil.getDate() + QUOTE_VALIDITY_DAYS);
  const fmt = (d) =>
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  return {
    issuedLabel: fmt(issued),
    validUntilLabel: fmt(validUntil),
    days: QUOTE_VALIDITY_DAYS,
  };
}

const QUOTE_TABLE_COLS =
  "<colgroup><col class='c-item'><col class='c-spec'><col class='c-qty'><col class='c-unit'><col class='c-sub'></colgroup>";

export const PDF_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@400;500;600;700&display=swap";

/** Print/PDF-first styles — solid contrast, no faint rgba text on dark panels. */
const QUOTE_STYLES =
  "*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
  ".su-quote{font-family:'Outfit',Helvetica,Arial,sans-serif;background:#FFFCF8;color:#1D1D1F;font-size:11.5px;width:720px;max-width:100%;padding:26px 30px 30px;position:relative;overflow:hidden;line-height:1.4}" +
  ".pdf-wm{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}" +
  ".pdf-wm-inner{position:absolute;inset:-45%;transform:rotate(-26deg);display:flex;flex-wrap:wrap;gap:40px 64px;align-content:center;justify-content:center;opacity:.04;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1D1D1F}" +
  ".quote-inner{position:relative;z-index:1}" +
  ".stripe{height:4px;background:linear-gradient(90deg,#8B6914,#D4AF37 42%,#2D8B5E 100%);margin-bottom:20px;border-radius:3px}" +
  ".hdr{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:start;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #E8D98A}" +
  ".logo{font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:32px;font-weight:700;letter-spacing:.5px;color:#1D1D1F;line-height:1.05}" +
  ".logo em{color:#8B6914;font-style:normal}" +
  ".sub{font-size:9px;color:#4A5560;letter-spacing:2px;text-transform:uppercase;margin-top:6px;line-height:1.45;font-weight:500}" +
  ".meta{text-align:right;min-width:180px}" +
  ".mq{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#8B6914;margin-bottom:5px;font-weight:700}" +
  ".mr{font-size:15px;font-weight:700;letter-spacing:.3px;color:#1D1D1F}" +
  ".md{font-size:10px;color:#4A5560;margin-top:4px;line-height:1.4}" +
  ".mv{font-size:9.5px;color:#8B6914;font-weight:600;margin-top:8px}" +
  ".validity{display:inline-block;margin-top:8px;padding:7px 12px;background:#FDF6E3;border:1px solid #D4C4A8;border-radius:8px;font-size:9.5px;color:#5C4A10;font-weight:700;line-height:1.35}" +
  ".conf{font-size:9.5px;color:#4A4540;margin-top:10px;line-height:1.45;font-weight:500}" +
  "h3{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#8B6914;margin:0 0 10px;font-weight:700}" +
  ".sec{margin-bottom:18px}" +
  ".cbox{background:#FFFFFF;border:1px solid #E8D98A;border-radius:12px;padding:14px 16px}" +
  ".cn{font-size:18px;font-weight:700;margin-bottom:8px;color:#1D1D1F;line-height:1.25}" +
  ".cpills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px}" +
  ".pill{background:#F5EFC0;border:1px solid #D4C4A8;border-radius:12px;padding:4px 10px;font-size:9px;color:#5C4A10;font-weight:600;line-height:1.25}" +
  ".cdetails{display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;margin-top:10px;padding-top:10px;border-top:1px solid #EDE8D0}" +
  ".cdet-item{font-size:10.5px;color:#1D1D1F;line-height:1.45;word-break:break-word;font-weight:500}" +
  ".cdet-label{color:#5C6570;font-size:9px;margin-bottom:3px;text-transform:uppercase;letter-spacing:.06em;font-weight:600}" +
  ".hero{background:#FFFFFF;border:1px solid #D4C4A8;border-radius:14px;padding:18px 20px;color:#1D1D1F;position:relative;overflow:hidden}" +
  ".hero--custom{border-color:#D4A8A8;background:linear-gradient(165deg,#FFFFFF 0%,#FDF6F6 100%)}" +
  ".hr{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:end;position:relative;z-index:1}" +
  ".ht{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#8B6914;margin-bottom:5px;font-weight:700}" +
  ".hn{font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;font-weight:700;color:#1D1D1F;line-height:1.08;margin-bottom:4px}" +
  ".hn2{font-size:10px;color:#4A5560;line-height:1.45;max-width:300px;font-weight:500}" +
  ".hp{font-family:'Cormorant Garamond',Georgia,serif;font-size:34px;font-weight:700;color:#7A5C12;line-height:1;text-align:right}" +
  ".hp--sm{font-size:26px}" +
  ".hu{font-size:10px;color:#4A5560;text-align:right;margin-top:4px;line-height:1.4;font-weight:500}" +
  ".hstats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid #E5DCC8;position:relative;z-index:1}" +
  ".hs{text-align:center}" +
  ".hs strong{color:#7A5C12;display:block;font-size:12px;font-weight:700;margin-bottom:3px;line-height:1.2}" +
  ".hs span{font-size:9px;color:#4A5560;display:block;font-weight:500}" +
  ".hero-notes{margin:12px 0 0;padding-left:18px;font-size:10px;color:#4A5560;line-height:1.5;list-style:disc}" +
  ".pkg-list{margin:6px 0 0;padding-left:16px;font-size:10px;color:#4A5560;line-height:1.45;list-style:disc}" +
  ".pkg-powers{font-size:10px;color:#4A5560;margin-top:8px;line-height:1.45}" +
  ".pkg-powers strong{color:#1D1D1F}" +
  ".quote-tbl{width:100%;table-layout:fixed;border-collapse:collapse;margin-bottom:12px}" +
  ".c-item{width:17%}.c-spec{width:36%}.c-qty{width:11%}.c-unit{width:18%}.c-sub{width:18%}" +
  ".quote-tbl th{background:#FDF6E8;padding:10px 8px;font-size:8.5px;letter-spacing:1.2px;text-transform:uppercase;color:#5C4A10;font-weight:700;border-bottom:2px solid #D4C4A8;vertical-align:bottom}" +
  ".quote-tbl th.c-qty,.quote-tbl td.c-qty{text-align:center}" +
  ".quote-tbl th.c-unit,.quote-tbl td.c-unit,.quote-tbl th.c-sub,.quote-tbl td.c-sub{text-align:right}" +
  ".quote-tbl td{padding:10px 8px;border-bottom:1px solid #E8E2D4;font-size:11px;vertical-align:top;line-height:1.45;color:#1D1D1F}" +
  ".quote-tbl td.c-item{font-weight:700;color:#5C4A10;vertical-align:top}" +
  ".quote-tbl td.c-spec{color:#2A3530;font-weight:500}" +
  ".quote-tbl td.c-sub{font-weight:700;color:#1D1D1F}" +
  ".quote-tbl--apps .c-item{width:42%}.quote-tbl--apps .c-qty{width:19%}.quote-tbl--apps .c-sub{width:20%}" +
  ".tbl-note td{font-size:10px;color:#4A5560;padding:10px 8px;background:#FAFAF8;font-weight:500}" +
  ".tbl-advisory td{font-size:10px;color:#2A4549;padding:10px 8px;background:#F0F7FF;font-weight:500}" +
  ".tbl-refpkg td{font-size:10px;color:#4A5560;padding:10px 8px;background:#FFF8E8;font-weight:500}" +
  ".tbd{color:#5C6570;font-style:italic;font-weight:500}" +
  ".tr-tot td{background:#FDF6E8;font-weight:700;border-bottom:none}" +
  ".tr-tot td.c-item{font-weight:700;color:#5C4A10;text-align:right;padding-right:10px}" +
  ".tr-tot td.c-sub{color:#7A5C12;font-size:12px}" +
  ".terms{background:#FFFFFF;border:1px solid #E8E2D4;border-left:4px solid #D4AF37;border-radius:0 10px 10px 0;padding:14px 16px;font-size:10px;color:#2A3530;line-height:1.7}" +
  ".terms strong{color:#1D1D1F}" +
  ".footer{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:end;padding-top:16px;margin-top:8px;border-top:2px solid #EDE8D0}" +
  ".fb{font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;font-weight:700;color:#8B6914}" +
  ".fc{font-size:10px;color:#4A5560;margin-top:4px;line-height:1.45;font-weight:500}" +
  ".badge{background:#F5EFC0;color:#5C4A10;border:1px solid #C9A227;font-size:8.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 12px;border-radius:12px;white-space:nowrap}" +
  ".eco-simple{margin-top:12px;padding:10px 12px;border-radius:10px;background:#F0FAF5;border:1px solid #B8E0C8;font-size:10px;color:#2A4540;line-height:1.5}" +
  ".eco-simple strong{color:#1A5C38}";

function quotePdfHead() {
  return "<link rel='stylesheet' href='" + PDF_FONTS_URL + "'>";
}

function wrapQuoteBody(inner) {
  return "<div class='su-quote'>" + inner + "</div>";
}

function quoteTableOpen() {
  return "<table class='quote-tbl'>" + QUOTE_TABLE_COLS + "<thead><tr><th class='c-item'>Item</th><th class='c-spec'>Specification</th><th class='c-qty'>Qty</th><th class='c-unit'>Unit</th><th class='c-sub'>Subtotal</th></tr></thead><tbody>";
}

function quoteApplianceTableOpen() {
  return (
    "<table class='quote-tbl quote-tbl--apps'>" +
    "<colgroup><col class='c-item'><col class='c-qty'><col class='c-qty'><col class='c-sub'></colgroup>" +
    "<thead><tr><th class='c-item'>Appliance</th><th class='c-qty'>Hrs/day</th><th class='c-qty'>Watts</th><th class='c-sub'>Daily Wh</th></tr></thead><tbody>"
  );
}

function buildEcoFootprintHtml(dWh, dailyGenWh) {
  const eco = environmentalImpact(dWh, dailyGenWh || 0);
  return (
    "<p class='eco-simple'>Good for the planet — about <strong>" +
    eco.trees +
    " trees</strong> worth of CO₂ saved per year vs grid power.</p>"
  );
}

export function buildQuoteDocument(client, sz, appList, propLabel, deliveryQuote) {
  if (sz.fit?.customQuote) {
    return buildCustomQuoteDocument(client, sz, appList, propLabel);
  }

  const dq = deliveryQuote && deliveryQuote.enabled ? deliveryQuote : null;
  const grandTotal = sz.tot + (dq && !dq.feePending ? dq.fee : 0);
  const pkg = sz.pkg || null;
  const validity = getQuoteValidity();
  const ref = "SA-" + Date.now().toString().slice(-6);

  const includesHtml = pkg
    ? pkg.includes.map((line) => "<li>" + line + "</li>").join("")
    : "";
  const powersHtml = pkg && pkg.powers && pkg.powers.length
    ? "<p class='pkg-powers'><strong>Typical loads:</strong> " + pkg.powers.join(" · ") + "</p>"
    : "";

  const productRows = pkg
    ? "<tr><td class='c-item'>Solar package</td><td class='c-spec'>" +
      pkg.name +
      "<ul class='pkg-list'>" +
      includesHtml +
      "</ul>" +
      powersHtml +
      "</td><td class='c-qty'>1</td><td class='c-unit'>$" +
      pkg.price.toLocaleString() +
      "</td><td class='c-sub'>$" +
      pkg.price.toLocaleString() +
      "</td></tr>" +
      "<tr class='tr-tot'><td class='c-item' colspan='4'>Package total (Harare installation included)</td><td class='c-sub'>$" +
      sz.tot.toLocaleString() +
      "</td></tr>"
    : "<tr><td class='c-item'>Inverter</td><td class='c-spec'>" +
      sz.inv.brand +
      " " +
      sz.inv.name +
      "</td><td class='c-qty'>1</td><td class='c-unit'>$" +
      sz.inv.price +
      "</td><td class='c-sub'>$" +
      sz.inv.price +
      "</td></tr>" +
      "<tr><td class='c-item'>Batteries</td><td class='c-spec'>" +
      sz.bat.brand +
      " " +
      sz.bat.name +
      "</td><td class='c-qty'>" +
      sz.bc +
      "</td><td class='c-unit'>$" +
      sz.bat.price +
      "</td><td class='c-sub'>$" +
      sz.bat.price * sz.bc +
      "</td></tr>" +
      "<tr><td class='c-item'>Solar Panels</td><td class='c-spec'>" +
      sz.pan.brand +
      " " +
      sz.pan.name +
      " (~" +
      (sz.dailyGenWh || 0).toLocaleString() +
      " Wh/day)</td><td class='c-qty'>" +
      sz.pc +
      "</td><td class='c-unit'>$" +
      sz.pan.price +
      "</td><td class='c-sub'>$" +
      sz.pan.price * sz.pc +
      "</td></tr>" +
      "<tr class='tr-tot'><td class='c-item' colspan='4'>Total product supply</td><td class='c-sub'>$" +
      sz.tot.toLocaleString() +
      "</td></tr>";

  const deliveryRows = !dq
    ? "<tr class='tbl-note'><td class='c-spec' colspan='5'>" + PACKAGE_PRICE_NOTE + "</td></tr>"
    : dq.feePending
      ? "<tr><td class='c-item'>Delivery</td><td class='c-spec'>" +
        (dq.locationLabel || "Beyond " + OUTSIDE_DELIVERY_FREE_KM + " km") +
        " — enter area for $" +
        OUTSIDE_DELIVERY_PER_KM_USD +
        "/km estimate (after " +
        OUTSIDE_DELIVERY_FREE_KM +
        " km free).</td><td class='c-qty'>—</td><td class='c-unit'>TBD</td><td class='c-sub tbd'>TBD</td></tr>" +
        "<tr class='tbl-advisory'><td class='c-spec' colspan='5'>" + OUTSIDE_DEALER_ADVISORY + "</td></tr>" +
        "<tr class='tr-tot'><td class='c-item' colspan='4'>Quotation total (package)</td><td class='c-sub'>$" +
        sz.tot.toLocaleString() +
        "</td></tr>"
      : dq.zone === "outside"
        ? "<tr><td class='c-item'>Delivery</td><td class='c-spec'>" +
          deliveryPricingLabel(dq.km) +
          (dq.locationLabel ? " — " + dq.locationLabel : "") +
          " (~" +
          dq.km +
          " km from Harare)</td><td class='c-qty'>1</td><td class='c-unit'>$" +
          dq.fee +
          "</td><td class='c-sub'>$" +
          dq.fee +
          "</td></tr>" +
          "<tr class='tr-tot'><td class='c-item' colspan='4'>Grand total</td><td class='c-sub'>$" +
          grandTotal.toLocaleString() +
          "</td></tr>"
        : "<tr><td class='c-item'>Installation</td><td class='c-spec'>" +
          (dq.km > 0 ? "~" + dq.km + " km from Harare — " : "") +
          HARARE_INSTALL_INCLUDED_NOTE +
          "</td><td class='c-qty'>1</td><td class='c-unit'>Included</td><td class='c-sub'>$0</td></tr>" +
          "<tr class='tr-tot'><td class='c-item' colspan='4'>Grand total</td><td class='c-sub'>$" +
          grandTotal.toLocaleString() +
          "</td></tr>";

  const heroTitle = pkg ? pkg.name : sz.kva + " kVA";
  const heroSub = pkg
    ? PACKAGE_PRICE_NOTE
    : "Free sizing · Hardware supply · Installation quoted on site";
  const priceSub = dq
    ? dq.feePending
      ? "USD · Package · outside delivery to be confirmed"
      : dq.zone === "outside"
        ? "USD · Package + $" + dq.fee + " delivery"
        : "USD · Installation included within " + OUTSIDE_DELIVERY_FREE_KM + " km"
    : "USD · Installation included within " + OUTSIDE_DELIVERY_FREE_KM + " km";

  const body = wrapQuoteBody(
    "<div class='quote-inner'>" +
    quotePdfHead() +
    "<style>" +
    QUOTE_STYLES +
    "</style>" +
    "<div class='stripe'></div>" +
    "<div class='hdr'><div><div class='logo'>Solar<em>App</em></div><div class='sub'>Powered by Energi Tech · Premium Solar Supply</div></div>" +
    "<div class='meta'><div class='mq'>Product Quotation</div><div class='mr'>" +
    ref +
    "</div><div class='md'>Issued " +
    validity.issuedLabel +
    "</div><div class='validity'>Valid " +
    validity.days +
    " days · until " +
    validity.validUntilLabel +
    "</div><p class='conf'>Confidential — for " +
    (client.name || "named client") +
    " only. Official PDF from SolarApp; screenshots are not valid quotes.</p><div class='mv'>Free sizing service · Energi Tech</div></div></div>" +
    "<div class='sec'><h3>Prepared for</h3><div class='cbox'>" +
    "<div class='cn'>" +
    (client.name || "Valued Customer") +
    "</div>" +
    "<div class='cpills'>" +
    (propLabel ? "<span class='pill'>" + propLabel + "</span>" : "") +
    "<span class='pill'>Peak: " +
    sz.pW +
    "W</span>" +
    "<span class='pill'>Daily: " +
    sz.dWh +
    " Wh</span>" +
    "<span class='pill'>Solar: ~" +
    (sz.solarCoverage || 0) +
    "%</span>" +
    "<span class='pill'>Backup: ~" +
    sz.bk +
    "h</span>" +
    (sz.fit?.notes?.[0]
      ? "<span class='pill'>" +
        String(sz.fit.notes[0]).replace(/<[^>]+>/g, "").slice(0, 72) +
        "</span>"
      : "") +
    "</div>" +
    (client.phone || client.address || client.email
      ? "<div class='cdetails'>" +
        (client.phone
          ? "<div class='cdet-item'><div class='cdet-label'>Phone / WhatsApp</div>" + client.phone + "</div>"
          : "") +
        (client.email
          ? "<div class='cdet-item'><div class='cdet-label'>Email</div>" + client.email + "</div>"
          : "") +
        (client.address
          ? "<div class='cdet-item'><div class='cdet-label'>Address / Area</div>" + client.address + "</div>"
          : "") +
        (client.notes
          ? "<div class='cdet-item'><div class='cdet-label'>Notes</div>" + client.notes + "</div>"
          : "") +
        "</div>"
      : "") +
    "</div></div>" +
    "<div class='sec'><h3>Recommended System</h3><div class='hero'>" +
    "<div class='hr'><div><div class='ht'>Sized to your load</div><div class='hn'>" +
    heroTitle +
    "</div><div class='hn2'>" +
    heroSub +
    "</div></div>" +
    "<div><div class='hp'>$" +
    grandTotal.toLocaleString() +
    "</div><div class='hu'>" +
    priceSub +
    "</div></div></div>" +
    "<div class='hstats'>" +
    "<div class='hs'><strong>" +
    sz.kva +
    " kVA</strong><span>Package</span></div>" +
    "<div class='hs'><strong>" +
    sz.bc +
    "×</strong><span>Batteries</span></div>" +
    "<div class='hs'><strong>" +
    sz.pc +
    "× " +
    sz.pan.w +
    "W</strong><span>Panels</span></div>" +
    "<div class='hs'><strong>~" +
    sz.bk +
    "h</strong><span>Backup (est.)</span></div>" +
    "</div>" +
    buildEcoFootprintHtml(sz.dWh, sz.dailyGenWh) +
    "</div></div>" +
    "<div class='sec'><h3>Package and pricing</h3>" +
    quoteTableOpen() +
    productRows +
    deliveryRows +
    "</tbody></table></div>" +
    "<div class='terms'>" +
    "<strong>Valid " +
    validity.days +
    " days</strong> (until " +
    validity.validUntilLabel +
    "). 50% deposit confirms your order. Prices in USD from Energi Tech. " +
    PACKAGE_PRICE_NOTE +
    " " +
    (dq
      ? dq.feePending
        ? "Outside delivery — $" +
          OUTSIDE_DELIVERY_PER_KM_USD +
          "/km after " +
          OUTSIDE_DELIVERY_FREE_KM +
          " km free."
        : dq.zone === "outside" && dq.fee > 0
          ? "Includes $" + dq.fee + " delivery (" + deliveryPricingLabel(dq.km) + ")."
          : dq.km > 0
            ? "Within " + OUTSIDE_DELIVERY_FREE_KM + " km (~" + dq.km + " km) — installation included."
            : "Harare installation included."
      : "Harare installation included.") +
    " Contact 077 375 7018 on WhatsApp to pay and book installation. Heating appliances (kettles, irons, microwaves) need a separate review because of surge risk." +
    "</div>" +
    "<div class='footer'><div><div class='fb'>SolarApp</div><div class='fc'>Energi Tech · 077 375 7018 · Zimbabwe</div></div>" +
    "<span class='badge'>PDF Quote " +
    ref +
    "</span></div></div></div>"
  );

  return { ref, body };
}

function buildCustomQuoteDocument(client, sz, appList, propLabel) {
  const validity = getQuoteValidity();
  const ref = "SA-CUSTOM-" + Date.now().toString().slice(-6);
  const fit = sz.fit || {};
  const refPkg = fit.referencePkg;

  let rows = "";
  for (let i = 0; i < appList.length; i++) {
    const a = appList[i];
    rows +=
      "<tr><td class='c-item'>" +
      a.label +
      "</td><td class='c-qty'>" +
      a.h +
      "h</td><td class='c-qty'>" +
      a.w +
      "W</td><td class='c-sub'>" +
      Math.round(a.w * a.h) +
      " Wh</td></tr>";
  }

  const reqRows =
    "<tr><td class='c-item'>Inverter (est.)</td><td class='c-spec'>~" +
    (sz.kvaReq || sz.kva) +
    " kVA+ hybrid · " +
    (fit.requiredInverterW || 0).toLocaleString() +
    "W peak with headroom</td><td class='c-qty'>1</td><td class='c-unit'>Custom</td><td class='c-sub tbd'>TBD</td></tr>" +
    "<tr><td class='c-item'>Battery bank (est.)</td><td class='c-spec'>~" +
    Math.round((fit.requiredBatteryWh || 0) / 1000) +
    " kWh usable capacity</td><td class='c-qty'>1</td><td class='c-unit'>Custom</td><td class='c-sub tbd'>TBD</td></tr>" +
    "<tr><td class='c-item'>Solar array (est.)</td><td class='c-spec'>~" +
    Math.round((fit.requiredSolarWh || 0) / 1000) +
    " kWh/day generation target</td><td class='c-qty'>1</td><td class='c-unit'>Custom</td><td class='c-sub tbd'>TBD</td></tr>" +
    (refPkg
      ? "<tr class='tbl-refpkg'><td class='c-spec' colspan='5'>Largest standard package: " +
        refPkg.name +
        " ($" +
        refPkg.price.toLocaleString() +
        ") — your load exceeds this design. Energi Tech will quote supply + Harare installation (or $" +
        OUTSIDE_DELIVERY_PER_KM_USD +
        "/km delivery after " +
        OUTSIDE_DELIVERY_FREE_KM +
        " km) after review.</td></tr>"
      : "") +
    "<tr class='tr-tot'><td class='c-item' colspan='4'>Custom quotation total</td><td class='c-sub' style='font-style:italic'>On request</td></tr>";

  const notesHtml = (fit.notes || [])
    .map((n) => "<li>" + n + "</li>")
    .join("");

  const body = wrapQuoteBody(
    "<div class='quote-inner'>" +
    quotePdfHead() +
    "<style>" +
    QUOTE_STYLES +
    "</style>" +
    "<div class='stripe'></div>" +
    "<div class='hdr'><div><div class='logo'>Solar<em>App</em></div><div class='sub'>Powered by Energi Tech · Premium Solar Supply</div></div>" +
    "<div class='meta'><div class='mq'>Custom Quotation Request</div><div class='mr'>" +
    ref +
    "</div><div class='md'>Issued " +
    validity.issuedLabel +
    "</div><div class='validity'>Valid " +
    validity.days +
    " days · until " +
    validity.validUntilLabel +
    "</div><p class='conf'>Confidential — for " +
    (client.name || "named client") +
    " only. Official PDF from SolarApp; screenshots are not valid quotes.</p></div></div>" +
    "<div class='sec'><h3>Prepared for</h3><div class='cbox'>" +
    "<div class='cn'>" +
    (client.name || "Valued Customer") +
    "</div>" +
    "<div class='cpills'>" +
    (propLabel ? "<span class='pill'>" + propLabel + "</span>" : "") +
    "<span class='pill'>Peak: " +
    sz.pW +
    "W</span>" +
    "<span class='pill'>Daily: " +
    sz.dWh +
    " Wh</span>" +
    "<span class='pill'>Custom design</span>" +
    "</div>" +
    (client.phone || client.address || client.email || client.notes
      ? "<div class='cdetails'>" +
        (client.phone
          ? "<div class='cdet-item'><div class='cdet-label'>Phone / WhatsApp</div>" + client.phone + "</div>"
          : "") +
        (client.email
          ? "<div class='cdet-item'><div class='cdet-label'>Email</div>" + client.email + "</div>"
          : "") +
        (client.address
          ? "<div class='cdet-item'><div class='cdet-label'>Address / Area</div>" + client.address + "</div>"
          : "") +
        (client.notes
          ? "<div class='cdet-item'><div class='cdet-label'>Your request / notes</div>" + client.notes + "</div>"
          : "") +
        "</div>"
      : "") +
    "</div></div>" +
    "<div class='sec'><h3>Your load — custom system required</h3><div class='hero hero--custom'>" +
    "<div class='hr'><div><div class='ht'>Exceeds largest standard package</div><div class='hn'>Custom solar system</div><div class='hn2'>10.2 kVA is our largest off-the-shelf package — Energi Tech will size to your request.</div></div>" +
    "<div><div class='hp hp--sm'>Custom quote</div><div class='hu'>USD · Priced after review</div></div></div>" +
    "<div class='hstats'>" +
    "<div class='hs'><strong>" +
    (sz.kvaReq || sz.kva) +
    " kVA+</strong><span>Inverter est.</span></div>" +
    "<div class='hs'><strong>" +
    Math.round((fit.requiredBatteryWh || 0) / 1000) +
    " kWh+</strong><span>Battery est.</span></div>" +
    "<div class='hs'><strong>" +
    Math.round((fit.requiredSolarWh || 0) / 1000) +
    " kWh</strong><span>Solar/day est.</span></div>" +
    "<div class='hs'><strong>" +
    sz.pW +
    "W</strong><span>Peak load</span></div>" +
    "</div>" +
    (notesHtml
      ? "<ul class='hero-notes'>" + notesHtml + "</ul>"
      : "") +
    "</div></div>" +
    "<div class='sec'><h3>Estimated requirements (indicative)</h3>" +
    quoteTableOpen() +
    reqRows +
    "</tbody></table></div>" +
    (rows
      ? "<div class='sec'><h3>Appliances in your request</h3>" +
        quoteApplianceTableOpen() +
        rows +
        "</tbody></table></div>"
      : "") +
    "<div class='terms'>" +
    "• This is a <strong>custom quotation request</strong> — not a fixed package price.<br/>" +
    "• Energi Tech will contact you with a tailored design, USD pricing, and installation (Harare and within " +
    OUTSIDE_DELIVERY_FREE_KM +
    " km included; $" +
    OUTSIDE_DELIVERY_PER_KM_USD +
    "/km delivery beyond).<br/>" +
    "<strong>• Valid " +
    validity.days +
    " days</strong> (issued " +
    validity.issuedLabel +
    ", expires " +
    validity.validUntilLabel +
    ").<br/>" +
    "• Use the notes field for any special requests (phased installation, existing panels, etc.).<br/>" +
    "• Based on appliances and hours you provided; site visit may be required for final quote." +
    "</div>" +
    "<div class='footer'><div><div class='fb'>SolarApp</div><div class='fc'>Energi Tech · 077 375 7018 · Zimbabwe</div></div>" +
    "<span class='badge'>Custom " +
    ref +
    "</span></div></div></div>"
  );

  return { ref, body };
}
