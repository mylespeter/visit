

// 'use client'

// import { updateStatut } from '@/actions/visites'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import { useState } from 'react'
// import Image from 'next/image'

// interface Visite {
//   id: number
//   nom_visiteur: string
//   telephone: string
//   heure: string
//   motif: string
//   statut: string
//   est_membre?: boolean
//   membre?: { 
//     nom_complet: string
//     membre_profile?: string | null
//   } | null
// }

// interface VisitesListProps {
//   visites: Visite[]
// }

// export default function VisitesList({ visites }: VisitesListProps) {
//   const router = useRouter()
//   const [updatingId, setUpdatingId] = useState<number | null>(null)

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   const statuts = ['En attente', 'Confirmée', 'Reçue', 'Reportée', 'Annulée']
  
//   const statutColors = {
//     'En attente': 'bg-gray-100 text-gray-600',
//     'Confirmée': 'bg-gray-200 text-gray-700',
//     'Reçue': 'bg-gray-300 text-gray-800',
//     'Reportée': 'bg-gray-100 text-gray-500',
//     'Annulée': 'bg-gray-50 text-gray-400'
//   }

//   const handleStatutChange = async (visiteId: number, nouveauStatut: string) => {
//     setUpdatingId(visiteId)
//     const result = await updateStatut(visiteId, nouveauStatut)
    
//     if (result.error) {
//       toast.error(result.error)
//     } else {
//       toast.success('Statut mis à jour')
//       router.refresh()
//     }
//     setUpdatingId(null)
//   }

//   const visitesFiltrees = visites.filter(v => 
//     ['En attente', 'Confirmée'].includes(v.statut)
//   )

//   const restants = visitesFiltrees.length

//   return (
//     <div className="bg-white rounded-lg border border-gray-100">
//       {/* En-tête avec compteur */}
//       <div className="p-4 border-b border-gray-50 flex justify-between items-center">
//         <h2 className="text-sm font-medium text-gray-900">
//           Visites du jour
//         </h2>
//         <span className="text-xs text-gray-400">
//           {restants} restant{restants > 1 ? 's' : ''}
//         </span>
//       </div>

//       {/* Liste */}
//       <div className="divide-y divide-gray-50">
//         {visites.length === 0 ? (
//           <div className="p-8 text-center">
//             <p className="text-sm text-gray-300">
//               Aucune visite aujourd'hui
//             </p>
//           </div>
//         ) : (
//           visites.map((visite) => (
//             <div key={visite.id} className="p-4 hover:bg-gray-50/50 transition-colors">
//               <div className="flex items-start gap-3">
//                 {/* Avatar avec photo ou initiales */}
//                 <div className="flex-shrink-0">
//                   {visite.membre?.membre_profile ? (
//                     <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
//                       <Image
//                         src={visite.membre.membre_profile}
//                         alt={visite.membre.nom_complet || visite.nom_visiteur}
//                         width={40}
//                         height={40}
//                         className="object-cover w-full h-full"
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 ring-2 ring-gray-100">
//                       {getInitials(visite.nom_visiteur)}
//                     </div>
//                   )}
//                 </div>

//                 {/* Informations */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-medium text-gray-900">
//                       {visite.heure}
//                     </span>
//                     {visite.membre && (
//                       <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
//                         Membre
//                       </span>
//                     )}
//                   </div>
                  
//                   <h3 className="text-sm text-gray-900 mt-1 truncate">
//                     {visite.nom_visiteur}
//                   </h3>
                  
//                   <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
//                     <span>{visite.telephone}</span>
//                     <span>•</span>
//                     <span>{visite.motif}</span>
//                   </div>
//                 </div>

