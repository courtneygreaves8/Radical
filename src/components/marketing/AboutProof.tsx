import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { AppImage } from '@/components/shared/AppImage'
import { Button } from '@/components/ui/button'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

export type AboutStat = {
  value: string
  label: string
  /** Accent the value — terracotta (or blue after glitch easter egg) */
  accent?: 'crimson' | 'lime'
}

type AboutProofProps = {
  stats: AboutStat[]
  label?: string
  headline: string
  body: string
  cta?: { label: string; href: string }
  image: string
  className?: string
}

/**
 * Haven-style proof band — stats → about copy → full-bleed photo.
 * Sharp Radical edges (no pills / soft radius).
 */
export function AboutProof({
  stats,
  label = 'About us',
  headline,
  body,
  cta,
  image,
  className,
}: AboutProofProps) {
  return (
    <section
      className={cn('border-b border-ink/10 bg-paper text-ink', className)}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <ul className="grid gap-8 border-b border-ink/10 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((s) => (
            <li key={s.label}>
              <p
                className={cn(
                  'font-sans text-4xl font-bold tracking-tight sm:text-5xl',
                  s.accent === 'crimson' && 'text-crimson',
                  s.accent === 'lime' && 'text-lime'
                )}
              >
                {s.value}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                {s.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-14">
          <p className="inline-flex w-fit rounded-full bg-lime px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-foreground">
            {label}
          </p>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
              {headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/65 sm:text-lg">
              {body}
            </p>
            {cta ? (
              <div className="mt-8">
                <Button variant="default" asChild>
                  <Link to={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <OffsetBlock offset="lime" className="mt-12 sm:mt-14">
          <div className="photo-grain relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-ink sm:aspect-[21/9]">
            <AppImage
              src={image}
              alt=""
              className="absolute inset-0 size-full"
            />
            <div className="absolute inset-0 bg-ink/15" />
          </div>
        </OffsetBlock>
      </div>
    </section>
  )
}
