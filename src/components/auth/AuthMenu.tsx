import { Link } from 'react-router-dom'
import { UserRound } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const offsetMotion =
  'hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-1.5 active:translate-y-1.5'

type AuthMenuProps = {
  tone?: 'light' | 'dark'
}

export function AuthMenu({ tone = 'light' }: AuthMenuProps) {
  const { user } = useAuth()
  const dark = tone === 'dark'

  if (user) {
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

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/sign-in"
        className={cn(
          'hidden px-2 py-2 font-mono text-xs font-bold uppercase tracking-wider transition sm:inline',
          dark ? 'text-white/70 hover:text-lime' : 'text-ink/70 hover:text-ink'
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
            ? 'border-lime bg-lime text-ink hover:bg-ink hover:text-lime hover:border-lime'
            : 'border-ink bg-ink text-lime hover:bg-lime hover:text-ink'
        )}
      >
        Join
      </Link>
    </div>
  )
}
