import {
  OUTSIDE_DEALER_ADVISORY,
  OUTSIDE_DELIVERY_PER_KM_USD,
  HARARE_INSTALL_INCLUDED_NOTE,
  PACKAGE_PRICE_NOTE,
} from "./delivery.js";
import { environmentalImpact } from "./environment.js";

const SUN_HOURS = 5.5;

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

const QUOTE_STYLES =
  "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');" +
  "*{margin:0;padding:0;box-sizing:border-box}" +
  ".su-quote{font-family:'Outfit',Arial,sans-serif;background:#fff;color:#111;font-size:11.5px;width:760px;padding:28px 32px;-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
  ".stripe{height:4px;background:linear-gradient(90deg,#8B6914,#D4AF37 40%,#2D8B5E 80%);margin-bottom:22px;border-radius:2px}" +
  ".hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:16px;border-bottom:1.5px solid #E8D98A}" +
  ".logo{font-family:'Cormorant Garamond',Georgia,serif;font-size:32px;font-weight:700;letter-spacing:3px;color:#111}.logo em{color:#C9A227;font-style:normal}" +
  ".sub{font-size:8.5px;color:#999;letter-spacing:3px;text-transform:uppercase;margin-top:4px}" +
  ".meta{text-align:right}.mq{font-size:8px;letter-spacing:2.5px;text-transform:uppercase;color:#C9A227;margin-bottom:3px}" +
  ".mr{font-size:15px;font-weight:700;letter-spacing:1px}.md{font-size:9.5px;color:#888;margin-top:1px}.mv{font-size:9px;color:#C9A227;font-weight:600}" +
  ".validity{display:inline-block;margin-top:6px;padding:5px 10px;background:#FDF6E3;border:1px solid #E8D98A;border-radius:8px;font-size:9px;color:#7A6010;font-weight:600;letter-spacing:.04em}" +
  "h3{font-size:8.5px;letter-spacing:3px;text-transform:uppercase;color:#C9A227;margin:0 0 8px;font-weight:600}" +
  ".sec{margin-bottom:18px}" +
  ".cbox{background:#FFFDF5;border:1px solid #E8D98A;border-radius:10px;padding:14px 18px}" +
  ".cn{font-size:19px;font-weight:700;margin-bottom:6px;color:#111}" +
  ".cpills{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:8px}" +
  ".pill{background:#F5EFC0;border:1px solid #E8D98A;border-radius:12px;padding:3px 10px;font-size:9px;color:#7A6010;font-weight:600}" +
  ".cdetails{display:grid;grid-template-columns:1fr 1fr;gap:6px 20px;margin-top:8px;padding-top:8px;border-top:1px solid #EDE8D0}" +
  ".cdet-item{font-size:10px;color:#555}.cdet-label{color:#999;font-size:9px;margin-bottom:1px}" +
  ".hero{background:linear-gradient(135deg,#05080A 0%,#0A1A12 55%,#1A3A28 100%);border-radius:12px;padding:20px 22px;color:#fff;position:relative;overflow:hidden}" +
  ".hero:before{content:'';position:absolute;top:-40px;right:-40px;width:130px;height:130px;background:radial-gradient(circle,rgba(212,175,55,.2),transparent 70%);border-radius:50%}" +
  ".hr{display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:1}" +
  ".ht{font-size:8px;letter-spacing:3px;text-transform:uppercase;color:rgba(212,175,55,.7);margin-bottom:4px}" +
  ".hn{font-family:'Cormorant Garamond',Georgia,serif;font-size:34px;font-weight:700;color:#fff;line-height:1;margin-bottom:2px}" +
  ".hn2{font-size:9px;color:rgba(255,255,255,.35)}" +
  ".hp{font-family:'Cormorant Garamond',Georgia,serif;font-size:40px;font-weight:700;color:#E8C547;line-height:1}" +
  ".hu{font-size:9px;color:rgba(212,175,55,.5);text-align:right;margin-top:2px}" +
  ".hstats{display:flex;gap:18px;margin-top:12px;padding-top:11px;border-top:1px solid rgba(255,255,255,.08);position:relative;z-index:1}" +
  ".hs strong{color:rgba(232,197,71,.95);display:block;font-size:12px;font-weight:700;margin-bottom:1px}.hs{font-size:9px;color:rgba(255,255,255,.4)}" +
  "table{width:100%;border-collapse:collapse;margin-bottom:14px}" +
  "th{background:#FDFAF0;padding:8px 12px;text-align:left;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#8A7020;font-weight:600;border-bottom:2px solid #E8D98A}" +
  "td{padding:8px 12px;border-bottom:1px solid #F5F0E0;font-size:11px;vertical-align:middle}" +
  "td:first-child{font-weight:600;color:#6A5010}" +
  ".tr-tot td{background:#FDFAF0;font-weight:700}" +
  ".terms{background:#FAFAFA;border-left:3px solid #D4AF37;border-radius:0 6px 6px 0;padding:11px 14px;font-size:10px;color:#555;line-height:1.9}" +
  ".footer{display:flex;justify-content:space-between;align-items:flex-end;padding-top:11px;border-top:1px solid #EDE8D0}" +
  ".fb{font-size:14px;font-weight:700;color:#A8841A}.fc{font-size:9px;color:#888;margin-top:2px}" +
  ".badge{background:linear-gradient(135deg,#A8841A,#D4AF37);color:#fff;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 12px;border-radius:12px}" +
  ".eco-foot{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px;padding-top:11px;border-top:1px solid rgba(61,214,140,.25);position:relative;z-index:1}" +
  ".eco-foot-lbl{grid-column:1/-1;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:rgba(61,214,140,.85);text-align:center;margin-bottom:2px}" +
  ".eco-cell strong{display:block;font-size:14px;font-weight:700;color:#7AE8B8;line-height:1.1}.eco-cell{font-size:8px;color:rgba(255,255,255,.45);text-align:center}";

