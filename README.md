# Ciji Bldg. Metalic Const. Ind. LLC — website

Marketing site for a UAE aluminium and glass facade contractor. React + Vite +
Tailwind CSS, deployed on **Vercel**.

---

## Local development

```bash
npm install      # first time only
npm run dev      # dev server on http://localhost:5173
npm run lint     # oxlint, must report 0 errors
npm run build    # production build into dist/
npm run preview  # serve the built output locally
```

Run `npm run lint` and `npm run build` before pushing. Both must pass.

---

## Deploying on Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel
detects Vite automatically, so the defaults are correct:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |
| Node version | 20 or newer |

No environment variables are required. Nothing in the site talks to a backend.

Every push to `main` triggers a production deployment; pull requests get their
own preview URL.

### vercel.json

[`vercel.json`](vercel.json) carries two things that would otherwise break:

**The SPA rewrite.** Routing is client-side, so `/projects` is not a file on
disk. Without the rewrite, a direct visit, a shared link, or a crawler hitting
any inner page gets Vercel's own 404. The rewrite serves `index.html` for
unmatched paths and lets React Router resolve them, while `/assets`, `/images`,
`/videos`, `/fonts` and the root files are excluded so real assets still 404
properly when missing instead of silently returning HTML.

**Security headers and caching.** A CSP restricted to self-hosted assets plus
the Google Maps frame on the contact page, `nosniff`, `SAMEORIGIN`, a
restrictive `Permissions-Policy`, and immutable caching for fingerprinted
build output and fonts.

> Migrated from Cloudflare Pages. `public/_headers`, `public/_redirects` and
> `wrangler.toml` were Cloudflare-only and are gone; `vercel.json` replaces all
> three. Do not delete it — deep links 404 without the rewrite.

---

## Project shape

```
public/
  fonts/          self-hosted Barlow, Chivo, IBM Plex Mono (no third-party font requests)
  images/         project photography
  videos/         hero background clip
src/
  components/     Navbar, Footer, CtaBand, Lightbox, ReferenceList, ...
  data/           site.js, projects.js, services.js — copy and figures live here
  pages/          one file per route
  index.css       design tokens, component classes, motion
```

Content changes usually mean editing `src/data/`, not the pages.

---

## Before launch

Read [`NOTES.md`](NOTES.md). It lists the facts on the site that need
confirming by the company (headcount and project figures, trade licence
details, image rights), the legal and privacy position, and what has been
verified versus what still needs a human.
