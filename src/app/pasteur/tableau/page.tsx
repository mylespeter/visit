

// 'use client'

// import { useState, useEffect, useCallback, useMemo } from 'react'
// import { 
//   Search, 
//   ChevronDown, 
//   ChevronUp, 
//   Filter,
//   Calendar as CalendarIcon,
//   Clock,
//   User,
//   Phone,
//   Tag,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react'
// import { getAllVisites } from '@/actions/visites'

// interface Visite {
//   id: number
//   nom_visiteur: string
//   telephone: string
//   sexe: string
//   est_membre: boolean
//   membre_id: number | null
//   motif: string
//   autre_motif: string | null
//   date_visite: string
//   heure: string
//   observations: string | null
//   statut: string
//   created_at: string
//   membre?: {
//     id: number
//     nom_complet: string
//     membre_profile: string | null
//   } | null
// }

// type SortField = 'id' | 'date' | 'heure' | 'nom' | 'telephone' | 'motif' | 'est_membre' | 'statut'
// type SortOrder = 'asc' | 'desc'

// export default function TableauVisites() {
//   const [visites, setVisites] = useState<Visite[]>([])
//   const [filteredVisites, setFilteredVisites] = useState<Visite[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
  
//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage, setItemsPerPage] = useState(10)
  
//   // Filtres
//   const [searchTerm, setSearchTerm] = useState('')
//   const [motifFilter, setMotifFilter] = useState('Tous')
//   const [statutFilter, setStatutFilter] = useState('Tous')
//   const [membreFilter, setMembreFilter] = useState('Tous')
  
//   // Tri
//   const [sortField, setSortField] = useState<SortField>('date')
//   const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

//   // Flag pour éviter les appels multiples
//   const [hasLoaded, setHasLoaded] = useState(false)

//   // Récupérer TOUTES les visites en UNE SEULE requête
//   useEffect(() => {
//     if (hasLoaded) return // Évite les doubles appels
    
//     const fetchVisites = async () => {
//       try {
//         setLoading(true)
//         setError(null)
        
//         console.log('📊 Chargement des visites...')
//         const result = await getAllVisites()
        
//         if (result.success && result.data) {
//           console.log(`✅ ${result.data.length} visites chargées`)
//           setVisites(result.data as Visite[])
//         } else {
//           setError(result.error || 'Erreur lors du chargement')
//         }
//       } catch (error) {
//         console.error('❌ Erreur:', error)
//         setError('Impossible de charger les visites')
//       } finally {
//         setLoading(false)
//         setHasLoaded(true)
//       }
//     }

//     fetchVisites()
//   }, [hasLoaded]) // Dépendance pour éviter les appels infinis

//   // Appliquer les filtres et le tri (mémorisé)
//   const applyFiltersAndSort = useCallback(() => {
//     let filtered = [...visites]

//     // Recherche
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase()
//       filtered = filtered.filter(v => 
//         v.nom_visiteur.toLowerCase().includes(term) ||
//         v.telephone.includes(term)
//       )
//     }

//     // Filtre motif
//     if (motifFilter !== 'Tous') {
//       filtered = filtered.filter(v => {
//         const motifDisplay = v.motif === 'Autre' && v.autre_motif ? v.autre_motif : v.motif
//         return motifDisplay === motifFilter
//       })
//     }

//     // Filtre statut
//     if (statutFilter !== 'Tous') {
//       filtered = filtered.filter(v => v.statut === statutFilter)
//     }

//     // Filtre membre
//     if (membreFilter !== 'Tous') {
//       const isMembre = membreFilter === 'Oui'
//       filtered = filtered.filter(v => v.est_membre === isMembre)
//     }

//     // Tri
//     filtered.sort((a, b) => {
//       let aVal: any, bVal: any
      
