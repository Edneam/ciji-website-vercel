import framesBySlug from './finished-photos.json'

/**
 * Recent finished work, photographed in 2026.
 * Titles, places and contractors are taken from the drawing title blocks
 * supplied with the photographs. Private client names are not published.
 * `images` is every compressed frame; `image` is the cover.
 */
const finished = [
  {
    slug: 'elysee-heights',
    title: 'Elysee Heights',
    contractor: 'M/s. Alserh Alkabeer Construction L.L.C.',
    location: 'Jumeirah Village Circle, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'al-bada-villas',
    title: '28 Villas and Community Centre',
    contractor: 'M/s. Aroma International Building Contracting LLC',
    location: 'Al Bada, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'oxford-terraces',
    title: 'Oxford Terraces',
    contractor: '',
    location: 'Dubai Hills, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'citadel-hotel',
    title: 'Citadel Hotel',
    contractor: '',
    location: 'UAE',
    category: 'Commercial',
  },
  {
    slug: 'penrose-palace',
    title: 'Penrose Place',
    contractor: '',
    location: 'Jumeirah Village Circle, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'international-city',
    title: 'Residential Building, International City',
    contractor: 'M/s. C.J Tec Contracting LLC',
    location: 'International City, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'al-rowaiyah-housing',
    title: 'Off-Campus Student Housing',
    contractor: 'M/s. The Myriad Dubai',
    location: 'Al Rowaiyah, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'oud-metha-residential',
    title: 'G+2P+11 Residential Building',
    contractor: 'M/s. Al Badr Contracting L.L.C.',
    location: 'Oud Metha, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'al-furjan-tower',
    title: 'B+G+2P+10 Residential Building',
    contractor: 'M/s. Al Buhaira Contracting Co.',
    location: 'Al Furjan, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'al-jadaf-tower',
    title: 'Commercial and Residential Building',
    contractor: 'M/s. Al Buhaira Contracting Co.',
    location: 'Al Jadaf, Dubai, UAE',
    category: 'Commercial',
  },
  {
    slug: 'al-barsha-south-tower',
    title: 'G+4P+10 Residential Building',
    contractor: 'M/s. C.J Tec Contracting LLC',
    location: 'Al Barsha South, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'al-barsha-gp5',
    title: 'G+P+5 Residential Building',
    contractor: 'M/s. C.J Tec Contracting LLC',
    location: 'Al Barsha South, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'oxford-gardens-2',
    title: 'Oxford Gardens 2',
    contractor: '',
    location: 'Al Barsha South, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'al-barsha-bg5',
    title: 'B+G+5 Residential Building',
    contractor: 'M/s. Ashiyana Contracting LLC',
    location: 'Al Barsha South, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'jvc-bg4',
    title: 'B+G+4 Residential Building',
    contractor: 'M/s. C.J Tec Contracting LLC',
    location: 'Jumeirah Village Circle, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'jvc-10aa-003',
    title: '4B+G+10 Residential Building',
    contractor: 'M/s. Aroma International Building Contracting LLC',
    location: 'Plot 10AA-003, Jumeirah Village Circle, Dubai',
    category: 'Residential',
  },
  {
    slug: 'jvc-10aa-004',
    title: '4B+G+10 Residential Building',
    contractor: 'M/s. Aroma International Building Contracting LLC',
    location: 'Plot 10AA-004, Jumeirah Village Circle, Dubai',
    category: 'Residential',
  },
  {
    slug: 'jvc-10b-001',
    title: '4B+G+8 Residential Building',
    contractor: 'M/s. Aroma International Building Contracting LLC',
    location: 'Plot 10B-001, Jumeirah Village Circle, Dubai',
    category: 'Residential',
  },
  {
    slug: 'al-ader-jvc',
    title: 'Al Ader Residential Tower',
    contractor: '',
    location: 'Jumeirah Village Circle, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'al-satwa-tower',
    title: 'G+2P+8 Residential Building',
    contractor: 'M/s. C.J Tec Contracting LLC',
    location: 'Al Satwa, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'cj-satwa',
    title: 'Residential Building, Satwa',
    contractor: '',
    location: 'Satwa, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'wadi-al-safa-g4',
    title: 'G+4 Residential Building',
    contractor: '',
    location: 'Wadi Al Safa, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'wadi-al-safa-bg4',
    title: 'B+G+4 Residential Building',
    contractor: 'M/s. C.J Tec Contracting LLC',
    location: 'Wadi Al Safa, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'wadi-al-safa-3',
    title: 'B+G+5 Commercial and Residential Building',
    contractor: 'M/s. C.J Tec Contracting LLC',
    location: 'Wadi Al Safa, Dubai, UAE',
    category: 'Commercial',
  },
  {
    slug: 'jebel-ali-mixed',
    title: 'Retail and Residential Building',
    contractor: 'M/s. Aroma International Building Contracting LLC',
    location: 'Jebel Ali, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'jumeirah-staff',
    title: 'G+1 Staff Residence',
    contractor: 'M/s. Aroma International Building Contracting LLC',
    location: 'Jumeirah First, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'plot-3342413',
    title: 'G+P+8 Residential Building',
    contractor: 'M/s. Aroma International Building Contracting LLC',
    location: 'Plot 3342413, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'plot-3342417',
    title: 'G+P+8 Residential Building',
    contractor: 'M/s. Aroma International Building Contracting LLC',
    location: 'Plot 3342417, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'plot-3342938',
    title: 'G+P+8 Residential Building',
    contractor: 'M/s. Aroma International Building Contracting LLC',
    location: 'Plot 3342938, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'aroma-building',
    title: 'Aroma Residential Tower',
    contractor: '',
    location: 'Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'bindal-al-muk',
    title: 'Bindal Al Muk',
    contractor: 'M/s. C.J Tec Contracting LLC',
    location: 'UAE',
    category: 'Residential',
  },
  {
    slug: 'deyyar',
    title: 'Deyyar',
    contractor: '',
    location: 'UAE',
    category: 'Residential',
  },
  {
    slug: 'meydan',
    title: 'Sama Meydan',
    contractor: '',
    location: 'Meydan, Dubai, UAE',
    category: 'Residential',
  },
  {
    slug: 'mh-ed',
    title: 'MH Edition',
    contractor: '',
    location: 'UAE',
    category: 'Residential',
  },
  {
    slug: 'near-citadel',
    title: 'Residential Building near Citadel',
    contractor: '',
    location: 'UAE',
    category: 'Residential',
  },
]

