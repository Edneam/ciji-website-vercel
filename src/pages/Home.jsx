import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import StatsStrip from '../components/StatsStrip.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { services } from '../data/services.js'
import { projects, featured } from '../data/projects.js'

const highlights = [
  { icon: Building2Icon, title: 'High-Rise Expertise', desc: 'Curtain walling and structural glazing for towers across the UAE.' },
  { icon: RulerIcon, title: 'In-House Design & Fabrication', desc: 'Full control over quality, customization and project timelines.' },
  { icon: FactoryIcon, title: 'Proven Track Record', desc: 'Trusted by government agencies and leading main contractors.' },
]
function Building2Icon(props) { return <ServiceIcon index={0} size={26} {...props} /> }
function FactoryIcon(props) { return <ServiceIcon index={4} size={26} {...props} /> }
function RulerIcon(props) { return <ServiceIcon index={7} size={26} {...props} /> }

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[85vh] min-h-[560px] items-center overflow-hidden bg-navy-950">
        <img
          src="/images/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-navy-950/45" />
        <div className="container-x relative py-28">
          <Reveal>
            <p className="flex items-center gap-4 text-base text-white">
              <span className="h-[2px] w-12 bg-white" />
              C.J Group of Companies
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display mt-5 max-w-4xl text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white md:text-5xl">
              Engineered Aluminium Solutions: Built by CIJI
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-2xl text-xl text-slate-100">
              Your trusted partner for high-performance aluminium &amp; glass solutions.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <Link
              to="/contact"
              className="mt-9 inline-block bg-gold-500 px-8 py-3.5 text-base font-semibold text-navy-950 transition-colors duration-300 hover:bg-gold-400"
            >
              Get In Touch
            </Link>
          </Reveal>
        </div>
      </section>

      {/* About preview */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative pb-10 pr-4 md:pb-14 md:pr-10">
            <span className="absolute -left-3 -top-3 hidden h-full w-full border-4 border-gold-400 md:block" />
            <img
              src="/images/projects/satwa-g8.jpg"
              alt="G+8 residential building, Satwa"
              className="relative w-full object-cover shadow-xl"
            />
            <img
              src="/images/projects/mag-building.jpg"
              alt="Façade detail"
              className="absolute -bottom-0 right-0 hidden w-1/2 border-8 border-white object-cover shadow-xl md:block"
            />
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading kicker="Who We Are" title="C.J Group of Companies" align="left" />
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 leading-relaxed">
                We are pleased to introduce ourselves as <strong>C.J Group of Companies</strong>,
                comprising <strong>Ciji Bldg. Metalic Const. Ind. LLC</strong> &amp;{' '}
                <strong>C.J Tec Contracting LLC</strong> — having over a decade of experience in
                the UAE construction industry, specialized in aluminium and glass fabrication work
                with technically qualified, field-experienced experts.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-6 space-y-3">
                {[
                  'Design, fabrication & installation of structural glazing and curtain walling',
                  'Fully conversant with regional construction regulations and labour laws',
                  'Proven record with government agencies and building & infrastructure clients',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-gold-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={280}>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-gold-500 hover:text-navy-950"
              >
                More About Us <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              kicker="Our Services"
              title="What We Do"
              sub="Our range of activities covers design, fabrication and installation across the full aluminium and glass spectrum."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 100}>
                <div className="card-lift group h-full border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center bg-navy-900 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                    <ServiceIcon index={i} size={24} />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-2 border-navy-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-navy-900 transition-colors duration-300 hover:bg-navy-900 hover:text-white"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <StatsStrip />

      {/* Featured projects */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              kicker="Great & Awesome Works"
              title="Featured Projects"
              sub="A selection from 245+ delivered projects across residential, commercial and industrial sectors."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 100}>
                <Link to="/projects" className="group relative block overflow-hidden">
                  <div className="img-zoom">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-400">
                      {p.category}
                    </p>
                    <h3 className="font-display mt-1 text-lg font-bold text-white">{p.title}</h3>
                    <p className="text-sm text-slate-300">{p.location}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* flagship references */}
          <div className="mt-20">
            <Reveal>
              <h3 className="font-display text-center text-2xl font-bold text-navy-900">
                Flagship References
              </h3>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 80}>
                  <div className="card-lift h-full border-l-4 border-gold-500 bg-slate-50 p-5">
                    <h4 className="font-display font-bold text-navy-900">{f.title}</h4>
                    <p className="mt-1 text-sm text-slate-500">Main Contractor: {f.mainContractor}</p>
                    <p className="text-sm text-slate-500">{f.location}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-gold-500 hover:text-navy-950"
            >
              All Projects <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-navy-900 py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              kicker="Why Choose Us"
              title="Technology, Quality, Commercials & Performance"
              align="left"
            />
            <p className="mt-5 leading-relaxed text-slate-300">
              It is our pride to declare that we are one of the most competitive construction
              groups in the region. We deliver through high-class design &amp; architectural
              solutions and process management, in compliance with the standards, rules and
              regulations prevailing in the region.
            </p>
          </Reveal>
          <div className="space-y-4">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 100}>
                <div className="flex items-start gap-5 border border-white/10 bg-navy-800 p-6 transition-colors duration-300 hover:border-gold-500/40">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold-500 text-navy-950">
                    <h.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{h.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{h.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
