# Pre-launch notes

Two lists. The first needs answers from the company. The second is what I
changed and why, where the reason was legal or factual rather than visual.

---

## 1. Needs confirming before launch

Nothing here is broken. Each item is a fact on the site that I could not
verify from the source material, or a gap only the company can fill.

### Figures in the stats strip

`src/data/site.js`

| Shown | Was | Note |
|---|---|---|
| 245+ Projects Delivered | same | Confirm against records |
| 750+ Clients Served | "750+ Happy Clients" | Relabelled: satisfaction cannot be evidenced |
| 288 People on Staff | "288 Experienced Staff" | Confirm current headcount |
| 10+ Years in the UAE | "15+ Years in the UAE" | Changed: 15 contradicted "over a decade" in the company copy |

If the company has been trading 15+ years, restore `15+` **and** update the
"over a decade" wording everywhere so the two agree. Right now they did not.

### Trade licence and establishment year

Not on the site. I removed an earlier draft that stated "Established 2010"
and a Sharjah trade licence line, because neither was in the source material
and I had invented both.

For UAE B2B credibility these are worth adding once known:

- Trade licence number and issuing emirate
- Year of establishment
- TRN (VAT registration), if registered

A main contractor's procurement team will look for these.

### The scanned profile sheets in public/images/gallery are no longer used

`public/images/gallery/` (21 files)

Read this one. These files were being shown on the site as photographs of
CIJI's own installations, and they are not.

Every file in that folder is a **scanned page from a company profile
document**, not a photograph. Each one collages several photos together with
white gutters between them, and several carry **other companies' signage
across the building facade**: Black Bulls, CPL Aroma, Morgan, Sanford and
Citadines all appear. Some show low-rise industrial plants, not facades.

They were used in two places, both now fixed:

- The About page mapped over 12 of them and labelled each one "Completed
  aluminium and glass facade installation by CIJI, view N". That alt text
  asserted something untrue about all 12.
- The Home page used `tower-hi-1.jpeg` (the Black Bulls sheet) as the large
  photograph beside "Why main contractors appoint us", with alt text calling
  it a high-rise tower elevation.

Both now use photographs from `public/images/projects/` with the real project
name and location in the caption. **No page references
`public/images/gallery/` any more.**

The files are still in the repo and still tracked by git. My recommendation
is to delete the folder: it is dead weight, and if anything ever links it
again the site is publishing a competitor's branding as its own work. I left
the deletion for the owner to approve since they are tracked assets.

### The hero video was footage of the wrong country

`public/videos/hero-bg.mp4`

The previous hero video was **downtown Austin, Texas**, identifiable from
Frost Bank Tower, The Independent, and Google's illuminated "G" logo on the
500 W 2nd St building. A UAE facade contractor's homepage was leading with
American architecture and a third party's trademark.

Replaced with footage of Dubai glass-and-aluminium curtain wall towers, taken
from Pexels under its free-to-use licence, vetted frame by frame for signage
before use. Encoded to 1.9 MB from 7.5 MB while going 720p to 1080p.

Two things worth knowing:

- The clip is **stock footage, not CIJI's own work.** It is used as an
  atmospheric hero background, and nothing in the copy claims the buildings
  in it are CIJI projects. If the company would rather not use stock at all,
  the honest replacement is a wide shot of one of their own completed
  elevations, and there are 18 in `public/images/projects/`.
- Pexels licence terms allow commercial use without attribution but prohibit
  redistributing the footage as a standalone file. Keeping it as a background
  on the site is within the licence. Worth a second look by the owner if the
  site is ever sold or handed on.

### Image rights

`public/images/`

I compressed and resized the existing images but did not source them, and I
cannot verify who owns them. Before launch, confirm for each photograph:

- It was taken by the company, or the company holds a licence to publish it
- Where a project belongs to a client or main contractor, that publishing it
  is permitted (facade photographs of identifiable buildings are usually
  fine, but named-client references sometimes are not)

The named main contractors in `src/data/projects.js` are presented as factual
project references, not endorsements. If any contractor objects to being
named, remove that row.

### The 404 page

