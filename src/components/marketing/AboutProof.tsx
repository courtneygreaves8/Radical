import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type AboutStat = {
  value: string
  label: string
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
      className={cn('border-b-2 border-ink bg-paper text-ink', className)}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <ul className="grid gap-8 border-b-2 border-ink pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((s) => (
            <li key={s.label}>
              <p className="type-display text-4xl tracking-tight sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
                {s.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-14">
          <p className="inline-flex w-fit border-2 border-ink bg-lime px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
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
                <Button variant="default" offset asChild>
                  <Link to={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="photo-grain relative mt-12 aspect-[16/9] overflow-hidden border-2 border-ink bg-ink sm:mt-14 sm:aspect-[21/9]">
          <img
            src={image}
            alt=""
            className="photo-bw absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/15" />
        </div>
      </div>
    </section>
  )
}
