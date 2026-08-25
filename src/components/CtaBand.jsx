import { Link } from 'react-router-dom'
import { PhoneCall } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { company } from '../data/site.js'

export default function CtaBand() {
  return (
    <section className="bg-gold-500">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-14 md:flex-row">
        <Reveal className="text-center md:text-left">
          <h2 className="font-display text-3xl font-extrabold text-navy-950 md:text-4xl">
            Got a project in mind?
          </h2>
          <p className="mt-1 text-navy-900/80">
            We offer full solutions for building &amp; infrastructure projects — exceptional
            quality at competitive pricing.
          </p>
        </Reveal>
        <Reveal delay={150} className="flex shrink-0 items-center gap-4">
          <a
            href={company.phoneHref}
            className="flex items-center gap-2 border-2 border-navy-950 px-6 py-3 text-sm font-bold uppercase tracking-wide text-navy-950 transition-colors duration-300 hover:bg-navy-950 hover:text-white"
          >
            <PhoneCall size={18} /> Call Us
          </a>
          <Link
            to="/contact"
            className="bg-navy-950 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-navy-800"
          >
            Get a Quote
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
