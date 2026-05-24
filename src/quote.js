import { DELIVERY_INSTALL_HARARE_USD, OUTSIDE_DEALER_ADVISORY } from "./delivery.js";

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
  ".badge{background:linear-gradient(135deg,#A8841A,#D4AF37);color:#fff;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 12px;border-radius:12px}";

export function buildQuoteDocument(client, sz, appList, propLabel, deliveryQuote) {
  const dq = deliveryQuote && deliveryQuote.enabled ? deliveryQuote : null;
  const grandTotal = sz.tot + (dq ? dq.fee : 0);
  const validity = getQuoteValidity();
  const ref = "SU-" + Date.now().toString().slice(-6);
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
    "<div class='hdr'><div><div class='logo'>SOLAR<em>UP</em></div><div class='sub'>Powered by Energi Tech · Premium Solar Supply</div></div>" +
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
    "<div class='hr'><div><div class='ht'>Custom Sized Solar System</div><div class='hn'>" +
    sz.kva +
    " kVA</div><div class='hn2'>Free sizing · Hardware supply · Installation quoted on site</div></div>" +
    "<div><div class='hp'>$" +
    grandTotal.toLocaleString() +
    "</div><div class='hu'>" +
    (dq
      ? dq.feePending
        ? "USD · Products on quote · delivery cost by dealer (location)"
        : "USD · Products + delivery & install"
      : "USD · Products only") +
    "</div></div></div>" +
    "<div class='hstats'>" +
    "<div class='hs'><strong>" +
    sz.kva +
    " kVA</strong>Inverter</div>" +
    "<div class='hs'><strong>" +
    sz.bc +
    "× " +
    sz.bat.brand +
    "</strong>Batteries</div>" +
    "<div class='hs'><strong>" +
    sz.pc +
    "× " +
    sz.pan.w +
    "W</strong>Panels</div>" +
    "<div class='hs'><strong>~" +
    sz.bk +
    "h</strong>Backup</div>" +
    "</div></div></div>" +
    "<div class='sec'><h3>System Components</h3>" +
    "<table><thead><tr><th>Component</th><th>Specification</th><th>Qty</th><th>Unit</th><th>Subtotal</th></tr></thead><tbody>" +
    "<tr><td>Inverter</td><td>" +
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
    "</td></tr>" +
    (dq
      ? dq.feePending
        ? "<tr><td>Delivery & installation</td><td>Outside Harare" +
          (dq.locationLabel ? " — " + dq.locationLabel : "") +
          ". Cost depends on geographic location — Energi Tech dealer to advise.</td><td style='text-align:center'>1</td><td>By location</td><td style='color:#777;font-style:italic'>TBD</td></tr>" +
          "<tr><td colspan='5' style='font-size:10px;color:#555;padding:10px 12px;background:#F0F7FF;border-left:3px solid #5B9CF5'>" +
          OUTSIDE_DEALER_ADVISORY +
          " Harare-area reference from $" +
          DELIVERY_INSTALL_HARARE_USD +
          ".</td></tr>" +
          "<tr class='tr-tot'><td colspan='4' style='text-align:right;color:#A8841A;padding-right:16px;font-weight:700'>Quotation total (products)</td><td style='color:#C9A227;font-size:15px;font-weight:700'>$" +
          sz.tot.toLocaleString() +
          "</td></tr>"
        : "<tr><td>Delivery & installation</td><td>Harare area</td><td style='text-align:center'>1</td><td>$" +
          dq.fee +
          "</td><td>$" +
          dq.fee +
          "</td></tr>" +
          "<tr class='tr-tot'><td colspan='4' style='text-align:right;color:#A8841A;padding-right:16px;font-weight:700'>Grand total (incl. delivery)</td><td style='color:#C9A227;font-size:15px;font-weight:700'>$" +
          grandTotal.toLocaleString() +
          "</td></tr>"
      : "<tr><td colspan='5' style='font-size:10px;color:#777;padding:10px 12px;background:#FAFAFA'>Delivery & installation not included. Harare from $" +
        DELIVERY_INSTALL_HARARE_USD +
        "; outside Harare priced by your dealer based on location.</td></tr>") +
    "</tbody></table></div>" +
    (rows
      ? "<div class='sec'><h3>Appliances in This Sizing</h3><table><thead><tr><th>Appliance</th><th style='text-align:center'>Hrs/day</th><th style='text-align:center'>Watts</th><th style='text-align:center'>Daily Wh</th></tr></thead><tbody>" +
        rows +
        "</tbody></table></div>"
      : "") +
    "<div class='terms'>" +
    "• Solar Up sizing and this quotation are 100% free — you only pay if you order hardware.<br/>" +
    "<strong>• This quotation is valid for " +
    validity.days +
    " days only</strong> (issued " +
    validity.issuedLabel +
    ", expires " +
    validity.validUntilLabel +
    ").<br/>" +
    (dq
      ? dq.feePending
        ? "• Delivery & installation requested for outside Harare" +
          (dq.locationLabel ? " (" + dq.locationLabel + ")" : "") +
          ". " +
          OUTSIDE_DEALER_ADVISORY +
          "<br/>"
        : "• Includes delivery & installation: $" +
          dq.fee +
          " (Harare) as selected on this quote.<br/>"
      : "• Delivery & installation not included; Harare from $" +
        DELIVERY_INSTALL_HARARE_USD +
        "; outside Harare quoted by dealer by location.<br/>") +
    "• Prices are product supply (USD) from Energi Tech.<br/>" +
    "• Panels sized for ~" +
    SUN_HOURS +
    " peak sun hours with margin to cover your daily load.<br/>" +
    "• 50% deposit confirms supply · 5-year manufacturer warranty.<br/>" +
    "• Based on appliances and hours you provided; performance may vary with usage." +
    "</div>" +
    "<div class='footer'><div><div class='fb'>Solar Up</div><div class='fc'>Energi Tech · 0773757018 · Zimbabwe</div></div>" +
    "<span class='badge'>PDF Quote " +
    ref +
    "</span></div></div>";

  return { ref, body };
}
