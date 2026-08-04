import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Headphones, Info, Play } from 'lucide-react'

import { AppImage } from '@/components/shared/AppImage'
import { Button } from '@/components/ui/button'
import type { PodcastEpisode, PodcastShow } from '@/lib/podcasts'
import { getShowById } from '@/lib/podcasts'
import { cn } from '@/lib/utils'

type FeaturedHeroProps = {
  episode?: PodcastEpisode
  show?: PodcastShow
  /** Full-bleed cinematic backdrop (overrides episode cover) */
  backdrop?: string
}

/**
 * Cinematic Radical Media billboard — works with a real episode or a show preview.
 */
export function FeaturedHero({
  episode,
  show: showProp,
  backdrop = '/media/podcast-hero.png',
}: FeaturedHeroProps) {
  const show = showProp ?? (episode ? getShowById(episode.showId) : undefined)
  if (!show) return null

  const title = episode?.title ?? show.title
  const synopsis = episode?.synopsis ?? show.description
  const metaLeft = episode ? show.title : show.tagline
  const metaRight = episode?.duration ?? `${show.category} · Coming soon`
  const primaryHref = episode
    ? `/podcasts/${show.slug}/${episode.slug}`
    : `/podcasts/${show.slug}`
  const primaryLabel = episode ? 'Preview' : 'Enter show'

  return (
    <section className="relative min-h-[78vh] w-full overflow-hidden border-b-2 border-ink bg-ink sm:min-h-[88vh]">
      {/* Cinematic plate */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
      >
        <AppImage
          src={backdrop}
          alt=""
          className="absolute inset-0 size-full"
        />
      </motion.div>

      {/* Film grade + vignette */}
      <div className="absolute inset-0 z-[1] bg-ink/25 mix-blend-multiply" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 3px)',
        }}
      />

      {/* Letterbox bars */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-8 bg-ink sm:h-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-8 bg-ink sm:h-10"
      />

      <div className="relative z-10 flex min-h-[78vh] items-end px-4 pb-20 pt-28 sm:min-h-[88vh] sm:px-8 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="mx-auto w-full max-w-[1600px]"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border-2 border-lime bg-lime px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime-foreground">
              <Headphones className="size-3.5" />
              Radical Media
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
              {show.category} · Coming soon
            </span>
          </div>

          <h1
            className={cn(
              'type-display mt-5 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.9] tracking-tight text-paper'
            )}
          >
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
            {synopsis}
          </p>
          <div className="mt-3 flex flex-wrap gap-3 font-mono text-xs text-paper/40">
            <span>{metaLeft}</span>
            <span>·</span>
            <span>{metaRight}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="lime" size="lg" offset asChild>
              <Link to={primaryHref}>
                <Play className="size-4 fill-current" />
                {primaryLabel}
              </Link>
            </Button>
            {episode ? (
              <Button
                variant="paper"
                size="lg"
                className="border-2 border-paper bg-transparent text-paper hover:bg-paper hover:text-ink"
                asChild
              >
                <Link to={`/podcasts/${show.slug}`}>
                  <Info className="size-4" />
                  More info
                </Link>
              </Button>
            ) : (
              <Button
                variant="paper"
                size="lg"
                className="border-2 border-paper bg-transparent text-paper hover:bg-paper hover:text-ink"
                asChild
              >
                <Link to="/podcasts">
                  <Info className="size-4" />
                  All shows
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
