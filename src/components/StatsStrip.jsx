import CountUp from './CountUp.jsx'
import Reveal from './Reveal.jsx'
import { stats } from '../data/site.js'

/**
 * Figures presented as a divided data row.
 *
 * Both fixes in this version are about alignment:
 *
 * 1. Cells are centred. They were left-aligned with only 8px of side padding,
 *    so each figure sat hard against its own divider while a wide gap opened on
 *    the other side of the cell. Four unequal-width numbers ("245+" vs "288")
 *    made that gap different in every column, which is what read as crooked.
 *    Centring makes the figure sit at the midpoint of its own column, so the
 *    spacing either side of every divider is equal by construction.
 *
 * 2. The divider rules are derived from position rather than hand-listed. The
 *    previous version gave item 3 a `border-l` that was correct on desktop but
 *    wrong on mobile, where item 3 starts a new row: the rule appeared at the
 *    left edge of the row with nothing to its left.
 *
 *    The rules now are:
 *      - vertical between the two mobile columns  -> odd indices
 *      - vertical between all four desktop columns -> every index except 0
 *      - horizontal only under the first mobile row -> indices > 1, dropped at lg
 *
 * The figures inherit `font-variant-numeric: tabular-nums` from body, so the
 * count-up animation cannot change a cell's width mid-flight and nudge the
 * layout while it runs.
 */
export default function StatsStrip() {
  return (
    <section className="border-y border-white/10 bg-navy-950">
      {/* Full-bleed grid, not `container-x`. The navy band and the divider
          rules both run edge to edge, so the eye reads the strip's own edges as
          the outer cell walls. With the container's 48px side padding sitting
          OUTSIDE the grid, the first and last columns looked about 24px
          off-centre against those walls even though each was correctly centred
          in its own column. Making the grid full width puts the dividers at
          exactly 1/4, 2/4, 3/4 and the four content centres at 1/8, 3/8, 5/8,
          7/8, so the spacing either side of every rule is equal by
          construction. Side padding moves inside each cell instead. */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const verticalRule =
            i === 0
              ? ''
              : i % 2 === 1
                ? 'border-l border-white/10'
                : 'lg:border-l lg:border-white/10'
          const horizontalRule = i > 1 ? 'border-t border-white/10 lg:border-t-0' : ''

          return (
            <Reveal
              key={s.label}
              delay={i * 80}
              className={`flex flex-col items-center px-5 py-10 text-center sm:px-8 lg:py-14 ${verticalRule} ${horizontalRule}`}
            >
              <p className="font-display text-4xl font-bold leading-none text-gold-400 md:text-5xl">
                <CountUp value={s.value} />
              </p>
              {/* No trailing letter-space compensation here, deliberately.
                  A `-me-[0.16em]` nudge looks like the right fix for tracked
                  centred text, but measuring the real glyph ink showed this
                  engine does not add the tracking after the final character:
                  the label ink was already centred to within 0.01px, and the
                  negative margin pushed it 0.95px RIGHT of centre instead. */}
              <p className="spec-label mt-3 text-steel-300">{s.label}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
