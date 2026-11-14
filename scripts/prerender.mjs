import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const entry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
const { render } = await import(entry)

const HEAD_TAG =
  /<title>[\s\S]*?<\/title>|<script\b[^>]*type="application\/ld\+json"[\s\S]*?<\/script>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>/gi

function keepTag(tag) {
  const lower = tag.toLowerCase()
  if (lower.startsWith('<title') || lower.startsWith('<meta') || lower.startsWith('<script')) return true
  if (lower.includes('rel="canonical"') || lower.includes('rel="alternate"')) return true
  if (lower.includes('rel="preconnect"') || lower.includes('rel="dns-prefetch"')) return true
  if (lower.includes('data-lcp')) return true
  return false
}

function normalize(html) {
  return html.replaceAll('fetchPriority=', 'fetchpriority=').replaceAll('hrefLang=', 'hreflang=')
}

const routes = [
  ['/', 'index.html'],
  ['/about', 'about.html'],
  ['/services', 'services.html'],
  ['/projects', 'projects.html'],
  ['/contact', 'contact.html'],
  ['/privacy', 'privacy.html'],
  ['/cookies', 'cookies.html'],
  ['/terms', 'terms.html'],
  ['/no-such-page', '404.html'],
]

function extractHead(html) {
  const tags = []
  const body = html.replace(HEAD_TAG, (tag) => {
    if (keepTag(tag)) tags.push(tag)
    return ''
  })
  return { body, tags }
}

for (const [url, file] of routes) {
  const rendered = render(url)
  const { body, tags } = extractHead(rendered)
  if (!tags.some((tag) => tag.toLowerCase().startsWith('<title'))) {
    console.error(`Prerender missing <title> for ${url}`)
    process.exit(1)
  }
  const headBlock = `<!--seo-start-->\n    ${tags.join('\n    ')}\n    <!--seo-end-->`
  const rootBlock = `<div id="root">${body}</div>`
  // Function replacers, so `$` in JSON-LD (priceRange) is written literally.
  const html = template
    .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, () => headBlock)
    .replace('<div id="root"></div>', () => rootBlock)
  const target = join(dist, file)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, normalize(html))
  console.log(`prerendered ${url} -> ${file} (${tags.length} head tags)`)
}
