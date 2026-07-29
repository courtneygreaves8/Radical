import { Link, Navigate, useParams } from 'react-router-dom'
import { Play } from 'lucide-react'

import { MediaCard } from '@/components/media/MediaCard'
import { Button } from '@/components/ui/button'
import { episodesForShow, getShow } from '@/lib/podcasts'

export function PodcastShowPage() {
  const { showSlug = '' } = useParams()
  const show = getShow(showSlug)
  if (!show) return <Navigate to="/podcasts" replace />

  const episodes = episodesForShow(show.id)
  const first = episodes[0]

  return (
    <div className="pb-20">
      <section className="photo-grain relative min-h-[55vh] overflow-hidden">
        <img
          src={show.backdrop}
          alt=""
          className="photo-bw absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 z-[2] media-fade-left" />
        <div className="absolute inset-0 z-[2] media-fade-bottom" />

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-[1600px] flex-col justify-end gap-8 px-4 pb-12 pt-24 sm:flex-row sm:items-end sm:px-8 sm:pb-16">
          <img
            src={show.cover}
            alt=""
            className="photo-bw hidden w-40 border border-white/20 shadow-[8px_8px_0_0_#C8F500] sm:block sm:w-48"
          />
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime">
              {show.category} · Series
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
                  Play latest
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-12 sm:px-8">
        <h2 className="type-display text-xl text-white sm:text-2xl">
          Episodes
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {episodes.map((ep) => (
            <MediaCard key={ep.id} episode={ep} size="lg" className="!w-full" />
          ))}
        </div>
      </section>
    </div>
  )
}
