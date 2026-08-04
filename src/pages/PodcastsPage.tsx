import { useMemo, useState } from 'react'

import { CinematicShowPreviews } from '@/components/media/CinematicShowPreviews'
import { FeaturedHero } from '@/components/media/FeaturedHero'
import { MediaRow } from '@/components/media/MediaRow'
import {
  StaggerMediaGallery,
  type StaggerSortId,
} from '@/components/media/StaggerMediaGallery'
import { comingSoonKindFromCategory } from '@/components/media/ComingSoonThumb'
import {
  continueWatching,
  featuredEpisodes,
  getShowById,
  podcastEpisodes,
  podcastShows,
  rowByCategory,
} from '@/lib/podcasts'

const showSorts = [
  { id: 'chrono' as const, label: 'Series order' },
  { id: 'alpha' as const, label: 'Alphabetical' },
  { id: 'Sermons', label: 'Sermons' },
  { id: 'Worship', label: 'Worship' },
  { id: 'Discipleship', label: 'Discipleship' },
  { id: 'Stories', label: 'Stories' },
]

const episodeSorts = [
  { id: 'chrono' as const, label: 'Chronological' },
  { id: 'alpha' as const, label: 'Alphabetical' },
  { id: 'featured', label: 'Featured' },
]

export function PodcastsPage() {
  const featuredEpisode = featuredEpisodes()[0] ?? continueWatching()[0]
  const rows = rowByCategory()

  const [mode, setMode] = useState<'shows' | 'episodes'>('shows')
  const [showSort, setShowSort] = useState<StaggerSortId>('chrono')
  const [episodeSort, setEpisodeSort] = useState<StaggerSortId>('chrono')

  const showItems = useMemo(() => {
    let list = [...podcastShows]
    if (showSort !== 'chrono' && showSort !== 'alpha') {
      list = list.filter((s) => s.category === showSort)
    }
    if (showSort === 'alpha') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    }
    return list.map((s, i) => ({
      id: s.id,
      number: String(i + 1).padStart(2, '0'),
      title: s.title,
      meta: `${s.category} · ${s.tagline}`,
      image: s.cover,
      href: `/podcasts/${s.slug}`,
      kind: comingSoonKindFromCategory(s.category),
    }))
  }, [showSort])

  const episodeItems = useMemo(() => {
    let list = [...podcastEpisodes]
    if (episodeSort === 'featured') {
      list = list.filter((e) => e.featured)
    } else if (episodeSort === 'alpha') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    }
    return list.map((e, i) => {
      const show = getShowById(e.showId)
      return {
        id: e.id,
        number: String(i + 1).padStart(2, '0'),
        title: e.title,
        meta: `${show?.title ?? 'Show'} · ${e.duration}`,
        image: e.cover,
        href: show ? `/podcasts/${show.slug}/${e.slug}` : '/podcasts',
        kind: comingSoonKindFromCategory(show?.category),
      }
    })
  }, [episodeSort])

  return (
    <div className="pb-16">
      {featuredEpisode ? (
        <FeaturedHero episode={featuredEpisode} />
      ) : (
        <CinematicShowPreviews shows={podcastShows} />
      )}

      <div className="flex items-center gap-2 border-b border-ink/10 bg-paper px-5 py-3 sm:px-8">
        {(
          [
            { id: 'shows', label: 'Shows' },
            { id: 'episodes', label: 'Podcasts' },
          ] as const
        ).map((tab) => {
          const on = mode === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={
                on
                  ? 'border-2 border-ink bg-ink px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-lime'
                  : 'border-2 border-ink/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 transition hover:border-ink hover:text-ink'
              }
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {mode === 'shows' ? (
        <StaggerMediaGallery
          items={showItems}
          sorts={showSorts}
          activeSort={showSort}
          onSortChange={setShowSort}
          watermark="Shows"
        />
      ) : episodeItems.length > 0 ? (
        <StaggerMediaGallery
          items={episodeItems}
          sorts={episodeSorts}
          activeSort={episodeSort}
          onSortChange={setEpisodeSort}
          watermark="Podcasts"
        />
      ) : (
        <section className="border-b border-ink/10 bg-paper px-5 py-16 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
            Episodes
          </p>
          <p className="mt-4 max-w-lg text-lg font-bold tracking-tight">
            No episodes listed yet — shows are live; drops land here when
            published.
          </p>
        </section>
      )}

      <div className="relative z-10 space-y-10 bg-black pt-10 sm:space-y-12 sm:pt-12">
        {continueWatching().length > 0 ? (
          <MediaRow title="Continue listening" episodes={continueWatching()} />
        ) : null}
        <MediaRow title="All shows" shows={podcastShows} />
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
