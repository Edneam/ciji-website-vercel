import { Link } from 'react-router-dom'
import { ArrowRight, Check } from '@phosphor-icons/react'
import Reveal from '../components/Reveal.jsx'
import StatsStrip from '../components/StatsStrip.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ReferenceList from '../components/ReferenceList.jsx'
import Seo from '../components/Seo.jsx'
import { services } from '../data/services.js'
import { projects } from '../data/projects.js'

const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://cijialuminium.com/#organization',
    name: 'Ciji Bldg. Metalic Const. Ind. LLC',
    alternateName: ['C.J Group of Companies', 'Ciji Aluminium'],
    url: 'https://cijialuminium.com',
    logo: 'https://cijialuminium.com/images/logo.png',
    telephone: '+971-06-5355094',
    email: 'cijialum@yahoo.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Industrial Area 17, Plot 39',
      addressLocality: 'Sharjah',
      addressCountry: 'AE',
      postOfficeBoxNumber: 'P.O Box 44316',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cijialuminium.com/#localbusiness',
    name: 'Ciji Bldg. Metalic Const. Ind. LLC',
    image: 'https://cijialuminium.com/images/hero-poster.jpg',
    telephone: '+971-06-5355094',
    email: 'cijialum@yahoo.com',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Industrial Area 17, Plot 39',
      addressLocality: 'Sharjah',
      addressCountry: 'AE',
    },
    areaServed: ['Sharjah', 'Dubai', 'Abu Dhabi', 'United Arab Emirates'],
    openingHours: 'Mo-Sa 08:30-19:00',
  },
]

// Capability claims drawn from the company profile. No icons: a grid glyph
// does not explain curtain walling, and three identical icon+title+text rows
// gave all three claims the same weight so none of them led.
const capabilities = [
  {
    title: 'High-rise facade systems',
    desc: 'Curtain walling and structural glazing engineered for tower elevations, from system design through site installation.',
  },
  {
    title: 'Fabrication in-house',
    desc: 'Our own fabrication shop controls tolerance, finish and programme instead of subcontracting the critical path.',
  },
  {
    title: 'Main-contractor experience',
    desc: 'Delivered as a specialist subcontractor to government authorities and international main contractors.',
  },
]

/**
 * The six building-envelope systems, each paired with a photograph of built
 * work. Only images confirmed at 1280px wide are used here, because these
 * cards render large; the smaller 390px project photos would visibly soften.
 *
 * `credit` names the project in the photograph. It is deliberately worded as
 * a photo credit ("Shown: ...") and not as "this system was installed here",
 * because the system-to-project pairing has not been confirmed against
 * company records. See NOTES.md.
 */
const envelopeArt = [
  { image: '/images/projects/ic3-tower.jpg', credit: 'Shown: IC3 Tower, Dubai' },
  { image: '/images/projects/pivot-building.jpg', credit: 'Shown: Pivot Building, Dubai' },
  { image: '/images/projects/enviroserve.jpg', credit: 'Shown: Enviroserve Facility, Dubai' },
  { image: '/images/projects/cold-stores.jpg', credit: 'Shown: Cold Stores Facility, Dubai' },
  { image: '/images/projects/titan-building.jpg', credit: 'Shown: Titan Building, Sharjah' },
  { image: '/images/projects/mag-building.jpg', credit: 'Shown: Mag Building, Dubai' },
]

const envelopeSystems = services.slice(0, 6).map((s, i) => ({
  ...s,
  ...envelopeArt[i],
  alt: `${envelopeArt[i].credit.replace('Shown: ', '')}, aluminium and glass facade by CIJI`,
}))

const metalworkLines = services.slice(6)

