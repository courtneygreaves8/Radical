import { MapPin } from 'lucide-react'

import { HomeHero } from '@/components/marketing/HomeHero'
import { StackSlide, StickyStack } from '@/components/marketing/StackSlide'
import { urbanImages } from '@/lib/images'
import { peekSlideImages } from '@/lib/peekSlides'
import { getLocalContent } from '@/lib/sanity/client'
import { siteMeta } from '@/lib/nav'

export function HomePage() {
  const content = getLocalContent()

  return (
    <>
      <HomeHero slides={content.carousel} />

      <StickyStack tone="ink">
        <StackSlide
          id="home-about"
          index="01"
          title="About us"
          body="We help shape Norwich in Jesus’ name — Full Gospel, Whole Bible, called to the broken and the overlooked on these streets."
          detail="Helping shape the city — for Jesus"
          image={peekSlideImages.field}
          cta={{ label: 'Learn more', href: '/about' }}
          tone="paper"
        />

        <StackSlide
          index="02"
          title="Be Radical. Shape the city."
          body="Church with fire, not fluff. Presence over polish. Soft hearts, hard discipleship — helping shape Norwich for Jesus."
          detail="Full Gospel · Whole Bible · Street outreach"
          image={urbanImages.graffitiWall}
          cta={{ label: 'Our story', href: '/about' }}
          tone="ink"
          slab="crimson"
        />

        <StackSlide
          index="03"
          title="Street-level faith. Measurable hunger for Jesus."
          body="Every Sunday at 10:30 — City Gates Centre. Worship, Word, and presence. Come expectant. Shaping lives on the margins since 2013."
          detail="10:30 · Every Sunday · Since 2013"
          image={peekSlideImages.dove}
          cta={{ label: 'Plan your visit', href: '/visit' }}
          tone="lime"
        />

        <StackSlide
          index="04"
          title="Gather — worship, Word, then send."
          body="We meet God, not a show. Hard preaching. Real repentance. Then we take it outside — shaping the city on Hope Bus nights, in prisons, on the streets, and with partners overseas."
          detail="Presence over performance"
          image={peekSlideImages.busPreach}
          cta={{ label: 'See how we gather', href: '/visit' }}
          tone="paper"
        />

        <StackSlide
          index="05"
          title="Shaping Norwich. Reaching nations."
          body="Outreach that leaves the building. Discipleship that costs something. Hope Bus on Norfolk streets — and partners in India and Africa."
          detail="Hope Bus · Worldwide partners"
          image={peekSlideImages.outreachCrew}
          cta={{ label: 'See missions', href: '/missions' }}
          tone="navy"
        />

        <StackSlide
          index="06"
          title="What we refuse to water down"
          body="Worship, not entertainment. Old fashioned theology. Take it to the streets. Helping shape this city — for Jesus."
          detail="Presence · Word · Mission"
          image={peekSlideImages.bibleStreet}
          cta={{ label: 'What we believe', href: '/beliefs' }}
          tone="lime"
          slab="navy"
        />

        <StackSlide
          index="07"
          title="Radical Media"
          body="Street grit, still waters, city witness — stories and sermons that refuse soft Christianity. The Jesus Way starts here."
          detail="Podcasts · Preaches · Discipleship"
          image={peekSlideImages.jesusWay}
          cta={{ label: 'Listen in', href: '/podcasts' }}
          tone="paper"
        />

        <StackSlide
          index="08"
          title="Get involved"
          body={`Join us ${siteMeta.visit.day} at ${siteMeta.visit.time}. Ride the Hope Bus. Walk The Jesus Way. Give to outreach and orphanage care — prefer in-person when you can.`}
          detail="Visit · Outreach · Discipleship · Give"
          image={peekSlideImages.still}
          imagePosition="center center"
          cta={{ label: 'Plan your visit', href: '/visit' }}
          tone="ink"
        />

        <StackSlide
          index="09"
          title={`This Sunday · ${siteMeta.visit.time}`}
          body={`${siteMeta.visit.venue} · ${siteMeta.visit.address}. Six steps from the door to discipleship — no soft sell.`}
          detail="Show up · Worship · Hear the Word · Stay radical"
          cta={{ label: 'Get directions', href: '/visit' }}
          tone="lime"
        >
          <p className="mt-4 flex items-start gap-2 text-sm text-ink/70">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {siteMeta.visit.venue}
          </p>

          <div className="mt-6 grid gap-3 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="min-h-[220px] border-2 border-ink bg-ink sm:min-h-[280px]">
              <iframe
                title={`Map to ${siteMeta.visit.venue}`}
                className="size-full min-h-[220px] grayscale contrast-125 sm:min-h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(siteMeta.visit.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

            <div className="flex flex-col justify-between border-2 border-ink bg-paper p-5 text-ink sm:p-6">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                  First Bus · Coming soon
                </p>
                <p className="mt-3 text-lg font-bold tracking-tight">
                  Routes near City Gates
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  Live First Bus times for Cowgate will land here later. Until
                  then, plan your trip on First Bus.
                </p>
              </div>
              <a
                href="https://www.firstbus.co.uk/planning-your-journey/journey-planner"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-ink pb-1 text-sm font-bold uppercase tracking-wider transition hover:text-ink/70"
              >
                Plan with First Bus
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </StackSlide>

        <StackSlide
          index="10"
          title="Generosity fuels revival"
          body="SMS, bank transfer, child sponsorship, and the Rice Field Project — every gift fuels outreach and care for the overlooked."
          detail="Prefer in-person when you can"
          image={peekSlideImages.give}
          cta={{ label: 'Ways to give', href: '/give' }}
          tone="paper"
        />
      </StickyStack>
    </>
  )
}
