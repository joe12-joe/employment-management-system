import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type User = {
  id: string
  name: string
  email: string
  roles: string[]
  permissions: string[]
}

type StoredUser = User & { password: string }

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

const USERS_KEY = 'ems_users'
const SESSION_KEY = 'ems_session'
const DEFAULT_PERMS = ['employees.read','employees.create','employees.update','employees.manage_status','departments.read','departments.create','departments.update','users.read','roles.read','audit.read']
const AuthContext = createContext<AuthContextValue | null>(null)

function readUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]') as StoredUser[] } catch { return [] }
}
function writeUsers(users: StoredUser[]) { localStorage.setItem(USERS_KEY, JSON.stringify(users)) }
function toUser(u: StoredUser): User { const { password: _p, ...user } = u; return user }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) ?? 'null') as { email: string } | null
      if (!session?.email) return null
      const found = readUsers().find((u) => u.email.toLowerCase() === session.email.toLowerCase())
      return found ? toUser(found) : null
    } catch { return null }
  })

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: !!user,
    async login(email: string, password: string) {
      const found = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!found || found.password !== password) throw new Error('Invalid email or password.')
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email: found.email }))
      setUser(toUser(found))
    },
    async register(name: string, email: string, password: string) {
      const users = readUsers()
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) throw new Error('An account with this email already exists.')
      const newUser: StoredUser = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        roles: ['Tenant Admin'],
        permissions: DEFAULT_PERMS,
      }
      users.push(newUser)
      writeUsers(users)
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email: newUser.email }))
      setUser(toUser(newUser))
    },
    logout() {
      localStorage.removeItem(SESSION_KEY)
      setUser(null)
    },
    hasPermission(permission: string) {
      return !!user?.permissions.includes(permission)
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
