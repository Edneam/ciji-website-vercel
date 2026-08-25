import { useEffect, useRef, useState } from 'react'

// Counts up to `value` when scrolled into view. `value` like "245" or "15".
export default function CountUp({ value, suffix = '', duration = 1800, className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const target = parseInt(String(value).replace(/\D/g, ''), 10) || 0

  useEffect(() => {
    const el = ref.current
    if (!el) return
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
      cancelAnimationFrame(raf)
    }
  }, [target, duration])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
