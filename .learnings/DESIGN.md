# Design Audit — david-portfolio

_Generated: 2026-04-20_

## Summary

The portfolio is in good shape overall. It's NOT a generic template — the ASCII/terminal aesthetic is distinctive and consistent. The main issues are subtle dark mode contrast fixes and a few technical meta-tag issues. The brand identity (amber/orange gradient + terminal vibes) comes through clearly.

---

## 1. Design Consistency ✅ (mostly)

### Color Palette
- **Primary**: `amber-500` (#f59e0b) — used consistently for CTAs, accents, hover states ✅
- **Secondary**: `emerald-400` (#34d399) — used in Hero/About for terminal-style secondary text ✅
- **Accent**: `orange-500` (#f97316) — gradient partner with amber ✅
- **Neutral**: Full gray scale from `gray-50` to `gray-900` ✅
- **Dark mode**: Cards use `gray-900`, body now also uses `gray-900` (fixed — was `gray-950`) ✅

### Typography Scale
| Element | Size | Class |
|---|---|---|
| Hero H1 | 5xl→7xl | `text-5xl sm:text-6xl md:text-7xl` |
| Section Title (H2) | 3xl→4xl | `section-title` class = `text-3xl md:text-4xl` |
| Card H3 | xl | `text-xl` |
| Body text | lg | `text-lg` |
| Code/meta | sm | `text-sm font-mono` |

**Issue**: `section-title` has `mb-2` but most sections use `mb-12` for section header spacing. This is fine since the ASCII box above it provides visual weight, but worth noting.

### Border Radius
- Cards: `rounded-xl` (0.75rem) ✅
- Buttons: `rounded-lg` (0.5rem) — slight inconsistency with cards
- Skill icons: `rounded-lg` ✅
- **Recommendation**: Consider making buttons also `rounded-xl` for full consistency

### Shadows
- Cards: `shadow-lg` → `hover:shadow-xl` ✅
- Buttons: `shadow-lg` → `hover:shadow-xl` ✅
- Footer social icons: `shadow hover:shadow-lg` ✅
- Consistent shadow intensity across all components ✅

---

## 2. Spacing / Whitespace ✅

- All sections use `py-20 px-4` (5rem vertical padding) ✅
- Hero has `pt-16` to account for fixed header ✅
- Section content max-widths are consistent: `max-w-3xl`, `max-w-4xl`, `max-w-5xl` depending on content density ✅
- No "text deserts" — paragraphs have good `leading-relaxed` and `space-y-6` ✅

---

## 3. Dark Mode — Issues Found & Fixed

### Issue 1: Body background vs card contrast (FIXED)
- **Before**: Body was `dark:bg-gray-950` (near-black) while cards used `dark:bg-gray-900` — too much contrast made cards look like "floating islands"
- **After**: Body is now `dark:bg-gray-900`, matching card backgrounds for a unified dark surface
- **Files**: `src/styles/global.css`, `src/layouts/Layout.astro`

### Issue 2: Duplicate theme-color meta tags
- `Layout.astro` had `theme-color: #f59e0b`, `SEO.astro` had `theme-color: #1a1a2e`
- Both were being injected into `<head>`, causing the second to override the first
- **Status**: SEO.astro sets `#1a1a2e` (dark navy) which is fine as a fallback. Layout.astro's `#f59e0b` was redundant.

### Issue 3: ASCII background decoration in Hero
- `opacity-[0.03]` in light mode, `opacity-[0.05]` in dark mode
- Very subtle but intentional — decorative, not functional
- **Status**: Acceptable as-is

### Issue 4: Form inputs in dark mode
- Inputs use `bg-gray-50 dark:bg-gray-800` — lighter than the `bg-gray-900` form container
- Creates good visual separation in dark mode ✅

---

## 4. Visual Hierarchy ✅

- **Hero**: Strong — gradient H1, animated ASCII box, prominent CTAs ✅
- **CTAs**: `btn-primary` has gradient + shadow + hover lift; `btn-secondary` has border + fill on hover — both visually dominant ✅
- **Sections**: Clear separation via background color alternation (white → gray-100 → white → gray-100) ✅
- **Featured projects**: `md:col-span-2` makes them visually dominant ✅

---

## 5. Images / Media

### OG Image
- `public/og-image.png` exists (91KB — consider optimizing if page load is slow)
- OG tags are properly set via SEO.astro ✅

### Favicon ❌ → ✅ FIXED
- **Before**: Red (#e94560) brand color in favicon — inconsistent with amber site identity
- **After**: Updated to amber (#f59e0b) matching the site brand
- **File**: `public/favicon.svg`

### Devicon Skills Icons
- Skills use inline SVG with `fill="currentColor"` and `text-white` on colored backgrounds
- Size: icon container `w-12 h-12`, SVG `w-6 h-6` — consistent ✅
- PHP icon falls back to text-based `<text>` element — this is inconsistent with SVG icons

### External Images (GitHub stats)
- `img.shields.io` badges and `github-readme-stats.vercel.app` — external, no broken links detected ✅
- Stats theme set to `amber` in About.astro ✅

---

## 6. Mobile Design

### Touch targets
- Header nav buttons: ~40px ✅ (close to 44px minimum)
- Skill cards: `p-6` = 1.5rem padding — touch-friendly ✅
- Mobile menu items: full-width tap targets ✅

### Hamburger menu
- Header.astro has mobile menu toggle + `hidden` class on mobile nav ✅
- Uses vanilla JS (not a framework) — lightweight ✅

### Horizontal scroll check
- No `overflow-x` issues detected in the CSS — all sections use `px-4` with proper max-widths ✅

### Font sizes on mobile
- Body: `text-lg` (1.125rem) — readable on mobile ✅
- Hero H1: `text-5xl` on mobile, scales up — might be large, but Hero section is full-height so it works ✅
- Section titles: `text-3xl` on mobile — good legibility ✅

---

## 7. Additional Fixes Applied

### Scroll anchor offset (FIXED)
- **Before**: Anchor links (#about, #skills, etc.) would scroll content under the fixed header
- **After**: Added `scroll-padding-top: 80px` to `html` in both `global.css` and `Layout.astro` style block
- **Files**: `src/styles/global.css`, `src/layouts/Layout.astro`

### Accessibility
- Skip link present (`sr-only focus:not-sr-only`) ✅
- All interactive elements have `:focus-visible` styling with amber outline ✅
- ARIA labels on icon-only buttons (theme toggle, mobile menu) ✅
- `prefers-reduced-motion` respected in global.css ✅

---

## 8. Known Limitations (Not Fixed — Low Priority)

1. **`btn-secondary` rounded-lg vs `card` rounded-xl**: Minor inconsistency. Not worth changing since buttons and cards serve different purposes.

2. **PHP skill icon**: Uses `<text>` fallback instead of proper SVG. Works but inconsistent with other icons.

3. **Form placeholder URL**: Contact form still points to `https://formspree.io/f/yourformid` — needs a real Formspree endpoint.

4. **OG Image 91KB**: Could be optimized with `sharp` or similar, but not urgent.

5. **No loading states**: The site is fully static, so no loading states needed, but the contact form has no client-side validation feedback.

---

## Commit Summary

```
fix(design): dark mode body bg, favicon brand color, scroll-padding

- src/styles/global.css: body dark:bg 950→900, add scroll-padding-top: 80px
- src/layouts/Layout.astro: body dark:bg 950→900, add scroll-padding-top: 80px
- public/favicon.svg: red (#e94560) → amber (#f59e0b) to match brand
```

---

## Before / After Notes

| Issue | Before | After |
|---|---|---|
| Dark body vs card contrast | gray-950 body, gray-900 cards — stark floating effect | gray-900 body, gray-900 cards — unified dark surface |
| Favicon color | Red (#e94560) — wrong brand | Amber (#f59e0b) — matches site accent |
| Anchor scroll offset | Content hidden under fixed header | 80px offset, content visible below header |
