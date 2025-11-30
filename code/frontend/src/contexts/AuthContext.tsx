import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { api, setAuthToken } from '@/lib/api'

interface AuthUser {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'TECHNICIAN'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  phoneNumber?: string | null
  assignmentWhatsappOptIn?: boolean
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
  signup: (payload: SignupPayload) => Promise<{ status: AuthUser['status'] } | void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  setUser: (user: AuthUser | null) => void
  isApproved: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const TOKEN_KEY = 'metralis_token'

type ApiErrorShape = {
  response?: {
    data?: {
      error?: {
        message?: string
      }
    }
  }
}

const getErrorMessage = (err: unknown) => {
  if (typeof err === 'string') return err
  if (err && typeof err === 'object' && 'message' in err) {
    return String((err as { message?: string }).message ?? 'Unexpected error')
  }
  return 'Something went wrong'
}

const getApiErrorMessage = (err: unknown) =>
  (err as ApiErrorShape)?.response?.data?.error?.message

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const persistSession = useCallback((nextToken: string, nextUser: AuthUser) => {
    setToken(nextToken)
    setUser(nextUser)
    localStorage.setItem(TOKEN_KEY, nextToken)
    setAuthToken(nextToken)
  }, [])

  const clearSession = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
    setAuthToken(null)
  }, [])

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
  }, [clearSession])

  const login = useCallback(async (payload: LoginPayload) => {
    try {
      const response = await api.post('/auth/login', payload)
      persistSession(response.data.data.token, response.data.data.user)
    } catch (error) {
      throw new Error(getApiErrorMessage(error) || getErrorMessage(error))
    }
  }, [persistSession])

  const signup = useCallback(async (payload: SignupPayload) => {
    try {
      const response = await api.post('/auth/signup', payload)
      const { token: signupToken, user } = response.data.data

      if (signupToken && user) {
        persistSession(signupToken, user)
        return { status: user.status }
      }

      // Pending users should not be auto-logged in
      setUser(null)
      clearSession()
      return { status: user?.status ?? 'PENDING' }
    } catch (error) {
      throw new Error(getApiErrorMessage(error) || getErrorMessage(error))
    }
  }, [clearSession, persistSession])

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout').catch(() => undefined)
    } finally {
      clearSession()
    }
  }, [clearSession])

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data.data)
    } catch {
      // Silently fail - user might not be authenticated
    }
  }, [])

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
      isApproved: user?.status === 'APPROVED',
    }),
    [user, token, loading, login, signup, logout, refreshUser],
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


