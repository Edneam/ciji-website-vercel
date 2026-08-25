import { Link } from 'react-router-dom'
import { CheckCircle2, Target, Eye, Gem } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import StatsStrip from '../components/StatsStrip.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'

const gallery = [
  ...Array.from({ length: 8 }, (_, i) => `/images/gallery/tower-${i + 1}.jpeg`),
  ...Array.from({ length: 4 }, (_, i) => `/images/gallery/tower-hi-${i + 1}.jpeg`),
]

export default function About() {
  return (
    <>
      <PageHeader title="About Us" crumb="About Us" image="/images/projects/jvt-residential.jpg" />

      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeading kicker="All About Us" title="A Decade of Aluminium & Glass Excellence" align="left" />
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-6 space-y-4 leading-relaxed">
                <p>
                  We are pleased to introduce ourselves as <strong>C.J Group of Companies</strong>,
                  comprising <strong>Ciji Bldg. Metalic Const. Ind. LLC</strong> &amp;{' '}
                  <strong>C.J Tec Contracting LLC</strong>, having over a decade of experience in
                  the construction industry in the U.A.E.
                </p>
                <p>
                  We are specialized in aluminium and glass fabrication work with technically
                  qualified experts, well experienced in the field. Our range of activities include
                  design, fabrication and installation of structural glazing and curtain walling
                  for high-rise buildings, skylights, glass partitions, automatic doors, aluminium
                  and stainless steel claddings, doors, windows, gates and more.
                </p>
                <p>
                  We offer full solutions for building &amp; infrastructural projects with
                  exceptional quality at competitive pricing. Our primary focus is to provide
                  exceptional customer service by improving your project value with a high
                  benefits-to-cost ratio.
                </p>
                <p>
                  It is our pride to declare that we are one of the most competitive construction
                  groups in the region in terms of technology, quality, commercials and
                  performance. We assure you of our best efforts and professional approach to
                  business enquiries and awarded projects alike.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={150} className="relative pb-8 pr-4 md:pr-8">
            <span className="absolute -right-3 -top-3 hidden h-full w-full border-4 border-gold-400 md:block" />
            <img
              src="/images/projects/pivot-building.jpg"
              alt="CIJI project building"
              className="relative w-full object-cover shadow-xl"
            />
          </Reveal>
        </div>
      </section>

      {/* mission / vision / values */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading kicker="Our Foundation" title="Mission, Vision & Values" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To deliver exceptional customer service by improving project value through high-class design, fabrication and process management.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'To remain one of the most competitive construction groups in the region in technology, quality, commercials and performance.',
              },
              {
                icon: Gem,
                title: 'Our Values',
                desc: 'Full compliance with regional standards, rules and regulations — with honesty, safety and craftsmanship in everything we build.',
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div className="card-lift h-full border-t-4 border-gold-500 bg-white p-8 text-center shadow-sm">
                  <c.icon size={32} className="mx-auto text-navy-900" />
                  <h3 className="font-display mt-4 text-xl font-bold text-navy-900">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* why us checklist */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="img-zoom order-last lg:order-first">
            <img
              src="/images/projects/titan-building.jpg"
              alt="Titan building façade"
              loading="lazy"
              className="w-full object-cover shadow-xl"
            />
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading kicker="Why Choose Us" title="Resources, Knowledge & Unmatched Expertise" align="left" />
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-6 space-y-4">
                {[
                  'Undertake a wide range of projects in all types of locations',
                  'Fully conversant with regional construction regulations and labour laws',
                  'Proven track record with government agencies and private developers',
                  'Technically qualified experts with deep field experience',
                  'Competitive pricing with high benefits-to-cost ratio',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-gold-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220}>
              <Link
                to="/contact"
                className="mt-8 inline-block bg-navy-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-gold-500 hover:text-navy-950"
              >
                Work With Us
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              kicker="Project Gallery"
              title="Our Work Across the UAE"
              sub="Towers, residences and commercial façades delivered by our teams."
            />
          </Reveal>
          <div className="mt-14 columns-2 gap-4 md:columns-3 lg:columns-4 [&>div]:mb-4">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 70} className="img-zoom block break-inside-avoid">
                <img src={src} alt="CIJI project" loading="lazy" className="w-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
