import { Link, Navigate, useParams } from 'react-router-dom'
import { Play } from 'lucide-react'

import {
  ComingSoonThumb,
  comingSoonKindFromCategory,
  isComingSoonCover,
} from '@/components/media/ComingSoonThumb'
import { MediaCard } from '@/components/media/MediaCard'
import { AppImage } from '@/components/shared/AppImage'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { Button } from '@/components/ui/button'
import { episodesForShow, getShow } from '@/lib/podcasts'

export function PodcastShowPage() {
  const { showSlug = '' } = useParams()
  const show = getShow(showSlug)
  if (!show) return <Navigate to="/podcasts" replace />

  const episodes = episodesForShow(show.id)
  const first = episodes[0]
  const soon = isComingSoonCover(show.backdrop)
  const kind = comingSoonKindFromCategory(show.category)

  return (
    <div className="pb-20">
      <section className="relative min-h-[55vh] overflow-hidden border-b-2 border-ink">
        {soon ? (
          <>
            <ComingSoonThumb
              kind={kind}
              className="absolute inset-0"
              title={show.title}
            />
            <div className="absolute inset-0 z-[2] bg-gradient-to-r from-ink via-ink/75 to-ink/25" />
          </>
        ) : (
          <>
            <AppImage
              src={show.backdrop}
              alt=""
              className="absolute inset-0 size-full"
            />
            <div className="absolute inset-0 z-[2] media-fade-left" />
            <div className="absolute inset-0 z-[2] media-fade-bottom" />
          </>
        )}

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-[1600px] flex-col justify-end gap-8 px-4 pb-12 pt-24 sm:flex-row sm:items-end sm:px-8 sm:pb-16">
          <OffsetBlock offset="ink" className="hidden w-40 shrink-0 sm:block sm:w-48">
            <div className="relative aspect-[2/3] overflow-hidden border-2 border-ink">
              <ComingSoonThumb
                kind={kind}
                title={show.title}
                className="absolute inset-0"
              />
            </div>
          </OffsetBlock>
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime">
              {show.category} · Coming soon
            </p>
            <h1 className="type-display mt-3 text-4xl text-white sm:text-6xl">
              {show.title}
            </h1>
            <p className="mt-2 text-lg font-medium text-white/90">
              {show.tagline}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              {show.description}
            </p>
            {first ? (
              <Button variant="lime" size="lg" className="mt-8" offset asChild>
                <Link to={`/podcasts/${show.slug}/${first.slug}`}>
                  <Play className="size-4 fill-current" />
                  Preview latest
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] bg-black px-4 py-10 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          Episodes · Coming soon
        </p>
        {episodes.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-4">
            {episodes.map((ep) => (
              <MediaCard key={ep.id} episode={ep} />
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
            No episodes listed here yet. When new drops publish, they will
            appear in this show.
          </p>
        )}
      </div>
    </div>
  )
}
