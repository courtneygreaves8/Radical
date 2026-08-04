import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { MorphMark } from '@/components/marketing/MorphMark'
import { AppImage } from '@/components/shared/AppImage'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

export type MetricCard = {
  id: string
  eyebrow: string
  value: string
  detail?: string
  href?: string
  /** lime solid | photo with overlay */
  tone: 'lime' | 'photo'
  image?: string
}

type MetricBentoProps = {
  index?: string
  label?: string
  cards: [MetricCard, MetricCard] | MetricCard[]
  className?: string
}

/** Cascade-style dual metric strip — loud lime + grainy photo. */
export function MetricBento({
  index,
  label,
  cards,
  className,
}: MetricBentoProps) {
  return (
    <section className={cn('border-b border-ink/10 bg-paper', className)}>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {index || label ? (
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
            {index ? `(${index}) ` : null}
            {label}
          </p>
        ) : null}

        <div className="grid gap-3 pb-3 sm:gap-4 sm:pb-4 lg:grid-cols-2">
          {cards.slice(0, 2).map((card) => {
            const inner = (
              <>
                <p
                  className={cn(
                    'font-mono text-[10px] uppercase tracking-[0.22em]',
                    card.tone === 'lime' ? 'text-ink/55' : 'text-paper/55'
                  )}
                >
                  {card.eyebrow}
                </p>
                <p
                  className={cn(
                    'type-display mt-6 text-4xl sm:text-5xl xl:text-6xl',
                    card.tone === 'lime' ? 'text-ink' : 'text-paper'
                  )}
                >
                  {card.value}
                </p>
                {card.detail ? (
                  <p
                    className={cn(
                      'mt-3 max-w-sm text-sm',
                      card.tone === 'lime' ? 'text-ink/70' : 'text-paper/65'
                    )}
                  >
                    {card.detail}
                  </p>
                ) : null}
                {card.tone === 'lime' ? (
                  <MorphMark className="absolute right-4 bottom-4 size-14 text-ink/80 sm:size-16" />
                ) : (
                  <ArrowRight
                    className={cn(
                      'absolute right-5 bottom-5 size-5',
                      'text-lime'
                    )}
                  />
                )}
              </>
            )

            const shell = cn(
              'relative flex min-h-[220px] flex-col justify-between overflow-hidden border-2 border-ink p-6 sm:min-h-[260px] sm:p-8',
              card.tone === 'lime' ? 'bg-lime' : 'bg-ink'
            )

            if (card.tone === 'photo' && card.image) {
              const node = (
                <OffsetBlock offset="lime">
                  <div className={shell}>
                    <div className="photo-grain absolute inset-0">
                      <AppImage
                        src={card.image}
                        alt=""
                        className="absolute inset-0 size-full opacity-55"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
                    </div>
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      {inner}
                    </div>
                  </div>
                </OffsetBlock>
              )
              return card.href ? (
                <Link key={card.id} to={card.href} className="block">
                  {node}
                </Link>
              ) : (
                <div key={card.id}>{node}</div>
              )
            }

            return card.href ? (
              <Link key={card.id} to={card.href} className={shell}>
                {inner}
              </Link>
            ) : (
              <div key={card.id} className={shell}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
