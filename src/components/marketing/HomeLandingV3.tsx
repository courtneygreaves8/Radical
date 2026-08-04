import type { ReactNode } from 'react'
import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

import { AppImage } from '@/components/shared/AppImage'
import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { MorphMark } from '@/components/marketing/MorphMark'
import { heroSlots } from '@/lib/images'
import { siteMeta } from '@/lib/nav'
import { cn } from '@/lib/utils'

/** Shared horizontal + vertical rhythm for below-fold sections */
const v3PadX = 'px-5 sm:px-8 lg:px-10'
const v3SectionY = 'my-[120px]'
const v3GridGap = 'gap-4 sm:gap-5'
const v3SplitGap = 'gap-10 lg:gap-12'

/**
 * Landing V3 — editorial cream + terracotta grid (FEMMEFIT-inspired).
 * Soft rounded media, pill CTAs, asymmetrical hero, Radical copy.
 */
export function HomeLandingV3() {
  return (
    <div className="landing-v3 relative overflow-x-clip text-[var(--v3-ink)]">
      <Hero />
      <div
        className={cn(
          'relative z-20 rounded-t-[1.75rem] bg-[var(--v3-below)] sm:rounded-t-[2.25rem] lg:rounded-t-[2.75rem]',
          'shadow-[0_-12px_36px_rgba(30,21,18,0.1)]'
        )}
      >
        <div className={cn(v3PadX, 'flex flex-col')}>
          <Quote />
          <FeatureRow />
          <Narrative />
        </div>
      </div>
    </div>
  )
}

function Marquee() {
  const phrases = ['SHAPE THE CITY', 'FOR JESUS']
  const strip = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className="flex items-center">
          <span className="font-sans text-[clamp(1.15rem,2.8vw,2rem)] font-bold uppercase tracking-[0.2em]">
            {phrases[i % phrases.length]}
          </span>
          <span className="inline-flex w-10 shrink-0 items-center justify-center text-[clamp(1.15rem,2.8vw,2rem)] font-bold sm:w-14">
            ·
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="w-full overflow-hidden bg-[var(--v3-terra)] py-4 text-white sm:py-5 md:py-6">
      <div className="flex w-max animate-[v3-marquee_32s_linear_infinite] whitespace-nowrap will-change-transform">
        {strip}
        {strip}
      </div>
    </div>
  )
}