//       switch (sortField) {
//         case 'id':
//           aVal = a.id
//           bVal = b.id
//           break
//         case 'date':
//           aVal = a.date_visite
//           bVal = b.date_visite
//           break
//         case 'heure':
//           aVal = a.heure
//           bVal = b.heure
//           break
//         case 'nom':
//           aVal = a.nom_visiteur
//           bVal = b.nom_visiteur
//           break
//         case 'telephone':
//           aVal = a.telephone
//           bVal = b.telephone
//           break
//         case 'motif':
//           aVal = a.motif === 'Autre' && a.autre_motif ? a.autre_motif : a.motif
//           bVal = b.motif === 'Autre' && b.autre_motif ? b.autre_motif : b.motif
//           break
//         case 'est_membre':
//           aVal = a.est_membre
//           bVal = b.est_membre
//           break
//         case 'statut':
//           aVal = a.statut
//           bVal = b.statut
//           break
//         default:
//           aVal = a.date_visite
//           bVal = b.date_visite
//       }

//       if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
//       if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
//       return 0
//     })

//     setFilteredVisites(filtered)
//     // Reset à la première page quand les filtres changent
//     setCurrentPage(1)
//   }, [visites, searchTerm, motifFilter, statutFilter, membreFilter, sortField, sortOrder])

//   // Appliquer les filtres quand les dépendances changent
//   useEffect(() => {
//     if (visites.length > 0) {
//       applyFiltersAndSort()
//     }
//   }, [applyFiltersAndSort, visites.length])

//   // Pagination - calcul des éléments à afficher
//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const currentItems = filteredVisites.slice(indexOfFirstItem, indexOfLastItem)
//   const totalPages = Math.ceil(filteredVisites.length / itemsPerPage)

//   // Changement de page
//   const goToPage = (page: number) => {
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)))
//   }

//   // Liste unique des motifs (mémorisée)
//   const motifs = useMemo(() => {
//     return ['Tous', ...Array.from(new Set(visites.map(v => v.motif === 'Autre' && v.autre_motif ? v.autre_motif : v.motif)))]
//   }, [visites])

//   const handleSort = (field: SortField) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
//     } else {
//       setSortField(field)
//       setSortOrder('asc')
//     }
//   }

//   const getStatutColor = (statut: string) => {
//     switch (statut) {
//       case 'En attente':
//         return 'bg-yellow-100 text-yellow-800'
//       case 'Confirmée':
//         return 'bg-blue-100 text-blue-800'
//       case 'Reçue':
//         return 'bg-green-100 text-green-800'
//       case 'Reportée':
//         return 'bg-orange-100 text-orange-800'
//       case 'Annulée':
//         return 'bg-red-100 text-red-800'
//       default:
//         return 'bg-gray-100 text-gray-800'
//     }
//   }

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr)
//     return date.toLocaleDateString('fr-FR')
//   }

//   const getMotifDisplay = (visite: Visite) => {
//     return visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif
//   }

//   const SortIcon = ({ field }: { field: SortField }) => {
//     if (sortField !== field) return <ChevronDown className="h-3 w-3 text-gray-400" />
//     return sortOrder === 'asc' ? 
//       <ChevronUp className="h-3 w-3 text-blue-500" /> : 
//       <ChevronDown className="h-3 w-3 text-blue-500" />
//   }

//   // Loader simple gris
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-t-gray-600"></div>
//           <p className="mt-4 text-sm text-gray-500">Chargement des visites...</p>
//         </div>
//       </div>
//     )
//   }

//   // Message d'erreur
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-6">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
//             <span className="text-2xl">⚠️</span>
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
//           <p className="text-gray-500 mb-4">{error}</p>
//           <button 
//             onClick={() => {
//               setHasLoaded(false)
//               setLoading(true)
//               setError(null)
//             }} 
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
//           >
//             Réessayer
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-[1400px] mx-auto px-4 py-4">
       

