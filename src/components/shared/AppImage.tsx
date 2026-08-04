import { ImageIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type AppImageProps = {
  /** Kept for call-site compatibility — not rendered while placeholders are on */
  src?: string
  alt?: string
  className?: string
  /** Icon size hint */
  iconClassName?: string
}

/**
 * Temporary site-wide media placeholder — grey block + centered image icon.
 * Swap back to a real <img> when assets are ready; keep the same call sites.
 */
export function AppImage({
  alt = '',
  className,
  iconClassName,
}: AppImageProps) {
  return (
    <div
      role="img"
      aria-label={alt || 'Image placeholder'}
      className={cn(
        'flex items-center justify-center bg-mute text-ink/35',
        className
      )}
    >
      <ImageIcon
        className={cn('size-10 sm:size-12', iconClassName)}
        strokeWidth={1.5}
        aria-hidden
      />
    </div>
  )
}
