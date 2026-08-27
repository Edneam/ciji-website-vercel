import CountUp from './CountUp.jsx'
import Reveal from './Reveal.jsx'
import { stats } from '../data/site.js'

export default function StatsStrip() {
  return (
    <section className="bg-navy-900">
      <div className="container-x grid grid-cols-2 gap-y-12 py-16 lg:grid-cols-4 lg:py-20">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 100}
            className={`text-center ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}
          >
            <p className="font-display text-5xl font-extrabold text-gold-400 md:text-6xl">
              <CountUp value={s.value} />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-slate-300">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
