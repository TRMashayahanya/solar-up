import React, { useState, useEffect, useRef } from "react";
import { W4, ci } from "./tokens.js";
import { PrtIco, UsrIco, PhIco, LocIco, NoteIco } from "./icons.js";
import { DeliveryInstallOption } from "./DeliveryInstallOption.js";
import { getQuoteValidity } from "./quote.js";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("SolarApp render error:", error, info);
  }
  render() {
    if (this.state.error) {
      return React.createElement(
        "div",
        {
          style: {
            padding: 20,
            margin: 16,
            background: "rgba(248,113,113,.1)",
            border: "1px solid rgba(248,113,113,.35)",
            borderRadius: 12,
            color: "#F87171",
            fontSize: 13,
            lineHeight: 1.5,
          },
        },
        React.createElement("strong", null, "Something went wrong"),
        React.createElement("p", { style: { margin: "8px 0 0", color: W4 } }, String(this.state.error.message)),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: () => this.setState({ error: null }),
            style: {
              marginTop: 12,
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid var(--border-strong)",
              background: "transparent",
              color: "var(--text-primary)",
              cursor: "pointer",
              fontFamily: "inherit",
            },
          },
          "Try again"
        )
      );
    }
    return this.props.children;
  }
}

export function useCount(t) {
  const [v, sv] = useState(0);
  useEffect(() => {
    const target = t || 0;
    if (!target) {
      sv(0);
      return;
    }
    let s = null;
    let r;
    function tick(ts) {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 900, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      sv(p >= 1 ? target : Math.floor(eased * target));
      if (p < 1) r = requestAnimationFrame(tick);
    }
    r = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(r);
  }, [t]);
  return v;
}

export { LoadMeter as WattMeter } from "./ui.js";

function validLead(form) {
  return (
    (form.name || "").trim().length >= 2 &&
    (form.phone || "").trim().length >= 8 &&
    (form.email || "").trim().includes("@") &&
    (form.address || "").trim().length >= 3
  );
}

export function ClientModal(p) {
  const onClose = p.onClose;
  const onDone = p.onDone;
  const busy = p.busy;
  const err = p.error || "";
  const customQuote = !!p.customQuote;
  const deliveryOpts = p.deliveryOpts || { enabled: false, zone: "harare" };
  const onDeliveryChange = p.onDeliveryChange;
  const productTotal = p.productTotal || 0;
  const onAddressBlur = p.onAddressBlur;
  const validity = getQuoteValidity();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", notes: "" });
  const ok = validLead(form);

  function upd(k) {
    return (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  const icon = (Ico, s) =>
    React.createElement(
      "span",
      { className: "quote-gold-icon" },
      React.createElement(Ico, { s: s || 13, c: "currentColor" })
    );

  return React.createElement(
    "div",
    { className: "client-modal-overlay" },
    React.createElement(
      "div",
      { className: "client-modal-panel", role: "dialog", "aria-labelledby": "client-modal-title" },
      React.createElement(
        "div",
        { className: "client-modal-brand" },
        React.createElement(
          "span",
          { className: "quote-gold-icon" },
          React.createElement(PrtIco, { s: 18, c: "currentColor" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "client-modal-eyebrow" }, "SolarApp · Energi Tech"),
          React.createElement(
            "h3",
            { id: "client-modal-title", className: "client-modal-title" },
            customQuote ? "Get your custom quote" : "Secure your package"
          )
        )
      ),
      React.createElement(
        "p",
        { className: "client-modal-sub" },
        customQuote
          ? "We'll confirm sizing on WhatsApp and send your PDF."
          : "PDF quote · WhatsApp to confirm payment · valid " + validity.days + " days"
      ),
      !customQuote &&
        React.createElement(DeliveryInstallOption, {
          opts: deliveryOpts,
          onChange: onDeliveryChange,
          productTotal,
          variant: "modal",
        }),
      React.createElement("div", { className: "client-modal-label" }, icon(UsrIco), "Name *"),
      React.createElement("input", {
        className: "client-modal-input",
        value: form.name,
        onChange: upd("name"),
        required: true,
      }),
      React.createElement("div", { className: "client-modal-label" }, icon(PhIco), "Phone / WhatsApp *"),
      React.createElement("input", {
        className: "client-modal-input",
        value: form.phone,
        onChange: upd("phone"),
        required: true,
      }),
      React.createElement("div", { className: "client-modal-label" }, icon(NoteIco), "Email *"),
      React.createElement("input", {
        className: "client-modal-input",
        type: "email",
        value: form.email,
        onChange: upd("email"),
        required: true,
      }),
      React.createElement("div", { className: "client-modal-label" }, icon(LocIco), "Area / address *"),
      React.createElement("input", {
        className: "client-modal-input",
        value: form.address,
        onChange: upd("address"),
        onBlur: (e) => onAddressBlur && onAddressBlur(e.target.value),
        required: true,
        placeholder: "e.g. Borrowdale, Harare — or city outside Harare",
      }),
      React.createElement("div", { className: "client-modal-label" }, icon(NoteIco), "Notes"),
      React.createElement("textarea", {
        className: "client-modal-input",
        value: form.notes,
        onChange: upd("notes"),
        rows: 2,
        style: { resize: "vertical", marginBottom: 12 },
      }),
      err && React.createElement("p", { className: "client-modal-error" }, err),
      React.createElement(
        "div",
        { className: "client-modal-actions" },
        React.createElement(
          "button",
          { type: "button", className: "client-modal-btn-cancel", onClick: onClose, disabled: busy },
          "Cancel"
        ),
        React.createElement(
          "button",
          {
            type: "button",
            className:
              "client-modal-btn-primary " + (ok && !busy ? "client-modal-btn-primary--ready" : "client-modal-btn-primary--idle"),
            onClick: () => ok && onDone(form),
            disabled: !ok || busy,
          },
          React.createElement(
            "span",
            { style: { display: "inline-flex", color: ok ? "inherit" : "var(--text-muted)" } },
            React.createElement(PrtIco, { s: 14, c: "currentColor" })
          ),
          busy
            ? customQuote
              ? "Sending to Energi Tech…"
              : "Preparing your quote…"
            : customQuote
              ? "Get my custom quote on WhatsApp"
              : "Get my quote & pay on WhatsApp"
        )
      )
    )
  );
}

export function Particles() {
  const dots = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 1.6 + 0.6,
      o: Math.random() * 0.12 + 0.03,
      sp: Math.random() * 0.008 + 0.002,
      gold: i % 4 === 0,
    }))
  ).current;
  const ref = useRef(null);
  const fr = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    function rz() {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    }
    rz();
    window.addEventListener("resize", rz);
    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      dots.forEach((d) => {
        d.y -= d.sp;
        if (d.y < -2) d.y = 102;
        ctx.beginPath();
        ctx.arc((d.x / 100) * c.width, (d.y / 100) * c.height, d.s, 0, Math.PI * 2);
        ctx.fillStyle = d.gold ? "rgba(212,175,55," + d.o + ")" : "rgba(74,222,128," + d.o + ")";
        ctx.fill();
      });
      fr.current = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener("resize", rz);
      cancelAnimationFrame(fr.current);
    };
  }, []);
  return React.createElement("canvas", {
    ref: ref,
    className: "ambient-particles",
    "aria-hidden": true,
  });
}
