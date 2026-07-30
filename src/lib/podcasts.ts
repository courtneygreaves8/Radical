import { COMING_SOON_COVER } from '@/components/media/ComingSoonThumb'

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

/** Covers stay Coming Soon until real art lands. */
const soon = COMING_SOON_COVER

/** Real Radical Church shows (radicalchurchuk.com). Episodes added when published. */
export const podcastShows: PodcastShow[] = [
  {
    id: 'preaches',
    slug: 'radical-preaches',
    title: 'Radical Preaches',
    tagline: 'Unfiltered Word. Real fire.',
    description:
      'Sunday messages and prophetic preaching from Radical Church — hard-core discipleship, no fluff.',
    cover: soon,
    backdrop: soon,
    accent: '#00E05A',
    category: 'Sermons',
  },
  {
    id: 'worship',
    slug: 'radical-worship',
    title: 'Radical Worship',
    tagline: 'Presence over performance.',
    description:
      'Live worship sessions and spontaneous moments from gatherings — atmosphere for encountering God.',
    cover: soon,
    backdrop: soon,
    accent: '#00E05A',
    category: 'Worship',
  },
  {
    id: 'jesus-way',
    slug: 'the-jesus-way',
    title: 'Hope Discipleship: The Jesus Way',
    tagline: 'Walk like Him.',
    description:
      'Discipleship series for growing deep — repentance, holiness, and following Jesus without compromise.',
    cover: soon,
    backdrop: soon,
    accent: '#00E05A',
    category: 'Discipleship',
  },
  {
    id: 'gypsy-way',
    slug: 'the-jesus-gypsy-way',
    title: 'The Jesus Gypsy Way',
    tagline: 'Faith on the road.',
    description:
      'Stories and teaching shaped by travelling faith communities — raw, relational, radical.',
    cover: soon,
    backdrop: soon,
    accent: '#00E05A',
    category: 'Stories',
  },
]

/** Only real published episodes — empty until feed is wired. */
export const podcastEpisodes: PodcastEpisode[] = []

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
  return podcastShows.map((show) => ({
    id: show.id,
    title: show.title,
    episodes: episodesForShow(show.id),
  }))
}
