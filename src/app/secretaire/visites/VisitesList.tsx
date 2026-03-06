

// // 'use client'

// // import { updateStatut } from '@/actions/visites'
// // import { useRouter } from 'next/navigation'
// // import toast from 'react-hot-toast'
// // import { useState } from 'react'
// // import Image from 'next/image'

// // interface Visite {
// //   id: number
// //   nom_visiteur: string
// //   telephone: string
// //   heure: string
// //   motif: string
// //   statut: string
// //   est_membre?: boolean
// //   membre?: { 
// //     nom_complet: string
// //     membre_profile?: string | null
// //   } | null
// // }

// // interface VisitesListProps {
// //   visites: Visite[]
// // }

// // export default function VisitesList({ visites }: VisitesListProps) {
// //   const router = useRouter()
// //   const [updatingId, setUpdatingId] = useState<number | null>(null)

// //   const getInitials = (name: string) => {
// //     return name
// //       .split(' ')
// //       .map(word => word[0])
// //       .join('')
// //       .toUpperCase()
// //       .slice(0, 2)
// //   }

// //   const statuts = ['En attente', 'Confirmée', 'Reçue', 'Reportée', 'Annulée']
  
// //   const statutColors = {
// //     'En attente': 'bg-yellow-100 text-yellow-800',
// //     'Confirmée': 'bg-blue-100 text-blue-800',
// //     'Reçue': 'bg-green-100 text-green-800',
// //     'Reportée': 'bg-orange-100 text-orange-800',
// //     'Annulée': 'bg-red-100 text-red-800'
// //   }

// //   const statutIcons = {
// //     'En attente': '⏳',
// //     'Confirmée': '✓',
// //     'Reçue': '✓✓',
// //     'Reportée': '↻',
// //     'Annulée': '✕'
// //   }

// //   const handleStatutChange = async (visiteId: number, nouveauStatut: string) => {
// //     setUpdatingId(visiteId)
// //     const result = await updateStatut(visiteId, nouveauStatut)
    
// //     if (result.error) {
// //       toast.error(result.error)
// //     } else {
// //       toast.success('Statut mis à jour')
// //       router.refresh()
// //     }
// //     setUpdatingId(null)
// //   }

// //   const visitesFiltrees = visites.filter(v => 
// //     ['En attente', 'Confirmée'].includes(v.statut)
// //   )

// //   const restants = visitesFiltrees.length

// //   return (
// //     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
// //       {/* En-tête avec compteur */}
// //       <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
// //         <h2 className="text-sm font-semibold text-gray-700">
// //           Visites du jour
// //         </h2>
// //         <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
// //           {restants} restant{restants > 1 ? 's' : ''}
// //         </span>
// //       </div>

// //       {/* Tableau */}
// //       <div className="overflow-x-auto">
// //         <table className="w-full text-sm">
// //           <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
// //             <tr>
// //               <th className="px-4 py-3 text-left">Heure</th>
// //               <th className="px-4 py-3 text-left">Visiteur</th>
// //               <th className="px-4 py-3 text-left">Téléphone</th>
// //               <th className="px-4 py-3 text-left">Motif</th>
// //               <th className="px-4 py-3 text-left">Statut</th>
// //               <th className="px-4 py-3 text-left">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-100">
// //             {visites.length === 0 ? (
// //               <tr>
// //                 <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
// //                   Aucune visite aujourd'hui
// //                 </td>
// //               </tr>
// //             ) : (
// //               visites.map((visite) => (
// //                 <tr key={visite.id} className="hover:bg-gray-50 transition-colors">
// //                     <td className="px-4 py-3 font-medium text-gray-900">
// //                     {visite.heure}
// //                   </td>
// //                   <td className="px-4 py-3">
// //                     <div className="flex items-center gap-3">
// //                       {/* Avatar avec photo ou initiales */}
// //                       <div className="flex-shrink-0">
// //                         {visite.membre?.membre_profile ? (
// //                           <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
// //                             <Image
// //                               src={visite.membre.membre_profile}
// //                               alt={visite.membre.nom_complet || visite.nom_visiteur}
// //                               width={32}
// //                               height={32}
// //                               className="object-cover w-full h-full"
// //                             />
// //                           </div>
// //                         ) : (
// //                           <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 ring-2 ring-gray-100">
// //                             {getInitials(visite.nom_visiteur)}
// //                           </div>
// //                         )}
// //                       </div>
// //                       <div>
// //                         <span className="font-medium text-gray-900">
// //                           {visite.nom_visiteur}
// //                         </span>
// //                         {visite.membre && (
// //                           <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
// //                             Membre
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td className="px-4 py-3 text-gray-600">
// //                     {visite.telephone}
// //                   </td>
                
