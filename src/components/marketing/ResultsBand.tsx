import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { AppImage } from '@/components/shared/AppImage'
import { Button } from '@/components/ui/button'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

export type ResultsStat = {
  value: string
  label: string
}

type ResultsBandProps = {
  index: string
  label: string
  image: string
  stats: ResultsStat[]
  panel: {
    title: string
    body: string
    href?: string
    cta?: string
  }
  className?: string
}

/** Full-bleed photo with floating stats + overlapping lime panel. */
export function ResultsBand({
  index,
  label,
  image,
  stats,
  panel,
  className,
}: ResultsBandProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-ink/10 bg-ink',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/45">
            ({index}) {label}
          </p>
          {panel.href ? (
            <Button
              variant="outline"
              size="icon"
              className="border-paper/40 text-paper hover:border-lime hover:bg-lime hover:text-lime-foreground"
              asChild
            >
              <Link to={panel.href} aria-label={panel.cta ?? 'Learn more'}>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : null}
        </div>

        <OffsetBlock offset="lime">
          <div className="photo-grain relative min-h-[420px] overflow-hidden border-2 border-ink sm:min-h-[520px]">
            <AppImage
              src={image}
              alt=""
              className="absolute inset-0 size-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/30" />

            <div className="relative z-10 flex min-h-[420px] flex-col justify-end gap-10 p-6 sm:min-h-[520px] sm:p-10 lg:flex-row lg:items-end lg:justify-between">
              <ul className="space-y-6 text-paper">
                {stats.map((s) => (
                  <li key={s.label}>
                    <p className="type-display text-4xl text-lime sm:text-5xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-paper/70">
                      {s.label}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="w-full max-w-sm border-2 border-ink bg-lime p-6 text-lime-foreground sm:p-8">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {panel.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {panel.body}
                </p>
                {panel.href && panel.cta ? (
                  <Link
                    to={panel.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider underline-offset-4 hover:underline"
                  >
                    {panel.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </OffsetBlock>
      </div>
    </section>
  )
}
