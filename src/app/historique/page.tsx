// // // app/historique/page.tsx
// // 'use client'

// // import { useState, useEffect } from 'react'
// // import { 
// //   Calendar, 
// //   Filter, 
// //   Search,
// //   ChevronDown,
// //   ChevronUp,
// //   User,
// //   Phone,
// //   Tag,
// //   Clock,
// //   Eye
// // } from 'lucide-react'
// // import { getVisitesParDate, getAllVisites } from '@/actions/visites'

// // interface Visite {
// //   id: number
// //   nom_visiteur: string
// //   telephone: string
// //   sexe: string
// //   est_membre: boolean
// //   membre_id: number | null
// //   motif: string
// //   autre_motif: string | null
// //   date_visite: string
// //   heure: string
// //   observations: string | null
// //   statut: string
// //   created_at: string
// //   cree_par?: {
// //     id: number
// //     nom_complet: string
// //   }
// //   membre?: {
// //     id: number
// //     nom_complet: string
// //     membre_profile: string | null
// //   } | null
// // }

// // type SortField = 'date' | 'heure' | 'nom' | 'telephone' | 'motif' | 'statut' | 'cree_par'
// // type SortOrder = 'asc' | 'desc'

// // export default function HistoriquePage() {
// //   const [visites, setVisites] = useState<Visite[]>([])
// //   const [filteredVisites, setFilteredVisites] = useState<Visite[]>([])
// //   const [loading, setLoading] = useState(true)
  
// //   // Filtres de date
// //   const [dateDebut, setDateDebut] = useState(() => {
// //     const date = new Date()
// //     date.setDate(1) // Premier jour du mois
// //     return date.toISOString().split('T')[0]
// //   })
// //   const [dateFin, setDateFin] = useState(() => {
// //     return new Date().toISOString().split('T')[0]
// //   })
// //   const [appliquerFiltre, setAppliquerFiltre] = useState(false)
  
// //   // Tri
// //   const [sortField, setSortField] = useState<SortField>('date')
// //   const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  
// //   // Statistiques
// //   const [stats, setStats] = useState({
// //     total: 0,
// //     recues: 0,
// //     enAttente: 0,
// //     annulees: 0
// //   })

// //   useEffect(() => {
// //     fetchVisites()
// //   }, [appliquerFiltre])

// //   useEffect(() => {
// //     applyFiltersAndSort()
// //   }, [visites, sortField, sortOrder])

// //   const fetchVisites = async () => {
// //     try {
// //       setLoading(true)
      
// //       // Récupérer toutes les visites entre dateDebut et dateFin
// //       const allVisites: Visite[] = []
// //       const startDate = new Date(dateDebut)
// //       const endDate = new Date(dateFin)
      
// //       let currentDate = new Date(startDate)
// //       while (currentDate <= endDate) {
// //         const dateStr = currentDate.toISOString().split('T')[0]
// //         const result = await getVisitesParDate(dateStr)
        
// //         if (result.success && result.data) {
// //           allVisites.push(...(result.data as Visite[]))
// //         }
        
// //         currentDate.setDate(currentDate.getDate() + 1)
// //       }
      
// //       // Trier par date décroissante
// //       allVisites.sort((a, b) => new Date(b.date_visite).getTime() - new Date(a.date_visite).getTime())
      
// //       setVisites(allVisites)
      
// //       // Calculer les stats
// //       const total = allVisites.length
// //       const recues = allVisites.filter(v => v.statut === 'Reçue').length
// //       const enAttente = allVisites.filter(v => v.statut === 'En attente' || v.statut === 'Confirmée').length
// //       const annulees = allVisites.filter(v => v.statut === 'Annulée').length
      
// //       setStats({ total, recues, enAttente, annulees })
      
// //     } catch (error) {
// //       console.error('Erreur:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const applyFiltersAndSort = () => {
// //     let filtered = [...visites]

// //     // Tri
// //     filtered.sort((a, b) => {
// //       let aVal: any, bVal: any
      
