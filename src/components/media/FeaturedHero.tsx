import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Info, Play } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { PodcastEpisode, PodcastShow } from '@/lib/podcasts'
import { getShowById } from '@/lib/podcasts'

type FeaturedHeroProps = {
  episode: PodcastEpisode
  show?: PodcastShow
}

export function FeaturedHero({ episode, show: showProp }: FeaturedHeroProps) {
  const show = showProp ?? getShowById(episode.showId)
  if (!show) return null

  const playHref = `/podcasts/${show.slug}/${episode.slug}`

  return (
    <section className="photo-grain relative min-h-[70vh] w-full overflow-hidden sm:min-h-[78vh]">
      <img
        src={episode.cover}
        alt=""
        className="photo-bw absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 z-[2] media-fade-left" />
      <div className="absolute inset-0 z-[2] media-fade-bottom" />

      <div className="relative z-10 flex min-h-[70vh] items-end px-4 pb-16 pt-28 sm:min-h-[78vh] sm:px-8 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime">
            {show.category} · Featured
          </p>
          <h1 className="type-display mt-3 text-4xl text-white sm:text-6xl lg:text-7xl">
            {episode.title}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
            {episode.synopsis}
          </p>
          <div className="mt-3 flex flex-wrap gap-3 font-mono text-xs text-white/50">
            <span>{show.title}</span>
            <span>·</span>
            <span>{episode.duration}</span>
            <span>·</span>
            <span>{episode.publishedAt}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="lime" size="lg" offset asChild>
              <Link to={playHref}>
                <Play className="size-4 fill-current" />
                Play
              </Link>
            </Button>
            <Button
              variant="paper"
              size="lg"
              className="border border-white/20 bg-white/10 text-white hover:bg-white hover:text-ink"
              asChild
            >
              <Link to={`/podcasts/${show.slug}`}>
                <Info className="size-4" />
                More info
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
