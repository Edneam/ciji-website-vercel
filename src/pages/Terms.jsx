import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage.jsx'
import { company, legalUpdated } from '../data/site.js'

/**
 * Terms of use.
 *
 * Scope note: this site is a company brochure. It takes no payments, has no
 * checkout, no accounts and no downloads for sale. So this page covers use of
 * the website and the status of quotations, and states plainly that no
 * consumer sale happens here rather than inventing a refund procedure that
 * would not apply to anything.
 */
export default function Terms() {
  return (
    <LegalPage
      title="Terms of use"
      crumb="Terms"
      lead="These terms cover the use of this website and the status of information published on it, including quotations."
      seoTitle="Terms of Use"
      seoDescription="Terms of use for the Ciji Bldg. Metalic Const. Ind. LLC website, covering permitted use, quotations, intellectual property and governing law in the UAE."
      path="/terms"
      updated={legalUpdated}
    >
      <h2>Who these terms are with</h2>
      <p>
        This website is operated by <span translate="no">{company.name}</span>, part of{' '}
        <span translate="no">{company.group}</span>, with its head office at
        Industrial Area 17, Plot 39, Sharjah, United Arab Emirates. By using the site you accept
        these terms. If you do not accept them, please do not use the site.
      </p>

      <h2>What this website is</h2>
      <p>
        This site presents our aluminium and glass contracting services and a selection of completed
        projects. It is provided for general information to help you decide whether to contact us.
      </p>
      <p>
        No sales, payments or orders are taken through this website. There is no checkout, no
        account, no subscription and no paid download. Because nothing is bought here, there is no
        online purchase to cancel or refund.
      </p>

      <h2>Quotations are not offers or contracts</h2>
      <p>
        Any figure, indication or budget we publish or send in response to an enquiry is an estimate
        for discussion. It does not form a contract. Nothing on this website constitutes a binding
        offer to supply.
      </p>
      <p>
        Work is carried out only under a separately signed contract, purchase order or
        subcontract agreement recording the agreed scope, specification, price, programme, payment
        terms and cancellation terms for that project. Those documents govern the commercial
        relationship, not this website. Where a signed contract conflicts with this page, the signed
        contract prevails.
      </p>

      <h2>Accuracy of information</h2>
      <p>
        We take care to keep the site accurate, but product descriptions, technical capability
        statements and project details are general summaries. They are not a specification and should
        not be relied upon for design, tender or construction purposes. Always confirm requirements
        with us in writing for your specific project.
      </p>
      <p>
        We may change, add to or remove content at any time without notice.
      </p>

      <h2>Permitted use</h2>
      <ul>
        <li>You may view, download and print pages for your own enquiry or procurement purposes.</li>
        <li>
          You may not copy, republish or use our content, photographs or project references for
          commercial purposes without our written permission.
        </li>
        <li>
          You may not attempt to gain unauthorised access to the site or any server it depends on,
          probe it for vulnerabilities without permission, or interfere with its normal operation.
        </li>
        <li>
          You may not present yourself as, or imply an association with, {company.name} or{' '}
          {company.group} without our written agreement.
        </li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The company names, logos, page content and project photography on this site belong to{' '}
        {company.group} or are used by us with permission. Third-party names appearing as main
        contractors on our reference list remain the property of their respective owners and are
        shown only to describe the contractual context of completed work.
      </p>

      <h2>Liability</h2>
      <p>
        We provide this website on an &quot;as is&quot; basis. To the extent permitted by UAE law, we
        are not liable for loss arising from reliance on general information published here, from
        the site being temporarily unavailable, or from any external website reached through a link
        from ours. This does not limit any liability that cannot lawfully be limited, and it does not
        affect our obligations under a signed project contract.
      </p>

      <h2>External links</h2>
      <p>
        Where we link to a third-party site, we do not control it and are not responsible for its
        content or privacy practices. Our <Link to="/cookies">cookie notice</Link> explains how the
        optional map embed on the contact page is handled.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle enquiry details is set out in our{' '}
        <Link to="/privacy">privacy notice</Link>.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of
        Sharjah, and the competent courts there have jurisdiction over any dispute about this
        website.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${company.email}`}>{company.email}</a> or{' '}
        {company.phone}.
      </p>
    </LegalPage>
  )
}
