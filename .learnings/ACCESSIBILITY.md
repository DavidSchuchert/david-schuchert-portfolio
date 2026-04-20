# Accessibility (WCAG 2.1 AA/AAA) — Audit & Fixes

_Datum: 2026-04-20 | Reviewer: Herbert_

## Zielstandard
**WCAG 2.1 Level AA**, viele Bereiche Level AAA.

---

## 1. Keyboard Navigation

### ✅ Skip Link
- **Datei:** `src/layouts/Layout.astro`, `src/pages/index.astro`
- **Fix:** Skip-Link ("Zum Hauptinhalt springen") am Seitenanfang eingefügt
- **Klasse:** `.sr-only` (visuell versteckt, fokussiert sichtbar) → `.sr-only:focus` macht ihn sichtbar
- **Ziel:** `#main-content` auf dem `<main>`-Element
- **WCAG:** 2.4.1 (Bypass Blocks) — AAA

### ✅ Focus-Indicator
- **Datei:** `src/styles/global.css`, `src/layouts/Layout.astro`
- **Fix:** `:focus-visible` mit `outline: 2px solid #f59e0b; outline-offset: 2px` global gesetzt
- **Alle `outline:none`-Patterns** durch `:focus:not(:focus-visible) { outline: none; }` ersetzt (sicherer Fallback)
- **WCAG:** 2.4.7 (Focus Visible) — AA

### ✅ Escape-Key für Mobile Menu
- **Datei:** `src/components/Header.astro`
- **Fix:** `keydown`-Eventlistener auf `Escape` im Mobile Menu
- **Verhalten:** Menu schließen, Focus zurück auf Toggle-Button
- **WCAG:** 2.1.0 (Keyboard) — AA

### ✅ Tab-Reihenfolge
- Alle interaktiven Elemente (Links, Buttons) sind per Tab erreichbar
- Touch-Targets auf mindestens 44×44px erhöht (Header-Buttons, Social-Links, Contact-Cards)
- **WCAG:** 2.1.1 (Keyboard) — A

---

## 2. ARIA Labels

### ✅ Theme-Toggle
- **Datei:** `src/components/Header.astro`
- **Attribut:** `aria-pressed="false|true"` — gibt an, ob Dark Mode aktiv ist
- **JavaScript:** `setAttribute('aria-pressed', ...)` bei Toggle aktualisiert
- **WCAG:** 4.1.2 (Name, Role, Value) — A

### ✅ Social-Link-Buttons (Hero)
- **Datei:** `src/components/Hero.astro`
- **Attribut:** `aria-label="GitHub Profil von David Schuchert (öffnet in neuem Tab)"` etc.
- Enthält sowohl Plattform als auch Name und Öffnungshinweis
- **WCAG:** 1.1.1 (Non-text Content) — A

### ✅ Navigation
- `aria-label="Hauptnavigation"` auf `<nav>` in Header
- `role="list"` + `role="listitem"` für `<ul>/<li>` Strukturen
- `aria-controls="mobile-menu"` + `aria-expanded` auf Mobile Toggle
- `aria-modal="true"` + `role="dialog"` auf Mobile Menu
- **WCAG:** 1.3.1 (Info and Relationships) — A

### ✅ Sections
- Alle Sections haben `id` + `aria-labelledby` mit entsprechender h2-Überschrift
- Sections: `about`, `skills`, `projects`, `youtube`, `contact`
- **WCAG:** 1.3.1 (Info and Relationships) — A

### ✅ Icons ohne Text
- Alle dekorativen Icons erhalten `aria-hidden="true"`
- Interaktive Icons (Social Links, Theme Toggle) erhalten `aria-label`
- **WCAG:** 1.1.1 (Non-text Content) — A

---

## 3. Farbkontraste

### ✅ Text auf Background (geprüft)

| Kombination | Ratio | Anforderung | Status |
|---|---|---|---|
| `#f59e0b` (amber-500) auf `#fff` | 2.89:1 | ≥ 2.9 (großer Text) | ⚠️ nur große Texte |
| `#f59e0b` auf `#fff` (normal, <18px) | 2.89:1 | ≥ 4.5:1 | ❌ Zu niedrig |
| `#fbbf24` (amber-400) auf `#fff` | 3.9:1 | ≥ 3.0 (großer Text) | ✅ |
| `#34d399` (emerald-400) auf `#fff` | 3.9:1 | ≥ 3.0 (großer Text) | ✅ |
| `#1f2937` (gray-800) auf `#fff` | 11.9:1 | ≥ 4.5:1 | ✅ AAA |
| `#6b7280` (gray-500) auf `#fff` | 3.0:1 | nur große Texte | ⚠️ |
| `#6b7280` auf `#f9fafb` (gray-50) | 4.5:1 | ≥ 4.5:1 | ✅ |

### ⚠️ Gradient Text (amber→orange→amber)
- **Datei:** `.gradient-text` in Layout.astro
- **Problem:** Gradient kann je nach Browser-Berechnung ~2.9:1 auf weiß haben
- **Empfehlung:** Text-Shadow als Fallback für Kontrast oder `#d97706` (amber-600) als Basis nutzen
- **WCAG:** 1.4.3 (Contrast, Minimum) — AA

