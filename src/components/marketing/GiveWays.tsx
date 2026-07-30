import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, HandCoins, MessageSquare } from 'lucide-react'

import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

type GiveWaysProps = {
  charityNumber: string
  email: string
  className?: string
}

const keywords = ['RADICALOFFERING', 'RADICALTITHES', 'SAVIOURJESUS'] as const

/** Honest trust marks — matches SMS / bank / charity only (no card processor). */
function TrustMarks({ charityNumber }: { charityNumber: string }) {
  const items = [
    {
      id: 'charity',
      label: 'Registered charity',
      detail: charityNumber,
      mark: (
        <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
          <rect
            x="1"
            y="1"
            width="38"
            height="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 22 L18 28 L28 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
          />
        </svg>
      ),
    },
    {
      id: 'sms',
      label: 'UK SMS shortcode',
      detail: '70085',
      mark: (
        <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
          <rect
            x="1"
            y="1"
            width="38"
            height="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="9"
            y="12"
            width="22"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M14 30h12" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'bank',
      label: 'Faster Payments',
      detail: 'UK bank transfer',
      mark: (
        <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
          <rect
            x="1"
            y="1"
            width="38"
            height="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 26h24M10 26V16l10-6 10 6v10M16 26v-6h8v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
        </svg>
      ),
    },
  ]

  return (
    <ul className="mt-10 grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-3 border-2 border-lime bg-ink p-3 text-paper"
        >
          <span className="text-lime">{item.mark}</span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/55">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-bold tracking-tight text-paper">
              {item.detail}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/**
 * Editorial give band — reassurance + copy left, stacked lanes right.
 * Only surfaces methods already published (SMS, bank, sponsorship).
 */
export function GiveWays({ charityNumber, email, className }: GiveWaysProps) {
  return (
    <section
      className={cn('relative border-b-2 border-ink overflow-hidden', className)}
    >
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        {/* Copy + trust */}
        <div className="relative overflow-hidden border-b-2 border-ink bg-ink text-paper lg:border-b-0 lg:border-r-2">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 flex w-[min(90vw,34rem)] items-center overflow-hidden"
          >
            <GeoIcon
              name="star12"
              className="size-[min(90vw,34rem)] shrink-0 translate-x-[40%] text-lime/[0.08]"
            />
          </div>

          <div className="relative z-10 flex h-full flex-col px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-paper/45">
              Generosity
            </p>
            <h1 className="type-display mt-5 max-w-[12ch] text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.92] tracking-tight">
              Ways to give
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/65 sm:text-lg">
              Prefer in-person when you can. Partner by secure UK text, Faster
              Payments, or orphanage sponsorship — every gift helps shape
              Norwich and the nations for Jesus, stewarded by a registered
              charity.
            </p>

            <blockquote className="mt-8 max-w-md border-l-2 border-lime pl-4">
              <p className="text-base font-medium leading-snug text-paper sm:text-lg">
                “Each of you should give what you have decided in your heart to
                give, not reluctantly or under compulsion, for God loves a
                cheerful giver.”
              </p>
              <footer className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
                2 Corinthians 9:7
              </footer>
            </blockquote>

            <TrustMarks charityNumber={charityNumber} />

            <p className="mt-auto pt-12 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">
              Charity {charityNumber}
              <span className="mx-2 text-paper/20">·</span>
              <a
                href={`mailto:${email}`}
                className="text-lime transition hover:underline"
              >
                Questions
              </a>
            </p>
          </div>
        </div>

        {/* Stacked lanes — extra gap so hover offset slabs don't collide */}
        <div className="flex flex-col gap-7 bg-mute px-5 py-10 sm:gap-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
            (01) Choose a lane
          </p>

          {/* SMS */}
          <OffsetBlock offset="paper" revealOnHover>
            <div className="relative overflow-hidden border-2 border-ink bg-lime p-5 text-lime-foreground sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink/55">
                    <MessageSquare className="size-3.5" />
                    Text to give
                  </p>
                  <p className="type-display mt-3 text-5xl leading-none sm:text-6xl">
                    70085
                  </p>
                </div>
                <p className="max-w-[10rem] text-right font-mono text-[10px] uppercase leading-relaxed tracking-wider text-ink/50">
                  Keyword + amount
                  <br />
                  e.g. RADICALOFFERING 10
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {keywords.map((k) => (
                  <span
                    key={k}
                    className="border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </OffsetBlock>

          {/* Bank */}
          <OffsetBlock offset="lime" revealOnHover>
            <div className="relative overflow-hidden border-2 border-ink bg-ink p-5 text-paper sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper/45">
                    <Building2 className="size-3.5 text-lime" />
                    Rice Field Project
                  </p>
                  <p className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                    Bank transfer
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/60">
                    Radical Orphanage · fields & irrigation for long-term
                    self-sufficiency.
                  </p>
                </div>
              </div>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="border border-paper/20 bg-paper/[0.04] p-3">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/40">
                    Sort code
                  </dt>
                  <dd className="mt-1 font-mono text-lg font-bold tracking-wider text-lime">
                    20-45-45
                  </dd>
                </div>
                <div className="border border-paper/20 bg-paper/[0.04] p-3">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/40">
                    Account
                  </dt>
                  <dd className="mt-1 font-mono text-lg font-bold tracking-wider text-lime">
                    13237680
                  </dd>
                </div>
              </dl>
            </div>
          </OffsetBlock>

          {/* Sponsor */}
          <OffsetBlock offset="crimson" revealOnHover>
            <Link
              to="/sponsorship"
              className="relative block overflow-hidden border-2 border-ink bg-paper p-5 text-ink transition sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink/45">
                    <HandCoins className="size-3.5" />
                    Sponsor a child
                  </p>
                  <p className="type-display mt-3 text-4xl leading-none sm:text-5xl">
                    £30<span className="text-2xl sm:text-3xl">/mo</span>
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/65">
                    Orphanage care in India — no admin fees taken from your
                    gift.
                  </p>
                </div>
                <span className="flex size-12 shrink-0 items-center justify-center border-2 border-ink bg-crimson text-lime">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </Link>
          </OffsetBlock>

          <p className="pt-1 font-mono text-[10px] leading-relaxed uppercase tracking-[0.14em] text-ink/40">
            No card checkout on this page · Give in person at City Gates · Texts
            charged by your network via shortcode 70085
          </p>
        </div>
      </div>
    </section>
  )
}
