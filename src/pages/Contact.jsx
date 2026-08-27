import { useState } from 'react'
import { Phone, Mail, Clock, MapPin, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  // No backend on a brochure site — compose a mailto so enquiries reach the client inbox.
  const submit = (e) => {
    e.preventDefault()
    const subject = `Quote Request — ${form.name}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <>
      <Seo
        title="Contact Us | Ciji Bldg. Metalic Const. Ind. LLC — Sharjah & Dubai Offices"
        description="Contact Ciji Bldg. Metalic Const. Ind. LLC for aluminium & glass fabrication enquiries and project quotes. Head office in Sharjah Industrial Area 17, Dubai office in Sky Business Centre."
        path="/contact"
        schema={contactSchema}
      />
      <PageHeader title="Contact Us" crumb="Contact" image="/images/projects/umm-al-shaif.jpg" />

      <section className="py-20 md:py-28">
        <div className="container-x">
          {/* info cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Phone, label: 'Give Us A Call', value: company.phone, href: company.phoneHref },
              { icon: Mail, label: 'Email Us', value: company.email, href: `mailto:${company.email}` },
              { icon: Clock, label: 'Working Hours', value: company.hours },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 100}>
                <div className="card-lift flex items-center gap-4 border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-navy-900 text-gold-400">
                    <c.icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-500">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="font-semibold text-navy-900 transition-colors hover:text-gold-500">
                        {c.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-navy-900">{c.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-2">
            {/* form */}
            <Reveal>
              <SectionHeading kicker="Get In Touch" title="Request a Quote" align="left" />
              <form onSubmit={submit} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    aria-required="true"
                    required
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={set('name')}
                    className="w-full border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-gold-500"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="sr-only">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-required="true"
                      required
                      placeholder="Email Address *"
                      value={form.email}
                      onChange={set('email')}
                      className="w-full border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="sr-only">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={set('phone')}
                      className="w-full border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-gold-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Project details *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    aria-required="true"
                    required
                    rows={5}
                    placeholder="Tell us about your project *"
                    value={form.message}
                    onChange={set('message')}
                    className="w-full border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-gold-500"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-gold-500 hover:text-navy-950"
                >
                  Send Message <Send size={16} />
                </button>
                {sent && (
                  <p className="text-sm font-semibold text-green-700">
                    Your email app should open with the message ready to send. Thank you!
                  </p>
                )}
              </form>
            </Reveal>

            {/* addresses + map */}
            <div>
              <Reveal delay={120}>
                <SectionHeading kicker="Find Us" title="Our Offices" align="left" />
                <div className="mt-8 space-y-6">
                  {company.offices.map((o) => (
                    <div key={o.city} className="flex gap-4 border-l-4 border-gold-500 bg-slate-50 p-6">
                      <MapPin size={24} className="shrink-0 text-navy-900" />
                      <div>
                        <h3 className="font-display font-bold text-navy-900">{o.city}</h3>
                        {o.lines.map((line) => (
                          <p key={line} className="text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={200} className="mt-8 bg-slate-100 shadow-lg">
                <iframe
                  title="CIJI location — Industrial Area 17, Sharjah"
                  src="https://www.google.com/maps?q=Industrial%20Area%2017%2C%20Sharjah%2C%20UAE&output=embed"
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