function withFrames(entry) {
  const frames = framesBySlug[entry.slug]
  if (!frames?.length) return null
  const [cover] = frames
  return {
    title: entry.title,
    contractor: entry.contractor,
    location: entry.location,
    category: entry.category,
    image: cover.src,
    width: cover.width,
    height: cover.height,
    images: frames,
  }
}

export const projects = finished.map(withFrames).filter(Boolean)

/** The catalogue this site published before the 2026 photograph set. */
export const earlierProjects = [
  { title: 'IC3 Tower', contractor: '', location: 'Dubai, UAE', category: 'Commercial', image: '/images/projects/ic3-tower.jpg', width: 1280, height: 1091 },
  { title: 'G+8 Residential Building, Satwa', contractor: '', location: 'Satwa, Dubai, UAE', category: 'Residential', image: '/images/projects/satwa-g8.jpg', width: 1157, height: 1280 },
  { title: 'Residential Building, Jumeirah Village Triangle', contractor: '', location: 'JVT, Dubai, UAE', category: 'Residential', image: '/images/projects/jvt-residential.jpg', width: 1280, height: 636 },
  { title: 'Mag Building', contractor: '', location: 'Dubai, UAE', category: 'Commercial', image: '/images/projects/mag-building.jpg', width: 1280, height: 847 },
  { title: 'Ohana Building', contractor: '', location: 'Dubai, UAE', category: 'Residential', image: '/images/projects/ohana-building.jpg', width: 1280, height: 847 },
  { title: 'Pivot Building', contractor: '', location: 'Dubai, UAE', category: 'Commercial', image: '/images/projects/pivot-building.jpg', width: 1280, height: 847 },
  { title: 'Titan Building', contractor: '', location: 'Sharjah, UAE', category: 'Commercial', image: '/images/projects/titan-building.jpg', width: 1280, height: 749 },
  { title: 'Umm Al Shaif', contractor: '', location: 'UAE', category: 'Residential', image: '/images/projects/umm-al-shaif.jpg', width: 1280, height: 847 },
  { title: 'Cold Stores Facility', contractor: '', location: 'Dubai, UAE', category: 'Industrial', image: '/images/projects/cold-stores.jpg', width: 1280, height: 847 },
  { title: 'Enviroserve Facility', contractor: '', location: 'Dubai, UAE', category: 'Industrial', image: '/images/projects/enviroserve.jpg', width: 1280, height: 633 },
  { title: 'Large-Span Warehouse', contractor: '', location: 'Jebel Ali, Dubai, UAE', category: 'Industrial', image: '/images/projects/warehouse-large.jpg', width: 360, height: 297 },
  { title: 'Buhaira G+14, Jadaf', contractor: 'M/s. Al Buhaira Contracting Co. LLC', location: 'Jadaf, Dubai, UAE', category: 'Residential', image: '/images/projects/buhaira-jadaf.jpg', width: 390, height: 380 },
  { title: 'Jadaf G+7 Tower', contractor: '', location: 'Jadaf, Dubai, UAE', category: 'Residential', image: '/images/projects/jadaf-g7.jpg', width: 390, height: 380 },
  { title: 'JVC Aroma Residential', contractor: 'M/s. Aroma International Building Contracting LLC', location: 'JVC, Dubai, UAE', category: 'Residential', image: '/images/projects/jvc-aroma.jpg', width: 390, height: 380 },
  { title: 'La Casa Residences', contractor: '', location: 'Dubai, UAE', category: 'Residential', image: '/images/projects/lacasa.jpg', width: 390, height: 380 },
  { title: 'Pantheon Building', contractor: '', location: 'Dubai, UAE', category: 'Residential', image: '/images/projects/pantheon.jpg', width: 390, height: 380 },
  { title: 'Rowad Al Jazeera Building', contractor: '', location: 'Sharjah, UAE', category: 'Residential', image: '/images/projects/rowad-al-jazeera.jpg', width: 390, height: 380 },
  { title: 'Dubai Walls Project', contractor: '', location: 'Dubai, UAE', category: 'Commercial', image: '/images/projects/dubai-walls.jpg', width: 390, height: 380 },
]

export function imageSlug(src) {
  const file = src.split('/').pop() || ''
  return file.replace(/\.[^.]+$/, '')
}

// Flagship references from the C.J Group track record (shown on Home)
export const featured = [
  { title: 'VVIP Terminal, Abu Dhabi Intl. Airport', mainContractor: 'M/s. Pravarthy Building Contracting', location: 'Abu Dhabi, UAE' },
  { title: 'Chennai Airport Expansion', mainContractor: 'M/s. Harve Pomerleau Intl. Consolidated Consortium Ltd. (JV)', location: 'Chennai, India' },
  { title: 'CNBM Dubai Logistics Complex', mainContractor: 'M/s. China State Construction Eng. Corporation', location: 'Jebel Ali, Dubai, UAE' },
  { title: 'Telecommunication Regulatory Authority', mainContractor: 'M/s. Aroma International Building Contracting LLC', location: 'Jebel Ali, Dubai, UAE' },
  { title: 'Hydro Middle East', mainContractor: 'M/s. Pravarthy Building Contracting', location: 'Techno Park, Dubai, UAE' },
  { title: 'Unomat International FZCO', mainContractor: 'M/s. Pravarthi Building Contracting LLC', location: 'JAFZA, Dubai, UAE' },
]
