import { Button } from '@/components/ui/button'
import { siteMeta } from '@/lib/nav'
import { cn } from '@/lib/utils'

type ContactBandProps = {
  email: string
  title?: string
  className?: string
  id?: string
  /** mailto subject prefix */
  subject?: string
}

/**
 * Oversized “Reach out” band — underline fields, ink ground, Radical edges.
 */
export function ContactBand({
  email,
  title = 'Reach out',
  className,
  id,
  subject = 'Visit enquiry',
}: ContactBandProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden border-b border-ink/10 bg-ink text-paper',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-16 sm:px-8 sm:pt-16 sm:pb-20">
        <h2 className="type-display text-[clamp(3.5rem,16vw,10rem)] leading-[0.85] tracking-tight text-balance">
          {title}
        </h2>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-24">
          <ul className="space-y-8 text-base text-paper/70 sm:text-lg">
            <li>
              <a
                href={`mailto:${email}`}
                className="transition hover:text-lime"
              >
                {email}
              </a>
            </li>
            <li>
              <p>
                {siteMeta.visit.day} · {siteMeta.visit.time}
              </p>
              <p className="mt-1 text-paper/45">Gathering</p>
            </li>
            <li>
              <p>{siteMeta.visit.venue}</p>
              <p className="mt-1">{siteMeta.visit.address}</p>
            </li>
          </ul>

          <form
            className="space-y-10"
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              const first = String(fd.get('firstName') || '')
              const last = String(fd.get('lastName') || '')
              const name = [first, last].filter(Boolean).join(' ')
              const from = String(fd.get('email') || '')
              const message = String(fd.get('message') || '')
              const body = [
                message,
                '',
                name ? `— ${name}` : '',
                from ? from : '',
              ]
                .filter(Boolean)
                .join('\n')
              window.location.href = `mailto:${email}?subject=${encodeURIComponent(`${subject} from ${name || 'guest'}`)}&body=${encodeURIComponent(body)}`
            }}
          >
            <fieldset className="space-y-4">
              <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
                Name (required)
              </legend>
              <div className="grid gap-6 sm:grid-cols-2">
                <UnderlineField
                  name="firstName"
                  label="First Name"
                  required
                />
                <UnderlineField name="lastName" label="Last Name" required />
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
                Email (required)
              </legend>
              <UnderlineField
                name="email"
                type="email"
                label="Email"
                required
              />
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
                Message (required)
              </legend>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder=" "
                  className="w-full resize-none border-0 border-b-2 border-paper/35 bg-transparent px-0 py-2 font-sans text-base text-paper outline-none transition placeholder:text-paper/30 focus:border-lime"
                />
              </label>
            </fieldset>

            <Button type="submit" variant="paper" offset size="lg">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

function UnderlineField({
  name,
  label,
  type = 'text',
  required,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={label}
        className="h-11 w-full border-0 border-b-2 border-paper/35 bg-transparent px-0 font-sans text-base text-paper outline-none transition placeholder:text-paper/35 focus:border-lime"
      />
    </label>
  )
}
