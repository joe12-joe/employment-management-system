import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { api } from './api'

export type User = {
  id: string
  name: string
  email: string
  roles: string[]
  permissions: string[]
  tenantId?: string
}

type AuthResponse = { user: User; accessToken: string; refreshToken: string }

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (companyName: string, name: string, email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

const ACCESS_KEY = 'ems_access_token'
const REFRESH_KEY = 'ems_refresh_token'

const AuthContext = createContext<AuthContextValue | null>(null)

function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
}
function clearTokens() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_KEY)
    if (!token) { setIsLoading(false); return }
    api<User>('/auth/me')
      .then(setUser)
      .catch(() => { clearTokens(); setUser(null) })
      .finally(() => setIsLoading(false))
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    async login(email: string, password: string) {
      const res = await api<AuthResponse>('/auth/login', {
        method: 'POST',
        auth: false,
        body: JSON.stringify({ email, password }),
      })
      setTokens(res.accessToken, res.refreshToken)
      setUser(res.user)
    },
    async register(companyName: string, name: string, email: string, password: string) {
      const res = await api<AuthResponse>('/auth/register', {
        method: 'POST',
        auth: false,
        body: JSON.stringify({ companyName, name, email, password }),
      })
      setTokens(res.accessToken, res.refreshToken)
      setUser(res.user)
    },
    logout() {
      const refreshToken = localStorage.getItem(REFRESH_KEY)
      clearTokens()
      setUser(null)
      if (refreshToken) {
        api('/auth/logout', { method: 'POST', auth: false, body: JSON.stringify({ refreshToken }) }).catch(() => {})
      }
    },
    hasPermission(permission: string) {
      return !!user?.permissions.includes(permission)
    },
  }), [user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
