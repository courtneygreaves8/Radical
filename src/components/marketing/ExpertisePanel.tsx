import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { AppImage } from '@/components/shared/AppImage'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

export type ExpertiseSlide = {
  id: string
  category: string
  title: string
  place: string
  image: string
  href?: string
}

type ExpertisePanelProps = {
  index: string
  label: string
  headline: string
  slides: ExpertiseSlide[]
  seeAllHref?: string
  seeAllLabel?: string
  className?: string
}

/** Composition Expertise — category rail + full-bleed grainy slider inside a sharp panel. */
export function ExpertisePanel({
  index,
  label,
  headline,
  slides,
  seeAllHref,
  seeAllLabel = 'See all',
  className,
}: ExpertisePanelProps) {
  const categories = [...new Set(slides.map((s) => s.category))]
  const [category, setCategory] = useState(categories[0] ?? '')
  const filtered = slides.filter((s) => s.category === category)
  const [slideIndex, setSlideIndex] = useState(0)
  const slide = filtered[slideIndex] ?? filtered[0]

  useEffect(() => {
    setSlideIndex(0)
  }, [category])

  useEffect(() => {
    if (filtered.length < 2) return
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % filtered.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [filtered.length, category])

  return (
    <section className={cn('border-b-2 border-ink bg-mute', className)}>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="border-2 border-ink bg-ink text-paper">
          <div className="grid gap-8 border-b-2 border-paper/15 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/45">
                ({index}) {label}
              </p>
              <h2 className="mt-5 max-w-xl text-3xl font-medium leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-5xl">
                {headline}
              </h2>
            </div>
            <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:items-end lg:justify-end lg:gap-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      'font-mono text-xs font-bold uppercase tracking-wider transition sm:text-sm',
                      cat === category
                        ? 'text-lime'
                        : 'text-paper/35 hover:text-paper/70'
                    )}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <OffsetBlock offset="lime">
              <div className="photo-grain relative aspect-[16/9] overflow-hidden border-2 border-ink bg-ink sm:aspect-[21/9]">
                <AnimatePresence mode="wait">
                  {slide ? (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0 size-full"
                    >
                      <AppImage
                        src={slide.image}
                        alt=""
                        className="absolute inset-0 size-full"
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink via-transparent to-transparent" />
              </div>
            </OffsetBlock>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {slide ? (
                  <>
                    <p className="text-lg font-bold tracking-tight sm:text-xl">
                      {slide.title}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-paper/45">
                      {slide.place}
                    </p>
                  </>
                ) : null}
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous"
                    disabled={filtered.length < 2}
                    className="flex size-10 items-center justify-center border-2 border-paper/30 text-paper transition hover:border-lime hover:text-lime disabled:opacity-30"
                    onClick={() =>
                      setSlideIndex(
                        (i) => (i - 1 + filtered.length) % filtered.length
                      )
                    }
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next"
                    disabled={filtered.length < 2}
                    className="flex size-10 items-center justify-center border-2 border-paper/30 text-paper transition hover:border-lime hover:text-lime disabled:opacity-30"
                    onClick={() =>
                      setSlideIndex((i) => (i + 1) % filtered.length)
                    }
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>

              {seeAllHref ? (
                <Link
                  to={seeAllHref}
                  className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider text-lime hover:underline"
                >
                  {seeAllLabel}
                  <span className="h-px w-16 bg-lime" aria-hidden />
                  <ArrowUpRight className="size-3.5" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
