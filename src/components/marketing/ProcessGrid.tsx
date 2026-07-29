import type { ReactNode } from 'react'

import { GeoPattern } from '@/components/marketing/geo/GeoPattern'
import { cn } from '@/lib/utils'

export type ProcessStep = {
  id: string
  title: string
  body: string
}

type ProcessGridProps = {
  index: string
  label?: string
  headline: ReactNode
  steps: ProcessStep[]
  tone?: 'paper' | 'ink' | 'lime'
  className?: string
}

/** Numbered process grid — sharp cells, Swiss hierarchy. */
export function ProcessGrid({
  index,
  label,
  headline,
  steps,
  tone = 'paper',
  className,
}: ProcessGridProps) {
  const tones = {
    paper: {
      section: 'bg-paper text-ink border-ink',
      mute: 'text-ink/45',
      body: 'text-ink/70',
      cell: 'border-ink',
      pattern: 'ink' as const,
      motif: 'asterisk8' as const,
    },
    ink: {
      section: 'bg-ink text-paper border-ink',
      mute: 'text-paper/45',
      body: 'text-paper/65',
      cell: 'border-paper/20',
      pattern: 'paper' as const,
      motif: 'gear' as const,
    },
    lime: {
      section: 'bg-lime text-ink border-ink',
      mute: 'text-ink/50',
      body: 'text-ink/70',
      cell: 'border-ink/25',
      pattern: 'ink' as const,
      motif: 'sunburst' as const,
    },
  }[tone]

  return (
    <section
      className={cn(
        'relative overflow-hidden border-b-2',
        tones.section,
        className
      )}
    >
      <GeoPattern
        motif={tones.motif}
        tone={tones.pattern}
        anchor="tl"
        opacity={tone === 'ink' ? 0.3 : 0.2}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <p
          className={cn(
            'font-mono text-xs uppercase tracking-[0.2em]',
            tones.mute
          )}
        >
          ({index}) {label}
        </p>
        <h2 className="type-display mt-5 max-w-4xl text-3xl leading-[0.95] sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.id} className={cn('border-t-2 pt-5', tones.cell)}>
              <p
                className={cn(
                  'font-mono text-xs font-bold tabular-nums tracking-wider',
                  tones.mute
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-lg font-bold tracking-tight sm:text-xl">
                {step.title}
              </h3>
              <p className={cn('mt-3 text-sm leading-relaxed', tones.body)}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