function Hero() {
  /* Shape height = hero band height; content fills that band */
  const band =
    'min-h-[min(70dvh,36rem)] sm:min-h-[min(76dvh,44rem)] lg:h-[min(82dvh,50rem)] lg:min-h-0'
  const [inkHot, setInkHot] = useState(false)

  return (
    <section className="relative overflow-x-clip bg-[var(--v3-cream)]">
      <div className={cn('relative', band)}>
        {/* Left-edge watermark — hugs band height; only right half on-screen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-0 flex items-center overflow-hidden"
        >
          <GeoIcon
            name="asterisk6"
            className="aspect-square h-full w-auto max-w-none shrink-0 -translate-x-1/2 text-[var(--v3-ink)] opacity-[0.09]"
          />
        </div>

        <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 px-5 py-5 sm:gap-5 sm:px-8 sm:py-6 lg:grid-cols-3 lg:grid-rows-[minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5 lg:px-10 lg:py-7">
          {/* Ink copy — burnt orange gradient on hover */}
          <div
            className="group/hero relative flex flex-col justify-between gap-6 overflow-hidden rounded-[1.5rem] bg-[var(--v3-ink)] px-6 py-7 text-white transition-colors duration-500 sm:rounded-[1.75rem] sm:px-8 sm:py-8 lg:col-span-2 lg:row-span-2 lg:rounded-[2rem] lg:px-10 lg:py-9"
            onMouseEnter={() => setInkHot(true)}
            onMouseLeave={() => setInkHot(false)}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#e07a42] via-[var(--v3-terra)] to-[#8f3a1c] opacity-0 transition-opacity duration-500 ease-out group-hover/hero:opacity-100"
            />
            <div className="relative z-10 min-w-0">
              <h1 className="max-w-2xl font-sans text-[clamp(1.5rem,3.2vw,2.65rem)] font-bold uppercase leading-[1.05] tracking-tight text-white">
                Faith that shapes a city is influenced by the Cross.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 transition-colors duration-500 group-hover/hero:text-white/85 sm:mt-4 sm:text-[15px]">
                {siteMeta.missionSupport} Helping shape Norwich — for Jesus.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <blockquote className="flex max-w-md items-start gap-4 sm:gap-5">
                <GeoIcon
                  name="rings"
                  className="mt-0.5 size-9 shrink-0 text-white/30 transition-colors duration-500 group-hover/hero:text-white/55 sm:size-11"
                />
                <div className="min-w-0">
                  <p className="font-sans text-[15px] leading-snug text-white/75 transition-colors duration-500 group-hover/hero:text-white/95 sm:text-base md:text-lg">
                    “You are the light of the world. A city set on a hill cannot
                    be hidden.”
                  </p>
                  <cite className="mt-2.5 block text-[11px] font-semibold not-italic uppercase tracking-[0.18em] text-white/40 transition-colors duration-500 group-hover/hero:text-white/65">
                    Matthew 5:14
                  </cite>
                </div>
              </blockquote>

              <div className="flex flex-wrap gap-2.5 sm:shrink-0 sm:justify-end sm:gap-3">
                <HeroCta to="/visit" label="This Sunday" variant="cream" />
                <HeroCta to="/about" label="Learn more" variant="ghost" />
              </div>
            </div>
          </div>

          {/* Service times — centered between ink block & seal; nudged down 22px */}
          <aside className="flex flex-col justify-end gap-1 px-1 pb-1 pt-2 lg:col-start-3 lg:row-start-1 lg:justify-end lg:px-0 lg:pr-36 lg:pb-0 lg:pt-0 lg:mb-[-4px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--v3-ink)]/45">
              Service times
            </p>
            <p className="font-sans text-xl font-bold uppercase leading-tight tracking-tight text-[var(--v3-ink)] sm:text-2xl">
              {siteMeta.visit.day}
              <span className="text-[var(--v3-terra)]"> · </span>
              {siteMeta.visit.time}
            </p>
            <p className="mt-1 text-sm font-medium text-[var(--v3-ink)]/70">
              {siteMeta.visit.venue}
            </p>
            <p className="text-xs leading-relaxed text-[var(--v3-ink)]/45">
              {siteMeta.visit.address}
            </p>
          </aside>

          {/* Card 3 — starts at half brown height, runs to bottom with cards 1–2 */}
          <HeroThumb
            to="/visit"
            heading="This Sunday"
            src={heroSlots.sunday}
            badge
            sealInkHot={inkHot}
            className="min-h-[16rem] lg:col-start-3 lg:row-span-2 lg:row-start-2 lg:min-h-0"
          />

          {/* Cards 1 + 2 — bottom row under copy */}
          <HeroThumb
            to="/about"
            heading="About us"
            src={heroSlots.about}
            finish="natural"
            variant="card"
            className="min-h-[14rem] lg:col-start-1 lg:row-start-3 lg:min-h-0"
          />
          <HeroThumb
            to="/missions"
            heading="Radical · Norwich"
            src={heroSlots.city}
            finish="bw-grain"
            variant="card"
            className="min-h-[14rem] lg:col-start-2 lg:row-start-3 lg:min-h-0"
          />
        </div>
      </div>

      <Marquee />
    </section>
  )
}

