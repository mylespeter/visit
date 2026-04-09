// contexts/AuthContext.tsx
'use client'

import { createContext, useContext, ReactNode } from 'react'

interface User {
  id: number
  nom_complet: string
  role: {
    nom: string
  }
  profile_img?: string | null
}

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isAuthenticated: false
})

interface AuthProviderProps {
  user: User | null
  children: ReactNode
}

export function AuthProvider({ user, children }: AuthProviderProps) {
  const isAdmin = user?.role?.nom?.toLowerCase() === 'admin'
  const isAuthenticated = !!user
  
  return (
    <AuthContext.Provider value={{ user, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider')
  }
  return context
}