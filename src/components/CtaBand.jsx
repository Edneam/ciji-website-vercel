import { Link } from 'react-router-dom'
import { Phone } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import { company } from '../data/site.js'

// Single canonical CTA intent across the whole site: "Request a Quote".
// Phone is a secondary, differently-shaped action (text link, not a
// second button) so the pair is not the AI-default filled+ghost duo.
export default function CtaBand() {
  return (
    // Deep blue, not the near-black navy-950 the rest of the dark sections use.
    //
    // navy-950 #071627 is the page's structural dark: hero ground, stats strip,
    // metalwork section. When the CTA used it too, the closing ask read as one
    // more section rather than the end of the page. It also sat flush against
    // the navy-950 footer with no seam at all.
    //
    // navy-800 #10294a is the same hue lifted, and it is the colour the new
    // navigation glass already uses, so the page now opens and closes on the
    // same premium blue. The gradient keeps it from reading as a flat panel:
    // 900 in the corners, 800 through the middle where the type sits. The gold
    // hairline on top is the seam that was missing.
    <section className="border-t border-gold-500/30 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div className="container-x grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end md:gap-16 md:py-20">
        <Reveal>
          {/* No kicker above this heading. The heading states the offer on its
              own; a tracked "Tendering now" label above it only diluted it. */}
          <h2 className="font-display max-w-2xl text-3xl font-bold leading-[1.1] text-white md:text-4xl">
            Tendering now: send us your drawings and we will price the facade package.
          </h2>
          <p className="mt-4 max-w-xl text-steel-300">
            Design, fabrication and installation quoted as one scope, from our
            own Sharjah workshop. Full solutions for building and
            infrastructure projects at competitive pricing.
          </p>
        </Reveal>
        <Reveal delay={120} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link to="/contact" className="btn btn-primary w-full sm:w-auto">
            Request a Quote
          </Link>
          <a href={company.phoneHref} className="btn btn-outline w-full sm:w-auto">
            <Phone size={17} weight="regular" aria-hidden="true" />
            <span className="whitespace-nowrap">{company.phone}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
