import {
  BookOpen,
  Headphones,
  Mic2,
  Radio,
  type LucideIcon,
} from 'lucide-react'

import { GeoIcon, type GeoIconName } from '@/components/marketing/geo/GeoIcons'
import { cn } from '@/lib/utils'

export const COMING_SOON_COVER = '__coming_soon__'

export function isComingSoonCover(src?: string | null) {
  return !src || src === COMING_SOON_COVER
}

export type ComingSoonKind =
  | 'sermons'
  | 'worship'
  | 'discipleship'
  | 'stories'
  | 'default'

const kindConfig: Record<
  ComingSoonKind,
  { Icon: LucideIcon; geo: GeoIconName; label: string }
> = {
  sermons: { Icon: Mic2, geo: 'sunburst', label: 'Sermons' },
  worship: { Icon: Headphones, geo: 'rings', label: 'Worship' },
  discipleship: { Icon: BookOpen, geo: 'cross', label: 'Discipleship' },
  stories: { Icon: Radio, geo: 'spark', label: 'Stories' },
  default: { Icon: Headphones, geo: 'asterisk6', label: 'Media' },
}

export function comingSoonKindFromCategory(category?: string): ComingSoonKind {
  const c = (category ?? '').toLowerCase()
  if (c.includes('sermon') || c.includes('preach')) return 'sermons'
  if (c.includes('worship')) return 'worship'
  if (c.includes('disciple')) return 'discipleship'
  if (c.includes('stor')) return 'stories'
  return 'default'
}

type ComingSoonThumbProps = {
  className?: string
  kind?: ComingSoonKind
  /** Optional show / episode title line */
  title?: string
  compact?: boolean
}

/** Radical branded podcast placeholder — lime field, geo + media icon. */
export function ComingSoonThumb({
  className,
  kind = 'default',
  title,
  compact = false,
}: ComingSoonThumbProps) {
  const { Icon, geo, label } = kindConfig[kind]

  return (
    <div
      className={cn(
        'relative flex size-full flex-col overflow-hidden bg-lime text-ink',
        className
      )}
    >
      <GeoIcon
        name={geo}
        className="pointer-events-none absolute -right-6 -top-6 size-[70%] text-ink/[0.08] sm:size-[75%]"
      />
      <GeoIcon
        name="asterisk6"
        className="pointer-events-none absolute -bottom-8 -left-8 size-[55%] text-ink/[0.06]"
      />

      <div className="relative z-10 flex flex-1 flex-col justify-between p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="inline-flex size-10 items-center justify-center border-2 border-ink bg-ink text-lime sm:size-11">
            <Icon className="size-5 sm:size-6" strokeWidth={2} />
          </span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink/55">
            {label}
          </span>
        </div>

        <div>
          <p
            className={cn(
              'type-display leading-[0.9] tracking-tight',
              compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl lg:text-4xl'
            )}
          >
            Coming
            <br />
            soon
          </p>
          {title ? (
            <p className="mt-2 line-clamp-2 text-xs font-medium text-ink/65 sm:text-sm">
              {title}
            </p>
          ) : (
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/50">
              Radical Media
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
