import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Pause, Play } from '@phosphor-icons/react'
import Reveal from '../components/Reveal.jsx'
import StatsStrip from '../components/StatsStrip.jsx'
import CtaBand from '../components/CtaBand.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ReferenceList from '../components/ReferenceList.jsx'
import Seo from '../components/Seo.jsx'
import { company } from '../data/site.js'
import { earlierProjects, imageSlug, projects } from '../data/projects.js'

const covers = [
  { src: '/images/cover-1.jpg', width: 1920, height: 1329 },
  { src: '/images/cover-2.jpg', width: 1920, height: 1309 },
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

export default function Home() {
  const showcase = projects.length ? projects : earlierProjects
  const featuredProjects = showcase.slice(0, 3)
  const [cover, setCover] = useState(0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (motion.matches) setHeld(true)
    }
    apply()
    motion.addEventListener('change', apply)
    return () => motion.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (held) return undefined
    const id = window.setInterval(() => {
      setCover((current) => (current + 1) % covers.length)
    }, 20000)
    return () => window.clearInterval(id)
  }, [held])

  return (
    <>
      <Seo
        title="Aluminium & Glass Facade Contractor UAE | CIJI"
        description="Aluminium and glass facade contractor in Sharjah and Dubai. Structural glazing, curtain walling, spider glazing, skylights and cladding, fabricated in-house."
        path="/"
        lcpImage="/images/cover-1.jpg"
        ogImage="/images/cover-1.jpg"
        ogImageWidth={1920}
        ogImageHeight={1329}
      />

      {/* ---- Hero: left-aligned, 4 text elements max ---- */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-950">
        {covers.map((item, index) => (
          <img
            key={item.src}
            src={item.src}
            alt=""
            aria-hidden="true"
            width={item.width}
            height={item.height}
            fetchPriority={index === 0 ? 'high' : 'low'}
            decoding="async"
            className={`hero-still absolute inset-0 h-full w-full object-cover ${
              index === cover ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Directional scrim: heavier at the left where the type sits, so the
            glass reflections stay legible on the right. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/60 to-navy-950/25" />

        <div className="container-x relative pt-[calc(var(--nav-offset)+2.5rem)] pb-20">
          <div className="max-w-3xl">
            <Reveal>
              {/* No kicker above the h1. The company name belongs in the
                  supporting line and the footer, not as a tracked label
                  diluting the headline. */}
              <h1 className="font-display text-[2.35rem] font-bold uppercase leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
                Aluminium and Glass Facades, Engineered and Installed
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-200">
                A UAE facade contractor fabricating and installing curtain walling, structural
                glazing and cladding in-house.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link to="/contact" className="btn btn-primary w-full sm:w-auto">
                  Request a Quote <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </Link>
                <Link to="/projects" className="btn btn-outline w-full sm:w-auto">
                  See Delivered Projects
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        <button
          type="button"
          className="hero-video-toggle absolute right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-10 inline-flex h-11 w-11 items-center justify-center border border-white/55 text-white hover:border-gold-500 hover:text-gold-500 sm:right-8"
          aria-pressed={held}
          aria-label={held ? 'Play background' : 'Pause background'}
          onClick={() => setHeld((value) => !value)}
        >
          {held ? (
            <Play size={16} weight="fill" aria-hidden="true" />
          ) : (
            <Pause size={16} weight="fill" aria-hidden="true" />
          )}
        </button>
      </section>

      {/* ---- Layout family 2: asymmetric split, image bleeds off the grid ---- */}
      <section className="py-24 lg:py-32">
        <div className="container-x grid items-start gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal className="img-zoom lg:-mt-4">
            <img
              src="/images/finished/oud-metha-residential-2.jpg"
              alt="Glass and aluminium facade of the G+2P+11 residential building in Oud Metha, Dubai"
              width="1920"
              height="1280"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-[center_42%]"
            />
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading title="A Specialist Facade Subcontractor, Not a General Trade" />
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-7 space-y-5 leading-relaxed">
                <p>
                  <strong className="font-semibold text-navy-950" translate="no">
                    {company.group}
                  </strong>{' '}
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
                    <Check size={18} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-gold-700" />
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
                More about the Company <ArrowRight size={15} weight="bold" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-steel-200 bg-steel-50 py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <Reveal>
              <SectionHeading
                title="Recent projects"
                sub="Three elevations from the latest finished set."
              />
            </Reveal>
            <Reveal>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy-950 hover:text-gold-700"
              >
                All projects
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-[1.45fr_1fr] lg:grid-rows-2">
            {featuredProjects.map((project, i) => {
              const lead = i === 0
              return (
                <Reveal
                  key={project.title}
                  delay={i * 80}
                  className={
                    lead
                      ? 'h-full min-h-0 lg:col-start-1 lg:row-span-2 lg:row-start-1'
                      : i === 1
                        ? 'lg:col-start-2 lg:row-start-1'
                        : 'lg:col-start-2 lg:row-start-2'
                  }
                >
                  <Link
                    to={`/projects?photo=${imageSlug(project.image)}`}
                    className="group img-zoom relative block h-full"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title}, ${project.category.toLowerCase()} project in ${project.location}`}
                      width={project.width}
                      height={project.height}
                      loading="lazy"
                      className={`w-full object-cover ${
                        lead
                          ? 'aspect-[4/3] lg:absolute lg:inset-0 lg:h-full lg:aspect-auto'
                          : 'aspect-[16/10]'
                      }`}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="spec-label text-gold-400">{project.category}</p>
                      <h3
                        className={`font-display mt-2 font-bold leading-tight text-white ${
                          lead ? 'text-2xl sm:text-3xl' : 'text-xl'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-1 font-mono text-sm text-steel-300">{project.location}</p>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* ---- Layout family 5: real data table for tabular reference data ---- */}
      <section className="border-t border-steel-200 bg-steel-50 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              title="Flagship References"
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
            <SectionHeading title="Why Main Contractors Appoint Us" />
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
