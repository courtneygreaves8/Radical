import { ArrowUpRight, Play, Plus } from 'lucide-react'

import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { PodcastVideoFrame } from '@/components/marketing/PodcastVideoFrame'
import { SiteLink } from '@/components/shared/SiteLink'
import { mediaVideos } from '@/lib/mediaVideos'
import { podcastShows } from '@/lib/podcasts'
import { cn } from '@/lib/utils'

/**
 * Radical Media hub — V3 editorial (cream / terracotta / ink).
 * Featured stage mirrors the home podcast band; shows + watch grid below.
 */
export function PodcastsPage() {
  return (
    <div className="landing-v3 bg-[var(--v3-below)] text-[var(--v3-ink)]">
      <section className="relative overflow-hidden bg-[var(--v3-ink)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[min(110vw,64rem)] items-center overflow-hidden"
        >
          <GeoIcon
            name="asterisk6"
            className="size-[min(110vw,64rem)] shrink-0 translate-x-[40%] text-white/[0.06] sm:translate-x-1/2"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Radical Media
          </p>
          <h1 className="mt-4 max-w-3xl font-sans text-[clamp(2.75rem,10vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight">
            Podcasts.
          </h1>
          <p className="mt-2 font-sans text-[clamp(0.95rem,2.5vw,1.35rem)] font-bold uppercase tracking-[0.12em] text-white/55">
            Word. Worship. Stories that travel.
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/55 sm:text-base">
            Fearlessly shaping Norwich for Jesus&apos; Return — unfiltered
            preaching, presence-led worship, and testimonies from the road.
            Watch below or open anything on YouTube.
          </p>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
            <a
              href="#watch"
              className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-[var(--v3-cream)] py-2 pr-1.5 pl-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-ink)] transition hover:bg-white sm:w-auto sm:min-w-[12rem]"
            >
              Watch now
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--v3-ink)] text-[var(--v3-cream)] transition group-hover:bg-[var(--v3-terra)]">
                <Play className="size-3 fill-current" />
              </span>
            </a>
            <a
              href="#shows"
              className="group inline-flex w-full items-center justify-between gap-3 rounded-full border border-white/25 bg-white/10 py-2 pr-1.5 pl-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/15 sm:w-auto sm:min-w-[12rem]"
            >
              Browse shows
              <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
                <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>
      </section>

      <div id="watch">
        <PodcastVideoFrame variant="page" />
      </div>

      <section
        id="shows"
        className="relative mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20 lg:px-10"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--v3-ink)]/40">
          Shows
        </p>
        <h2 className="mt-3 max-w-xl font-sans text-[clamp(1.75rem,5vw,2.75rem)] font-bold uppercase leading-[1.05] tracking-tight">
          What we&apos;re putting out
        </h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[var(--v3-ink)]/55">
          Four Radical streams — sermons, worship, discipleship, and stories
          from the road. Episodes land here as they drop.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {podcastShows.map((show, i) => (
            <li key={show.id}>
              <article
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white p-3.5 shadow-[0_12px_36px_rgba(30,21,18,0.06)] ring-1 ring-[var(--v3-ink)]/8',
                  'sm:rounded-[1.6rem] sm:p-4'
                )}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.05rem] bg-gradient-to-br from-[#e8925a] via-[var(--v3-terra)] to-[#8f3a1c] sm:rounded-[1.2rem]">
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-end p-4"
                  >
                    <p className="font-sans text-2xl font-bold uppercase leading-none tracking-tight text-white/90 sm:text-3xl">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white text-[var(--v3-ink)] shadow-sm">
                    <Plus className="size-3.5" strokeWidth={2.5} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col pt-3.5 sm:pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--v3-terra)]">
                    {show.category}
                  </p>
                  <h3 className="mt-1.5 font-sans text-sm font-bold uppercase tracking-wide text-[var(--v3-ink)] sm:text-base">
                    {show.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-[var(--v3-ink)]/50">
                    {show.tagline}
                  </p>
                  <p className="mt-3 line-clamp-3 text-[12px] leading-relaxed text-[var(--v3-ink)]/45">
                    {show.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--v3-ink)]/8 bg-[var(--v3-cream)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--v3-ink)]/40">
                Watch
              </p>
              <h2 className="mt-3 max-w-xl font-sans text-[clamp(1.75rem,5vw,2.75rem)] font-bold uppercase leading-[1.05] tracking-tight">
                On YouTube
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[var(--v3-ink)]/55">
                Every featured drop from the stage above — open any of them in a
                new tab.
              </p>
            </div>
            <SiteLink
              to="/visit"
              className="inline-flex shrink-0 items-center justify-between gap-3 rounded-full bg-[var(--v3-ink)] py-2 pr-1.5 pl-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-cream)] transition hover:bg-[#140e0c] sm:min-w-[11rem]"
            >
              Visit Sunday
              <span className="flex size-7 items-center justify-center rounded-full bg-white text-[var(--v3-ink)]">
                <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
              </span>
            </SiteLink>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {mediaVideos.map((video) => (
              <li key={video.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-[1.35rem] bg-[var(--v3-ink)] text-[var(--v3-cream)] ring-1 ring-[var(--v3-ink)]/10 transition sm:rounded-[1.6rem]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={video.fullBleed}
                      alt=""
                      className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      draggable={false}
                      decoding="async"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[var(--v3-ink)] via-[var(--v3-ink)]/30 to-transparent"
                    />
                    <span className="absolute top-1/2 left-1/2 z-10 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--v3-cream)] text-[var(--v3-ink)] shadow-lg transition group-hover:scale-105">
                      <Play className="size-5 fill-current" />
                    </span>
                    <span className="absolute bottom-3 left-3 rounded-full bg-[var(--v3-terra)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white">
                      {video.episodeLabel}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                      {video.category}
                    </p>
                    <h3 className="mt-1.5 font-sans text-sm font-bold tracking-tight text-white sm:text-base">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-snug text-white/50">
                      {video.tagline}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
