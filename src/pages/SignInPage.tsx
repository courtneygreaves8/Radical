import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function SignInPage() {
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/account'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to={next} replace />

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn({ email, password })
      navigate(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-[1.5rem] bg-[var(--v3-cream,#faf4f0)] p-6 text-ink shadow-[0_18px_50px_rgba(30,21,18,0.1)] ring-1 ring-ink/10 sm:p-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
        Welcome back
      </p>
      <h1 className="mt-3 font-sans text-3xl font-bold tracking-tight sm:text-4xl">
        Sign in
      </h1>
      <p className="mt-3 text-sm text-ink/65">
        Pick up reactions, comments, and your Radical Media profile.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/45">
            Email
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-1.5 h-12 w-full rounded-full border border-ink/15 bg-mute px-4 outline-none transition focus:border-lime focus:ring-2 focus:ring-lime/30"
          />
        </label>
        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/45">
            Password
          </span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mt-1.5 h-12 w-full rounded-full border border-ink/15 bg-mute px-4 outline-none transition focus:border-lime focus:ring-2 focus:ring-lime/30"
          />
        </label>

        {error ? (
          <p className="rounded-2xl bg-lime px-4 py-2.5 text-sm font-medium text-lime-foreground">
            {error}
          </p>
        ) : null}

        <Button type="submit" variant="default" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        New here?{' '}
        <Link
          to={`/sign-up${params.get('next') ? `?next=${encodeURIComponent(next)}` : ''}`}
          className="font-bold text-lime"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}
