import {
  GeoIcon,
  type GeoIconName,
} from '@/components/marketing/geo/GeoIcons'
import { cn } from '@/lib/utils'

type GeoPatternProps = {
  motif?: GeoIconName
  tone?: 'paper' | 'ink' | 'lime'
  anchor?:
    | 'tr'
    | 'tl'
    | 'br'
    | 'bl'
    | 'center-right'
    | 'center-left'
    | 'bleed-left'
    | 'bleed-right'
  className?: string
  /** Keep readable but secondary to copy */
  opacity?: number
}

/** Compact corner accents + oversized half-bleed marks. */
const anchors: Record<NonNullable<GeoPatternProps['anchor']>, string> = {
  tr: 'right-5 top-5 size-[4.5rem] sm:right-7 sm:top-7 sm:size-24',
  tl: 'left-5 top-5 size-[4.5rem] sm:left-7 sm:top-7 sm:size-24',
  br: 'right-5 bottom-5 size-[4.5rem] sm:right-7 sm:bottom-7 sm:size-24',
  bl: 'left-5 bottom-5 size-[4.5rem] sm:left-7 sm:bottom-7 sm:size-24',
  'center-right':
    'right-5 top-1/2 size-[4.5rem] -translate-y-1/2 sm:right-8 sm:size-24 lg:size-28',
  'center-left':
    'left-5 top-1/2 size-[4.5rem] -translate-y-1/2 sm:left-8 sm:size-24 lg:size-28',
  /** Section-tall; left half clipped off the edge */
  'bleed-left':
    'left-0 top-1/2 aspect-square h-[115%] max-h-none w-auto -translate-x-1/2 -translate-y-1/2',
  /** Section-tall; right half clipped off the edge */
  'bleed-right':
    'right-0 top-1/2 aspect-square h-[115%] max-h-none w-auto translate-x-1/2 -translate-y-1/2',
}

/**
 * Geometric accent — place inside relative overflow-hidden sections.
 */
export function GeoPattern({
  motif = 'rings',
  tone = 'paper',
  anchor = 'tl',
  className,
  opacity = 0.28,
}: GeoPatternProps) {
  const color =
    tone === 'lime' ? 'text-lime' : tone === 'ink' ? 'text-ink' : 'text-paper'

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <div
        className={cn('absolute', anchors[anchor], color)}
        style={{ opacity }}
      >
        <GeoIcon name={motif} className="size-full" />
      </div>
    </div>
  )
}
