import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'

import { DontPushButton } from '@/components/marketing/DontPushButton'
import { RotatingHeroWord } from '@/components/marketing/RotatingHeroWord'
import { VerseMarquee } from '@/components/marketing/VerseMarquee'
import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { Button } from '@/components/ui/button'
import { siteMeta } from '@/lib/nav'
import { cn } from '@/lib/utils'

/** Match StackSlide horizontal gutters (px-6 / sm:px-10 / lg:px-16 / xl:px-20) */
function contentWidth(vw: number) {
  const pad =
    vw >= 1280 ? 80 : vw >= 1024 ? 64 : vw >= 640 ? 40 : 24
  return Math.max(vw - pad * 2, 320)
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

function useViewport() {
  const [size, setSize] = useState({ w: 1280, h: 800 })
  useEffect(() => {
    function measure() {
      setSize({ w: window.innerWidth, h: window.innerHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  return size
}

/**
 * Full-bleed lime hero. On scroll (desktop) it shrinks to the width of
 * content below and shortens slightly in height — stays centered.
 */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const { w: vw, h: vh } = useViewport()

  const headerH = vw >= 640 ? 72 : 64
  const fullH = Math.max(vh - headerH, 480)
  const shrunkH = Math.round(fullH * 0.82)
  const endW = contentWidth(vw)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const p = useTransform(scrollYProgress, [0, 0.85], [0, 1])
  const width = useTransform(p, [0, 1], [vw, endW])
  const height = useTransform(p, [0, 1], [fullH, shrunkH])
  const scrollCueOpacity = useTransform(p, [0, 0.18], [1, 0])
  const sideBorder = useTransform(p, [0, 0.35, 1], [0, 0, 2])

  if (reduceMotion || !isDesktop) {
    return <StaticHero />
  }

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-paper">
      <div
        className="sticky top-16 flex items-center justify-center sm:top-[4.5rem]"
        style={{ height: fullH }}
      >
        <motion.div
          style={{
            width,
            height,
            borderLeftWidth: sideBorder,
            borderRightWidth: sideBorder,
            borderTopWidth: sideBorder,
          }}
          className="relative flex flex-col overflow-hidden border-b-2 border-ink bg-lime text-lime-foreground"
        >
          <HeroChrome scrollCueOpacity={scrollCueOpacity} />
        </motion.div>
      </div>
    </section>
  )
}

function StaticHero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden border-b-2 border-ink bg-lime text-lime-foreground sm:min-h-[calc(100dvh-4.5rem)]">
      <HeroChrome />
    </section>
  )
}

function HeroChrome({
  scrollCueOpacity,
}: {
  scrollCueOpacity?: ReturnType<typeof useTransform<number, number>>
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[min(120vw,76rem)] items-center overflow-hidden"
      >
        <GeoIcon
          name="asterisk6"
          className="size-[min(120vw,76rem)] shrink-0 translate-x-1/2 text-ink/[0.07]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-8 sm:px-8 sm:pt-12 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.3em]">
            Norwich · England
          </p>
          <ScrollCue className="lg:hidden" />
        </div>

        <div className="mt-6 grid flex-1 items-center gap-10 sm:mt-8 lg:grid-cols-[1.15fr_0.85fr]">
          <HeroCopy className="max-w-3xl" />
          <DontPushButton markClassName="size-64 text-ink xl:size-80" />
        </div>

        {scrollCueOpacity ? (
          <motion.div
            style={{ opacity: scrollCueOpacity }}
            className="pointer-events-none absolute bottom-28 left-1/2 z-20 hidden -translate-x-1/2 lg:block"
          >
            <ScrollCue />
          </motion.div>
        ) : (
          <div className="mt-10 mb-24 flex justify-center lg:mb-28">
            <ScrollCue className="hidden lg:flex" />
          </div>
        )}
      </div>

      <div className="relative z-30 mt-auto">
        <VerseMarquee
          className="border-b-0 border-t-2 border-ink"
          invertWhenVisible="#home-about"
        />
      </div>
    </>
  )
}

function HeroCopy({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="type-display text-[2.35rem] leading-[0.95] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
        <span className="block whitespace-nowrap">
          Be <RotatingHeroWord />
        </span>

        <span className="mt-5 block sm:mt-4">
          <span className="inline-block">
            <span className="inline-block bg-ink px-2.5 py-[0.1em] sm:px-3.5">
              <span className="for-jesus-mark block whitespace-nowrap text-[0.92em] leading-[0.88]">
                For Jesus
              </span>
            </span>
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
  )
}

function ScrollCue({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={cn(
        'pointer-events-none flex shrink-0 items-center gap-2 text-ink',
        className
      )}
    >
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] lg:text-[15px] lg:tracking-[0.28em]">
        Scroll
      </span>
      <motion.span
        className="flex size-7 items-center justify-center border-[1.5px] border-ink lg:size-[1.875rem]"
        animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ArrowDown
          className="size-4 lg:size-[1.3125rem]"
          strokeWidth={2.5}
        />
      </motion.span>
    </div>
  )
}
