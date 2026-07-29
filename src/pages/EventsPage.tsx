import { Link } from 'react-router-dom'

import { AccordionRail } from '@/components/marketing/AccordionRail'
import { MetricBento } from '@/components/marketing/MetricBento'
import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { urbanImages } from '@/lib/images'
import { getLocalContent } from '@/lib/sanity/client'

export function EventsPage() {
  const { events } = getLocalContent()

  return (
    <>
      <PageHero
        eyebrow="What's happening"
        title="Public events"
        description="Some gatherings are for the church family. Here's what's open to everyone."
        tone="paper"
      />

      <MetricBento
        cards={[
          {
            id: 'e1',
            eyebrow: 'Every Sunday',
            value: '10:30',
            detail: 'City Gates Centre · open to all',
            tone: 'lime',
            href: '/visit',
          },
          {
            id: 'e2',
            eyebrow: 'Calendar',
            value: events.length ? `${events.length} live` : 'Come anyway',
            detail: 'Public listings update as we announce.',
            tone: 'photo',
            image: urbanImages.nightCity,
            href: '/visit',
          },
        ]}
      />

      <SectionIntro
        index="01"
        label="Gatherings"
        body="Some nights are for the church family. The list below is what we make public — and Sunday is always a dare to come."
        headline={
          <>
            Events are a doorway into <Em>presence</Em> — not a programme to
            consume.
          </>
        }
        cta={{ label: 'Visit this Sunday', href: '/visit' }}
        tone="ink"
      />

      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          {events.length === 0 ? (
            <div className="border-2 border-dashed border-ink/40 bg-mute p-10 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
                Empty state
              </p>
              <p className="mt-4 text-lg font-bold">
                No public events listed yet — come Sunday anyway.
              </p>
              <Button variant="lime" className="mt-6" offset asChild>
                <Link to="/visit">Visit this Sunday</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y-2 divide-ink border-2 border-ink">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="grid gap-4 bg-paper p-6 transition hover:bg-lime sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-ink/50">
                      {event.date}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight">
                      {event.title}
                    </h2>
                    <p className="mt-1 text-sm text-ink/70">{event.place}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/80">
                      {event.blurb}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/visit">Plan visit</Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <AccordionRail
        index="02"
        label="Also happening"
        tone="ink"
        cta={{ label: 'Get directions', href: '/visit' }}
        items={[
          {
            id: 'h1',
            title: 'Hope Bus nights',
            body: 'Street outreach across Norfolk — follow Radical Media and Sunday announcements for the next run.',
          },
          {
            id: 'h2',
            title: 'Prayer & fasting',
            body: 'We gather to pursue God with hunger. Ask the team when the next prayer rhythm is running.',
          },
          {
            id: 'h3',
            title: 'Radical Media drops',
            body: 'Preaches, worship, and discipleship tracks online — catch up or share with someone who needs it.',
          },
        ]}
      />
    </>
  )
}
