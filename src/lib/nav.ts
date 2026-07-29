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
  ],
} as const

export const siteMeta = {
  name: 'Radical Church',
  mission: 'Loving Jesus, Loving each other, and Loving the lost',
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
