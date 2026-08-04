import { Link } from 'react-router-dom'
import { UserRound } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const offsetMotion =
  'hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-1.5 active:translate-y-1.5'

type AuthMenuProps = {
  tone?: 'light' | 'dark'
  /** Soft pills for V3 editorial header (default: brutalist) */
  variant?: 'brutal' | 'editorial'
}

export function AuthMenu({
  tone = 'light',
  variant = 'brutal',
}: AuthMenuProps) {
  const { user } = useAuth()
  const dark = tone === 'dark'
  const editorial = variant === 'editorial'

  if (user) {
    if (editorial) {
      return (
        <Link
          to="/account"
          className="inline-flex max-w-[10rem] items-center gap-2 truncate rounded-full border border-[var(--v3-ink,#1e1512)]/12 bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--v3-ink,#1e1512)] transition hover:border-[var(--v3-ink,#1e1512)]/25"
          title={user.email}
        >
          <UserRound className="size-3.5 shrink-0" />
          <span className="truncate">{user.name.split(' ')[0]}</span>
        </Link>
      )
    }

    return (
      <Link
        to="/account"
        className={cn(
          'inline-flex max-w-[10rem] items-center gap-2 truncate border-2 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-[box-shadow,background-color,color,transform] duration-200',
          offsetMotion,
          dark
            ? 'border-white/25 text-white offset-shadow-paper hover:border-lime hover:text-lime'
            : 'border-ink bg-paper text-ink offset-shadow-paper hover:bg-ink hover:text-lime'
        )}
        title={user.email}
      >
        <UserRound className="size-3.5 shrink-0" />
        <span className="truncate">{user.name.split(' ')[0]}</span>
      </Link>
    )
  }

  if (editorial) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/sign-in"
          className="hidden px-2 py-2 text-[12px] font-medium tracking-wide text-[var(--v3-ink,#1e1512)]/55 transition hover:text-[var(--v3-ink,#1e1512)] sm:inline"
        >
          Sign in
        </Link>
        <Link
          to="/sign-up"
          className="inline-flex items-center rounded-full border border-[var(--v3-ink,#1e1512)]/12 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-ink,#1e1512)] transition hover:border-[var(--v3-ink,#1e1512)]/30 hover:bg-[var(--v3-ink,#1e1512)] hover:text-[var(--v3-cream,#faf4f0)]"
        >
          Join
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/sign-in"
        className={cn(
          'hidden px-2 py-2 font-mono text-xs font-bold uppercase tracking-wider transition sm:inline',
          dark
            ? 'text-white/70 hover:text-lime'
            : 'text-lime-foreground/70 hover:text-lime-foreground'
        )}
      >
        Sign in
      </Link>
      <Link
        to="/sign-up"
        className={cn(
          'inline-flex items-center gap-2 border-2 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-[box-shadow,background-color,color,transform] duration-200',
          'offset-shadow-paper',
          offsetMotion,
          dark
            ? 'border-lime bg-lime text-lime-foreground hover:bg-ink hover:text-lime hover:border-lime'
            : 'border-ink bg-ink text-lime hover:bg-lime hover:text-lime-foreground'
        )}
      >
        Join
      </Link>
    </div>
  )
}
