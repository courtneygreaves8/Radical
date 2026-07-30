import { Link, useLocation } from 'react-router-dom'
import { Flame, HandHeart, Heart, Sparkles } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'
import type { ReactionKey } from '@/hooks/useEpisodeSocial'
import { cn } from '@/lib/utils'

const REACTIONS: {
  key: ReactionKey
  label: string
  icon: typeof Heart
}[] = [
  { key: 'amen', label: 'Amen', icon: Sparkles },
  { key: 'fire', label: 'Fire', icon: Flame },
  { key: 'heart', label: 'Love', icon: Heart },
  { key: 'pray', label: 'Pray', icon: HandHeart },
]

type ReactionBarProps = {
  reactions: Record<ReactionKey, number>
  myReactions: ReactionKey[]
  onToggle: (key: ReactionKey) => void
}

export function ReactionBar({
  reactions,
  myReactions,
  onToggle,
}: ReactionBarProps) {
  const { user } = useAuth()
  const location = useLocation()
  const next = `${location.pathname}${location.search}`

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {REACTIONS.map(({ key, label, icon: Icon }) => {
          const active = myReactions.includes(key)
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (!user) return
                onToggle(key)
              }}
              disabled={!user}
              title={user ? label : 'Sign in to react'}
              className={cn(
                'inline-flex items-center gap-2 border px-3 py-2 font-mono text-xs uppercase tracking-wider transition',
                active
                  ? 'border-lime bg-lime text-lime-foreground'
                  : 'border-white/20 bg-white/5 text-white/80',
                user
                  ? 'hover:border-lime hover:text-lime'
                  : 'cursor-not-allowed opacity-50'
              )}
            >
              <Icon
                className="size-3.5"
                strokeWidth={2}
                fill={active && key === 'heart' ? 'currentColor' : 'none'}
              />
              {label}
              <span className={cn(active ? 'text-ink/70' : 'text-white/40')}>
                {reactions[key]}
              </span>
            </button>
          )
        })}
      </div>
      {!user ? (
        <p className="font-mono text-xs text-white/45">
          <Link
            to={`/sign-in?next=${encodeURIComponent(next)}`}
            className="text-lime underline"
          >
            Sign in
          </Link>{' '}
          or{' '}
          <Link
            to={`/sign-up?next=${encodeURIComponent(next)}`}
            className="text-lime underline"
          >
            create an account
          </Link>{' '}
          to react.
        </p>
      ) : null}
    </div>
  )
}
