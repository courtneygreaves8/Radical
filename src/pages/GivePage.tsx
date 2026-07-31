import { AccordionRail } from '@/components/marketing/AccordionRail'
import { GiveWays } from '@/components/marketing/GiveWays'
import { ProcessGrid } from '@/components/marketing/ProcessGrid'
import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { getLocalContent } from '@/lib/sanity/client'

export function GivePage() {
  const { giveOptions, charityNumber, email } = getLocalContent()

  return (
    <>
      <GiveWays charityNumber={charityNumber} email={email} />

      <SectionIntro
        index="02"
        label="Partner"
        body="Every gift fuels outreach, care, and long-term mission — from Norwich streets to partners overseas."
        headline={
          <>
            Generosity <Em>shapes</Em> the work — open hands for a
            city and nations that need Jesus.
          </>
        }
        cta={{ label: 'Email giving questions', href: `mailto:${email}` }}
        tone="ink"
      />

      <AccordionRail
        index="03"
        label="Give options"
        tone="paper"
        items={giveOptions.map((opt) => ({
          id: opt.id,
          title: opt.title,
          body: [opt.detail, opt.hint].filter(Boolean).join(' '),
        }))}
      />

      <ProcessGrid
        index="04"
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
            body: 'Street outreach, orphanage care, fields and irrigation — Jesus made famous.',
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
          Charity number {charityNumber} · England & Wales · Questions?{' '}
          <a href={`mailto:${email}`} className="text-ink underline">
            {email}
          </a>
        </p>
      </div>
    </>
  )
}
