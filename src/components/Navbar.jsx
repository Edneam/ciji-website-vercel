import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-gold-500 shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main Navigation">
        <div className="container-x flex h-20 items-center justify-between">
          <Link to="/" onClick={() => setOpen(false)}>
            <img
              src="/images/logo.png"
              alt={company.name}
              width="180"
              height="48"
              className={`h-12 w-auto transition-all duration-300 ${
                scrolled ? 'brightness-0' : 'brightness-0 invert'
              }`}
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${
                      scrolled
                        ? isActive
                          ? 'text-white'
                          : 'text-navy-950 hover:text-white'
                        : isActive
                          ? 'text-gold-400'
                          : 'text-white hover:text-gold-400'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`p-2 lg:hidden ${scrolled ? 'text-navy-950' : 'text-white'}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close main menu' : 'Open main menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation-menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <ul id="mobile-navigation-menu" className="border-t border-slate-100 bg-white px-4 pb-4 lg:hidden">
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
