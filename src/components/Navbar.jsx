import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { List, X, Phone } from '@phosphor-icons/react'
import { company } from '../data/site.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sentinel = useRef(null)
  const panel = useRef(null)
  const toggle = useRef(null)

  /* A sentinel at the very top of the document reports when it leaves the
     viewport. This replaces a scroll listener: the browser batches the
     callback instead of firing on every scroll frame. */
  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 1,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* While the panel is open: Escape closes it, focus is kept inside it, and
     the page behind it cannot scroll. Tapping any link closes it explicitly
     (see onClick below) rather than via a route-change effect. */
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return

      const focusables = panel.current.querySelectorAll('a[href], button:not([disabled])')
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector('a[href]')?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute left-0 top-0 h-10 w-px" />
      {/* Light steel bar. The mark is blue and green with no backing plate,
          so a navy bar swallows it. Steel-50 is the same ground as the page
          bands, navy type stays readable, and gold is only the active mark. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-steel-200 bg-steel-50 pt-[env(safe-area-inset-top,0px)] transition-shadow duration-500 ${
          scrolled && !open ? 'shadow-[0_1px_16px_-6px_rgb(7_22_39_/_0.18)]' : ''
        }`}
      >
        <nav aria-label="Main">
          <div className="container-x flex h-[72px] items-center justify-between">
            <Link to="/" aria-label={`${company.name} home`} className="shrink-0" translate="no">
              <img
                src="/images/logo-mark.png?v=3"
                alt={company.name}
                width={256}
                height={217}
                className="h-12 w-auto sm:h-14"
              />
            </Link>

            <ul className="hidden items-center lg:flex">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `relative px-4 py-2 font-mono text-[13.5px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                        isActive ? 'text-navy-950' : 'text-navy-700 hover:text-navy-950'
                      } after:absolute after:inset-x-4 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-gold-600 after:transition-transform after:duration-300 ${
                        isActive ? 'after:scale-x-100' : 'after:scale-x-0'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* 44px minimum touch target. Always white now: the bar is dark in
                every state, so there is no navy variant to switch to. */}
            <button
              ref={toggle}
              type="button"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-navy-950 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? (
                <X size={26} aria-hidden="true" />
              ) : (
                <List size={26} aria-hidden="true" />
              )}
            </button>
          </div>

          {open && (
            <div
              ref={panel}
              id="mobile-nav"
              className="fixed inset-x-0 bottom-0 top-[var(--nav-offset)] overflow-y-auto overscroll-contain border-t border-steel-200 bg-steel-50 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
            >
              <ul className="container-x py-2">
                {links.map((l) => (
                  <li key={l.to} className="border-b border-steel-200">
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex min-h-[56px] items-center font-mono text-[14px] font-medium uppercase tracking-[0.12em] ${
                          isActive ? 'text-gold-700' : 'text-navy-950'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* The primary actions stay reachable from inside the panel. */}
              <div className="container-x flex flex-col gap-3 py-6">
                <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Request a Quote
                </Link>
                <a
                  href={company.phoneHref}
                  onClick={() => setOpen(false)}
                  className="btn btn-outline-dark w-full"
                >
                  <Phone size={17} weight="regular" aria-hidden="true" />
                  {company.phone}
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
