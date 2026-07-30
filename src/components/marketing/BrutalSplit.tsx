import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type BrutalSplitProps = {
  /** Solid-fill letters */
  fill: string
  /** Outline letters */
  outline: string
  subline?: string
  points?: string[]
  body?: string
  cta?: { label: string; href: string }
  className?: string
}

/**
 * Sticky stacked cards on lime — identity → DNA labels → invite.
 * No photo. Labels are static marks, not faux links.
 */
export function BrutalSplit({
  fill,
  outline,
  subline,
  points = [],
  body = 'Church is driven by a deep passion for loving Jesus, loving each other, and loving the lost — with fire, not fluff.',
  cta,
  className,
}: BrutalSplitProps) {
  const cards = [
    {
      id: '01',
      title: 'Identity',
      node: (
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 lg:min-h-[42vh] lg:p-10">
          <h2
            aria-label={`${fill}${outline}`}
            className="type-brutal text-[clamp(3.25rem,12vw,7.5rem)] leading-[0.85]"
          >
            <span className="text-ink">{fill}</span>
            <span className="text-outline-ink">{outline}</span>
          </h2>
          {subline ? (
            <div className="flex flex-wrap items-center gap-3">
              <p className="type-brutal text-xl tracking-tight text-ink sm:text-2xl">
                {subline}
              </p>
              {cta ? (
                <Link
                  to={cta.href}
                  className="flex size-10 items-center justify-center border-2 border-ink transition hover:bg-ink hover:text-lime"
                  aria-label={cta.label}
                >
                  <ArrowRight className="size-4" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      ),
    },
    {
      id: '02',
      title: 'DNA',
      node: (
        <div className="flex flex-col gap-8 p-6 sm:p-8 lg:min-h-[38vh] lg:p-10">
          <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <p className="type-display text-5xl text-ink sm:text-6xl">02</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
              What we run on
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
            {points.map((item) => (
              <li key={item}>
                <span
                  className={cn(
                    'inline-flex cursor-default items-center gap-2 border border-ink/20 bg-mute/60 px-3 py-2',
                    'font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/55'
                  )}
                >
                  <span className="size-1.5 shrink-0 bg-ink/40" aria-hidden />
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: '03',
      title: 'Invite',
      node: (
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 lg:min-h-[36vh] lg:p-10">
          <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <p className="type-display text-5xl text-ink sm:text-6xl">03</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
              Next step
            </p>
          </div>
          <p className="max-w-xl text-lg font-medium leading-snug text-ink sm:text-xl">
            {body}
          </p>
          {cta ? (
            <div>
              <Button variant="default" offset asChild>
                <Link to={cta.href}>
                  {cta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      ),
    },
  ]

  return (
    <section className={cn('border-b-2 border-ink bg-lime', className)}>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="relative">
          {cards.map((card, i) => (
            <article
              key={card.id}
              className="sticky mb-3 overflow-hidden border-2 border-ink bg-paper shadow-[0_12px_0_0_rgba(0,0,0,0.06)] last:mb-0"
              style={{
                top: `calc(5rem + ${i * 14}px)`,
                zIndex: i + 1,
              }}
            >
              {card.node}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
