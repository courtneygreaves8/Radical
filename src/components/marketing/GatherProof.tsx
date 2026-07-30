import { SplitProof } from '@/components/marketing/SplitProof'

type GatherProofProps = {
  time: string
  day: string
  venue: string
  addressLine: string
  addressHighlight: string
  image: string
  mapsUrl?: string
  className?: string
}

/** Visit-specific twin proof — shared SplitProof grid. */
export function GatherProof({
  time,
  day,
  venue,
  addressLine,
  addressHighlight,
  image,
  mapsUrl,
  className,
}: GatherProofProps) {
  return (
    <SplitProof
      className={className}
      left={{
        eyebrow: 'Gather',
        value: time,
        detail: `${day} · ${venue}`,
        cta: { label: 'Plan your visit', href: '/visit#reach-out' },
        mark: 'asterisk8',
      }}
      right={{
        eyebrow: 'Address',
        value: addressHighlight,
        detail: addressLine,
        cta: mapsUrl
          ? { label: 'Open in Maps', href: mapsUrl, external: true }
          : { label: 'Get directions', href: '/visit' },
        mark: 'cross',
        image,
      }}
    />
  )
}
