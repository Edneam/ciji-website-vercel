import { Link } from 'react-router-dom'
import { CaretRight } from '@phosphor-icons/react'

// Page masthead. Breadcrumb is a real <nav> with links (was a decorative
// gold kicker string with a non-navigable "Home /" prefix).
export default function PageHeader({ title, crumb, image, lead }) {
  return (
    <section className="relative flex min-h-[22rem] items-end overflow-hidden bg-navy-950 pt-[calc(var(--nav-offset)+1.5rem)]">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        width="1920"
        height="600"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
      <div className="container-x relative grid gap-6 pb-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-steel-300">
              <li>
                <Link to="/" className="link-slide">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-steel-500">
                <CaretRight size={11} weight="bold" />
              </li>
              <li aria-current="page" className="text-gold-500">
                {crumb || title}
              </li>
            </ol>
          </nav>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] text-white md:text-5xl">
            {title}
          </h1>
        </div>
        {lead ? (
          <p className="max-w-md text-steel-300 lg:border-l lg:border-white/15 lg:pl-8">
            {lead}
          </p>
        ) : null}
      </div>
    </section>
  )
}
