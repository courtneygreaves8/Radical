import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

import { AccordionRail } from '@/components/marketing/AccordionRail'
import { BlockMark } from '@/components/marketing/BlockMark'
import { BrutalSplit } from '@/components/marketing/BrutalSplit'
import { ExpertisePanel } from '@/components/marketing/ExpertisePanel'
import { HomeHero } from '@/components/marketing/HomeHero'
import { MediaTabs } from '@/components/marketing/MediaTabs'
import { PeekCarousel } from '@/components/marketing/PeekCarousel'
import { ProcessGrid } from '@/components/marketing/ProcessGrid'
import { ResultsBand } from '@/components/marketing/ResultsBand'
import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { SelectPreview } from '@/components/marketing/SelectPreview'
import { StatTrio } from '@/components/marketing/StatTrio'
import { ValueCards } from '@/components/marketing/ValueCards'
import { Button } from '@/components/ui/button'
import { urbanImages } from '@/lib/images'
import { peekSlideImages } from '@/lib/peekSlides'
import { getLocalContent } from '@/lib/sanity/client'
import { siteMeta } from '@/lib/nav'

export function HomePage() {
  const content = getLocalContent()

  return (
    <>
      <HomeHero slides={content.carousel} />

      <SectionIntro
        id="home-about"
        index="02"
        label="About us"
        body="Radical Church is a community of believers that simply love Jesus — Full Gospel, Whole Bible, called to the broken and the overlooked across Norwich."
        headline={
          <>
            Church is driven by a deep passion for <Em>loving Jesus</Em>, loving
            each other, and loving the <Em>lost</Em> — with fire, not fluff.
          </>
        }
        cta={{ label: 'Learn more', href: '/about' }}
        tone="ink"
      />

      <BrutalSplit
        fill="RADI"
        outline="CAL"
        subline="In Norwich"
        image={peekSlideImages.fly}
        points={[
          'Full Gospel',
          'Whole Bible',
          'Hard discipleship',
          'Street outreach',
          'Presence over show',
          'Jesus made famous',
        ]}
        cta={{ label: 'Our story', href: '/about' }}
      />

      <StatTrio
        index="01"
        label="Pulse"
        headline="Street-level faith. Measurable hunger for Jesus."
        image={urbanImages.graffitiWall}
        imageHref="/missions"
        paper={{
          value: '10:30',
          caption: 'Every Sunday',
          body: 'City Gates Centre — worship, Word, and presence. Come expectant.',
          href: '/visit',
        }}
        lime={{
          value: '2013',
          caption: 'Called to the margins',
          body: 'Prisoners, addiction, the homeless, and the overlooked — still the brief.',
          href: '/about',
        }}
      />

      <MediaTabs
        index="03"
        label="Gather"
        eyebrow="How we find the best way forward."
        tabs={[
          {
            id: 'listen',
            label: 'Worship',
            title: 'We meet God — not a show.',
            body: 'When we gather we worship in Spirit and truth. Presence over performance. Come expectant.',
            image: urbanImages.alley,
          },
          {
            id: 'word',
            label: 'Word',
            title: 'Whole Bible. Full Gospel.',
            body: 'Hard preaching. Real repentance. The cross and the blood of Jesus — not soft spirituality.',
            image: urbanImages.shaftesbury,
          },
          {
            id: 'send',
            label: 'Send',
            title: 'Then we take it outside.',
            body: 'Hope Bus, prisons, streets, and partners overseas. Faith that leaves the building.',
            image: urbanImages.shoreditch,
          },
        ]}
      />

      <ResultsBand
        index="04"
        label="Proven fruit"
        image={urbanImages.londonBus}
        stats={[
          { value: 'Hope Bus', label: 'Norfolk streets & clubs' },
          { value: 'Worldwide', label: 'India & Africa partners' },
        ]}
        panel={{
          title: 'Catalysing revival in Norwich',
          body: 'Outreach that leaves the building. Discipleship that costs something. Jesus made famous in this city.',
          href: '/missions',
          cta: 'See missions',
        }}
      />

      <ExpertisePanel
        index="05"
        label="What we do"
        headline="When streets meet Spirit — every moment crafted into radical obedience."
        seeAllHref="/missions"
        seeAllLabel="All missions"
        slides={[
          {
            id: 's1',
            category: 'Outreach',
            title: 'Hope on the streets',
            place: 'Norfolk · Hope Bus',
            image: urbanImages.soho,
            href: '/missions',
          },
          {
            id: 's2',
            category: 'Outreach',
            title: 'Shoreditch grit, Norwich call',
            place: 'City streets',
            image: urbanImages.shoreditch,
            href: '/missions',
          },
          {
            id: 's3',
            category: 'Worship',
            title: 'Presence over performance',
            place: 'Sunday gathering',
            image: urbanImages.alley,
            href: '/visit',
          },
          {
            id: 's4',
            category: 'Worship',
            title: 'Night in the presence',
            place: 'City Gates Centre',
            image: urbanImages.nightCity,
            href: '/visit',
          },
          {
            id: 's5',
            category: 'Discipleship',
            title: 'Hard-core discipleship',
            place: 'The Jesus Way',
            image: urbanImages.brickStreet,
            href: '/podcasts',
          },
          {
            id: 's6',
            category: 'Media',
            title: 'Radical Preaches',
            place: 'Radical Media',
            image: urbanImages.shaftesbury,
            href: '/podcasts',
          },
          {
            id: 's7',
            category: 'Media',
            title: 'Graffiti & gospel',
            place: 'Urban witness',
            image: urbanImages.graffitiWall,
            href: '/podcasts',
          },
        ]}
      />

      <ValueCards
        index="06"
        label="Our values"
        headline="What we refuse to water down"
        body="Full Gospel. Whole Bible. Soft hearts. Hard discipleship."
        cards={[
          {
            id: 'c1',
            tone: 'photo',
            tag: 'Presence',
            title: 'Worship, not entertainment',
            body: 'We gather to meet God — not put on a show.',
            image: urbanImages.alley,
            href: '/visit',
            icon: 'spark',
          },
          {
            id: 'c2',
            tone: 'paper',
            tag: 'Word',
            title: 'Old fashioned theology',
            body: 'Pentecostal and not ashamed. Character, fruit, and the cross.',
            href: '/beliefs',
            icon: 'asterisk6',
          },
          {
            id: 'c3',
            tone: 'lime',
            tag: 'Mission',
            title: 'Take it to the streets',
            body: 'Hope Bus, prisons, clubs, and partners overseas.',
            href: '/missions',
            icon: 'network',
          },
        ]}
      />

      <PeekCarousel
        index="07"
        label="Radical Media"
        slides={[
          {
            id: 'p1',
            title: 'Hope on the streets',
            image: peekSlideImages.streets,
            href: '/missions',
          },
          {
            id: 'p2',
            title: 'Still waters',
            image: peekSlideImages.still,
            imagePosition: 'center center',
            href: '/missions',
          },
          {
            id: 'p3',
            title: 'City witness',
            image: peekSlideImages.dock,
            href: '/podcasts',
          },
          {
            id: 'p4',
            title: 'Open field',
            image: peekSlideImages.field,
            href: '/about',
          },
          {
            id: 'p5',
            title: 'The Jesus Way',
            image: peekSlideImages.jesusWay,
            href: '/podcasts',
          },
        ]}
      />

      <SelectPreview
        index="08"
        label="Missions"
        headline={
          <>
            Mission is a street that <Em>reflects</Em> our ongoing{' '}
            <Em>dedication</Em> to the lost — locally and worldwide.
          </>
        }
        items={content.missions.map((m) => ({
          id: m.id,
          meta: m.number,
          title: m.title,
          detailTitle: m.title,
          detailBody: m.body,
          image: m.image,
          href: '/missions',
        }))}
        tone="ink"
      />

      <AccordionRail
        index="09"
        label="Get involved"
        tone="paper"
        cta={{ label: 'Plan your visit', href: '/visit' }}
        items={[
          {
            id: 'a1',
            title: 'Sunday gathering',
            body: `Join us ${siteMeta.visit.day} at ${siteMeta.visit.time}, ${siteMeta.visit.venue}. Worship, Word, and presence — come expectant.`,
          },
          {
            id: 'a2',
            title: 'Hope Bus outreach',
            body: 'Ride along for street evangelism across Norfolk — supermarket car parks, clubs, and communities that need Jesus.',
          },
          {
            id: 'a3',
            title: 'Discipleship tracks',
            body: 'Hard-core discipleship through The Jesus Way and Radical Media — not comfortable Christianity.',
          },
          {
            id: 'a4',
            title: 'Give & sponsor',
            body: 'Text to give, sponsor a child in India, or partner with the Rice Field Project. Prefer in-person when you can.',
          },
        ]}
      />

      <BlockMark
        index="10"
        metaLeft="Babe — for Radical Church"
        metaRight="Section mark"
        lines={[{ text: 'Love' }, { text: 'Jesus+' }]}
        body="Not a soft slogan — the centre of the whole house. Everything else orbits this."
      />

      <ProcessGrid
        index="11"
        label="First visit"
        tone="ink"
        headline="Six steps from the door to discipleship — no soft sell."
        steps={[
          {
            id: 'v1',
            title: 'Show up',
            body: 'City Gates Centre, 39 Cowgate. Come as you are — leave challenged.',
          },
          {
            id: 'v2',
            title: 'Worship',
            body: 'We meet God, not a stage show. Presence over performance.',
          },
          {
            id: 'v3',
            title: 'Hear the Word',
            body: 'Full Gospel. Whole Bible. Preaching that expects a response.',
          },
          {
            id: 'v4',
            title: 'Meet people',
            body: 'A family that loves Jesus, each other, and the lost — for real.',
          },
          {
            id: 'v5',
            title: 'Get stuck in',
            body: 'Outreach, prayer, discipleship — faith that works outside the walls.',
          },
          {
            id: 'v6',
            title: 'Stay radical',
            body: 'Hard discipleship. Soft hearts. Jesus made famous in Norwich.',
          },
        ]}
      />

      <section className="border-b-2 border-ink bg-lime">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
              (12) Visit
            </p>
            <h2 className="type-display mt-3 text-3xl sm:text-5xl">
              This Sunday · {siteMeta.visit.time}
            </h2>
            <p className="mt-3 flex items-start gap-2 text-base text-ink/80">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {siteMeta.visit.venue} · {siteMeta.visit.address}
            </p>
          </div>
          <Button variant="default" size="lg" offset asChild>
            <Link to="/visit">Get directions</Link>
          </Button>
        </div>
      </section>

      <SectionIntro
        index="13"
        label="Give"
        body="Prefer in-person when you can. Or partner by text, bank transfer, or child sponsorship — every gift fuels outreach and care."
        headline={
          <>
            Generosity fuels <Em tone="ink">revival</Em> — SMS, sponsorship, and
            the Rice Field Project.
          </>
        }
        cta={{ label: 'Ways to give', href: '/give' }}
        tone="lime"
      />
    </>
  )
}
