import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GeoPattern } from '@/components/marketing/geo/GeoPattern'
import { cn } from '@/lib/utils'

export type AccordionItem = {
  id: string
  title: string
  body: string
}

type AccordionRailProps = {
  index: string
  label: string
  items: AccordionItem[]
  cta?: { label: string; href: string }
  tone?: 'paper' | 'ink'
  className?: string
}

/** Cascade-style accordion rail — sharp rows, +/- expand. */
export function AccordionRail({
  index,
  label,
  items,
  cta,
  tone = 'paper',
  className,
}: AccordionRailProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)
  const ink = tone === 'ink'

  return (
    <section
      className={cn(
        'relative overflow-hidden border-b-2 border-ink',
        ink ? 'bg-ink text-paper' : 'bg-paper text-ink',
        className
      )}
    >
      <GeoPattern
        motif={ink ? 'asterisk6' : 'gear'}
        tone={ink ? 'paper' : 'ink'}
        anchor="tl"
        opacity={ink ? 0.3 : 0.2}
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p
            className={cn(
              'font-mono text-xs uppercase tracking-[0.2em]',
              ink ? 'text-paper/45' : 'text-ink/45'
            )}
          >
            ■ ({index}) {label}
          </p>
          {cta ? (
            <Button
              variant={ink ? 'lime' : 'default'}
              offset
              className="mt-10 hidden lg:inline-flex"
              asChild
            >
              <Link to={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : null}
        </div>

        <ul
          className={cn(
            'divide-y-2 border-y-2',
            ink ? 'divide-paper/15 border-paper/15' : 'divide-ink border-ink'
          )}
        >
          {items.map((item) => {
            const open = openId === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left sm:py-6"
                >
                  <span className="text-lg font-bold tracking-tight sm:text-xl">
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center border-2 transition',
                      ink
                        ? open
                          ? 'border-lime bg-lime text-ink'
                          : 'border-paper/30 text-paper'
                        : open
                          ? 'border-ink bg-ink text-lime'
                          : 'border-ink text-ink'
                    )}
                  >
                    {open ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className={cn(
                          'max-w-2xl pb-6 text-sm leading-relaxed sm:text-base',
                          ink ? 'text-paper/65' : 'text-ink/70'
                        )}
                      >
                        {item.body}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        {cta ? (
          <div className="lg:hidden">
            <Button variant={ink ? 'lime' : 'default'} offset asChild>
              <Link to={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
