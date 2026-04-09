// // contexts/AuthContext.tsx
// 'use client'

// import { createContext, useContext, ReactNode } from 'react'

// interface User {
//   id: number
//   nom_complet: string
//   role: {
//     nom: string
//   }
//   profile_img?: string | null
// }

// interface AuthContextType {
//   user: User | null
//   isAdmin: boolean
//   isAuthenticated: boolean
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isAdmin: false,
//   isAuthenticated: false
// })

// interface AuthProviderProps {
//   user: User | null
//   children: ReactNode
// }

// export function AuthProvider({ user, children }: AuthProviderProps) {
//   const isAdmin = user?.role?.nom?.toLowerCase() === 'admin'
//   const isAuthenticated = !!user
  
//   return (
//     <AuthContext.Provider value={{ user, isAdmin, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider')
//   }
//   return context
// }
// contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface User {
  id: number
  nom_complet: string
  email: string
  role: {
    id: number
    nom: string
  }
  profile_img?: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Pages publiques qui ne nécessitent pas d'authentification
const publicPages = ['/', '/login', '/register']

// Pages accessibles sans authentification (mais qui peuvent afficher du contenu public)
const authRequiredPages = [
  '/visites',
  '/historique',
  '/rapports',
  '/tableau',
  '/administration',
  '/admin',
  '/profile',
  '/parametres',
  '/pasteur',
  '/secretaire',
  '/visiteur'
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const refreshUser = async () => {
    try {
      const response = await fetch('/api/auth/me')
      const data = await response.json()
      
      if (data.success && data.user) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Erreur refresh user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  useEffect(() => {
    // Attendre que le chargement soit terminé
    if (loading) return

    const isPublicPage = publicPages.includes(pathname)
    const needsAuth = authRequiredPages.some(page => pathname.startsWith(page))

    // Si l'utilisateur n'est pas connecté et que la page nécessite une authentification
    if (!user && needsAuth) {
      router.push('/')
    }
    
    // Si l'utilisateur est connecté et essaie d'accéder à la page d'accueil
    if (user && pathname === '/') {
      // Rediriger selon le rôle
      const role = user.role?.nom?.toLowerCase()
      
      if (role === 'pasteur') {
        router.push('/pasteur/visites')
      } else if (role === 'admin') {
        router.push('/admin/membres')
      } else if (role === 'secretaire') {
        router.push('/visites')
      } else {
        router.push('/visites')
      }
    }
  }, [user, loading, pathname, router])

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (response.ok) {
        setUser(null)
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Erreur logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      logout,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}