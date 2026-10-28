import { useEffect } from 'react'
import { SITE, businessNodes } from '../data/schema.js'

const DEFAULT_IMAGE = `${SITE}/images/hero-poster.jpg`
const OG_IMAGE_ALT = 'Aluminium and glass facade by Ciji Bldg. Metalic Const. Ind. LLC'

function withBrand(title) {
  return /ciji/i.test(title) ? title : `${title} | CIJI`
}

function stripContext(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return node
  const { '@context': _context, ...rest } = node
  return rest
}

function buildJsonLd({ fullTitle, description, fullUrl, schema, pageType, image }) {
  const page = {
    '@type': pageType || 'WebPage',
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name: fullTitle,
    description,
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#organization` },
    primaryImageOfPage: image,
    inLanguage: 'en',
  }
  if (pageType === 'ContactPage') {
    page.mainEntity = { '@id': `${SITE}/#localbusiness` }
  }
  const extra = !schema ? [] : (Array.isArray(schema) ? schema : [schema]).map(stripContext)
  return {
    '@context': 'https://schema.org',
    '@graph': [...businessNodes(), page, ...extra],
  }
}

function buildHead({
  title,
  description,
  path = '/',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schema = null,
  robots = 'index, follow',
  canonical = true,
  lcpImage = '',
  pageType = 'WebPage',
  jsonLd = true,
}) {
  const fullTitle = withBrand(title)
  const fullUrl = `${SITE}${path === '/' ? '/' : path}`
  const image = ogImage.startsWith('http') ? ogImage : `${SITE}${ogImage}`
  const json = jsonLd
    ? buildJsonLd({ fullTitle, description, fullUrl, schema, pageType, image })
    : null
  return { fullTitle, description, fullUrl, image, robots, canonical, lcpImage, ogType, json }
}

function setMetaTag(name, content, attrName = 'name') {
  if (!content) return
  let element = document.head.querySelector(`meta[${attrName}="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attrName, name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setLink(rel, href, { hrefLang, attrs } = {}) {
  const selector = hrefLang
    ? `link[rel="${rel}"][hreflang="${hrefLang}"]`
    : attrs?.['data-lcp']
      ? 'link[rel="preload"][data-lcp="true"]'
      : `link[rel="${rel}"]`
  let element = document.head.querySelector(selector)
  if (!href) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    if (hrefLang) element.setAttribute('hreflang', hrefLang)
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value)
    }
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function applyHead(head) {
  document.title = head.fullTitle
  setMetaTag('description', head.description)
  setMetaTag('robots', head.robots)
  setMetaTag('og:title', head.fullTitle, 'property')
  setMetaTag('og:description', head.description, 'property')
  if (head.canonical) setMetaTag('og:url', head.fullUrl, 'property')
  else document.head.querySelector('meta[property="og:url"]')?.remove()
  setMetaTag('og:type', head.ogType, 'property')
  setMetaTag('og:site_name', 'Ciji Bldg. Metalic Const. Ind. LLC', 'property')
  setMetaTag('og:locale', 'en_AE', 'property')
  setMetaTag('og:image', head.image, 'property')
  setMetaTag('og:image:alt', OG_IMAGE_ALT, 'property')
  setMetaTag('og:image:width', '1920', 'property')
  setMetaTag('og:image:height', '1080', 'property')
  setMetaTag('twitter:card', 'summary_large_image')
  setMetaTag('twitter:title', head.fullTitle)
  setMetaTag('twitter:description', head.description)
  setMetaTag('twitter:image', head.image)
  setMetaTag('twitter:image:alt', OG_IMAGE_ALT)
  setLink('canonical', head.canonical ? head.fullUrl : '')
  setLink('alternate', head.canonical ? head.fullUrl : '', { hrefLang: 'en' })
  setLink('alternate', head.canonical ? head.fullUrl : '', { hrefLang: 'x-default' })
  setLink('preload', head.lcpImage || '', {
    attrs: { as: 'image', fetchpriority: 'high', 'data-lcp': 'true' },
  })

  let script = document.head.querySelector('script[type="application/ld+json"][data-seo="true"]')
  if (!script) {
    script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    script.setAttribute('data-seo', 'true')
    document.head.appendChild(script)
  }
  if (!head.json) {
    script.remove()
    return
  }
  script.textContent = JSON.stringify(head.json)
}

function HeadTags({ head }) {
  return (
    <>
      <title>{head.fullTitle}</title>
      <meta name="description" content={head.description} />
      <meta name="robots" content={head.robots} />
      <meta property="og:title" content={head.fullTitle} />
      <meta property="og:description" content={head.description} />
      {head.canonical ? <meta property="og:url" content={head.fullUrl} /> : null}
      <meta property="og:type" content={head.ogType} />
      <meta property="og:site_name" content="Ciji Bldg. Metalic Const. Ind. LLC" />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:image" content={head.image} />
      <meta property="og:image:alt" content={OG_IMAGE_ALT} />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={head.fullTitle} />
      <meta name="twitter:description" content={head.description} />
      <meta name="twitter:image" content={head.image} />
      <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
      {head.canonical ? <link rel="canonical" href={head.fullUrl} /> : null}
      {head.canonical ? <link rel="alternate" hrefLang="en" href={head.fullUrl} /> : null}
      {head.canonical ? <link rel="alternate" hrefLang="x-default" href={head.fullUrl} /> : null}
      {head.lcpImage ? (
        <link rel="preload" as="image" href={head.lcpImage} fetchPriority="high" data-lcp="true" />
      ) : null}
      {head.json ? (
        <script
          type="application/ld+json"
          data-seo="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(head.json) }}
        />
      ) : null}
    </>
  )
}

export default function Seo({
  title,
  description,
  path = '/',
  ogType = 'website',
  ogImage,
  schema = null,
  robots = 'index, follow',
  canonical = true,
  lcpImage = '',
  pageType = 'WebPage',
  jsonLd = true,
}) {
  const schemaKey = schema ? JSON.stringify(schema) : ''
  const head = buildHead({
    title,
    description,
    path,
    ogType,
    ogImage,
    schema,
    robots,
    canonical,
    lcpImage,
    pageType,
    jsonLd,
  })

  useEffect(() => {
    applyHead(
      buildHead({
        title,
        description,
        path,
        ogType,
        ogImage,
        schema,
        robots,
        canonical,
        lcpImage,
        pageType,
        jsonLd,
      }),
    )
  }, [
    title,
    description,
    path,
    ogType,
    ogImage,
    schemaKey,
    schema,
    robots,
    canonical,
    lcpImage,
    pageType,
    jsonLd,
  ])

  if (!import.meta.env.SSR) return null
  return <HeadTags head={head} />
}
