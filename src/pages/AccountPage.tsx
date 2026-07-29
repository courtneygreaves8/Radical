import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function AccountPage() {
  const { user, signOut, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name ?? '')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  if (!user) {
    return <Navigate to="/sign-in?next=/account" replace />
  }

  async function onSave(e: FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      await updateProfile({ name })
      setMessage('Profile updated.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update profile.')
    }
  }

  function onSignOut() {
    signOut()
    navigate('/')
  }

  return (
    <>
      <PageHero
        eyebrow="Your account"
        title={`Hey, ${user.name.split(' ')[0]}`}
        description={user.email}
        tone="ink"
      />

      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2">
          <form onSubmit={onSave} className="space-y-4 border-2 border-ink bg-mute p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
              Profile
            </p>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                Display name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 h-12 w-full border-2 border-ink bg-paper px-3 outline-none focus:ring-2 focus:ring-lime"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                Email
              </span>
              <input
                value={user.email}
                disabled
                className="mt-1 h-12 w-full border-2 border-ink/30 bg-paper/60 px-3 text-ink/50"
              />
            </label>
            {error ? (
              <p className="text-sm font-medium text-red-700">{error}</p>
            ) : null}
            {message ? (
              <p className="border-2 border-ink bg-lime px-3 py-2 text-sm font-medium">
                {message}
              </p>
            ) : null}
            <Button type="submit" variant="lime" offset>
              Save changes
            </Button>
          </form>

          <div className="space-y-4 border-2 border-ink bg-ink p-6 text-paper">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">
              Quick links
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/podcasts" className="font-bold hover:text-lime">
                  Radical Media →
                </Link>
              </li>
              <li>
                <Link to="/visit" className="font-bold hover:text-lime">
                  Plan a Sunday visit →
                </Link>
              </li>
              <li>
                <Link to="/give" className="font-bold hover:text-lime">
                  Ways to give →
                </Link>
              </li>
            </ul>
            <p className="pt-4 font-mono text-[10px] uppercase tracking-wider text-paper/40">
              Member since{' '}
              {new Date(user.createdAt).toLocaleDateString('en-GB', {
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <Button
              type="button"
              variant="lime"
              className="mt-2"
              onClick={onSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
