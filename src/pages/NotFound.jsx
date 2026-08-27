import { Link } from 'react-router-dom'
import { ArrowRight, Home, Compass, PhoneCall, Building2, Layers } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'

export default function NotFound() {
  return (
    <>
      <Seo
        title="404 — Page Not Found | Ciji Bldg. Metalic Const. Ind. LLC"
        description="The requested page could not be found. Explore Ciji Bldg. Metalic Const. Ind. LLC services, projects, and structural glazing solutions across the UAE."
        path="/404"
      />
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-navy-950 py-24 text-white">
        {/* Background architectural image overlay */}
        <img
          src="/images/projects/ic3-tower.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/95 to-navy-950" />

        {/* Decorative Grid Lines */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="container-x relative z-10 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-400 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
                Error Code 404
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display mt-6 text-7xl font-extrabold tracking-tight text-white sm:text-9xl">
                4<span className="text-gold-400">0</span>4
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <h2 className="font-display mt-4 text-2xl font-bold uppercase tracking-wider text-slate-100 sm:text-3xl">
                Façade Elevation Not Found
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                The blueprint or page you are searching for has moved, been renamed, or does not exist. Let us guide you back to our engineered aluminium and glass solutions.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2.5 bg-gold-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition-colors duration-300 hover:bg-gold-400 shadow-lg shadow-gold-500/20"
                >
                  <Home size={18} />
                  Return Home
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2.5 border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md transition-colors duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-400"
                >
                  <Layers size={18} />
                  Explore Services
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md transition-colors duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-400"
                >
                  <PhoneCall size={18} />
                  Contact Support
                </Link>
              </div>
            </Reveal>

            {/* Quick Links Grid */}
            <Reveal delay={400} className="mt-16 border-t border-white/10 pt-12">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Or Navigate Directly To Popular Destinations
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: 'About Us',
                    desc: 'A decade of structural glazing excellence across the UAE',
                    to: '/about',
                    icon: Building2,
                  },
                  {
                    title: 'Our Projects',
                    desc: '245+ delivered high-rise and commercial landmark projects',
                    to: '/projects',
                    icon: Compass,
                  },
                  {
                    title: 'Get a Quote',
                    desc: 'Request technical proposal and commercial estimate',
                    to: '/contact',
                    icon: ArrowRight,
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="group rounded border border-white/10 bg-navy-900/60 p-5 text-left backdrop-blur-sm transition-all duration-300 hover:border-gold-400/50 hover:bg-navy-900/90"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-white transition-colors group-hover:text-gold-400">
                        {item.title}
                      </h3>
                      <item.icon size={18} className="text-gold-400 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
