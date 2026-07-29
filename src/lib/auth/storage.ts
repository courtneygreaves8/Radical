export type AuthUser = {
  id: string
  name: string
  email: string
  createdAt: string
}

type StoredUser = AuthUser & {
  passwordHash: string
}

const USERS_KEY = 'radical-auth-users'
const SESSION_KEY = 'radical-auth-session'

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

async function hashPassword(password: string, salt: string) {
  const data = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function publicUser(user: StoredUser): AuthUser {
  const { passwordHash: _, ...rest } = user
  return rest
}

export async function registerUser(input: {
  name: string
  email: string
  password: string
}): Promise<AuthUser> {
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()
  const password = input.password

  if (name.length < 2) throw new Error('Please enter your name.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email.')
  }
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.')
  }

  const users = readUsers()
  if (users.some((u) => u.email === email)) {
    throw new Error('An account with that email already exists.')
  }

  const id = crypto.randomUUID()
  const passwordHash = await hashPassword(password, id)
  const user: StoredUser = {
    id,
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  }

  writeUsers([...users, user])
  localStorage.setItem(SESSION_KEY, id)
  return publicUser(user)
}

export async function loginUser(input: {
  email: string
  password: string
}): Promise<AuthUser> {
  const email = input.email.trim().toLowerCase()
  const users = readUsers()
  const user = users.find((u) => u.email === email)
  if (!user) throw new Error('No account found for that email.')

  const passwordHash = await hashPassword(input.password, user.id)
  if (passwordHash !== user.passwordHash) {
    throw new Error('Incorrect password.')
  }

  localStorage.setItem(SESSION_KEY, user.id)
  return publicUser(user)
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSessionUser(): AuthUser | null {
  const id = localStorage.getItem(SESSION_KEY)
  if (!id) return null
  const user = readUsers().find((u) => u.id === id)
  return user ? publicUser(user) : null
}

export function updateUserProfile(
  userId: string,
  patch: { name?: string }
): AuthUser {
  const users = readUsers()
  const index = users.findIndex((u) => u.id === userId)
  if (index < 0) throw new Error('Account not found.')

  const name = patch.name?.trim()
  if (name !== undefined) {
    if (name.length < 2) throw new Error('Please enter your name.')
    users[index] = { ...users[index], name }
  }

  writeUsers(users)
  return publicUser(users[index])
}
