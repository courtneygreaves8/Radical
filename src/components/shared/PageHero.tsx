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
  lime: 'bg-lime text-lime-foreground',
  ink: 'bg-ink text-paper',
  paper: 'bg-paper text-ink',
  navy: 'bg-navy text-paper',
  crimson: 'bg-crimson text-lime-foreground',
} as const

const markTone = {
  lime: 'text-paper/[0.18]',
  ink: 'text-lime/[0.14]',
  paper: 'text-ink/[0.07]',
  navy: 'text-lime/[0.14]',
  crimson: 'text-paper/[0.16]',
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
  const onDark = tone === 'ink' || tone === 'navy' || tone === 'lime' || tone === 'crimson'

  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-ink/10',
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
            'text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs',
            onDark ? 'text-paper/55' : 'text-ink/45'
          )}
        >
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-[14ch] font-sans text-[clamp(2.5rem,8vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-balance">
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              'mt-7 max-w-md text-base leading-relaxed sm:mt-8 sm:text-lg',
              onDark ? 'text-paper/70' : 'text-ink/65'
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
