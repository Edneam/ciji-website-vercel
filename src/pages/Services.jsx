import PageHeader from '../components/PageHeader.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { services } from '../data/services.js'

export default function Services() {
  return (
    <>
      <PageHeader title="Our Services" crumb="Services" image="/images/projects/dubai-walls.jpg" />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              kicker="What We Do"
              title="Design • Fabrication • Installation"
              sub="From structural glazing on high-rises to automatic doors at street level — full aluminium and glass solutions under one roof."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 90}>
                <div className="card-lift group relative h-full border border-slate-200 border-t-4 border-t-navy-900 bg-white p-7 shadow-sm hover:border-t-gold-500">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center bg-navy-900 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                      <ServiceIcon index={i} size={24} />
                    </div>
                    <span className="font-display text-5xl font-extrabold text-slate-100 transition-colors duration-300 group-hover:text-gold-400/40">
                      {String(i + 1).padStart(2, '0')}
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

      <CtaBand />
    </>
  )
}
