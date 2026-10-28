const timeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})
const weekdayFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'long' })

function clock(day, hours, minutes) {
  return new Date(2026, 0, day, hours, minutes)
}

/** Monday 5 Jan 2026 through Saturday 10 Jan 2026. Renders the same string the site has always shown. */
const officeHours = `${timeFormat.format(clock(5, 8, 30))} to ${timeFormat.format(clock(5, 19, 0))}, ${weekdayFormat.format(clock(5, 8, 30))} to ${weekdayFormat.format(clock(10, 8, 30))}`

export const legalUpdated = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
}).format(new Date(2026, 8, 1))

export const company = {
  name: 'Ciji Bldg. Metalic Const. Ind. LLC',
  group: 'C.J\u00A0Group of Companies',
  sisterCompany: 'C.J\u00A0Tec Contracting LLC',
  phone: '+971\u00A006\u00A05355094',
  phoneHref: 'tel:+971065355094',
  email: 'cijialum@yahoo.com',
  hours: officeHours,
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
 * Public profiles. Only entries with a real URL are rendered.
 * An empty list draws no social row.
 * `platform` must be one of: facebook, instagram, linkedin, x, youtube, whatsapp.
 */
export const socials = []

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
