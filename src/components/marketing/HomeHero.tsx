import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import { DontPushButton } from '@/components/marketing/DontPushButton'
import { RotatingHeroWord } from '@/components/marketing/RotatingHeroWord'
import { VerseMarquee } from '@/components/marketing/VerseMarquee'
import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { Button } from '@/components/ui/button'
import type { CarouselSlide } from '@/lib/content'
import { siteMeta } from '@/lib/nav'
import { cn } from '@/lib/utils'

type HomeHeroProps = {
  slides: CarouselSlide[]
}

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(min-width: 1024px)')
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia('(min-width: 1024px)').matches,
    () => false
  )
}

function MobileScrollCue({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none flex shrink-0 items-center gap-2 text-ink',
        className
      )}
    >
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]">
        Scroll
      </span>
      <motion.span
        className="flex size-7 items-center justify-center border-[1.5px] border-ink"
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ArrowDown className="size-4" strokeWidth={2.5} />
      </motion.span>
    </div>
  )
}

/**
 * Full-bleed lime over a full-bleed photo.
 * Desktop: on scroll the lime shrinks from the bottom.
 * Mobile: static lime + image below (no expand scrub).
 */
export function HomeHero({ slides }: HomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const [slideIndex, setSlideIndex] = useState(0)
  const slide = slides[slideIndex] ?? slides[0]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const p = useTransform(scrollYProgress, [0, 0.85], [0, 1])
  const limeHeight = useTransform(p, (v) => `${100 - v * 50}%`)
  const chromeOpacity = useTransform(p, [0.35, 0.75], [0, 1])
  const scrollCueOpacity = useTransform(p, [0, 0.12], [1, 0])

  useEffect(() => {
    if (slides.length < 2 || reduceMotion || !isDesktop) return
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length)
    }, 5500)
    return () => window.clearInterval(id)
  }, [slides.length, reduceMotion, isDesktop])

  if (reduceMotion || !isDesktop) {
    return <StaticSplit slides={slides} />
  }

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-ink">
      <div className="sticky top-[4.5rem] h-[calc(100dvh-4.5rem)] overflow-hidden border-b-2 border-ink">
        <div className="absolute inset-0 z-0 overflow-hidden bg-ink">
          {slide ? (
            <div className="photo-grain absolute inset-0">
              <img
                key={slide.id}
                src={slide.image}
                alt=""
                className="photo-bw absolute inset-0 size-full object-cover"
                style={
                  slide.imagePosition
                    ? { objectPosition: slide.imagePosition }
                    : undefined
                }
                decoding="async"
              />
              <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
            </div>
          ) : null}

          <motion.div
            style={{ opacity: chromeOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-12 z-[3] p-5 sm:bottom-14 sm:p-8"
          >
            <div className="pointer-events-auto mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
                  0{slideIndex + 1} / 0{slides.length}
                </p>
                <h2 className="type-display mt-2 text-2xl text-paper sm:text-4xl">
                  {slide?.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-paper/70 sm:text-base">
                  {slide?.caption}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {slide?.ctaHref ? (
                  <Button variant="lime" size="sm" offset asChild>
                    <Link to={slide.ctaHref}>
                      {slide.ctaLabel ?? 'Learn more'}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : null}
                {slides.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous"
                      className="flex size-10 items-center justify-center border-2 border-paper/50 bg-ink/50 text-paper backdrop-blur transition hover:border-lime hover:text-lime"
                      onClick={() =>
                        setSlideIndex(
                          (i) => (i - 1 + slides.length) % slides.length
                        )
                      }
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next"
                      className="flex size-10 items-center justify-center border-2 border-paper/50 bg-ink/50 text-paper backdrop-blur transition hover:border-lime hover:text-lime"
                      onClick={() =>
                        setSlideIndex((i) => (i + 1) % slides.length)
                      }
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: chromeOpacity }}
            className="absolute inset-x-0 top-0 z-[3] flex gap-1 px-5 pt-3 sm:px-8"
          >
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  'h-1 flex-1 transition-colors',
                  i === slideIndex ? 'bg-lime' : 'bg-paper/30'
                )}
                onClick={() => setSlideIndex(i)}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{ height: limeHeight }}
          className="absolute inset-x-0 top-0 z-10 overflow-hidden bg-lime text-lime-foreground"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[min(120vw,76rem)] items-center overflow-hidden"
          >
            <GeoIcon
              name="asterisk6"
              className="size-[min(120vw,76rem)] shrink-0 translate-x-1/2 text-ink/[0.07]"
            />
          </div>

          <div className="relative z-10 flex h-full w-full items-center">
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
              <div className="relative max-w-3xl">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.3em]">
                  Norwich · England
                </p>
                <h1 className="type-display mt-5 text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
                  <span className="block whitespace-nowrap">
                    Be <RotatingHeroWord />
                  </span>
                  <span className="mt-3 block sm:mt-4">
                    <span className="inline-block">
                      <span className="inline-block bg-ink px-2.5 py-[0.1em] sm:px-3.5">
                        <span className="for-jesus-mark block whitespace-nowrap text-[0.92em] leading-[0.88]">
                          For Jesus
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="mt-3 block h-px w-full bg-ink sm:mt-3.5"
                      />
                      <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-lime-foreground/55 sm:text-[10px]">
                        <span>Shape the city</span>
                        <span aria-hidden>·</span>
                        <span>Full Gospel</span>
                        <span aria-hidden>·</span>
                        <span>For Jesus</span>
                      </span>
                      <span
                        aria-hidden
                        className="mt-3 block h-px w-full bg-ink sm:mt-3.5"
                      />
                    </span>
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-base font-medium leading-snug sm:text-xl">
                  {siteMeta.mission}
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-lime-foreground/60 sm:text-base">
                  {siteMeta.missionSupport}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button variant="default" size="lg" offset asChild>
                    <Link to="/visit">
                      This Sunday · {siteMeta.visit.time}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/about">Our story</Link>
                  </Button>
                </div>
              </div>

              <DontPushButton />
            </div>
          </div>

          <motion.div
            style={{ opacity: scrollCueOpacity }}
            className="pointer-events-none absolute bottom-[8rem] left-1/2 z-20 -translate-x-1/2"
          >
            <div className="flex items-center gap-3 text-ink">
              <span className="font-mono text-[15px] font-bold uppercase tracking-[0.28em]">
                Scroll
              </span>
              <motion.span
                className="flex size-[1.875rem] items-center justify-center border-[1.5px] border-ink"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowDown className="size-[1.3125rem]" strokeWidth={2.5} />
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-30">
          <VerseMarquee
            className="border-b-0 border-t-2 border-ink"
            invertWhenVisible="#home-about"
          />
        </div>
      </div>
    </section>
  )
}