// //       switch (sortField) {
// //         case 'date':
// //           aVal = a.date_visite
// //           bVal = b.date_visite
// //           break
// //         case 'heure':
// //           aVal = a.heure
// //           bVal = b.heure
// //           break
// //         case 'nom':
// //           aVal = a.nom_visiteur
// //           bVal = b.nom_visiteur
// //           break
// //         case 'telephone':
// //           aVal = a.telephone
// //           bVal = b.telephone
// //           break
// //         case 'motif':
// //           aVal = a.motif === 'Autre' && a.autre_motif ? a.autre_motif : a.motif
// //           bVal = b.motif === 'Autre' && b.autre_motif ? b.autre_motif : b.motif
// //           break
// //         case 'statut':
// //           aVal = a.statut
// //           bVal = b.statut
// //           break
// //         case 'cree_par':
// //           aVal = a.cree_par?.nom_complet || ''
// //           bVal = b.cree_par?.nom_complet || ''
// //           break
// //         default:
// //           aVal = a.date_visite
// //           bVal = b.date_visite
// //       }

// //       if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
// //       if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
// //       return 0
// //     })

// //     setFilteredVisites(filtered)
// //   }

// //   const handleSort = (field: SortField) => {
// //     if (sortField === field) {
// //       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
// //     } else {
// //       setSortField(field)
// //       setSortOrder('asc')
// //     }
// //   }

// //   const handleFiltrer = () => {
// //     setAppliquerFiltre(!appliquerFiltre)
// //   }

// //   const getStatutColor = (statut: string) => {
// //     switch (statut) {
// //       case 'En attente':
// //         return 'bg-yellow-100 text-yellow-800'
// //       case 'Confirmée':
// //         return 'bg-blue-100 text-blue-800'
// //       case 'Reçue':
// //         return 'bg-green-100 text-green-800'
// //       case 'Reportée':
// //         return 'bg-orange-100 text-orange-800'
// //       case 'Annulée':
// //         return 'bg-red-100 text-red-800'
// //       default:
// //         return 'bg-gray-100 text-gray-800'
// //     }
// //   }

// //   const formatDate = (dateStr: string) => {
// //     const date = new Date(dateStr)
// //     return date.toLocaleDateString('fr-FR')
// //   }

// //   const getMotifDisplay = (visite: Visite) => {
// //     return visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif
// //   }

// //   const SortIcon = ({ field }: { field: SortField }) => {
// //     if (sortField !== field) return <ChevronDown className="h-3 w-3 text-gray-400" />
// //     return sortOrder === 'asc' ? 
// //       <ChevronUp className="h-3 w-3 text-blue-500" /> : 
// //       <ChevronDown className="h-3 w-3 text-blue-500" />
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Chargement de l'historique...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* En-tête */}
// //         <div className="mb-8">
// //           <h1 className="text-2xl font-bold text-gray-900">Historique des visites</h1>
// //           <p className="text-gray-500 mt-1">Consultez l'historique des visites par période</p>
// //         </div>

// //         {/* Filtres */}
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
// //           <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
// //             <Filter className="h-4 w-4" />
// //             Filtres
// //           </h2>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
// //             {/* Date Début */}
// //             <div>
// //               <label className="block text-xs font-medium text-gray-500 mb-1">
// //                 Date de Début
// //               </label>
// //               <input
// //                 type="date"
// //                 value={dateDebut}
// //                 onChange={(e) => setDateDebut(e.target.value)}
// //                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>

// //             {/* Date Fin */}
// //             <div>
// //               <label className="block text-xs font-medium text-gray-500 mb-1">
// //                 Date de Fin
// //               </label>
// //               <input
// //                 type="date"
// //                 value={dateFin}
// //                 onChange={(e) => setDateFin(e.target.value)}
// //                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
// //               />
// //             </div>

// //             {/* Bouton Filtrer */}
// //             <div>
// //               <button
// //                 onClick={handleFiltrer}
// //                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 text-sm font-medium"
// //               >
// //                 <Search className="h-4 w-4" />
// //                 Filtrer
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Cartes Statistiques */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
// //             <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
// //             <div className="text-sm text-gray-500">Total Visites</div>
// //           </div>
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
// //             <div className="text-2xl font-bold text-green-600">{stats.recues}</div>
// //             <div className="text-sm text-gray-500">Reçues</div>
// //           </div>
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
// //             <div className="text-2xl font-bold text-yellow-600">{stats.enAttente}</div>
// //             <div className="text-sm text-gray-500">En attente</div>
// //           </div>
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
// //             <div className="text-2xl font-bold text-red-600">{stats.annulees}</div>
// //             <div className="text-sm text-gray-500">Annulées</div>
// //           </div>
// //         </div>

