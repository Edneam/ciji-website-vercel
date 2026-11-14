import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ReferenceList from '../components/ReferenceList.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import { earlierProjects, imageSlug, projects } from '../data/projects.js'

const categories = ['All', 'Residential', 'Commercial', 'Industrial']
const headerImage = projects[0]?.image || '/images/projects/ohana-building.jpg'

const FILTER_COPY = {
  All: {
    title: 'Facade Projects in Dubai & Sharjah | CIJI',
    description:
      'Aluminium and glass facade projects by CIJI in Dubai, Sharjah and Abu Dhabi, from residential towers to commercial buildings and industrial facilities.',
  },
  Residential: {
    title: 'Residential Facade Projects in the UAE | CIJI',
    description:
      'Residential aluminium and glass facades by CIJI in Dubai and Sharjah, including towers and apartment buildings fabricated and installed in-house.',
  },
  Commercial: {
    title: 'Commercial Facade Projects in the UAE | CIJI',
    description:
      'Commercial curtain walling and structural glazing by CIJI on offices, towers and mixed-use buildings across Dubai and Sharjah.',
  },
  Industrial: {
    title: 'Industrial Facade Projects in the UAE | CIJI',
    description:
      'Industrial aluminium and glass facade packages by CIJI for warehouses, cold stores and facilities in Dubai, including Jebel Ali.',
  },
}

function framesOf(project) {
  if (project.images?.length) return project.images
  return [{ src: project.image, width: project.width, height: project.height }]
}

function toShots(list) {
  return list.flatMap((project) => {
    const frames = framesOf(project)
    return frames.map((frame, index) => ({
      image: frame.src,
      title: project.title,
      category: project.category,
      location: project.location,
      contractor: project.contractor,
      width: frame.width,
      height: frame.height,
      alt:
        frames.length > 1
          ? `${project.title}, photograph ${index + 1} of ${frames.length}, ${project.category.toLowerCase()} facade project in ${project.location}`
          : `${project.title}, ${project.category.toLowerCase()} facade project in ${project.location}`,
    }))
  })
}

/* Batch sizes.
 *
 * The recent grid opens with a card that spans two columns, so 5 tiles close
 * two rows exactly (2 + 3) at both 2 and 3 columns. The plain grid has no
 * spanning card, so it needs 6 to close whole rows at 2 and 3 columns.
 *
 * These are only the starting numbers: `tileSpans` below absorbs any leftover
 * cells in the final row, so a filtered count that does not divide evenly
 * (e.g. 10 residential projects in a 3-column grid) still ends flush. */
const RECENT_INITIAL = 5
const PLAIN_INITIAL = 6
const STEP = 5

/** Column count of the project grids, kept in step with the Tailwind
 *  breakpoints (1 column by default, 2 from `sm`, 3 from `lg`). */
function useColumns() {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const sm = window.matchMedia('(min-width: 640px)')
    const lg = window.matchMedia('(min-width: 1024px)')
    const update = () => setColumns(lg.matches ? 3 : sm.matches ? 2 : 1)
    update()
    sm.addEventListener('change', update)
    lg.addEventListener('change', update)
    return () => {
      sm.removeEventListener('change', update)
      lg.removeEventListener('change', update)
    }
  }, [])

  return columns
}

/** How many columns each tile should span so the grid never ends with empty
 *  cells. Everything takes one column except the lead (which spans two), and
 *  the final tile grows to swallow whatever is left over in the last row. */
function tileSpans(count, columns, leadSpan) {
  if (count === 0) return []

  const lead = Math.min(leadSpan, columns)
  const cells = lead + (count - 1)
  const remainder = cells % columns
  const hole = remainder === 0 ? 0 : columns - remainder

  const spans = Array.from({ length: count }, (_, i) => (i === 0 ? lead : 1))
  if (hole === 0) return spans

  const last = count - 1
  spans[last] = Math.min(columns, spans[last] + hole)
  return spans
}

function visibleCount(total, requested, photoIndex) {
  const floor = photoIndex >= 0 ? photoIndex + 1 : 0
  return Math.min(total, Math.max(requested, floor))
}

