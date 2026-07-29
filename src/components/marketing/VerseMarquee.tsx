import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** Short scripture ticks — Radical / gospel-aligned. */
export const verseTicks = [
  'For God so loved the world — John 3:16',
  'Go into all the world — Mark 16:15',
  'I am the way, the truth, and the life — John 14:6',
  'Repent and be baptised — Acts 2:38',
  'The Spirit of the Lord is upon me — Luke 4:18',
  'Faith without works is dead — James 2:17',
  'Love one another as I have loved you — John 13:34',
  'Be doers of the word — James 1:22',
  'Greater is He that is in you — 1 John 4:4',
  'How beautiful are the feet of those who preach — Romans 10:15',
] as const

type VerseMarqueeProps = {
  items?: readonly string[]
  className?: string
  /**
   * Selector for the section below — when it enters view,
   * flip to lime bg + black type.
   */
  invertWhenVisible?: string
}

/**
 * Ticker strip — ink + lime by default; inverts when the next section appears.
 */
export function VerseMarquee({
  items = verseTicks,
  className,
  invertWhenVisible,
}: VerseMarqueeProps) {
  const sep = ' ——— '
  const line = items.join(sep)
  const track = `${line}${sep}${line}${sep}`
  const [inverted, setInverted] = useState(false)

  useEffect(() => {
    if (!invertWhenVisible) return
    const target = document.querySelector(invertWhenVisible)
    if (!target) return

    const io = new IntersectionObserver(
      ([entry]) => {
        setInverted(entry.isIntersecting)
      },
      {
        threshold: 0,
        // Detect the next section as it approaches (before it fully covers)
        rootMargin: '0px 0px 40% 0px',
      }
    )
    io.observe(target)
    return () => io.disconnect()
  }, [invertWhenVisible])

  return (
    <section
      aria-label="Scripture"
      className={cn(
        'overflow-hidden border-b-2 border-ink transition-colors duration-500',
        inverted ? 'bg-lime' : 'bg-ink',
        className
      )}
    >
      <div className="relative flex h-12 items-center sm:h-14">
        <div className="verse-marquee flex whitespace-nowrap will-change-transform">
          <p
            className={cn(
              'font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-500 sm:text-sm',
              inverted ? 'text-ink' : 'text-lime'
            )}
          >
            {track}
          </p>
          <p
            aria-hidden
            className={cn(
              'font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-500 sm:text-sm',
              inverted ? 'text-ink' : 'text-lime'
            )}
          >
            {track}
          </p>
        </div>
      </div>
    </section>
  )
}
