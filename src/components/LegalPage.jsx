import PageHeader from './PageHeader.jsx'
import Seo from './Seo.jsx'
import Reveal from './Reveal.jsx'

/**
 * Shared shell for the policy pages. Narrow measure, generous leading,
 * hairline-separated sections. Policy pages are read, not scanned, so the
 * layout gets out of the way.
 */
export default function LegalPage({
  title,
  crumb,
  description,
  seoTitle,
  seoDescription,
  path,
  updated,
  children,
}) {
  const crumbName = crumb || title
  const schema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cijiintl.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: crumbName,
        item: `https://cijiintl.com${path}`,
      },
    ],
  }

  return (
    <>
      <Seo
        title={seoTitle || title}
        description={description || seoDescription}
        path={path}
        schema={schema}
        lcpImage="/images/projects/dubai-walls.jpg"
      />
      <PageHeader title={title} crumb={crumb} image="/images/projects/dubai-walls.jpg" />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal className="max-w-[68ch]">
            <p className="spec-label">Last updated {updated}</p>
            <div className="legal-prose mt-8">{children}</div>

            {/* This note is 15px while the body prose is 17px, so it needs its
                own narrower measure. Sharing the column sized for 17px pushed
                it to 81 characters per line (measured), past the 80 ceiling,
                because narrower glyphs fit more characters into the same width.
                `max-w-[58ch]` brings it back in line with the body copy. */}
            <p className="mt-14 max-w-[58ch] border-t border-steel-200 pt-6 text-sm text-steel-500">
              This page explains how this website works. It is not legal advice. For questions about
              a specific contract or project, contact us directly.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
