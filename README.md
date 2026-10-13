# GULABARI (गुलाबारी) — Jaipur

> **Authentic Sanganeri Hand Block Printed Luxury Fashion**
> _Crafted with natural botanical dyes and hand-carved teakwood blocks on pure cotton in Sanganer & Jahota, Rajasthan._

<p align="center">
  <img src="public/images/og-gulabari.jpg" alt="GULABARI Jaipur — authentic Sanganeri hand block printed cotton" width="720" />
</p>

**Live demo:** [gulabari-sanganeri-fashion.vercel.app](https://gulabari-sanganeri-fashion.vercel.app)

[![CI](https://github.com/Hvsr1984/gulabari-sanganeri-fashion/actions/workflows/ci.yml/badge.svg)](https://github.com/Hvsr1984/gulabari-sanganeri-fashion/actions/workflows/ci.yml)

---

## 📌 Brand Essence

**GULABARI** bridges centuries-old Rajasthani courtly block printing with contemporary luxury silhouettes. Every garment is stamped block-by-block with unhurried rhythmic pressure by hereditary master artisans of the Chippa community, using unbleached cotton mul, cambric, and botanical dye extracts (madder, indigo, pomegranate rind, iron rust).

The platform is an immersive digital flagship: tactile fabric interactions, named motif vocabulary, artisanal heritage essays, and a type-safe relational data layer.

---

## ✨ What's inside

**Experience**

- Editorial design system in `@theme` tokens (bone / indigo / madder / turmeric / sage / teak) with Fraunces + Inter, handloom grain, cloth shadows and stamp borders.
- **The Physical Cadence of Chhapaai** — an interactive printing-table simulation where a carved teak block, complete with brass registration pins, strikes cotton and presses four real motif prints into the weave.
- **Feel the Craft** — a 3.2× magnifier that inspects the actual cotton weave under the cursor.
- Motif gallery with the six named Sanganeri families (Buta, Buti, Bel, Jaal, Paisley, Jaali), their glyphs, histories and named variants.
- Cart and wishlist drawers, quick view, search palette, filtering by garment / motif / colourway.
- Route transitions modelled on cloth being laid on the table — a soft blur-settle rather than a generic slide.

**Engineering**

- **Performance:** every photograph is served through `next/image` with AVIF → WebP → JPEG negotiation, responsive `srcset`s, intrinsic dimensions and base64 blur-up placeholders. Home page imagery went from **12.86 MB → 0.72 MB**, with zero layout shift.
- **Accessibility:** one `DialogShell` primitive gives every overlay Escape-to-close, focus trapping, focus restoration and scroll locking. Skip link, global `:focus-visible` rings, `aria-live` regions, `aria-pressed`/`aria-current` state, and WCAG AA contrast throughout.
- **Data:** Drizzle ORM + PostgreSQL with committed SQL migrations, seed catalogue, and a graceful "mock mode" that serves the whole storefront from seed data when `DATABASE_URL` is absent.
- **APIs:** schema-validated requests, per-IP rate limiting, honeypot anti-spam, no-store caching.
- **SEO:** `metadataBase`, per-page Open Graph + Twitter cards, generated OG image, `sitemap.xml`, `robots.txt`, and `Organization` / `WebSite` / `Product` / `Article` / `BreadcrumbList` JSON-LD.
- **Quality gates:** TypeScript strict, ESLint clean, Prettier, 40 Vitest unit tests, and CI that runs all of it on every push.

---

## 🛠️ Tech Stack

| Layer      | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack) · React 19       |
| Language   | TypeScript 5.9 (`strict`)                           |
| Styling    | Tailwind CSS v4 + editorial design tokens           |
| Motion     | Framer Motion (respecting `prefers-reduced-motion`) |
| Data       | Drizzle ORM + PostgreSQL · `drizzle-kit` migrations |
| Images     | `next/image` + Sharp pipeline (`npm run images`)    |
| Testing    | Vitest + Vite TS paths                              |
| Typography | Self-hosted Fraunces & Inter variable woff2         |
| CI         | GitHub Actions — format, lint, types, tests, build  |

---

## 🚀 Getting started

```bash
git clone https://github.com/Hvsr1984/gulabari-sanganeri-fashion.git
cd gulabari-sanganeri-fashion
npm install
npm run dev            # http://localhost:3000
```

The storefront runs immediately with **no database** — `src/db/index.ts` returns a null pool when `DATABASE_URL` is unset and `src/db/queries.ts` transparently serves `src/db/seed-data.ts`. `/api/health` will report `{"ok":true,"mode":"mock"}`.

### Optional: connect PostgreSQL

```bash
cp .env.example .env          # then set DATABASE_URL
npm run db:migrate            # apply drizzle/0000_initial_schema.sql
npm run dev                   # the first request seeds the catalogue automatically
npm run db:studio             # browse the data
```

Seeding is guarded by a Postgres advisory lock, so simultaneous cold requests
cannot double-insert the catalogue.

---

## 📜 Scripts

| Command                 | What it does                                                     |
| ----------------------- | ---------------------------------------------------------------- |
| `npm run dev`           | Development server                                               |
| `npm run build`         | Production build (hermetic — no network fetches)                 |
| `npm start`             | Serve the production build                                       |
| `npm run lint`          | ESLint                                                           |
| `npm run typecheck`     | `tsc --noEmit`                                                   |
| `npm test`              | Vitest unit suite                                                |
| `npm run test:coverage` | Coverage report                                                  |
| `npm run format`        | Prettier (with Tailwind class sorting)                           |
| `npm run images`        | Re-encode photography, regenerate blur map, OG card and favicons |
| `npm run db:generate`   | Generate a SQL migration from `src/db/schema.ts`                 |
| `npm run db:migrate`    | Apply pending migrations                                         |
| `npm run db:push`       | Push the schema without a migration file (prototyping)           |

---

## 📂 Project structure

```
src/
├── app/                     # App Router pages, API routes, sitemap, robots, icons
│   ├── api/                 # contact · subscribe · health
│   ├── shop/[slug]/         # product pages (SSG + Product JSON-LD)
│   └── journal/[slug]/      # essays (SSG + Article JSON-LD)
├── components/              # editorial UI; craft-image + dialog-shell are the primitives
├── db/                      # Drizzle schema, client, queries, seed catalogue
├── fonts/                   # self-hosted Fraunces + Inter variable woff2
└── lib/                     # site config, validation, rate limiting, structured data
drizzle/                     # committed SQL migrations
scripts/optimize-images.mjs  # image pipeline (Sharp)
```

---

## ♿ Accessibility

- Every overlay (cart, wishlist, search, quick view, mobile filters) shares `DialogShell`: `role="dialog"`, `aria-modal`, Escape to dismiss, Tab cycling, focus restored to the trigger, background scroll locked.
- Keyboard-first: skip link, visible focus rings on every interactive element, `aria-pressed` on toggles, `aria-live` announcements for cart counts, filter results and form status.
- `prefers-reduced-motion` disables parallax, blur reveals, claymation-style stamp sequences and the cloth sheen.
- Contrast: body and meta text meet WCAG AA (`ink-faint` was darkened to 5.1:1 on bone).

---

## 👤 Author

**Harshvardhan Singh Rajawat**
_CSE Student • Web Developer • AI Builder_
Poornima Institute of Engineering and Technology, Jaipur

- **GitHub:** [@Hvsr1984](https://github.com/Hvsr1984)
- **Live demo:** [gulabari-sanganeri-fashion.vercel.app](https://gulabari-sanganeri-fashion.vercel.app)
- **Email:** [2025pietcsharshvardhan063@poornima.org](mailto:2025pietcsharshvardhan063@poornima.org)

---

<p align="center"><em>Handcrafted Textiles · Timeless Stories</em></p>
