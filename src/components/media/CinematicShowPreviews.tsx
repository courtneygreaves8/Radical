import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { FeaturedHero } from '@/components/media/FeaturedHero'
import type { PodcastShow } from '@/lib/podcasts'
import { cn } from '@/lib/utils'

type CinematicShowPreviewsProps = {
  shows: PodcastShow[]
  /** Auto-advance interval (ms). 0 = off. */
  intervalMs?: number
}

/**
 * Rotating cinematic billboards for Radical Media shows.
 */
export function CinematicShowPreviews({
  shows,
  intervalMs = 7000,
}: CinematicShowPreviewsProps) {
  const [index, setIndex] = useState(0)
  const show = shows[index]

  useEffect(() => {
    if (shows.length < 2 || intervalMs <= 0) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % shows.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [shows.length, intervalMs])

  if (!show) return null

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={show.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <FeaturedHero show={show} />
        </motion.div>
      </AnimatePresence>

      {shows.length > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-12 z-20 flex items-end justify-between px-4 sm:bottom-14 sm:px-8">
          <div className="pointer-events-auto mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous preview"
                onClick={() =>
                  setIndex((i) => (i - 1 + shows.length) % shows.length)
                }
                className="flex size-10 items-center justify-center border-2 border-paper/40 bg-ink/60 text-paper backdrop-blur transition hover:border-lime hover:text-lime"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next preview"
                onClick={() => setIndex((i) => (i + 1) % shows.length)}
                className="flex size-10 items-center justify-center border-2 border-paper/40 bg-ink/60 text-paper backdrop-blur transition hover:border-lime hover:text-lime"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              {shows.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Preview ${s.title}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'border-2 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] transition sm:text-[10px]',
                    i === index
                      ? 'border-lime bg-lime text-lime-foreground'
                      : 'border-paper/35 bg-ink/50 text-paper/70 hover:border-lime hover:text-lime'
                  )}
                >
                  {s.category}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Peek strip — next shows */}
      <div className="border-b-2 border-ink bg-ink">
        <div className="mx-auto flex max-w-[1600px] gap-3 overflow-x-auto px-4 py-4 sm:gap-4 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shows.map((s, i) => (
            <Link
              key={s.id}
              to={`/podcasts/${s.slug}`}
              onClick={() => setIndex(i)}
              className={cn(
                'relative w-[9.5rem] shrink-0 overflow-hidden border-2 sm:w-44',
                i === index ? 'border-lime' : 'border-paper/20 hover:border-paper/50'
              )}
            >
              <div className="aspect-video bg-ink">
                <img
                  src="/media/podcast-hero.png"
                  alt=""
                  className="photo-bw size-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-2">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-lime">
                  {s.category}
                </p>
                <p className="mt-0.5 line-clamp-1 text-[11px] font-bold text-paper">
                  {s.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
