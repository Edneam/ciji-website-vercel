import { services } from './services.js'

export const SITE = 'https://cijiintl.com'

const address = {
  '@type': 'PostalAddress',
  streetAddress: 'Industrial Area 17, Plot 39',
  addressLocality: 'Sharjah',
  addressRegion: 'Sharjah',
  addressCountry: 'AE',
  postOfficeBoxNumber: 'P.O. Box 44316',
}

const areaServed = [
  { '@type': 'City', name: 'Sharjah' },
  { '@type': 'City', name: 'Dubai' },
  { '@type': 'City', name: 'Abu Dhabi' },
  { '@type': 'Country', name: 'United Arab Emirates' },
]

/** Shared graph nodes, referenced by @id from every page. */
export function businessNodes() {
  return [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Ciji Bldg. Metalic Const. Ind. LLC',
      legalName: 'Ciji Bldg. Metalic Const. Ind. LLC',
      alternateName: ['C.J Group of Companies', 'Ciji Aluminium', 'CIJI'],
      description:
        'Aluminium and glass facade contractor in Sharjah and Dubai, designing, fabricating and installing curtain walling, structural glazing, skylights and cladding.',
      url: `${SITE}/`,
      logo: `${SITE}/images/logo.png`,
      image: `${SITE}/images/cover-1.jpg`,
      telephone: '+971-6-5355094',
      email: 'cijialum@yahoo.com',
      address,
      areaServed,
      knowsAbout: services.map((s) => s.title),
      parentOrganization: {
        '@type': 'Organization',
        name: 'C.J Group of Companies',
      },
      subOrganization: {
        '@type': 'Organization',
        name: 'C.J Tec Contracting LLC',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+971-6-5355094',
        email: 'cijialum@yahoo.com',
        contactType: 'sales',
        areaServed: 'AE',
        availableLanguage: 'English',
      },
    },
    {
      '@type': 'GeneralContractor',
      '@id': `${SITE}/#localbusiness`,
      name: 'Ciji Bldg. Metalic Const. Ind. LLC',
      description:
        'Aluminium and glass facade subcontractor serving Sharjah, Dubai and the wider UAE from its head office in Sharjah Industrial Area 17.',
      url: `${SITE}/`,
      logo: `${SITE}/images/logo.png`,
      image: `${SITE}/images/cover-1.jpg`,
      telephone: '+971-6-5355094',
      email: 'cijialum@yahoo.com',
      priceRange: '$$$',
      address,
      parentOrganization: { '@id': `${SITE}/#organization` },
      areaServed,
      hasMap: 'https://www.google.com/maps?q=Industrial+Area+17,+Sharjah,+UAE',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '19:00',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'Ciji Bldg. Metalic Const. Ind. LLC',
      publisher: { '@id': `${SITE}/#organization` },
      inLanguage: 'en',
    },
  ]
}
