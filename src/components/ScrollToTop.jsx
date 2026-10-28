import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }

    /* `html { scroll-behavior: smooth }` applies to programmatic scrolls too,
       so a plain scrollTo(0, 0) was animating the whole way back to the top.
       That is the page visibly travelling upwards after a link is clicked.
       `behavior: 'instant'` overrides the stylesheet for this one call, so the
       new route starts at the top with no journey. */
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    /* `overflow-x: hidden` on html and body makes `html` the scrolling element
       in this document rather than the viewport, and in that state some
       engines ignore window.scrollTo. Scroll it explicitly as well.

       This must use scrollTo({ behavior: 'instant' }) and NOT `scrollTop = 0`:
       a plain scrollTop assignment obeys the stylesheet's
       `scroll-behavior: smooth` and would animate all the way to the top,
       which is exactly the travelling-upwards effect being removed here. */
    document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