function scrollToEarlier() {
  const node = document.getElementById('earlier')
  if (!node) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

function ProjectGrid({ id, items, featuredFirst, onOpen }) {
  const columns = useColumns()
  const spans = tileSpans(items.length, columns, featuredFirst ? 2 : 1)

  return (
    <div id={id} className="project-grid mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project, i) => {
        const lead = featuredFirst && i === 0
        const count = project.images?.length || 1
        return (
          <Reveal
            key={`${project.title}-${project.location}`}
            delay={(i % 3) * 70}
            style={{ '--tile-span': spans[i] }}
            className="project-tile"
          >
            {/* A real <button>, not a div with an onClick. It has to be
                keyboard reachable and announce itself, because opening a
                fullscreen dialog is the card's whole purpose. `text-left`
                undoes the button element's centring. */}
            <button
              type="button"
              onClick={() => onOpen(project.image)}
              aria-label={
                count > 1
                  ? `View ${project.title} full screen, ${count} photographs`
                  : `View ${project.title} full screen`
              }
              className="shot img-zoom group relative block h-full w-full text-left"
            >
              {/* At `sm` and up the tile is a fixed-height cell (see
                  `.project-grid`), so the image is taken out of flow and made
                  to fill it. That is what lets the last tile span two or three
                  columns and crop wider without growing taller than its
                  neighbours and opening a gap beneath them. */}
              <img
                src={project.image}
                alt={`${project.title}, ${project.category.toLowerCase()} facade project in ${project.location}`}
                loading={lead ? 'eager' : 'lazy'}
                width={project.width}
                height={project.height}
                className="aspect-[4/3] w-full object-cover sm:absolute sm:inset-0 sm:h-full sm:aspect-auto"
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
                  {project.category}
                </p>
                <h3
                  className={`font-display mt-1.5 font-bold leading-tight text-white ${
                    lead ? 'text-2xl' : 'text-lg'
                  }`}
                >
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-steel-300">{project.location}</p>
                {count > 1 ? (
                  <p className="mt-1 text-xs text-steel-400">{count} photographs</p>
                ) : null}
                {project.contractor ? (
                  <p className="mt-2 border-t border-white/15 pt-2 text-xs text-steel-400">
                    Main contractor: {project.contractor}
                  </p>
                ) : null}
              </div>
            </button>
          </Reveal>
        )
      })}
    </div>
  )
}

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const requested = (params.get('type') || '').toLowerCase()
  const filter = categories.find((c) => c.toLowerCase() === requested) || 'All'
  const [recentCount, setRecentCount] = useState(RECENT_INITIAL)
  const [earlierCount, setEarlierCount] = useState(PLAIN_INITIAL)
  const [seenFilter, setSeenFilter] = useState(filter)
  const pendingFocus = useRef(null)
  const photo = params.get('photo')
  const inFilter = (project) => filter === 'All' || project.category === filter
  const visible = projects.filter(inFilter)
  const earlierVisible = earlierProjects.filter(inFilter)
  const catalogue = [...projects, ...earlierProjects]

  const containsPhoto = (project) =>
    Boolean(photo) && framesOf(project).some((frame) => imageSlug(frame.src) === photo)
  const photoRecentIndex = photo ? visible.findIndex(containsPhoto) : -1
  const photoEarlierIndex = photo ? earlierVisible.findIndex(containsPhoto) : -1
  const recentShownCount = visibleCount(visible.length, recentCount, photoRecentIndex)
  const earlierShownCount = visibleCount(earlierVisible.length, earlierCount, photoEarlierIndex)
  const shownRecent = visible.slice(0, recentShownCount)
  const shownEarlier = earlierVisible.slice(0, earlierShownCount)
  const recentRemaining = visible.length - shownRecent.length
  const earlierRemaining = earlierVisible.length - shownEarlier.length

  const shots = toShots([...shownRecent, ...shownEarlier])
  const photoKnown = Boolean(photo) && toShots([...visible, ...earlierVisible]).some(
    (item) => imageSlug(item.image) === photo,
  )

  const shotIndex = photo ? shots.findIndex((item) => imageSlug(item.image) === photo) : -1
  const shot = shotIndex >= 0 ? shotIndex : null

  if (seenFilter !== filter) {
    setSeenFilter(filter)
    setRecentCount(RECENT_INITIAL)
    setEarlierCount(PLAIN_INITIAL)
  }

  useEffect(() => {
    const next = new URLSearchParams(params)
    let changed = false
    if (params.get('type') && filter === 'All') {
      next.delete('type')
      changed = true
    }
    if (photo && !photoKnown) {
      next.delete('photo')
      changed = true
    }
    if (changed) setParams(next, { replace: true })
  }, [filter, photo, photoKnown, params, setParams])

  useEffect(() => {
    const pending = pendingFocus.current
    if (!pending) return
    pendingFocus.current = null
    document.querySelectorAll(`#${pending.id} .shot`)[pending.index]?.focus()
  }, [recentShownCount, earlierShownCount])

  const setPhoto = (image) => {
    const next = new URLSearchParams(params)
    if (image) next.set('photo', imageSlug(image))
    else next.delete('photo')
    setParams(next, { replace: true })
  }

  const revealMore = (id, shownLength, setCount) => {
    pendingFocus.current = { id, index: shownLength }
    setCount(shownLength + STEP)
  }

  const step = (n) => {
    if (shot === null || shots.length === 0) return
    const i = (shot + n + shots.length) % shots.length
    setPhoto(shots[i].image)
  }

  const counts = categories.reduce((acc, c) => {
    acc[c] = c === 'All' ? catalogue.length : catalogue.filter((p) => p.category === c).length
    return acc
  }, {})

  const copy = FILTER_COPY[filter]
  // Faceted views (?type=) are the same document with a subset of the grid.
  // They stay useful for visitors, but they consolidate to /projects so the
  // canonical in the prerendered HTML and the sitemap agree instead of
  // competing with the full catalogue.
  const canonicalPath = '/projects'
  const listed = [...visible, ...earlierVisible]
  const projectsSchema = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cijiintl.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `https://cijiintl.com${canonicalPath}`,
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: copy.title,
      itemListElement: listed.map((p, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: p.title,
        description: `${p.category} facade project in ${p.location}`,
        image: `https://cijiintl.com${p.image}`,
      })),
    },
  ]

  return (
    <>
      <Seo
        title={copy.title}
        description={copy.description}
        path={canonicalPath}
        lcpImage={headerImage}
        pageType="CollectionPage"
        robots={
          shot !== null ? 'noindex, follow' : 'index, follow, max-image-preview:large'
        }
        schema={projectsSchema}
      />
      <PageHeader
        title="Delivered projects"
        crumb="Projects"
        lead="Recent finished elevations, with earlier projects listed below."
        image={headerImage}
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
                <Link
                  key={c}
                  to={c === 'All' ? '/projects' : `/projects?type=${c.toLowerCase()}`}
                  aria-current={filter === c ? 'true' : undefined}
                  className={`press flex min-h-11 items-center gap-2 px-4 font-mono text-[13.5px] font-medium uppercase tracking-[0.12em] ${
                    filter === c
                      ? 'bg-navy-950 text-white'
                      : 'text-steel-500 hover:bg-steel-100 hover:text-navy-950'
                  }`}
                >
                  {c}
                  <span className="sr-only">, {counts[c]} projects</span>
                  <span
                    className={filter === c ? 'text-gold-400' : 'text-steel-500'}
                    aria-hidden="true"
                  >
                    {counts[c]}
                  </span>
                </Link>
              ))}
              {earlierVisible.length > 0 ? (
                <button
                  type="button"
                  onClick={scrollToEarlier}
                  className="ml-auto px-4 py-2 font-mono text-[13.5px] font-medium uppercase tracking-[0.12em] text-steel-500 hover:text-navy-950"
                >
                  Earlier projects
                </button>
              ) : null}
            </div>
          </Reveal>

          <p aria-live="polite" className="sr-only">
            Showing {shownRecent.length} of {visible.length} recent{' '}
            {filter === 'All' ? '' : `${filter.toLowerCase()} `}projects.
            {earlierVisible.length > 0
              ? ` Showing ${shownEarlier.length} of ${earlierVisible.length} earlier projects.`
              : ''}
          </p>

          {visible.length === 0 ? (
            <p className="mt-10 text-steel-500">
              {earlierVisible.length > 0
                ? 'No recent projects are listed in this category.'
                : 'No projects are listed in this category yet.'}
            </p>
          ) : (
            <ProjectGrid id="recent-grid" items={shownRecent} featuredFirst onOpen={setPhoto} />
          )}

          {recentRemaining > 0 ? (
            <button
              type="button"
              onClick={() => revealMore('recent-grid', shownRecent.length, setRecentCount)}
              className="btn btn-outline-dark mt-10"
            >
              Show {Math.min(STEP, recentRemaining)} more
            </button>
          ) : null}
        </div>
      </section>

      {earlierVisible.length > 0 ? (
        <section id="earlier" className="scroll-mt-28 border-t border-steel-200 py-16 md:py-20">
          <div className="container-x">
            <Reveal>
              <SectionHeading
                title="Earlier projects"
                sub={`${earlierVisible.length} elevations from the previous catalogue.`}
              />
            </Reveal>
            <ProjectGrid id="earlier-grid" items={shownEarlier} featuredFirst={false} onOpen={setPhoto} />
            {earlierRemaining > 0 ? (
              <button
                type="button"
                onClick={() => revealMore('earlier-grid', shownEarlier.length, setEarlierCount)}
                className="btn btn-outline-dark mt-10"
              >
                Show {Math.min(STEP, earlierRemaining)} more
              </button>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ---- Flagship references as a data table: different layout family,
              and the right component for tabular contractor data. ---- */}
      <section className="border-t border-steel-200 bg-steel-50 py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              title="Delivered under International Main Contractors"
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
        onClose={() => setPhoto(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  )
}
