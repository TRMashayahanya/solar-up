import React, { useState, useEffect, useRef, useMemo } from "react";
import { G, W4, W6, W8, W10, G_DIM, BORDER, BORDER_FOCUS, SURFACE, SURFACE_STRONG, CHIP_BG, PANEL_BG, PANEL_BORDER, ci } from "./tokens.js";
import { PlsIco, XcoIco } from "./icons.js";
import { QtyStepper } from "./ui.js";
import { ApplianceIcon, IconTile } from "./appliance-icons.js";
import { isCustomItemActive } from "./custom-items.js";
import {
  searchSuggestions,
  getPropertySuggestions,
  parseQuickInput,
  suggestEnrichment,
  seedFromLibrary,
  findBestLibraryMatch,
} from "./custom-suggest.js";
import { getUnifiedSuggestions, seedsFromEntries } from "./custom-predict.js";
import {
  isRestrictedCustomLabel,
  isRestrictedLibraryEntry,
  RESTRICTED_USER_MESSAGE,
} from "./restricted-appliances.js";

const panelBg = {
  marginTop: 14,
  padding: "12px 12px 10px",
  borderRadius: 14,
  border: PANEL_BORDER,
  background: PANEL_BG,
  position: "relative",
  zIndex: 2,
};

const inp = {
  flex: 1,
  minWidth: 0,
  border: "none",
  background: "transparent",
  color: W10,
  fontSize: 13,
  fontFamily: "inherit",
  outline: "none",
  padding: "10px 0",
};

const miniNum = {
  width: 44,
  padding: "6px 4px",
  textAlign: "center",
  background: "var(--input-bg)",
  border: "1px solid " + BORDER,
  borderRadius: 8,
  color: "var(--input-text)",
  fontSize: 12,
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};

function SmartChip({ entry, onPick, accent }) {
  return React.createElement(
    "button",
    {
      type: "button",
      onClick: onPick,
      title: entry.reason || entry.label,
      style: {
        padding: accent ? "6px 11px" : "5px 10px",
        borderRadius: 999,
        border: accent ? "1px solid rgba(232,197,71,.3)" : "none",
        background: accent ? G_DIM : CHIP_BG,
        color: accent ? W8 : W6,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
        flexShrink: 0,
        textAlign: "left",
        maxWidth: 200,
      },
    },
    "+ ",
    entry.label
  );
}

function isAutoFilled(item) {
  const m = findBestLibraryMatch(item.label);
  return !!(m && m.score >= 0.58 && Number(item.w) === m.w && Number(item.dh) === m.dh);
}

