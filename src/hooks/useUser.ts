// import { useEffect, useState } from 'react'
// import { getUser } from '@/actions/auth'

// export function useUser() {
//   const [user, setUser] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const userData = await getUser()
//         setUser(userData)
//       } catch (error) {
//         console.error('Erreur lors du chargement de l\'utilisateur', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadUser()
//   }, [])

//   return { user, loading }
// }

import { useEffect, useState } from 'react'

interface User {
  id: number
  nom_complet: string
  numero: string
  adresse: string
  profile_img: string | null
  role_id: number
  role: {
    nom: string
  }
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        // Appel à une API route au lieu du Server Action direct
        const response = await fetch('/api/user')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  return { user, loading }
}