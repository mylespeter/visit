// 'use client'

// import { updateStatut } from '@/actions/visites'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import Image from 'next/image'

// interface Visite {
//   id: number
//   nom_visiteur: string
//   telephone: string
//   heure: string
//   motif: string
//   statut: string
//   membre?: { 
//     nom_complet: string
//     membre_profile: string | null 
//   } | null
// }

// interface VisitesDuJourProps {
//   visites: Visite[]
// }

// export default function VisitesDuJour({ visites }: VisitesDuJourProps) {
//   const router = useRouter()
//   const [updatingId, setUpdatingId] = useState<number | null>(null)

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

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   const visitesFiltrees = visites.filter(v => 
//     ['En attente', 'Confirmée'].includes(v.statut)
//   )

//   return (
//     <div>
//       {/* En-tête */}
//       <div className="mb-4">
//         <h2 className="text-sm font-medium text-gray-900">Aujourd'hui</h2>
//         <p className="text-xs text-gray-400 mt-1">
//           {new Date().toLocaleDateString('fr-FR', {
//             weekday: 'long',
//             day: 'numeric',
//             month: 'long'
//           })}
//         </p>
//       </div>

//       {/* Progression */}
//       <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//         <div className="flex justify-between text-xs mb-1">
//           <span className="text-gray-400">Progression</span>
//           <span className="text-gray-600">
//             {visites.filter(v => v.statut === 'Reçue').length}/{visites.length}
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-1.5">
//           <div 
//             className="bg-gray-600 h-1.5 rounded-full transition-all"
//             style={{ width: `${(visites.filter(v => v.statut === 'Reçue').length / visites.length) * 100}%` }}
//           />
//         </div>
//       </div>

//       {/* Liste des visites */}
//       <div className="space-y-3">
//         {visites.length === 0 ? (
//           <div className="text-center py-8 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-300">Aucune visite aujourd'hui</p>
//           </div>
//         ) : (
//           visites.map((visite) => (
//             <div key={visite.id} className="bg-gray-50 rounded-lg p-3">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-medium text-gray-900">
//                       {visite.heure}
//                     </span>
//                     {visite.membre && (
//                       <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
//                         Membre
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="flex items-center gap-2 mt-2">
//                     {/* Avatar pour les membres */}
//                     {visite.membre?.membre_profile ? (
//                       <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
//                         <Image
//                           src={visite.membre.membre_profile}
//                           alt={visite.membre.nom_complet}
//                           width={24}
//                           height={24}
//                           className="object-cover"
//                         />
//                       </div>
//                     ) : visite.membre ? (
//                       <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500 flex-shrink-0">
//                         {getInitials(visite.membre.nom_complet)}
//                       </div>
//                     ) : null}
                    
//                     <div>
//                       <h3 className="text-sm text-gray-900">
//                         {visite.nom_visiteur}
//                       </h3>
//                       <p className="text-xs text-gray-400">
//                         {visite.telephone}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <p className="text-xs text-gray-400 mt-2">
//                     {visite.motif}
//                   </p>
//                 </div>

//                 <select
//                   value={visite.statut}
//                   onChange={(e) => handleStatutChange(visite.id, e.target.value)}
//                   disabled={updatingId === visite.id}
//                   className={`text-xs px-2 py-1 rounded-full border-0 focus:ring-0 ${
//                     statutColors[visite.statut as keyof typeof statutColors]
//                   }`}
//                 >
//                   {statuts.map(s => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Résumé */}
//       {visites.length > 0 && (
//         <div className="mt-4 pt-4 border-t border-gray-100">
//           <div className="flex justify-between text-xs">
//             <span className="text-gray-400">En attente</span>
//             <span className="text-gray-600">{visites.filter(v => v.statut === 'En attente').length}</span>
//           </div>
//           <div className="flex justify-between text-xs mt-1">
//             <span className="text-gray-400">Confirmées</span>
//             <span className="text-gray-600">{visites.filter(v => v.statut === 'Confirmée').length}</span>
//           </div>
//           <div className="flex justify-between text-xs mt-1">
//             <span className="text-gray-400">Reçues</span>
//             <span className="text-gray-600">{visites.filter(v => v.statut === 'Reçue').length}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

'use client'

import { updateStatut } from '@/actions/visites'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface Visite {
  id: number
  nom_visiteur: string
  telephone: string
  heure: string
  motif: string
  statut: string
  membre?: { 
    nom_complet: string
    membre_profile: string | null 
  } | null
}

interface VisitesDuJourProps {
  visites: Visite[]
}

export default function VisitesDuJour({ visites }: VisitesDuJourProps) {
  const router = useRouter()
  const [updatingId, setUpdatingId] = useState<number | null>(null)

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

  const handleMarquerRecu = async (visiteId: number) => {
    setUpdatingId(visiteId)
    const result = await updateStatut(visiteId, 'Reçue')
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Visite marquée comme reçue')
      router.refresh()
    }
    setUpdatingId(null)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const visitesFiltrees = visites.filter(v => 
    ['En attente', 'Confirmée'].includes(v.statut)
  )

  const stats = {
    total: visites.length,
    enAttente: visites.filter(v => v.statut === 'En attente').length,
    confirmees: visites.filter(v => v.statut === 'Confirmée').length,
    recues: visites.filter(v => v.statut === 'Reçue').length,
    reportees: visites.filter(v => v.statut === 'Reportée').length,
    annulees: visites.filter(v => v.statut === 'Annulée').length
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* En-tête avec date et progression */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Visites du jour</h2>
            <p className="text-xs text-gray-500 mt-1">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
            {visitesFiltrees.length} en cours
          </span>
        </div>

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Progression du jour</span>
            <span className="font-medium text-gray-700">
              {stats.recues}/{stats.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-green-500 h-1 rounded-full transition-all"
              style={{ width: `${(stats.recues / stats.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Liste des visites en tableau */}
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
                    <div className="flex items-center gap-2">
                      {visite.statut !== 'Reçue' && (
                        <button
                          onClick={() => handleMarquerRecu(visite.id)}
                          disabled={updatingId === visite.id}
                          className="text-xs bg-green-50 text-green-600 hover:bg-green-100 px-2 py-1 rounded-full transition-colors"
                        >
                          ✓ Marquer reçue
                        </button>
                      )}
                      <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">
                        Actions
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Résumé des statuts avec icônes */}
      {visites.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div className="space-y-1">
              <div className="text-sm font-bold text-yellow-600">{stats.enAttente}</div>
              <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <span>{statutIcons['En attente']}</span>
                <span>En attente</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-blue-600">{stats.confirmees}</div>
              <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <span>{statutIcons['Confirmée']}</span>
                <span>Confirmée</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-green-600">{stats.recues}</div>
              <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <span>{statutIcons['Reçue']}</span>
                <span>Reçue</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-orange-600">{stats.reportees}</div>
              <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <span>{statutIcons['Reportée']}</span>
                <span>Reportée</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-red-600">{stats.annulees}</div>
              <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <span>{statutIcons['Annulée']}</span>
                <span>Annulée</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}