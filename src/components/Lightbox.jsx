import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowLeft, ArrowRight } from '@phosphor-icons/react'

/**
 * Fullscreen image viewer for the project grid.
 *
 * Behaviour that matters and is easy to get wrong:
 * - Escape closes, and so does the X button and a click on the backdrop.
 * - Arrow keys walk the set, so a visitor can review the portfolio without
 *   closing and reopening.
 * - Focus is trapped inside the dialog while it is open and returned to the
 *   exact card that opened it on close. Without that, a keyboard user is
 *   dumped at the top of the document.
 * - Background scroll is locked, and the lock restores the previous value
 *   rather than assuming it was `visible` (this site sets `overflow-x: hidden`
 *   on the body, so blindly resetting to `visible` would break it).
 * - The whole thing is inert when `index` is null, so no listeners or scroll
 *   locks linger on a page where the viewer was never opened.
 */
export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const open = index !== null && index >= 0
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const item = open ? items[index] : null

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrev()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNext()
        return
      }
      if (e.key !== 'Tab') return

      // Focus trap. Query on each keypress rather than caching, because the
      // control set changes: with a single image there are no arrow buttons.
      const nodes = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href]'
      )
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    if (!open) return

    const opener = document.activeElement
    const body = document.body
    const prevOverflow = body.style.overflow
    // The dialog node is captured here, while it is mounted, rather than read
    // as `dialogRef.current` inside the cleanup. React may have already
    // detached the ref by the time cleanup runs, in which case the containment
    // check below would read null, silently skip the focus restore, and leave a
    // keyboard user stranded at the top of the document.
    const dialogNode = dialogRef.current
    body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = prevOverflow

      if (!(opener instanceof HTMLElement) || !opener.isConnected) return

      // Restore focus to the card that opened the viewer.
      //
      // The obvious guard here is `dialogNode.contains(document.activeElement)`
      // ("only take focus back if we still have it"), and it does not work.
      // React detaches the portal subtree BEFORE this cleanup runs, so the
      // focused control inside it is already gone and the browser has reset
      // `document.activeElement` to <body>. The containment test is therefore
      // always false and focus is never restored: verified, the opener card did
      // not regain focus.
      //
      // So the test is inverted. Focus is restored when nothing meaningful
      // holds it (body, null, or a node that has been detached), and left alone
      // only when some other live element genuinely took it.
      const active = document.activeElement
      const nothingHasFocus = !active || active === body || !active.isConnected
      if (nothingHasFocus || dialogNode?.contains(active)) {
        opener.focus()
      }
    }
  }, [open, onKeyDown])

  if (!open || !item) return null

  const many = items.length > 1

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, image ${index + 1} of ${items.length}`}
      className="lightbox"
      onClick={(e) => {
        // Backdrop only. Clicks on the figure or the controls must not close.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="lightbox__bar">
        <p className="font-mono text-xs tracking-[0.16em] text-steel-400">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="lightbox__btn"
          aria-label="Close image viewer"
        >
          <X size={20} weight="bold" aria-hidden="true" />
        </button>
      </div>

      {/* `key` forces a remount per image so the entrance animation replays
          when stepping through with the arrow keys. */}
      <figure key={item.image} className="lightbox__figure">
        <img src={item.image} alt={item.alt} className="lightbox__img" />
        <figcaption className="lightbox__cap">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold-400">
            {item.category}
          </p>
          <h2 className="font-display mt-2 text-xl font-bold leading-tight text-white md:text-2xl">
            {item.title}
          </h2>
          <p className="mt-1 text-sm text-steel-300">{item.location}</p>
          {item.contractor ? (
            <p className="mt-2 text-xs text-steel-400">Main contractor: {item.contractor}</p>
          ) : null}
        </figcaption>
      </figure>

      {many ? (
        <>
          <button
            type="button"
            onClick={onPrev}
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous image"
          >
            <ArrowLeft size={20} weight="bold" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next image"
          >
            <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </button>
        </>
      ) : null}
    </div>,
    // Rendered into <body>, deliberately, not in place.
    //
    // `position: fixed` is resolved against the nearest ancestor that has a
    // transform, filter, or containment, NOT against the viewport. This site
    // animates the route wrapper (`.page-in`) with a scale, so in place the
    // dialog measured 4336px tall (the full document height) instead of the
    // 633px viewport, and the image overflowed far below the fold.
    //
    // A portal takes it out of that subtree entirely, so it is immune to
    // whatever transforms the page wrapper is doing now or later.
    document.body
  )
}