function CustomAccessoryRow({ item, onChange, onRemove, onPatch }) {
  const on = isCustomItemActive(item);
  const col = on ? G : W6;
  const filled = isAutoFilled(item);

  function autoFillFromName() {
    if (isRestrictedCustomLabel(item.label)) return;
    const enrich = suggestEnrichment(item.label, item.w, item.dh);
    if (!enrich || enrich.score < 0.55 || !onPatch) return;
    onPatch(item.id, {
      label: enrich.label,
      w: enrich.w,
      dh: enrich.dh,
      iconKey: enrich.iconKey || "other",
    });
  }

  if (filled && on) {
    return React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid rgba(232,197,71,.22)",
          background: "rgba(232,197,71,.05)",
        },
      },
      React.createElement(
        IconTile,
        { size: 34, color: G, active: true },
        React.createElement(ApplianceIcon, { iconKey: item.iconKey || "other", s: 15, c: G })
      ),
      React.createElement(
        "div",
        { style: { minWidth: 0 } },
        React.createElement("p", { style: { color: W10, fontSize: 13, fontWeight: 600, margin: "0 0 2px" } }, item.label),
        React.createElement(
          "p",
          { style: { color: W4, fontSize: 11, margin: 0 } },
          item.w + "W · " + item.dh + "h/day · auto-filled"
        )
      ),
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 6 } },
        React.createElement(QtyStepper, {
          value: item.qty || 0,
          onDec: () => onChange(item.id, "qty", (item.qty || 0) - 1),
          onInc: () => onChange(item.id, "qty", (item.qty || 0) + 1),
        }),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: () => onRemove(item.id),
            "aria-label": "Remove",
            style: {
              width: 26,
              height: 26,
              borderRadius: 6,
              border: "none",
              background: "var(--input-bg)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...ci,
            },
          },
          React.createElement(XcoIco, { s: 12, c: W4 })
        )
      )
    );
  }

  return React.createElement(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 10,
        padding: "10px 10px",
        borderRadius: 10,
        border: "1px solid " + (on ? BORDER_FOCUS : BORDER),
        background: on ? "rgba(232,197,71,.05)" : "rgba(0,0,0,.15)",
      },
    },
    React.createElement(
      IconTile,
      { size: 34, color: col, active: on },
      React.createElement(ApplianceIcon, { iconKey: item.iconKey || "other", s: 15, c: col })
    ),
    React.createElement(
      "div",
      { style: { minWidth: 0 } },
      React.createElement("input", {
        type: "text",
        placeholder: "Item name",
        value: item.label,
        onChange: (e) => onChange(item.id, "label", e.target.value),
        onBlur: autoFillFromName,
        style: {
          width: "100%",
          border: "none",
          background: "transparent",
          color: on ? W10 : W8,
          fontSize: 13,
          fontWeight: on ? 600 : 500,
          fontFamily: "inherit",
          outline: "none",
          padding: 0,
          marginBottom: 6,
        },
        "aria-label": "Name",
      }),
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 6 } },
        React.createElement("input", {
          type: "number",
          min: 1,
          value: item.w,
          onChange: (e) => onChange(item.id, "w", e.target.value),
          style: miniNum,
          "aria-label": "Watts",
        }),
        React.createElement("span", { style: { color: W4, fontSize: 10 } }, "W"),
        React.createElement("input", {
          type: "number",
          min: 0,
          step: 0.5,
          value: item.dh,
          onChange: (e) => onChange(item.id, "dh", e.target.value),
          style: miniNum,
          "aria-label": "Hours per day",
        }),
        React.createElement("span", { style: { color: W4, fontSize: 10 } }, "h")
      )
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } },
      React.createElement(QtyStepper, {
        value: item.qty || 0,
        onDec: () => onChange(item.id, "qty", (item.qty || 0) - 1),
        onInc: () => onChange(item.id, "qty", (item.qty || 0) + 1),
      }),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: () => onRemove(item.id),
          "aria-label": "Remove",
          style: {
            width: 26,
            height: 26,
            borderRadius: 6,
            border: "none",
            background: "rgba(255,255,255,.05)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...ci,
          },
        },
        React.createElement(XcoIco, { s: 12, c: W4 })
      )
    )
  );
}

