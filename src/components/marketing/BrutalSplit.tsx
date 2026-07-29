import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type BrutalSplitProps = {
  /** Solid-fill letters (left / over paper) */
  fill: string
  /** Outline letters (right / over image) */
  outline: string
  subline?: string
  image: string
  points?: string[]
  cta?: { label: string; href: string }
  className?: string
}

/**
 * Part-fill / part-outline display word —
 * solid letters over paper, stroked letters over the photo.
 */
export function BrutalSplit({
  fill,
  outline,
  subline,
  image,
  points = [],
  cta,
  className,
}: BrutalSplitProps) {
  const left = points.slice(0, Math.ceil(points.length / 2))
  const right = points.slice(Math.ceil(points.length / 2))

  return (
    <section className={cn('border-b-2 border-ink bg-lime', className)}>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="relative overflow-hidden border-2 border-ink bg-paper">
          <div className="grid min-h-[420px] lg:min-h-[520px] lg:grid-cols-2">
            {/* Paper column — fill letters sit here */}
            <div className="relative z-20 flex flex-col justify-between gap-10 p-6 sm:p-8 lg:p-10">
              <div>
                {/* Spacer so absolute word has room */}
                <div className="type-brutal invisible text-[clamp(3.5rem,14vw,8.5rem)] leading-[0.85]">
                  {fill}
                  {outline}
                </div>
                {subline ? (
                  <div className="mt-3 flex items-center gap-3">
                    <p className="type-brutal text-xl tracking-tight text-ink sm:text-2xl">
                      {subline}
                    </p>
                    {cta ? (
                      <Link
                        to={cta.href}
                        className="flex size-9 items-center justify-center border-2 border-ink transition hover:bg-ink hover:text-lime"
                        aria-label={cta.label}
                      >
                        <ArrowRight className="size-4" />
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {points.length ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  <ul className="space-y-0">
                    {left.map((item) => (
                      <li
                        key={item}
                        className="border-t border-ink/25 py-2.5 text-xs font-medium uppercase tracking-wider text-ink/55 sm:text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-0">
                    {right.map((item) => (
                      <li
                        key={item}
                        className="border-t border-ink/25 py-2.5 text-xs font-medium uppercase tracking-wider text-ink/55 sm:text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : cta ? (
                <Button variant="default" offset asChild>
                  <Link to={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : null}
            </div>

            {/* Image column — outline letters sit over this */}
            <div className="photo-grain relative min-h-[280px] border-t-2 border-ink bg-mute lg:min-h-0 lg:border-t-0 lg:border-l-2">
              <img
                src={image}
                alt=""
                className="photo-bw absolute inset-0 size-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-ink/10" />
            </div>
          </div>

          {/* Absolute word spanning the split */}
          <h2
            aria-label={`${fill}${outline}`}
            className="type-brutal pointer-events-none absolute top-6 left-6 z-30 text-[clamp(3.5rem,14vw,8.5rem)] leading-[0.85] sm:top-8 sm:left-8 lg:top-10 lg:left-10"
          >
            <span className="text-ink">{fill}</span>
            <span className="text-outline-ink">{outline}</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
