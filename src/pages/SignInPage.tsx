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
    <div className="w-full max-w-md border-2 border-lime bg-paper p-6 text-ink offset-shadow-lime sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
        Welcome back
      </p>
      <h1 className="type-display mt-3 text-3xl sm:text-4xl">Sign in</h1>
      <p className="mt-3 text-sm text-ink/70">
        Pick up reactions, comments, and your Radical Media profile.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
            Email
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-1 h-12 w-full border-2 border-ink bg-mute px-3 outline-none focus:ring-2 focus:ring-lime"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
            Password
          </span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mt-1 h-12 w-full border-2 border-ink bg-mute px-3 outline-none focus:ring-2 focus:ring-lime"
          />
        </label>

        {error ? (
          <p className="border-2 border-ink bg-lime px-3 py-2 text-sm font-medium">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="default"
          offset
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        New here?{' '}
        <Link
          to={`/sign-up${params.get('next') ? `?next=${encodeURIComponent(next)}` : ''}`}
          className="font-bold text-ink underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}
