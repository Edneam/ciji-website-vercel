import { Check } from '@phosphor-icons/react'
import PageHeader from '../components/PageHeader.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import { services, serviceSlug } from '../data/services.js'

const servicesSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cijiintl.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://cijiintl.com/services',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Aluminium and Glass Facade Contracting',
    provider: {
      '@type': 'Organization',
      '@id': 'https://cijiintl.com/#organization',
      name: 'Ciji Bldg. Metalic Const. Ind. LLC',
      url: 'https://cijiintl.com/',
    },
    areaServed: 'United Arab Emirates',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Aluminium and Glass Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.desc,
        },
      })),
    },
  },
]

/* The six envelope systems, each with what the scope actually covers.
   Scope points are a real sequence (design, fabricate, install), so the
   ordered list carries information rather than decorating the section. */
const envelope = [
  {
    ...services[0],
    image: '/images/projects/ic3-tower.jpg',
    scope: [
      'System design and thermal performance engineering',
      'In-house fabrication of mullions, transoms and panels',
      'Site installation, sealing and quality testing',
    ],
  },
  {
    ...services[1],
    image: '/images/projects/pantheon.jpg',
    scope: [
      'Point-fixed spider fitting systems',
      'Glass fin and steel support structures',
      'Tension rod and cable truss facades',
    ],
  },
  {
    ...services[2],
    image: '/images/projects/enviroserve.jpg',
    scope: [
      'Aluminium-framed skylight systems',
      'Steel-structure skylights for large spans',
      'Weather-tight, thermally efficient glazing',
    ],
  },
  {
    ...services[3],
    image: '/images/projects/warehouse-large.jpg',
    scope: [
      'Long-span aluminium and steel structures',
      'Roof and atrium feature architecture',
      'Lightweight modular assembly',
    ],
  },
  {
    ...services[4],
    image: '/images/projects/titan-building.jpg',
    scope: [
      'ACP cladding systems',
      'Precision-fabricated aluminium panels',
      'Exterior envelopes and architectural features',
    ],
  },
  {
    ...services[5],
    image: '/images/projects/mag-building.jpg',
    scope: [
      'Frameless glass partition systems',
      'Framed partition systems for offices',
      'Light-filled, contemporary interiors',
    ],
  },
]

/* Metalwork and access products: same trade, different scope. Grouped
   rather than presented as six more identical cards. */
const metalwork = services.slice(6)

export default function Services() {
  return (
    <>
      <Seo
        title="Glazing, Curtain Wall & Cladding Services | CIJI"
        description="Aluminium and glass services in the UAE: structural glazing, curtain walling, spider glazing, skylights, space frames, ACP cladding, partitions and doors."
        path="/services"
        lcpImage="/images/projects/dubai-walls.jpg"
        pageType="CollectionPage"
        schema={servicesSchema}
      />
      <PageHeader
        title="Services"
        crumb="Services"
        lead="Twelve product lines across the building envelope, all designed, fabricated and installed by our own teams."
        image="/images/projects/dubai-walls.jpg"
      />

      {/* ---- Envelope systems: full-bleed image with the scope beside it.
              Alternation is capped at two consecutive splits, then the
              layout family changes below. ---- */}
      <section className="py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              title="Facade Systems We Engineer"
              sub="Each building-envelope package is quoted as one scope: system design, shop fabrication and site installation under a single contract."
            />
          </Reveal>
        </div>

        <div className="container-x mt-16 space-y-20 md:mt-20 md:space-y-24">
          {envelope.slice(0, 2).map((s, i) => {
            const flip = i % 2 === 1
            return (
              <div
                key={s.title}
                className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
              >
                <Reveal className={`img-zoom ${flip ? 'lg:order-2' : ''}`}>
                  <img
                    src={s.image}
                    alt={`${s.title} installed by CIJI on a UAE project`}
                    loading="lazy"
                    width="900"
                    height="675"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Reveal>
                <Reveal delay={100} className={flip ? 'lg:order-1' : ''}>
                  <h3
                    id={serviceSlug(s.title)}
                    className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-navy-950 md:text-3xl"
                  >
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[58ch] leading-relaxed">{s.desc}</p>
                  <ol className="mt-7 space-y-0 border-t border-steel-200">
                    {s.scope.map((pt, n) => (
                      <li
                        key={pt}
                        className="flex gap-5 border-b border-steel-200 py-3.5 text-sm"
                      >
                        <span className="font-mono text-xs text-steel-500">
                          {String(n + 1).padStart(2, '0')}
                        </span>
                        <span className="text-steel-600">{pt}</span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            )
          })}
        </div>
      </section>

      {/* ---- Remaining envelope systems: image-topped columns. Different
              layout family, so the zigzag does not run past two. ---- */}
      <section className="border-y border-steel-200 bg-steel-50 py-20 md:py-24">
        <div className="container-x">
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {envelope.slice(2).map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 90}>
                <article>
                  <div className="img-zoom">
                    <img
                      src={s.image}
                      alt={`${s.title} installed by CIJI on a UAE project`}
                      loading="lazy"
                      width="760"
                      height="500"
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </div>
                  <h3
                    id={serviceSlug(s.title)}
                    className="font-display mt-6 text-xl font-bold uppercase tracking-tight text-navy-950"
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[54ch] text-sm leading-relaxed">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.scope.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm text-steel-600">
                        <Check
                          size={16}
                          weight="bold"
                          className="mt-1 shrink-0 text-gold-700"
                          aria-hidden="true"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              title="Metalwork and Access Products"
              sub="Beyond the facade line: balustrades, gates, canopies and door systems, fabricated in the same workshop and installed by the same crews."
            />
          </Reveal>

          <div className="mt-12 grid gap-x-12 md:grid-cols-2">
            {metalwork.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 70}>
                <article className="border-t border-steel-200 py-6">
                  <h3
                    id={serviceSlug(s.title)}
                    className="font-display text-xl font-bold uppercase tracking-tight text-navy-950"
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[54ch] text-sm leading-relaxed">{s.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
