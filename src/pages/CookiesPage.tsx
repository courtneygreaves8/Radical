import { Link } from 'react-router-dom'

import { Em, SectionIntro } from '@/components/marketing/SectionIntro'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { useCookieConsent } from '@/contexts/CookieConsentContext'
import { cookieCategories } from '@/lib/cookies/consent'
import { siteMeta } from '@/lib/nav'

export function CookiesPage() {
  const { reopen, consent } = useCookieConsent()

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookies"
        description="How Radical Church uses cookies on this site — clear categories, your choice, UK PECR / GDPR minded."
        tone="paper"
        mark="rings"
      />

      <SectionIntro
        index="01"
        label="Your choice"
        body="Necessary cookies keep sign-in and this preference working. Anything optional stays off until you say yes."
        headline={
          <>
            Soft hearts on privacy. Hard edges on <Em tone="ink">consent</Em>.
          </>
        }
        cta={{ label: 'Email questions', href: `mailto:${siteMeta.email}` }}
        tone="lime"
      />

      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
            (02) Categories
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {cookieCategories.map((cat) => (
              <li
                key={cat.id}
                className="flex flex-col border-2 border-ink bg-mute p-5 sm:p-6"
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                  {cat.label}
                  {cat.locked ? ' · Required' : ' · Optional'}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {cat.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 sm:flex-row sm:items-end sm:justify-between sm:py-16">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/45">
              (03) Manage
            </p>
            <h2 className="type-display mt-3 text-3xl sm:text-4xl">
              Change your mind
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/65 sm:text-base">
              {consent
                ? `Last saved ${new Date(consent.updatedAt).toLocaleDateString('en-GB')} · Preferences ${consent.preferences ? 'on' : 'off'} · Analytics ${consent.analytics ? 'on' : 'off'}.`
                : 'You have not saved a choice yet — the notice stays up until you do.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="lime" offset type="button" onClick={reopen}>
              Open cookie settings
            </Button>
            <Button variant="paper" offset asChild>
              <Link to="/">Back home</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
            (04) Detail
          </p>
          <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-ink/75">
            <p>
              Charity {siteMeta.charityNumber}. Contact{' '}
              <a
                href={`mailto:${siteMeta.email}`}
                className="font-medium text-ink underline underline-offset-2"
              >
                {siteMeta.email}
              </a>{' '}
              for privacy questions.
            </p>
            <p>
              We do not sell your data. Analytics scripts (if enabled later) will
              only load after you opt in. Essential storage includes account
              session keys on this device.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