function HeroThumb({
  to,
  heading,
  className,
  badge,
  src,
  sealInkHot,
  finish = 'bw-grain',
  variant = 'bleed',
}: {
  to: string
  heading: string
  className?: string
  badge?: boolean
  src?: string
  sealInkHot?: boolean
  finish?: 'bw-grain' | 'grain' | 'natural'
  variant?: 'bleed' | 'card'
}) {
  const hasPhoto = Boolean(src)

  if (variant === 'card') {
    return (
      <Link
        to={to}
        className={cn(
          'group relative flex h-full min-h-[inherit] flex-col overflow-hidden rounded-[1.35rem] bg-white p-3 shadow-[0_12px_36px_rgba(30,21,18,0.08)] ring-1 ring-[var(--v3-ink)]/8 sm:rounded-[1.6rem] sm:p-3.5 lg:rounded-[1.75rem] lg:p-4',
          className
        )}
      >
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.05rem] sm:rounded-[1.2rem]">
          <AppImage
            stub={!hasPhoto}
            src={src}
            alt=""
            className="absolute inset-0 size-full"
            iconClassName="size-10 text-[var(--v3-terra)]/40 sm:size-12"
            finish={finish}
          />
        </div>
        <div className="flex items-center justify-between gap-3 pt-3 sm:pt-3.5">
          <p className="min-w-0 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-ink)] sm:text-xs">
            {heading}
          </p>
          <GrowMark tone="ink" />
        </div>
      </Link>
    )
  }

  const card = (
    <Link
      to={to}
      className={cn(
        'group relative block h-full min-h-[inherit] overflow-hidden rounded-[1.35rem] sm:rounded-[1.6rem] lg:rounded-[1.75rem]',
        !badge && className
      )}
    >
      <div
        className={cn(
          'absolute inset-0 overflow-hidden rounded-[1.35rem] sm:rounded-[1.6rem] lg:rounded-[1.75rem]'
        )}
      >
        <AppImage
          stub={!hasPhoto}
          src={src}
          alt=""
          className="absolute inset-0 size-full"
          iconClassName="size-10 text-[var(--v3-terra)]/40 sm:size-12"
          finish={finish}
        />
        {hasPhoto ? (
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--v3-ink)]/75 to-transparent"
          />
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 sm:p-5 lg:p-6">
        <p
          className={cn(
            'min-w-0 font-sans text-[11px] font-bold uppercase tracking-[0.14em] sm:text-xs',
            hasPhoto ? 'text-[var(--v3-cream)]' : 'text-[var(--v3-ink)]'
          )}
        >
          {heading}
        </p>
        <GrowMark tone={hasPhoto ? 'inverse' : 'light'} />
      </div>
    </Link>
  )

  if (!badge) return card

  return (
    <div className={cn('relative', className)}>
      {card}
      <CircleTextBadge
        inkHot={sealInkHot}
        className="absolute top-0 right-0 z-20 size-72 -translate-y-1/2 translate-x-1/2"
      />
    </div>
  )
}

/** ~288px branded seal — circular text centered between double rings */
function CircleTextBadge({
  className,
  inkHot,
}: {
  className?: string
  inkHot?: boolean
}) {
  const uid = useId().replace(/:/g, '')
  const pathId = `circle-text-${uid}`
  const gradId = `seal-brown-${uid}`
  const phrase = 'THIS SUNDAY @ RADICAL · '
  const label = phrase.repeat(3)
  // Rings at 48 / 34 (stroke midlines); text path sits in the alley between them
  const outerR = 48
  const innerR = 34
  const textR = (outerR + innerR) / 2
  const pathLen = 2 * Math.PI * textR

  const fg = inkHot ? 'var(--v3-cream)' : 'var(--v3-terra)'
  const bg = inkHot ? `url(#${gradId})` : 'var(--v3-cream)'

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-auto relative size-72',
        !inkHot &&
          '[--seal-bg:var(--v3-cream)] [--seal-fg:var(--v3-terra)] hover:[--seal-bg:var(--v3-terra)] hover:[--seal-fg:var(--v3-cream)]',
        className
      )}
    >
      <svg viewBox="0 0 100 100" className="size-full overflow-visible">
        <defs>
          <linearGradient
            id={gradId}
            x1="18%"
            y1="12%"
            x2="88%"
            y2="92%"
          >
            <stop offset="0%" stopColor="#4a3228" />
            <stop offset="42%" stopColor="#1e1512" />
            <stop offset="100%" stopColor="#2a1812" />
          </linearGradient>
          <path
            id={pathId}
            d={`M 50,50 m -${textR},0 a ${textR},${textR} 0 1,1 ${textR * 2},0 a ${textR},${textR} 0 1,1 -${textR * 2},0`}
          />
        </defs>
        <circle
          cx="50"
          cy="50"
          r={outerR}
          className="transition-[fill,stroke] duration-500"
          fill={inkHot ? bg : 'var(--seal-bg, var(--v3-cream))'}
          stroke={inkHot ? fg : 'var(--seal-fg, var(--v3-terra))'}
          strokeWidth="2"
        />
        <circle
          cx="50"
          cy="50"
          r={innerR}
          className="transition-[fill,stroke] duration-500"
          fill={inkHot ? bg : 'var(--seal-bg, var(--v3-cream))'}
          stroke={inkHot ? fg : 'var(--seal-fg, var(--v3-terra))'}
          strokeWidth="1.5"
        />
        <text
          fill={inkHot ? fg : 'var(--seal-fg, var(--v3-terra))'}
          fontSize="5"
          fontWeight="700"
          letterSpacing="0.32em"
          className="font-sans uppercase transition-[fill] duration-500"
          style={{ dominantBaseline: 'central' }}
        >
          <textPath
            href={`#${pathId}`}
            startOffset="0%"
            textLength={pathLen}
            lengthAdjust="spacing"
          >
            {label}
          </textPath>
        </text>
      </svg>
      <MorphMark
        className={cn(
          'absolute top-1/2 left-1/2 size-[44%] -translate-x-1/2 -translate-y-1/2 transition-colors duration-500',
          inkHot ? 'text-[var(--v3-cream)]' : 'text-[var(--seal-fg,var(--v3-terra))]'
        )}
      />
    </div>
  )
}

