import type { ReactNode } from 'react'
import { useId, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

import { AppImage } from '@/components/shared/AppImage'
import { SiteLink } from '@/components/shared/SiteLink'
import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { MorphMark } from '@/components/marketing/MorphMark'
import { heroSlots } from '@/lib/images'
import { siteMeta } from '@/lib/nav'
import { cn } from '@/lib/utils'

/** Shared horizontal + vertical rhythm for below-fold sections */
const v3PadX = 'px-4 sm:px-8 lg:px-10'
const v3SectionY = 'my-10 sm:my-20 lg:my-[120px]'
const v3GridGap = 'gap-3 sm:gap-5'
const v3SplitGap = 'gap-6 sm:gap-10 lg:gap-12'

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

/**
 * Landing V3 — editorial cream + terracotta grid (FEMMEFIT-inspired).
 * Soft rounded media, pill CTAs, asymmetrical hero, Radical copy.
 */
export function HomeLandingV3() {
  return (
    <div className="landing-v3 relative bg-[var(--v3-below)] text-[var(--v3-ink)]">
      <div className="overflow-x-clip">
        <Hero />
      </div>
      {/* Continuous page bg — no elevated panel/shadow (those drew full-width seams) */}
      <div className={cn(v3PadX, 'relative flex flex-col pb-2 sm:pb-4')}>
        <QuoteFeaturesBand />
        <Narrative />
      </div>
    </div>
  )
}

function Marquee() {
  const phrases = [
    "NORWICH'S FEARLESS CHURCH",
    'GRITTY',
    'REAL',
    'SHAPING THE CITY',
  ]
  const strip = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className="flex items-center">
          <span className="font-sans text-[clamp(0.95rem,4vw,2rem)] font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em]">
            {phrases[i % phrases.length]}
          </span>
          <span className="inline-flex w-7 shrink-0 items-center justify-center text-[clamp(0.95rem,4vw,2rem)] font-bold sm:w-14">
            ·
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="w-full overflow-hidden bg-[var(--v3-terra)] py-3 text-white sm:py-5 md:py-6">
      <div className="flex w-max animate-[v3-marquee_32s_linear_infinite] whitespace-nowrap will-change-transform">
        {strip}
        {strip}
      </div>
    </div>
  )
}

