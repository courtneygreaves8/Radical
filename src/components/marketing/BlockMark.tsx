import { MorphMark } from '@/components/marketing/MorphMark'
import { GeoPattern } from '@/components/marketing/geo/GeoPattern'
import { cn } from '@/lib/utils'

type BlockLine = {
  text: string
}

type BlockMarkProps = {
  index?: string
  metaLeft?: string
  metaRight?: string
  lines: [BlockLine, BlockLine] | BlockLine[]
  body?: string
  showMark?: boolean
  className?: string
}

/**
 * Nike / Swiss label blocks — stacked lime slabs with paper type.
 * Place lower on the page as a loud section break.
 */
export function BlockMark({
  index,
  metaLeft,
  metaRight,
  lines,
  body,
  showMark = true,
  className,
}: BlockMarkProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b-2 border-ink bg-mute',
        className
      )}
    >
      <GeoPattern motif="asterisk8" tone="ink" anchor="tl" opacity={0.2} />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
            {index ? `(${index}) ` : null}
            {metaLeft}
          </p>
          {metaRight ? (
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
              {metaRight}
            </p>
          ) : null}
        </div>

        <div className="relative">
          {showMark ? (
            <MorphMark className="absolute -top-2 left-0 size-14 text-ink sm:size-16 lg:size-20" />
          ) : null}

          <div
            className={cn(
              'flex flex-col items-start gap-2 sm:gap-3',
              showMark && 'pt-16 sm:pt-20'
            )}
          >
            {lines.map((line, i) => (
              <h2
                key={`${line.text}-${i}`}
                className={cn(
                  'type-brutal inline-block bg-lime px-3 py-1 text-[clamp(2.75rem,12vw,7.5rem)] leading-[0.9] text-paper sm:px-4 sm:py-1.5',
                  i === 0 && 'max-w-full'
                )}
              >
                {line.text}
              </h2>
            ))}
          </div>
        </div>

        {body ? (
          <p className="mt-10 max-w-md text-sm leading-relaxed text-ink/60 sm:text-base">
            {body}
          </p>
        ) : null}
      </div>
    </section>
  )
}
