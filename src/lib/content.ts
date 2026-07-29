import { urbanImages } from '@/lib/images'
import { peekSlideImages } from '@/lib/peekSlides'

export type CarouselSlide = {
  id: string
  title: string
  caption: string
  image: string
  /** CSS object-position — nudge crop (e.g. 'center top') */
  imagePosition?: string
  ctaLabel?: string
  ctaHref?: string
}

export type BeliefItem = {
  id: string
  group: string
  title: string
  body: string
}

export type EventItem = {
  id: string
  title: string
  date: string
  place: string
  blurb: string
  public: boolean
}

export type MissionStory = {
  id: string
  region: 'uk' | 'world'
  number: string
  title: string
  body: string
  image: string
}

export type GiveOption = {
  id: string
  type: 'sms' | 'bank' | 'sponsor'
  title: string
  detail: string
  hint?: string
}

export const carouselSlides: CarouselSlide[] = [
  {
    id: '1',
    title: 'Hope on the streets',
    caption: 'The Radical Hope Bus — outreach across Norfolk.',
    image: peekSlideImages.streets,
    ctaLabel: 'See missions',
    ctaHref: '/missions',
  },
  {
    id: '2',
    title: 'Still waters',
    caption: 'Quiet grit. Long obedience. Faith that waits and works.',
    image: peekSlideImages.still,
    imagePosition: 'center center',
    ctaLabel: 'Visit this Sunday',
    ctaHref: '/visit',
  },
  {
    id: '3',
    title: 'City witness',
    caption: 'Called to the broken, the marginalised, and the overlooked.',
    image: peekSlideImages.dock,
    ctaLabel: 'Our vision',
    ctaHref: '/about',
  },
  {
    id: '4',
    title: 'Open field',
    caption: 'God is wanting to bring revival to our county — we want in.',
    image: peekSlideImages.field,
    ctaLabel: 'Our story',
    ctaHref: '/about',
  },
  {
    id: '5',
    title: 'The Jesus Way',
    caption: 'Hard-core discipleship. Soft hearts. Whole Bible.',
    image: peekSlideImages.jesusWay,
    ctaLabel: 'Learn more',
    ctaHref: '/beliefs',
  },
]

export const aboutCopy = {
  eyebrow: 'Who we are',
  title: 'We believe in being Radical.',
  lead: 'Radical Church is a community of believers that simply love Jesus.',
  body: [
    'Our mission: Loving Jesus, Loving each other, and Loving the lost.',
    'We believe in the power of God to transform lives, and especially feel called to the broken and marginalised. We believe in the Full Gospel and the Whole Bible and want to see Jesus made famous.',
    'When we meet together we meet to worship God — not entertain people. If you are looking for comfortable seats and predictable meetings where you are not challenged to pursue God, this is not the fellowship for you.',
    'If you are looking to be used of God, work hard, be challenged and make a difference — then we dare you to come and visit.',
  ],
  signOff: 'Pastor Matt and team.',
}

export const beliefs: BeliefItem[] = [
  {
    id: 'b1',
    group: 'God & His Word',
    title: 'The Bible is infallible',
    body: 'We believe the Bible is the infallible word of God. We believe God created the universe and everything in it. We believe in Heaven and Hell.',
  },
  {
    id: 'b2',
    group: 'God & His Word',
    title: 'Image of God',
    body: 'We believe all humanity was created male or female and was created in the image of God. All human life is from God, begins at conception and is sacred until death. God loves all people.',
  },
  {
    id: 'b3',
    group: 'People',
    title: 'Sin, gospel, repentance',
    body: 'Everyone has sinned. The gospel is the answer and has power to transform lives. We believe in conviction of sin, repentance and sanctification.',
  },
  {
    id: 'b4',
    group: 'Church',
    title: 'Hard-core discipleship',
    body: 'We preach the cross and the blood of Jesus. Baptism by immersion. Filled with the Holy Ghost. Loving people enough to help them get free from cycles of sin and addiction.',
  },
  {
    id: 'b5',
    group: 'Ministry',
    title: 'Pentecostal & not ashamed',
    body: 'Gifts of the Spirit. Laying on of hands. Healing. Casting out demons. Prayer and fasting. Character and fruit — we test everything.',
  },
  {
    id: 'b6',
    group: 'City',
    title: 'Make Jesus famous in Norwich',
    body: 'Take it outside the church to the streets and clubs. Bless other churches. With faith, greater things can be done in this city. We are Radical.',
  },
]

export const events: EventItem[] = [
  {
    id: 'e1',
    title: 'Sunday Gathering',
    date: 'Every Sunday · 10:30am',
    place: 'City Gates Centre, 39 Cowgate',
    blurb: 'Worship, Word, and presence. Come expectant.',
    public: true,
  },
]

export const missions: MissionStory[] = [
  {
    id: 'm1',
    region: 'uk',
    number: '01',
    title: 'Radical Hope Bus',
    body: 'Outreach and evangelism across Norfolk on our double-decker Hope Bus — supermarket streets, clubs, and communities that need Jesus.',
    image: urbanImages.soho,
  },
  {
    id: 'm2',
    region: 'uk',
    number: '02',
    title: 'Norwich & beyond',
    body: 'Prison prayer, street preaching, Tough Talk, and local mission with churches across the city. Revival in our county — we want in.',
    image: urbanImages.shoreditch,
  },
  {
    id: 'm3',
    region: 'world',
    number: '03',
    title: 'India & Africa',
    body: 'Teams regularly serve with partners overseas — orphanage care, discipleship, and long-term presence with local believers.',
    image: urbanImages.graffitiWall,
  },
]

export const giveOptions: GiveOption[] = [
  {
    id: 'g1',
    type: 'sms',
    title: 'Text to give',
    detail:
      'Text RADICALOFFERING, RADICALTITHES or SAVIOURJESUS + amount to 70085.',
    hint: 'Example: RADICALOFFERING 10',
  },
  {
    id: 'g2',
    type: 'sponsor',
    title: 'Sponsor a child',
    detail:
      'Support orphanage care in India — around £30/month with no admin fees taken from your gift.',
  },
  {
    id: 'g3',
    type: 'bank',
    title: 'Rice Field Project',
    detail:
      'Bank: Radical Orphanage · Sort 20-45-45 · Acc 13237680. Fields and irrigation for long-term self-sufficiency.',
  },
]

export const heroImages = {
  split: urbanImages.shoreditch,
  about: urbanImages.shaftesbury,
}
