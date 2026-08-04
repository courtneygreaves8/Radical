import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { AppImage } from '@/components/shared/AppImage'
import { cn } from '@/lib/utils'

export type StackSlideProps = {
  index: string
  title: string
  body: string
  detail?: string
  image?: string
  imagePosition?: string
  cta?: { label: string; href: string }
  tone?: 'paper' | 'ink' | 'lime' | 'navy'
  /** Offset slab behind media — defaults by tone */
  slab?: 'lime' | 'ink' | 'crimson' | 'flame' | 'navy'
  className?: string
  id?: string
  /** Optional node under the image (chips, etc.) */
  children?: ReactNode
}

const defaultSlab: Record<
  NonNullable<StackSlideProps['tone']>,
  NonNullable<StackSlideProps['slab']>
> = {
  paper: 'lime',
  ink: 'lime',
  lime: 'ink',
  navy: 'lime',
}

const slabClass = {
  lime: 'bg-lime',
  ink: 'bg-ink',
  crimson: 'bg-crimson',
  flame: 'bg-crimson',
  navy: 'bg-navy',
} as const

/**
 * Inspo slide layout — large index left, title / media / copy / CTA right.
 */
export function StackSlide({
  index,
  title,
  body,
  detail,
  image,
  imagePosition: _imagePosition,
  cta,
  tone = 'paper',
  slab: slabProp,
  className,
  id,
  children,
}: StackSlideProps) {
  const tones = {
    paper: 'bg-paper text-ink border-ink',
    ink: 'bg-ink text-paper border-ink',
    lime: 'bg-lime text-lime-foreground border-ink',
    navy: 'bg-navy text-paper border-ink',
  }
  const dark = tone === 'ink' || tone === 'navy'
  const muted = dark ? 'text-paper/55' : 'text-ink/55'
  const titleHover = dark ? 'hover:text-lime' : 'hover:text-ink/70'
  const slab = slabClass[slabProp ?? defaultSlab[tone]]
  const reduceMotion = useReducedMotion()

  return (
    <article
      id={id}
      className={cn(
        'flex w-full min-h-[calc(100dvh-4rem)] flex-col border-b border-ink/10 sm:min-h-[calc(100dvh-4.5rem)]',
        tones[tone],
        className
      )}
    >
      <div className="grid w-full flex-1 gap-8 px-6 py-12 sm:gap-10 sm:px-10 sm:py-14 lg:grid-cols-[0.28fr_0.72fr] lg:gap-14 lg:px-16 lg:py-16 xl:px-20">
        <div className="flex items-center gap-3 sm:gap-3.5 lg:pt-1">
          <span
            aria-hidden
            className={cn(
              'h-[0.72em] w-px shrink-0 sm:w-0.5',
              'text-[clamp(4.5rem,14vw,9rem)]',
              tone === 'ink'
                ? 'bg-lime'
                : tone === 'navy'
                  ? 'bg-lime'
                  : 'bg-ink'
            )}
          />
          <p className="type-display text-[clamp(4.5rem,14vw,9rem)] leading-none tracking-tight">
            {index}
          </p>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            {cta ? (
              <Link
                to={cta.href}
                aria-label={cta.label}
                className={cn(
                  'mt-1 flex size-9 shrink-0 items-center justify-center border-2 border-current transition',
                  dark
                    ? 'hover:border-lime hover:bg-lime hover:text-lime-foreground'
                    : 'hover:bg-ink hover:text-lime'
                )}
              >
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <span
                className="mt-1 flex size-9 shrink-0 items-center justify-center border-2 border-current opacity-40"
                aria-hidden
              >
                <ArrowRight className="size-4" />
              </span>
            )}
          </div>

          {image ? (
            <div className="relative mt-8 w-full sm:mt-10">
              {/* Offset fill — reveal when the section hits view */}
              <motion.div
                aria-hidden
                className={cn('absolute inset-0', slab)}
                initial={
                  reduceMotion
                    ? { opacity: 1, x: 12, y: 12 }
                    : { opacity: 0, x: 0, y: 0 }
                }
                whileInView={{ opacity: 1, x: 12, y: 12 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />

              <AppImage
                src={image}
                alt=""
                className="relative z-10 aspect-[16/9] w-full overflow-hidden border-2 border-ink lg:aspect-[2/1]"
              />
            </div>
          ) : null}

          <p
            className={cn(
              'mt-6 max-w-2xl text-base leading-relaxed sm:text-lg',
              image ? '' : 'mt-10'
            )}
          >
            {body}
          </p>

          {detail ? (
            <p
              className={cn(
                'mt-3 font-mono text-[10px] uppercase tracking-[0.18em]',
                muted
              )}
            >
              {detail}
            </p>
          ) : null}

          {children}

          {cta ? (
            <Link
              to={cta.href}
              className={cn(
                'mt-auto inline-flex w-fit items-center gap-2 border-b-2 border-current pt-10 pb-1 text-sm font-bold uppercase tracking-wider transition',
                titleHover
              )}
            >
              {cta.label}
              <ArrowRight className="size-3.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}

type StickyStackProps = {
  children: ReactNode
  className?: string
  /** Backdrop behind the stacking cards */
  tone?: 'lime' | 'mute' | 'ink'
}

/**
 * Full-width sticky stack — each child slides up and sits on the previous.
 * Trailing pad lets the last card release without a huge empty void.
 */
export function StickyStack({
  children,
  className,
  tone = 'lime',
}: StickyStackProps) {
  const bg =
    tone === 'ink' ? 'bg-ink' : tone === 'mute' ? 'bg-mute' : 'bg-lime'

  const items = Array.isArray(children) ? children : [children]

  return (
    <section className={cn('relative w-full border-b border-ink/10', bg, className)}>
      <div className="w-full pb-10 sm:pb-12">
        {items.map((child, i) => (
          <div
            key={i}
            className="sticky top-16 sm:top-[4.5rem]"
            style={{ zIndex: i + 1 }}
          >
            {child}
          </div>
        ))}
      </div>
    </section>
  )
}
