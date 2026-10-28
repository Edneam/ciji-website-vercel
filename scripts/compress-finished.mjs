import { createRequire } from 'node:module'
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sharpRoot = process.env.SHARP_ROOT
if (!sharpRoot) {
  console.error('SHARP_ROOT is not set')
  process.exit(1)
}

const require = createRequire(join(sharpRoot, 'package.json'))
const sharp = require('sharp')
sharp.cache(false)
sharp.concurrency(2)

const sourceRoot = join(root, 'public', 'images', 'CIJI FINISHED')
const outDir = join(root, 'public', 'images', 'finished')
const manifestPath = join(root, 'src', 'data', 'finished-photos.json')

/** Folder name from the supplied set → stable public slug. Staff portraits are omitted. */
const SLUGS = {
  '243': 'plot-3342413',
  '244': 'plot-3342417',
  '247': 'plot-3342938',
  '28 VILLA': 'al-bada-villas',
  'ACADEMIC CITY': 'al-rowaiyah-housing',
  'AL ADER JVC': 'al-ader-jvc',
  'AL BADER': 'oud-metha-residential',
  'AL BUHAIRA FURJAN': 'al-furjan-tower',
  'AL BURARI': 'al-jadaf-tower',
  AROMA: 'aroma-building',
  BDC: 'al-barsha-south-tower',
  'BINDAL AL MUK CJ TEC': 'bindal-al-muk',
  'CITADEL HOTEL': 'citadel-hotel',
  'CJ SATWA': 'cj-satwa',
  DEYYAR: 'deyyar',
  ELYCEE: 'elysee-heights',
  H2: 'wadi-al-safa-g4',
  HASSAN: 'wadi-al-safa-bg4',
  IC3: 'international-city',
  IMAN: 'al-barsha-gp5',
  'IMAN  4': 'jvc-bg4',
  'IMAN 2': 'oxford-gardens-2',
  MAJID: 'al-satwa-tower',
  'MEYDAN AL HILAL': 'meydan',
  'MH ED': 'mh-ed',
  'NEAR CITADEL': 'near-citadel',
  'OXFORD 10': 'al-barsha-bg5',
  'OXFORD TERRACE': 'oxford-terraces',
  'PENROSE PALACE': 'penrose-palace',
  'SEGREX 1': 'jvc-10aa-003',
  'SEGREX 2': 'jvc-10aa-004',
  'SEGREX 3': 'jvc-10b-001',
  SIROUS: 'wadi-al-safa-3',
  'STAFF ACCOMADATION': 'jumeirah-staff',
  VALORES: 'jebel-ali-mixed',
}

function isBuildingPhoto(name) {
  if (/whatsapp/i.test(name)) return false
  return /\.jpe?g(\.jpeg)?$/i.test(name)
}

mkdirSync(outDir, { recursive: true })

const jobs = []
for (const [folder, slug] of Object.entries(SLUGS)) {
  const dir = join(sourceRoot, folder)
  let names
  try {
    names = readdirSync(dir)
  } catch (error) {
    console.error(`Missing folder: ${folder}`)
    console.error(error.message)
    process.exit(1)
  }
  const files = names.filter(isBuildingPhoto).sort((a, b) => a.localeCompare(b, 'en'))
  if (files.length === 0) {
    console.error(`No building photographs in ${folder}`)
    process.exit(1)
  }
  files.forEach((file, index) => {
    jobs.push({
      slug,
      file,
      input: join(dir, file),
      output: join(outDir, `${slug}-${index + 1}.jpg`),
      src: `/images/finished/${slug}-${index + 1}.jpg`,
    })
  })
}

const skipped = readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !SLUGS[entry.name])
  .map((entry) => entry.name)
if (skipped.length) console.log(`Skipped folders: ${skipped.join(', ')}`)

async function compress(job) {
  const info = await sharp(job.input)
    .rotate()
    .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(job.output)
  console.log(
    `${String(Math.round(info.size / 1024)).padStart(5)}KB  ${info.width}x${info.height}  ${job.slug}  ${job.file}`,
  )
  return { slug: job.slug, src: job.src, width: info.width, height: info.height, bytes: info.size }
}

const frames = []
for (let i = 0; i < jobs.length; i += 2) {
  const done = await Promise.all(jobs.slice(i, i + 2).map((job) => compress(job)))
  frames.push(...done)
}

const manifest = {}
for (const frame of frames) {
  if (!manifest[frame.slug]) manifest[frame.slug] = []
  manifest[frame.slug].push({ src: frame.src, width: frame.width, height: frame.height })
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)

const totalMb = frames.reduce((sum, frame) => sum + frame.bytes, 0) / 1024 / 1024
console.log(
  `Wrote ${frames.length} photographs across ${Object.keys(manifest).length} projects (${totalMb.toFixed(1)}MB)`,
)
console.log(`Manifest: ${manifestPath}`)
