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

  /* Both the scrolled bar and the mobile panel are dark blue, so there is no
     longer a light state anywhere in this header: the logo, the links, the
     underline and the burger are all constants now. `solid` used to drive four
     separate colour flips off one flag and is no longer needed. */

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute left-0 top-0 h-10 w-px" />
      {/* Deep blue glass, not a solid gold band.

          The gold bar was the loudest surface on the site and it fought
          everything: it forced the logo to flip to black, forced the nav links
          and the burger to flip to navy, and forced the active underline to
          swap colour, so four separate things had to stay in sync with one
          scroll flag. It also put the brand's single accent colour behind the
          navigation, which left the accent with nothing left to point at.

          Now the bar is navy-800 at 88% with a backdrop blur, over a hairline
          of gold at 35%. The blur is what makes it read as premium rather than
          as a panel: the facade photography underneath stays faintly legible
          and in motion while the type on top stays fully opaque. Gold is
          demoted to a 1px rule, which is the only place it is still needed.

          `supports` guard: without backdrop-filter the alpha alone would let
          content show through too strongly, so those browsers get an opaque
          bar instead. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
          open
            ? 'border-b border-white/10 bg-navy-950'
            : scrolled
              ? 'nav-glass border-b border-gold-500/35 shadow-[0_1px_24px_-4px_rgb(7_22_39_/_0.55)]'
              : 'nav-veil border-b border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Main">
          <div className="container-x flex h-[72px] items-center justify-between">
            <Link to="/" aria-label={`${company.name} home`} className="shrink-0">
              {/* One constant filter now. Previously this flipped between
                  `brightness-0` (black mark, for the gold bar) and
                  `brightness-0 invert` (white mark, for everything else). With
                  the bar dark in every state the white mark is always correct,
                  so the conditional is gone rather than merely simplified. */}
              <img
                src="/images/logo.png"
                alt={company.name}
                width="180"
                height="48"
                className="h-10 w-auto brightness-0 invert sm:h-11"
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
                        isActive ? 'text-white' : 'text-steel-300 hover:text-white'
                      } after:absolute after:inset-x-4 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-gold-500 after:transition-transform after:duration-300 ${
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
              className="-mr-2 flex h-11 w-11 items-center justify-center text-white lg:hidden"
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
              className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto border-t border-white/10 bg-navy-950 lg:hidden"
            >
              <ul className="container-x py-2">
                {links.map((l) => (
                  <li key={l.to} className="border-b border-white/10">
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex min-h-[56px] items-center font-mono text-[14px] font-medium uppercase tracking-[0.12em] ${
                          isActive ? 'text-gold-500' : 'text-white'
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
                  className="btn btn-outline w-full"
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