// //                   <td className="px-4 py-3 text-gray-600">
// //                     {visite.motif}
// //                   </td>
// //                   <td className="px-4 py-3">
// //                     <select
// //                       value={visite.statut}
// //                       onChange={(e) => handleStatutChange(visite.id, e.target.value)}
// //                       disabled={updatingId === visite.id}
// //                       className={`text-xs px-2 py-1 rounded-full border-0 focus:ring-1 focus:ring-opacity-50 ${
// //                         statutColors[visite.statut as keyof typeof statutColors]
// //                       }`}
// //                     >
// //                       {statuts.map(s => (
// //                         <option key={s} value={s}>{s}</option>
// //                       ))}
// //                     </select>
// //                   </td>
// //                   <td className="px-4 py-3">
// //                     <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">
// //                       Actions
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Résumé des statuts */}
// //       {visites.length > 0 && (
// //         <div className="p-4 border-t border-gray-200 bg-gray-50">
// //           <div className="grid grid-cols-5 gap-2 text-center text-xs">
// //             {statuts.map(statut => {
// //               const count = visites.filter(v => v.statut === statut).length
// //               return (
// //                 <div key={statut} className="space-y-1">
// //                   <div className={`text-sm font-bold ${
// //                     statut === 'En attente' ? 'text-yellow-600' :
// //                     statut === 'Confirmée' ? 'text-blue-600' :
// //                     statut === 'Reçue' ? 'text-green-600' :
// //                     statut === 'Reportée' ? 'text-orange-600' :
// //                     'text-red-600'
// //                   }`}>
// //                     {count}
// //                   </div>
// //                   <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
// //                     <span>{statutIcons[statut as keyof typeof statutIcons]}</span>
// //                     <span>{statut}</span>
// //                   </div>
// //                 </div>
// //               )
// //             })}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }
// 'use client'

// import { updateStatut } from '@/actions/visites'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import { useState } from 'react'
// import Image from 'next/image'
// import { ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp } from 'lucide-react'

// interface Visite {
//   id: number
//   nom_visiteur: string
//   telephone: string
//   date_visite: string
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
//   const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set())
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5 // Nombre de dates par page

//   // Grouper les visites par date
//   const visitesParDate = visites.reduce((acc, visite) => {
//     if (!acc[visite.date_visite]) {
//       acc[visite.date_visite] = []
//     }
//     acc[visite.date_visite].push(visite)
//     return acc
//   }, {} as Record<string, Visite[]>)

//   // Trier les dates par ordre chronologique
//   const dates = Object.keys(visitesParDate).sort()

//   // Pagination
//   const totalPages = Math.ceil(dates.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const endIndex = startIndex + itemsPerPage
//   const currentDates = dates.slice(startIndex, endIndex)

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr)
//     return new Intl.DateTimeFormat('fr-FR', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     }).format(date)
//   }

//   const getDayName = (dateStr: string) => {
//     const date = new Date(dateStr)
//     return new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date)
//   }

//   const statuts = ['En attente', 'Confirmée', 'Reçue', 'Reportée', 'Annulée']
  
//   const statutColors = {
//     'En attente': 'bg-yellow-100 text-yellow-800',
//     'Confirmée': 'bg-blue-100 text-blue-800',
//     'Reçue': 'bg-green-100 text-green-800',
//     'Reportée': 'bg-orange-100 text-orange-800',
//     'Annulée': 'bg-red-100 text-red-800'
//   }