//         {/* Filtres Avancés */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
//           <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
//             <Filter className="h-4 w-4" />
//             Filtres Avancés
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {/* Recherche */}
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">Recherche</label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Nom, téléphone..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Motif */}
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">Motif</label>
//               <select
//                 value={motifFilter}
//                 onChange={(e) => setMotifFilter(e.target.value)}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 {motifs.map(motif => (
//                   <option key={motif} value={motif}>{motif}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Statut */}
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">Statut</label>
//               <select
//                 value={statutFilter}
//                 onChange={(e) => setStatutFilter(e.target.value)}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="Tous">Tous</option>
//                 <option value="En attente">En attente</option>
//                 <option value="Confirmée">Confirmée</option>
//                 <option value="Reçue">Reçue</option>
//                 <option value="Reportée">Reportée</option>
//                 <option value="Annulée">Annulée</option>
//               </select>
//             </div>

//             {/* Membre */}
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">Membre</label>
//               <select
//                 value={membreFilter}
//                 onChange={(e) => setMembreFilter(e.target.value)}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="Tous">Tous</option>
//                 <option value="Oui">Oui</option>
//                 <option value="Non">Non</option>
//               </select>
//             </div>
//           </div>

//           {/* Affichage du nombre */}
//           <div className="mt-4 pt-3 border-t border-gray-100">
//             <p className="text-sm text-gray-500">
//               <span className="font-semibold text-gray-700">Total:</span> {visites.length} visites au total
//               {filteredVisites.length !== visites.length && (
//                 <span className="ml-2">
//                   <span className="font-semibold text-gray-700">Filtré:</span> {filteredVisites.length} visite{filteredVisites.length !== 1 ? 's' : ''}
//                 </span>
//               )}
//             </p>
//           </div>
//         </div>

