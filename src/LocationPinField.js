import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapPinIco, SearchIco } from "./icons.js";
import { locateAddress, searchPlaces, reverseGeocode, geocodePlace, isWithinZimbabwe } from "./geo.js";
import { localPlaceSuggestions, formatLocationDistanceHint, formatSuggestionKmLabel, isWithinFreeDeliveryRadius } from "./delivery.js";
import { ZIMBABWE_MAP_CENTER, roadKmFromHarare } from "./geo-distance.js";
import {
  initGoogleMaps,
  createGoogleMap,
  osmEmbedUrl,
} from "./google-maps.js";
import { scrollFieldIntoView } from "./scroll.js";

function useMapPreview(coords, useGoogle, enabled, onPinDrop) {
  const mapElRef = useRef(null);
  const mapHandleRef = useRef(null);
  const [mapMode, setMapMode] = useState("osm");
  const onPinDropRef = useRef(onPinDrop);
  onPinDropRef.current = onPinDrop;

  const lat = coords?.lat ?? ZIMBABWE_MAP_CENTER.lat;
  const lon = coords?.lon ?? ZIMBABWE_MAP_CENTER.lon;
  const hasPin = !!(coords?.lat && coords?.lon);

  useEffect(() => {
    const el = mapElRef.current;
    if (!enabled || !el) return;

    let cancelled = false;

    async function mount() {
      if (useGoogle) {
        const handle = await createGoogleMap(el, {
          lat,
          lon,
          zoom: hasPin ? 15 : 6,
          onPinDrop: (la, lo) => onPinDropRef.current && onPinDropRef.current(la, lo),
        });
        if (cancelled) return;
        if (handle) {
          mapHandleRef.current = handle;
          setMapMode("google");
          return;
        }
      }
      mapHandleRef.current = null;
      setMapMode("osm");
    }

    mount();
    return () => {
      cancelled = true;
      mapHandleRef.current = null;
    };
  }, [lat, lon, useGoogle, enabled, hasPin]);

  useEffect(() => {
    if (mapHandleRef.current?.setPosition && hasPin) {
      mapHandleRef.current.setPosition(lat, lon);
    }
  }, [lat, lon, hasPin]);

  return { mapElRef, mapMode, lat, lon, hasPin };
}

function locationHint(item, extra) {
  if (extra) return extra;
  if (item?.precision === "locality") {
    return "Area selected — tap GPS or refine if needed.";
  }
  if (item?.distanceKm > 0) return formatLocationDistanceHint(item.distanceKm);
  return "Location confirmed";
}

function suggestInstallMeta(item) {
  const km = Number(item?.distanceKm) || 0;
  if (km <= 0) return { text: "Zimbabwe", tone: "neutral" };
  if (isWithinFreeDeliveryRadius(km)) return { text: "Free installation included", tone: "included" };
  return { text: "Delivery fee applies", tone: "delivery" };
}

function splitSuggestLabel(label) {
  const parts = String(label || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length <= 1) return { primary: label || "", secondary: null };
  return { primary: parts[0], secondary: parts.slice(1).join(", ") };
}

function isSameLocation(a, b) {
  const x = String(a || "").trim().toLowerCase();
  const y = String(b || "").trim().toLowerCase();
  return x.length > 2 && y.length > 2 && (x === y || x.startsWith(y) || y.startsWith(x));
}

