import { ArrowSquareOut } from '@phosphor-icons/react'

const MAP_SRC =
  'https://www.google.com/maps?q=Industrial%20Area%2017%2C%20Sharjah%2C%20UAE&output=embed'
const MAP_LINK = 'https://www.google.com/maps?q=Industrial+Area+17,+Sharjah,+UAE'

/**
 * Head office map.
 *
 * Loads the Google Maps embed directly. This is a third-party frame: Google
 * receives the visitor's IP address and can set its own cookies once it
 * loads, which is why the privacy and cookie notices name it explicitly.
 *
 * `loading="lazy"` keeps it off the critical path so it only fetches when it
 * scrolls near the viewport, and the plain text address plus the link out
 * remain available for anyone who blocks third-party frames.
 */
export default function MapEmbed() {
  return (
    <div>
      <div className="bg-steel-100">
        <iframe
          title="Map showing the CIJI head office in Industrial Area 17, Sharjah"
          src={MAP_SRC}
          className="h-80 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={MAP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="link-slide mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-950"
      >
        Open in Google Maps
        <ArrowSquareOut size={15} weight="bold" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  )
}
