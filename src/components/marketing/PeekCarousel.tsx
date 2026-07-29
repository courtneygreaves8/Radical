import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  type PanInfo,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

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

/** Off-screen peek carousel — drag + hover circle cursor. */
export function PeekCarousel({
  index,
  label,
  slides,
  className,
}: PeekCarouselProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const [frameW, setFrameW] = useState(0)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(0)
  const rawCX = useMotionValue(0)
  const rawCY = useMotionValue(0)
  const cursorX = useSpring(rawCX, { stiffness: 440, damping: 34 })
  const cursorY = useSpring(rawCY, { stiffness: 440, damping: 34 })

  const slideW = frameW * SLIDE_FRAC

  function targetX(forIndex: number, width: number) {
    const w = width * SLIDE_FRAC
    if (!width) return 0
    return width / 2 - w / 2 - forIndex * (w + GAP)
  }

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const measure = () => setFrameW(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    void animate(x, targetX(i, frameW), {
      type: 'spring',
      stiffness: 280,
      damping: 32,
    })
  }, [i, frameW, x])

  function go(next: number) {
    setI((next + slides.length) % slides.length)
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -70 || info.velocity.x < -450) go(i + 1)
    else if (info.offset.x > 70 || info.velocity.x > 450) go(i - 1)
    else
      void animate(x, targetX(i, frameW), {
        type: 'spring',
        stiffness: 400,
        damping: 36,
      })
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    rawCX.set(e.clientX - rect.left)
    rawCY.set(e.clientY - rect.top)
  }

  const curr = slides[i]

  return (
    <section className={cn('border-b-2 border-ink bg-mute', className)}>
      <div className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
            ({index}) {label}
          </p>
        </div>

        <div
          ref={frameRef}
          className="relative mt-8 cursor-none overflow-hidden border-y-2 border-ink bg-paper py-5 sm:py-7"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={onMove}
        >
          <motion.div
            className="flex"
            style={{ x, gap: GAP }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={onDragEnd}
          >
            {slides.map((slide, idx) => {
              const active = idx === i
              return (
                <div
                  key={slide.id}
                  className="shrink-0"
                  style={{ width: slideW || undefined, flexBasis: `${SLIDE_FRAC * 100}%` }}
                >
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
                </div>
              )
            })}
          </motion.div>

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
            Drag
          </motion.div>
        </div>

        <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="h-0.5 flex-1 bg-ink/15">
            <div
              className="h-full bg-ink transition-all duration-300"
              style={{ width: `${((i + 1) / slides.length) * 100}%` }}
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