`/nope` and any other unknown path render the custom 404 page correctly in
the SPA. Confirm the host returns a real **HTTP 404 status** for unknown
paths rather than 200, otherwise search engines will index them as valid
pages. On Cloudflare Pages this needs a `404.html` or an explicit rule; the
current `_redirects` sends everything to `index.html`.

### Email address

`cijialum@yahoo.com` is a free consumer mailbox used as the business contact
and as the address in the privacy notice. It works, but for a company
tendering to government authorities a domain address (`info@cijialuminium.com`)
reads considerably more credible, and it keeps enquiry data under company
control rather than in a personal account.

---

## 2. Legal and compliance position

### What the site actually collects

Verified by grep, not assumed:

- No analytics, no Google Analytics, no tag manager, no Meta pixel
- No cookies set by the site
- No `localStorage` or `sessionStorage`
- No fonts, scripts or styles loaded from third parties (fonts are self-hosted)
- One third-party embed: the Google Map on the contact page

So the site collects nothing on its own. That is what the privacy notice says,
and it is currently true. **If analytics is added later, the privacy notice
and cookie notice must be updated at the same time**, and a cookie banner
will then be required.

### The map loads directly (owner's decision)

`src/components/MapEmbed.jsx`

The Google Maps iframe loads with the page, on the owner's instruction. It was
briefly consent-gated behind a "Load the map" button; that gate was removed.

**Consequence, and it is a real one:** Google receives every contact-page
visitor's IP address and sets its own cookies, with no prior consent. The site
still sets no cookies of its own, but it can no longer claim that no cookies
are set at all. The privacy notice and cookie notice were both rewritten to say
this plainly rather than left describing the removed gate.

`loading="lazy"` is kept, so the request only fires when the map scrolls near
the viewport. The plain-text address and a normal link to Maps remain on the
page for anyone blocking third-party frames.

**Under GDPR/PDPL this is the weakest point on the site.** Setting a
third-party cookie before consent is exactly what consent banners exist for. If
the site is ever assessed for EU/UK compliance, either restore the gate or add a
consent banner. This is a decision the owner made knowingly, not an oversight.

### No cookie banner

There is a Cookie Notice page, but no consent banner. That was defensible while
the map was gated and nothing set cookies. Now that the map loads on sight, a
banner is the compliant option if the site needs to satisfy GDPR/PDPL. Flagged,
not silently accepted.

### Form consent

`src/pages/Contact.jsx`

An unticked checkbox, required before the enquiry can be composed, naming
the specific purpose (responding to this enquiry) and linking to the privacy
notice. Not a pre-ticked box, and not a blanket "I agree to everything".

The form collects name, email, phone (optional), scope and message. Nothing
else. No hidden fields, no fingerprinting.

### The form does not reach a server

The form composes a `mailto:` draft in the visitor's own mail client. Nothing
is transmitted until the visitor presses send there. This is described
accurately in the privacy notice.

Practical consequences worth knowing:

- Visitors without a configured mail client cannot use it. Phone and email
  are shown prominently as alternatives, so nobody is stuck.
- Enquiries arrive in a Yahoo mailbox, so the enquiry data lives there.
- There is no spam filtering and no delivery confirmation.

A Cloudflare Pages Function plus a transactional mail service would fix all
three. That is a build task, not a legal one, and it is not done.

### Refund policy

You asked for one. I did not write it, because the site sells nothing: no
prices, no checkout, no payments, no online ordering. A refund policy on a
site with no transactions would be invented text.

What I did instead: the Terms of Use state plainly that the site is
informational, that nothing on it is a binding offer, and that quotations
and payment terms are governed by the signed contract for each project.

If the company ever takes deposits or payments online, a real refund and
cancellation policy becomes mandatory. Not before.

### Jurisdiction and applicable law

I am not a lawyer and this is not legal advice. Flagging what applies:

- **UAE Federal Decree-Law No. 45 of 2021** on personal data protection is
  the relevant federal regime. Enforcement details have been slower to arrive
  than the law itself, so the practical standard is: collect only what you
  need, say what you do with it, honour deletion requests. The site does all
  three.
- **Free zone regimes** (DIFC Data Protection Law, ADGM) are stricter and
  apply if a group entity is registered in one. The Sharjah and Dubai
  addresses on the site suggest mainland, so probably not applicable, but
  worth checking against actual registrations.
