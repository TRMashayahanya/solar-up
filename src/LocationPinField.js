import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapPinIco } from "./icons.js";
import { locateAddress, searchPlaces, reverseGeocode, geocodePlace, isWithinZimbabwe } from "./geo.js";
import { localPlaceSuggestions } from "./delivery.js";
import { ZIMBABWE_MAP_CENTER, roadKmFromHarare } from "./geo-distance.js";
import {
  initGoogleMaps,
  isGoogleMapsReady,
  createGoogleMap,
  attachPlaceAutocomplete,
  osmEmbedUrl,
} from "./google-maps.js";

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

/** Address + GPS pin + Google search + map (Zimbabwe). */
export function LocationPinField({
  value,
  onChange,
  onBlur,
  onLocated,
  placeholder = "Type street or suburb…",
  id,
  required,
  smart = true,
  showMap = false,
  inputClassName = "location-pin-input",
  wrapClassName = "location-pin-wrap",
}) {
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [coords, setCoords] = useState(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [useNativeAutocomplete, setUseNativeAutocomplete] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const skipValueSync = useRef(false);
  const listId = id ? id + "-suggestions" : "location-suggestions";
  const hintId = id ? id + "-hint" : undefined;

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
        setHint("Pin set — drag map or edit address if needed.");
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

  useEffect(() => {
    if (useNativeAutocomplete && inputRef.current && !skipValueSync.current) {
      if (inputRef.current.value !== (value || "")) {
        inputRef.current.value = value || "";
      }
    }
    skipValueSync.current = false;
  }, [value, useNativeAutocomplete]);

  const applyPick = useCallback(
    (item) => {
      if (!item) return;
      setOpen(false);
      setSuggestions([]);
      if (item.lat != null && item.lon != null) {
        setCoords({ lat: item.lat, lon: item.lon });
      }
      const label = item.label || "";
      skipValueSync.current = true;
      if (inputRef.current) inputRef.current.value = label;
      onChange({ target: { value: label } });
      if (onLocated) {
        onLocated(label, {
          distanceKm: item.distanceKm || 0,
          lat: item.lat,
          lon: item.lon,
        });
      }
      setHint(
        item.distanceKm > 0
          ? "~" + item.distanceKm + " km from Harare"
          : "Address set"
      );
    },
    [onChange, onLocated]
  );

  useEffect(() => {
    const input = inputRef.current;
    if (!smart || !googleReady || !input) {
      setUseNativeAutocomplete(false);
      return;
    }
    const detach = attachPlaceAutocomplete(input, applyPick);
    setUseNativeAutocomplete(true);
    return detach;
  }, [smart, googleReady, applyPick]);

  const runSearch = useCallback(
    async (q) => {
      if (!smart || useNativeAutocomplete || q.trim().length < 2) {
        setSuggestions([]);
        setSearching(false);
        setOpen(false);
        return;
      }
      setSearching(true);
      const local = localPlaceSuggestions(q, { limit: 4 });
      let remote = [];
      try {
        remote = await searchPlaces(q, { limit: 8, localFirst: local });
      } catch {
        remote = local;
      }
      setSuggestions(remote);
      setSearching(false);
      setOpen(remote.length > 0);
      setActiveIdx(-1);
    },
    [smart, useNativeAutocomplete]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleChange(e) {
    setHint("");
    skipValueSync.current = true;
    onChange(e);
    if (!smart || useNativeAutocomplete) return;
    const q = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(q), 220);
  }

  function handleFocus() {
    if (useNativeAutocomplete) return;
    if (smart && suggestions.length > 0) setOpen(true);
    else if (smart && (value || "").trim().length >= 2) runSearch(value);
  }

  async function resolveTypedAddress(address) {
    const trimmed = String(address || "").trim();
    if (!trimmed || !onLocated) return;
    const hit = await geocodePlace(trimmed);
    if (hit) {
      applyPick(hit);
      return;
    }
    onLocated(trimmed);
  }

  async function handleBlur(e) {
    setTimeout(() => setOpen(false), 200);
    if (onBlur) onBlur(e);
    await resolveTypedAddress(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const addr = (value || "").trim();
      if (open && activeIdx >= 0 && suggestions[activeIdx]) {
        e.preventDefault();
        applyPick(suggestions[activeIdx]);
        return;
      }
      if (addr.length >= 3) {
        e.preventDefault();
        setOpen(false);
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
      setHint(distanceKm > 0 ? "~" + distanceKm + " km from Harare" : "GPS location set");
    } catch (e) {
      setHint(e.message || "Could not use location.");
    } finally {
      setBusy(false);
    }
  }

  const showFallbackList = smart && open && !useNativeAutocomplete && suggestions.length > 0;

  return React.createElement(
    "div",
    { className: "location-field-stack" },
    React.createElement(
      "div",
      { className: wrapClassName + (smart ? " location-pin-wrap--smart" : "") },
      React.createElement("input", {
        ref: inputRef,
        id,
        className: inputClassName,
        ...(useNativeAutocomplete ? {} : { value: value || "" }),
        defaultValue: useNativeAutocomplete ? value || "" : undefined,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        required,
        placeholder,
        autoComplete: useNativeAutocomplete ? "off" : "off",
        role: smart && !useNativeAutocomplete ? "combobox" : undefined,
        "aria-expanded": showFallbackList,
        "aria-controls": showFallbackList ? listId : undefined,
        "aria-describedby": hint && hintId ? hintId : undefined,
      }),
      React.createElement(
        "button",
        {
          type: "button",
          className: "location-map-pin" + (busy ? " is-busy" : ""),
          onClick: useMapPin,
          disabled: busy,
          title: "Use my GPS location",
          "aria-label": "Use my GPS location in Zimbabwe",
        },
        busy
          ? React.createElement("span", { className: "location-map-pin-spinner", "aria-hidden": true })
          : React.createElement(MapPinIco, { s: 18, c: "currentColor" })
      ),
      searching &&
        !useNativeAutocomplete &&
        React.createElement("ul", { className: "location-suggest-list location-suggest-list--busy", role: "status" },
          React.createElement("li", { className: "location-suggest-item location-suggest-item--muted" }, "Searching…")
        ),
      showFallbackList &&
        React.createElement(
          "ul",
          { id: listId, className: "location-suggest-list", role: "listbox" },
          suggestions.map((item, i) =>
            React.createElement(
              "li",
              { key: (item.placeId || item.label) + "-" + i, role: "presentation" },
              React.createElement(
                "button",
                {
                  type: "button",
                  role: "option",
                  className:
                    "location-suggest-item" + (i === activeIdx ? " location-suggest-item--active" : ""),
                  onMouseDown: (ev) => {
                    ev.preventDefault();
                    applyPick(item);
                  },
                },
                React.createElement("span", { className: "location-suggest-label" }, item.label),
                item.distanceKm > 0 &&
                  React.createElement("span", { className: "location-suggest-km" }, "~" + item.distanceKm + " km")
              )
            )
          )
        )
    ),
    hint && React.createElement("p", { id: hintId, className: "location-pin-hint" }, hint),
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
            ? "Tap map to move pin · or search above"
            : "Search address above · add Google key for live map"
        )
      )
  );
}
