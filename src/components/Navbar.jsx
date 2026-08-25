import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Phone, Mail, Clock, Menu, X } from 'lucide-react'
import { company } from '../data/site.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* utility bar */}
      <div className="hidden bg-navy-950 text-sm text-slate-300 md:block">
        <div className="container-x flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={company.phoneHref} className="flex items-center gap-2 transition-colors hover:text-gold-400">
              <Phone size={14} /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 transition-colors hover:text-gold-400">
              <Mail size={14} /> {company.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gold-400" /> {company.hours}
          </div>
        </div>
      </div>

      {/* main nav */}
      <nav className="border-b border-slate-100 bg-white shadow-sm">
        <div className="container-x flex h-[76px] items-center justify-between">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src="/images/logo.png" alt={company.name} className="h-11 w-auto" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-gold-500' : 'text-navy-900 hover:text-gold-500'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="ml-4 bg-navy-900 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-gold-500 hover:text-navy-950"
              >
                Get a Quote
              </Link>
            </li>
          </ul>

          <button
            className="p-2 text-navy-900 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <ul className="border-t border-slate-100 bg-white px-4 pb-4 lg:hidden">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block border-b border-slate-50 py-3 text-sm font-semibold uppercase tracking-wide ${
                      isActive ? 'text-gold-500' : 'text-navy-900'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
