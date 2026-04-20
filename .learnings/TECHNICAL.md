# TECHNICAL.md — Portfolio Site Improvements

## Datum: 2026-04-20
## Ziel: Portfolio technisch auf höchstes Niveau bringen

---

## 1. SEO Perfection

### ✅ Canonical URL
- `astro.config.mjs`: `site` von `https://davidschuchert.dev` → `https://david-schuchert.de` korrigiert
- `SEO.astro`: canonicalUrl default auf `https://david-schuchert.de`
- `robots.txt`: Sitemap-URL auf `https://david-schuchert.de/sitemap-index.xml` aktualisiert

### ✅ Interne Links
- Keine toten Links gefunden — alle Anchor-Links (#about, #skills etc.) funktionieren korrekt
- Social Links: GitHub, LinkedIn, Xing, YouTube alle erreichbar

### ✅ Meta Description
- Optimiert auf ~155 Zeichen mit Call-to-Action
- Alt: "Professionell, praxisnah, mit Herz."
- Neu: "Full-Stack Developer & Dozent bei der DBE-Academy. TypeScript, React, Laravel — Webentwicklung mit Praxisbezug. Jetzt Kontakt aufnehmen!"

### ✅ Twitter Card
- `twitter:card summary_large_image` in SEO.astro korrekt gesetzt
- OG image `/og-image.png` als twitter:image
- `@davidschuchert` als twitter:site
- **Fix**: Doppelte Twitter-Card-Tags aus Layout.astro entfernt (SEO.astro ist die Single Source of Truth)

### ✅ OpenGraph
- `og:locale de_DE` in SEO.astro korrekt
- `og:type website`, `og:title`, `og:description`, `og:image` alle korrekt
- og:site_name "David Schuchert Portfolio"

### ✅ 404.html Seite
- `src/pages/404.astro` erstellt — Custom 404 mit ASCII-Art, Navigation zu Startseite/Kontakt

### ❌ hreflang (de/en)
- Nicht implementiert — keine Mehrsprachigkeit vorhanden. Bei zukünftiger En-Version hreflang-Tags in Layout.astro hinzufügen:
  ```html
  <link rel="alternate" hreflang="de" href="https://david-schuchert.de/" />
  <link rel="alternate" hreflang="en" href="https://david-schuchert.de/en/" />
  ```

---

## 2. Security Headers

### ✅ Via Astro Middleware (`src/middleware.ts`)
- `X-Frame-Options: SAMEORIGIN` — Clickjacking-Schutz
- `X-Content-Type-Options: nosniff` — MIME-Sniffing-Schutz
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` — HSTS
- `Referrer-Policy: strict-origin-when-cross-origin` — Referrer-Kontrolle
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()` — Alle Features deaktiviert
- `Content-Security-Policy` — Strenge CSP mit erlaubten Quellen (self, fonts, plausible.io, umami)

**Hinweis**: CSP ist restriktiv. Bei Problemen mit externen Services (z.B. YouTube Einbettungen) muss die CSP angepasst werden.

---

## 3. Social Proof

### ✅ DBE-Academy Badge
- Button "DBE-Academy" mit Link zu https://dbe.academy im Footer hinzugefügt
- Gradient: emerald → teal, passt zum Farbschema

### ✅ Xing Profil-Link
- Xing zu socialLinks hinzugefügt mit offiziellem Xing SVG-Icon
- Footer aktualisiert mit Xing-Symbol

### ❌ Testimonials/Reviews
- Keine Review-Daten verfügbar. Bei zukünftiger Verfügbarkeit in About.astro oder eigener Section einbauen.

---

## 4. RSS Feed

### ✅ `src/pages/rss.xml.ts` erstellt
- Nutzt `@astrojs/rss` Paket
- Enthält Portfolio-Seite als Item
- `customData: <language>de-de</language>` für deutsche Sprache
- Verlinkt im Footer (RSS-Icon, /rss.xml)

**Hinweis**: Bei Blog-Erweiterung Collection nutzen und RSS-Items dynamisch generieren.

---

## 5. Sitemap Perfection

### ✅ Astro Sitemap Integration
- `@astrojs/sitemap` installiert und in `astro.config.mjs` integriert
- Auto-Generierung von `sitemap-index.xml` und `sitemap-0.xml`

### ✅ Sitemap URL
- `site` in astro.config.mjs auf `https://david-schuchert.de` korrigiert
- robots.txt auf neue Sitemap-URL aktualisiert

### ✅ Priority & Changefreq
- Manuell gepflegte `sitemap.astro` wurde beibehalten für explizite Kontrolle
- priority/张家界 für alle Sections (1.0 für Startseite, 0.8-0.9 für Sections)

### ❌ Bilder in Sitemap
- `public/og-image.png` ist das einzige relevante Bild
- Bei YouTube-Einbettungen: Videositemap mit `<video>` und `<image>` Tags ergänzen
- Bei Blog: `<image:image>` Tags für jeden Post hinzufügen

---

## 6. Analytics Vorbereitung

### ✅ Analytics.astro
- Privacy-Ready Analytics bereits vorbereitet (keine Cookies, keine personalisierte Werbung)
- Drei Optionen dokumentiert:
  1. **Plausible.io** (🇪🇺 Server, GDPR-konform, kein Cookie-Consent nötig) — **Empfehlung**
  2. **Umami** (selbst-hostbar oder cloud.umami.is)
  3. **Cloudflare Web Analytics** (kostenlos, lightweight)

**Nächster Schritt**: Plausible.io Konto erstellen → Domain hinzufügen → Script in Analytics.astro einkommentieren.

---

## 7. PWA Grundlagen

### ✅ `public/manifest.json` erstellt
- Name, short_name, description
- theme_color & background_color: #f59e0b (Amber/Orange)
- display: standalone
- shortcuts: Projekte, Kontakt
- icons: favicon.svg (SVG, maskable)

### ✅ `public/sw.js` Service Worker erstellt
- **Cache Strategy**: Network-first mit Cache-Fallback
- Cached: Startseite, favicon, og-image, manifest
- Offline-Fallback auf Startseite für Navigation
- Auto-Update bei neuem SW mit `skipWaiting()`

### ✅ Service Worker Registrierung
- In Layout.astro: `navigator.serviceWorker.register('/sw.js')`
- Graceful degradation wenn SW nicht unterstützt wird

---

## Build & Deployment

### Build
```bash
npm run build
```

### Wichtige URLs nach Build
- `/sitemap-index.xml` — Sitemap (auto-generiert)
- `/rss.xml` — RSS Feed
- `/404` — Custom 404 Page
- `/manifest.json` — PWA Manifest (automatisch von Astro aus public/ geserved)

### Deployment-Checkliste
- [ ] Analytics-Anbieter wählen und ID eintragen
- [ ] `robots.txt` prüfen (sitemap-index.xml URL)
- [ ] Security Headers in Produktion testen
- [ ] CSP ggf. für YouTube-Embeds anpassen
- [ ] hreflang bei Mehrsprachigkeit hinzufügen

---

## Dateien geändert

| Datei | Änderung |
|-------|----------|
| `astro.config.mjs` | site korrigiert, sitemap-Integration hinzugefügt |
| `src/middleware.ts` | **NEU** — Security Headers |
| `src/layouts/Layout.astro` | Duplikate entfernt, manifest-link, SW-Registrierung, JSON-LD sameAs erweitert |
| `src/components/SEO.astro` | Meta description optimiert, canonical korrekt |
| `src/components/Footer.astro` | Xing, RSS, DBE-Academy Badge hinzugefügt |
| `src/pages/404.astro` | **NEU** — Custom 404 Page |
| `src/pages/rss.xml.ts` | **NEU** — RSS Feed |
| `public/manifest.json` | **NEU** — PWA Manifest |
| `public/sw.js` | **NEU** — Service Worker |
| `public/robots.txt` | sitemap URL korrigiert |
| `.learnings/TECHNICAL.md` | **NEU** — Diese Dokumentation |

---

## Offene To-Dos

1. **Analytics aktivieren**: Plausible.io Konto erstellen, Website-ID in `Analytics.astro` eintragen
2. **YouTube Videos**: Bei Einbettung Videositemap erweitern
3. **Blog**: Bei Blog-Erweiterung RSS und Sitemap dynamisch generieren
4. **hreflang**: Bei englischer Version hreflang-Tags hinzufügen
5. **Reviews**: Testimonials-Section bei Verfügbarkeit einbauen
