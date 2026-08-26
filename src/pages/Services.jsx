import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { services } from '../data/services.js'

const featured = [
  {
    ...services[0],
    image: '/images/projects/ic3-tower.jpg',
    points: [
      'System design and thermal performance engineering',
      'In-house fabrication of mullions, transoms and panels',
      'Site installation, sealing and quality testing',
    ],
  },
  {
    ...services[1],
    image: '/images/projects/pantheon.jpg',
    points: [
      'Point-fixed spider fitting systems',
      'Glass fin and steel support structures',
      'Tension rods and cable truss façades',
    ],
  },
  {
    ...services[2],
    image: '/images/projects/enviroserve.jpg',
    points: [
      'Aluminium-framed skylight systems',
      'Steel-structure skylights for large spans',
      'Weather-tight, thermally efficient glazing',
    ],
  },
  {
    ...services[3],
    image: '/images/projects/warehouse-large.jpg',
    points: [
      'Long-span aluminium and steel structures',
      'Roof and atrium feature architecture',
      'Lightweight modular assembly',
    ],
  },
  {
    ...services[4],
    image: '/images/projects/titan-building.jpg',
    points: [
      'ACP cladding systems',
      'Precision-fabricated aluminium panels',
      'Exterior envelopes and architectural features',
    ],
  },
  {
    ...services[5],
    image: '/images/projects/mag-building.jpg',
    points: [
      'Frameless glass partition systems',
      'Framed partition systems for offices',
      'Light-filled, contemporary interiors',
    ],
  },
]

const more = services.slice(6)

const related = [
  { label: 'Our Projects', to: '/projects', image: '/images/projects/ohana-building.jpg' },
  { label: 'About Us', to: '/about', image: '/images/projects/jvt-residential.jpg' },
  { label: 'Get a Quote', to: '/contact', image: '/images/projects/umm-al-shaif.jpg' },
]

export default function Services() {
  return (
    <>
      <PageHeader title="Our Services" crumb="Services" image="/images/projects/dubai-walls.jpg" />

      {/* intro */}
      <section className="py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              kicker="What We Do"
              title="Our Services"
              sub="Ciji Bldg. Metalic Const. Ind. LLC offers a comprehensive range of aluminium and glass services to meet your project needs — from initial concept to final installation. Our experienced team is dedicated to exceptional service and complete satisfaction."
            />
          </Reveal>
        </div>
      </section>

      {/* featured services — alternating sections */}
      {featured.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <section key={s.title} className={i % 2 === 1 ? 'bg-slate-50 py-16 md:py-24' : 'py-16 md:py-24'}>
            <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={flip ? 'lg:order-2' : ''}>
                <div className="relative">
                  <span
                    className={`absolute -top-4 hidden h-full w-full border-4 border-gold-400 md:block ${
                      flip ? '-right-4' : '-left-4'
                    }`}
                  />
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="img-zoom relative aspect-[4/3] w-full object-cover shadow-xl"
                  />
                </div>
              </Reveal>
              <Reveal delay={120} className={flip ? 'lg:order-1' : ''}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-6xl font-extrabold leading-none text-gold-500/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy-900 md:text-3xl">
                    {s.title}
                  </h2>
                </div>
                <p className="mt-5 leading-relaxed">{s.desc}</p>
                <ol className="mt-6 space-y-2.5 text-sm marker:font-bold marker:text-gold-600 list-decimal pl-5">
                  {s.points.map((pt) => (
                    <li key={pt} className="pl-1">{pt}</li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </section>
        )
      })}

      {/* remaining services */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              kicker="Complete Solutions"
              title="More Of What We Build"
              sub="Beyond the façade — a full range of aluminium and steel products, all fabricated and installed by our own teams."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 90}>
                <div className="card-lift group relative h-full border border-slate-200 border-t-4 border-t-navy-900 bg-white p-7 shadow-sm hover:border-t-gold-500">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center bg-navy-900 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                      <ServiceIcon index={i + 6} size={24} />
                    </div>
                    <span className="font-display text-5xl font-extrabold text-slate-100 transition-colors duration-300 group-hover:text-gold-400/40">
                      {String(i + 7).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* related links */}
      <section className="py-20 md:py-24">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {related.map((r, i) => (
            <Reveal key={r.label} delay={i * 100}>
              <Link to={r.to} className="group relative block overflow-hidden">
                <img
                  src={r.image}
                  alt={r.label}
                  loading="lazy"
                  className="img-zoom aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-navy-950/20 transition-colors duration-300 group-hover:bg-navy-950/35" />
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-navy-900 shadow-lg transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                  {r.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