//         {/* Tableau */}
//         <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200 bg-gray-50">
//                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('id')}>
//                     <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
//                       ID <SortIcon field="id" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('date')}>
//                     <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
//                       Date <SortIcon field="date" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('heure')}>
//                     <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
//                       Heure <SortIcon field="heure" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('nom')}>
//                     <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
//                       Nom <SortIcon field="nom" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('telephone')}>
//                     <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
//                       Téléphone <SortIcon field="telephone" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('motif')}>
//                     <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
//                       Motif <SortIcon field="motif" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('est_membre')}>
//                     <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
//                       Membre <SortIcon field="est_membre" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('statut')}>
//                     <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
//                       Statut <SortIcon field="statut" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Notes
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.length === 0 ? (
//                   <tr>
//                     <td colSpan={9} className="px-4 py-12 text-center">
//                       <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                         <Search className="h-8 w-8 text-gray-400" />
//                       </div>
//                       <p className="text-gray-500">Aucun visiteur trouvé</p>
//                       <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentItems.map((visite, index) => (
//                     <tr 
//                       key={visite.id} 
//                       className={`border-b border-gray-100 hover:bg-gray-50 transition ${
//                         index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
//                       }`}
//                     >
//                       <td className="px-4 py-3">
//                         <span className="text-sm font-mono text-gray-500">#{visite.id}</span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-1">
//                           <CalendarIcon className="h-3 w-3 text-gray-400" />
//                           <span className="text-sm text-gray-700">{formatDate(visite.date_visite)}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-3 w-3 text-gray-400" />
//                           <span className="text-sm text-gray-700">{visite.heure}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <User className="h-3 w-3 text-gray-400" />
//                           <span className="text-sm font-medium text-gray-800">{visite.nom_visiteur}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-1">
//                           <Phone className="h-3 w-3 text-gray-400" />
//                           <span className="text-sm text-gray-600">{visite.telephone}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-1">
//                           <Tag className="h-3 w-3 text-gray-400" />
//                           <span className="text-sm text-gray-700">{getMotifDisplay(visite)}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
//                           visite.est_membre ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
//                         }`}>
//                           {visite.est_membre ? 'Oui' : 'Non'}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(visite.statut)}`}>
//                           {visite.statut}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className="text-sm text-gray-400 max-w-xs truncate block">
//                           {visite.observations || '-'}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination */}
//         {filteredVisites.length > 0 && (
//           <div className="mt-6 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-500">
//                 Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredVisites.length)} sur {filteredVisites.length} visites
//               </span>
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => {
//                   setItemsPerPage(Number(e.target.value))
//                   setCurrentPage(1)
//                 }}
//                 className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value={10}>10 / page</option>
//                 <option value={25}>25 / page</option>
//                 <option value={50}>50 / page</option>
//                 <option value={100}>100 / page</option>
//               </select>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
              
//               <div className="flex items-center gap-1">
//                 {(() => {
//                   const pages = []
//                   const maxVisible = 5
//                   let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
//                   let endPage = Math.min(totalPages, startPage + maxVisible - 1)
                  
//                   if (endPage - startPage + 1 < maxVisible) {
//                     startPage = Math.max(1, endPage - maxVisible + 1)
//                   }
                  
//                   if (startPage > 1) {
//                     pages.push(
//                       <button
//                         key={1}
//                         onClick={() => goToPage(1)}
//                         className="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
//                       >
//                         1
//                       </button>
//                     )
//                     if (startPage > 2) {
//                       pages.push(<span key="dots1" className="px-2 text-gray-400">...</span>)
//                     }
//                   }
                  
//                   for (let i = startPage; i <= endPage; i++) {
//                     pages.push(
//                       <button
//                         key={i}
//                         onClick={() => goToPage(i)}
//                         className={`px-3 py-1 rounded-lg text-sm transition ${
//                           currentPage === i
//                             ? 'bg-blue-500 text-white'
//                             : 'text-gray-600 hover:bg-gray-50'
//                         }`}
//                       >
//                         {i}
//                       </button>
//                     )
//                   }
                  
//                   if (endPage < totalPages) {
//                     if (endPage < totalPages - 1) {
//                       pages.push(<span key="dots2" className="px-2 text-gray-400">...</span>)
//                     }
//                     pages.push(
//                       <button
//                         key={totalPages}
//                         onClick={() => goToPage(totalPages)}
//                         className="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
//                       >
//                         {totalPages}
//                       </button>
//                     )
//                   }
                  
//                   return pages
//                 })()}
//               </div>
              
//               <button
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Bienvenue en bas */}
//         <div className="mt-6 text-right">
//           <p className="text-sm text-gray-400">
//             Bienvenue, Emmanuel
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Filter,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Tag,
  ChevronLeft,
  ChevronRight,
  StickyNote,
  Edit2,
  Save,
  X,
  Loader2,
  FileText
} from 'lucide-react'
import { getAllVisites, getNotesByVisite, createNotePasteur, updateNotePasteur } from '@/actions/visites'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface Visite {
  id: number
  nom_visiteur: string
  telephone: string
  sexe: string
  est_membre: boolean
  membre_id: number | null
  motif: string
  autre_motif: string | null
  date_visite: string
  heure: string
  observations: string | null
  statut: string
  created_at: string
  membre?: {
    id: number
    nom_complet: string
    membre_profile: string | null
  } | null
}

interface Note {
  id: number
  titre: string
  contenu: string
  created_at: string
  updated_at: string
  pasteur?: {
    nom_complet: string
  }
}

type SortField = 'id' | 'date' | 'heure' | 'nom' | 'telephone' | 'motif' | 'est_membre' | 'statut'
type SortOrder = 'asc' | 'desc'

