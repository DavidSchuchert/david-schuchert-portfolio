# David Schuchert — Portfolio

Persönliche Website von David Schuchert: Full-Stack Developer und Dozent für Webentwicklung bei der [DBE-Academy](https://dbe.academy).

## 🎯 Was es ist

Single-Page-Portfolio mit Smooth-Scroll-Sektionen:

- **#hero** — Willkommen
- **#uber-mich** — Über mich
- **#skills** — Tech-Stack & Fähigkeiten
- **#projekte** — Ausgewählte Projekte
- **#youtube** — YouTube / Content
- **#kontakt** — Kontaktformular

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build) |
| UI | Vanilla HTML + CSS (Astro components) |
| Styling | Custom CSS / CSS Variables |
| Language | TypeScript |
| Hosting | Vercel / Netlify / Cloudflare Pages |
| Analytics | Plausible / Umami (privacy-friendly) |

## 🚀 Local Development

```bash
# Dependencies installieren
npm install

# Dev server starten
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Vercel (empfohlen)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Cloudflare Pages

```bash
npm run build
wrangler pages deploy dist/
```

> **Hinweis:** Nach dem Deployment sicherstellen, dass `sitemap.xml` und `robots.txt` korrekt ausgeliefert werden (`public/` wird beim Build automatisch kopiert).

## 🔍 SEO

- `robots.txt` — Alle Crawler erlaubt, verweist auf sitemap
- `sitemap.xml` — Alle Routen mit lastmod, changefreq, priority
- Meta-Tags + OpenGraph + Twitter Cards in `src/components/SEO.astro`
- JSON-LD Structured Data (Person) in `src/layouts/Layout.astro`
- SVG Favicon in `public/favicon.svg`

Um SEO zu verifizieren:
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Validator](https://validator.schema.org/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 🧪 Tests

```bash
# Build-Test
npm run build

# Preview prüfen
npm run preview

# Falls Playwright installiert:
npx playwright test
```

## ☕ Stack/Fokus

- **Frontend:** TypeScript, React, Angular, HTML5, CSS3
- **Backend:** PHP, Laravel, Node.js
- **Tools:** Git, Docker, CI/CD, Linux
- **Dozent:** DBE-Academy, Webentwicklung & AI

## 📁 Projektstruktur

```
david-portfolio/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── og-image.png          # OG-Bild (1200x630px) noch erstellen
├── src/
│   ├── components/
│   │   ├── Analytics.astro
│   │   ├── SEO.astro
│   │   └── ...               # Weitere Komponenten
│   ├── layouts/
│   │   └── Layout.astro      # JSON-LD Structured Data hier
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 To-Do nach Deployment

- [ ] `public/og-image.png` erstellen (1200×630px)
- [ ] Analytics aktivieren (Plausible oder Umami)
- [ ] Google Search Console einrichten
- [ ] Google Analytics / Search Console Property hinzufügen

---

David Schuchert — [david-schuchert.de](https://david-schuchert.de) · [DBE-Academy](https://dbe.academy)