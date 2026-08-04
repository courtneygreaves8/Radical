import { heroImages } from '@/lib/images'

/** Only these three cutouts — praying man, selfie hat guy, elder. */
export const podcastCutouts = {
  prayer: '/podcast/prayer-cut.png?v=3',
  look: '/podcast/look-cut.png?v=3',
  elder: '/podcast/elder-cut.png?v=3',
} as const

export type PodcastCutoutKey = keyof typeof podcastCutouts

export type PodcastThumbLine =
  | { text: string; highlight?: false }
  | { text: string; highlight: true }

/** Featured Radical Media shows — podcast-style art. */
export type MediaVideo = {
  id: string
  youtubeId: string
  title: string
  tagline: string
  category: string
  thumbLines: PodcastThumbLine[]
  /** Single cutout for preview cards */
  cutout: PodcastCutoutKey
  /** Full-bleed photo for the featured block */
  fullBleed: string
  episodeLabel: string
}

export const mediaVideos: MediaVideo[] = [
  {
    id: 'norwich',
    youtubeId: '-C-cus6pJuo',
    title: 'Lifting up the name of Jesus in Norwich City',
    tagline: 'Worship and witness on the streets we call home.',
    category: 'Norwich',
    episodeLabel: 'Norwich',
    thumbLines: [
      { text: 'JESUS ON' },
      { text: 'THESE STREETS', highlight: true },
    ],
    cutout: 'prayer',
    fullBleed: heroImages.prayerProfile,
  },
  {
    id: 'jesus-fest',
    youtubeId: 'AV4zl5ZiefI',
    title: 'This is why we did Jesus Fest',
    tagline: 'One city. One name. A festival for Jesus.',
    category: 'Outreach',
    episodeLabel: 'Outreach',
    thumbLines: [
      { text: 'ONE CITY' },
      { text: 'JESUS FEST', highlight: true },
    ],
    cutout: 'look',
    fullBleed: heroImages.look,
  },
  {
    id: 'break-every-chain',
    youtubeId: '6sHl7kNHGgQ',
    title: 'Break Every Chain',
    tagline: 'Radical Worship — live, unfiltered presence.',
    category: 'Worship',
    episodeLabel: 'Worship',
    thumbLines: [
      { text: 'BREAK EVERY' },
      { text: 'CHAIN', highlight: true },
    ],
    cutout: 'elder',
    fullBleed: heroImages.elder,
  },
  {
    id: 'gypsy-way',
    youtubeId: 'tcLwLdeAeeE',
    title: 'The Jesus Gypsy Way',
    tagline: 'Hope Discipleship — faith on the road.',
    category: 'Discipleship',
    episodeLabel: 'Discipleship',
    thumbLines: [
      { text: 'THE JESUS' },
      { text: 'GYPSY WAY', highlight: true },
    ],
    cutout: 'look',
    fullBleed: heroImages.stairs,
  },
  {
    id: 'leon',
    youtubeId: '6Rz0YF6kxZs',
    title: "Leon's Story",
    tagline: 'Gypsies for Jesus — testimony that travels.',
    category: 'Stories',
    episodeLabel: 'Stories',
    thumbLines: [
      { text: "LEON'S" },
      { text: 'STORY', highlight: true },
    ],
    cutout: 'look',
    fullBleed: heroImages.look,
  },
]

export function youtubeEmbed(youtubeId: string, autoplay = false) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })
  if (autoplay) params.set('autoplay', '1')
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`
}

export function youtubeThumb(
  youtubeId: string,
  quality: 'hq' | 'mq' | 'sd' = 'hq'
) {
  const q =
    quality === 'hq' ? 'hqdefault' : quality === 'mq' ? 'mqdefault' : 'sddefault'
  return `https://i.ytimg.com/vi/${youtubeId}/${q}.jpg`
}
