# AI prompt — redesign the CIJI website footer

Copy everything between the rules into your AI tool. The reference data at the
bottom is included so the model does not invent contact details, links, or
figures.

---

## PROMPT

You are a senior product designer and front-end engineer. Redesign the footer
of **Ciji Bldg. Metalic Const. Ind. LLC** (CIJI), a UAE aluminium and glass
facade contractor. The site is React 19 + Vite + Tailwind CSS v4, deployed on
Vercel, with self-hosted fonts and a strict CSP. Work inside the existing design
system — do not invent a new brand.

### Objective

Produce a footer that lets a main contractor's procurement team do four things
without leaving the bottom of the page: understand who CIJI is, reach a human,
jump to a key section, and find the legal pages. It must look like it belongs to
this site and nothing else, and it must stay simple: no carousel, no accordion,
no hidden content on mobile.

### Required content (four functional blocks)

1. **About (brief)** — 2–3 sentences, max ~220 characters. Must state: part of
   the C.J Group of Companies alongside C.J Tec Contracting LLC; over a decade
   of aluminium and glass fabrication; work for building and infrastructure
   projects across the UAE; design, fabrication and installation from the
   Sharjah workshop. Do not add certifications, founding years, or client names
   that are not in the reference data.
2. **Contact** — telephone as a `tel:` link, email as a `mailto:` link, office
   hours, and the primary CTA **"Request a Quote"** (link to `/contact`). Phone
   and email must be real links, not plain text, and the phone number must not
   wrap mid-number.
3. **Offices** — Sharjah head office and Dubai office, each with a semantic
   `<address>` element (not italic by default), city as the heading.
4. **Quick navigation** — Home, About, Services, Projects, Contact, plus a small
   secondary group of service links on `/services#<slug>` (suggest three:
   curtain walling, spider glazing, aluminium cladding). Do not duplicate the
   entire nav; the footer is a shortcut, not a sitemap dump.

Plus a bottom bar: dynamic copyright year, Privacy Policy, Cookie Notice, Terms
of Use, and a "Back to top" control that respects `prefers-reduced-motion`.

**Social media:** add a compact social row driven by a single `socials` array
(platform, label, href). Render only entries with a real URL; render **nothing**
(no empty gap, no placeholder icons) when the array is empty — the company has
no verified accounts yet. Use `@phosphor-icons/react` brand glyphs already in
the project, each as a 44×44 px target with a visible `aria-label` and an
accessible name, never as bare decorative iconography.

### Visual direction

Match the site's existing language, which is engineered rather than startup-y:

- **Ground:** light `--footer-canvas` steel (#f6f7f9) with navy ink (#071627)
  and a 1px gold top border. Do **not** make the footer navy-950: the CTA band
  immediately above it is already a dark navy-800 gradient, and a second dark
  slab destroys the seam and the sense that the page has ended.
- **Type:** Chivo 700–900 for the wordmark and column headings, Barlow 400–600
  for body and links, IBM Plex Mono (12–13px, tracked, uppercase) only for
  structural labels and reference-like metadata. Body copy 15px, line-height
  1.6; never below 13px.
- **Accent:** one gold, used sparingly — the top hairline, link hover, and the
  primary button fill. On light backgrounds use gold-700 (#94660a) for text;
  gold-400/500/600 fail contrast as small text there.
- **Hierarchy without cards:** separate blocks with hairline rules
  (`#d9dde4`), spacing, and type weight. No rounded cards, no shadows, no
  gradients inside the footer, no glassmorphism.
- **Logo:** the existing `/images/logo-mark.png` at 48px height beside the
  company name. Keep `translate="no"` on the legal company names so browser
  translation cannot mangle them.

### Layout and responsiveness

- Desktop ≥1024px: a 4-column grid — About (widest, ~26rem) + Contact +
  Quick links + Offices — with a hairline-separated legal bar beneath.
- Tablet 640–1023px: 2 columns; About spans the full width first.
- Mobile <640px: single column in this order — wordmark and about → contact and
  CTA → quick links → offices → social → legal bar. Left-aligned, 16–20px
  gutters, no horizontal scroll at 320px.
- Use the existing `.container-x` (max 88rem, responsive gutters). Spacing on a
  4/8px scale; roughly 56px vertical padding on mobile, 72–80px on desktop.
- Every interactive element ≥44×44px on touch. Links get at least 8px vertical
  separation so thumbs do not hit the wrong one.
- Set the legal bar to wrap gracefully rather than shrink type.

### Interaction, accessibility, performance

- `<footer>` landmark, `<nav aria-label="Footer">` for the link groups,
  `<h2>` for each column heading, and a logical heading order.
- Visible focus ring using the site's existing dual-tone `:focus-visible` rule;
  do not remove it.
- Contrast: body/muted text on steel-50 at ≥4.5:1, non-text boundaries at ≥3:1.
  Current tokens that pass: ink #071627, muted #414b58, gold text #94660a.
- Hover: colour shift plus the existing `.link-slide` underline; a subtle
  inset gold edge is acceptable. Never move layout on hover.
- `prefers-reduced-motion`: no animated entrances in the footer at all; the
  Back-to-top scroll becomes instant.
- No third-party scripts, iframes, icon fonts, or remote images. Icons must be
  local React components/SVG. The CSP allows self-hosted assets plus the Google
  Maps frame on the contact page only.
- Lazy-load only below-the-fold imagery; the logo should keep explicit
  `width`/`height` to prevent layout shift.

### Copy rules

- British English, plain and factual, no marketing superlatives ("world-class",
  "cutting-edge", "passionate").
- Do not invent: years in business, licence numbers, TRN, certifications,
  project counts, social handles, or awards.
- Keep the existing canonical CTA wording: **"Request a Quote"**.
- Sentence case for links; uppercase only for short mono labels.

### Deliverables

1. `src/components/Footer.jsx` — accessible, data-driven, no new dependencies.
2. Any new CSS as a small addition in `src/index.css`, using the existing
   `--footer-*` custom properties and Tailwind tokens; no hard-coded hex values
   that duplicate a token.
3. If social links are added, a `socials` export in `src/data/site.js`
   (empty array by default).
4. A short note listing anything you could not verify.

Before finishing, run `npm run lint` and `npm run build`; both must pass.

### Acceptance checklist

- [ ] All four blocks present, with real `tel:` / `mailto:` links.
- [ ] No empty social row when there are no accounts.
- [ ] No horizontal overflow at 320px; readable at 200% zoom.
- [ ] Keyboard: every link reachable, focus always visible.
- [ ] Gold used only as accent; no gold small text on light ground.
- [ ] Footer reads as the end of the page, not as a fifth content section.
- [ ] No new dependencies, no remote assets, no invented facts.

---

## REFERENCE DATA (do not change without confirmation)

**Company**

| Field | Value |
|---|---|
| Legal name | Ciji Bldg. Metalic Const. Ind. LLC |
| Group | C.J Group of Companies |
| Sister company | C.J Tec Contracting LLC |
| Phone | +971 06 5355094 (`tel:+971065355094`) |
| Email | cijialum@yahoo.com |
| Hours | 08:30 to 19:00, Monday to Saturday |
| Sharjah (Head Office) | Industrial Area 17, Plot 39 · Opp. Al Alif Marbles · P.O Box 44316, Sharjah, U.A.E |
| Dubai Office | 115, Sky Business Centre · Near Coca Cola Factory · P.O Box 79102, Dubai, U.A.E |

**Routes:** `/` `/about` `/services` `/projects` `/contact` `/privacy`
`/cookies` `/terms`

**Design tokens (`src/index.css`)**

```
navy-950 #071627   navy-900 #0a1f35   navy-800 #10294a
navy-700 #17395f   navy-600 #1f4a78
gold-400 #f5b921   gold-500 #e8a312   gold-600 #c98a0b   gold-700 #94660a
steel-50 #f6f7f9   steel-100 #eceef2  steel-200 #d9dde4   steel-300 #b4bcc8
steel-400 #7e8a9c  steel-500 #55606f  steel-600 #414b58
```

Fonts: Chivo (display, 700–900), Barlow (body, 400/500/600), IBM Plex Mono
(data, 500/600). Container: 88rem max, 20/32/48px gutters. Button box: 48px
tall, uppercase, tracked, 28px horizontal padding.

**Existing footer variables**

```
--footer-canvas #f6f7f9   --footer-ink #071627   --footer-muted #414b58
--footer-hover #94660a    --footer-line #d9dde4
```

**Known constraints from `NOTES.md` and `README.md`**

- Stats and figures still need client confirmation — do not surface them in the
  footer.
- No social accounts verified; no advertising or tracking pixels allowed, and
  the privacy policy states there are none.
- No backend: do not add a newsletter form that cannot submit anywhere.
- CSP: self-hosted assets only, plus the Google Maps frame on `/contact`.