function buildEcoFootprintHtml(dWh, dailyGenWh) {
  const eco = environmentalImpact(dWh, dailyGenWh || 0);
  const car =
    eco.carKm >= 1000 ? Math.round(eco.carKm / 1000) + "k km" : eco.carKm.toLocaleString() + " km";
  return (
    "<div class='eco-foot'><div class='eco-foot-lbl'>Estimated green impact vs ZESA grid</div>" +
    "<div class='eco-cell'><strong>" +
    eco.co2Tonnes +
    "t</strong>CO₂ saved / yr</div>" +
    "<div class='eco-cell'><strong>" +
    eco.trees +
    "</strong>Trees equivalent</div>" +
    "<div class='eco-cell'><strong>" +
    car +
    "</strong>Car emissions off</div></div>"
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
  const powersHtml = pkg && pkg.powers.length
    ? "<p style='font-size:10px;color:#666;margin-top:8px'><strong>Typical loads:</strong> " +
      pkg.powers.join(" · ") +
      "</p>"
    : "";

  const productRows = pkg
    ? "<tr><td>Solar package</td><td>" +
      pkg.name +
      "<ul style='margin:6px 0 0;padding-left:16px;font-size:10px;color:#555;font-weight:400'>" +
      includesHtml +
      "</ul>" +
      powersHtml +
      "</td><td style='text-align:center'>1</td><td>$" +
      pkg.price.toLocaleString() +
      "</td><td>$" +
      pkg.price.toLocaleString() +
      "</td></tr>" +
      "<tr class='tr-tot'><td colspan='4' style='text-align:right;color:#A8841A;padding-right:16px'>Package total (Harare install incl.)</td><td style='color:#C9A227;font-size:14px;font-weight:700'>$" +
      sz.tot.toLocaleString() +
      "</td></tr>"
    : "<tr><td>Inverter</td><td>" +
      sz.inv.brand +
      " " +
      sz.inv.name +
      "</td><td style='text-align:center'>1</td><td>$" +
      sz.inv.price +
      "</td><td>$" +
      sz.inv.price +
      "</td></tr>" +
      "<tr><td>Batteries</td><td>" +
      sz.bat.brand +
      " " +
      sz.bat.name +
      "</td><td style='text-align:center'>" +
      sz.bc +
      "</td><td>$" +
      sz.bat.price +
      "</td><td>$" +
      sz.bat.price * sz.bc +
      "</td></tr>" +
      "<tr><td>Solar Panels</td><td>" +
      sz.pan.brand +
      " " +
      sz.pan.name +
      " (~" +
      (sz.dailyGenWh || 0).toLocaleString() +
      " Wh/day)</td><td style='text-align:center'>" +
      sz.pc +
      "</td><td>$" +
      sz.pan.price +
      "</td><td>$" +
      sz.pan.price * sz.pc +
      "</td></tr>" +
      "<tr class='tr-tot'><td colspan='4' style='text-align:right;color:#A8841A;padding-right:16px'>Total product supply</td><td style='color:#C9A227;font-size:14px;font-weight:700'>$" +
      sz.tot.toLocaleString() +
      "</td></tr>";

  const deliveryRows = !dq
    ? "<tr><td colspan='5' style='font-size:10px;color:#777;padding:10px 12px;background:#FAFAFA'>" +
      PACKAGE_PRICE_NOTE +
      "</td></tr>"
    : dq.feePending
      ? "<tr><td>Delivery (outside Harare)</td><td>" +
        (dq.locationLabel || "Outside Harare") +
        ". Enter distance on quote for $" +
        OUTSIDE_DELIVERY_PER_KM_USD +
        "/km estimate.</td><td style='text-align:center'>—</td><td>TBD</td><td style='color:#777;font-style:italic'>TBD</td></tr>" +
        "<tr><td colspan='5' style='font-size:10px;color:#555;padding:10px 12px;background:#F0F7FF;border-left:3px solid #5B9CF5'>" +
        OUTSIDE_DEALER_ADVISORY +
        "</td></tr>" +
        "<tr class='tr-tot'><td colspan='4' style='text-align:right;color:#A8841A;padding-right:16px;font-weight:700'>Quotation total (package)</td><td style='color:#C9A227;font-size:15px;font-weight:700'>$" +
        sz.tot.toLocaleString() +
        "</td></tr>"
      : dq.zone === "outside"
        ? "<tr><td>Delivery (outside Harare)</td><td>" +
          dq.km +
          " km × $" +
          OUTSIDE_DELIVERY_PER_KM_USD +
          "/km" +
          (dq.locationLabel ? " — " + dq.locationLabel : "") +
          "</td><td style='text-align:center'>1</td><td>$" +
          dq.fee +
          "</td><td>$" +
          dq.fee +
          "</td></tr>" +
          "<tr class='tr-tot'><td colspan='4' style='text-align:right;color:#A8841A;padding-right:16px;font-weight:700'>Grand total</td><td style='color:#C9A227;font-size:15px;font-weight:700'>$" +
          grandTotal.toLocaleString() +
          "</td></tr>"
        : "<tr><td>Installation</td><td>Harare — " +
          HARARE_INSTALL_INCLUDED_NOTE +
          "</td><td style='text-align:center'>1</td><td>Included</td><td>$0</td></tr>" +
          "<tr class='tr-tot'><td colspan='4' style='text-align:right;color:#A8841A;padding-right:16px;font-weight:700'>Grand total (Harare)</td><td style='color:#C9A227;font-size:15px;font-weight:700'>$" +
          grandTotal.toLocaleString() +
          "</td></tr>";

  const heroTitle = pkg ? pkg.name : sz.kva + " kVA";
  const heroSub = pkg
    ? PACKAGE_PRICE_NOTE
    : "Free sizing · Hardware supply · Installation quoted on site";
  const priceSub = dq
    ? dq.feePending
      ? "USD · Package · outside delivery TBD"
      : dq.zone === "outside"
        ? "USD · Package + $" + dq.fee + " delivery"
        : "USD · Harare install included"
    : "USD · Package (Harare install incl.)";
  let rows = "";
  for (let i = 0; i < appList.length; i++) {
    const a = appList[i];
    rows +=
      "<tr><td>" +
      a.label +
      "</td><td style='text-align:center'>" +
      a.h +
      "h</td><td style='text-align:center'>" +
      a.w +
      "W</td><td style='text-align:center'>" +
      Math.round(a.w * a.h) +
      " Wh</td></tr>";
  }

  const body =
    "<div class='su-quote'>" +
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
    "</div><div class='mv' style='margin-top:6px'>Free sizing service · Energi Tech</div></div></div>" +
    "<div class='sec'><h3>Prepared For</h3><div class='cbox'>" +
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
    " kVA</strong>Package</div>" +
    "<div class='hs'><strong>" +
    sz.bc +
    "×</strong>Batteries</div>" +
    "<div class='hs'><strong>" +
    sz.pc +
    "× " +
    sz.pan.w +
    "W</strong>Panels</div>" +
    "<div class='hs'><strong>~" +
    sz.bk +
    "h</strong>Backup est.</div>" +
    "</div>" +
    buildEcoFootprintHtml(sz.dWh, sz.dailyGenWh) +
    "</div></div>" +
    "<div class='sec'><h3>Package & pricing</h3>" +
    "<table><thead><tr><th>Item</th><th>Specification</th><th>Qty</th><th>Unit</th><th>Subtotal</th></tr></thead><tbody>" +
    productRows +
    deliveryRows +
    "</tbody></table></div>" +
    (rows
      ? "<div class='sec'><h3>Appliances in This Sizing</h3><table><thead><tr><th>Appliance</th><th style='text-align:center'>Hrs/day</th><th style='text-align:center'>Watts</th><th style='text-align:center'>Daily Wh</th></tr></thead><tbody>" +
        rows +
        "</tbody></table></div>"
      : "") +
    "<div class='terms'>" +
    "• SolarApp sizing and this quotation are 100% free — you only pay if you order hardware.<br/>" +
    "<strong>• This quotation is valid for " +
    validity.days +
    " days only</strong> (issued " +
    validity.issuedLabel +
    ", expires " +
    validity.validUntilLabel +
    ").<br/>" +
    "• " +
    PACKAGE_PRICE_NOTE +
    "<br/>" +
    (dq
      ? dq.feePending
        ? "• Outside Harare delivery requested" +
          (dq.locationLabel ? " (" + dq.locationLabel + ")" : "") +
          " — $" +
          OUTSIDE_DELIVERY_PER_KM_USD +
          "/km once distance confirmed.<br/>"
        : dq.zone === "outside"
          ? "• Includes $" +
            dq.fee +
            " delivery (" +
            dq.km +
            " km × $" +
            OUTSIDE_DELIVERY_PER_KM_USD +
            "/km). Harare installation is in the package price.<br/>"
          : "• Harare full installation included in package price.<br/>"
      : "• Harare full installation included in package price.<br/>") +
    "• Package prices are USD from Energi Tech.<br/>" +
    "• Panels sized for ~" +
    SUN_HOURS +
    " peak sun hours with margin to cover your daily load.<br/>" +
    "• 50% deposit confirms supply · 5-year manufacturer warranty.<br/>" +
    "• Package matched to your peak load, battery backup, and daily solar yield (simultaneous peak assumed).<br/>" +
    "• Based on appliances and hours you provided; performance may vary with usage.<br/>" +
    "• Electric kettles, microwaves, irons and similar heating elements are not included in this sizing (surge risk to inverters/batteries) — ask Energi Tech for alternatives." +
    "</div>" +
    "<div class='footer'><div><div class='fb'>SolarApp</div><div class='fc'>Energi Tech · 0773757018 · Zimbabwe</div></div>" +
    "<span class='badge'>PDF Quote " +
    ref +
    "</span></div></div>";

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
      "<tr><td>" +
      a.label +
      "</td><td style='text-align:center'>" +
      a.h +
      "h</td><td style='text-align:center'>" +
      a.w +
      "W</td><td style='text-align:center'>" +
      Math.round(a.w * a.h) +
      " Wh</td></tr>";
  }

  const reqRows =
    "<tr><td>Inverter (est.)</td><td>~" +
    (sz.kvaReq || sz.kva) +
    " kVA+ hybrid · " +
    (fit.requiredInverterW || 0).toLocaleString() +
    "W peak with headroom</td><td style='text-align:center'>1</td><td>Custom</td><td style='font-style:italic;color:#777'>TBD</td></tr>" +
    "<tr><td>Battery bank (est.)</td><td>~" +
    Math.round((fit.requiredBatteryWh || 0) / 1000) +
    " kWh usable capacity</td><td style='text-align:center'>1</td><td>Custom</td><td style='font-style:italic;color:#777'>TBD</td></tr>" +
    "<tr><td>Solar array (est.)</td><td>~" +
    Math.round((fit.requiredSolarWh || 0) / 1000) +
    " kWh/day generation target</td><td style='text-align:center'>1</td><td>Custom</td><td style='font-style:italic;color:#777'>TBD</td></tr>" +
    (refPkg
      ? "<tr><td colspan='5' style='font-size:10px;color:#555;padding:10px 12px;background:#FFF8E8'>Largest standard package: " +
        refPkg.name +
        " ($" +
        refPkg.price.toLocaleString() +
        ") — your load exceeds this design. Energi Tech will quote supply + Harare install (or $0.50/km outside Harare) after review.</td></tr>"
      : "") +
    "<tr class='tr-tot'><td colspan='4' style='text-align:right;color:#A8841A;padding-right:16px;font-weight:700'>Custom quotation total</td><td style='color:#C9A227;font-size:15px;font-weight:700;font-style:italic'>On request</td></tr>";

  const notesHtml = (fit.notes || [])
    .map((n) => "<li>" + n + "</li>")
    .join("");

  const body =
    "<div class='su-quote'>" +
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
    "</div></div></div>" +
    "<div class='sec'><h3>Prepared For</h3><div class='cbox'>" +
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
    "<div class='sec'><h3>Your load — custom system required</h3><div class='hero'>" +
    "<div class='hr'><div><div class='ht'>Exceeds largest standard package</div><div class='hn'>Custom solar system</div><div class='hn2'>10.2Kva is our largest off-the-shelf package — Energi Tech will size to your request.</div></div>" +
    "<div><div class='hp' style='font-size:28px'>Custom quote</div><div class='hu'>USD · Priced after review</div></div></div>" +
    "<div class='hstats'>" +
    "<div class='hs'><strong>" +
    (sz.kvaReq || sz.kva) +
    " kVA+</strong>Inverter est.</div>" +
    "<div class='hs'><strong>" +
    Math.round((fit.requiredBatteryWh || 0) / 1000) +
    " kWh+</strong>Battery est.</div>" +
    "<div class='hs'><strong>" +
    Math.round((fit.requiredSolarWh || 0) / 1000) +
    " kWh</strong>Solar/day est.</div>" +
    "<div class='hs'><strong>" +
    sz.pW +
    "W</strong>Peak load</div>" +
    "</div>" +
    (notesHtml
      ? "<ul style='margin:12px 0 0;padding-left:18px;font-size:10px;color:rgba(255,255,255,.55);line-height:1.5'>" +
        notesHtml +
        "</ul>"
      : "") +
    "</div></div>" +
    "<div class='sec'><h3>Estimated requirements (indicative)</h3>" +
    "<table><thead><tr><th>Component</th><th>Specification</th><th>Qty</th><th>Unit</th><th>Subtotal</th></tr></thead><tbody>" +
    reqRows +
    "</tbody></table></div>" +
    (rows
      ? "<div class='sec'><h3>Appliances in your request</h3><table><thead><tr><th>Appliance</th><th style='text-align:center'>Hrs/day</th><th style='text-align:center'>Watts</th><th style='text-align:center'>Daily Wh</th></tr></thead><tbody>" +
        rows +
        "</tbody></table></div>"
      : "") +
    "<div class='terms'>" +
    "• This is a <strong>custom quotation request</strong> — not a fixed package price.<br/>" +
    "• Energi Tech will contact you with a tailored design, USD pricing, and installation (Harare included in package-style quotes; outside Harare at $0.50/km).<br/>" +
    "<strong>• Valid " +
    validity.days +
    " days</strong> (issued " +
    validity.issuedLabel +
    ", expires " +
    validity.validUntilLabel +
    ").<br/>" +
    "• Use the notes field for any special requests (phased install, existing panels, etc.).<br/>" +
    "• Based on appliances and hours you provided; site visit may be required for final quote." +
    "</div>" +
    "<div class='footer'><div><div class='fb'>SolarApp</div><div class='fc'>Energi Tech · 0773757018 · Zimbabwe</div></div>" +
    "<span class='badge'>Custom " +
    ref +
    "</span></div></div>";

  return { ref, body };
}
