import { useEffect } from 'react'

const DOMAIN = 'https://cijialuminium.com'
const DEFAULT_IMAGE = `${DOMAIN}/images/hero-poster.jpg`

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

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', url)
}

function setJsonLd(schema) {
  let element = document.head.querySelector('script[type="application/ld+json"][data-seo="true"]')
  if (!schema) {
    if (element) element.remove()
    return
  }
  if (!element) {
    element = document.createElement('script')
    element.setAttribute('type', 'application/ld+json')
    element.setAttribute('data-seo', 'true')
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(schema, null, 2)
}

export default function Seo({
  title,
  description,
  path = '/',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schema = null,
}) {
  useEffect(() => {
    const fullUrl = `${DOMAIN}${path}`
    const fullTitle = title.includes('Ciji')
      ? title
      : `${title} | Ciji Bldg. Metalic Const. Ind. LLC`

    document.title = fullTitle

    setMetaTag('description', description)

    // Open Graph
    setMetaTag('og:title', fullTitle, 'property')
    setMetaTag('og:description', description, 'property')
    setMetaTag('og:url', fullUrl, 'property')
    setMetaTag('og:type', ogType, 'property')
    setMetaTag('og:site_name', 'Ciji Bldg. Metalic Const. Ind. LLC', 'property')
    setMetaTag('og:image', ogImage.startsWith('http') ? ogImage : `${DOMAIN}${ogImage}`, 'property')

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', fullTitle)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', ogImage.startsWith('http') ? ogImage : `${DOMAIN}${ogImage}`)

    // Canonical
    setCanonical(fullUrl)

    // JSON-LD Structured Data
    setJsonLd(schema)
  }, [title, description, path, ogType, ogImage, schema])

  return null
}