//                 {/* Sélecteur de statut */}
//                 <div className="flex-shrink-0">
//                   <select
//                     value={visite.statut}
//                     onChange={(e) => handleStatutChange(visite.id, e.target.value)}
//                     disabled={updatingId === visite.id}
//                     className={`text-xs px-2 py-1 rounded-full border-0 focus:ring-0 ${
//                       statutColors[visite.statut as keyof typeof statutColors]
//                     }`}
//                   >
//                     {statuts.map(s => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Résumé des statuts */}
//       {visites.length > 0 && (
//         <div className="p-4 border-t border-gray-50 bg-gray-50/50">
//           <div className="grid grid-cols-5 gap-2 text-center text-xs">
//             {statuts.map(statut => {
//               const count = visites.filter(v => v.statut === statut).length
//               return (
//                 <div key={statut} className="space-y-1">
//                   <div className={`text-xs font-medium ${
//                     statut === 'En attente' ? 'text-gray-600' :
//                     statut === 'Confirmée' ? 'text-gray-700' :
//                     statut === 'Reçue' ? 'text-gray-800' :
//                     statut === 'Reportée' ? 'text-gray-500' :
//                     'text-gray-400'
//                   }`}>
//                     {count}
//                   </div>
//                   <div className="text-[10px] text-gray-400 truncate">
//                     {statut}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

'use client'

import { updateStatut } from '@/actions/visites'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import Image from 'next/image'

interface Visite {
  id: number
  nom_visiteur: string
  telephone: string
  heure: string
  motif: string
  statut: string
  est_membre?: boolean
  membre?: { 
    nom_complet: string
    membre_profile?: string | null
  } | null
}

interface VisitesListProps {
  visites: Visite[]
}

export default function VisitesList({ visites }: VisitesListProps) {
  const router = useRouter()
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const statuts = ['En attente', 'Confirmée', 'Reçue', 'Reportée', 'Annulée']
  
  const statutColors = {
    'En attente': 'bg-yellow-100 text-yellow-800',
    'Confirmée': 'bg-blue-100 text-blue-800',
    'Reçue': 'bg-green-100 text-green-800',
    'Reportée': 'bg-orange-100 text-orange-800',
    'Annulée': 'bg-red-100 text-red-800'
  }

  const statutIcons = {
    'En attente': '⏳',
    'Confirmée': '✓',
    'Reçue': '✓✓',
    'Reportée': '↻',
    'Annulée': '✕'
  }

  const handleStatutChange = async (visiteId: number, nouveauStatut: string) => {
    setUpdatingId(visiteId)
    const result = await updateStatut(visiteId, nouveauStatut)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Statut mis à jour')
      router.refresh()
    }
    setUpdatingId(null)
  }

  const visitesFiltrees = visites.filter(v => 
    ['En attente', 'Confirmée'].includes(v.statut)
  )

  const restants = visitesFiltrees.length

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* En-tête avec compteur */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-700">
          Visites du jour
        </h2>
        <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
          {restants} restant{restants > 1 ? 's' : ''}
        </span>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Heure</th>
              <th className="px-4 py-3 text-left">Visiteur</th>
              <th className="px-4 py-3 text-left">Téléphone</th>
              <th className="px-4 py-3 text-left">Motif</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visites.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  Aucune visite aujourd'hui
                </td>
              </tr>
            ) : (
              visites.map((visite) => (
                <tr key={visite.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">
                    {visite.heure}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar avec photo ou initiales */}
                      <div className="flex-shrink-0">
                        {visite.membre?.membre_profile ? (
                          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
                            <Image
                              src={visite.membre.membre_profile}
                              alt={visite.membre.nom_complet || visite.nom_visiteur}
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 ring-2 ring-gray-100">
                            {getInitials(visite.nom_visiteur)}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">
                          {visite.nom_visiteur}
                        </span>
                        {visite.membre && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            Membre
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {visite.telephone}
                  </td>
                
                  <td className="px-4 py-3 text-gray-600">
                    {visite.motif}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={visite.statut}
                      onChange={(e) => handleStatutChange(visite.id, e.target.value)}
                      disabled={updatingId === visite.id}
                      className={`text-xs px-2 py-1 rounded-full border-0 focus:ring-1 focus:ring-opacity-50 ${
                        statutColors[visite.statut as keyof typeof statutColors]
                      }`}
                    >
                      {statuts.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">
                      Actions
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Résumé des statuts */}
      {visites.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {statuts.map(statut => {
              const count = visites.filter(v => v.statut === statut).length
              return (
                <div key={statut} className="space-y-1">
                  <div className={`text-sm font-bold ${
                    statut === 'En attente' ? 'text-yellow-600' :
                    statut === 'Confirmée' ? 'text-blue-600' :
                    statut === 'Reçue' ? 'text-green-600' :
                    statut === 'Reportée' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {count}
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                    <span>{statutIcons[statut as keyof typeof statutIcons]}</span>
                    <span>{statut}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}