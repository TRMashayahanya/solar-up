import React from "react";
import { PrtIco, ZapIco } from "./icons.js";
import { BrandHeaderSun } from "./ui.js";
/** Reveal rows as they enter the package list scroll area. */
function useRevealOnScroll(staggerIndex) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const root = el.closest(".products-list-scroll");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { root: root || null, rootMargin: "0px 0px -4% 0px", threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delay = inView ? Math.min(staggerIndex % 5, 4) * 36 : 0;
  return {
    ref,
    revealClass: inView ? " package-row--in-view" : " package-row--reveal",
    style: inView ? { transitionDelay: delay + "ms" } : undefined,
  };
}

/** Brand header — aligned with quote page, Energi Tech mark. */
export function ProductsPageHeader({ themeToggle }) {
  return React.createElement(
    "header",
    { className: "products-page-header" },
    React.createElement(
      "div",
      { className: "products-page-header-brand" },
      React.createElement(BrandHeaderSun, { className: "products-page-header-icon" }),
      React.createElement(
        "div",
        { className: "products-page-header-copy" },
        React.createElement(
          "span",
          { className: "products-page-header-title" },
          "Solar",
          React.createElement("em", null, "App")
        ),
        React.createElement("span", { className: "products-page-header-tag" }, "Solar packages")
      )
    ),
    React.createElement(
      "div",
      { className: "products-page-header-end" },
      React.createElement("span", { className: "products-page-header-mark" }, "Energi Tech"),
      themeToggle
    )
  );
}

/** Compact sticky footer — inline price CTA + one-line hint. */
export function ProductsCheckoutBar({ selected, total, onContinue, onStartSizing }) {
  const amount = selected ? "$" + (total || 0).toLocaleString() : null;
  const hint = selected
    ? selected.name + " · " + selected.kva + " kVA · " + selected.panelCount + " panels"
    : "Choose a package above";

  return React.createElement(
    "footer",
    { className: "products-checkout-bar" },
    selected && React.createElement("div", { className: "products-checkout-accent", "aria-hidden": true }),
    React.createElement(
      "p",
      { className: "products-checkout-hint", "aria-live": "polite" },
      hint
    ),
    React.createElement(
      "button",
      {
        type: "button",
        className: "products-checkout-cta" + (selected ? "" : " products-checkout-cta--idle"),
        onClick: onContinue,
        disabled: !selected,
      },
      React.createElement(
        "span",
        { className: "products-checkout-cta-main" },
        React.createElement(PrtIco, { s: 14, c: "#0a0800" }),
        "Continue to quote"
      ),
      amount && React.createElement("span", { className: "products-checkout-cta-price" }, amount)
    ),
    onStartSizing &&
      React.createElement(
        "button",
        { type: "button", className: "products-secondary-link", onClick: onStartSizing },
        React.createElement(ZapIco, { s: 10, c: "currentColor" }),
        "Not sure? Size my system"
      )
  );
}

/** Package row — scroll reveal, accent select state. */
export function PackageRow({ pkg, selected, onSelect, index = 0 }) {
  const { ref, revealClass, style } = useRevealOnScroll(index);

  return React.createElement(
    "button",
    {
      type: "button",
      ref,
      className: "package-row" + (selected ? " package-row--selected" : "") + revealClass,
      style,
      onClick: onSelect,
      "aria-pressed": !!selected,
    },
    React.createElement("span", { className: "package-row-accent", "aria-hidden": true }),
    React.createElement(
      "span",
      { className: "package-row-radio", "aria-hidden": true },
      selected
        ? React.createElement("span", { className: "package-row-radio-check" }, "✓")
        : null
    ),
    React.createElement(
      "span",
      { className: "package-row-top" },
      React.createElement(
        "span",
        { className: "package-row-title-row" },
        React.createElement("span", { className: "package-row-name" }, pkg.name),
        selected &&
          React.createElement("span", { className: "package-row-badge" }, "Your pick")
      ),
      React.createElement("span", { className: "package-row-price" }, "$" + pkg.price.toLocaleString())
    ),
    React.createElement(
      "span",
      { className: "package-row-meta" },
      React.createElement("span", { className: "package-row-kva" }, pkg.kva + " kVA"),
      React.createElement("span", { className: "package-row-spec" }, pkg.panelCount + "×" + pkg.panelW + "W panels")
    )
  );
}
