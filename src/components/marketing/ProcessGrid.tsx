import type { ReactNode } from 'react'

import { GeoPattern } from '@/components/marketing/geo/GeoPattern'
import {
  GeoIcon,
  type GeoIconName,
} from '@/components/marketing/geo/GeoIcons'
import { cn } from '@/lib/utils'

export type ProcessStep = {
  id: string
  title: string
  body: string
  mark?: GeoIconName
}

type ProcessGridProps = {
  index: string
  label?: string
  headline: ReactNode
  steps: ProcessStep[]
  tone?: 'paper' | 'ink' | 'lime'
  /** Section atmosphere mark */
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
}

/** Default pillar marks — six distinct shapes for “what holds the house”. */
const pillarMarks: GeoIconName[] = [
  'cross',
  'asterisk6',
  'rings',
  'spark',
  'sunburst',
  'star12',
]

/** Numbered process grid — sharp cells, Swiss hierarchy, geo pillars. */
export function ProcessGrid({
  index,
  label,
  headline,
  steps,
  tone = 'paper',
  mark,
  markAnchor,
  className,
}: ProcessGridProps) {
  const tones = {
    paper: {
      section: 'bg-paper text-ink border-ink',
      mute: 'text-ink/45',
      body: 'text-ink/70',
      cell: 'border-ink',
      markTone: 'ink' as const,
      motif: 'rings' as GeoIconName,
      anchor: 'bleed-right' as const,
      opacity: 0.035,
      icon: 'text-ink/25',
    },
    ink: {
      section: 'bg-ink text-paper border-ink',
      mute: 'text-paper/45',
      body: 'text-paper/65',
      cell: 'border-paper/20',
      markTone: 'lime' as const,
      motif: 'gear' as GeoIconName,
      anchor: 'bleed-right' as const,
      opacity: 0.12,
      icon: 'text-lime/40',
    },
    lime: {
      section: 'bg-lime text-lime-foreground border-ink',
      mute: 'text-lime-foreground/50',
      body: 'text-lime-foreground/70',
      cell: 'border-ink/25',
      markTone: 'ink' as const,
      motif: 'sunburst' as GeoIconName,
      anchor: 'bleed-left' as const,
      opacity: 0.1,
      icon: 'text-lime-foreground/25',
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
        motif={mark ?? tones.motif}
        tone={tones.markTone}
        anchor={markAnchor ?? tones.anchor}
        opacity={tones.opacity}
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

        {/* Foundation strip — six shapes = six convictions */}
        <ul
          aria-hidden
          className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          {steps.slice(0, 6).map((step, i) => (
            <li
              key={`found-${step.id}`}
              className={cn(
                'flex size-11 items-center justify-center border-2 sm:size-12',
                tone === 'ink' ? 'border-paper/20' : 'border-ink/20'
              )}
            >
              <GeoIcon
                name={step.mark ?? pillarMarks[i % pillarMarks.length]}
                className={cn('size-6 sm:size-7', tones.icon)}
              />
            </li>
          ))}
        </ul>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-3">
          {steps.map((step, i) => {
            const icon = step.mark ?? pillarMarks[i % pillarMarks.length]
            return (
              <li
                key={step.id}
                className={cn('relative border-t-2 pt-5', tones.cell)}
              >
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={cn(
                      'font-mono text-xs font-bold tabular-nums tracking-wider',
                      tones.mute
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <GeoIcon
                    name={icon}
                    className={cn('size-8 shrink-0 sm:size-9', tones.icon)}
                  />
                </div>
                <h3 className="mt-3 text-lg font-bold tracking-tight sm:text-xl">
                  {step.title}
                </h3>
                <p className={cn('mt-3 text-sm leading-relaxed', tones.body)}>
                  {step.body}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
