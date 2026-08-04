import type { CSSProperties } from 'react'
import { ImageIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type AppImageProps = {
  src?: string
  alt?: string
  className?: string
  /** Icon size hint (stub mode only) */
  iconClassName?: string
  /** Extra classes on the <img> (e.g. object-position) */
  imgClassName?: string
  /** Inline styles on the <img> */
  imgStyle?: CSSProperties
  /**
   * Grey icon block by default. Pass `stub={false}` with `src` to show a
   * photo (see `finish`).
   */
  stub?: boolean
  /**
   * `bw-grain` — greyscale + grain.
   * `grain` — color kept, grain overlay.
   * `natural` — source as-is.
   */
  finish?: 'bw-grain' | 'grain' | 'natural'
}

/**
 * Media slot — grey stub by default; optional photo when assets aren't final.
 */
export function AppImage({
  src,
  alt = '',
  className,
  iconClassName,
  imgClassName,
  imgStyle,
  stub = true,
  finish = 'bw-grain',
}: AppImageProps) {
  if (!stub && src) {
    return (
      <div className={cn('relative overflow-hidden bg-mute', className)}>
        <div
          className={cn(
            'absolute inset-0 overflow-hidden',
            finish === 'bw-grain' && 'photo-grain photo-bw',
            finish === 'grain' && 'photo-grain'
          )}
        >
          <img
            src={src}
            alt={alt}
            className={cn('size-full object-cover', imgClassName)}
            style={imgStyle}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    )
  }

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
