import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import {
  GeoIcon,
  type GeoIconName,
} from '@/components/marketing/geo/GeoIcons'
import { AppImage } from '@/components/shared/AppImage'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

export type ValueCard = {
  id: string
  tag: string
  title: string
  body: string
  href?: string
  tone: 'photo' | 'paper' | 'lime'
  image?: string
  icon?: GeoIconName
}

type ValueCardsProps = {
  index: string
  label: string
  headline?: string
  body?: string
  cards: ValueCard[]
  className?: string
}

const defaultIcons: GeoIconName[] = ['asterisk6', 'sunburst', 'star12']

/** Three value tiles — photo / paper / lime with geometric marks. */
export function ValueCards({
  index,
  label,
  headline,
  body,
  cards,
  className,
}: ValueCardsProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-ink/10 bg-paper',
        className
      )}
    >
      {/* Big half-bleed shape — left half clipped */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 flex w-[min(95vw,42rem)] items-center overflow-hidden"
      >
        <GeoIcon
          name="asterisk6"
          className="size-[min(95vw,42rem)] shrink-0 -translate-x-1/2 text-ink/[0.07]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
            ({index}) {label}
          </p>
          {headline ? (
            <h2 className="type-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
          ) : null}
          {body ? (
            <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base">
              {body}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-3 pb-3 md:grid-cols-3 md:gap-4 md:pb-4">
          {cards.map((card, i) => {
            const icon = card.icon ?? defaultIcons[i % defaultIcons.length]
            const num = String(i + 1).padStart(2, '0')
            const cta = card.href ? 'Enter' : 'Our DNA'

            const footer = (
              <div className="relative z-10 mt-auto flex items-center justify-between gap-3 border-t-2 border-current/15 pt-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                  {num} · Shape
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
                  {cta}
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            )

            const inner =
              card.tone === 'photo' ? (
                <OffsetBlock offset="crimson" revealOnHover>
                  <div className="photo-grain relative flex min-h-[340px] flex-col justify-end overflow-hidden border-2 border-ink p-6 sm:min-h-[400px] sm:p-8">
                    {card.image ? (
                      <AppImage
                        src={card.image}
                        alt=""
                        className="absolute inset-0 size-full"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
                    <p className="absolute left-5 top-5 z-10 type-display text-4xl text-paper/25 sm:left-6 sm:top-6 sm:text-5xl">
                      {num}
                    </p>
                    <GeoIcon
                      name={icon}
                      className="absolute top-5 right-5 z-10 size-12 text-lime sm:size-14"
                    />
                    <div className="relative z-10 text-paper">
                      <span className="inline-block border-2 border-paper bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                        {card.tag}
                      </span>
                      <h3 className="type-display mt-5 text-2xl sm:text-3xl">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm text-paper/70">{card.body}</p>
                      <div className="mt-6 border-t-2 border-paper/25 pt-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-paper/45">
                            {num} · Shape
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-lime">
                            {cta}
                            <ArrowUpRight className="size-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </OffsetBlock>
              ) : (
                <OffsetBlock
                  offset={card.tone === 'lime' ? 'navy' : 'crimson'}
                  revealOnHover
                >
                  <div
                    className={cn(
                      'relative flex min-h-[340px] flex-col overflow-hidden border-2 border-ink p-6 sm:min-h-[400px] sm:p-8',
                      card.tone === 'lime' ? 'bg-lime text-lime-foreground' : 'bg-paper text-ink'
                    )}
                  >
                    <p
                      className={cn(
                        'absolute left-5 top-5 type-display text-4xl sm:left-6 sm:top-6 sm:text-5xl',
                        card.tone === 'lime' ? 'text-ink/15' : 'text-ink/10'
                      )}
                    >
                      {num}
                    </p>
                    <GeoIcon
                      name={icon}
                      className="absolute right-4 top-4 size-14 text-ink sm:size-16"
                    />
                    <span
                      className={cn(
                        'relative z-10 inline-block w-fit border-2 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider',
                        card.tone === 'lime'
                          ? 'border-ink bg-ink text-lime'
                          : 'border-crimson bg-crimson text-ink'
                      )}
                    >
                      {card.tag}
                    </span>
                    <h3 className="relative z-10 mt-8 max-w-[85%] text-2xl font-bold tracking-tight sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="relative z-10 mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                      {card.body}
                    </p>
                    {footer}
                  </div>
                </OffsetBlock>
              )

            return card.href ? (
              <Link key={card.id} to={card.href} className="group block">
                {inner}
              </Link>
            ) : (
              <div key={card.id} className="group">
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
