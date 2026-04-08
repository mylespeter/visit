// import { supabase } from '@/lib/supabase'
// import { getUser } from '@/actions/auth'
// import { redirect } from 'next/navigation'
// import ConfigurationForm from './ConfigurationForm'

// export default async function ConfigurationPage() {
//   const user = await getUser()

//   if (!user || user.role?.nom !== 'secretaire') {
//     redirect('/profile')
//   }

//   const { data: configs } = await supabase
//     .from('configuration')
//     .select('*')
//     .order('id')

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       {/* En-tête */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-light text-gray-900">Configuration</h1>
//         <p className="text-sm text-gray-400 mt-1">
//           Paramètres généraux de l'application
//         </p>
//       </div>

//       {/* Formulaire */}
//       <ConfigurationForm configs={configs || []} />
//     </div>
//   )
// }

// app/administration/configuration/page.tsx (ou ConfigurationPage)
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import ConfigurationForm from './ConfigurationForm'

interface Config {
  id: number
  cle: string
  valeur: string
  description: string
}

export default function ConfigurationPage() {
  const router = useRouter()
  const [configs, setConfigs] = useState<Config[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    async function loadData() {
      // Check user role
      const user = await getUser()
      
      if (!user || user.role?.nom !== 'secretaire') {
        // Redirection immédiate sans afficher le contenu
        router.replace('/profile')
        return
      }

      setIsAuthorized(true)
      
      // Load configurations
      const { data: configs } = await supabase
        .from('configuration')
        .select('*')
        .order('id')

      setConfigs(configs || [])
      setLoading(false)
    }

    loadData()
  }, [router])

  // Afficher un loader ou rien pendant la vérification
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Chargement...</div>
      </div>
    )
  }

  // Ne pas rendre le contenu si non autorisé (la redirection aura lieu)
  if (!isAuthorized) {
    return null
  }

  return (
    <div className=" mx-auto  ">
      <div className="mb-8">
        {/* <p className="text-sm text-gray-400 mt-1">
          Paramètres généraux de l'application
        </p> */}
      </div>

      <ConfigurationForm configs={configs} />
    </div>
  )
}