export default function Home() {
  const leadProject = projects[0]
  const gridProjects = projects.slice(1, 5)

  return (
    <>
      <Seo
        title="Ciji Bldg. Metalic Const. Ind. LLC | Aluminium & Glass Facade Contractor, UAE"
        description="Aluminium and glass facade contractor in the UAE. Structural glazing, curtain walling, spider glazing, skylights and cladding, fabricated and installed in-house from Sharjah. Part of C.J Group of Companies."
        path="/"
        schema={homeSchema}
      />

      {/* ---- Hero: left-aligned, 4 text elements max ---- */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-950">
        <img
          src="/images/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          width="1920"
          height="1080"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Directional scrim: heavier at the left where the type sits, so the
            glass reflections stay legible on the right. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/60 to-navy-950/25" />

        <div className="container-x relative pt-28 pb-20">
          <div className="max-w-3xl">
            <Reveal>
              {/* No kicker above the h1. The company name belongs in the
                  supporting line and the footer, not as a tracked label
                  diluting the headline. */}
              <h1 className="font-display text-[2.35rem] font-bold uppercase leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
                Aluminium and glass facades, engineered and installed
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-200">
                A UAE facade contractor fabricating and installing curtain walling, structural
                glazing and cladding in-house.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="btn btn-primary">
                  Request a Quote <ArrowRight size={16} weight="bold" />
                </Link>
                <Link to="/projects" className="btn btn-outline">
                  See delivered projects
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Layout family 2: asymmetric split, image bleeds off the grid ---- */}
      <section className="py-24 lg:py-32">
        <div className="container-x grid items-start gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal className="img-zoom lg:-mt-4">
            <img
              src="/images/projects/satwa-g8.jpg"
              alt="Structural glass facade on a G+8 residential building in Satwa, Dubai"
              width="800"
              height="1000"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading title="A specialist facade subcontractor, not a general trade" />
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-7 space-y-5 leading-relaxed">
                <p>
                  <strong className="font-semibold text-navy-950">{'C.J Group of Companies'}</strong>{' '}
                  comprises Ciji Bldg. Metalic Const. Ind. LLC and C.J Tec Contracting LLC, with over
                  a decade of experience in the UAE construction industry and a technically qualified
                  team experienced in aluminium and glass fabrication.
                </p>
                <p>
                  Work covers design, fabrication and installation of structural glazing and curtain
                  walling for high-rise buildings, along with skylights, glass partitions, automatic
                  doors, cladding, doors, windows and gates.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-9 divide-y divide-steel-200 border-y border-steel-200">
                {[
                  'Design, fabrication and installation held under one contract',
                  'Conversant with regional construction regulations and labour law',
                  'Track record with government authorities and main contractors',
                ].map((t) => (
                  <li key={t} className="flex gap-4 py-4">
                    <Check size={18} weight="bold" className="mt-1 shrink-0 text-gold-700" />
                    <span className="text-navy-950">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240}>
              <Link
                to="/about"
                className="press link-slide mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy-950"
              >
                More about the company <ArrowRight size={15} weight="bold" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Layout family 3: image-led capability bento.
              Specialist facade contractors (Enclos, Permasteelisa) sell this
              section on photographs of built work, not on a list of product
              names. The six envelope systems each carry a real project photo
              and a project credit; the remaining six trades sit below as a
              compact strip so the twelve in the copy still equals twelve on
              the page. Bento is 3x3 with an exact cell count: the lead card
              takes 2x2, two cards stack in the right column, three run along
              the bottom. No empty cells. ---- */}
      <section className="border-y border-steel-200 bg-steel-50 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {/* No kicker: the heading names the capability set itself. */}
                <h2 className="font-display max-w-xl text-3xl font-bold uppercase leading-[1.05] tracking-tight text-navy-950 md:text-[2.6rem]">
                  Twelve product lines across the building envelope
                </h2>
              </div>
              <p className="max-w-xs shrink-0 leading-relaxed sm:text-right">
                Designed, fabricated and installed by our own teams, under one contract.
              </p>
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
            {envelopeSystems.map((s, i) => (
              <li
                key={s.title}
                className={i === 0 ? 'lg:col-span-2 lg:row-span-2' : undefined}
              >
                <Reveal delay={Math.min(i, 3) * 70} className="h-full">
                  <Link
                    to="/services"
                    className="img-zoom group relative flex h-full min-h-[15rem] flex-col justify-end overflow-hidden bg-navy-950"
                  >
                    <img
                      src={s.image}
                      alt={s.alt}
                      loading="lazy"
                      width="1280"
                      height="960"
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                    />
                    {/* Scrim carries the label; heavier at the foot where the
                        type sits so the glass stays readable above it. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent"
                    />
                    <div className="relative p-6">
                      <p className="spec-label text-gold-500">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3
                        className={`font-display mt-2 font-bold uppercase leading-tight tracking-tight text-white ${
                          i === 0 ? 'text-2xl md:text-3xl' : 'text-lg'
                        }`}
                      >
                        {s.title}
                      </h3>
                      {i === 0 ? (
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-steel-200">
                          {s.desc}
                        </p>
                      ) : null}
                      {/* Sentence case, not uppercase: these credits run to
                          30-odd characters, and uppercase at that length costs
                          the word-shape cues that make text readable.
                          Uppercase stays for short labels only. */}
                      <p className="mt-3 font-mono text-[12px] tracking-[0.02em] text-steel-300">
                        {s.credit}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* The other six trades. Named, not pictured, so the count is honest
              without padding the grid with weaker photography.

              Centred rather than set in a two-column split: the list is short
              and the left rail left an L-shaped void with the button hanging
              low beside empty space. A single centred stack closes the
              section symmetrically under the bento above. */}
          <Reveal delay={120} className="mt-12">
            <div className="border-t border-steel-300 pt-10 text-center">
              <h3 className="spec-label">Also fabricated in-house</h3>
              <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
                {metalworkLines.map((s, i) => (
                  <li key={s.title} className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[12px] font-medium text-gold-700">
                      {String(i + 7).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-navy-950">{s.title}</span>
                  </li>
                ))}
              </ul>

              <Link to="/services" className="btn btn-invert mt-10">
                All services
                <ArrowRight size={15} weight="bold" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsStrip />

      {/* ---- Layout family 4: editorial project feature, one lead + grid ---- */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              title="Projects delivered across the UAE"
              sub="Residential towers, commercial buildings and industrial facilities completed as a facade subcontractor."
            />
          </Reveal>

          <Reveal delay={80} className="mt-14">
            <Link to="/projects" className="group img-zoom relative block">
              <img
                src={leadProject.image}
                alt={`${leadProject.title}, ${leadProject.category.toLowerCase()} project in ${leadProject.location}`}
                width="1600"
                height="900"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <p className="spec-label text-gold-400">{leadProject.category}</p>
                <h3 className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {leadProject.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-steel-300">{leadProject.location}</p>
              </div>
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gridProjects.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <Link to="/projects" className="group block">
                  <div className="img-zoom">
                    <img
                      src={p.image}
                      alt={`${p.title}, ${p.category.toLowerCase()} project in ${p.location}`}
                      width="600"
                      height="750"
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <p className="spec-label mt-4">{p.category}</p>
                  <h3 className="font-display mt-1.5 text-base font-semibold leading-snug text-navy-950 transition-colors group-hover:text-gold-700">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-steel-500">{p.location}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Layout family 5: real data table for tabular reference data ---- */}
      <section className="border-t border-steel-200 bg-steel-50 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              title="Flagship references"
              sub="Projects delivered under international and government main contractors."
            />
          </Reveal>

          <div className="mt-12">
            <ReferenceList />
          </div>
        </div>
      </section>

      {/* ---- Layout family 6: photograph against three argued claims.
              Previously this was an icon + heading + text row repeated three
              times, which is the generic "features" block: the icons were
              decoration (a grid glyph does not explain curtain walling) and
              all three claims carried identical weight, so none of them led.

              Now a real facade photograph carries the left side and each claim
              is a statement with a short proof line under it. No icons: the
              words do the work.

              Light ground, not navy. This section used to be bg-navy-950 and
              sat immediately above the navy CtaBand, so the two merged into one
              undivided dark mass and the CTA stopped reading as a separate
              band. The page now alternates properly into the CTA:
              steel-50 (references) -> white (here) -> navy (CtaBand). ---- */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading title="Why main contractors appoint us" />
            <p className="mt-6 max-w-2xl leading-relaxed">
              We compete on technology, quality, commercial terms and delivered performance,
              working to the standards and regulations prevailing in the region.
            </p>
          </Reveal>

          {/* No `lg:items-start`: the claims column runs about 220px deeper
              than the photo, and pinning both to the top left a dead rectangle
              under the caption. Stretching the row instead lets the photo grow
              to the full height of the claims beside it, so the two columns
              close on the same line. */}
          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* Evidence, not ornament: this is the work the claims beside it
                describe.

                The previous image here was /images/gallery/tower-hi-1.jpeg and
                had to go. It is not a photograph at all: it is a scanned page
                from a company profile, three separate photos collaged together
                with white gutters, showing a LOW-RISE industrial plant that
                carries another company's signage ("Black Bulls") across its
                facade. The alt text called it a high-rise tower elevation,
                which was simply false, and shipping a competitor's branding on
                CIJI's homepage is worse than shipping no image.

                Every file in /images/gallery is the same kind of scan (CPL
                Aroma, Morgan, Sanford, Citadines all appear), so none of them
                belong on a page as a standalone photograph. This one is from
                /images/projects instead, checked individually: a single frame,
                no third-party signage, and the subject is the dark reflective
                curtain walling this section is about. Landscape crop because
                the source is 1280x847. */}
            <Reveal className="flex flex-col">
              {/* img-zoom moves to an inner wrapper so it can flex-grow to the
                  row height while keeping its own overflow clip for the hover
                  scale. On desktop the fixed 4:3 ratio is dropped in favour of
                  filling the cell; object-cover keeps the crop honest. */}
              <div className="img-zoom lg:flex-1">
                <img
                  src="/images/projects/umm-al-shaif.jpg"
                  alt="Dark blue reflective curtain walling and glazing on a completed CIJI facade package, Umm Al Shaif, UAE"
                  loading="lazy"
                  width="1280"
                  height="847"
                  className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full"
                />
              </div>
              <p className="spec-label mt-3">Umm Al Shaif, UAE</p>
            </Reveal>

            {/* The closing rule lives on the list, not on the last item. Each
                claim's div is the only child of its <li>, so a `last:border-b`
                utility would match every one of them and draw three rules. */}
            <ol className="border-b border-steel-200">
              {capabilities.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 90}>
                  {/* Rules and type move to the light palette with the section:
                      steel-200 hairlines, navy titles, and gold-700 for the
                      index. gold-500 is a dark-ground colour and measures
                      around 2:1 on white, so it cannot carry text here. */}
                  <div className="border-t border-steel-200 py-8 lg:py-10">
                    <p className="font-mono text-xs font-medium tracking-[0.16em] text-gold-700">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display mt-4 max-w-lg text-2xl font-bold leading-[1.15] text-navy-950 md:text-[1.75rem]">
                      {c.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
