import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GeoPattern } from '@/components/marketing/geo/GeoPattern'
import { cn } from '@/lib/utils'

type SectionIntroProps = {
  index: string
  label: string
  body: string
  headline: ReactNode
  cta?: { label: string; href: string }
  tone?: 'ink' | 'paper' | 'lime'
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
  className,
  id,
}: SectionIntroProps) {
  const tones = {
    ink: 'bg-ink text-paper border-ink',
    paper: 'bg-paper text-ink border-ink',
    lime: 'bg-lime text-ink border-ink',
  }
  const muted =
    tone === 'ink' ? 'text-paper/55' : tone === 'lime' ? 'text-ink/55' : 'text-ink/55'

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden border-b-2',
        tones[tone],
        className
      )}
    >
      <GeoPattern
        motif={
          tone === 'ink' ? 'sunburst' : tone === 'lime' ? 'asterisk6' : 'star12'
        }
        tone={tone === 'ink' ? 'paper' : 'ink'}
        anchor={tone === 'ink' ? 'bleed-left' : 'tl'}
        opacity={tone === 'ink' ? 0.14 : 0.22}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <p className={cn('font-mono text-xs uppercase tracking-[0.2em]', muted)}>
          ({index}) {label}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <p className={cn('max-w-sm text-sm leading-relaxed sm:text-base', muted)}>
            {body}
          </p>

          <div>
            <h2 className="text-3xl font-medium leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
            {cta ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  variant={tone === 'ink' ? 'lime' : 'default'}
                  offset
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
  tone?: 'lime' | 'paper' | 'ink'
}) {
  return (
    <strong
      className={cn(
        'font-bold',
        tone === 'lime' && 'text-lime',
        tone === 'paper' && 'text-paper',
        tone === 'ink' && 'text-ink'
      )}
    >
      {children}
    </strong>
  )
}
