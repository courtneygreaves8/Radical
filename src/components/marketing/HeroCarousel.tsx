import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { AppImage } from '@/components/shared/AppImage'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { Button } from '@/components/ui/button'
import type { CarouselSlide } from '@/lib/content'
import { cn } from '@/lib/utils'

type HeroCarouselProps = {
  slides: CarouselSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  useEffect(() => {
    if (slides.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [slides.length])

  if (!slide) return null

  return (
    <section className="relative border-b border-ink/10 bg-ink">
      <div className="photo-grain relative aspect-[16/10] min-h-[280px] w-full overflow-hidden sm:aspect-[21/9] sm:min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 size-full"
          >
            <AppImage
              src={slide.image}
              alt=""
              className="absolute inset-0 size-full"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <OffsetBlock offset="lime" className="max-w-xl">
              <div className="border-2 border-ink bg-paper p-5 sm:p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
                  0{index + 1} / 0{slides.length}
                </p>
                <h2 className="type-display mt-2 text-2xl sm:text-4xl">
                  {slide.title}
                </h2>
                <p className="mt-2 text-sm text-ink/75 sm:text-base">
                  {slide.caption}
                </p>
                {slide.ctaHref ? (
                  <Button variant="lime" size="sm" className="mt-4" offset asChild>
                    <Link to={slide.ctaHref}>
                      {slide.ctaLabel ?? 'Learn more'}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </OffsetBlock>

            <div className="flex gap-2 self-end">
              <button
                type="button"
                aria-label="Previous slide"
                className="flex size-11 items-center justify-center border-2 border-paper bg-ink text-paper transition hover:bg-lime hover:text-lime-foreground"
                onClick={() =>
                  setIndex((i) => (i - 1 + slides.length) % slides.length)
                }
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                className="flex size-11 items-center justify-center border-2 border-paper bg-ink text-paper transition hover:bg-lime hover:text-lime-foreground"
                onClick={() => setIndex((i) => (i + 1) % slides.length)}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-t border-ink/10 bg-paper px-5 py-2 sm:px-8">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              'h-1.5 flex-1 transition-colors',
              i === index ? 'bg-lime' : 'bg-mute hover:bg-ink/30'
            )}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