//   const statutIcons = {
//     'En attente': '⏳',
//     'Confirmée': '✓',
//     'Reçue': '✓✓',
//     'Reportée': '↻',
//     'Annulée': '✕'
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

//   const toggleDate = (date: string) => {
//     const newExpanded = new Set(expandedDates)
//     if (newExpanded.has(date)) {
//       newExpanded.delete(date)
//     } else {
//       newExpanded.add(date)
//     }
//     setExpandedDates(newExpanded)
//   }

//   // Compter les visites en attente/confirmées pour une date
//   const getVisitesRestantes = (visites: Visite[]) => {
//     return visites.filter(v => ['En attente', 'Confirmée'].includes(v.statut)).length
//   }

//   return (
//     <div className="space-y-4">
//       {/* En-tête */}
//       <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
//         <div className="flex items-center gap-3">
//           <Calendar className="w-5 h-5 text-gray-400" />
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">
//               Liste des rendez-vous
//             </h2>
//             <p className="text-sm text-gray-500">
//               {visites.length} visite{visites.length > 1 ? 's' : ''} répartie{visites.length > 1 ? 's' : ''} sur {dates.length} jour{dates.length > 1 ? 's' : ''}
//             </p>
//           </div>
//         </div>

//         {/* Badge jours de visite */}
//         <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
//           <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//           Jours de visite : Mardi et Mercredi uniquement
//         </div>
//       </div>

//       {/* Liste des blocs par date */}
//       <div className="space-y-4">
//         {currentDates.length === 0 ? (
//           <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
//             <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//             <p className="text-gray-400">Aucune visite trouvée</p>
//             <p className="text-xs text-gray-300 mt-1">
//               Les visites sont disponibles les mardis et mercredis
//             </p>
//           </div>
//         ) : (
//           currentDates.map((date) => {
//             const dateVisites = visitesParDate[date]
//             const isExpanded = expandedDates.has(date)
//             const visitesRestantes = getVisitesRestantes(dateVisites)
//             const displayVisites = isExpanded ? dateVisites : dateVisites.slice(0, 3)

