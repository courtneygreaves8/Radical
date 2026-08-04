import { cn } from '@/lib/utils'
import type { MediaVideo } from '@/lib/mediaVideos'

type PodcastThumbArtProps = {
  item: MediaVideo
  className?: string
  /** Smaller type/padding for stacked side cards */
  compact?: boolean
}

/**
 * Full-bleed podcast thumbnail — photo edge-to-edge with Radical type overlays.
 */
export function PodcastThumbArt({
  item,
  className,
  compact = false,
}: PodcastThumbArtProps) {
  return (
    <div
      className={cn(
        'relative isolate size-full min-h-0 overflow-hidden bg-[#120e0c]',
        className
      )}
    >
      <img
        src={item.fullBleed}
        alt=""
        className="absolute inset-0 size-full object-cover object-center"
        draggable={false}
        decoding="async"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[var(--v3-ink)] via-[var(--v3-ink)]/40 to-[var(--v3-ink)]/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[var(--v3-ink)]/40 via-transparent to-transparent"
      />

      <div
        className={cn(
          'absolute inset-x-0 bottom-0 z-[2] flex flex-col items-start',
          compact ? 'p-2.5 sm:p-3' : 'p-4 sm:p-5'
        )}
      >
        <span
          className={cn(
            'inline-flex rounded-sm bg-[var(--v3-terra)] font-bold uppercase tracking-[0.18em] text-white',
            compact
              ? 'px-1.5 py-0.5 text-[7px]'
              : 'px-2 py-0.5 text-[8px] sm:text-[9px]'
          )}
        >
          Podcast
        </span>
        <div
          className={cn(
            'mt-1.5 flex flex-col items-start',
            compact ? 'gap-0.5' : 'mt-2 gap-1'
          )}
        >
          {item.thumbLines.map((line) =>
            line.highlight ? (
              <span
                key={line.text}
                className={cn(
                  'bg-[var(--v3-terra)] font-sans font-black uppercase leading-none tracking-tight text-[var(--v3-ink)]',
                  compact
                    ? 'px-1.5 py-0.5 text-[11px]'
                    : 'px-2 py-0.5 text-[13px] sm:text-base'
                )}
              >
                {line.text}
              </span>
            ) : (
              <span
                key={line.text}
                className={cn(
                  'font-sans font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]',
                  compact ? 'text-[11px]' : 'text-[13px] sm:text-base'
                )}
              >
                {line.text}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  )
}
