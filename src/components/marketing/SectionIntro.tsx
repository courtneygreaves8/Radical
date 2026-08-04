import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GeoPattern } from '@/components/marketing/geo/GeoPattern'
import type { GeoIconName } from '@/components/marketing/geo/GeoIcons'
import { cn } from '@/lib/utils'

type SectionIntroProps = {
  index: string
  label: string
  body: string
  headline: ReactNode
  cta?: { label: string; href: string }
  tone?: 'ink' | 'paper' | 'lime' | 'navy'
  /** Override default geo motif */
  mark?: GeoIconName
  markAnchor?:
    | 'tr'
    | 'tl'
    | 'br'
    | 'bl'
    | 'center-right'
    | 'center-left'
    | 'bleed-left'
    | 'bleed-right'
  className?: string
  id?: string
}

/** Composition 01 — numbered intro: body left, loud headline + CTA right. */
export function SectionIntro({
  index,
  label,
  body,
  headline,
  cta,
  tone = 'ink',
  mark,
  markAnchor,
  className,
  id,
}: SectionIntroProps) {
  const tones = {
    ink: 'bg-ink text-paper',
    paper: 'bg-paper text-ink',
    lime: 'bg-lime text-lime-foreground',
    navy: 'bg-navy text-paper',
  }
  const dark = tone === 'ink' || tone === 'navy' || tone === 'lime'
  const muted = dark ? 'text-paper/55' : 'text-ink/55'

  const motif =
    mark ??
    (tone === 'ink' || tone === 'navy'
      ? 'sunburst'
      : tone === 'lime'
        ? 'asterisk6'
        : 'star12')
  const anchor =
    markAnchor ?? (tone === 'paper' ? 'tl' : 'bleed-left')

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden border-b border-ink/10',
        tones[tone],
        className
      )}
    >
      <GeoPattern
        motif={motif}
        tone={dark ? 'paper' : 'ink'}
        anchor={anchor}
        opacity={
          tone === 'navy' ? 0.1 : tone === 'ink' ? 0.12 : tone === 'lime' ? 0.14 : 0.1
        }
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <p className={cn('text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs', muted)}>
          ({index}) {label}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <p className={cn('max-w-sm text-sm leading-relaxed sm:text-base', muted)}>
            {body}
          </p>

          <div>
            <h2 className="font-sans text-3xl font-bold leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
            {cta ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  variant={dark ? (tone === 'lime' ? 'paper' : 'lime') : 'default'}
                  asChild
                >
                  {cta.href.startsWith('http') ||
                  cta.href.startsWith('mailto:') ? (
                    <a
                      href={cta.href}
                      target={cta.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        cta.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      {cta.label}
                      <ArrowUpRight className="size-4" />
                    </a>
                  ) : (
                    <Link to={cta.href}>
                      {cta.label}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  )}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Em({
  children,
  tone = 'lime',
}: {
  children: ReactNode
  tone?: 'lime' | 'paper' | 'ink' | 'crimson' | 'flame'
}) {
  return (
    <strong
      className={cn(
        'font-bold',
        tone === 'lime' && 'text-lime',
        tone === 'paper' && 'text-paper',
        tone === 'ink' && 'text-ink',
        tone === 'crimson' && 'text-crimson',
        tone === 'flame' && 'text-flame'
      )}
    >
      {children}
    </strong>
  )
}