//             return (
//               <div key={date} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//                 {/* En-tête du bloc date */}
//                 <div 
//                   className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
//                   onClick={() => toggleDate(date)}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <Calendar className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 capitalize">
//                         {formatDate(date)}
//                       </h3>
//                       <div className="flex items-center gap-2 mt-0.5">
//                         <span className="text-xs text-gray-500">
//                           {getDayName(date)}
//                         </span>
//                         <span className="text-xs text-gray-300">•</span>
//                         <span className="text-xs font-medium text-gray-600">
//                           {dateVisites.length} visite{dateVisites.length > 1 ? 's' : ''}
//                         </span>
//                         {visitesRestantes > 0 && (
//                           <>
//                             <span className="text-xs text-gray-300">•</span>
//                             <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
//                               {visitesRestantes} restante{visitesRestantes > 1 ? 's' : ''}
//                             </span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <button className="p-1.5 rounded-lg hover:bg-white transition-colors">
//                     {isExpanded ? (
//                       <ChevronUp className="w-4 h-4 text-gray-400" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4 text-gray-400" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Tableau des visites pour cette date */}
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
//                       <tr>
//                         <th className="px-4 py-3 text-left">Heure</th>
//                         <th className="px-4 py-3 text-left">Visiteur</th>
//                         <th className="px-4 py-3 text-left">Téléphone</th>
//                         <th className="px-4 py-3 text-left">Motif</th>
//                         <th className="px-4 py-3 text-left">Statut</th>
//                         <th className="px-4 py-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {displayVisites.map((visite) => (
//                         <tr key={visite.id} className="hover:bg-gray-50 transition-colors">
//                           <td className="px-4 py-3">
//                             <span className="font-medium text-gray-900">
//                               {visite.heure}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3">
//                             <div className="flex items-center gap-3">
//                               {/* Avatar avec photo ou initiales */}
//                               <div className="flex-shrink-0">
//                                 {visite.membre?.membre_profile ? (
//                                   <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
//                                     <Image
//                                       src={visite.membre.membre_profile}
//                                       alt={visite.membre.nom_complet || visite.nom_visiteur}
//                                       width={32}
//                                       height={32}
//                                       className="object-cover w-full h-full"
//                                     />
//                                   </div>
//                                 ) : (
//                                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 ring-2 ring-gray-100">
//                                     {getInitials(visite.nom_visiteur)}
//                                   </div>
//                                 )}
//                               </div>
//                               <div>
//                                 <span className="font-medium text-gray-900">
//                                   {visite.nom_visiteur}
//                                 </span>
//                                 {visite.membre && (
//                                   <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
//                                     Membre
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3 text-gray-600">
//                             {visite.telephone}
//                           </td>
//                           <td className="px-4 py-3">
//                             <span className="text-gray-600">
//                               {visite.motif}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3">
//                             <select
//                               value={visite.statut}
//                               onChange={(e) => handleStatutChange(visite.id, e.target.value)}
//                               disabled={updatingId === visite.id}
//                               className={`text-xs px-2 py-1 rounded-full border-0 focus:ring-1 focus:ring-opacity-50 ${
//                                 statutColors[visite.statut as keyof typeof statutColors]
//                               }`}
//                             >
//                               {statuts.map(s => (
//                                 <option key={s} value={s}>{s}</option>
//                               ))}
//                             </select>
//                           </td>
//                           <td className="px-4 py-3">
//                             <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">
//                               Détails
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Bouton "Voir plus" si nécessaire */}
//                 {!isExpanded && dateVisites.length > 3 && (
//                   <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
//                     <button
//                       onClick={() => toggleDate(date)}
//                       className="text-xs text-blue-600 hover:text-blue-800 font-medium"
//                     >
//                       Voir les {dateVisites.length - 3} autres visites...
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Pagination */}
//       {dates.length > 0 && (
//         <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between">
//           <div className="text-xs text-gray-500">
//             Affichage {startIndex + 1}-{Math.min(endIndex, dates.length)} sur {dates.length} journées
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className="p-1.5 rounded border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ChevronLeft className="w-4 h-4 text-gray-600" />
//             </button>
//             <span className="text-xs text-gray-600 px-2">
//               Page {currentPage} sur {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//               className="p-1.5 rounded border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//             </button>
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
import { ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp } from 'lucide-react'

interface Visite {
  id: number
  nom_visiteur: string
  telephone: string
  date_visite: string
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
  const [expanded, setExpanded] = useState(true)

  // Trier les visites par heure
  const visitesTriees = [...visites].sort((a, b) => a.heure.localeCompare(b.heure))

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date)
  }

  const statuts = ['En attente', 'Confirmée', 'Reçue', 'Reportée', 'Annulée']
  
  const statutColors = {
    'En attente': 'bg-yellow-100 text-yellow-800',
    'Confirmée': 'bg-blue-100 text-blue-800',
    'Reçue': 'bg-green-100 text-green-800',
    'Reportée': 'bg-orange-100 text-orange-800',
    'Annulée': 'bg-red-100 text-red-800'
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

  // Compter les visites en attente/confirmées
  const visitesRestantes = visites.filter(v => ['En attente', 'Confirmée'].includes(v.statut)).length

  // Prendre la première visite pour obtenir la date (toutes les visites ont la même date dans ce composant)
  const date = visites[0]?.date_visite

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* En-tête du bloc date avec toggle */}
      <div 
        className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 capitalize">
              {formatDate(date)}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">
                {getDayName(date)}
              </span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs font-medium text-gray-600">
                {visites.length} visite{visites.length > 1 ? 's' : ''}
              </span>
              {visitesRestantes > 0 && (
                <>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                    {visitesRestantes} restante{visitesRestantes > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-white transition-colors">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Tableau des visites */}
      {expanded && (
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
              {visitesTriees.map((visite) => (
                <tr key={visite.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">
                      {visite.heure}
                    </span>
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
                  <td className="px-4 py-3">
                    <span className="text-gray-600">
                      {visite.motif}
                    </span>
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
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}