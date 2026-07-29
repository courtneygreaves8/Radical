import { FeaturedHero } from '@/components/media/FeaturedHero'
import { MediaRow } from '@/components/media/MediaRow'
import {
  continueWatching,
  featuredEpisodes,
  podcastShows,
  rowByCategory,
} from '@/lib/podcasts'

export function PodcastsPage() {
  const featured = featuredEpisodes()[0] ?? continueWatching()[0]
  const rows = rowByCategory()

  return (
    <div className="pb-16">
      {featured ? <FeaturedHero episode={featured} /> : null}

      <div className="relative z-10 -mt-10 space-y-10 sm:-mt-14 sm:space-y-12">
        <MediaRow title="Browse series" shows={podcastShows} />
        <MediaRow title="Continue listening" episodes={continueWatching()} />
        {rows.map((row) =>
          row.episodes.length > 0 ? (
            <MediaRow
              key={row.id}
              title={row.title}
              episodes={row.episodes}
            />
          ) : null
        )}
      </div>
    </div>
  )
}
