import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ReferenceList from '../components/ReferenceList.jsx'
import Lightbox from '../components/Lightbox.jsx'
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
    name: 'Delivered aluminium and glass facade projects',
    itemListElement: projects.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: p.title,
      description: `${p.category} project in ${p.location}`,
    })),
  },
]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [shot, setShot] = useState(null)
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  /* The viewer walks the FILTERED set, so its 03/12 counter and its arrow keys
     match what the visitor can actually see on the page. Changing the filter
     therefore has to close it: the index would otherwise point into a
     different, shorter array and land on the wrong photograph. */
  const changeFilter = (c) => {
    setShot(null)
    setFilter(c)
  }

  const shots = visible.map((p) => ({
    image: p.image,
    title: p.title,
    category: p.category,
    location: p.location,
    contractor: p.contractor,
    alt: `${p.title}, ${p.category.toLowerCase()} facade project in ${p.location}`,
  }))

  const step = (n) => setShot((i) => (i === null ? i : (i + n + shots.length) % shots.length))

  const counts = categories.reduce((acc, c) => {
    acc[c] = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length
    return acc
  }, {})

  return (
    <>
      <Seo
        title="Projects | Aluminium & Glass Facade Contracting, Dubai and Sharjah"
        description="Delivered aluminium and glass facade projects by Ciji Bldg. Metalic Const. Ind. LLC: residential towers, commercial buildings and industrial facilities in Dubai, Sharjah and Abu Dhabi."
        path="/projects"
        schema={projectsSchema}
      />
      <PageHeader
        title="Delivered projects"
        crumb="Projects"
        lead="A selection of the elevations we have fabricated and installed, filterable by building type."
        image="/images/projects/ohana-building.jpg"
      />

      {/* ---- Filter bar with real counts, then a varied-scale grid.
              First item spans two columns so the grid is not six
              identical tiles. ---- */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 border-b border-steel-200 pb-5">
              <h2 className="spec-label mr-4">Filter</h2>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => changeFilter(c)}
                  aria-pressed={filter === c}
                  className={`press flex items-baseline gap-2 px-4 py-2 font-mono text-[13.5px] font-medium uppercase tracking-[0.12em] ${
                    filter === c
                      ? 'bg-navy-950 text-white'
                      : 'text-steel-500 hover:bg-steel-100 hover:text-navy-950'
                  }`}
                >
                  {c}
                  <span
                    className={filter === c ? 'text-gold-400' : 'text-steel-500'}
                    aria-hidden="true"
                  >
                    {counts[c]}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <p aria-live="polite" className="sr-only">
            Showing {visible.length} {filter === 'All' ? '' : filter.toLowerCase()} projects
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 3) * 70}
                className={i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                {/* A real <button>, not a div with an onClick. It has to be
                    keyboard reachable and announce itself, because opening a
                    fullscreen dialog is the card's whole purpose. `text-left`
                    undoes the button element's centring. */}
                <button
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`View ${p.title} full screen`}
                  className="shot img-zoom group relative block h-full w-full text-left"
                >
                  <img
                    src={p.image}
                    alt={`${p.title}, ${p.category.toLowerCase()} facade project in ${p.location}`}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    width={i === 0 ? '1200' : '600'}
                    height={i === 0 ? '800' : '450'}
                    className={`w-full object-cover ${
                      i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                    }`}
                  />
                  {/* The card labels sit on the photograph, so this scrim is
                      load-bearing, not decoration. Measured against the actual
                      images the weakest card was only 1.25:1 unscrimmed (a
                      bright daylight elevation), so the midpoint stop is held
                      at 60% rather than 25% to keep every caption clear of
                      4.5:1 regardless of which photo lands behind it. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/10"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-gold-400">
                      {p.category}
                    </p>
                    <h3
                      className={`font-display mt-1.5 font-bold leading-tight text-white ${
                        i === 0 ? 'text-2xl' : 'text-lg'
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-steel-300">{p.location}</p>
                    {p.contractor ? (
                      <p className="mt-2 border-t border-white/15 pt-2 text-xs text-steel-400">
                        Main contractor: {p.contractor}
                      </p>
                    ) : null}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Flagship references as a data table: different layout family,
              and the right component for tabular contractor data. ---- */}
      <section className="border-t border-steel-200 bg-steel-50 py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              title="Delivered under international main contractors"
              sub="Reference projects: facade and metalwork packages completed for government authorities and international contracting groups."
            />
          </Reveal>
          <div className="mt-10">
            <ReferenceList />
          </div>
        </div>
      </section>

      <CtaBand />

      <Lightbox
        items={shots}
        index={shot}
        onClose={() => setShot(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  )
}
