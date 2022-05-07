import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'
import { parseCookies, setCookie } from 'nookies'

type User = {
  email: string
  permissions: string[]
  roles: string[]
}

type UserSignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: UserSignInCredentials): Promise<void>
  isAuthenticated: boolean
  user?: User
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()

  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    if (token) {
      api.get('/me').then((response) => {
        const { email, permissions, roles } = response.data
        setUser({
          email,
          permissions,
          roles,
        })
      })
    }
  }, [])

  async function signIn({ email, password }: UserSignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })

      const { permissions, roles, token, refreshToken } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/',
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/',
      })

      setUser({
        email,
        permissions,
        roles,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