/** Address + GPS pin + search + map (Zimbabwe). */
export function LocationPinField({
  value,
  onChange,
  onBlur,
  onLocated,
  placeholder = "e.g. 288 Chimoyo Crescent, Ruwa",
  id,
  required,
  smart = true,
  showMap = false,
  fixedSuggestions = false,
  premiumSuggestions = false,
  minimalSuggestions = false,
  initialSuggestions = null,
  suggestListTitle = "Suggested areas",
  suggestInitialTitle = "Popular installation areas",
  onFocusChange,
  onSuggestOpenChange,
  ariaLabel,
  inputClassName = "location-pin-input",
  wrapClassName = "location-pin-wrap",
}) {
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [pickedFlash, setPickedFlash] = useState(false);
  const [showingInitial, setShowingInitial] = useState(false);
  const [coords, setCoords] = useState(null);
  const [googleReady, setGoogleReady] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const listId = id ? id + "-suggestions" : "location-suggestions";
  const hintId = id ? id + "-hint" : undefined;

  const syncSuggestDropdown = useCallback(() => {
    if (!fixedSuggestions || !inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    const root = document.documentElement;
    const vv = window.visualViewport;
    const visBottom = vv ? vv.offsetTop + vv.height : window.innerHeight;
    const totalBar =
      document.querySelector(".quote-checkout-dock") ||
      document.querySelector(".quote-checkout-bar") ||
      document.querySelector(".quote-install-section .quote-total-bar");
    let ceiling = visBottom - 12;
    if (totalBar) {
      const tr = totalBar.getBoundingClientRect();
      const ts = getComputedStyle(totalBar);
      if (tr.height > 0 && ts.display !== "none" && ts.visibility !== "hidden" && ts.opacity !== "0") {
        ceiling = Math.min(ceiling, tr.top - 6);
      }
    }
    const cap = minimalSuggestions ? 200 : premiumSuggestions ? 280 : 168;
    const maxH = Math.max(56, Math.min(cap, ceiling - rect.bottom - 2));
    root.style.setProperty("--loc-suggest-top", Math.round(rect.bottom) + "px");
    root.style.setProperty("--loc-suggest-left", Math.round(rect.left) + "px");
    root.style.setProperty("--loc-suggest-width", Math.round(rect.width) + "px");
    root.style.setProperty("--loc-suggest-max-h", Math.round(maxH) + "px");
  }, [fixedSuggestions, premiumSuggestions, minimalSuggestions]);

  useEffect(() => {
    if (!fixedSuggestions) return;
    syncSuggestDropdown();
    const vv = window.visualViewport;
    if (!vv) return;
    vv.addEventListener("resize", syncSuggestDropdown);
    vv.addEventListener("scroll", syncSuggestDropdown);
    window.addEventListener("resize", syncSuggestDropdown);
    return () => {
      vv.removeEventListener("resize", syncSuggestDropdown);
      vv.removeEventListener("scroll", syncSuggestDropdown);
      window.removeEventListener("resize", syncSuggestDropdown);
      document.documentElement.style.removeProperty("--loc-suggest-top");
      document.documentElement.style.removeProperty("--loc-suggest-left");
      document.documentElement.style.removeProperty("--loc-suggest-width");
      document.documentElement.style.removeProperty("--loc-suggest-max-h");
      delete document.documentElement.dataset.locSuggestOpen;
    };
  }, [fixedSuggestions, syncSuggestDropdown, open, searching, value]);

  useEffect(() => {
    if (!fixedSuggestions) return;
    const root = document.documentElement;
    if (open || searching) root.dataset.locSuggestOpen = "1";
    else delete root.dataset.locSuggestOpen;
    return () => delete root.dataset.locSuggestOpen;
  }, [fixedSuggestions, open, searching]);

  const handlePinDrop = useCallback(
    async (lat, lon) => {
      if (!isWithinZimbabwe(lat, lon)) {
        setHint("Please pick a point inside Zimbabwe.");
        return;
      }
      setCoords({ lat, lon });
      setBusy(true);
      try {
        const address = await reverseGeocode(lat, lon);
        onChange({ target: { value: address } });
        if (onLocated) {
          onLocated(address, { lat, lon, distanceKm: roadKmFromHarare(lat, lon) });
        }
        setHint("Pin set — drag the map or edit the address if needed.");
      } catch (e) {
        setHint(e.message || "Could not read address for this pin.");
      } finally {
        setBusy(false);
      }
    },
    [onChange, onLocated]
  );

  const { mapElRef, mapMode, lat: mapLat, lon: mapLon, hasPin } = useMapPreview(
    coords,
    googleReady,
    showMap,
    handlePinDrop
  );

  useEffect(() => {
    if (!smart) return;
    initGoogleMaps().then((ok) => setGoogleReady(ok));
  }, [smart]);

  const applyPick = useCallback(
    (item, hintExtra) => {
      if (!item) return;
      setOpen(false);
      setSuggestions([]);
      setShowingInitial(false);
      if (item.lat != null && item.lon != null) {
        setCoords({ lat: item.lat, lon: item.lon });
      }
      const label = item.label || "";
      onChange({ target: { value: label } });
      if (onLocated) {
        onLocated(label, {
          distanceKm: item.distanceKm || 0,
          lat: item.lat,
          lon: item.lon,
        });
      }
      setHint(locationHint(item, hintExtra));
      setPickedFlash(true);
      window.setTimeout(() => setPickedFlash(false), 520);
    },
    [onChange, onLocated]
  );

  const runSearch = useCallback(
    async (q) => {
      if (!smart || q.trim().length < 2) {
        if (
          !minimalSuggestions &&
          premiumSuggestions &&
          initialSuggestions?.length &&
          q.trim().length === 0
        ) {
          setSuggestions(initialSuggestions);
          setShowingInitial(true);
          setSearching(false);
          setOpen(true);
          setActiveIdx(-1);
          requestAnimationFrame(syncSuggestDropdown);
          return;
        }
        setSuggestions([]);
        setShowingInitial(false);
        setSearching(false);
        setOpen(false);
        return;
      }
      setShowingInitial(false);
      if (!minimalSuggestions) setSearching(true);
      const limit = minimalSuggestions ? 5 : 10;
      const local = localPlaceSuggestions(q, { limit: minimalSuggestions ? 5 : 4 });
      let remote = [];
      try {
        remote = await searchPlaces(q, { limit, localFirst: local });
      } catch {
        remote = local;
      }
      const trimmed = minimalSuggestions ? remote.slice(0, 5) : remote;
      setSuggestions(trimmed);
      setSearching(false);
      setOpen(trimmed.length > 0);
      setActiveIdx(-1);
      if (trimmed.length > 0) requestAnimationFrame(syncSuggestDropdown);
    },
    [smart, syncSuggestDropdown, premiumSuggestions, minimalSuggestions, initialSuggestions]
  );

  const openInitialSuggestions = useCallback(() => {
    if (!initialSuggestions?.length) return;
    setSuggestions(initialSuggestions);
    setShowingInitial(true);
    setSearching(false);
    setOpen(true);
    setActiveIdx(-1);
    requestAnimationFrame(syncSuggestDropdown);
  }, [initialSuggestions, syncSuggestDropdown]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleChange(e) {
    setHint("");
    onChange(e);
    if (!smart) return;
    const q = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(q), 180);
  }

  function handleFocus() {
    onFocusChange?.(true);
    syncSuggestDropdown();
    if (!minimalSuggestions) {
      scrollFieldIntoView(inputRef.current, { padding: 10, reserveBelow: fixedSuggestions ? 112 : 48 });
    }
    if (!smart) return;
    const q = (value || "").trim();
    if (minimalSuggestions) {
      if (q.length >= 2) {
        if (suggestions.length > 0) setOpen(true);
        else runSearch(value);
      }
      return;
    }
    if (q.length < 2 && initialSuggestions?.length) {
      openInitialSuggestions();
      return;
    }
    if (suggestions.length > 0) setOpen(true);
    else if (q.length >= 2) runSearch(value);
  }

  async function resolveTypedAddress(address) {
    const trimmed = String(address || "").trim();
    if (!trimmed) return;
    setBusy(true);
    setHint("Finding exact location…");
    setOpen(false);
    try {
      const hit = await geocodePlace(trimmed);
      if (hit) {
        applyPick(hit);
        return;
      }
      if (onLocated) onLocated(trimmed);
      setHint("Address saved — tap the pin or map to set a precise delivery distance.");
    } catch (e) {
      setHint(e.message || "Could not find that address. Try suburb + town, or use the map pin.");
    } finally {
      setBusy(false);
    }
  }

  async function handleBlur(e) {
    setTimeout(() => {
      setOpen(false);
      onFocusChange?.(false);
    }, 200);
    if (onBlur) onBlur(e);
    if (minimalSuggestions) return;
    await resolveTypedAddress(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const addr = (inputRef.current?.value || value || "").trim();
      if (open && activeIdx >= 0 && suggestions[activeIdx]) {
        e.preventDefault();
        applyPick(suggestions[activeIdx]);
        return;
      }
      if (addr.length >= 3) {
        e.preventDefault();
        resolveTypedAddress(addr);
      }
      return;
    }
    if (!open || !suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  async function useMapPin() {
    if (busy) return;
    setBusy(true);
    setHint("");
    setOpen(false);
    try {
      const { address, distanceKm, lat, lon } = await locateAddress({ openMaps: false });
      setCoords({ lat, lon });
      onChange({ target: { value: address } });
      if (onLocated) onLocated(address, { distanceKm, lat, lon });
      setHint(distanceKm > 0 ? formatLocationDistanceHint(distanceKm) : "GPS location set.");
    } catch (e) {
      setHint(e.message || "Could not use location.");
    } finally {
      setBusy(false);
    }
  }

  const showList = smart && open && suggestions.length > 0;
  const showHint = hint && !(showList || (searching && !minimalSuggestions));
  const suggestOpen = smart && showList;
  const showBackdrop = premiumSuggestions && fixedSuggestions && suggestOpen && !minimalSuggestions;

  useEffect(() => {
    onSuggestOpenChange?.(suggestOpen);
  }, [suggestOpen, onSuggestOpenChange]);

  useEffect(() => {
    if (!showList && !searching) return;
    syncSuggestDropdown();
    if (!minimalSuggestions) {
      requestAnimationFrame(() =>
        scrollFieldIntoView(inputRef.current, { padding: 10, reserveBelow: fixedSuggestions ? 112 : 48 })
      );
    }
  }, [showList, searching, fixedSuggestions, minimalSuggestions, syncSuggestDropdown]);

  return React.createElement(
    "div",
    {
      className:
        "location-field-stack" +
        (premiumSuggestions || minimalSuggestions ? " location-field-stack--premium" : ""),
    },
    showBackdrop &&
      React.createElement("div", {
        className: "location-suggest-backdrop location-suggest-backdrop--interactive",
        "aria-hidden": true,
        onClick: () => {
          setOpen(false);
          setShowingInitial(false);
          inputRef.current?.blur();
        },
      }),
    React.createElement(
      "div",
      {
        className:
          wrapClassName +
          (smart ? " location-pin-wrap--smart" : "") +
          (fixedSuggestions ? " location-pin-wrap--fixed-suggest" : "") +
          (premiumSuggestions ? " location-pin-wrap--premium" : "") +
          (minimalSuggestions ? " location-pin-wrap--minimal" : "") +
          (suggestOpen && !minimalSuggestions ? " location-pin-wrap--open" : "") +
          (pickedFlash ? " location-pin-wrap--picked" : ""),
      },
      (premiumSuggestions || minimalSuggestions) &&
        React.createElement(
          "span",
          { className: "location-search-icon", "aria-hidden": true },
          React.createElement(SearchIco, { s: 15, c: "currentColor" })
        ),
      React.createElement("input", {
        ref: inputRef,
        id,
        className: inputClassName,
        value: value || "",
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        required,
        placeholder,
        autoComplete: "street-address",
        "aria-label": ariaLabel || placeholder,
        role: smart ? "combobox" : undefined,
        "aria-expanded": showList,
        "aria-controls": showList ? listId : undefined,
        "aria-describedby": hint && hintId ? hintId : undefined,
      }),
      React.createElement(
        "button",
        {
          type: "button",
          className: "location-map-pin" + (busy ? " is-busy" : ""),
          onClick: useMapPin,
          disabled: busy,
          title: "Use GPS for installation area",
          "aria-label": "Use GPS for installation area in Zimbabwe",
        },
        busy
          ? React.createElement("span", { className: "location-map-pin-spinner", "aria-hidden": true })
          : premiumSuggestions || minimalSuggestions
            ? React.createElement(
                React.Fragment,
                null,
                React.createElement(MapPinIco, { s: 16, c: "currentColor" }),
                React.createElement("span", { className: "location-map-pin-label" }, "GPS")
              )
            : React.createElement(MapPinIco, { s: 18, c: "currentColor" })
      ),
      searching &&
        !minimalSuggestions &&
        React.createElement(
          "ul",
          {
            className:
              "location-suggest-list location-suggest-list--busy" +
              (premiumSuggestions ? " location-suggest-list--premium" : ""),
            role: "status",
          },
          React.createElement(
            "li",
            { className: "location-suggest-item location-suggest-item--muted location-suggest-item--loading" },
            React.createElement("span", { className: "location-suggest-loading-dot", "aria-hidden": true }),
            "Searching areas…"
          )
        ),
      showList &&
        React.createElement(
          "ul",
          {
            id: listId,
            className:
              "location-suggest-list" +
              (minimalSuggestions ? " location-suggest-list--minimal" : "") +
              (premiumSuggestions ? " location-suggest-list--premium" : ""),
            role: "listbox",
          },
          !minimalSuggestions &&
            premiumSuggestions &&
            React.createElement(
              "li",
              { className: "location-suggest-list-head", "aria-hidden": true },
              showingInitial ? suggestInitialTitle : suggestListTitle
            ),
          suggestions.map((item, i) => {
            const meta = suggestInstallMeta(item);
            const parts = splitSuggestLabel(item.label);
            const picked = isSameLocation(value, item.label);
            const nameLabel = minimalSuggestions ? parts.primary : item.label;
            return React.createElement(
              "li",
              {
                key: (item.placeId || item.label) + "-" + i,
                role: "presentation",
                className: premiumSuggestions && !minimalSuggestions ? "location-suggest-row" : undefined,
                style:
                  premiumSuggestions && !minimalSuggestions ? { animationDelay: i * 0.04 + "s" } : undefined,
              },
              React.createElement(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": i === activeIdx || picked,
                  className:
                    "location-suggest-item" +
                    (i === activeIdx ? " location-suggest-item--active" : "") +
                    (picked ? " location-suggest-item--picked" : "") +
                    (minimalSuggestions ? " location-suggest-item--minimal" : "") +
                    (premiumSuggestions && !minimalSuggestions ? " location-suggest-item--premium" : ""),
                  onMouseDown: (ev) => {
                    ev.preventDefault();
                    applyPick(item);
                  },
                },
                minimalSuggestions
                  ? React.createElement("span", { className: "location-suggest-label" }, nameLabel)
                  : React.createElement(
                      React.Fragment,
                      null,
                      premiumSuggestions &&
                        React.createElement(
                          "span",
                          { className: "location-suggest-pin", "aria-hidden": true },
                          picked
                            ? React.createElement("span", { className: "location-suggest-check" }, "✓")
                            : React.createElement(MapPinIco, { s: 14, c: "currentColor" })
                        ),
                      React.createElement(
                        "span",
                        { className: premiumSuggestions ? "location-suggest-body" : undefined },
                        premiumSuggestions
                          ? React.createElement(
                              React.Fragment,
                              null,
                              React.createElement("span", { className: "location-suggest-label" }, parts.primary),
                              parts.secondary &&
                                React.createElement(
                                  "span",
                                  { className: "location-suggest-secondary" },
                                  parts.secondary
                                )
                            )
                          : React.createElement("span", { className: "location-suggest-label" }, item.label),
                        premiumSuggestions &&
                          React.createElement(
                            "span",
                            { className: "location-suggest-meta location-suggest-meta--" + meta.tone },
                            meta.text
                          )
                      ),
                      !minimalSuggestions &&
                        item.distanceKm > 0 &&
                        React.createElement(
                          "span",
                          {
                            className:
                              "location-suggest-km" +
                              (premiumSuggestions && meta.tone === "included"
                                ? " location-suggest-km--included"
                                : premiumSuggestions && meta.tone === "delivery"
                                  ? " location-suggest-km--delivery"
                                  : ""),
                          },
                          formatSuggestionKmLabel(item.distanceKm)
                        ),
                      !premiumSuggestions &&
                        item.precision === "locality" &&
                        React.createElement("span", { className: "location-suggest-tag" }, "area")
                    )
              )
            );
          })
        )
    ),
    showHint && React.createElement("p", { id: hintId, className: "location-pin-hint" }, hint),
    showMap &&
      React.createElement(
        "div",
        { className: "location-map-panel", "aria-label": "Map" },
        mapMode === "google"
          ? React.createElement("div", { ref: mapElRef, className: "location-map-canvas" })
          : React.createElement("iframe", {
              className: "location-map-iframe",
              title: "Map",
              src: osmEmbedUrl(mapLat, mapLon),
              loading: "lazy",
            }),
        React.createElement(
          "p",
          { className: "location-map-caption" },
          googleReady
            ? "Tap the map to move the pin, or search for an exact address above."
            : "Search for an address above. Add a Google API key for the live map."
        )
      )
  );
}