export default function TableauVisites() {
  const [visites, setVisites] = useState<Visite[]>([])
  const [filteredVisites, setFilteredVisites] = useState<Visite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  
  // Filtres
  const [searchTerm, setSearchTerm] = useState('')
  const [motifFilter, setMotifFilter] = useState('Tous')
  const [statutFilter, setStatutFilter] = useState('Tous')
  const [membreFilter, setMembreFilter] = useState('Tous')
  
  // Tri
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  // Flag pour éviter les appels multiples
  const [hasLoaded, setHasLoaded] = useState(false)

  // États pour le modal des notes
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [selectedVisite, setSelectedVisite] = useState<Visite | null>(null)
  const [existingNote, setExistingNote] = useState<Note | null>(null)
  const [loadingNote, setLoadingNote] = useState(false)
  const [noteContenu, setNoteContenu] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [submittingNote, setSubmittingNote] = useState(false)
  const [noteError, setNoteError] = useState('')

  // Récupérer TOUTES les visites en UNE SEULE requête
  useEffect(() => {
    if (hasLoaded) return
    
    const fetchVisites = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('📊 Chargement des visites...')
        const result = await getAllVisites()
        
        if (result.success && result.data) {
          console.log(`✅ ${result.data.length} visites chargées`)
          setVisites(result.data as Visite[])
        } else {
          setError(result.error || 'Erreur lors du chargement')
        }
      } catch (error) {
        console.error('❌ Erreur:', error)
        setError('Impossible de charger les visites')
      } finally {
        setLoading(false)
        setHasLoaded(true)
      }
    }

    fetchVisites()
  }, [hasLoaded])

  // Charger la note d'une visite
  const loadNote = async (visiteId: number) => {
    setLoadingNote(true)
    const result = await getNotesByVisite(visiteId)
    if (result.success && result.data && result.data.length > 0) {
      setExistingNote(result.data[0] as Note)
      setNoteContenu(result.data[0].contenu)
    } else {
      setExistingNote(null)
      setNoteContenu('')
    }
    setLoadingNote(false)
  }

  // Ouvrir le modal des notes
  const openNoteModal = async (visite: Visite) => {
    setSelectedVisite(visite)
    setNoteError('')
    setIsEditing(false)
    await loadNote(visite.id)
    setShowNoteModal(true)
  }

  // Activer le mode édition
  const handleEditNote = () => {
    setIsEditing(true)
  }

  // Annuler l'édition
  const handleCancelEdit = () => {
    setIsEditing(false)
    if (existingNote) {
      setNoteContenu(existingNote.contenu)
    } else {
      setNoteContenu('')
    }
    setNoteError('')
  }

  // Sauvegarder ou créer la note
  const handleSaveNote = async () => {
    if (!noteContenu.trim()) {
      setNoteError('Le contenu de la note est requis')
      return
    }

    setSubmittingNote(true)
    setNoteError('')

    const formDataObj = new FormData()
    formDataObj.append('visite_id', selectedVisite!.id.toString())
    
    // Titre automatique
    const autoTitle = `Note pastorale - ${selectedVisite!.nom_visiteur} - ${format(new Date(selectedVisite!.date_visite), 'dd/MM/yyyy')}`
    formDataObj.append('titre', autoTitle)
    formDataObj.append('contenu', noteContenu)

    let result
    if (existingNote) {
      // Mise à jour
      formDataObj.append('note_id', existingNote.id.toString())
      result = await updateNotePasteur(formDataObj)
    } else {
      // Création
      result = await createNotePasteur(formDataObj)
    }
    
    if (result.success) {
      await loadNote(selectedVisite!.id)
      setIsEditing(false)
    } else {
      setNoteError(result.error || 'Erreur lors de la sauvegarde de la note')
    }
    setSubmittingNote(false)
  }

  // Appliquer les filtres et le tri (mémorisé)
  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...visites]

    // Recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(v => 
        v.nom_visiteur.toLowerCase().includes(term) ||
        v.telephone.includes(term)
      )
    }

    // Filtre motif
    if (motifFilter !== 'Tous') {
      filtered = filtered.filter(v => {
        const motifDisplay = v.motif === 'Autre' && v.autre_motif ? v.autre_motif : v.motif
        return motifDisplay === motifFilter
      })
    }

    // Filtre statut
    if (statutFilter !== 'Tous') {
      filtered = filtered.filter(v => v.statut === statutFilter)
    }

    // Filtre membre
    if (membreFilter !== 'Tous') {
      const isMembre = membreFilter === 'Oui'
      filtered = filtered.filter(v => v.est_membre === isMembre)
    }

    // Tri
    filtered.sort((a, b) => {
      let aVal: any, bVal: any
      
      switch (sortField) {
        case 'id':
          aVal = a.id
          bVal = b.id
          break
        case 'date':
          aVal = a.date_visite
          bVal = b.date_visite
          break
        case 'heure':
          aVal = a.heure
          bVal = b.heure
          break
        case 'nom':
          aVal = a.nom_visiteur
          bVal = b.nom_visiteur
          break
        case 'telephone':
          aVal = a.telephone
          bVal = b.telephone
          break
        case 'motif':
          aVal = a.motif === 'Autre' && a.autre_motif ? a.autre_motif : a.motif
          bVal = b.motif === 'Autre' && b.autre_motif ? b.autre_motif : b.motif
          break
        case 'est_membre':
          aVal = a.est_membre
          bVal = b.est_membre
          break
        case 'statut':
          aVal = a.statut
          bVal = b.statut
          break
        default:
          aVal = a.date_visite
          bVal = b.date_visite
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    setFilteredVisites(filtered)
    setCurrentPage(1)
  }, [visites, searchTerm, motifFilter, statutFilter, membreFilter, sortField, sortOrder])

  // Appliquer les filtres quand les dépendances changent
  useEffect(() => {
    if (visites.length > 0) {
      applyFiltersAndSort()
    }
  }, [applyFiltersAndSort, visites.length])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredVisites.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredVisites.length / itemsPerPage)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const motifs = useMemo(() => {
    return ['Tous', ...Array.from(new Set(visites.map(v => v.motif === 'Autre' && v.autre_motif ? v.autre_motif : v.motif)))]
  }, [visites])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800'
      case 'Confirmée':
        return 'bg-blue-100 text-blue-800'
      case 'Reçue':
        return 'bg-green-100 text-green-800'
      case 'Reportée':
        return 'bg-orange-100 text-orange-800'
      case 'Annulée':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR')
  }

  const formatDateNote = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr })
  }

  const getMotifDisplay = (visite: Visite) => {
    return visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-3 w-3 text-gray-400" />
    return sortOrder === 'asc' ? 
      <ChevronUp className="h-3 w-3 text-blue-500" /> : 
      <ChevronDown className="h-3 w-3 text-blue-500" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-t-gray-600"></div>
          <p className="mt-4 text-sm text-gray-500">Chargement des visites...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => {
              setHasLoaded(false)
              setLoading(true)
              setError(null)
            }} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        {/* Filtres Avancés */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtres Avancés
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom, téléphone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Motif</label>
              <select
                value={motifFilter}
                onChange={(e) => setMotifFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {motifs.map(motif => (
                  <option key={motif} value={motif}>{motif}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Statut</label>
              <select
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Tous">Tous</option>
                <option value="En attente">En attente</option>
                <option value="Confirmée">Confirmée</option>
                <option value="Reçue">Reçue</option>
                <option value="Reportée">Reportée</option>
                <option value="Annulée">Annulée</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Membre</label>
              <select
                value={membreFilter}
                onChange={(e) => setMembreFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Tous">Tous</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">Total:</span> {visites.length} visites au total
              {filteredVisites.length !== visites.length && (
                <span className="ml-2">
                  <span className="font-semibold text-gray-700">Filtré:</span> {filteredVisites.length} visite{filteredVisites.length !== 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('id')}>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                      ID <SortIcon field="id" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('date')}>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                      Date <SortIcon field="date" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('heure')}>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                      Heure <SortIcon field="heure" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('nom')}>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                      Nom <SortIcon field="nom" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('telephone')}>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                      Téléphone <SortIcon field="telephone" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('motif')}>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                      Motif <SortIcon field="motif" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('est_membre')}>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                      Membre <SortIcon field="est_membre" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('statut')}>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                      Statut <SortIcon field="statut" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Aucun visiteur trouvé</p>
                      <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres</p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((visite, index) => (
                    <tr 
                      key={visite.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-gray-500">#{visite.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-700">{formatDate(visite.date_visite)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-700">{visite.heure}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-gray-400" />
                          <span className="text-sm font-medium text-gray-800">{visite.nom_visiteur}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{visite.telephone}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Tag className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-700">{getMotifDisplay(visite)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          visite.est_membre ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {visite.est_membre ? 'Oui' : 'Non'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(visite.statut)}`}>
                          {visite.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openNoteModal(visite)}
                          className="p-1.5 bg-purple-600 hover:bg-purple-700 transition"
                          title="Note pastorale"
                        >
                          <FileText className="w-4 h-4 text-white" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredVisites.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredVisites.length)} sur {filteredVisites.length} visites
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10 / page</option>
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div className="flex items-center gap-1">
                {(() => {
                  const pages = []
                  const maxVisible = 5
                  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
                  let endPage = Math.min(totalPages, startPage + maxVisible - 1)
                  
                  if (endPage - startPage + 1 < maxVisible) {
                    startPage = Math.max(1, endPage - maxVisible + 1)
                  }
                  
                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => goToPage(1)}
                        className="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
                      >
                        1
                      </button>
                    )
                    if (startPage > 2) {
                      pages.push(<span key="dots1" className="px-2 text-gray-400">...</span>)
                    }
                  }
                  
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => goToPage(i)}
                        className={`px-3 py-1 rounded-lg text-sm transition ${
                          currentPage === i
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {i}
                      </button>
                    )
                  }
                  
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(<span key="dots2" className="px-2 text-gray-400">...</span>)
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => goToPage(totalPages)}
                        className="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
                      >
                        {totalPages}
                      </button>
                    )
                  }
                  
                  return pages
                })()}
              </div>
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-right">
          <p className="text-sm text-gray-400">
            Bienvenue, Emmanuel
          </p>
        </div>
      </div>

      {/* Modal des notes pastorales */}
      {showNoteModal && selectedVisite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white  shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="bg-blue-600  text-white px-6 py-4 ">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <StickyNote className="w-5 h-5" />
                    Note Pastorale
                  </h2>
                  <p className="text-sm text-purple-100 mt-1">
                    {selectedVisite.nom_visiteur} - {format(new Date(selectedVisite.date_visite), 'EEEE d MMMM yyyy', { locale: fr })} à {selectedVisite.heure}
                  </p>
                </div>
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="text-white hover:text-purple-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {loadingNote ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              ) : (
                <>
                  {/* Affichage du titre automatique */}
                  <div className="mb-4 pb-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Titre</p>
                        <p className="text-md font-semibold text-gray-800">
                          Note pastorale - {selectedVisite.nom_visiteur} - {format(new Date(selectedVisite.date_visite), 'dd/MM/yyyy')}
                        </p>
                      </div>
                      {existingNote && !isEditing && (
                        <div className="text-xs text-gray-500">
                          Créé le {formatDateNote(existingNote.created_at)}
                          {existingNote.updated_at !== existingNote.created_at && (
                            <span className="ml-2 italic">(modifié)</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Affichage de la note existante ou formulaire */}
                  {existingNote && !isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-xs text-gray-500 uppercase font-semibold">Contenu</p>
                          <button
                            onClick={handleEditNote}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                          >
                            <Edit2 className="w-4 h-4" />
                            Modifier
                          </button>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p className="text-gray-700 whitespace-pre-wrap">{existingNote.contenu}</p>
                        </div>
                      </div>
                      {existingNote.pasteur && (
                        <p className="text-xs text-gray-500 text-right">
                          Par : {existingNote.pasteur.nom_complet}
                        </p>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveNote(); }} className="space-y-4">
                      {noteError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                          {noteError}
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contenu de la note <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={noteContenu}
                          onChange={(e) => setNoteContenu(e.target.value)}
                          rows={8}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                          placeholder="Écrivez votre note pastorale ici..."
                          autoFocus
                        />
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        {existingNote && (
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
                          >
                            Annuler
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={submittingNote}
                          className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                        >
                          {submittingNote && <Loader2 className="w-4 h-4 animate-spin" />}
                          <Save className="w-4 h-4" />
                          {existingNote ? 'Mettre à jour' : 'Créer la note'}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}