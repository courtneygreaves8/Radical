import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  getSessionUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  type AuthUser,
} from '@/lib/auth/storage'

type AuthContextValue = {
  user: AuthUser | null
  ready: boolean
  signUp: (input: {
    name: string
    email: string
    password: string
  }) => Promise<AuthUser>
  signIn: (input: { email: string; password: string }) => Promise<AuthUser>
  signOut: () => void
  updateProfile: (patch: { name?: string }) => Promise<AuthUser>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getSessionUser())
  const [ready] = useState(true)

  const signUp = useCallback(
    async (input: { name: string; email: string; password: string }) => {
      const next = await registerUser(input)
      setUser(next)
      return next
    },
    []
  )

  const signIn = useCallback(
    async (input: { email: string; password: string }) => {
      const next = await loginUser(input)
      setUser(next)
      return next
    },
    []
  )

  const signOut = useCallback(() => {
    logoutUser()
    setUser(null)
  }, [])

  const updateProfile = useCallback(
    async (patch: { name?: string }) => {
      if (!user) throw new Error('Not signed in.')
      const next = updateUserProfile(user.id, patch)
      setUser(next)
      return next
    },
    [user]
  )

  const value = useMemo(
    () => ({ user, ready, signUp, signIn, signOut, updateProfile }),
    [user, ready, signUp, signIn, signOut, updateProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
