import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, EnvelopeSimple, Clock, MapPin, PaperPlaneTilt } from '@phosphor-icons/react'
import PageHeader from '../components/PageHeader.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import { company } from '../data/site.js'

const contactSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cijialuminium.com/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://cijialuminium.com/contact' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Ciji Bldg. Metalic Const. Ind. LLC',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Ciji Bldg. Metalic Const. Ind. LLC',
      telephone: '+971-06-5355094',
      email: 'cijialum@yahoo.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Industrial Area 17, Plot 39',
        addressLocality: 'Sharjah',
        addressCountry: 'AE',
      },
    },
  },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_CLASS =
  'w-full border border-steel-300 bg-white px-4 py-3 text-navy-950 outline-none transition-colors placeholder:text-steel-400 focus:border-gold-500'
const FIELD_ERROR_CLASS = 'border-red-700 bg-red-50'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', scope: '', message: '' })
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name so we know who to reply to.'
    if (!form.email.trim()) next.email = 'Enter an email address for our reply.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Check the email address format.'
    if (!form.message.trim()) next.message = 'Describe the scope so we can price it.'
    if (!consent) next.consent = 'Please confirm you agree to us using these details to reply.'
    return next
  }

  /* Static hosting, so there is no server to post to. The form composes a
     complete enquiry and hands it to the visitor's mail client. */
  const submit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`contact-${Object.keys(found)[0]}`)
      if (first) first.focus()
      return
    }

    const subject = `Quote request: ${form.scope || 'facade package'} (${form.name})`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || 'not provided'}`,
      `Scope: ${form.scope || 'not specified'}`,
      '',
      form.message,
    ].join('\n')

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <Seo
        title="Contact | Request a Facade Quote, Sharjah and Dubai"
        description="Contact Ciji Bldg. Metalic Const. Ind. LLC for aluminium and glass facade quotes. Head office in Sharjah Industrial Area 17, second office in Dubai. Call +971 06 5355094."
        path="/contact"
        schema={contactSchema}
      />
      <PageHeader
        title="Contact us"
        crumb="Contact"
        lead="Send drawings or a scope description and we will come back with a priced facade package."
        image="/images/projects/umm-al-shaif.jpg"
      />

      {/* ---- Direct contact routes as a hairline data row, not three
              bordered cards. ---- */}
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
                <c.icon size={16} weight="regular" className="shrink-0 text-gold-700" />
                <h2 className="spec-label">{c.label}</h2>
              </div>
              {c.href ? (
                <a
                  href={c.href}
                  className={`link-slide mt-3 inline-block font-semibold text-navy-950 transition-colors hover:text-gold-700 ${
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

      {/* ---- Enquiry form with visible labels and inline errors, beside the
              offices. Placeholder-as-label removed. ---- */}
      <section className="py-20 md:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              title="Request a quote"
              sub="Tell us the building type and the scope you need priced. Drawings can follow by email once you send this."
            />

            <form onSubmit={submit} noValidate className="mt-9 space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-semibold text-navy-950"
                >
                  Your name <span className="text-gold-700">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  value={form.name}
                  onChange={set('name')}
                  className={`mt-2 ${FIELD_CLASS} ${errors.name ? FIELD_ERROR_CLASS : ''}`}
                />
                {errors.name ? (
                  <p id="contact-name-error" className="mt-2 text-sm font-medium text-red-700">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-navy-950"
                  >
                    Email <span className="text-gold-700">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    value={form.email}
                    onChange={set('email')}
                    className={`mt-2 ${FIELD_CLASS} ${errors.email ? FIELD_ERROR_CLASS : ''}`}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="mt-2 text-sm font-medium text-red-700">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-semibold text-navy-950"
                  >
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    className={`mt-2 ${FIELD_CLASS}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-scope" className="block text-sm font-semibold text-navy-950">
                  Scope required
                </label>
                <select
                  id="contact-scope"
                  name="scope"
                  value={form.scope}
                  onChange={set('scope')}
                  className={`mt-2 ${FIELD_CLASS}`}
                >
                  <option value="">Select a package</option>
                  <option>Curtain walling / structural glazing</option>
                  <option>Spider glazing</option>
                  <option>Skylight or space frame</option>
                  <option>Aluminium cladding</option>
                  <option>Glass partitions</option>
                  <option>Doors, windows or gates</option>
                  <option>Handrails or balustrades</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-semibold text-navy-950"
                >
                  Project details <span className="text-gold-700">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : 'contact-message-hint'
                  }
                  value={form.message}
                  onChange={set('message')}
                  className={`mt-2 ${FIELD_CLASS} ${errors.message ? FIELD_ERROR_CLASS : ''}`}
                />
                {errors.message ? (
                  <p id="contact-message-error" className="mt-2 text-sm font-medium text-red-700">
                    {errors.message}
                  </p>
                ) : (
                  <p id="contact-message-hint" className="mt-2 text-sm text-steel-500">
                    Building type, storeys, approximate area and programme dates all help.
                  </p>
                )}
              </div>

              {/* Explicit, unticked consent. Required before the enquiry can
                  be composed, and it names exactly what the details are used
                  for rather than a blanket agreement. */}
              <div className="border-t border-steel-200 pt-6">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    name="consent"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked)
                      setErrors((prev) => (prev.consent ? { ...prev, consent: undefined } : prev))
                    }}
                    aria-invalid={errors.consent ? 'true' : undefined}
                    aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
                    className="mt-1 h-[18px] w-[18px] shrink-0 accent-gold-600"
                  />
                  <label htmlFor="contact-consent" className="text-sm leading-relaxed">
                    I agree that CIJI may use the details above to respond to this enquiry, as
                    described in the{' '}
                    <Link
                      to="/privacy"
                      className="font-medium text-navy-950 underline decoration-gold-500 decoration-2 underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    . <span className="text-gold-700">*</span>
                  </label>
                </div>
                {errors.consent ? (
                  <p id="contact-consent-error" className="mt-2 text-sm font-medium text-red-700">
                    {errors.consent}
                  </p>
                ) : null}
              </div>

              <button type="submit" className="btn btn-invert">
                Send enquiry <PaperPlaneTilt size={16} weight="fill" aria-hidden="true" />
              </button>

              <p role="status" aria-live="polite" className="min-h-6">
                {sent ? (
                  <span className="border-l-2 border-gold-500 bg-steel-50 px-4 py-3 text-sm font-medium text-navy-950">
                    Your email application is opening with the enquiry filled in. Send it and we
                    will reply from {company.email}.
                  </span>
                ) : null}
              </p>
            </form>
          </Reveal>

          {/* offices + map */}
          <div>
            <Reveal delay={120}>
              <h2 className="spec-label">Offices</h2>
              <dl className="mt-5">
                {company.offices.map((o) => (
                  <div key={o.city} className="border-t border-steel-200 py-6 first:border-t-0 first:pt-0">
                    <dt className="flex items-center gap-2.5 font-display font-bold uppercase tracking-wide text-navy-950">
                      <MapPin size={16} weight="regular" className="shrink-0 text-gold-700" />
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
