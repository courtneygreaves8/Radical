import { useEffect, useRef, useState } from 'react'
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

/**
 * Full-bleed lime over a full-bleed photo.
 * On scroll the lime shrinks from the bottom; the image was always underneath.
 */
export function HomeHero({ slides }: HomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [slideIndex, setSlideIndex] = useState(0)
  const slide = slides[slideIndex] ?? slides[0]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const p = useTransform(scrollYProgress, [0, 0.85], [0, 1])
  /* Lime pinned to top: 100% → 50%. Image stays full-bleed underneath. */
  const limeHeight = useTransform(p, (v) => `${100 - v * 50}%`)
  const chromeOpacity = useTransform(p, [0.35, 0.75], [0, 1])
  const scrollCueOpacity = useTransform(p, [0, 0.12], [1, 0])

  useEffect(() => {
    if (slides.length < 2 || reduceMotion) return
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length)
    }, 5500)
    return () => window.clearInterval(id)
  }, [slides.length, reduceMotion])

  if (reduceMotion) {
    return <StaticSplit slides={slides} />
  }

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-ink">
      <div className="sticky top-16 h-[calc(100dvh-4rem)] overflow-hidden border-b-2 border-ink sm:top-[4.5rem] sm:h-[calc(100dvh-4.5rem)]">
        {/* Full-bleed image — always edge-to-edge; lime uncovers it */}
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

        {/* Lime slab — shrinks from the bottom to reveal the photo */}
        <motion.div
          style={{ height: limeHeight }}
          className="absolute inset-x-0 top-0 z-10 overflow-hidden bg-lime text-lime-foreground"
        >
          {/* Static background asterisk — 7% opacity, 2× size, right half clipped */}
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
                <div className="relative mt-5">
                  {/* Mobile — far right, aligned with heading */}
                  <motion.div
                    style={{ opacity: scrollCueOpacity }}
                    className="pointer-events-none absolute top-0 right-0 z-20 flex items-center gap-2 text-ink lg:hidden"
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
                  </motion.div>

                  <h1 className="type-display max-w-[calc(100%-5.5rem)] text-4xl sm:text-5xl lg:max-w-none lg:text-[3.75rem] xl:text-[4.25rem]">
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
                </div>
                <p className="mt-6 max-w-xl text-base font-medium leading-snug sm:text-xl">
                  {siteMeta.mission}
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-lime-foreground/60 sm:text-base">
                  {siteMeta.missionSupport}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="default"
                    size="lg"
                    offset
                    asChild
                  >
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

          {/* Desktop — bottom centre */}
          <motion.div
            style={{ opacity: scrollCueOpacity }}
            className="pointer-events-none absolute bottom-[8rem] left-1/2 z-20 hidden -translate-x-1/2 lg:block"
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
    <section className="flex min-h-[calc(100dvh-4rem)] flex-col border-b-2 border-ink">
      <div className="relative flex flex-1 items-center overflow-hidden bg-lime px-5 py-16 text-lime-foreground sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[min(120vw,76rem)] items-center overflow-hidden"
        >
          <GeoIcon
            name="asterisk6"
            className="size-[min(120vw,76rem)] shrink-0 translate-x-1/2 text-ink/[0.07]"
          />
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.3em]">
              Norwich · England
            </p>
            <h1 className="type-display mt-5 text-4xl sm:text-5xl lg:text-[3.75rem]">
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
                  <span aria-hidden className="mt-3 block h-px w-full bg-ink sm:mt-3.5" />
                  <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-lime-foreground/55 sm:text-[10px]">
                    <span>Shape the city</span>
                    <span aria-hidden>·</span>
                    <span>Full Gospel</span>
                    <span aria-hidden>·</span>
                    <span>For Jesus</span>
                  </span>
                  <span aria-hidden className="mt-3 block h-px w-full bg-ink sm:mt-3.5" />
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium">
              {siteMeta.mission}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
              {siteMeta.missionSupport}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="default"
                size="lg"
                offset
                asChild
              >
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
      </div>
      <div className="relative h-[42vh] w-full overflow-hidden bg-ink">
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
            />
            <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-[3] p-6 pb-16">
              <h2 className="type-display text-2xl text-paper">{slide.title}</h2>
              <p className="mt-2 text-sm text-paper/70">{slide.caption}</p>
            </div>
          </div>
        ) : null}
      </div>
      <VerseMarquee className="border-b-0" invertWhenVisible="#home-about" />
    </section>
  )
}
