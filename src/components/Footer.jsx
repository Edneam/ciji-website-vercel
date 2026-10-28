import { Link } from 'react-router-dom'
import {
  ArrowUp,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react'
import { company, socials } from '../data/site.js'
import { serviceSlug } from '../data/services.js'

const legalLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/cookies', label: 'Cookie Notice' },
  { to: '/terms', label: 'Terms of Use' },
]

const pageLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

const serviceLinks = [
  { title: 'Structural Glazing & Curtain Walling', label: 'Curtain walling' },
  { title: 'Spider Glazing', label: 'Spider glazing' },
  { title: 'Aluminium Cladding', label: 'Aluminium cladding' },
].map((item) => ({
  to: `/services#${serviceSlug(item.title)}`,
  label: item.label,
}))

// Plain-text summary for the About column. These are the scopes the company
// actually lists on /services — not a second set of links, so the footer does
// not compete with the Quick links column.
const capabilities = [
  'Curtain walling',
  'Structural glazing',
  'Spider glazing',
  'Aluminium cladding',
  'Skylights',
  'Glass partitions',
]

const glyphs = {
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  x: XLogo,
  youtube: YoutubeLogo,
  whatsapp: WhatsappLogo,
}

const visibleSocials = socials.filter(
  (item) => typeof item.href === 'string' && item.href.trim() && glyphs[item.platform],
)

const linkClass =
  'link-slide inline-flex min-h-11 items-center text-sm text-[var(--footer-ink)] hover:text-[var(--footer-hover)]'

const labelClass =
  'font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--footer-muted)]'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-mark.png?v=3"
              alt=""
              width={256}
              height={217}
              translate="no"
              loading="lazy"
              className="h-12 w-auto"
            />
            <p className="font-display text-lg font-bold leading-tight text-[var(--footer-ink)]" translate="no">
              {company.name}
            </p>
          </div>
          <h2 className="mt-5 font-display text-lg font-bold leading-tight text-[var(--footer-ink)]">About</h2>
          <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--footer-muted)]">
            Part of the <span translate="no">{company.group}</span>, alongside{' '}
            <span translate="no">{company.sisterCompany}</span>. For over a decade we designed,
            fabricated and installed aluminium and glass for UAE building and infrastructure
            projects, from our Sharjah workshop.
          </p>
          <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--footer-muted)]">
            We work as a specialist facade subcontractor to main contractors and government
            authorities, with design, fabrication and installation held under one contract.
          </p>

          <p className={`${labelClass} mt-6`}>Capabilities</p>
          <ul className="mt-2 grid max-w-[42ch] grid-cols-2 gap-x-6 gap-y-1 text-sm text-[var(--footer-muted)]">
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold leading-tight text-[var(--footer-ink)]">Contact</h2>
          {/* One vertical rhythm through the whole column. Each link keeps its
              44px touch target, and its `dd` is a flex box so that target is
              exactly 44px tall rather than picking up descender space from the
              line box. With 6px between blocks and 24px before the button,
              every gap in the column reads the same. */}
          <dl className="mt-3 space-y-1.5">
            <div>
              <dt className={labelClass}>Telephone</dt>
              <dd className="flex">
                <a href={company.phoneHref} className={`${linkClass} font-semibold whitespace-nowrap`}>
                  {company.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className={labelClass}>Email</dt>
              <dd className="flex">
                <a href={`mailto:${company.email}`} className={`${linkClass} font-medium`}>
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className={labelClass}>Office hours</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--footer-ink)]">{company.hours}</dd>
            </div>
          </dl>
          <Link to="/contact" className="btn btn-primary mt-6">
            Request a Quote
          </Link>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-lg font-bold leading-tight text-[var(--footer-ink)]">Quick links</h2>
          <ul className="mt-3 flex flex-col">
            {pageLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className={`${labelClass} mt-4`}>Services</p>
          <ul className="mt-1 flex flex-col">
            {serviceLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="font-display text-lg font-bold leading-tight text-[var(--footer-ink)]">Offices</h2>
          <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {company.offices.map((office) => (
              <div key={office.city}>
                <h3 className="font-display text-base font-bold leading-tight text-[var(--footer-ink)]">
                  {office.city}
                </h3>
                <address className="mt-2 text-sm not-italic leading-relaxed text-[var(--footer-muted)]">
                  {office.lines.map((line, index) => (
                    <span key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            ))}
          </div>
        </div>
      </div>

      {visibleSocials.length > 0 ? (
        <div className="container-x pb-2">
          <ul className="flex flex-wrap gap-2">
            {visibleSocials.map((item) => {
              const Icon = glyphs[item.platform]
              return (
                <li key={item.platform}>
                  <a
                    href={item.href}
                    className="inline-flex h-11 w-11 items-center justify-center text-[var(--footer-ink)] hover:text-[var(--footer-hover)]"
                    aria-label={item.label}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      <div className="border-t border-[var(--footer-line)]">
        <div className="container-x flex flex-col gap-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--footer-muted)]">
            © {new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date())}{' '}
            <span translate="no">{company.name}</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {legalLinks.map((item) => (
              <Link key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </Link>
            ))}
            <a
              href="#top"
              className={linkClass}
              onClick={(e) => {
                e.preventDefault()
                const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'instant' : 'smooth' })
              }}
            >
              Back to top <ArrowUp size={13} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
