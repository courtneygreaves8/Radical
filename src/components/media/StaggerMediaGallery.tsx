import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'

import { AppImage } from '@/components/shared/AppImage'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import {
  ComingSoonThumb,
  comingSoonKindFromCategory,
  isComingSoonCover,
  type ComingSoonKind,
} from '@/components/media/ComingSoonThumb'
import { cn } from '@/lib/utils'

export type StaggerMediaItem = {
  id: string
  number: string
  title: string
  meta: string
  image: string
  href: string
  kind?: ComingSoonKind
}

export type StaggerSortId = 'chrono' | 'alpha' | string

type StaggerMediaGalleryProps = {
  items: StaggerMediaItem[]
  sorts?: { id: StaggerSortId; label: string }[]
  activeSort?: StaggerSortId
  onSortChange?: (id: StaggerSortId) => void
  watermark?: string
  className?: string
}

const STAGGER = ['translate-y-0', 'translate-y-10 sm:translate-y-14', '-translate-y-6 sm:-translate-y-10']

/**
 * Feldman-style staggered horizontal gallery — Radical edges, scrub + sorts.
 */
export function StaggerMediaGallery({
  items,
  sorts = [
    { id: 'chrono', label: 'Chronological' },
    { id: 'alpha', label: 'Alphabetical' },
  ],
  activeSort = 'chrono',
  onSortChange,
  watermark = 'Shows',
  className,
}: StaggerMediaGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const { scrollXProgress } = useScroll({ container: scrollerRef })
  useMotionValueEvent(scrollXProgress, 'change', (v) => setProgress(v))

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollLeft = 0
  }, [items, activeSort])

  const endLabel = useMemo(
    () => String(items.length).padStart(2, '0'),
    [items.length]
  )

  function scrubTo(ratio: number) {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    el.scrollTo({ left: max * ratio, behavior: 'smooth' })
  }

  if (items.length === 0) {
    return (
      <section className={cn('border-b-2 border-ink bg-paper px-5 py-16', className)}>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
          Nothing in this view yet
        </p>
      </section>
    )
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden border-b-2 border-ink bg-paper text-ink',
        className
      )}
    >
      {/* Timeline scrubber */}
      <div className="mx-auto max-w-[1600px] px-5 pt-10 sm:px-8 sm:pt-12">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
          <span>01.</span>
          <button
            type="button"
            aria-label="Scrub shows"
            className="relative h-px flex-1 bg-ink/20"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const ratio = Math.min(
                1,
                Math.max(0, (e.clientX - rect.left) / rect.width)
              )
              scrubTo(ratio)
            }}
          >
            <motion.span
              className="absolute top-1/2 size-3 -translate-y-1/2 border-2 border-ink bg-lime"
              style={{ left: `calc(${progress * 100}% - 6px)` }}
            />
          </button>
          <span>{endLabel}.</span>
        </div>
      </div>

      {/* Staggered horizontal strip */}
      <div
        ref={scrollerRef}
        className="mt-10 flex touch-pan-x gap-6 overflow-x-auto overscroll-x-contain px-5 pb-16 pt-8 sm:gap-8 sm:px-8 sm:pb-20 sm:pt-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <Link
            key={item.id}
            to={item.href}
            className={cn(
              'group w-[min(72vw,280px)] shrink-0 sm:w-[300px] lg:w-[320px]',
              STAGGER[i % STAGGER.length]
            )}
          >
            <OffsetBlock offset="ink" className="mb-1" revealOnHover>
              <div className="relative aspect-[4/5] overflow-hidden border-2 border-ink bg-ink">
                {isComingSoonCover(item.image) ? (
                  <ComingSoonThumb
                    kind={
                      item.kind ??
                      comingSoonKindFromCategory(item.meta.split('·')[0])
                    }
                    className="absolute inset-0"
                  />
                ) : (
                  <>
                    <AppImage
                      src={item.image}
                      alt=""
                      className="size-full transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-ink/10 transition group-hover:bg-ink/0" />
                  </>
                )}
              </div>
            </OffsetBlock>
            <div className="mt-4 flex items-start gap-3">
              <p className="type-display text-3xl leading-none sm:text-4xl">
                {item.number}
              </p>
              <div className="min-w-0 pt-1">
                <p className="truncate text-sm font-bold tracking-tight sm:text-base">
                  {item.title}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                  {item.meta}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {/* End spacer so last card can clear the watermark */}
        <div className="w-24 shrink-0 sm:w-40" aria-hidden />
      </div>

      {/* Bottom sorts + watermark */}
      <div className="relative border-t-2 border-ink">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-5 gap-y-3 px-5 py-5 sm:px-8">
          {sorts.map((s) => {
            const on = s.id === activeSort
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSortChange?.(s.id)}
                className={cn(
                  'font-mono text-[10px] uppercase tracking-[0.18em] transition sm:text-[11px]',
                  on
                    ? 'font-bold text-ink'
                    : 'text-ink/40 hover:text-ink'
                )}
              >
                {s.label}
              </button>
            )
          })}
          <p className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink/35">
            Swipe to browse
          </p>
        </div>

        <p
          aria-hidden
          className="type-display pointer-events-none absolute -bottom-4 right-0 select-none text-[clamp(4.5rem,18vw,11rem)] leading-none text-ink/[0.07] sm:-bottom-8"
        >
          {watermark}
        </p>
      </div>
    </section>
  )
}
