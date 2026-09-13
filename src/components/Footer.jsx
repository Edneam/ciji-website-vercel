import { Link } from 'react-router-dom'
import { Phone, EnvelopeSimple, MapPin, Clock, ArrowUp } from '@phosphor-icons/react'
import { company } from '../data/site.js'

// Footer: 3 zones instead of the 4-column link farm. Contact detail is the
// primary job here for a contractor, so it leads. Legal links added (were
// missing entirely).
export default function Footer() {
  return (
    // Deep blue, matching the CTA band and the navigation glass, instead of the
    // near-black navy-950 this used to be.
    //
    // With the CTA recoloured to navy-800/900 and this left at navy-950, the two
    // met in a hard full-width tonal step: a lighter blue block sitting on a
    // near-black one, with nothing marking the boundary as intentional.
    //
    // Now the footer starts at navy-900, the same tone the CTA gradient ends on,
    // and deepens to navy-950 by the bottom of the page. That gives the page a
    // settle rather than a step, and keeps the darkest tone under the legal
    // strip where it belongs. The gold hairline is what separates the two bands
    // now: a deliberate 1px rule instead of an accidental colour jump.
    <footer className="border-t border-gold-500/25 bg-gradient-to-b from-navy-900 to-navy-950 text-steel-300">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-16">
        {/* identity */}
        <div>
          {/* The mark is filtered to white, not sat on a white plate.
              It used to be the original artwork inside `bg-white px-3 py-2`,
              which was the single brightest object on the page: measured pure
              255,255,255 against a footer around 10,30,52. On the old
              near-black footer it read as a deliberate badge; against the new
              blue it reads as an unstyled box pasted on, and it was bright
              enough that a seam detector picked it out as the strongest
              horizontal step in the whole CTA-plus-footer region.

              `brightness-0 invert` is exactly what the navbar already does to
              the same file, so the mark now matches itself in both places. */}
          <img
            src="/images/logo.png"
            alt={company.name}
            width="160"
            height="40"
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            {company.group}, comprising {company.name} and {company.sisterCompany}. Over a decade
            of aluminium and glass fabrication for building and infrastructure projects across the
            UAE.
          </p>
        </div>

        {/* navigation */}
        <div>
          <h2 className="spec-label text-steel-300">Site</h2>
          <nav aria-label="Footer">
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/projects', label: 'Projects' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-gold-500">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* contact */}
        <div>
          <h2 className="spec-label text-steel-300">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={company.phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-gold-500"
              >
                <Phone size={17} weight="regular" className="shrink-0 text-gold-500" />
                <span className="font-mono">{company.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-500"
              >
                <EnvelopeSimple size={17} weight="regular" className="shrink-0 text-gold-500" />
                <span className="font-mono">{company.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={17} weight="regular" className="shrink-0 text-gold-500" />
              {company.hours}
            </li>
          </ul>

          <ul className="mt-6 space-y-4 border-t border-white/10 pt-5 text-sm">
            {company.offices.map((o) => (
              <li key={o.city} className="flex gap-3">
                <MapPin size={17} weight="regular" className="mt-0.5 shrink-0 text-gold-500" />
                <span>
                  <span className="block font-semibold text-white">{o.city}</span>
                  {o.lines.map((line) => (
                    <span key={line} className="block text-steel-400">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="btn btn-primary mt-6"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <p className="text-steel-400">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="text-steel-400 transition-colors hover:text-gold-500">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-steel-400 transition-colors hover:text-gold-500">
              Cookie Notice
            </Link>
            <Link to="/terms" className="text-steel-400 transition-colors hover:text-gold-500">
              Terms of Use
            </Link>
            <a
              href="#top"
              className="flex items-center gap-2 text-steel-400 transition-colors hover:text-gold-500"
            >
              Back to top <ArrowUp size={13} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
