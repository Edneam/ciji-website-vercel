import { Link } from 'react-router-dom'
import { ArrowRight, Check } from '@phosphor-icons/react'
import PageHeader from '../components/PageHeader.jsx'
import StatsStrip from '../components/StatsStrip.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import { company } from '../data/site.js'
import { imageSlug, projects } from '../data/projects.js'

const highlights = projects.slice(0, 3)

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cijiintl.com/' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://cijiintl.com/about' },
  ],
}

/* Mission / vision / values. Presented as hairline-divided statements
   rather than three identical icon cards: no Target/Eye/Gem metaphors,
   no elevation where nothing is elevated. */
const foundation = [
  {
    label: 'Mission',
    text: 'Deliver exceptional customer service by improving project value through high-class design, fabrication and process management.',
  },
  {
    label: 'Vision',
    text: 'Remain one of the most competitive construction groups in the region in technology, quality, commercial terms and performance.',
  },
  {
    label: 'Values',
    text: 'Full compliance with regional standards, rules and regulations, with honesty, safety and craftsmanship in everything we build.',
  },
]

const capabilities = [
  'Undertake a wide range of projects in all types of locations',
  'Fully conversant with regional construction regulations and labour law',
  'Track record with government authorities and private developers',
  'Technically qualified experts with deep field experience',
  'Competitive pricing with a high benefits-to-cost ratio',
]

export default function About() {
  return (
    <>
      <Seo
        title="About CIJI | UAE Aluminium & Glass Contractor"
        description="Ciji Bldg. Metalic Const. Ind. LLC and C.J Tec Contracting LLC form C.J Group of Companies, with over a decade of aluminium and glass facade work in the UAE."
        path="/about"
        lcpImage="/images/projects/jvt-residential.jpg"
        pageType="AboutPage"
        schema={aboutSchema}
      />
      <PageHeader
        title="About the company"
        crumb="About Us"
        lead="A specialist aluminium and glass subcontractor working for main contractors and developers across the Emirates."
        image="/images/projects/jvt-residential.jpg"
      />

      {/* ---- Who we are: text leads, single supporting image ---- */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-start gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading title="Over a Decade on UAE Building Envelopes" />
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-7 space-y-5 leading-relaxed">
                <p>
                  We are pleased to introduce ourselves as <strong translate="no">{company.group}</strong>,
                  comprising <strong translate="no">{company.name}</strong> and{' '}
                  <strong translate="no">{company.sisterCompany}</strong>, with over a decade of experience in the
                  construction industry in the U.A.E.
                </p>
                <p>
                  We specialise in aluminium and glass fabrication with technically qualified
                  experts, well experienced in the field. Our range of activities includes design,
                  fabrication and installation of structural glazing and curtain walling for
                  high-rise buildings, skylights, glass partitions, automatic doors, aluminium and
                  stainless steel cladding, doors, windows and gates.
                </p>
                <p>
                  We offer full solutions for building and infrastructure projects at competitive
                  pricing. Our primary focus is to improve project value with a high
                  benefits-to-cost ratio.
                </p>
                <p>
                  We compete in the region on technology, quality, commercial terms and delivered
                  performance, and we bring the same professional approach to business enquiries as
                  to awarded projects.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Not sticky: this is a grid item whose height matches the row, so
              there is no travel range for `position: sticky` to use. It was a
              silent no-op, so the classes are gone rather than left in place
              looking intentional. */}
          <Reveal delay={160} className="img-zoom">
            <img
              src="/images/projects/pivot-building.jpg"
              alt="Curtain wall facade on the Pivot Building, Dubai, fabricated and installed by CIJI"
              width="1280"
              height="847"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <p className="spec-label mt-3">Pivot Building, Dubai</p>
          </Reveal>
        </div>
      </section>

      {/* ---- Foundation: hairline-divided statements, no cards, no icons ---- */}
      <section className="border-y border-steel-200 bg-steel-50 py-16 md:py-20">
        <div className="container-x grid gap-px sm:grid-cols-3">
          {foundation.map((f, i) => (
            <Reveal
              key={f.label}
              delay={i * 90}
              className={`py-6 sm:px-8 sm:py-2 ${
                i > 0 ? 'border-t border-steel-200 pt-6 sm:border-l sm:border-t-0 sm:pt-2' : 'sm:pl-0'
              }`}
            >
              <h2 className="spec-label text-gold-700">{f.label}</h2>
              <p className="font-display mt-3 text-lg font-semibold leading-snug text-navy-950">
                {f.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <StatsStrip />

      {/* ---- Capabilities: numbered rows (a real enumerated list) beside image ---- */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="img-zoom order-last lg:order-first">
            <img
              src="/images/projects/titan-building.jpg"
              alt="Structural glazing and aluminium panels on the Titan Building, Sharjah"
              loading="lazy"
              width="800"
              height="600"
              className="aspect-[4/3] w-full object-cover"
            />
            <p className="spec-label mt-3">Titan Building, Sharjah</p>
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading title="What We Bring to a Facade Package" />
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8">
                {capabilities.map((c) => (
                  <li
                    key={c}
                    className="flex gap-4 border-t border-steel-200 py-4 last:border-b last:border-steel-200"
                  >
                    <Check
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-gold-700"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180}>
              <Link
                to="/contact"
                className="btn btn-invert mt-8"
              >
                Request a Quote
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Gallery: masonry, a distinct layout family from everything above ---- */}
      <section className="border-t border-steel-200 bg-steel-50 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              title="Facades across the Emirates"
              sub="Installed work: towers, residences and commercial elevations completed by our own fabrication and installation teams."
            />
          </Reveal>
          {/* A uniform grid, not a masonry column flow. The sources are a mix
              of 4:3, 3:2 and portrait crops, so `columns` produced ragged
              column bottoms; a fixed 4:3 object-cover cell keeps the grid
              even and each caption on the same line as its neighbours. */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:gap-5">
            {highlights.map((project, i) => (
              <Reveal key={project.title} delay={i * 70}>
                <Link to={`/projects?photo=${imageSlug(project.image)}`} className="group block">
                  <div className="img-zoom">
                    <img
                      src={project.image}
                      alt={`${project.title}, aluminium and glass facade completed by CIJI in ${project.location}`}
                      loading="lazy"
                      width={project.width}
                      height={project.height}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <p className="mt-2.5 font-mono text-xs leading-snug text-steel-500 group-hover:text-navy-950">
                    {project.title}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <Link
              to="/projects"
              className="press link-slide mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy-950"
            >
              View all projects <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
