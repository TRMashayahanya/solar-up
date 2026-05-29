import React, { useState, useEffect, useRef } from "react";
import { G, GD, W4, W10, GRAD_GOLD, ci } from "./tokens.js";
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
        React.createElement("p", { style: { margin: "8px 0 0", color: "rgba(255,255,255,.7)" } }, String(this.state.error.message)),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: () => this.setState({ error: null }),
            style: {
              marginTop: 12,
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,.2)",
              background: "transparent",
              color: "#fff",
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

  const inp = {
    width: "100%",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(212,175,55,.2)",
    borderRadius: 10,
    padding: "10px 13px",
    color: "#fff",
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
    marginBottom: 10,
    boxSizing: "border-box",
  };
  const lbl = {
    color: "rgba(212,175,55,.65)",
    fontSize: 9.5,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 500,
    marginBottom: 4,
    display: "flex",
    alignItems: "center",
    gap: 6,
  };

  return React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9998,
        padding: 16,
      },
    },
    React.createElement(
      "div",
      {
        style: {
          background: "linear-gradient(145deg,#0A1208,#050A05)",
          border: "1px solid rgba(212,175,55,.25)",
          borderRadius: 22,
          padding: "clamp(22px,5vw,28px)",
          width: "100%",
          maxWidth: 440,
          boxShadow: "0 40px 100px rgba(0,0,0,.9)",
          maxHeight: "90vh",
          overflowY: "auto",
        },
      },
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 } },
        React.createElement(PrtIco, { s: 18, c: G }),
        React.createElement(
          "h3",
          { style: { fontFamily: "serif", color: "#fff", fontSize: 20, fontWeight: 600, margin: 0 } },
          customQuote ? "Get your custom quote" : "Secure your package"
        )
      ),
      React.createElement(
        "p",
        { style: { color: W4, fontSize: 12, margin: "0 0 16px", lineHeight: 1.45 } },
        customQuote
          ? "Tell us about your site — we'll size a system on WhatsApp and send a quote built for your load."
          : "Get your official PDF quote, then chat with Energi Tech on WhatsApp to confirm payment and book installation (Harare install included on packages)."
      ),
      React.createElement(
        "p",
        {
          style: {
            margin: "0 0 12px",
            padding: "8px 10px",
            borderRadius: 8,
            background: "rgba(232,197,71,.1)",
            border: "1px solid rgba(232,197,71,.25)",
            color: "rgba(255,255,255,.7)",
            fontSize: 11,
            lineHeight: 1.45,
          },
        },
        React.createElement("strong", { style: { color: G } }, "Valid " + validity.days + " days"),
        " on PDF · expires ",
        validity.validUntilLabel
      ),
      !customQuote &&
        React.createElement(DeliveryInstallOption, {
          opts: deliveryOpts,
          onChange: onDeliveryChange,
          productTotal,
          variant: "modal",
        }),
      React.createElement("div", { style: lbl }, React.createElement(UsrIco, { s: 13, c: G }), "Name *"),
      React.createElement("input", { value: form.name, onChange: upd("name"), required: true, style: inp }),
      React.createElement("div", { style: lbl }, React.createElement(PhIco, { s: 13, c: G }), "Phone / WhatsApp *"),
      React.createElement("input", { value: form.phone, onChange: upd("phone"), required: true, style: inp }),
      React.createElement("div", { style: lbl }, React.createElement(NoteIco, { s: 13, c: G }), "Email *"),
      React.createElement("input", { type: "email", value: form.email, onChange: upd("email"), required: true, style: inp }),
      React.createElement("div", { style: lbl }, React.createElement(LocIco, { s: 13, c: G }), "Area / address *"),
      React.createElement("input", {
        value: form.address,
        onChange: upd("address"),
        onBlur: (e) => onAddressBlur && onAddressBlur(e.target.value),
        required: true,
        style: inp,
        placeholder: "e.g. Borrowdale, Harare — or city outside Harare",
      }),
      React.createElement("div", { style: lbl }, React.createElement(NoteIco, { s: 13, c: G }), "Notes"),
      React.createElement("textarea", {
        value: form.notes,
        onChange: upd("notes"),
        rows: 2,
        style: { ...inp, resize: "vertical", marginBottom: 12 },
      }),
      err &&
        React.createElement(
          "p",
          { style: { color: "#F87171", fontSize: 12, margin: "0 0 12px" } },
          err
        ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: 10 } },
        React.createElement(
          "button",
          {
            type: "button",
            onClick: onClose,
            disabled: busy,
            style: {
              flex: 1,
              padding: "13px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 12,
              color: W4,
              fontSize: 13,
              cursor: busy ? "wait" : "pointer",
              fontFamily: "inherit",
            },
          },
          "Cancel"
        ),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: () => ok && onDone(form),
            disabled: !ok || busy,
            style: {
              flex: 2,
              padding: "13px",
              background: ok ? "linear-gradient(135deg," + GD + "," + G + ")" : "rgba(255,255,255,.08)",
              border: "none",
              borderRadius: 12,
              color: ok ? "#0a0800" : W4,
              fontSize: 13,
              fontWeight: 700,
              cursor: !ok || busy ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: busy ? 0.7 : 1,
            },
          },
          React.createElement(PrtIco, { s: 14, c: ok ? "#0a0800" : W4 }),
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
    Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 0.8,
      o: Math.random() * 0.2 + 0.04,
      sp: Math.random() * 0.011 + 0.003,
      gold: i % 3 === 0,
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
    style: { position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 },
  });
}
