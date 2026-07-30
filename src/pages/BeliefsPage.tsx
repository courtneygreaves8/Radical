import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { ProcessGrid } from '@/components/marketing/ProcessGrid'
import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { getLocalContent } from '@/lib/sanity/client'
import { cn } from '@/lib/utils'

export function BeliefsPage() {
  const { beliefs } = getLocalContent()
  const groups = useMemo(
    () => [...new Set(beliefs.map((b) => b.group))],
    [beliefs]
  )
  const [group, setGroup] = useState(groups[0] ?? '')
  const items = beliefs.filter((b) => b.group === group)
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const active = items.find((b) => b.id === activeId) ?? items[0]

  function selectGroup(next: string) {
    setGroup(next)
    const first = beliefs.find((b) => b.group === next)
    if (first) setActiveId(first.id)
  }

  return (
    <>
      <PageHero
        eyebrow="Doctrine"
        title="What we believe"
        description="Old fashioned theology. Soft hearts. Helping shape this city — for Jesus."
        tone="ink"
      />

      <SectionIntro
        index="01"
        label="Conviction"
        body="Just for the record. Pentecostal and not ashamed. Character and fruit. Belief that shapes how we live Norwich for Jesus."
        headline={
          <>
            Belief is a foundation that <Em tone="ink">shapes</Em> under
            pressure — Word, Spirit, and <Em tone="crimson">holiness</Em>.
          </>
        }
        cta={{ label: 'Visit this Sunday', href: '/visit' }}
        tone="lime"
        mark="cross"
        markAnchor="bleed-left"
      />

      <ProcessGrid
        index="02"
        label="Pillars"
        tone="paper"
        mark="rings"
        markAnchor="bleed-right"
        headline="Six convictions that hold the house — old fashioned, Spirit-filled, unashamed."
        steps={beliefs.map((b, i) => ({
          id: b.id,
          title: b.title,
          body: b.body,
          mark: (
            ['cross', 'asterisk6', 'rings', 'spark', 'sunburst', 'star12'] as const
          )[i % 6],
        }))}
      />

      <section className="border-b-2 border-ink bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/45">
              (03) Deep dive
            </p>
            <h2 className="max-w-2xl text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-right">
              Select a pillar. Read the <Em tone="flame">fire</Em>. Live the{' '}
              <Em>Word</Em>.
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-b-2 border-paper/15 pb-6">
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => selectGroup(g)}
                className={cn(
                  'border-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition',
                  g === group
                    ? 'border-lime bg-lime text-ink'
                    : 'border-paper/25 text-paper/50 hover:border-paper/50 hover:text-paper'
                )}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <ul className="divide-y-2 divide-paper/15 border-y-2 border-paper/15">
              {items.map((item, i) => {
                const selected = item.id === active?.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        'flex w-full items-center gap-4 px-3 py-5 text-left transition sm:px-4',
                        selected
                          ? 'bg-lime text-ink'
                          : 'text-paper/55 hover:bg-paper/5 hover:text-paper'
                      )}
                    >
                      <span className="w-10 shrink-0 font-mono text-sm font-bold tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-sm font-bold sm:text-base">
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center border-2',
                          selected
                            ? 'border-ink bg-ink text-lime'
                            : 'border-paper/25'
                        )}
                      >
                        <ArrowUpRight className="size-4" />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <AnimatePresence mode="wait">
              {active ? (
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="border-2 border-lime bg-ink p-6 sm:p-8"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">
                    {active.group}
                  </p>
                  <h3 className="type-display mt-4 text-2xl sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-paper/70 sm:text-base">
                    {active.body}
                  </p>
                </motion.article>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="mt-12">
            <Button variant="lime" offset asChild>
              <Link to="/visit">Come see it lived</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
