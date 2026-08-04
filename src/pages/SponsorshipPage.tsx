import { Link } from 'react-router-dom'
import { ArrowUpRight, HandCoins } from 'lucide-react'

import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { ProcessGrid } from '@/components/marketing/ProcessGrid'
import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { AppImage } from '@/components/shared/AppImage'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { peekSlideImages } from '@/lib/peekSlides'
import { siteMeta } from '@/lib/nav'
import { cn } from '@/lib/utils'

const IMPACT = [
  {
    id: 'care',
    value: '£30',
    label: 'Per month',
    detail: 'Orphanage care in India — food, shelter, schooling, and love.',
  },
  {
    id: 'fees',
    value: '0%',
    label: 'Admin fees',
    detail: 'No admin fees taken from your gift. What you give goes to care.',
  },
  {
    id: 'field',
    value: 'Long',
    label: 'Term dignity',
    detail: 'Paired with Rice Field irrigation for lasting self-sufficiency.',
  },
] as const

export function SponsorshipPage() {
  const email = siteMeta.email
  const mailHref = `mailto:${email}?subject=${encodeURIComponent('Child sponsorship enquiry')}`

  return (
    <>
      <PageHero
        eyebrow="Partner · India"
        title="Sponsor a child"
        description="Around £30 a month. No admin fees. Helping shape a life — for Jesus."
        tone="lime"
        mark="cross"
      />

      {/* Hero proof — photo + loud £30 */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-ink text-paper">
        <div className="grid lg:grid-cols-2">
          <OffsetBlock offset="lime" className="m-5 sm:m-8 lg:m-10">
            <div className="photo-grain relative aspect-[4/5] overflow-hidden border-2 border-ink sm:aspect-[5/6] lg:aspect-auto lg:min-h-[520px]">
              <AppImage
                src={peekSlideImages.give}
                alt=""
                className="absolute inset-0 size-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          </OffsetBlock>

          <div className="relative flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <GeoIcon
              name="rings"
              className="pointer-events-none absolute -right-10 top-1/2 size-[28rem] -translate-y-1/2 text-lime/[0.06]"
            />
            <p className="relative z-10 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-paper/45">
              (01) The ask
            </p>
            <p className="relative z-10 type-display mt-5 text-[clamp(4rem,12vw,7.5rem)] leading-[0.88] text-lime">
              £30
              <span className="text-[0.45em] text-paper">/mo</span>
            </p>
            <p className="relative z-10 mt-6 max-w-md text-base leading-relaxed text-paper/65 sm:text-lg">
              Sponsor a child through Radical Orphanage care in India. Your
              monthly gift helps cover what a child needs — and none of it is
              skimmed for admin.
            </p>
            <div className="relative z-10 mt-8 flex flex-wrap gap-3">
              <Button variant="lime" size="lg" offset asChild>
                <a href={mailHref}>
                  <HandCoins className="size-4" />
                  Start sponsoring
                </a>
              </Button>
              <Button
                variant="paper"
                size="lg"
                className="border-2 border-paper bg-transparent text-paper hover:bg-paper hover:text-ink"
                asChild
              >
                <Link to="/give">
                  All ways to give
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionIntro
        index="02"
        label="Why it matters"
        body="Sponsorship is not charity theatre. It is long obedience in the same direction — a child known, fed, taught, and pointed to Jesus."
        headline={
          <>
            Generosity that <Em tone="ink">shapes</Em> a childhood — not a
            tip, a covenant.
          </>
        }
        cta={{ label: 'Email the team', href: mailHref }}
        tone="lime"
        mark="asterisk6"
        markAnchor="bleed-left"
      />

      {/* Impact strip */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 flex w-[min(90vw,36rem)] items-center overflow-hidden"
        >
          <GeoIcon
            name="star12"
            className="size-[min(90vw,36rem)] shrink-0 translate-x-1/2 text-ink/[0.06]"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
            (03) What your gift holds
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {IMPACT.map((item, i) => (
              <li key={item.id}>
                <OffsetBlock
                  offset={i === 1 ? 'lime' : i === 2 ? 'ink' : 'navy'}
                  revealOnHover
                >
                  <div
                    className={cn(
                      'flex min-h-[220px] flex-col border-2 border-ink p-6 sm:p-7',
                      i === 1 ? 'bg-ink text-paper' : 'bg-paper text-ink'
                    )}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">
                      {String(i + 1).padStart(2, '0')} · {item.label}
                    </p>
                    <p
                      className={cn(
                        'type-display mt-4 text-5xl leading-none sm:text-6xl',
                        i === 1 ? 'text-lime' : 'text-ink'
                      )}
                    >
                      {item.value}
                    </p>
                    <p
                      className={cn(
                        'mt-4 text-sm leading-relaxed',
                        i === 1 ? 'text-paper/65' : 'text-ink/65'
                      )}
                    >
                      {item.detail}
                    </p>
                  </div>
                </OffsetBlock>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessGrid
        index="04"
        label="How it works"
        tone="ink"
        mark="rings"
        markAnchor="bleed-right"
        headline="Four clear steps — from your yes to a child held in care."
        steps={[
          {
            id: 's1',
            title: 'Decide to sponsor',
            body: 'Around £30 a month. Pray it through. Commit for the long haul if you can.',
            mark: 'cross',
          },
          {
            id: 's2',
            title: 'Email the team',
            body: `Write ${email} with subject “Child sponsorship” — we’ll walk you through next steps.`,
            mark: 'spark',
          },
          {
            id: 's3',
            title: 'Set up your gift',
            body: 'We’ll confirm how your monthly gift lands with Radical Orphanage care — no admin skim.',
            mark: 'asterisk6',
          },
          {
            id: 's4',
            title: 'Stay in the story',
            body: 'Sponsorship is partnership. Ask for updates. Keep praying. Keep giving.',
            mark: 'sunburst',
          },
          {
            id: 's5',
            title: 'Add the field',
            body: 'Want land and irrigation too? The Rice Field Project runs beside orphanage care.',
            mark: 'rings',
          },
          {
            id: 's6',
            title: 'Shape nations',
            body: 'Norwich first — then the nations. Your open hands help write that story.',
            mark: 'star12',
          },
        ]}
      />

      {/* Closing CTA band */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-lime text-lime-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 flex w-[min(90vw,34rem)] items-center overflow-hidden"
        >
          <GeoIcon
            name="cross"
            className="size-[min(90vw,34rem)] shrink-0 -translate-x-1/2 text-ink/[0.08]"
          />
        </div>
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-ink/50">
              (05) Ready
            </p>
            <h2 className="type-display mt-4 text-4xl leading-[0.92] sm:text-5xl lg:text-6xl">
              A child is waiting on a yes.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">
              Charity {siteMeta.charityNumber}. Prefer in-person when you can —
              or start the sponsorship conversation today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="default" size="lg" offset asChild>
              <a href={mailHref}>
                Email to sponsor
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/missions">See missions</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
