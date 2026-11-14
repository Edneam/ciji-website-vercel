import { useState } from 'react'
import { Check, Copy, EnvelopeSimple, Phone, Clock, MapPin } from '@phosphor-icons/react'
import PageHeader from '../components/PageHeader.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import { company } from '../data/site.js'

const contactSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cijiintl.com/' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://cijiintl.com/contact' },
  ],
}

const include = [
  'Building type, location and approximate floor area',
  'Drawings, elevations or a marked-up sketch',
  'The facade scope: curtain wall, glazing, cladding, doors or windows',
  'Programme dates, if you have them',
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(company.email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="dns-prefetch" href="https://www.google.com" />
      <Seo
        title="Request a Facade Quote in Sharjah | CIJI"
        description="Call or email CIJI for an aluminium and glass facade quote. Head office in Sharjah Industrial Area 17 and a second office in Dubai. Call +971 06 5355094."
        path="/contact"
        lcpImage="/images/finished/citadel-hotel-1.jpg"
        pageType="ContactPage"
        schema={contactSchema}
      />
      <PageHeader
        title="Contact us"
        crumb="Contact"
        lead="Call the Sharjah office or email the drawings. We price the facade package from what you send."
        image="/images/finished/citadel-hotel-1.jpg"
      />

      <section className="border-b border-steel-200">
        <div className="container-x grid gap-px sm:grid-cols-3">
          {[
            {
              icon: Phone,
              label: 'Telephone',
              value: company.phone,
              href: company.phoneHref,
              mono: true,
            },
            {
              icon: EnvelopeSimple,
              label: 'Email',
              value: company.email,
              href: `mailto:${company.email}`,
              mono: true,
            },
            { icon: Clock, label: 'Office hours', value: company.hours },
          ].map((c, i) => (
            <Reveal
              key={c.label}
              delay={i * 80}
              className={`py-8 sm:py-10 ${i > 0 ? 'sm:border-l sm:border-steel-200 sm:pl-8' : ''} ${
                i > 0 ? 'border-t border-steel-200 sm:border-t-0' : ''
              }`}
            >
              <div className="flex items-center gap-2.5">
                <c.icon size={16} weight="regular" aria-hidden="true" className="shrink-0 text-gold-700" />
                <h2 className="spec-label">{c.label}</h2>
              </div>
              {c.href ? (
                <a
                  href={c.href}
                  className={`link-slide mt-3 inline-block font-semibold whitespace-nowrap text-navy-950 transition-colors hover:text-gold-700 ${
                    c.mono ? 'font-mono text-[16px]' : ''
                  }`}
                >
                  {c.value}
                </a>
              ) : (
                <p className="mt-3 font-semibold text-navy-950">{c.value}</p>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading
                title="Request a price"
                sub="Call the office, or email the drawings to the address above. We reply with a priced facade package."
              />
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={company.phoneHref} className="btn btn-primary">
                  <Phone size={16} weight="bold" aria-hidden="true" />
                  Call the office
                </a>
                <a href={`mailto:${company.email}`} className="btn btn-outline-dark">
                  <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />
                  Email the drawings
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-gold-700"
              >
                <Copy size={15} weight="bold" aria-hidden="true" />
                {copied ? 'Email address copied' : 'Copy email address'}
              </button>
              <p role="status" aria-live="polite" className="sr-only">
                {copied ? `Copied ${company.email}` : ''}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <h3 className="font-display mt-14 text-xl font-bold uppercase tracking-tight text-navy-950">
                What to include
              </h3>
              <ul className="mt-6">
                {include.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 border-t border-steel-200 py-4 last:border-b last:border-steel-200"
                  >
                    <Check size={18} weight="bold" aria-hidden="true" className="mt-0.5 shrink-0 text-gold-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal delay={120}>
              <h2 className="spec-label">Offices</h2>
              <dl className="mt-5">
                {company.offices.map((o) => (
                  <div key={o.city} className="border-t border-steel-200 py-6 first:border-t-0 first:pt-0">
                    <dt className="flex items-center gap-2.5 font-display font-bold uppercase tracking-wide text-navy-950">
                      <MapPin size={16} weight="regular" aria-hidden="true" className="shrink-0 text-gold-700" />
                      {o.city}
                    </dt>
                    <dd className="mt-2 pl-[26px] text-sm leading-relaxed text-steel-500">
                      {o.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={200} className="mt-4">
              <MapEmbed />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
