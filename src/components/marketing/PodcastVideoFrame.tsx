import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

import { PodcastThumbArt } from '@/components/marketing/PodcastThumbArt'
import { mediaVideos, type MediaVideo } from '@/lib/mediaVideos'
import { cn } from '@/lib/utils'

const AUTO_MS = 8000

/**
 * Radical Media band — full-bleed featured thumb + stacked previews.
 * Mobile: single column, no side décor; desktop: orange “podcasts” rail + stack.
 */
export function PodcastVideoFrame() {
  const videos = mediaVideos
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = videos[activeIndex] ?? videos[0]

  useEffect(() => {
    if (paused || videos.length < 2) return
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % videos.length)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [paused, videos.length])

  function go(delta: number) {
    setActiveIndex((i) => (i + delta + videos.length) % videos.length)
  }

  function select(index: number) {
    setActiveIndex(index)
  }

  if (!active) return null

  const previewVideos = videos
    .map((video, index) => ({ video, index }))
    .filter(({ index }) => index !== activeIndex)
    .slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-[var(--v3-below,#f6efe9)] py-10">
      {/* Orange rail + vertical title — desktop only; inset 40px top/bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 bottom-10 left-0 z-0 hidden w-[min(52%,28rem)] items-center justify-center overflow-hidden rounded-r-[2rem] bg-gradient-to-br from-[#e8925a] via-[var(--v3-terra)] to-[#8f3a1c] lg:flex lg:w-[min(44%,34rem)] lg:rounded-r-[3rem]"
      >
        <p className="max-h-full origin-center rotate-180 py-3 font-sans text-[clamp(3rem,min(8.5vw,11vh),6.75rem)] font-bold uppercase italic leading-none tracking-tight text-white/[0.92] [writing-mode:vertical-rl]">
          podcasts
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Mobile section label */}
        <p className="mb-4 font-sans text-3xl font-bold uppercase italic tracking-tight text-[var(--v3-terra)] sm:text-4xl lg:hidden">
          podcasts
        </p>

        <div
          className={cn(
            'relative w-full overflow-hidden rounded-[1.5rem] bg-[var(--v3-ink)] text-[var(--v3-cream)] shadow-[0_28px_60px_-24px_rgba(30,21,18,0.45)]',
            'sm:rounded-[2rem]',
            'lg:ml-auto lg:min-h-[36rem] lg:w-[88%] lg:rounded-[2.25rem]'
          )}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setPaused(false)
            }
          }}
        >
          <div className="relative z-10 grid grid-cols-1 items-stretch gap-5 p-4 sm:gap-6 sm:p-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)] lg:gap-6 lg:p-7 xl:p-8">
            <div className="flex min-h-0 flex-col">
              <p className="mb-3 text-sm leading-relaxed text-[var(--v3-cream)]/70 sm:mb-5 sm:max-w-[36ch] sm:text-[15px]">
                {active.tagline}
              </p>

              <a
                href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-[1.15rem] ring-1 ring-white/10 sm:aspect-[16/9] sm:rounded-[1.4rem] lg:aspect-auto lg:min-h-[22rem] lg:flex-1"
                aria-label={`Open ${active.title} on YouTube`}
              >
                <PodcastThumbArt item={active} />
                <span className="absolute top-1/2 left-1/2 z-10 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--v3-cream)] text-[var(--v3-ink)] shadow-lg transition group-hover:scale-105 group-hover:bg-white sm:size-14 lg:size-16">
                  <Play className="size-5 fill-current sm:size-6 lg:size-7" />
                </span>
              </a>

              <div className="mt-4 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <Link
                  to="/podcasts"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--v3-cream)] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v3-ink)] transition hover:bg-white sm:justify-start sm:py-2.5"
                >
                  <span
                    className="size-1.5 rounded-full bg-[var(--v3-terra)]"
                    aria-hidden
                  />
                  All podcasts
                </Link>
                <a
                  href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v3-cream)] transition hover:bg-white/15 sm:justify-start sm:py-2.5"
                >
                  Open on YouTube
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2 sm:mt-6">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[var(--v3-cream)] transition hover:bg-white/20"
                  aria-label="Previous episode"
                >
                  <ChevronLeft className="size-4" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[var(--v3-cream)] transition hover:bg-white/20"
                  aria-label="Next episode"
                >
                  <ChevronRight className="size-4" strokeWidth={1.75} />
                </button>
                <div
                  className="ml-2 flex gap-1.5"
                  role="tablist"
                  aria-label="Episodes"
                >
                  {videos.map((video, index) => (
                    <button
                      key={video.id}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-label={`Show episode ${index + 1}: ${video.title}`}
                      onClick={() => select(index)}
                      className={cn(
                        'h-1.5 rounded-full transition-all',
                        index === activeIndex
                          ? 'w-6 bg-[var(--v3-terra)]'
                          : 'w-1.5 bg-white/35 hover:bg-white/55'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop stack */}
            <div className="relative hidden min-h-0 lg:flex">
              <ul className="flex w-full flex-col gap-3 self-stretch xl:gap-3.5">
                {previewVideos.map(({ video, index }) => (
                  <li key={video.id} className="min-h-0 flex-1">
                    <VideoPreviewCard
                      video={video}
                      onSelect={() => select(index)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile / tablet — other episodes inside the card */}
            <div className="lg:hidden">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--v3-cream)]/40">
                More episodes
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {previewVideos.map(({ video, index }) => (
                  <li key={video.id}>
                    <VideoPreviewCard
                      video={video}
                      compact
                      active={index === activeIndex}
                      onSelect={() => select(index)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoPreviewCard({
  video,
  onSelect,
  compact = false,
  active = false,
}: {
  video: MediaVideo
  onSelect: () => void
  compact?: boolean
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'group relative block size-full overflow-hidden rounded-[1rem] text-left ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v3-terra)]',
        compact ? 'aspect-[16/10] min-h-0' : 'min-h-[7.5rem]',
        active
          ? 'ring-[var(--v3-terra)]'
          : 'ring-white/15 hover:ring-white/40'
      )}
      aria-label={`Show episode: ${video.title}`}
      aria-current={active ? 'true' : undefined}
    >
      <PodcastThumbArt item={video} compact />
      <span className="absolute top-1/2 left-1/2 z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--v3-cream)] text-[var(--v3-ink)] shadow-md transition group-hover:scale-105 sm:size-10">
        <Play className="size-3.5 fill-current sm:size-4" />
      </span>
    </button>
  )
}
