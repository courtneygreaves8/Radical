import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, MapPin, Users } from 'lucide-react'

import { AppImage } from '@/components/shared/AppImage'
import { RadiatingBurst } from '@/components/marketing/RadiatingBurst'
import { siteMeta } from '@/lib/nav'
import { cn } from '@/lib/utils'

/**
 * Landing V2 — warm sand + coral, radiating burst, pill CTAs.
 * Visual language from the Design-to-Web reference; Radical content.
 */
export function HomeLandingV2() {
  return (
    <div className="landing-v2 bg-[var(--v2-sand)] text-[var(--v2-ink)]">
      <Hero />
      <ProofStrip />
      <MovesUs />
      <CoralBand />
      <StoryBlock />
      <VisitCta />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--v2-ink)]/10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:px-10 lg:py-24">
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none lg:justify-start">
          <RadiatingBurst className="w-[min(100%,28rem)] text-[var(--v2-coral)] sm:w-[32rem] lg:w-[38rem] lg:-translate-x-8" />
        </div>

        <div className="relative z-10 max-w-xl lg:ml-auto lg:max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--v2-ink)]/45">
            Norwich · England
          </p>
          <h1 className="mt-5 font-sans text-[clamp(2.75rem,8vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-[var(--v2-coral)]">
            <span className="block">You seek.</span>
            <span className="block">He shapes.</span>
          </h1>
          <p className="mt-6 max-w-md text-base font-medium leading-snug text-[var(--v2-ink)] sm:text-lg">
            {siteMeta.mission}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--v2-ink)]/55">
            {siteMeta.missionSupport}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink to="/visit" variant="solid">
              This Sunday · {siteMeta.visit.time}
              <ArrowRight className="size-4" />
            </PillLink>
            <PillLink to="/about" variant="outline">
              Our story
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProofStrip() {
  const items = [
    'Full Gospel',
    'Whole Bible',
    'Street outreach',
    'Soft hearts',
    'Hard discipleship',
  ]
  return (
    <section className="border-b border-[var(--v2-ink)]/10 py-8 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 sm:justify-between sm:px-8 lg:px-10">
        {items.map((label) => (
          <span
            key={label}
            className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-[var(--v2-ink)]/25 sm:text-base"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}

function MovesUs() {
  const cards = [
    {
      icon: Heart,
      title: 'Presence',
      body: 'We meet God — not a show. Worship over entertainment.',
    },
    {
      icon: Users,
      title: 'People',
      body: 'Called to the broken, the overlooked, and the margins of Norwich.',
    },
    {
      icon: MapPin,
      title: 'Place',
      body: 'Helping shape this city for Jesus — then the nations beyond.',
    },
  ]

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-2xl font-sans text-3xl font-bold tracking-tight text-[var(--v2-ink)] sm:text-4xl lg:text-5xl">
          What moves us — and what we refuse to water down.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {cards.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="flex flex-col rounded-[1.75rem] bg-[var(--v2-coral)] p-7 text-white sm:p-8"
            >
              <Icon className="size-8 stroke-[1.75]" aria-hidden />
              <h3 className="mt-8 font-sans text-xl font-bold uppercase tracking-wide">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoralBand() {
  const points = [
    'Hard preaching. Real repentance.',
    'Discipleship that costs something.',
    'Street witness across Norfolk.',
    'Partners in India and Africa.',
  ]

  return (
    <section className="relative overflow-hidden bg-[var(--v2-coral)] text-white">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
            Be Radical
          </p>
          <h2 className="mt-4 font-sans text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
            Church with fire,
            <br />
            not fluff.
          </h2>
          <ul className="mt-8 space-y-3">
            {points.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 text-sm font-medium leading-snug text-white/90 sm:text-base"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-white"
                />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <PillLink to="/beliefs" variant="light">
              What we believe
              <ArrowRight className="size-4" />
            </PillLink>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <RadiatingBurst className="w-[min(100%,22rem)] text-white/90 sm:w-[26rem]" />
        </div>
      </div>
    </section>
  )
}

function StoryBlock() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--v2-ink)]/45">
            Since 2013
          </p>
          <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-[var(--v2-ink)] sm:text-4xl">
            Helping shape Norwich — for Jesus.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--v2-ink)]/65">
            Full Gospel. Whole Bible. Soft hearts, hard discipleship. We run
            toward the broken and the overlooked on these streets — and dare you
            to come visit.
          </p>
          <div className="mt-8">
            <PillLink to="/about" variant="solid">
              Our story
              <ArrowRight className="size-4" />
            </PillLink>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--v2-ink)]/10">
          <AppImage
            alt=""
            className="aspect-[4/3] w-full sm:aspect-[16/11]"
            iconClassName="size-12 text-[var(--v2-coral)]/50"
          />
        </div>
      </div>
    </section>
  )
}

function VisitCta() {
  return (
    <section className="border-t border-[var(--v2-ink)]/10 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] bg-[var(--v2-ink)] px-7 py-10 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
            This Sunday · {siteMeta.visit.time}
          </p>
          <h2 className="mt-3 font-sans text-2xl font-bold tracking-tight sm:text-3xl">
            {siteMeta.visit.venue}
          </h2>
          <p className="mt-2 text-sm text-white/60">{siteMeta.visit.address}</p>
        </div>
        <PillLink to="/visit" variant="coral">
          Plan your visit
          <ArrowRight className="size-4" />
        </PillLink>
      </div>
    </section>
  )
}

function PillLink({
  to,
  children,
  variant = 'solid',
  className,
}: {
  to: string
  children: ReactNode
  variant?: 'solid' | 'outline' | 'light' | 'coral'
  className?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide transition',
        variant === 'solid' &&
          'bg-[var(--v2-ink)] text-white hover:bg-[var(--v2-ink)]/90',
        variant === 'outline' &&
          'border border-[var(--v2-ink)]/25 bg-transparent text-[var(--v2-ink)] hover:border-[var(--v2-ink)]',
        variant === 'light' &&
          'bg-white text-[var(--v2-ink)] hover:bg-white/90',
        variant === 'coral' &&
          'bg-[var(--v2-coral)] text-white hover:bg-[var(--v2-coral)]/90',
        className
      )}
    >
      {children}
    </Link>
  )
}
