import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

import {
  ComingSoonThumb,
  comingSoonKindFromCategory,
  isComingSoonCover,
} from '@/components/media/ComingSoonThumb'
import type { PodcastEpisode, PodcastShow } from '@/lib/podcasts'
import { getShowById } from '@/lib/podcasts'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

type MediaCardProps = {
  episode: PodcastEpisode
  size?: 'md' | 'lg'
  className?: string
}

export function MediaCard({ episode, size = 'md', className }: MediaCardProps) {
  const show = getShowById(episode.showId)
  if (!show) return null

  const href = `/podcasts/${show.slug}/${episode.slug}`
  const soon = isComingSoonCover(episode.cover)
  const kind = comingSoonKindFromCategory(show.category)

  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={cn('group relative shrink-0', className)}
    >
      <Link
        to={href}
        className={cn(
          'relative block',
          size === 'lg' ? 'w-[280px] sm:w-[320px]' : 'w-[200px] sm:w-[240px]',
          className?.includes('w-full') && '!w-full'
        )}
      >
        <OffsetBlock offset="ink" revealOnHover>
          <div className="overflow-hidden border-2 border-ink bg-ink">
            <div
              className={cn(
                'relative overflow-hidden',
                size === 'lg' ? 'aspect-[16/10]' : 'aspect-video'
              )}
            >
              {soon ? (
                <ComingSoonThumb
                  kind={kind}
                  title={episode.title}
                  compact
                  className="absolute inset-0"
                />
              ) : (
                <>
                  <img
                    src={episode.cover}
                    alt=""
                    className="photo-bw size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                </>
              )}
              <div className="absolute inset-0 z-[3] flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <span className="flex size-12 items-center justify-center bg-ink text-lime">
                  <Play className="size-5 fill-current" />
                </span>
              </div>
              <span className="absolute bottom-2 right-2 z-[3] border-2 border-ink bg-paper px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink">
                {episode.duration}
              </span>
            </div>
            <div className="space-y-1 bg-ink p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-lime/80">
                {show.title}
              </p>
              <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">
                {episode.title}
              </h3>
            </div>
          </div>
        </OffsetBlock>
      </Link>
    </motion.div>
  )
}

type ShowPosterProps = {
  show: PodcastShow
}

export function ShowPoster({ show }: ShowPosterProps) {
  const soon = isComingSoonCover(show.cover)
  const kind = comingSoonKindFromCategory(show.category)

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="group relative w-[160px] shrink-0 sm:w-[200px]"
    >
      <Link to={`/podcasts/${show.slug}`} className="relative block">
        <OffsetBlock offset="ink" revealOnHover>
          <div className="relative overflow-hidden border-2 border-ink">
            <div className="relative aspect-[2/3] overflow-hidden">
              {soon ? (
                <ComingSoonThumb
                  kind={kind}
                  title={show.title}
                  className="absolute inset-0"
                />
              ) : (
                <>
                  <img
                    src={show.cover}
                    alt=""
                    className="photo-bw size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-transparent to-transparent" />
                </>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-ink/80 to-transparent p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-lime">
                {show.category}
              </p>
              <h3 className="mt-1 text-sm font-bold leading-tight text-white">
                {show.title}
              </h3>
            </div>
          </div>
        </OffsetBlock>
      </Link>
    </motion.div>
  )
}