function StaticSplit({ slides }: { slides: CarouselSlide[] }) {
  const slide = slides[0]

  return (
    <section className="flex flex-col border-b-2 border-ink">
      <div className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-lime text-lime-foreground sm:min-h-[calc(100dvh-4.5rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[min(120vw,76rem)] items-center overflow-hidden"
        >
          <GeoIcon
            name="asterisk6"
            className="size-[min(120vw,76rem)] shrink-0 translate-x-1/2 text-ink/[0.07]"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start px-5 pb-28 pt-8 sm:justify-center sm:px-8 sm:pb-24 sm:pt-12 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.3em]">
              Norwich · England
            </p>

            <h1 className="type-display mt-6 text-[2.35rem] leading-[0.95] sm:mt-5 sm:text-5xl lg:text-[3.75rem]">
              {/* Scroll sits on the same row as Be Radical */}
              <span className="flex items-start justify-between gap-3">
                <span className="min-w-0 whitespace-nowrap">
                  Be <RotatingHeroWord />
                </span>
                <MobileScrollCue className="mt-1 lg:hidden" />
              </span>

              <span className="mt-5 block sm:mt-4">
                <span className="inline-block">
                  <span className="inline-block bg-ink px-2.5 py-[0.1em] sm:px-3.5">
                    <span className="for-jesus-mark block whitespace-nowrap text-[0.92em] leading-[0.88]">
                      For Jesus
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="mt-4 block h-px w-full bg-ink sm:mt-3.5"
                  />
                  <span className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-lime-foreground/55 sm:mt-3 sm:text-[10px]">
                    <span>Shape the city</span>
                    <span aria-hidden>·</span>
                    <span>Full Gospel</span>
                    <span aria-hidden>·</span>
                    <span>For Jesus</span>
                  </span>
                  <span
                    aria-hidden
                    className="mt-4 block h-px w-full bg-ink sm:mt-3.5"
                  />
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base font-medium leading-snug sm:mt-6 sm:text-xl">
              {siteMeta.mission}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-lime-foreground/60 sm:mt-2 sm:text-base">
              {siteMeta.missionSupport}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Button variant="default" size="lg" offset asChild>
                <Link to="/visit">
                  This Sunday · {siteMeta.visit.time}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Our story</Link>
              </Button>
            </div>
          </div>
          <DontPushButton markClassName="size-72 text-ink" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-30">
          <VerseMarquee
            className="border-b-0 border-t-2 border-ink"
            invertWhenVisible="#home-about"
          />
        </div>
      </div>

      {/* Image below — no scroll-expand on mobile */}
      <div className="relative h-[38vh] w-full overflow-hidden bg-ink sm:h-[42vh]">
        {slide ? (
          <div className="photo-grain absolute inset-0">
            <img
              src={slide.image}
              alt=""
              className="photo-bw absolute inset-0 size-full object-cover"
              style={
                slide.imagePosition
                  ? { objectPosition: slide.imagePosition }
                  : undefined
              }
              decoding="async"
            />
            <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
        ) : null}
      </div>
    </section>
  )
}
