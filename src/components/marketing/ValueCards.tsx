import { Link } from 'react-router-dom'

import {
  GeoIcon,
  type GeoIconName,
} from '@/components/marketing/geo/GeoIcons'
import { GeoPattern } from '@/components/marketing/geo/GeoPattern'
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
        'relative overflow-hidden border-b-2 border-ink bg-paper',
        className
      )}
    >
      <GeoPattern motif="venn" tone="ink" anchor="tl" opacity={0.2} />
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

        <div className="mt-12 grid gap-3 md:grid-cols-3 md:gap-4">
          {cards.map((card, i) => {
            const icon = card.icon ?? defaultIcons[i % defaultIcons.length]
            const inner =
              card.tone === 'photo' ? (
                <div className="photo-grain relative flex min-h-[320px] flex-col justify-end overflow-hidden border-2 border-ink p-6 sm:min-h-[380px] sm:p-8">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt=""
                      className="photo-bw absolute inset-0 size-full object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
                  <GeoIcon
                    name={icon}
                    className="absolute top-5 right-5 z-10 size-12 text-lime sm:size-14"
                  />
                  <div className="relative z-10">
                    <span className="inline-block border-2 border-paper bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                      {card.tag}
                    </span>
                    <h3 className="type-display mt-5 text-2xl text-paper sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-paper/70">{card.body}</p>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    'relative flex min-h-[320px] flex-col overflow-hidden border-2 border-ink p-6 sm:min-h-[380px] sm:p-8',
                    card.tone === 'lime' ? 'bg-lime' : 'bg-paper'
                  )}
                >
                  <GeoIcon
                    name={icon}
                    className={cn(
                      'absolute right-4 top-4 size-14 opacity-90 sm:size-16',
                      'text-ink'
                    )}
                  />
                  <span
                    className={cn(
                      'inline-block w-fit border-2 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider',
                      card.tone === 'lime'
                        ? 'border-ink bg-ink text-lime'
                        : 'border-lime bg-lime text-ink'
                    )}
                  >
                    {card.tag}
                  </span>
                  <h3 className="mt-8 max-w-[85%] text-2xl font-bold tracking-tight sm:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                    {card.body}
                  </p>
                </div>
              )

            return card.href ? (
              <Link key={card.id} to={card.href} className="block">
                {inner}
              </Link>
            ) : (
              <div key={card.id}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
