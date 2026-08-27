import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import { projects } from '../data/projects.js'

const categories = ['All', 'Residential', 'Commercial', 'Industrial']

const projectsSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cijialuminium.com/' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://cijialuminium.com/projects' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CIJI Delivered Projects Portfolio',
    itemListElement: projects.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: p.title,
      description: `${p.category} project located in ${p.location}`,
    })),
  },
]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <Seo
        title="Projects Portfolio | Aluminium & Glass Façade Contracting UAE"
        description="Explore delivered aluminium and glass construction projects by Ciji Bldg. Metalic Const. Ind. LLC: residential towers, commercial buildings, industrial facilities, and airports in Dubai, Sharjah, and Abu Dhabi."
        path="/projects"
        schema={projectsSchema}
      />
      <PageHeader title="Our Projects" crumb="Projects" image="/images/projects/ohana-building.jpg" />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              kicker="Great & Awesome Works"
              title="Projects We've Delivered"
              sub="245+ projects across the UAE and beyond — a selection shown here."
            />
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors duration-300 ${
                  filter === c
                    ? 'bg-navy-900 text-white'
                    : 'border border-slate-300 text-navy-900 hover:border-gold-500 hover:text-gold-500'
                }`}
              >
                {c}
              </button>
            ))}
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <div className="group relative overflow-hidden">
                  <div className="img-zoom">
                    <img
                      src={p.image}
                      alt={`${p.title} - ${p.category} project in ${p.location}`}
                      loading="lazy"
                      width="600"
                      height="450"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-400">
                      {p.category}
                    </p>
                    <h3 className="font-display mt-1 text-lg font-bold text-white">{p.title}</h3>
                    {p.mainContractor || p.contractor ? (
                      <p className="mt-1 text-sm text-slate-300">
                        Main Contractor: {p.mainContractor || p.contractor}
                      </p>
                    ) : null}
                    <p className="text-sm text-slate-300">{p.location}</p>
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
