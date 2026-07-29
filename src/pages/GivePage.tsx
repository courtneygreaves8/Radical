import { AccordionRail } from '@/components/marketing/AccordionRail'
import { MetricBento } from '@/components/marketing/MetricBento'
import { ProcessGrid } from '@/components/marketing/ProcessGrid'
import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { PageHero } from '@/components/shared/PageHero'
import { urbanImages } from '@/lib/images'
import { getLocalContent } from '@/lib/sanity/client'

export function GivePage() {
  const { giveOptions, charityNumber, email } = getLocalContent()

  return (
    <>
      <PageHero
        eyebrow="Generosity"
        title="Ways to give"
        description="Prefer in-person when you can. Or partner by text, bank, or sponsorship."
        tone="ink"
      />

      <MetricBento
        cards={[
          {
            id: 'g1',
            eyebrow: 'SMS',
            value: '70085',
            detail: 'RADICALOFFERING · RADICALTITHES · SAVIOURJESUS',
            tone: 'lime',
          },
          {
            id: 'g2',
            eyebrow: 'Sponsor',
            value: '£30/mo',
            detail: 'Orphanage care in India — no admin fees taken from your gift.',
            tone: 'photo',
            image: urbanImages.mural,
          },
        ]}
      />

      <SectionIntro
        index="01"
        label="Partner"
        body="Every gift fuels outreach, care, and long-term mission — from Norwich streets to partners overseas."
        headline={
          <>
            Generosity is <Em>worship</Em> with open hands — not a tip for a
            good Sunday.
          </>
        }
        cta={{ label: 'Email giving questions', href: `mailto:${email}` }}
        tone="paper"
      />

      <AccordionRail
        index="02"
        label="Give options"
        tone="paper"
        items={giveOptions.map((opt) => ({
          id: opt.id,
          title: opt.title,
          body: [opt.detail, opt.hint].filter(Boolean).join(' '),
        }))}
      />

      <ProcessGrid
        index="03"
        label="How gifts move"
        tone="lime"
        headline="From your phone to the field — clear steps, no fluff."
        steps={[
          {
            id: 's1',
            title: 'Choose a lane',
            body: 'Offering, tithes, sponsorship, or Rice Field — pick what God puts on your heart.',
          },
          {
            id: 's2',
            title: 'Send it',
            body: 'Text 70085, transfer to the orphanage account, or give in person on Sunday.',
          },
          {
            id: 's3',
            title: 'We steward it',
            body: 'Local outreach, overseas partners, and projects that build long-term dignity.',
          },
          {
            id: 's4',
            title: 'Lives change',
            body: 'Hope Bus nights, orphanage care, fields and irrigation — Jesus made famous.',
          },
          {
            id: 's5',
            title: 'Stay in touch',
            body: `Questions? Email ${email}. Charity number ${charityNumber}.`,
          },
          {
            id: 's6',
            title: 'Keep going',
            body: 'Generosity is a rhythm. Prefer in-person when you can — and keep fueling revival.',
          },
        ]}
      />

      <div className="border-b-2 border-ink bg-paper px-5 py-10 sm:px-8">
        <p className="mx-auto max-w-7xl font-mono text-xs text-ink/50">
          Charity number {charityNumber} · Questions?{' '}
          <a href={`mailto:${email}`} className="text-ink underline">
            {email}
          </a>
        </p>
      </div>
    </>
  )
}
