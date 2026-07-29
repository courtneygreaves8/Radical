import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { MediaCard, ShowPoster } from '@/components/media/MediaCard'
import type { PodcastEpisode, PodcastShow } from '@/lib/podcasts'

type MediaRowProps = {
  title: string
  episodes?: PodcastEpisode[]
  shows?: PodcastShow[]
}

export function MediaRow({ title, episodes, shows }: MediaRowProps) {
  const scroller = useRef<HTMLDivElement>(null)

  function scroll(dir: -1 | 1) {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="relative group/row">
      <div className="mb-3 flex items-end justify-between px-4 sm:px-8">
        <h2 className="type-display text-base text-white sm:text-xl">{title}</h2>
        <div className="hidden gap-1 sm:flex">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="flex size-8 items-center justify-center border border-white/20 text-white/70 transition hover:border-lime hover:text-lime"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="flex size-8 items-center justify-center border border-white/20 text-white/70 transition hover:border-lime hover:text-lime"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="media-row-scroll flex gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 sm:px-8"
      >
        {shows?.map((show) => (
          <ShowPoster key={show.id} show={show} />
        ))}
        {episodes?.map((ep) => (
          <MediaCard key={ep.id} episode={ep} />
        ))}
      </div>
    </section>
  )
}