export function CustomAccessoriesPanel({
  items = [],
  onAddFromSeed,
  onAddBulk,
  onChange,
  onPatch,
  onRemove,
  copy,
  propType,
  qtys = {},
  embedded = false,
}) {
  const sectionLabel = (copy && copy.label) || "Add more items";
  if (!onAddFromSeed || !onChange || !onRemove) return null;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const [moreChips, setMoreChips] = useState(false);
  const [blockMsg, setBlockMsg] = useState("");
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const activeCount = items.filter(isCustomItemActive).length;

  const customLabels = useMemo(
    () => items.filter(isCustomItemActive).map((i) => String(i.label).trim()),
    [items]
  );

  const ctx = useMemo(() => ({ qtys, customLabels, propType }), [qtys, customLabels, propType]);

  const unified = useMemo(() => {
    try {
      return getUnifiedSuggestions(propType, ctx, 12);
    } catch (err) {
      console.error("SolarApp: suggestions failed", err);
      try {
        return getPropertySuggestions(propType, ctx).map((e) => ({
          ...e,
          predictScore: e.tailored ? 4 : 2,
          reason: null,
        }));
      } catch {
        return [];
      }
    }
  }, [propType, ctx]);

  const loadBased = useMemo(() => unified.filter((e) => (e.predictScore || 0) >= 10), [unified]);
  const general = useMemo(() => unified.filter((e) => (e.predictScore || 0) < 10), [unified]);

  const chipLimit = moreChips ? general.length : 4;
  const visibleGeneral = general.slice(0, chipLimit);
  const hiddenGeneral = general.length - visibleGeneral.length;

  const matches = useMemo(
    () => searchSuggestions(query, propType, 6).filter((e) => !isRestrictedLibraryEntry(e)),
    [query, propType]
  );

  useEffect(() => {
    setHi(0);
  }, [query, open]);

  useEffect(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function addSeed(seedOrEntry) {
    const row =
      seedOrEntry && seedOrEntry.w != null
        ? {
            label: String(seedOrEntry.label || "").trim(),
            w: seedOrEntry.w,
            dh: seedOrEntry.dh,
            qty: seedOrEntry.qty || 1,
            iconKey: seedOrEntry.iconKey || "other",
          }
        : seedFromLibrary(seedOrEntry);
    if (!row?.label) return;
    if (isRestrictedCustomLabel(row.label) || (seedOrEntry?.id && isRestrictedLibraryEntry(seedOrEntry))) {
      setBlockMsg(RESTRICTED_USER_MESSAGE);
      return;
    }
    setBlockMsg("");
    onAddFromSeed(row);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur?.();
  }

  function commitQuery() {
    const parsed = parseQuickInput(query);
    if (!parsed) {
      if (query.trim() && isRestrictedCustomLabel(query)) setBlockMsg(RESTRICTED_USER_MESSAGE);
      return;
    }
    addSeed({
      label: parsed.label,
      w: parsed.w,
      dh: parsed.dh,
      qty: parsed.qty,
      iconKey: parsed.iconKey,
    });
  }

  function addAllPredicted() {
    if (!onAddBulk || !loadBased.length) return;
    onAddBulk(seedsFromEntries(loadBased.slice(0, 4)));
  }

  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHi((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (matches.length && open && query.trim()) addSeed(seedFromLibrary(matches[hi]));
      else commitQuery();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const canAdd = !!query.trim();

  return React.createElement(
    "div",
    { className: embedded ? "custom-panel--embedded" : undefined, style: embedded ? undefined : panelBg },
    !embedded &&
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 10,
            flexWrap: "wrap",
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            "span",
            { style: { color: W8, fontSize: 13, fontWeight: 600, display: "block" } },
            sectionLabel
          ),
          React.createElement(
            "span",
            { style: { color: W4, fontSize: 10, marginTop: 2, display: "block" } },
            "Heating elements are excluded. Tap other items to add them."
          )
        ),
        loadBased.length > 0 &&
          onAddBulk &&
          React.createElement(
            "button",
            {
              type: "button",
              onClick: addAllPredicted,
              style: {
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid rgba(232,197,71,.4)",
                background: G_DIM,
                color: G,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                flexShrink: 0,
                ...ci,
              },
            },
            "Add all (" + Math.min(loadBased.length, 4) + ")"
          )
      ),

    loadBased.length > 0 &&
      React.createElement(
        "div",
        { className: embedded ? "custom-section" : undefined, style: { marginBottom: embedded ? 6 : 10 } },
        React.createElement(
          "p",
          { style: { color: W4, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" } },
          "Based on your load"
        ),
        React.createElement(
          "div",
          { className: embedded ? "custom-chip-row" : undefined, style: { display: "flex", flexWrap: "wrap", gap: embedded ? 5 : 6 } },
          loadBased.slice(0, 5).map((entry) =>
            React.createElement(SmartChip, {
              key: entry.id,
              entry,
              accent: true,
              onPick: () => addSeed(seedFromLibrary(entry)),
            })
          )
        )
      ),

    blockMsg &&
      React.createElement(
        "p",
        {
          style: {
            color: "#f87171",
            fontSize: 11,
            lineHeight: 1.45,
            margin: "0 0 10px",
            padding: "8px 10px",
            borderRadius: 8,
            background: "rgba(248,113,113,.08)",
            border: "1px solid rgba(248,113,113,.25)",
          },
        },
        blockMsg
      ),

    React.createElement(
      "div",
      {
        ref: wrapRef,
        className: embedded ? "custom-input-wrap" : undefined,
        style: { position: "relative", marginBottom: visibleGeneral.length || items.length ? (embedded ? 6 : 10) : 0 },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 12px",
            borderRadius: 12,
            border: "1px solid " + (open ? BORDER_FOCUS : BORDER),
            background: "var(--input-bg)",
          },
        },
        React.createElement(PlsIco, { s: 14, c: W4 }),
        React.createElement("input", {
          ref: inputRef,
          type: "text",
          value: query,
          placeholder: "Add an item (no kettles, microwaves, or irons…)",
          onChange: (e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (blockMsg) setBlockMsg("");
          },
          onFocus: () => setOpen(true),
          onKeyDown: onKeyDown,
          style: inp,
          "aria-label": "Add accessory",
        }),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: commitQuery,
            disabled: !canAdd,
            style: {
              flexShrink: 0,
              padding: "6px 12px",
              borderRadius: 8,
              border: "none",
              background: canAdd ? G : "var(--surface-strong)",
              color: canAdd ? "#0a0800" : W4,
              fontSize: 12,
              fontWeight: 600,
              cursor: canAdd ? "pointer" : "default",
              fontFamily: "inherit",
              ...ci,
            },
          },
          "Add"
        )
      ),
      open &&
        matches.length > 0 &&
        query.trim() &&
        React.createElement(
          "div",
          {
            role: "listbox",
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              top: "calc(100% + 4px)",
              zIndex: 30,
              background: "rgba(10,14,12,.98)",
              border: "1px solid " + BORDER,
              borderRadius: 10,
              boxShadow: "0 8px 28px rgba(0,0,0,.45)",
              maxHeight: 180,
              overflowY: "auto",
            },
          },
          matches.map((entry, i) =>
            React.createElement(
              "button",
              {
                key: entry.id,
                type: "button",
                onClick: () => addSeed(seedFromLibrary(entry)),
                style: {
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "9px 12px",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  background: i === hi ? G_DIM : "transparent",
                  color: W8,
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                },
              },
              entry.label,
              React.createElement("span", { style: { color: W4, fontSize: 11 } }, entry.w + "W")
            )
          )
        )
    ),

    visibleGeneral.length > 0 &&
      React.createElement(
        "div",
        {
          className: embedded ? "custom-chip-row" : undefined,
          style: {
            display: "flex",
            flexWrap: "nowrap",
            gap: embedded ? 5 : 6,
            overflowX: "auto",
            marginBottom: items.length ? (embedded ? 6 : 10) : 0,
            paddingBottom: 2,
          },
        },
        visibleGeneral.map((entry) =>
          React.createElement(SmartChip, {
            key: entry.id,
            entry,
            accent: false,
            onPick: () => addSeed(seedFromLibrary(entry)),
          })
        ),
        hiddenGeneral > 0 &&
          React.createElement(
            "button",
            {
              type: "button",
              onClick: () => setMoreChips(true),
              style: {
                padding: "5px 10px",
                borderRadius: 999,
                border: "none",
                background: "transparent",
                color: W4,
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "inherit",
                flexShrink: 0,
              },
            },
            "+" + hiddenGeneral + " more"
          )
      ),

    activeCount > 0 &&
      React.createElement(
        "p",
        { style: { color: W4, fontSize: 10, margin: "0 0 6px", textAlign: "right" } },
        activeCount + " in your quote"
      ),

    items.length > 0 &&
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 6 } },
        items.map((item) =>
          React.createElement(CustomAccessoryRow, {
            key: item.id,
            item,
            onChange,
            onRemove,
            onPatch,
          })
        )
      )
  );
}