// //         {/* Tableau */}
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="border-b border-gray-200 bg-gray-50">
// //                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('date')}>
// //                     <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                       Date <SortIcon field="date" />
// //                     </div>
// //                   </th>
// //                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('heure')}>
// //                     <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                       Heure <SortIcon field="heure" />
// //                     </div>
// //                   </th>
// //                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('nom')}>
// //                     <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                       Nom du Visiteur <SortIcon field="nom" />
// //                     </div>
// //                   </th>
// //                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('telephone')}>
// //                     <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                       Téléphone <SortIcon field="telephone" />
// //                     </div>
// //                   </th>
// //                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('motif')}>
// //                     <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                       Motif <SortIcon field="motif" />
// //                     </div>
// //                   </th>
// //                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('statut')}>
// //                     <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                       Statut <SortIcon field="statut" />
// //                     </div>
// //                   </th>
// //                   <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('cree_par')}>
// //                     <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
// //                       Créé par <SortIcon field="cree_par" />
// //                     </div>
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredVisites.map((visite, index) => (
// //                   <tr 
// //                     key={visite.id} 
// //                     className={`border-b border-gray-100 hover:bg-gray-50 transition ${
// //                       index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
// //                     }`}
// //                   >
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center gap-1">
// //                         <Calendar className="h-3 w-3 text-gray-400" />
// //                         <span className="text-sm text-gray-700">{formatDate(visite.date_visite)}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center gap-1">
// //                         <Clock className="h-3 w-3 text-gray-400" />
// //                         <span className="text-sm text-gray-700">{visite.heure}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center gap-2">
// //                         <User className="h-3 w-3 text-gray-400" />
// //                         <span className="text-sm font-medium text-gray-800">{visite.nom_visiteur}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center gap-1">
// //                         <Phone className="h-3 w-3 text-gray-400" />
// //                         <span className="text-sm text-gray-600">{visite.telephone}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center gap-1">
// //                         <Tag className="h-3 w-3 text-gray-400" />
// //                         <span className="text-sm text-gray-700">{getMotifDisplay(visite)}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(visite.statut)}`}>
// //                         {visite.statut}
// //                       </span>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center gap-1">
// //                         <User className="h-3 w-3 text-gray-400" />
// //                         <span className="text-sm text-gray-600">
// //                           {visite.cree_par?.nom_complet || 'Inconnu'}
// //                         </span>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Message si aucun résultat */}
// //           {filteredVisites.length === 0 && (
// //             <div className="text-center py-12">
// //               <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
// //                 <Calendar className="h-8 w-8 text-gray-400" />
// //               </div>
// //               <p className="text-gray-500">Aucune visite trouvée</p>
// //               <p className="text-sm text-gray-400 mt-1">Essayez de modifier les dates</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Légende des statuts */}
// //         <div className="mt-6 flex flex-wrap gap-4 justify-end">
// //           <div className="flex items-center gap-2">
// //             <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
// //             <span className="text-xs text-gray-600">En attente</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="w-3 h-3 rounded-full bg-blue-500"></span>
// //             <span className="text-xs text-gray-600">Confirmée</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="w-3 h-3 rounded-full bg-green-500"></span>
// //             <span className="text-xs text-gray-600">Reçue</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="w-3 h-3 rounded-full bg-red-500"></span>
// //             <span className="text-xs text-gray-600">Annulée</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="w-3 h-3 rounded-full bg-orange-500"></span>
// //             <span className="text-xs text-gray-600">Reportée</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // app/historique/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { format, parseISO, subDays } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import { 
//   Calendar, 
//   Users, 
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   CheckCircle,
//   XCircle,
//   TrendingUp,
//   Search,
//   Filter,
//   Phone,
//   User,
//   Tag
// } from 'lucide-react';
// import { getAllVisites } from '@/actions/visites';

// // Types
// interface Visite {
//   id: number;
//   nom_visiteur: string;
//   telephone: string;
//   sexe: string;
//   est_membre: boolean;
//   membre_id: number | null;
//   motif: string;
//   autre_motif: string | null;
//   date_visite: string;
//   heure: string;
//   observations: string | null;
//   statut: string;
//   cree_par: number;
//   cree_par_nom?: string;
//   membre?: {
//     nom_complet: string;
//     membre_profile: string;
//   };
// }

// interface Statistiques {
//   total: number;
//   recues: number;
//   en_attente: number;
//   annulees: number;
//   reportees: number;
// }

// export default function HistoriquePage() {
//   const [visites, setVisites] = useState<Visite[]>([]);
//   const [filteredVisites, setFilteredVisites] = useState<Visite[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState<Statistiques>({
//     total: 0,
//     recues: 0,
//     en_attente: 0,
//     annulees: 0,
//     reportees: 0
//   });
  
//   // Filtres
//   const [dateDebut, setDateDebut] = useState(() => {
//     const date = new Date();
//     date.setDate(1);
//     return format(date, 'yyyy-MM-dd');
//   });
//   const [dateFin, setDateFin] = useState(() => format(new Date(), 'yyyy-MM-dd'));
//   const [applyFilter, setApplyFilter] = useState(false);

//   // Charger toutes les visites
//   const loadVisites = async () => {
//     setLoading(true);
//     const result = await getAllVisites();
    
//     if (result.success && result.data) {
//       const allVisites = result.data as Visite[];
      
//       // Filtrer par date
//       const filtered = allVisites.filter(visite => {
//         const visiteDate = visite.date_visite;
//         return visiteDate >= dateDebut && visiteDate <= dateFin;
//       });
      
//       setVisites(filtered);
//       setFilteredVisites(filtered);
      
//       // Calculer les statistiques
//       const recues = filtered.filter(v => v.statut === 'Reçue' || v.statut === 'Confirmée').length;
//       const en_attente = filtered.filter(v => v.statut === 'En attente').length;
//       const annulees = filtered.filter(v => v.statut === 'Annulé' || v.statut === 'Annulée').length;
//       const reportees = filtered.filter(v => v.statut === 'Reportée').length;
      
//       setStats({
//         total: filtered.length,
//         recues,
//         en_attente,
//         annulees,
//         reportees
//       });
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadVisites();
//   }, [applyFilter]);

//   const handleFiltrer = () => {
//     setApplyFilter(!applyFilter);
//   };

//   const getStatutColor = (statut: string) => {
//     switch(statut) {
//       case 'En attente': return 'bg-yellow-100 text-yellow-800';
//       case 'Confirmée': return 'bg-green-100 text-green-800';
//       case 'Reçue': return 'bg-green-100 text-green-800';
//       case 'Reportée': return 'bg-orange-100 text-orange-800';
//       case 'Annulé':
//       case 'Annulée': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatutIcon = (statut: string) => {
//     switch(statut) {
//       case 'En attente': return <Clock className="w-3 h-3" />;
//       case 'Confirmée':
//       case 'Reçue': return <CheckCircle className="w-3 h-3" />;
//       case 'Reportée': return <Clock className="w-3 h-3" />;
//       case 'Annulé':
//       case 'Annulée': return <XCircle className="w-3 h-3" />;
//       default: return null;
//     }
//   };

//   const getMotifIcon = (motif: string) => {
//     switch(motif) {
//       case 'Conseil': return '💬';
//       case 'Prière': return '🙏';
//       case 'Orientation': return '🎯';
//       default: return '📝';
//     }
//   };

//   const formatDate = (dateStr: string) => {
//     const date = parseISO(dateStr);
//     return format(date, 'dd/MM/yyyy');
//   };

//   const getMotifDisplay = (visite: Visite) => {
//     return visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Historique des visites</h1>
//             <p className="text-sm text-gray-500 mt-1">Consultez l'historique des visites par période</p>
//           </div>
//         </div>

//         {/* Filtres avec le même design que le tableau des visites */}
//         <div className="bg-white  shadow-sm p-5 mb-6 border border-gray-200">
//           <div className="flex items-center gap-2 mb-4">
//             <Filter className="w-4 h-4 text-gray-500" />
//             <h2 className="text-sm font-semibold text-gray-700">Filtres</h2>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">
//                 Date de Début
//               </label>
//               <input
//                 type="date"
//                 value={dateDebut}
//                 onChange={(e) => setDateDebut(e.target.value)}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">
//                 Date de Fin
//               </label>
//               <input
//                 type="date"
//                 value={dateFin}
//                 onChange={(e) => setDateFin(e.target.value)}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <button
//                 onClick={handleFiltrer}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 text-sm font-medium"
//               >
//                 <Search className="w-4 h-4" />
//                 Filtrer
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Cartes statistiques - MÊME DESIGN que la page des visites */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           {/* Total */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-blue-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total visites</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
//               </div>
//               <Users className="w-6 h-6 text-blue-500" />
//             </div>
//           </div>
          
//           {/* Reçues */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-green-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Reçues</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.recues}</p>
//               </div>
//               <CheckCircle className="w-6 h-6 text-green-500" />
//             </div>
//           </div>
          
//           {/* En attente */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-yellow-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">En attente</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.en_attente}</p>
//               </div>
//               <Clock className="w-6 h-6 text-yellow-500" />
//             </div>
//           </div>
          
//           {/* Reportées */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-orange-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Reportées</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.reportees}</p>
//               </div>
//               <Clock className="w-6 h-6 text-orange-500" />
//             </div>
//           </div>
          
//           {/* Annulées */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-red-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Annulées</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.annulees}</p>
//               </div>
//               <XCircle className="w-6 h-6 text-red-500" />
//             </div>
//           </div>
//         </div>

//         {/* Période affichée */}
//         <div className="mb-4 pb-2 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <Calendar className="w-5 h-5 text-gray-500" />
//             Période du {format(parseISO(dateDebut), 'dd MMMM yyyy', { locale: fr })} au {format(parseISO(dateFin), 'dd MMMM yyyy', { locale: fr })}
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             {visites.length} visite{visites.length > 1 ? 's' : ''} trouvée{visites.length > 1 ? 's' : ''}
//           </p>
//         </div>

//         {/* Tableau des visites - MÊME DESIGN que la page des visites */}
//         <div className="bg-white  shadow-sm overflow-hidden border border-gray-200">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
//             </div>
//           ) : visites.length === 0 ? (
//             <div className="text-center py-12">
//               <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500">Aucune visite trouvée pour cette période</p>
//               <p className="text-sm text-gray-400 mt-1">Essayez de modifier les dates</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Heure</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Nom du Visiteur</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Téléphone</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Motif</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Membre</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Statut</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Créé par</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {visites.map((visite) => (
//                     <tr key={visite.id} className="hover:bg-gray-50 transition">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm font-medium text-gray-900">{formatDate(visite.date_visite)}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm text-gray-900">{visite.heure}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <User className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <Phone className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm text-gray-600">{visite.telephone}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <span className="text-lg">{getMotifIcon(visite.motif)}</span>
//                           <span className="text-sm text-gray-700">{getMotifDisplay(visite)}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs rounded-full ${visite.est_membre ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
//                           {visite.est_membre ? 'Membre' : 'Non-membre'}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatutColor(visite.statut)}`}>
//                           {getStatutIcon(visite.statut)}
//                           {visite.statut}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <User className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm text-gray-600">{visite.cree_par_nom || 'Emmanuel'}</span>
//                         </div>
//                        </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Légende des statuts */}
//         <div className="mt-6 flex flex-wrap gap-4 justify-center">
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
//             <span className="text-xs text-gray-600">En attente</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-green-500"></span>
//             <span className="text-xs text-gray-600">Reçue/Confirmée</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-orange-500"></span>
//             <span className="text-xs text-gray-600">Reportée</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-red-500"></span>
//             <span className="text-xs text-gray-600">Annulée</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/historique/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Calendar, 
  Users, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  XCircle,
  TrendingUp,
  Search,
  Filter,
  Phone,
  User,
  Tag,
  UserCircle,
  UserCircle2
} from 'lucide-react';
import { getAllVisites } from '@/actions/visites';

// Types
interface Visite {
  id: number;
  nom_visiteur: string;
  telephone: string;
  sexe: string;
  est_membre: boolean;
  membre_id: number | null;
  motif: string;
  autre_motif: string | null;
  date_visite: string;
  heure: string;
  observations: string | null;
  statut: string;
  cree_par: number;
  cree_par_nom?: string;
  membre?: {
    nom_complet: string;
    membre_profile: string;
  };
}

interface Statistiques {
  total: number;
  recues: number;
  en_attente: number;
  annulees: number;
  reportees: number;
}

export default function HistoriquePage() {
  const [visites, setVisites] = useState<Visite[]>([]);
  const [filteredVisites, setFilteredVisites] = useState<Visite[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Statistiques>({
    total: 0,
    recues: 0,
    en_attente: 0,
    annulees: 0,
    reportees: 0
  });
  
  // Filtres
  const [dateDebut, setDateDebut] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return format(date, 'yyyy-MM-dd');
  });
  const [dateFin, setDateFin] = useState(() => format(new Date(), 'yyyy-MM-dd'));

  // Fonction pour formater une date en français
  const formatDateFr = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return format(date, 'dd MMMM yyyy', { locale: fr });
    } catch {
      return '';
    }
  };

  // Charger toutes les visites
  const loadVisites = async () => {
    setLoading(true);
    const result = await getAllVisites();
    
    if (result.success && result.data) {
      const allVisites = result.data as Visite[];
      
      // Filtrer par date
      const filtered = allVisites.filter(visite => {
        const visiteDate = visite.date_visite;
        return visiteDate >= dateDebut && visiteDate <= dateFin;
      });
      
      setVisites(filtered);
      setFilteredVisites(filtered);
      
      // Calculer les statistiques
      const recues = filtered.filter(v => v.statut === 'Reçue' || v.statut === 'Confirmée').length;
      const en_attente = filtered.filter(v => v.statut === 'En attente').length;
      const annulees = filtered.filter(v => v.statut === 'Annulé' || v.statut === 'Annulée').length;
      const reportees = filtered.filter(v => v.statut === 'Reportée').length;
      
      setStats({
        total: filtered.length,
        recues,
        en_attente,
        annulees,
        reportees
      });
    }
    setLoading(false);
  };

  // Recharger quand les dates changent
  useEffect(() => {
    loadVisites();
  }, [dateDebut, dateFin]);

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmée': return 'bg-green-100 text-green-800';
      case 'Reçue': return 'bg-green-100 text-green-800';
      case 'Reportée': return 'bg-orange-100 text-orange-800';
      case 'Annulé':
      case 'Annulée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch(statut) {
      case 'En attente': return <Clock className="w-3 h-3" />;
      case 'Confirmée':
      case 'Reçue': return <CheckCircle className="w-3 h-3" />;
      case 'Reportée': return <Clock className="w-3 h-3" />;
      case 'Annulé':
      case 'Annulée': return <XCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const getMotifIcon = (motif: string) => {
    switch(motif) {
      case 'Conseil': return '💬';
      case 'Prière': return '🙏';
      case 'Orientation': return '🎯';
      default: return '📝';
    }
  };

  const formatDateTable = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return format(date, 'dd/MM/yyyy');
    } catch {
      return '';
    }
  };

  const getMotifDisplay = (visite: Visite) => {
    return visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 py-6">
        
       

        {/* Filtres */}
        <div className="bg-white  shadow-sm p-5 mb-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700">Filtres</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Date de Début
              </label>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Date de Fin
              </label>
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total */}
          <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-blue-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total visites</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          
          {/* Reçues */}
          <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-green-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Reçues</p>
                <p className="text-2xl font-bold text-gray-800">{stats.recues}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          
          {/* En attente */}
          <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-yellow-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">En attente</p>
                <p className="text-2xl font-bold text-gray-800">{stats.en_attente}</p>
              </div>
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          
          {/* Reportées */}
          <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-orange-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Reportées</p>
                <p className="text-2xl font-bold text-gray-800">{stats.reportees}</p>
              </div>
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          
          {/* Annulées */}
          <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-red-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Annulées</p>
                <p className="text-2xl font-bold text-gray-800">{stats.annulees}</p>
              </div>
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        {/* Période affichée */}
        <div className="mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            Période du {formatDateFr(dateDebut)} au {formatDateFr(dateFin)}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {visites.length} visite{visites.length > 1 ? 's' : ''} trouvée{visites.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Tableau des visites */}
        <div className="bg-white  shadow-sm overflow-hidden border border-gray-200">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : visites.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune visite trouvée pour cette période</p>
              <p className="text-sm text-gray-400 mt-1">Essayez de modifier les dates</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Heure</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Nom du Visiteur</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Téléphone</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Motif</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Membre</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Statut</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Créé par</th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visites.map((visite) => (
                    <tr key={visite.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{formatDateTable(visite.date_visite)}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{visite.heure}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <UserCircle className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{visite.telephone}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getMotifIcon(visite.motif)}</span>
                          <span className="text-sm text-gray-700">{getMotifDisplay(visite)}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${visite.est_membre ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {visite.est_membre ? 'Membre' : 'Non-membre'}
                        </span>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatutColor(visite.statut)}`}>
                          {getStatutIcon(visite.statut)}
                          {visite.statut}
                        </span>
                       </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{visite.cree_par_nom || 'Emmanuel'}</span>
                        </div>
                       </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Légende des statuts */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="text-xs text-gray-600">En attente</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-xs text-gray-600">Reçue/Confirmée</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span className="text-xs text-gray-600">Reportée</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-xs text-gray-600">Annulée</span>
          </div>
        </div>
      </div>
    </div>
  );
}