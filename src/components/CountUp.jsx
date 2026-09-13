import { useEffect, useRef, useState } from 'react'

// Counts up to `value` when scrolled into view.
//
// The real figure is in the DOM from first paint, so crawlers, AI systems and
// no-JS visitors read "245+" rather than the "0+" this component used to emit.
// The animation only kicks in when the strip actually enters the viewport,
// which is below the fold on every page that uses it.
export default function CountUp({ value, duration = 1500, className = '' }) {
  const ref = useRef(null)
  const target = parseInt(String(value).replace(/\D/g, ''), 10) || 0
  const suffix = String(value).replace(/[0-9]/g, '')
  const [display, setDisplay] = useState(target)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 4)
          setDisplay(Math.round(target * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [target, duration])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
