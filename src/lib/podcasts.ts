import { urbanImages } from '@/lib/images'

export type PodcastShow = {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  cover: string
  backdrop: string
  accent: string
  category: string
}

export type PodcastEpisode = {
  id: string
  slug: string
  showId: string
  title: string
  synopsis: string
  duration: string
  publishedAt: string
  cover: string
  mediaUrl?: string
  featured?: boolean
  tags?: string[]
}

const covers = {
  preach: urbanImages.shaftesbury,
  worship: urbanImages.nightCity,
  discipleship: urbanImages.brickStreet,
  gypsy: urbanImages.estate,
  street: urbanImages.soho,
  hands: urbanImages.tags,
  field: urbanImages.londonSky,
  night: urbanImages.alley,
  graffiti: urbanImages.graffitiWall,
  mural: urbanImages.mural,
  bus: urbanImages.londonBus,
  crossing: urbanImages.crossing,
}

export const podcastShows: PodcastShow[] = [
  {
    id: 'preaches',
    slug: 'radical-preaches',
    title: 'Radical Preaches',
    tagline: 'Unfiltered Word. Real fire.',
    description:
      'Sunday messages and prophetic preaching from Radical Church — hard-core discipleship, no fluff.',
    cover: covers.preach,
    backdrop: covers.graffiti,
    accent: '#C8F500',
    category: 'Sermons',
  },
  {
    id: 'worship',
    slug: 'radical-worship',
    title: 'Radical Worship',
    tagline: 'Presence over performance.',
    description:
      'Live worship sessions and spontaneous moments from gatherings — atmosphere for encountering God.',
    cover: covers.worship,
    backdrop: covers.night,
    accent: '#C8F500',
    category: 'Worship',
  },
  {
    id: 'jesus-way',
    slug: 'the-jesus-way',
    title: 'Hope Discipleship: The Jesus Way',
    tagline: 'Walk like Him.',
    description:
      'Discipleship series for growing deep — repentance, holiness, and following Jesus without compromise.',
    cover: covers.discipleship,
    backdrop: covers.hands,
    accent: '#C8F500',
    category: 'Discipleship',
  },
  {
    id: 'gypsy-way',
    slug: 'the-jesus-gypsy-way',
    title: 'The Jesus Gypsy Way',
    tagline: 'Faith on the road.',
    description:
      'Stories and teaching shaped by travelling faith communities — raw, relational, radical.',
    cover: covers.gypsy,
    backdrop: covers.street,
    accent: '#C8F500',
    category: 'Stories',
  },
]

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 'e1',
    slug: 'dare-to-be-radical',
    showId: 'preaches',
    title: 'Dare to Be Radical',
    synopsis:
      'If you want comfortable seats and predictable meetings, this is not that. A call to pursue God hard.',
    duration: '42 min',
    publishedAt: '2026-07-20',
    cover: covers.preach,
    featured: true,
    tags: ['Sunday', 'Call'],
  },
  {
    id: 'e2',
    slug: 'loving-the-lost',
    showId: 'preaches',
    title: 'Loving the Lost',
    synopsis:
      'Mission to the broken and marginalised — supermarket streets, clubs, and the Hope Bus.',
    duration: '38 min',
    publishedAt: '2026-07-13',
    cover: covers.street,
    tags: ['Outreach'],
  },
  {
    id: 'e3',
    slug: 'full-gospel-fire',
    showId: 'preaches',
    title: 'Full Gospel Fire',
    synopsis:
      'Pentecostal and not ashamed — gifts, healing, and character that holds under pressure.',
    duration: '51 min',
    publishedAt: '2026-07-06',
    cover: covers.graffiti,
    tags: ['Spirit'],
  },
  {
    id: 'e4',
    slug: 'presence-over-stage',
    showId: 'worship',
    title: 'Presence Over Stage',
    synopsis:
      'We gather to worship God — not entertain people. A night in the presence.',
    duration: '56 min',
    publishedAt: '2026-07-19',
    cover: covers.worship,
    featured: true,
    tags: ['Live'],
  },
  {
    id: 'e5',
    slug: 'spontaneous-praise',
    showId: 'worship',
    title: 'Spontaneous Praise',
    synopsis: 'Unplanned worship moments from a Sunday gathering in Norwich.',
    duration: '28 min',
    publishedAt: '2026-07-05',
    cover: covers.night,
    tags: ['Live'],
  },
  {
    id: 'e6',
    slug: 'hard-core-discipleship',
    showId: 'jesus-way',
    title: 'Hard-Core Discipleship',
    synopsis:
      'Raising sons, daughters, and warriors — what it costs to follow Jesus fully.',
    duration: '33 min',
    publishedAt: '2026-07-18',
    cover: covers.discipleship,
    featured: true,
    tags: ['Series'],
  },
  {
    id: 'e7',
    slug: 'repentance-and-fire',
    showId: 'jesus-way',
    title: 'Repentance & Fire',
    synopsis: 'Conviction, turning, and sanctification — the Jesus Way starts here.',
    duration: '29 min',
    publishedAt: '2026-07-04',
    cover: covers.mural,
    tags: ['Series'],
  },
  {
    id: 'e8',
    slug: 'faith-on-the-move',
    showId: 'gypsy-way',
    title: 'Faith on the Move',
    synopsis:
      'Stories from travelling communities — belonging, family, and Jesus on the road.',
    duration: '36 min',
    publishedAt: '2026-07-12',
    cover: covers.gypsy,
    featured: true,
    tags: ['Story'],
  },
  {
    id: 'e9',
    slug: 'family-and-fire',
    showId: 'gypsy-way',
    title: 'Family & Fire',
    synopsis: 'What it means to be family in the Kingdom — no mediocre faith.',
    duration: '31 min',
    publishedAt: '2026-06-28',
    cover: covers.bus,
    tags: ['Story'],
  },
  {
    id: 'e10',
    slug: 'revival-in-our-generation',
    showId: 'preaches',
    title: 'Revival in Our Generation',
    synopsis:
      'God is wanting to bring revival to Norfolk — and we want to be part of it.',
    duration: '44 min',
    publishedAt: '2026-06-22',
    cover: covers.crossing,
    tags: ['Sunday'],
  },
]

export function getShow(slug: string) {
  return podcastShows.find((s) => s.slug === slug)
}

export function getShowById(id: string) {
  return podcastShows.find((s) => s.id === id)
}

export function getEpisode(showSlug: string, episodeSlug: string) {
  const show = getShow(showSlug)
  if (!show) return null
  const episode = podcastEpisodes.find(
    (e) => e.showId === show.id && e.slug === episodeSlug
  )
  if (!episode) return null
  return { show, episode }
}

export function episodesForShow(showId: string) {
  return podcastEpisodes
    .filter((e) => e.showId === showId)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function featuredEpisodes() {
  return podcastEpisodes.filter((e) => e.featured)
}

export function continueWatching() {
  return podcastEpisodes.slice(0, 6)
}

export function rowByCategory() {
  return [
    {
      id: 'featured',
      title: 'Featured this week',
      episodes: featuredEpisodes(),
    },
    {
      id: 'preaches',
      title: 'Radical Preaches',
      episodes: episodesForShow('preaches'),
    },
    {
      id: 'worship',
      title: 'Radical Worship',
      episodes: episodesForShow('worship'),
    },
    {
      id: 'jesus-way',
      title: 'The Jesus Way',
      episodes: episodesForShow('jesus-way'),
    },
    {
      id: 'gypsy-way',
      title: 'The Jesus Gypsy Way',
      episodes: episodesForShow('gypsy-way'),
    },
  ]
}