function Hero() {
  /* Desktop locks to a band; mobile sizes to content */
  const band =
    'lg:h-[min(82dvh,50rem)] lg:min-h-0 sm:min-h-[min(76dvh,44rem)]'
  const [inkHot, setInkHot] = useState(false)

  return (
    <section className="relative overflow-x-clip bg-[var(--v3-below)] pt-12 lg:pt-0">
      <div className={cn('relative', band)}>
        {/* Left-edge watermark — desktop/tablet; crowded on small screens */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden items-center overflow-hidden sm:flex"
        >
          <GeoIcon
            name="asterisk6"
            className="aspect-square h-full w-auto max-w-none shrink-0 -translate-x-1/2 text-[var(--v3-ink)] opacity-[0.09]"
          />
        </div>

        <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-2 gap-3 px-4 py-4 sm:gap-5 sm:px-8 sm:py-6 lg:grid-cols-3 lg:grid-rows-[minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5 lg:px-10 lg:py-7">
          {/* Ink copy — burnt orange gradient on hover */}
          <div
            className="group/hero relative order-3 col-span-2 flex flex-col justify-between gap-5 overflow-hidden rounded-[1.25rem] bg-[var(--v3-ink)] px-5 py-5 text-white transition-colors duration-500 sm:gap-6 sm:rounded-[1.75rem] sm:px-8 sm:py-8 lg:order-none lg:col-span-2 lg:row-span-2 lg:rounded-[2rem] lg:px-10 lg:py-9"
            onMouseEnter={() => setInkHot(true)}
            onMouseLeave={() => setInkHot(false)}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#e07a42] via-[var(--v3-terra)] to-[#8f3a1c] opacity-0 transition-opacity duration-500 ease-out group-hover/hero:opacity-100"
            />
            <div className="relative z-10 min-w-0">
              <h1 className="max-w-2xl font-sans text-[clamp(2.35rem,12vw,2.65rem)] font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-[clamp(1.5rem,3.2vw,2.65rem)] sm:leading-[1.05]">
                Norwich&apos;s
                <br className="sm:hidden" />{' '}
                Fearless
                <br className="sm:hidden" />{' '}
                Church.
              </h1>
              <p className="mt-1.5 font-sans text-[clamp(0.8rem,3.4vw,1.2rem)] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors duration-500 group-hover/hero:text-white/90 sm:mt-2 sm:tracking-[0.14em]">
                Gritty. Real. Shaping the city.
              </p>
              <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-white/55 transition-colors duration-500 group-hover/hero:text-white/85 sm:mt-4 sm:text-[15px]">
                Fearlessly shaping Norwich for Jesus&apos; Return — a people who
                stand up, speak up, and will not stay quiet about His name.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <blockquote className="flex max-w-md items-start gap-2.5 sm:gap-5">
                <GeoIcon
                  name="rings"
                  className="mt-0.5 size-7 shrink-0 text-white/30 transition-colors duration-500 group-hover/hero:text-white/55 sm:size-11"
                />
                <div className="min-w-0">
                  <p className="font-sans text-sm leading-snug text-white/75 transition-colors duration-500 group-hover/hero:text-white/95 sm:text-base md:text-lg">
                    “For many are called, but few are chosen.”
                  </p>
                  <cite className="mt-2 block text-[10px] font-semibold not-italic uppercase tracking-[0.18em] text-white/40 transition-colors duration-500 group-hover/hero:text-white/65 sm:mt-2.5 sm:text-[11px]">
                    Matthew 22:14
                  </cite>
                </div>
              </blockquote>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[13.5rem] sm:shrink-0 sm:gap-3">
                <HeroCta to="/visit" label="Dare to visit" variant="cream" />
                <HeroCta to="/about" label="Our story" variant="ghost" />
              </div>
            </div>
          </div>

          {/* Service times — desktop only beside seal; mobile overlays praying image */}
          <aside className="hidden flex-col justify-end gap-1 px-1 pb-1 pt-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:mb-[-4px] lg:flex lg:px-0 lg:pr-36 lg:pt-0 lg:pb-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--v3-ink)]/45">
              Service times
            </p>
            <p className="font-sans text-2xl font-bold uppercase leading-tight tracking-tight text-[var(--v3-ink)]">
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

          {/* Praying man — service times sit top-left on mobile */}
          <div className="relative order-1 col-span-2 min-h-[14rem] sm:min-h-[16rem] lg:contents">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 rounded-t-[1.35rem] bg-gradient-to-b from-[var(--v3-ink)]/65 via-[var(--v3-ink)]/25 to-transparent p-4 pb-16 sm:rounded-t-[1.6rem] lg:hidden">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                Service times
              </p>
              <p className="mt-0.5 font-sans text-lg font-bold uppercase leading-tight tracking-tight text-white">
                {siteMeta.visit.day}
                <span className="text-[var(--v3-terra)]"> · </span>
                {siteMeta.visit.time}
              </p>
              <p className="mt-0.5 text-sm font-medium text-white/80">
                {siteMeta.visit.venue}
              </p>
              <p className="text-xs leading-relaxed text-white/55">
                {siteMeta.visit.address}
              </p>
            </div>
            <HeroThumb
              to="/visit"
              heading="This Sunday"
              src={heroSlots.sunday}
              badge
              sealInkHot={inkHot}
              className="min-h-[14rem] sm:min-h-[16rem] lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-2 lg:min-h-0"
            />
          </div>

          {/* Cards 1 + 2 — side-by-side on mobile */}
          <HeroThumb
            to="/about"
            heading="About us"
            src={heroSlots.about}
            finish="natural"
            variant="card"
            className="order-4 min-h-[9.5rem] sm:min-h-[14rem] lg:order-none lg:col-start-1 lg:row-start-3 lg:min-h-0"
          />
          <HeroThumb
            to="/missions"
            heading="Radical · Norwich"
            src={heroSlots.city}
            finish="bw-grain"
            variant="card"
            className="order-5 min-h-[9.5rem] sm:min-h-[14rem] lg:order-none lg:col-start-2 lg:row-start-3 lg:min-h-0"
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
      <SiteLink
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
      </SiteLink>
    )
  }

  const card = (
    <SiteLink
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
    </SiteLink>
  )

  if (!badge) return card

  return (
    <div className={cn('relative', className)}>
      {card}
      <CircleTextBadge
        inkHot={sealInkHot}
        className="absolute top-0 right-0 z-20 size-36 -translate-y-[28%] translate-x-[18%] sm:size-52 sm:-translate-y-1/2 sm:translate-x-1/3 lg:size-72 lg:translate-x-1/2"
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
        'pointer-events-auto relative',
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
        'relative flex size-7 shrink-0 items-center justify-center overflow-hidden sm:size-9',
        'rounded-full transition-[width,height,background-color,color] duration-300 ease-out',
        'group-hover:size-10 sm:group-hover:size-12',
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

function QuoteFeaturesBand() {
  return (
    <div className="relative overflow-hidden">
      {/* Soft dashed geometric rings — clipped so they never bleed into the marquee */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Left — behind Give */}
        <div
          className={cn(
            'absolute top-[calc(42%+160px)] left-[-8%] size-[min(58vw,22rem)] -translate-y-1/2 rounded-full',
            'border border-dashed border-[var(--v3-ink)]/20 sm:left-[-2%] sm:size-[min(42vw,24rem)] lg:top-[calc(48%+160px)] lg:left-[2%] lg:size-[26rem]'
          )}
        />
        {/* Right — larger, behind quote end + Missions */}
        <div
          className={cn(
            'absolute top-0 right-[-28%] size-[min(95vw,36rem)] rounded-full',
            'border border-dashed border-[var(--v3-ink)]/20 sm:right-[-18%] sm:size-[min(70vw,40rem)] lg:right-[-8%] lg:size-[44rem]'
          )}
        />
      </div>

      <div className="relative z-[1]">
        <Quote />
        <FeatureRow />
      </div>
    </div>
  )
}

function Quote() {
  return (
    <section className={v3SectionY}>
      <p className="mx-auto max-w-4xl font-sans text-[clamp(1.25rem,5.5vw,2.85rem)] font-bold leading-[1.22] tracking-tight text-[var(--v3-ink)] [text-indent:0.75rem] sm:[text-indent:3.5rem] lg:[text-indent:4.5rem]">
        A church that runs toward the{' '}
        <span className="text-[var(--v3-terra)]">broken</span> will{' '}
        <span className="text-[var(--v3-terra)]">shape</span> a city. Soft
        hearts. Hard discipleship. We meet to worship God — not entertain
        people — and we shape Norwich for{' '}
        <span className="text-[var(--v3-terra)]">Jesus&apos; Return</span>.
      </p>
    </section>
  )
}

function FeatureRow() {
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const startHere = {
    href: '/visit',
    body: 'City Gates · Sunday 10:30 — come hungry.',
  }
  const sideTiles = [{ label: 'Missions', href: '/missions' }]

  /* Float only earns its keep on wide layouts */
  const floatOn = isDesktop && !reduceMotion
  const floatEase = [0.45, 0.05, 0.55, 0.95] as const
  const sideFloat = floatOn ? { y: [0, -9, 0, 7, 0] } : undefined
  const midFloat = floatOn ? { y: [0, 9, 0, -7, 0] } : undefined
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
    <section className={cn('relative z-10 pt-[80px]', v3SectionY)}>
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
          <SiteLink
            to="/give"
            className="group relative z-[1] block min-h-[220px] overflow-hidden rounded-[1.35rem] sm:min-h-[280px] sm:rounded-[2rem]"
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
          </SiteLink>
        </motion.div>

        <motion.article
          className="relative z-0 flex min-h-[220px] flex-col gap-4 overflow-hidden rounded-[1.35rem] bg-[var(--v3-terra)] p-5 text-white sm:min-h-[280px] sm:col-span-2 sm:flex-row sm:gap-5 sm:rounded-[2rem] sm:p-7 lg:col-span-2"
          animate={midFloat}
          transition={midTransition}
        >
          <AppImage
            alt=""
            className="aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[1.05rem] bg-white/20 text-white/50 sm:aspect-square sm:w-[42%] sm:max-w-none sm:self-stretch sm:rounded-[1.35rem]"
            iconClassName="size-8 text-white/55 sm:size-10"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Start here
              </p>
              <h3 className="mt-3 font-sans text-xl font-bold uppercase leading-tight tracking-tight sm:mt-4 sm:text-2xl">
                We dare you to visit.
              </h3>
              <p className="mt-2 text-sm text-white/80 sm:mt-3">{startHere.body}</p>
            </div>
            <Pill to={startHere.href} tone="light" className="mt-5 sm:mt-8">
              <span>This Sunday</span>
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
            <SiteLink
              to={t.href}
              className="group relative z-[1] block min-h-[220px] overflow-hidden rounded-[1.35rem] sm:min-h-[280px] sm:rounded-[2rem]"
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
            </SiteLink>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Narrative() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
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
    <section ref={ref} className={cn('relative mt-10 mb-0 sm:mt-20 lg:mt-[120px]')}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div
          className={cn(
            'relative z-10 grid items-center lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]',
            v3SplitGap
          )}
        >
          <div className="relative mx-auto w-full max-w-[18rem] pb-10 sm:max-w-[40rem] sm:pb-16 lg:mx-0 lg:max-w-none lg:pb-8">
            <div className="relative flex justify-center lg:justify-start lg:pl-2">
              {/* Landscape orange — sits behind the fan only */}
              <div
                aria-hidden
                className={cn(
                  'pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-[42%] -translate-y-1/2',
                  'aspect-[16/10] w-[min(118%,28rem)] sm:w-[min(125%,34rem)] lg:w-[min(130%,38rem)]',
                  'rounded-[1.25rem] sm:rounded-[2rem]',
                  'bg-gradient-to-br from-[#e8925a] via-[var(--v3-terra)] to-[#8f3a1c]',
                  inView ? 'opacity-100' : 'opacity-0',
                  !reduceMotion && 'transition-opacity duration-700 ease-out'
                )}
              />

              <div
                className={cn(
                  'relative z-10 aspect-[3/4] w-[12.5rem] origin-top sm:w-[19rem] lg:w-[21.5rem]',
                  'max-lg:rotate-0 lg:-rotate-[15deg]'
                )}
              >
                {caps.map((c, i) => {
                  const fromCenter = i - (caps.length - 1) / 2
                  const fan = fromCenter * (isDesktop ? 18 : 10)
                  const x = fromCenter * (isDesktop ? 5.5 : 2.75)
                  const y = Math.abs(fromCenter) * (isDesktop ? 0.55 : 0.35)
                  return (
                    <SiteLink
                      key={c.title}
                      to={c.href}
                      className="group absolute inset-0 block origin-bottom size-full"
                      style={{
                        transform: `translate(${x}rem, ${y}rem) rotate(${fan}deg)`,
                        zIndex: i + 1,
                      }}
                    >
                      <div className="relative h-full overflow-hidden rounded-[1.2rem] bg-white ring-1 ring-[var(--v3-ink)]/10 sm:rounded-[1.6rem]">
                        <AppImage
                          alt=""
                          className="absolute inset-0 size-full bg-[var(--v3-ink)]/[0.04]"
                          iconClassName="size-10 text-[var(--v3-terra)]/40 sm:size-12"
                        />
                        <div className="relative z-10 border-b border-[var(--v3-ink)]/10 px-3.5 py-3 pr-11 sm:px-5 sm:py-4 sm:pr-14">
                          <span className="absolute top-2.5 right-2.5 z-10 flex size-7 items-center justify-center rounded-full bg-white text-[var(--v3-ink)] shadow-sm transition group-hover:bg-[var(--v3-terra)] group-hover:text-white sm:top-3.5 sm:right-3.5 sm:size-9">
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
                    </SiteLink>
                  )
                })}
              </div>
            </div>
          </div>

          <h2 className="max-w-xl py-5 font-sans text-[clamp(1.3rem,5.8vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-[var(--v3-ink)] sm:py-14 lg:ml-auto lg:py-0 lg:text-right">
            God wants revival in this county — and we refuse to sit it out.
            Fearlessly shaping these streets for{' '}
            <span className="text-[var(--v3-terra)]">Jesus&apos; Return</span>.
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
    <SiteLink
      to={to}
      className={cn(
        'group inline-flex w-full items-center justify-between gap-3 rounded-full py-2 pl-4 pr-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition sm:min-w-[12.5rem] sm:py-1.5 sm:pl-5 sm:text-xs sm:tracking-[0.16em]',
        variant === 'dark' &&
          'bg-[var(--v3-ink)] text-[var(--v3-cream)] ring-1 ring-white/15 hover:bg-[var(--v3-cream)] hover:text-[var(--v3-ink)]',
        variant === 'cream' &&
          'bg-[var(--v3-cream)] text-[var(--v3-ink)] hover:bg-white',
        variant === 'ghost' &&
          'bg-white/10 text-[var(--v3-cream)] ring-1 ring-white/25 hover:bg-white/15'
      )}
    >
      <span className="min-w-0 truncate text-left">{label}</span>
      <GrowMark
        tone={variant === 'cream' ? 'ink' : 'inverse'}
        className={cn(
          variant === 'dark' &&
            'group-hover:bg-[var(--v3-ink)] group-hover:text-[var(--v3-cream)]'
        )}
      />
    </SiteLink>
  )
}

function CircleArrow({ dark }: { dark?: boolean }) {
  return (
    <span
      className={cn(
        'flex size-7 shrink-0 items-center justify-center rounded-full sm:size-6',
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
    <SiteLink
      to={to}
      className={cn(
        'inline-flex w-full items-center justify-between gap-3 rounded-full py-2 pr-1.5 pl-4 text-[11px] font-bold uppercase tracking-[0.14em] transition sm:w-auto sm:min-w-[11rem] sm:py-1.5 sm:pr-1.5 sm:pl-5 sm:text-xs',
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
    </SiteLink>
  )
}
