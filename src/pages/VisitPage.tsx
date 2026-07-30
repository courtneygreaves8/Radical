import { AccordionRail } from '@/components/marketing/AccordionRail'
import { ContactBand } from '@/components/marketing/ContactBand'
import { GatherProof } from '@/components/marketing/GatherProof'
import { MediaTabs } from '@/components/marketing/MediaTabs'
import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { PageHero } from '@/components/shared/PageHero'
import { getLocalContent } from '@/lib/sanity/client'
import { siteMeta } from '@/lib/nav'

export function VisitPage() {
  const { visit, email } = getLocalContent()

  return (
    <>
      <PageHero
        eyebrow="Find us"
        title="Come this Sunday"
        description={`${visit.day} · ${visit.time} · ${visit.venue}`}
        tone="lime"
      />

      <GatherProof
        time={visit.time}
        day={visit.day}
        venue={visit.venue}
        addressHighlight="Cowgate"
        addressLine={visit.address}
        image="/media/cowgate.jpg"
        mapsUrl={visit.mapsUrl}
      />

      <MediaTabs
        index="01"
        label="What to expect"
        eyebrow="How we find the best way forward."
        tabs={[
          {
            id: 'arrive',
            label: 'Arrive',
            title: 'Walk in expectant.',
            body: 'City Gates Centre is easy to find. Come early, grab a seat, and bring an open heart — not a spectator mindset.',
            image: '/media/stack-street.jpg',
          },
          {
            id: 'worship',
            label: 'Worship',
            title: 'Presence over performance.',
            body: 'We meet to worship God — not entertain people. If you want comfortable and predictable, this is not that.',
            image: '/media/stack-dove.jpg',
          },
          {
            id: 'word',
            label: 'Word',
            title: 'Challenged to pursue God.',
            body: 'Full Gospel preaching. Real repentance. A dare to be used of God and make a difference.',
            image: '/media/evangelism-bible.jpg',
          },
        ]}
      />

      <SectionIntro
        index="02"
        label="Location"
        body="Looking for comfortable seats and predictable meetings? This is not that. Looking to be used of God and help shape this city? We dare you to come."
        headline={
          <>
            City Gates Centre — <Em>39 Cowgate</Em>, Norwich. Come shape Sunday
            with us.
          </>
        }
        cta={{ label: 'Open in Maps', href: visit.mapsUrl }}
        tone="ink"
      />

      <ContactBand
        id="reach-out"
        email={email}
        title="Reach out"
        subject="Visit enquiry"
      />

      <section className="border-b-2 border-ink bg-paper">
        <div className="min-h-[320px] border-b-0 bg-ink sm:min-h-[420px]">
          <iframe
            title="Map to Radical Church"
            className="size-full min-h-[320px] grayscale contrast-125 sm:min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(siteMeta.visit.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          />
        </div>
      </section>

      <AccordionRail
        index="03"
        label="Practicals"
        tone="paper"
        items={[
          {
            id: 'p1',
            title: 'Parking & arrival',
            body: 'Arrive a few minutes early. City centre parking nearby — ask a greeter if you need a hand finding the door.',
          },
          {
            id: 'p2',
            title: 'Kids & family',
            body: 'Families are welcome. Ask on arrival about what is running that Sunday for children and youth.',
          },
          {
            id: 'p3',
            title: 'Accessibility',
            body: 'Email us ahead if you need access support — we will do what we can to help you gather with us.',
          },
        ]}
      />
    </>
  )
}