- **GDPR** can apply if the company actively targets EU clients. This site
  targets the UAE, so unlikely, but the privacy notice covers the same
  rights anyway (access, correction, deletion, objection).
- **UAE consumer protection law** is largely irrelevant here: the audience is
  main contractors and developers, not consumers, and nothing is sold online.
- **Advertising standards**: UAE rules prohibit misleading commercial claims.
  This is the reason for the stats relabelling above. "750+ Happy Clients"
  is exactly the kind of unverifiable claim worth removing.

### Accessibility

Not a UAE legal requirement for a private company website, but it was asked
for and it is done to WCAG 2.1 AA on the checks I could automate:

- Contrast: every text/background pair measured with the WCAG formula.
  Failures fixed, including a `gold-600` on white at 2.95:1 used for
  required-field markers, and a `steel-400` grey at 3.26 to 3.5:1 used for
  small labels. Remaining "failures" in the audit are white text over dark
  photographs, where the sampler reads the page background instead of the
  image.
- Keyboard: skip link, visible focus ring on everything focusable, mobile
  menu traps focus and returns it to the toggle on Escape.
  The focus ring is deliberately **two-tone**: a navy outline with a white
  ring inside it. WCAG 2.4.11 wants 3:1 against the adjacent background, and
  controls on this site sit on four different grounds. No single colour
  clears 3:1 on all four (measured: gold-500 scored 2.17:1 on white and
  2.02:1 on steel-50, so the original single gold ring failed on every light
  ground). With two tones, one of the two edges always clears 3:1 by a wide
  margin. Do not simplify it back to one colour.
- Non-text contrast: the outlined button on the hero video was measured
  against all 288 frames of the clip, because the camera drifts and a dark
  region early in the loop becomes bright later. Its `white/30` border
  bottomed out at 2.08:1, under the 3:1 that WCAG 1.4.11 requires for a
  control boundary, so it is now `white/55` (3.46:1 worst case). Any change
  to the hero clip needs this re-measured, not eyeballed.
- Forms: real `<label>` elements (no placeholder-as-label), errors announced
  with `aria-invalid` and `aria-describedby`, status region with `aria-live`.
- Structure: one `<h1>` per page, semantic landmarks, real breadcrumb `<nav>`,
  tables with `<caption>` and `<th scope>`.
- Images: descriptive alt text on content images, `aria-hidden` on decorative
  ones, `alt=""` on backgrounds.
- Motion: everything respects `prefers-reduced-motion`.

Not verified: screen reader testing with an actual screen reader, and testing
on real mobile hardware. Both need a human.

---

## 3. What was checked and passes

- `npm run lint` - 0 warnings, 0 errors, 29 files
- `npm run build` - passes
- All 9 routes render with 0 JavaScript errors
- Impeccable design detector: **clean on all 9 routes** (`/`, `/about`,
  `/services`, `/projects`, `/contact`, `/privacy`, `/cookies`, `/terms` and
  the 404 route). Run it with
  `~/.hermes/skills/impeccable/scripts/impeccable detect <url>`.
  Two known false positives, both verified by hand and left alone:
  a `cramped-padding` report on Home, where the detector reads the
  `<section>`'s own padding as 0 and misses that the inner container carries
  it (measured gaps: hero 152/120px, stats 66/43px, CTA 94/66px); and
  `low-contrast` reports on Projects card labels, which sit on photographs
  under a gradient scrim the detector cannot composite (measured against the
  real image pixels: 5.57:1 to 8.91:1).
- 198 links checked: 0 broken internal paths, 0 dead `#` links. The only
  external host requested by any page is `www.google.com`, the map embed.
- No horizontal overflow at 375, 768 and 1280 px, on all 9 routes, measured
  in real sized viewports rather than by resizing script (0 offending
  elements at every width)
- 0 broken images across all pages
- Form validation exercised live: invalid email blocked, consent unticked
  blocked, `aria-invalid` set, error text shown, focus moved to the first
  bad field
- Mobile menu exercised live: opens, locks background scroll, traps focus
  both tab directions, Escape closes and restores focus to the toggle
- Every CTA is one 48 px box (was three different heights)
- Images: 6.4 MB to 3.3 MB, all 40 files decode, logo untouched
- Fonts: 248 KB self-hosted, no third-party font requests
