import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

export type PeekSlide = {
  id: string
  title: string
  image: string
  imagePosition?: string
  href?: string
}

type PeekCarouselProps = {
  index: string
  label: string
  slides: PeekSlide[]
  className?: string
}

const SLIDE_FRAC = 0.72
const GAP = 12

/** Off-screen peek carousel — swipe, trackpad, and horizontal scroll. */
export function PeekCarousel({
  index,
  label,
  slides,
  className,
}: PeekCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const [hovering, setHovering] = useState(false)
  const scrollingRef = useRef(false)

  const rawCX = useMotionValue(0)
  const rawCY = useMotionValue(0)
  const cursorX = useSpring(rawCX, { stiffness: 440, damping: 34 })
  const cursorY = useSpring(rawCY, { stiffness: 440, damping: 34 })

  function scrollToIndex(next: number, behavior: ScrollBehavior = 'smooth') {
    const el = scrollerRef.current
    if (!el || !slides.length) return
    const clamped = ((next % slides.length) + slides.length) % slides.length
    const slide = el.children[clamped] as HTMLElement | undefined
    if (!slide) return
    scrollingRef.current = true
    const left =
      slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2
    el.scrollTo({ left: Math.max(0, left), behavior })
    setI(clamped)
    window.setTimeout(() => {
      scrollingRef.current = false
    }, behavior === 'smooth' ? 450 : 50)
  }

  function go(next: number) {
    scrollToIndex(next)
  }

  // New slide set (filters) → snap back to first
  useEffect(() => {
    setI(0)
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: 0, behavior: 'auto' })
  }, [slides])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const sync = () => {
      if (scrollingRef.current) return
      const kids = Array.from(el.children) as HTMLElement[]
      if (!kids.length) return
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      kids.forEach((kid, idx) => {
        const center = kid.offsetLeft + kid.offsetWidth / 2
        const dist = Math.abs(center - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = idx
        }
      })
      setI(best)
    }

    el.addEventListener('scroll', sync, { passive: true })
    sync()
    return () => el.removeEventListener('scroll', sync)
  }, [slides])

  // Vertical wheel → horizontal browse (trackpad already sends deltaX)
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return
      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)
      if (absX > absY) return
      if (absY < 1) return
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0
      const atEnd = el.scrollLeft >= max - 1 && e.deltaY > 0
      if (atStart || atEnd) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    rawCX.set(e.clientX - rect.left)
    rawCY.set(e.clientY - rect.top)
  }

  const curr = slides[i]
  const sidePad = `${((1 - SLIDE_FRAC) / 2) * 100}%`

  return (
    <section className={cn('border-b-2 border-ink bg-mute', className)}>
      <div className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
            ({index}) {label}
          </p>
        </div>

        <div
          className="relative mt-8 border-y-2 border-ink bg-paper py-5 sm:py-7"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={onMove}
        >
          <div
            ref={scrollerRef}
            className={cn(
              'flex cursor-none overflow-x-auto overflow-y-hidden py-1',
              'snap-x snap-mandatory scroll-smooth touch-pan-x',
              '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            )}
            style={{
              paddingLeft: sidePad,
              paddingRight: sidePad,
              gap: GAP,
            }}
          >
            {slides.map((slide, idx) => {
              const active = idx === i
              return (
                <div
                  key={slide.id}
                  className="shrink-0 snap-center pb-3 sm:pb-4"
                  style={{
                    width: `${SLIDE_FRAC * 100}%`,
                    scrollSnapAlign: 'center',
                  }}
                >
                  <OffsetBlock offset="lime" className="pr-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (!active) go(idx)
                      }}
                      className={cn(
                        'photo-grain relative block w-full overflow-hidden border-2 border-ink text-left transition duration-300',
                        'aspect-[16/10] sm:aspect-[16/9]',
                        active ? 'opacity-100' : 'opacity-50'
                      )}
                    >
                      <img
                        src={slide.image}
                        alt=""
                        className="photo-bw absolute inset-0 size-full object-cover"
                        style={
                          slide.imagePosition
                            ? { objectPosition: slide.imagePosition }
                            : undefined
                        }
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-ink/20" />
                      {active ? (
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <span className="flex size-14 items-center justify-center border-2 border-paper/70 bg-paper/20 text-paper backdrop-blur-sm sm:size-16">
                            <Play className="size-5 fill-current" />
                          </span>
                        </span>
                      ) : null}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/45 to-transparent p-4 sm:p-6">
                        {slide.href && active ? (
                          <Link
                            to={slide.href}
                            className="type-display relative z-10 text-xl text-paper hover:text-lime sm:text-2xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {slide.title}
                          </Link>
                        ) : (
                          <p className="type-display text-xl text-paper/80 sm:text-2xl">
                            {slide.title}
                          </p>
                        )}
                      </div>
                    </button>
                  </OffsetBlock>
                </div>
              )
            })}
          </div>

          <motion.div
            aria-hidden
            className={cn(
              'pointer-events-none absolute top-0 left-0 z-30 hidden size-[4.25rem] items-center justify-center rounded-full bg-lime font-mono text-[10px] font-bold uppercase tracking-wider text-ink shadow-[4px_4px_0_0_#000] transition-opacity duration-150 sm:flex',
              hovering ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              left: cursorX,
              top: cursorY,
              x: '-50%',
              y: '-50%',
            }}
          >
            Swipe
          </motion.div>
        </div>

        <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="h-0.5 flex-1 bg-ink/15">
            <div
              className="h-full bg-ink transition-all duration-300"
              style={{
                width: `${slides.length ? ((i + 1) / slides.length) * 100 : 0}%`,
              }}
            />
          </div>
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink/45">
            {String(i + 1).padStart(2, '0')} /{' '}
            {String(slides.length).padStart(2, '0')}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(i - 1)}
              className="flex size-9 items-center justify-center border-2 border-ink text-ink transition hover:bg-ink hover:text-lime"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(i + 1)}
              className="flex size-9 items-center justify-center border-2 border-ink text-ink transition hover:bg-ink hover:text-lime"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {curr ? (
          <p className="mx-auto mt-4 max-w-7xl px-5 font-mono text-xs text-ink/40 sm:hidden">
            Swipe to browse
          </p>
        ) : null}
      </div>
    </section>
  )
}
