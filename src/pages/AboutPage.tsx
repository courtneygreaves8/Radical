import { Link } from 'react-router-dom'

import { AboutProof } from '@/components/marketing/AboutProof'
import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { SelectPreview } from '@/components/marketing/SelectPreview'
import { ValueCards } from '@/components/marketing/ValueCards'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { peekSlideImages } from '@/lib/peekSlides'
import { getLocalContent } from '@/lib/sanity/client'

export function AboutPage() {
  const { about } = getLocalContent()

  const timeline = [
    {
      id: 't1',
      meta: '2013',
      title: 'The call',
      detailTitle: 'Called to the margins',
      detailBody:
        'A vision for prisoners, addiction, the homeless, and the overlooked — Acts-style community with hard discipleship.',
      image: peekSlideImages.marginsGrit,
    },
    {
      id: 't2',
      meta: 'Streets',
      title: 'Street witness',
      detailTitle: 'Take it outside',
      detailBody:
        'Outreach and evangelism across Norfolk — supermarket streets, clubs, and communities that need Jesus.',
      image: peekSlideImages.outreachCrew,
    },
    {
      id: 't3',
      meta: 'City',
      title: 'Norwich fire',
      detailTitle: 'Make Jesus famous here',
      detailBody:
        'God is wanting to bring revival to our county. We want to be part of a move of God in our generation and region.',
      image: peekSlideImages.bibleStreet,
    },
    {
      id: 't4',
      meta: 'Now',
      title: 'Dare to visit',
      detailTitle: 'Not comfortable — radical',
      detailBody: about.body[2] ?? about.lead,
      image: peekSlideImages.outreachCrew,
      href: '/visit',
    },
  ]

  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} tone="lime" />

      <AboutProof
        stats={[
          {
            value: '1000+',
            label: 'People helped on the streets',
          },
          {
            value: 'Ongoing',
            label: 'Funds raised for the field',
            accent: 'lime',
          },
          {
            value: '13',
            label: 'Years called to Norwich',
          },
          {
            value: '2',
            label: 'Continents we partner with',
          },
        ]}
        headline="We believe a life changed by Jesus shapes more than a meeting — it reshapes the whole street."
        body="Our team runs toward the broken with Full Gospel fire and Whole Bible grit. From street outreach to discipleship that costs something, we help people find Jesus and keep walking with Him — in Norwich and beyond."
        cta={{ label: 'Learn more', href: '/visit' }}
        image={peekSlideImages.field}
      />

      <SectionIntro
        index="01"
        label="About us"
        body={about.lead}
        headline={
          <>
            We help <Em tone="lime">shape</Em> lives and streets — called to
            the broken, the marginalised, and the{' '}
            <Em tone="ink">overlooked</Em> of Norwich.
          </>
        }
        cta={{ label: 'Dare to visit', href: '/visit' }}
        tone="lime"
      />

      <SelectPreview
        index="02"
        label="Our story"
        headline={
          <>
            Story is a street that <Em>shapes</Em> our ongoing{' '}
            <Em>dedication</Em> to helping Norwich know Jesus.
          </>
        }
        items={timeline}
        tone="ink"
      />

      <ValueCards
        index="03"
        label="DNA"
        headline="What shapes us"
        body="Called to the broken. Fired by the Spirit. Helping shape the city — for Jesus."
        cards={[
          {
            id: 'd1',
            tone: 'photo',
            tag: 'Call',
            title: 'Margins first',
            body: 'Prisoners, addiction, homeless, overlooked — that is who we run toward.',
            image: peekSlideImages.prisons,
          },
          {
            id: 'd2',
            tone: 'paper',
            tag: 'Gather',
            title: 'Presence over polish',
            body: 'We meet to worship God — not entertain people.',
            href: '/visit',
          },
          {
            id: 'd3',
            tone: 'lime',
            tag: 'Send',
            title: 'City & nations',
            body: 'Street outreach locally. Partners in India and Africa. Revival here.',
            href: '/missions',
          },
        ]}
      />

      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
            (04) Word
          </p>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink/80">
            {about.body.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </div>
          <p className="mt-8 font-mono text-sm uppercase tracking-wider text-ink/45">
            {about.signOff}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="lime" offset asChild>
              <Link to="/beliefs">What we believe</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/missions">Missions</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
