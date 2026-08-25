import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowUp } from 'lucide-react'
import { company } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-5 inline-block rounded bg-white px-3 py-2">
            <img src="/images/logo.png" alt={company.name} className="h-10 w-auto" />
          </div>
          <p className="text-sm leading-relaxed">
            {company.group} — comprising {company.name} &amp; {company.sisterCompany} — with over a
            decade of experience in the UAE construction industry, specialized in aluminium and
            glass fabrication works.
          </p>
        </div>

        <div>
          <h3 className="font-display mb-4 text-lg font-bold text-white">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="transition-colors hover:text-gold-400">Home</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-gold-400">About Us</Link></li>
            <li><Link to="/services" className="transition-colors hover:text-gold-400">Services</Link></li>
            <li><Link to="/projects" className="transition-colors hover:text-gold-400">Projects</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-gold-400">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display mb-4 text-lg font-bold text-white">Office Addresses</h3>
          <ul className="space-y-4 text-sm">
            {company.offices.map((o) => (
              <li key={o.city} className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold-400" />
                <span>
                  <span className="block font-semibold text-white">{o.city}</span>
                  {o.lines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display mb-4 text-lg font-bold text-white">Get In Touch</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={company.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold-400">
                <Phone size={18} className="text-gold-400" /> {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 transition-colors hover:text-gold-400">
                <Mail size={18} className="text-gold-400" /> {company.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-gold-400" /> {company.hours}
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-6 inline-block bg-gold-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-navy-950 transition-colors duration-300 hover:bg-gold-400"
          >
            Get a Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <p>© 2026 {company.name}. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 transition-colors hover:text-gold-400"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