/** Circle arrow → grows into Radical asterisk on hover */
function GrowMark({
  className,
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'ink' | 'inverse'
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center overflow-hidden sm:size-9',
        'rounded-full transition-[width,height,background-color,color] duration-300 ease-out',
        'group-hover:size-11 sm:group-hover:size-12',
        tone === 'light' &&
          'bg-white text-[var(--v3-ink)] group-hover:bg-[var(--v3-terra)] group-hover:text-white',
        tone === 'ink' &&
          'bg-[var(--v3-ink)] text-[var(--v3-cream)] group-hover:bg-[var(--v3-terra)] group-hover:text-white',
        tone === 'inverse' &&
          'bg-white text-[var(--v3-ink)] group-hover:bg-[var(--v3-ink)] group-hover:text-[var(--v3-cream)]',
        className
      )}
    >
      <ArrowUpRight
        className="size-3.5 transition duration-300 ease-out group-hover:scale-0 group-hover:rotate-45 group-hover:opacity-0 sm:size-4"
        strokeWidth={2.5}
      />
      <GeoIcon
        name="asterisk6"
        className="absolute size-[78%] scale-50 rotate-45 opacity-0 transition duration-300 ease-out group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 group-hover:delay-75"
      />
    </span>
  )
}

function Quote() {
  return (
    <section className={v3SectionY}>
      <p className="mx-auto max-w-4xl font-sans text-[clamp(1.75rem,4.2vw,2.85rem)] font-bold leading-[1.22] tracking-tight text-[var(--v3-ink)] [text-indent:2.5rem] sm:[text-indent:3.5rem] lg:[text-indent:4.5rem]">
        A <span className="text-[var(--v3-terra)]">church</span> that runs
        toward the broken immediately becomes dearer to the{' '}
        <span className="text-[var(--v3-terra)]">city</span>. Soft hearts. Hard
        discipleship. Helping shape Norwich — for{' '}
        <span className="text-[var(--v3-terra)]">Jesus</span>.
      </p>
    </section>
  )
}

