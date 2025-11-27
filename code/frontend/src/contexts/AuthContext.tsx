import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { api, setAuthToken } from '@/lib/api'

interface AuthUser {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER' | 'TECHNICIAN'
}

interface LoginPayload {
  email: string
  password: string
}

interface SignupPayload {
  name: string
  email: string
  password: string
}

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  loading: boolean
  login: (payload: LoginPayload) => Promise<void>
  signup: (payload: SignupPayload) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  setUser: (user: AuthUser) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const TOKEN_KEY = 'metralis_token'

const getErrorMessage = (err: unknown) => {
  if (typeof err === 'string') return err
  if (err && typeof err === 'object' && 'message' in err) {
    return String((err as { message?: string }).message ?? 'Unexpected error')
  }
  return 'Something went wrong'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const persistSession = (nextToken: string, nextUser: AuthUser) => {
    setToken(nextToken)
    setUser(nextUser)
    localStorage.setItem(TOKEN_KEY, nextToken)
    setAuthToken(nextToken)
  }

  const clearSession = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
    setAuthToken(null)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    if (!storedToken) {
      setLoading(false)
      return
    }

    setAuthToken(storedToken)
    setToken(storedToken)

    api
      .get('/auth/me')
      .then((response) => {
        setUser(response.data.data)
      })
      .catch(() => {
        clearSession()
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (payload: LoginPayload) => {
    try {
      const response = await api.post('/auth/login', payload)
      persistSession(response.data.data.token, response.data.data.user)
    } catch (error) {
      throw new Error(
        (error as any)?.response?.data?.error?.message || getErrorMessage(error),
      )
    }
  }

  const signup = async (payload: SignupPayload) => {
    try {
      const response = await api.post('/auth/signup', payload)
      persistSession(response.data.data.token, response.data.data.user)
    } catch (error) {
      throw new Error(
        (error as any)?.response?.data?.error?.message || getErrorMessage(error),
      )
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout').catch(() => undefined)
    } finally {
      clearSession()
    }
  }

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data.data)
    } catch {
      // Silently fail - user might not be authenticated
    }
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      signup,
      logout,
      refreshUser,
      setUser,
    }),
    [user, token, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}


