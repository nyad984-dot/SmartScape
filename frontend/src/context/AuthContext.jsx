import { useMemo, useState } from 'react'
import { authService } from '../services/authService'
import { AuthContext } from './authContextValue'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      async login(credentials) {
        const response = await authService.login(credentials)
        setUser(response.user)
      },
      async register(values) {
        const response = await authService.register(values)
        setUser(response.user)
      },
      logout() {
        authService.logout()
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