function FeatureRow() {
  const reduceMotion = useReducedMotion()
  const startHere = {
    href: '/visit',
    body: 'City Gates · Sunday 10:30',
  }
  const sideTiles = [{ label: 'Missions', href: '/missions' }]

  const floatEase = [0.45, 0.05, 0.55, 0.95] as const
  const sideFloat = reduceMotion ? undefined : { y: [0, -9, 0, 7, 0] }
  const midFloat = reduceMotion ? undefined : { y: [0, 9, 0, -7, 0] }
  const sideTransition = {
    duration: 6.2,
    repeat: Infinity,
    ease: floatEase,
  }
  const midTransition = {
    duration: 6.2,
    repeat: Infinity,
    ease: floatEase,
    delay: 0.15,
  }

  return (
    <section className={cn('relative z-10', v3SectionY)}>
      <div
        className={cn(
          'mx-auto grid max-w-7xl items-stretch sm:grid-cols-2 lg:grid-cols-4',
          v3GridGap
        )}
      >
        <motion.div
          className="lg:-translate-y-1/2"
          animate={sideFloat}
          transition={sideTransition}
        >
          <Link
            to="/give"
            className="group relative z-[1] block min-h-[280px] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
          >
            <AppImage
              alt=""
              className="absolute inset-0 size-full transition duration-500 group-hover:scale-[1.03]"
              iconClassName="size-10 text-[var(--v3-terra)]/40"
            />
            <span className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-white text-[var(--v3-ink)] shadow-sm">
              <Plus className="size-4" strokeWidth={2.5} />
            </span>
            <span className="absolute right-4 bottom-4 left-4 z-10 font-sans text-sm font-bold uppercase tracking-wider text-[var(--v3-ink)]">
              Give
            </span>
          </Link>
        </motion.div>

        <motion.article
          className="relative z-0 flex min-h-[280px] flex-row gap-4 overflow-hidden rounded-[1.75rem] bg-[var(--v3-terra)] p-6 text-white sm:col-span-2 sm:gap-5 sm:rounded-[2rem] sm:p-7 lg:col-span-2"
          animate={midFloat}
          transition={midTransition}
        >
          <AppImage
            alt=""
            className="aspect-square w-[42%] max-w-[11.5rem] shrink-0 self-stretch overflow-hidden rounded-[1.15rem] bg-white/20 text-white/50 sm:max-w-none sm:rounded-[1.35rem]"
            iconClassName="size-8 text-white/55 sm:size-10"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Start here
              </p>
              <h3 className="mt-3 font-sans text-xl font-bold uppercase leading-tight tracking-tight sm:mt-4 sm:text-2xl">
                Come expectant this Sunday.
              </h3>
              <p className="mt-2 text-sm text-white/80 sm:mt-3">{startHere.body}</p>
            </div>
            <Pill to={startHere.href} tone="light" className="mt-6 self-start sm:mt-8">
              Learn more
              <CircleArrow dark />
            </Pill>
          </div>
        </motion.article>

        {sideTiles.map((t) => (
          <motion.div
            key={t.label}
            className="lg:-translate-y-2/3"
            animate={sideFloat}
            transition={{ ...sideTransition, delay: 0.35 }}
          >
            <Link
              to={t.href}
              className="group relative z-[1] block min-h-[280px] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
            >
              <AppImage
                alt=""
                className="absolute inset-0 size-full transition duration-500 group-hover:scale-[1.03]"
                iconClassName="size-10 text-[var(--v3-terra)]/40"
              />
              <span className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-white text-[var(--v3-ink)] shadow-sm">
                <Plus className="size-4" strokeWidth={2.5} />
              </span>
              <span className="absolute right-4 bottom-4 left-4 z-10 font-sans text-sm font-bold uppercase tracking-wider text-[var(--v3-ink)]">
                {t.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Narrative() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { amount: 0.35, once: false })
  const caps = [
    {
      title: 'Presence',
      meta: 'Worship · Word',
      href: '/visit',
    },
    {
      title: 'People',
      meta: 'Margins first',
      href: '/missions',
    },
    {
      title: 'Place',
      meta: 'Norwich streets',
      href: '/about',
    },
  ]

  return (
    <section
      ref={ref}
      className="relative -mx-5 sm:-mx-8 lg:-mx-10"
    >
      {/* Same burnt-orange wash as hero ink hover — fades in on scroll */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br from-[#e07a42] via-[var(--v3-terra)] to-[#8f3a1c]',
          inView ? 'opacity-100' : 'opacity-0',
          !reduceMotion && 'transition-opacity duration-700 ease-out'
        )}
      />
      <div
        className={cn(
          v3SectionY,
          'relative z-10 px-5 sm:px-8 lg:px-10'
        )}
      >
        <div
          className={cn(
            'mx-auto grid max-w-7xl items-start lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]',
            v3SplitGap
          )}
        >
          <div className="relative mx-auto w-full max-w-[40rem] pb-8 sm:max-w-[46rem] sm:pb-10 lg:mx-0 lg:max-w-none">
            <div className="flex justify-center lg:justify-start lg:pl-2">
              <div className="relative aspect-[3/4] w-[16.5rem] origin-top -rotate-[15deg] sm:w-[19rem] lg:w-[21.5rem]">
                {caps.map((c, i) => {
                  const fromCenter = i - (caps.length - 1) / 2
                  const fan = fromCenter * 18
                  const x = fromCenter * 5.5
                  const y = Math.abs(fromCenter) * 0.55
                  return (
                    <Link
                      key={c.title}
                      to={c.href}
                      className="group absolute inset-0 origin-bottom"
                      style={{
                        transform: `translate(${x}rem, ${y}rem) rotate(${fan}deg)`,
                        zIndex: i + 1,
                      }}
                    >
                      <div className="relative h-full overflow-hidden rounded-[1.35rem] bg-white shadow-[0_22px_50px_rgba(30,21,18,0.16)] ring-1 ring-[var(--v3-ink)]/10 sm:rounded-[1.6rem]">
                        <AppImage
                          alt=""
                          className="absolute inset-0 size-full bg-[var(--v3-ink)]/[0.04]"
                          iconClassName="size-10 text-[var(--v3-terra)]/40 sm:size-12"
                        />
                        <div className="relative z-10 border-b border-[var(--v3-ink)]/10 px-4 py-3.5 pr-12 sm:px-5 sm:py-4 sm:pr-14">
                          <span className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white text-[var(--v3-ink)] shadow-sm transition group-hover:bg-[var(--v3-terra)] group-hover:text-white sm:top-3.5 sm:right-3.5 sm:size-9">
                            <Plus className="size-3.5 sm:size-4" strokeWidth={2.5} />
                          </span>
                          <p className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--v3-ink)] sm:text-sm">
                            {c.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-[var(--v3-ink)]/50 sm:text-xs">
                            Radical · {c.meta}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <h2
            className={cn(
              'max-w-xl font-sans text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-tight lg:ml-auto lg:text-right',
              !reduceMotion && 'transition-colors duration-700 ease-out',
              inView ? 'text-[var(--v3-cream)]' : 'text-[var(--v3-ink)]'
            )}
          >
            When they write that a city was shaped for good — they mean{' '}
            <span
              className={cn(
                !reduceMotion && 'transition-colors duration-700 ease-out',
                inView ? 'text-white' : 'text-[var(--v3-terra)]'
              )}
            >
              Jesus
            </span>{' '}
            made{' '}
            <span
              className={cn(
                !reduceMotion && 'transition-colors duration-700 ease-out',
                inView ? 'text-white' : 'text-[var(--v3-terra)]'
              )}
            >
              famous
            </span>{' '}
            on these streets.
          </h2>
        </div>
      </div>
    </section>
  )
}

function HeroCta({
  to,
  label,
  variant,
}: {
  to: string
  label: string
  variant: 'dark' | 'cream' | 'ghost'
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-5 text-[11px] font-bold uppercase tracking-[0.16em] transition sm:gap-3.5 sm:py-2 sm:pr-2 sm:pl-6 sm:text-xs',
        variant === 'dark' &&
          'bg-[var(--v3-ink)] text-[var(--v3-cream)] ring-1 ring-white/15 hover:bg-[var(--v3-cream)] hover:text-[var(--v3-ink)]',
        variant === 'cream' &&
          'bg-[var(--v3-cream)] text-[var(--v3-ink)] hover:bg-white',
        variant === 'ghost' &&
          'bg-white/10 text-[var(--v3-cream)] ring-1 ring-white/25 hover:bg-white/15'
      )}
    >
      {label}
      <GrowMark
        tone={variant === 'cream' ? 'ink' : 'inverse'}
        className={cn(
          variant === 'dark' &&
            'group-hover:bg-[var(--v3-ink)] group-hover:text-[var(--v3-cream)]'
        )}
      />
    </Link>
  )
}

function CircleArrow({ dark }: { dark?: boolean }) {
  return (
    <span
      className={cn(
        'ml-1 flex size-6 items-center justify-center rounded-full',
        dark ? 'bg-[var(--v3-ink)] text-white' : 'bg-white/15 text-white'
      )}
    >
      <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
    </span>
  )
}

function Pill({
  to,
  children,
  tone = 'dark',
  className,
}: {
  to: string
  children: ReactNode
  tone?: 'dark' | 'light' | 'ghost' | 'cream'
  className?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition',
        tone === 'dark' &&
          'bg-[var(--v3-ink)] text-white hover:bg-[#140e0c]',
        tone === 'light' &&
          'bg-white text-[var(--v3-ink)] hover:bg-white/90',
        tone === 'cream' &&
          'bg-[var(--v3-cream)] text-[var(--v3-ink)] hover:bg-white',
        tone === 'ghost' &&
          'border border-white/30 bg-transparent text-white hover:border-white',
        className
      )}
    >
      {children}
    </Link>
  )
}
