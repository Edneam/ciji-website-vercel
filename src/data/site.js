export const company = {
  name: 'Ciji Bldg. Metalic Const. Ind. LLC',
  group: 'C.J Group of Companies',
  sisterCompany: 'C.J Tec Contracting LLC',
  phone: '+971 06 5355094',
  phoneHref: 'tel:+971065355094',
  email: 'cijialum@yahoo.com',
  hours: '08:30 to 19:00, Monday to Saturday',
  offices: [
    {
      city: 'Sharjah (Head Office)',
      lines: ['Industrial Area 17, Plot 39', 'Opp. Al Alif Marbles', 'P.O Box 44316, Sharjah, U.A.E'],
    },
    {
      city: 'Dubai Office',
      lines: ['115, Sky Business Centre', 'Near Coca Cola Factory', 'P.O Box 79102, Dubai, U.A.E'],
    },
  ],
}

/**
 * Figures shown in the stats strip.
 *
 * These are the client's own numbers, relabelled so each one states a
 * countable fact rather than a claim we cannot evidence:
 *   - "Happy Clients" asserted satisfaction with nothing to back it, so the
 *     same figure is now labelled as clients served.
 *   - "15+ Years" contradicted the company description, which says "over a
 *     decade". The label now matches the copy.
 * Every figure here still needs confirming against company records before
 * launch. See NOTES for the outstanding verification list.
 */
export const stats = [
  { value: '245+', label: 'Projects Delivered' },
  { value: '750+', label: 'Clients Served' },
  { value: '288', label: 'People on Staff' },
  { value: '10+', label: 'Years in the UAE' },
]
