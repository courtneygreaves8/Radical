export type NavLinkItem = {
  label: string
  href: string
}

export const primaryNav: NavLinkItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Visit', href: '/visit' },
  { label: 'Podcasts', href: '/podcasts' },
  { label: 'Events', href: '/events' },
  { label: 'Missions', href: '/missions' },
  { label: 'Give', href: '/give' },
  { label: 'Beliefs', href: '/beliefs' },
]

export const footerNav = {
  church: [
    { label: 'About', href: '/about' },
    { label: 'Beliefs', href: '/beliefs' },
    { label: 'Visit', href: '/visit' },
  ],
  action: [
    { label: 'Podcasts', href: '/podcasts' },
    { label: 'Events', href: '/events' },
    { label: 'Missions', href: '/missions' },
    { label: 'Give', href: '/give' },
    { label: 'Sponsorship', href: '/sponsorship' },
  ],
} as const

/** Live routes navigate; everything else shows “Coming soon”. */
export function isLiveHref(href: string) {
  if (
    href.startsWith('mailto:') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('tel:')
  ) {
    return true
  }
  const path = href.split(/[?#]/)[0] || '/'
  return path === '/' || path === '' || path === '/podcasts'
}

export const siteMeta = {
  name: 'Radical Church',
  /** Primary brand line — loud, unashamed, shape-forward */
  mission: "Norwich's Fearless Church — gritty, real, shaping the city",
  missionSupport:
    'Loving Jesus, loving each other, and loving the lost. Full Gospel. Whole Bible.',
  email: 'radicalchurchuk@gmail.com',
  charityNumber: '1174903',
  visit: {
    day: 'Sunday',
    time: '10:30am',
    venue: 'City Gates Centre',
    address: '39 Cowgate, Norwich NR3 1SZ',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=39+Cowgate+Norwich+NR3+1SZ',
  },
} as const
