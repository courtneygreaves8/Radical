import { Link } from 'react-router-dom'

import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { SelectPreview } from '@/components/marketing/SelectPreview'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { getLocalContent } from '@/lib/sanity/client'

export function MissionsPage() {
  const { missions } = getLocalContent()

  return (
    <>
      <PageHero
        eyebrow="Local & global"
        title="Missions"
        description="Hope Bus on Norfolk streets. Partners across India, Africa, and beyond."
        tone="lime"
      />

      <SectionIntro
        index="01"
        label="Mission"
        body="We take the gospel outside the building — supermarket streets, clubs, prisons, and partner nations. Revival in our county, and beyond."
        headline={
          <>
            Mission is a street that <Em>reflects</Em> our ongoing{' '}
            <Em>dedication</Em> to the lost — Norwich first, then the nations.
          </>
        }
        cta={{ label: 'Partner financially', href: '/give' }}
        tone="ink"
      />

      <SelectPreview
        index="02"
        label="Fields"
        headline={
          <>
            Select a field. See the <Em>work</Em>. Join the{' '}
            <Em>fire</Em>.
          </>
        }
        items={missions.map((m) => ({
          id: m.id,
          meta: m.number,
          title: m.title,
          detailTitle: m.title,
          detailBody: m.body,
          image: m.image,
          href: m.region === 'world' ? '/give' : '/visit',
        }))}
        tone="ink"
      />

      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
              (03) Next
            </p>
            <h2 className="type-display mt-3 text-3xl sm:text-4xl">
              Want to go or give?
            </h2>
            <p className="mt-3 max-w-xl text-ink/70">
              Talk to the team about trips, prayer covering, and funding partner
              projects.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="lime" offset asChild>
              <Link to="/give">Give</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/visit">Visit</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
