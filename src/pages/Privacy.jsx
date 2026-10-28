import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage.jsx'
import { company, legalUpdated } from '../data/site.js'

/**
 * Privacy notice.
 *
 * Every statement here describes what the site actually does, verified
 * against the source: no analytics, no cookies, no localStorage, no
 * tracking pixels, and no enquiry form. Visitors call or email the office
 * directly. The only third-party request is the Google Maps embed on the
 * contact page, which loads with the page.
 */
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy notice"
      crumb="Privacy"
      lead="How Ciji Bldg. Metalic Const. Ind. LLC handles personal information submitted through this website."
      seoTitle="Privacy Notice"
      seoDescription="Privacy notice for Ciji Bldg. Metalic Const. Ind. LLC: what personal data the website collects, how enquiry details are used, and how to request deletion."
      path="/privacy"
      updated={legalUpdated}
    >
      <h2>Who we are</h2>
      <p>
        This website is operated by <strong translate="no">{company.name}</strong>, part of{' '}
        <span translate="no">{company.group}</span>. Our
        head office is at Industrial Area 17, Plot 39, Opp. Al Alif Marbles, P.O Box 44316,
        Sharjah, United Arab Emirates.
      </p>
      <p>
        For any question about this notice or about personal information held about you, contact us
        at <a href={`mailto:${company.email}`}>{company.email}</a> or {company.phone}.
      </p>

      <h2>What this website collects</h2>
      <p>
        The website itself does not collect or store personal information. It has no accounts, no
        login, no newsletter signup and no e-commerce. Specifically:
      </p>
      <ul>
        <li>We do not use analytics or visitor-tracking software.</li>
        <li>We do not set cookies of our own.</li>
        <li>We do not use advertising or social media tracking pixels.</li>
        <li>We do not build visitor profiles or sell data to anyone.</li>
      </ul>

      <h2>How you contact us</h2>
      <p>
        The <Link to="/contact">contact page</Link> has no form and does not store messages. To ask
        for a price, call or email the office using the details published there. If you email us, we
        receive whatever you choose to send, such as your name, a telephone number, drawings and a
        description of the facade scope.
      </p>

      <h2>Why we hold it and for how long</h2>
      <p>
        We use enquiry details for one purpose: to respond to your enquiry, prepare a quotation, and
        correspond about the project. This is a legitimate business interest in responding to
        someone who has contacted us. We do not add enquiry addresses to a marketing list.
      </p>
      <p>
        Enquiry correspondence is retained while the enquiry or resulting project is active, and
        afterwards for as long as we are required to keep commercial records under UAE law. You can
        ask us to delete your enquiry sooner, and we will unless we are legally required to retain it.
      </p>

      <h2>Who else sees it</h2>
      <p>
        Enquiry emails are handled by our email provider and are visible only to staff who need them
        to prepare a response. We do not share enquiry details with third parties for marketing. We
        may share information where we are legally obliged to, or where it is necessary for a project
        you have engaged us on, for example with a main contractor you named in your enquiry.
      </p>

      <h2>The map on our contact page</h2>
      <p>
        Our contact page embeds a Google Maps frame showing the head office location. When that frame
        loads, Google receives your IP address and browser information and may set its own cookies in
        your browser. That processing is carried out by Google and is governed by Google&apos;s own
        privacy policy, not ours. We receive nothing from it.
      </p>
      <p>
        The full postal address is also printed as plain text on the same page, so you do not need to
        interact with the map to find us. If you would rather not load it at all, browser settings and
        extensions that block third-party frames will stop it, and the rest of the page still works.
      </p>

      <h2>Hosting</h2>
      <p>
        The site is served as static files by a hosting provider. Like virtually all web hosts, the
        provider processes technical connection data such as IP addresses in server logs in order to
        deliver the site and protect it from abuse. We do not use those logs to identify visitors.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us what personal information we hold about you, ask us to correct it, ask us to
        delete it, or object to our use of it. Write to{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a> and we will respond. If you are in a
        jurisdiction with a data protection authority, you also have the right to complain to it.
      </p>

      <h2>Children</h2>
      <p>
        This is a business-to-business construction website and is not directed at children. We do
        not knowingly collect information from children.
      </p>

      <h2>Changes</h2>
      <p>
        If we change how the site handles information, we will update this page and the revision
        date at the top of it.
      </p>
    </LegalPage>
  )
}
