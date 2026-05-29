# Solar Up — Launch social media flyers

Premium **1080×1080** flyers for Instagram, Facebook, WhatsApp Status, and LinkedIn. Matches the Solar Up app (gold + green, Energi Tech branding).

## Files

| File | Purpose |
|------|---------|
| `launch-social-flyers.html` | 8 flyer pages — open in browser or export to PDF |
| `launch-social-flyers.pdf` | Generated PDF (run export script) |
| `assets/` | Photos used on flyers (Unsplash, free to use) |
| `export-pdf.sh` | One-command PDF export (Chrome headless) |

## Before you post

1. Open `launch-social-flyers.html` in a text editor.
2. Replace every **`YOUR_APP_URL`** with your live link, e.g. `https://solar-up-xxxx.onrender.com`
3. Re-export the PDF (below) or screenshot each page from the browser.

## Export PDF

```bash
cd ~/Projects/solar-up
chmod +x marketing/export-pdf.sh
./marketing/export-pdf.sh
```

Output: **`marketing/launch-social-flyers.pdf`**

**Manual export:** Open the HTML in Chrome → **Print** → **Save as PDF** → turn **Background graphics** ON, margins **None**.

## The 8 posts

1. **Launch** — Solar Up is live, free sizing for Zimbabwe  
2. **Load shedding** — ZESA, geysers, boreholes, proper sizing  
3. **Eco movement** — CO₂, trees, green communities (Energi Tech)  
4. **Why us** — Trust, local support, quality, Harare delivery  
5. **Property types** — Flat to farm, Zimbabwe prefills  
6. **PDF quote** — Professional quote, 5-day validity  
7. **Phone + desktop** — No app store, install on home screen  
8. **Community CTA** — Share link + WhatsApp 077 375 7018  

## Suggested captions (copy & paste)

**Post 1 — Launch**  
> 🇿🇼 Solar Up is live — free solar sizing for Zimbabwean homes, shops & farms. Powered by Energi Tech. No guesswork, PDF quote in minutes.  
> 👉 YOUR_APP_URL  
> 📲 077 375 7018 · WhatsApp  

**Post 2 — Load shedding**  
> ZESA off again? Size your backup for fridge, geyser, borehole & security — not a generic kit. Try Solar Up free.  

**Post 3 — Eco**  
> We’re building cleaner power habits across Zimbabwe — right-sized solar, less diesel, real eco numbers in the app. Join the movement with Energi Tech.  

**Post 4 — Trust**  
> Why Energi Tech? Local team, honest free sizing first, quality gear, Harare delivery & nationwide support. Solar you can trust.  

**Post 5 — Properties**  
> Borrowdale flat or Mazowe farm — pick your property, adjust appliances, get your quote. Built for how Zimbabwe actually lives.  

**Post 6 — PDF**  
> Your branded PDF quote with line items & 5-day validity. Share with family or your installer — then WhatsApp us when you’re ready.  

**Post 7 — Install**  
> One link on phone or laptop. Add to home screen — no App Store needed. YOUR_APP_URL/install/ for help.  

**Post 8 — Share**  
> Forward to your WhatsApp group — let’s size solar properly, together. Free: YOUR_APP_URL · 077 375 7018  

## Export single images for Instagram

- Open PDF in Preview → export each page as PNG, or  
- Chrome DevTools → device mode 1080×1080 → screenshot each flyer section.

## Photo credits

Images from [Unsplash](https://unsplash.com) (free license). Replace `assets/` with your own team or project photos anytime — keep filenames or update paths in the HTML.
