import { GeoIcon, type GeoIconName } from '@/components/marketing/geo/GeoIcons'
import { cn } from '@/lib/utils'

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: string
  tone?: 'lime' | 'ink' | 'paper' | 'navy' | 'crimson'
  /** Oversized half-bleed geo; defaults per tone */
  mark?: GeoIconName
}

const toneShell = {
  lime: 'bg-lime text-ink border-ink',
  ink: 'bg-ink text-paper border-ink',
  paper: 'bg-paper text-ink border-ink',
  navy: 'bg-navy text-paper border-ink',
  crimson: 'bg-crimson text-paper border-ink',
} as const

const markTone = {
  lime: 'text-ink/[0.08]',
  ink: 'text-lime/[0.12]',
  paper: 'text-ink/[0.07]',
  navy: 'text-flame/[0.14]',
  crimson: 'text-paper/[0.12]',
} as const

const defaultMark: Record<keyof typeof toneShell, GeoIconName> = {
  lime: 'asterisk6',
  ink: 'star12',
  paper: 'asterisk6',
  navy: 'star12',
  crimson: 'spark',
}

export function PageHero({
  eyebrow,
  title,
  description,
  tone = 'lime',
  mark,
}: PageHeroProps) {
  const motif = mark ?? defaultMark[tone]

  return (
    <section
      className={cn(
        'relative overflow-hidden border-b-2',
        toneShell[tone]
      )}
    >
      {/* Dominant half-bleed mark — only left half reads; right clipped */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[min(118vw,72rem)] items-center overflow-hidden"
      >
        <GeoIcon
          name={motif}
          className={cn(
            'size-[min(118vw,72rem)] shrink-0 translate-x-[42%] sm:translate-x-1/2',
            markTone[tone]
          )}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <p
          className={cn(
            'font-mono text-[10px] font-bold uppercase tracking-[0.28em] sm:text-xs',
            tone === 'ink' || tone === 'navy' || tone === 'crimson'
              ? 'text-paper/50'
              : 'text-ink/55'
          )}
        >
          {eyebrow}
        </p>
        <h1 className="type-display mt-5 max-w-[14ch] text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.92] tracking-tight text-balance">
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              'mt-7 max-w-md text-base leading-relaxed sm:mt-8 sm:text-lg',
              tone === 'ink' || tone === 'navy' || tone === 'crimson'
                ? 'text-paper/65'
                : 'text-ink/70'
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
