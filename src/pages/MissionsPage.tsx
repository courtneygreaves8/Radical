import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { FilterRail } from '@/components/marketing/FilterRail'
import { PeekCarousel } from '@/components/marketing/PeekCarousel'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { getLocalContent } from '@/lib/sanity/client'

const missionGroups = [
  { id: 'active', label: 'Fields active' },
  { id: 'pray', label: 'Pray & partner' },
] as const

const missionFilters = [
  { id: 'all', label: 'All' },
  { id: 'uk', label: 'Local Norfolk' },
  { id: 'city', label: 'City & prisons' },
  { id: 'world', label: 'India & Africa' },
] as const

export function MissionsPage() {
  const { missions } = getLocalContent()
  const [groupId, setGroupId] = useState('active')
  const [filterId, setFilterId] = useState('all')

  const filtered = useMemo(() => {
    switch (filterId) {
      case 'uk':
        return missions.filter((m) => m.region === 'uk')
      case 'world':
        return missions.filter((m) => m.region === 'world')
      case 'city':
        return missions.filter((m) => m.id === 'm2')
      default:
        return missions
    }
  }, [filterId, missions])

  const peekSlides = filtered.map((m) => ({
    id: m.id,
    title: m.title,
    image: m.image,
    href: m.region === 'world' || groupId === 'pray' ? '/give' : '/visit',
  }))

  return (
    <>
      <PageHero
        eyebrow="Local & global"
        title="Missions"
        description="Street outreach across Norfolk. Shaping Norwich locally — partners across India, Africa, and beyond."
        tone="paper"
        mark="star12"
      />

      <SectionIntro
        index="01"
        label="Mission"
        body="We take the gospel outside the building — supermarket streets, clubs, prisons, and partner nations. Shaping our city first, then the nations."
        headline={
          <>
            Mission <Em>shapes</Em> a street before it shapes a
            nation — Norwich first, then the lost beyond.
          </>
        }
        cta={{ label: 'Partner financially', href: '/give' }}
        tone="ink"
      />

      <div className="relative border-b border-ink/10">
        <FilterRail
          groups={[...missionGroups]}
          activeGroupId={groupId}
          onGroupChange={setGroupId}
          filters={[...missionFilters]}
          activeId={filterId}
          onChange={setFilterId}
          hint="Swipe or scroll to navigate"
          tone="paper"
          sticky={false}
          className="border-t-0 border-b-2"
        />

        {peekSlides.length > 0 ? (
          <PeekCarousel
            key={filterId}
            index="02"
            label="Fields"
            slides={peekSlides}
            className="border-b-0"
          />
        ) : (
          <section className="bg-paper px-5 py-16 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
              (02) Fields · nothing in this filter
            </p>
          </section>
        )}
      </div>

      <section className="border-b border-ink/10 bg-paper">
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
              projects. Use the filters above to find a field.
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
