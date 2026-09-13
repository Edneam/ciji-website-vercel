import Reveal from './Reveal.jsx'
import { featured } from '../data/projects.js'

/**
 * Flagship reference list.
 *
 * Replaces a three-column data table. The table was the wrong idiom: a grid of
 * cells invites you to compare values down a column, and nobody compares main
 * contractors against each other. What a tender reader wants is to recognise a
 * name ("Abu Dhabi Airport", "China State Construction") and see who CIJI
 * answered to on it. That is a credit, not a data point.
 *
 * Specialist facade contractors present this the same way (MBM, KFL, VELTAA):
 * the project is named large, the main contractor sits beneath it as a credit
 * line, and the location is quiet metadata. So the structure here is one entry
 * per project with a clear primary/secondary/tertiary reading order, rather
 * than three columns of equal visual weight.
 *
 * Consequences of dropping the table:
 *   - The project name can carry real display type instead of being squeezed
 *     into a 34%-wide cell.
 *   - No horizontal scroll on phones and no reflow hack, because a list is
 *     already linear. About 50 lines of table-reflow CSS went away with it.
 *   - The column headers are gone, so the meaning they carried is attached to
 *     each value with visually-hidden labels instead.
 *
 * Semantics: an ordered list, because these are ranked flagship references, and
 * each entry's own values are labelled for assistive tech.
 */
export default function ReferenceList() {
  return (
    <ol className="ref-list">
      {featured.map((f, i) => (
        <Reveal as="li" key={f.title} delay={i * 60} className="ref-list__item">
          {/* Decorative sequence marker: the list is already numbered for
              assistive tech by being an <ol>, so this is hidden from it. */}
          <span className="ref-list__index" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>

          <div className="ref-list__body">
            <p className="ref-list__name">{f.title}</p>
            <p className="ref-list__credit">
              <span className="sr-only">Main contractor: </span>
              {f.mainContractor}
            </p>
          </div>

          <p className="ref-list__place">
            <span className="sr-only">Location: </span>
            {f.location}
          </p>
        </Reveal>
      ))}
    </ol>
  )
}