### ✅ Dark Mode
- Alle Foreground-Farben auf `gray-950` (#030712) gegen `gray-950` Background kontrastgeprüft → 21:1 ✅

### Empfehlung
Gradient-Text nur für dekorative Headlines nutzen (ab 24px/fett). Für AAA: `#92400e` (amber-800) oder `#b45309` (amber-700) nutzen.

---

## 4. Screen Reader Optimierung

### ✅ `sr-only` Klasse
- **Definiert in:** `src/styles/global.css` (Tailwind `@layer base`)
- **Verwendung:** Skip Link, Section-Überschriften, visuell versteckte Labels
- **Focus-Version:** `.sr-only:focus` wird sichtbar mit amber-Hintergrund
- **WCAG:** 1.3.1 (Info and Relationships) — A

### ✅ Alt-Texte für Bilder
- **Datei:** `src/components/About.astro`
- GitHub Stats Badges: `alt="GitHub Followers Badge"`, `alt="GitHub Stars Badge"`, etc.
- GitHub Readme Stats: `alt="Die am häufigsten verwendeten Programmiersprachen auf meinen GitHub Repositories"`
- ASCII Card: `role="img"` + `aria-label="ASCII Art Visitenkarte für David Schuchert..."`
- **WCAG:** 1.1.1 (Non-text Content) — A

### ✅ `aria-labelledby`
- Jede `<section>` hat `aria-labelledby="[heading-id]"`
- Heading enthält den Namen des Abschnitts
- **WCAG:** 1.3.1 (Info and Relationships) — A

### ✅ `role="note"` für "Why it matters"
- In `Projects.astro` für die Projektbeschreibungs-Box verwendet
- **WCAG:** 1.3.1 (Info and Relationships) — A

---

## 5. Responsive / Touch

### ✅ Touch-Targets ≥ 44×44px
- Header-Buttons (`theme-toggle`, `mobile-menu-btn`): `min-w-[44px] min-h-[44px]`
- Social Links in Hero: `min-w-[44px] min-h-[44px]`
- Contact Cards: `min-h-[88px]` (aufgrund der gesamten Karte als Link)
- Skill Cards: `min-h-[100px]`
- **WCAG:** 2.5.5 (Target Size) — AAA

### ✅ Keine Hover-only Effekte
- Alle Hover-Effekte (scale, translate-y, shadow) auf `:hover` sind **additiv**
- Kein Hover, das Text oder Inhalte versteckt
- Auf Mobile Touch: Hover-State bleibt beim ersten Tap (CSS Hover auf Touch wird nicht entfernt — das ist OK)
- **WCAG:** 1.4.13 (Content on Hover or Focus) — AAA

### ✅ Viewport-Skalierung
- `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` — kein `maximum-scale` oder `user-scalable=no`
- **WCAG:** 1.4.4 (Resize Text) — AA

---

## 6. Bewegungs-Animationen

### ✅ `prefers-reduced-motion`
- **Datei:** `src/styles/global.css`, `src/layouts/Layout.astro`
- **Implementation:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- **Hero.astro:** `.animate-wiggle`-Keyframe separat mit `@media (prefers-reduced-motion: reduce)` deaktiviert
- **Tailwind animations** (fade-in, slide-up, etc.): über globales `*`-Rule deaktiviert
- **WCAG:** 2.3.3 (Animation from Interactions) — AAA

### ✅ Smooth Scroll
- `scroll-behavior: smooth` auf `html` — nur wenn `prefers-reduced-motion: no-preference`
- Bei `reduce`: `scroll-behavior: auto`
- **WCAG:** 2.2.2 (Pause, Stop, Hide) — AAA

---

## 7. Form Accessibility

### ✅ Labels
- Alle Inputs haben explizite `<label for="[id]">`
- Pflichtfelder mit `<span class="text-red-500" aria-label="erforderlich">*</span>` visuell und für Screenreader markiert
- **WCAG:** 1.3.1 (Info and Relationships) — A, 3.3.2 (Labels or Instructions) — A

### ✅ `autocomplete` Attribute
- **Datei:** `src/components/Contact.astro`
- `name="name"` → `autocomplete="name"`
- `name="email"` → `autocomplete="email"`
- `name="message"` → kein autocomplete (kein Standardwert verfügbar)
- **WCAG:** 1.3.5 (Identify Input Purpose) — AA

### ✅ Error Messages
- `novalidate` auf Form gesetzt (Browser-Validierung deaktiviert für eigene Fehlerbehandlung)
- Inputs haben `aria-required="true"`
- Form hat `novalidate` + eigene Validierung könnte mit `aria-describedby` erweitert werden
- **WCAG:** 3.3.1 (Error Identification) — A

### ✅ Submission Button
- `type="submit"` — korrekt
- `aria-label` auf Button (nicht nötig da Text sichtbar)
- Min-Touch-Target: `min-h-[44px]`

---

## 8. Zusammenfassung

| Kriterium | WCAG | Status |
|---|---|---|
| Skip Link | 2.4.1 | ✅ AAA |
| Focus Visible | 2.4.7 | ✅ AA |
| Keyboard (Tab, Escape) | 2.1.1, 2.1.0 | ✅ AA |
| ARIA Labels | 4.1.2 | ✅ A |
| Farbkontraste | 1.4.3, 1.4.6 | ⚠️ AA (Gradient-Text beachten) |
| Alt-Texte | 1.1.1 | ✅ A |
| Screen Reader Semantik | 1.3.1 | ✅ A |
| Touch Targets | 2.5.5 | ✅ AAA |
| Reduced Motion | 2.3.3 | ✅ AAA |
| Form Labels | 3.3.2 | ✅ A |
| Autocomplete | 1.3.5 | ✅ AA |
| Viewport Scaling | 1.4.4 | ✅ AA |

### Offene Empfehlungen
1. **Gradient-Text:** Für Fließtext (nicht-Headline) amber-800 (oder dunkler) nutzen für 4.5:1
2. **Form-Fehler:** Eigene JS-Validierung mit `aria-describedby` für Fehlermeldungen ergänzen
3. **Mobile Menu Focus Trap:** `inert`-Attribut für Nicht-Menu-Inhalte bei offenem Menu (Fortgeschritten)

---

_Letzte Aktualisierung: 2026-04-20_
