# Ciji Bldg. Metalic Const. Ind. LLC — website

Marketing site for a UAE aluminium and glass facade contractor. React + Vite +
Tailwind CSS, deployed on **Vercel**.

Production host: **https://cijiintl.com** (apex). `www.cijiintl.com` and
`facade.cijiintl.com` redirect to it, so every canonical, sitemap entry and
JSON-LD `@id` uses the apex host.

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

[`vercel.json`](vercel.json) carries the routing, security and caching rules:

**Static prerendering, not an SPA rewrite.** `npm run build` renders every
route to its own HTML file (`about.html`, `projects.html`, …) and writes
`404.html`. A direct visit, a shared link or a crawler therefore gets the
complete page — title, canonical, social tags and JSON-LD included — before
any JavaScript runs. `cleanUrls` serves `/about` from `about.html`, and
anything that does not exist gets `404.html` with a real 404 status instead of
the homepage.

**Security headers and caching.** A CSP restricted to self-hosted assets plus
the Google Maps frame on the contact page, `nosniff`, `SAMEORIGIN`, a
restrictive `Permissions-Policy`, `X-Robots-Tag: noindex` on the error page,
and immutable caching for fingerprinted build output and fonts.

> The build order matters: client build → SSR build → prerender. Running
> `vite build` on its own produces only `dist/index.html`; the route HTML files
> and `404.html` come from `scripts/prerender.mjs`.

> Migrated from Cloudflare Pages. `public/_headers`, `public/_redirects` and
> `wrangler.toml` were Cloudflare-only and are gone; `vercel.json` replaces all
> three. Do not delete it — it also carries the clean-URL rules, the 404
> handling and the security headers.

---

## SEO

- `public/robots.txt` allows everything, points at the sitemap, and points AI
  assistants at `/llms.txt`.
- `public/llms.txt` is a plain-language summary of the company, pages, services
  and contact details for AI assistants and answer engines.
- `public/sitemap.xml` lists the seven indexable routes. Faceted project views
  (`/projects?type=…`) are deliberately excluded and canonicalise to
  `/projects`; photo deep links (`?photo=…`) are `noindex, follow`.
- Every route sets its own title, description, canonical, Open Graph and
  Twitter tags, plus a JSON-LD graph (Organization, GeneralContractor,
  WebSite, page node, breadcrumbs, services/projects lists).
- `scripts/prerender.mjs` is what puts those tags in the HTML. If a page is
  added, add it to the `routes` array there as well as to the sitemap.
- Titles are kept under ~60 characters and descriptions under ~160 so they
  are not truncated in search results.
- `public/site.webmanifest`, the favicons and `public/.well-known/security.txt`
  cover installability, browser chrome and vulnerability reports.

---

## Project shape

```
public/
  fonts/          self-hosted Barlow, Chivo, IBM Plex Mono (no third-party font requests)
  images/         project photography
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
