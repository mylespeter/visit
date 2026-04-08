

// // app/secretaire/visites/page.tsx
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
//   Tag
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
//   }, [visites, searchTerm, motifFilter, statutFilter, membreFilter, sortField, sortOrder])

//   // Appliquer les filtres quand les dépendances changent
//   useEffect(() => {
//     if (visites.length > 0) {
//       applyFiltersAndSort()
//     }
//   }, [applyFiltersAndSort, visites.length])

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
//       <div className="max-w-[1400px] mx-auto px-4  py-4">
       

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
//         <div className="bg-white  shadow-sm border border-gray-200 overflow-hidden">
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
//                 {filteredVisites.length === 0 ? (
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
//                   filteredVisites.map((visite, index) => (
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
// app/secretaire/visites/page.tsx
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
  ChevronRight
} from 'lucide-react'
import { getAllVisites } from '@/actions/visites'

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

  // Récupérer TOUTES les visites en UNE SEULE requête
  useEffect(() => {
    if (hasLoaded) return // Évite les doubles appels
    
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
  }, [hasLoaded]) // Dépendance pour éviter les appels infinis

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
    // Reset à la première page quand les filtres changent
    setCurrentPage(1)
  }, [visites, searchTerm, motifFilter, statutFilter, membreFilter, sortField, sortOrder])

  // Appliquer les filtres quand les dépendances changent
  useEffect(() => {
    if (visites.length > 0) {
      applyFiltersAndSort()
    }
  }, [applyFiltersAndSort, visites.length])

  // Pagination - calcul des éléments à afficher
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredVisites.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredVisites.length / itemsPerPage)

  // Changement de page
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  // Liste unique des motifs (mémorisée)
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

  const getMotifDisplay = (visite: Visite) => {
    return visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-3 w-3 text-gray-400" />
    return sortOrder === 'asc' ? 
      <ChevronUp className="h-3 w-3 text-blue-500" /> : 
      <ChevronDown className="h-3 w-3 text-blue-500" />
  }

  // Loader simple gris
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

  // Message d'erreur
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
            {/* Recherche */}
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

            {/* Motif */}
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

            {/* Statut */}
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

            {/* Membre */}
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

          {/* Affichage du nombre */}
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Notes
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
                        <span className="text-sm text-gray-400 max-w-xs truncate block">
                          {visite.observations || '-'}
                        </span>
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

        {/* Bienvenue en bas */}
        <div className="mt-6 text-right">
          <p className="text-sm text-gray-400">
            Bienvenue, Emmanuel
          </p>
        </div>
      </div>
    </div>
  )
}