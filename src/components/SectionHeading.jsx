/**
 * Section heading.
 *
 * There is no `eyebrow` / kicker slot, by design. A small tracked uppercase
 * label sitting as its own block directly above a heading is a pattern the
 * heading never needs: it repeats or dilutes what the heading already says.
 * Where those words carried real information they were folded into the
 * heading or the supporting sentence instead.
 *
 * Also deliberately absent: the centred title + gold divider that used to be
 * emitted on every call, which is what made every section read identically.
 *   - left alignment is the default (procurement audiences scan left edges)
 *   - no ornamental divider; structure comes from hairline rules in layout
 */
export default function SectionHeading({
  title,
  sub,
  align = 'left',
  light = false,
  className = '',
}) {
  const centred = align === 'center'

  return (
    <div className={`${centred ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'} ${className}`}>
      <h2
        className={`font-display text-3xl font-bold uppercase leading-[1.1] tracking-tight md:text-[2.6rem] ${
          light ? 'text-white' : 'text-navy-950'
        }`}
      >
        {title}
      </h2>
      {sub ? (
        <p className={`mt-5 max-w-[62ch] leading-relaxed ${light ? 'text-steel-300' : 'text-steel-500'}`}>
          {sub}
        </p>
      ) : null}
    </div>
  )
}
