import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function SignUpPage() {
  const { signUp, user } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/account'

  const [name, setName] = useState('')
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
      await signUp({ name, email, password })
      navigate(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md border-2 border-lime bg-paper p-6 text-ink offset-shadow-lime sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
        Create account
      </p>
      <h1 className="type-display mt-3 text-3xl sm:text-4xl">Join Radical</h1>
      <p className="mt-3 text-sm text-ink/70">
        Comment, react, and follow along with Radical Media.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
            Name
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-1 h-12 w-full border-2 border-ink bg-mute px-3 outline-none focus:ring-2 focus:ring-lime"
          />
        </label>
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
            autoComplete="new-password"
            minLength={8}
            className="mt-1 h-12 w-full border-2 border-ink bg-mute px-3 outline-none focus:ring-2 focus:ring-lime"
          />
          <span className="mt-1 block font-mono text-[10px] text-ink/40">
            At least 8 characters
          </span>
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
          {loading ? 'Creating…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        Already have an account?{' '}
        <Link
          to={`/sign-in${params.get('next') ? `?next=${encodeURIComponent(next)}` : ''}`}
          className="font-bold text-ink underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
