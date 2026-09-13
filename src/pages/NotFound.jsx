import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import Seo from '../components/Seo.jsx'
import { company } from '../data/site.js'

const routes = [
  { to: '/services', label: 'Services', desc: 'Twelve product lines across the building envelope.' },
  { to: '/projects', label: 'Projects', desc: 'Delivered residential, commercial and industrial work.' },
  { to: '/about', label: 'About us', desc: 'Who C.J Group of Companies is and how we work.' },
  { to: '/contact', label: 'Contact', desc: 'Request a priced facade package.' },
]

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="This page does not exist. Browse CIJI aluminium and glass facade services, delivered projects, or contact the Sharjah office."
        path="/404"
      />
      <section className="bg-navy-950 pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              {/* No eyebrow chip above the h1. A tracked-caps "Error 404"
                  label sitting as its own block above the heading is the
                  banned kicker pattern, and it also repeated what the heading
                  already says. The code is folded into the heading instead, so
                  it is still stated once and carries real weight. */}
              <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] md:text-5xl">
                404: this page does not exist
              </h1>
              <p className="mt-5 max-w-md leading-relaxed text-steel-300">
                The address may have changed or been typed incorrectly. The main sections of the
                site are listed here, or call the office directly.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  to="/"
                  className="btn btn-primary"
                >
                  Back to home <ArrowRight size={15} weight="bold" />
                </Link>
                <a
                  href={company.phoneHref}
                  className="link-slide font-mono text-sm font-medium text-white"
                >
                  {company.phone}
                </a>
              </div>
            </div>

            {/* Route list as hairline rows rather than a card grid. */}
            <nav aria-label="Main sections">
              <ul>
                {routes.map((r) => (
                  <li key={r.to} className="border-t border-white/12 last:border-b">
                    <Link
                      to={r.to}
                      className="group flex items-baseline justify-between gap-6 py-5 transition-colors hover:bg-white/[0.04]"
                    >
                      <span>
                        <span className="font-display block text-lg font-bold uppercase tracking-wide text-white transition-colors group-hover:text-gold-400">
                          {r.label}
                        </span>
                        <span className="mt-1 block text-sm text-steel-400">{r.desc}</span>
                      </span>
                      <ArrowRight
                        size={16}
                        weight="bold"
                        className="mt-1 shrink-0 text-steel-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-400"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}
