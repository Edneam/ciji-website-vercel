import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage.jsx'
import { company, legalUpdated } from '../data/site.js'

/**
 * Cookie notice.
 *
 * Verified against the source before writing: there is no analytics script,
 * this site writes no cookies of its own, and it stores nothing in
 * localStorage or sessionStorage. The one third party is the Google Maps
 * frame on the contact page, which does set Google's own cookies once it
 * loads. Saying "we use cookies to improve your experience" here would be a
 * lie, and so would claiming no cookies are set at all, so the page
 * distinguishes our own storage from Google's.
 */
export default function Cookies() {
  return (
    <LegalPage
      title="Cookie notice"
      crumb="Cookies"
      lead="This website sets no cookies of its own and uses no analytics. The one exception is the Google Maps frame on our contact page, explained below."
      seoTitle="Cookie Notice"
      seoDescription="Cookie notice for Ciji Bldg. Metalic Const. Ind. LLC. This website sets no cookies of its own and uses no analytics software. The embedded Google Map on the contact page sets Google's own cookies."
      path="/cookies"
      updated={legalUpdated}
    >
      <h2>Summary</h2>
      <p>
        We set no cookies of our own and we do not track you. There is no analytics software on this
        site, no advertising network, and no social media tracking. The only cookies that can appear
        while you browse are Google&apos;s, set by the map frame on our contact page.
      </p>

      <h2>What we do not use</h2>
      <ul>
        <li>No Google Analytics or any other visitor analytics package.</li>
        <li>No advertising or remarketing cookies.</li>
        <li>No social media pixels or share-tracking scripts.</li>
        <li>No session cookies, because the site has no login or shopping basket.</li>
      </ul>

      <h2>Cookies set by Google Maps</h2>
      <p>
        Our <Link to="/contact">contact page</Link> embeds a Google Maps frame showing the head
        office. Google sets its own cookies in your browser when that frame loads, and receives your
        IP address and browser details. Those cookies belong to Google, not to us: we cannot read
        them, we get no information back from them, and they are covered by Google&apos;s privacy
        policy rather than this notice.
      </p>
      <p>
        This is the only third-party content on the site. The office address is also printed as plain
        text on the same page, so blocking third-party frames in your browser costs you nothing here.
      </p>

      <h2>Hosting logs</h2>
      <p>
        Our hosting provider keeps standard server logs of requests in order to serve the site and
        defend it against attack. These are not cookies and we do not use them to identify or
        profile visitors.
      </p>

      <h2>Managing storage in your browser</h2>
      <p>
        Every major browser lets you view and clear cookies and site data from its settings, and lets
        you block them per site. Since this site sets no cookies of its own, blocking cookies will not
        affect how it works. Blocking third-party cookies or frames stops the Google map from loading;
        everything else on the contact page, including the full postal address, still works.
      </p>

      <h2>Questions</h2>
      <p>
        For anything about this notice, contact{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a> or call {company.phone}. Our full{' '}
        <Link to="/privacy">privacy notice</Link> explains how enquiry details are handled.
      </p>
    </LegalPage>
  )
}
