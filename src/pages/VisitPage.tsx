import { AccordionRail } from '@/components/marketing/AccordionRail'
import { MediaTabs } from '@/components/marketing/MediaTabs'
import { MetricBento } from '@/components/marketing/MetricBento'
import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { urbanImages } from '@/lib/images'
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

      <MetricBento
        cards={[
          {
            id: 'v1',
            eyebrow: 'Gather',
            value: visit.time,
            detail: `${visit.day} · ${visit.venue}`,
            tone: 'lime',
          },
          {
            id: 'v2',
            eyebrow: 'Address',
            value: 'Cowgate',
            detail: visit.address,
            tone: 'photo',
            image: urbanImages.brickStreet,
          },
        ]}
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
            image: urbanImages.crossing,
          },
          {
            id: 'worship',
            label: 'Worship',
            title: 'Presence over performance.',
            body: 'We meet to worship God — not entertain people. If you want comfortable and predictable, this is not that.',
            image: urbanImages.alley,
          },
          {
            id: 'word',
            label: 'Word',
            title: 'Challenged to pursue God.',
            body: 'Full Gospel preaching. Real repentance. A dare to be used of God and make a difference.',
            image: urbanImages.shaftesbury,
          },
        ]}
      />

      <SectionIntro
        index="02"
        label="Location"
        body="Looking for comfortable seats and predictable meetings? This is not that. Looking to be used of God and make a difference? We dare you to come."
        headline={
          <>
            City Gates Centre — <Em>39 Cowgate</Em>, Norwich. Maps below. Heart
            open.
          </>
        }
        cta={{ label: 'Open in Maps', href: visit.mapsUrl }}
        tone="ink"
      />

      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2">
          <form
            className="space-y-4 border-2 border-ink bg-mute p-6"
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              const name = String(fd.get('name') || '')
              const message = String(fd.get('message') || '')
              window.location.href = `mailto:${email}?subject=Visit%20enquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`
            }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em]">
              Say hello
            </p>
            <label className="block">
              <span className="sr-only">Name</span>
              <input
                name="name"
                required
                placeholder="Your name"
                className="h-12 w-full border-2 border-ink bg-paper px-4 font-sans outline-none focus:ring-2 focus:ring-lime"
              />
            </label>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Planning a visit? Ask us anything."
                className="w-full border-2 border-ink bg-paper px-4 py-3 font-sans outline-none focus:ring-2 focus:ring-lime"
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" variant="lime" offset>
                Send message
              </Button>
              <Button variant="outline" asChild>
                <a href={`mailto:${email}`}>Email us</a>
              </Button>
            </div>
          </form>

          <div className="min-h-[320px] border-2 border-ink bg-ink">
            <iframe
              title="Map to Radical Church"
              className="size-full min-h-[320px] grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(siteMeta.visit.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
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
