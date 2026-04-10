
// // app/secretaire/statistiques/page.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts'
// import { Calendar, Users, Clock, CheckCircle, XCircle, AlertCircle, Download, ChevronLeft, ChevronRight } from 'lucide-react'
// import { getStatistiques, getAllVisites } from '@/actions/visites'

// // Types
// interface Statistiques {
//   total: number
//   par_motif: Record<string, number>
//   par_statut: Record<string, number>
//   par_jour: Record<string, number>
// }

// interface Visite {
//   id: number
//   nom_visiteur: string
//   telephone: string
//   motif: string
//   statut: string
//   date_visite: string
//   heure: string
//   est_membre: boolean
//   observations?: string
// }

// const STATUT_COLORS: Record<string, string> = {
//   'Reçue': '#10B981',
//   'Confirmée': '#10B981',
//   'En attente': '#F59E0B',
//   'Annulée': '#EF4444',
// }

// const DEFAULT_COLOR = '#9CA3AF'
// const MOTIF_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16', '#F97316']

// export default function StatistiquesPage() {
//   // États pour les dates affichées dans les inputs
//   const [dateDebutInput, setDateDebutInput] = useState('')
//   const [dateFinInput, setDateFinInput] = useState('')
  
//   // États pour les dates utilisées pour le filtrage
//   const [dateDebut, setDateDebut] = useState('')
//   const [dateFin, setDateFin] = useState('')
  
//   const [statistiques, setStatistiques] = useState<Statistiques | null>(null)
//   const [visites, setVisites] = useState<Visite[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
  
//   // État pour la pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5

//   // Calculer les dates par défaut (il y a une semaine jusqu'à aujourd'hui)
//   const getDefaultDates = () => {
//     const today = new Date()
//     const oneWeekAgo = new Date()
//     oneWeekAgo.setDate(today.getDate() - 7)
    
//     const formatDate = (date: Date) => {
//       const year = date.getFullYear()
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       return `${year}-${month}-${day}`
//     }
    
//     return {
//       debut: formatDate(oneWeekAgo),
//       fin: formatDate(today)
//     }
//   }

//   // Initialiser les dates par défaut au chargement
//   useEffect(() => {
//     const defaultDates = getDefaultDates()
//     setDateDebutInput(defaultDates.debut)
//     setDateFinInput(defaultDates.fin)
//     setDateDebut(defaultDates.debut)
//     setDateFin(defaultDates.fin)
//   }, [])

//   // Charger les statistiques quand les dates de filtrage changent
//   useEffect(() => {
//     if (dateDebut && dateFin) {
//       loadStatistiques()
//     }
//   }, [dateDebut, dateFin])

//   // Réinitialiser la page quand les visites changent
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [visites])

//   const loadStatistiques = async () => {
//     setLoading(true)
//     setError(null)
    
//     try {
//       const statsResult = await getStatistiques(dateDebut, dateFin)
      
//       if (!statsResult.success) {
//         setError(statsResult.error || 'Erreur lors du chargement des statistiques')
//         setLoading(false)
//         return
//       }
      
//       setStatistiques(statsResult.stats)
      
//       const visitesResult = await getAllVisites()
      
//       if (visitesResult.success && visitesResult.data) {
//         const filteredVisites = visitesResult.data.filter((visite: Visite) => {
//           return visite.date_visite >= dateDebut && visite.date_visite <= dateFin
//         })
//         setVisites(filteredVisites)
//       }
      
//     } catch (err) {
//       setError('Erreur lors du chargement des statistiques')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Appliquer le filtre manuellement
//   const handleApplyFilter = () => {
//     if (dateDebutInput && dateFinInput) {
//       setDateDebut(dateDebutInput)
//       setDateFin(dateFinInput)
//     }
//   }

//   // Réinitialiser les filtres
//   const handleResetFilter = () => {
//     const defaultDates = getDefaultDates()
//     setDateDebutInput(defaultDates.debut)
//     setDateFinInput(defaultDates.fin)
//     setDateDebut(defaultDates.debut)
//     setDateFin(defaultDates.fin)
//   }

//   // Préparer les données pour les graphiques
//   const prepareDataParStatut = () => {
//     if (!statistiques) return []
//     return Object.entries(statistiques.par_statut).map(([name, value]) => ({
//       name,
//       value,
//       color: STATUT_COLORS[name] || DEFAULT_COLOR
//     }))
//   }

//   const prepareDataParMotif = () => {
//     if (!statistiques) return []
//     return Object.entries(statistiques.par_motif)
//       .map(([name, value]) => ({ name, value }))
//       .sort((a, b) => b.value - a.value)
//   }

//   const prepareDataParJour = () => {
//     if (!statistiques) return []
    
//     // Convertir l'objet en tableau et trier par date
//     let data = Object.entries(statistiques.par_jour)
//       .map(([date, visites]) => ({ date, visites }))
//       .sort((a, b) => a.date.localeCompare(b.date))
    
//     // Si la période est longue (plus de 31 jours), on peut agréger par semaine
//     const startDate = new Date(dateDebut)
//     const endDate = new Date(dateFin)
//     const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    
//     if (daysDiff > 31) {
//       // Agréger par semaine
//       const weeklyData: Record<string, number> = {}
//       data.forEach(item => {
//         const date = new Date(item.date)
//         const weekNumber = getWeekNumber(date)
//         const year = date.getFullYear()
//         const weekKey = `${year}-S${weekNumber}`
//         weeklyData[weekKey] = (weeklyData[weekKey] || 0) + item.visites
//       })
      
//       data = Object.entries(weeklyData)
//         .map(([week, visites]) => ({ date: week, visites }))
//         .sort((a, b) => a.date.localeCompare(b.date))
//     }
    
//     return data
//   }

//   // Helper pour obtenir le numéro de semaine
//   const getWeekNumber = (date: Date) => {
//     const d = new Date(date)
//     d.setHours(0, 0, 0, 0)
//     d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
//     const week1 = new Date(d.getFullYear(), 0, 4)
//     return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
//   }

//   // Statistiques supplémentaires
//   const getMembresVsNonMembres = () => {
//     const membres = visites.filter(v => v.est_membre).length
//     const nonMembres = visites.filter(v => !v.est_membre).length
//     return [
//       { name: 'Membres', value: membres, color: '#3B82F6' },
//       { name: 'Non-Membres', value: nonMembres, color: '#9CA3AF' }
//     ]
//   }

//   const getTauxCompletion = () => {
//     if (!statistiques) return 0
//     const recues = statistiques.par_statut['Reçue'] || 0
//     const confirmees = statistiques.par_statut['Confirmée'] || 0
//     const totalRecues = recues + confirmees
//     return statistiques.total > 0 ? (totalRecues / statistiques.total) * 100 : 0
//   }

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const currentVisites = visites.slice(indexOfFirstItem, indexOfLastItem)
//   const totalPages = Math.ceil(visites.length / itemsPerPage)

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   // Custom Tooltip pour éviter l'erreur percent
//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload
//       const total = prepareDataParStatut().reduce((sum, item) => sum + item.value, 0)
//       const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : 0
//       return (
//         <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
//           <p className="font-semibold text-gray-900">{data.name}</p>
//           <p className="text-gray-600">Nombre: <span className="font-bold">{data.value}</span></p>
//           <p className="text-gray-600">Pourcentage: <span className="font-bold">{percentage}%</span></p>
//         </div>
//       )
//     }
//     return null
//   }

//   if (loading && !statistiques) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-gray-200/40 border-t-4 border-r-4 border-r-gray-200/40 border-l-4 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
//         <p className="text-red-600">{error}</p>
//       </div>
//     )
//   }

//   const statutData = prepareDataParStatut()
//   const totalVisites = statutData.reduce((sum, item) => sum + item.value, 0)

//   return (
//     <div className="p-6 space-y-6">
//       {/* En-tête */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Statistiques des Visites</h1>
//           <p className="text-gray-600 mt-1">Analyse détaillée des visites sur la période</p>
//         </div>
        
//         {/* Filtres de date */}
//         <div className="flex gap-3 items-end">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
//             <input
//               type="date"
//               value={dateDebutInput}
//               onChange={(e) => setDateDebutInput(e.target.value)}
//               className="border text-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
//             <input
//               type="date"
//               value={dateFinInput}
//               onChange={(e) => setDateFinInput(e.target.value)}
//               className="border text-sm  px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <button
//             onClick={handleApplyFilter}
//             className="bg-green-600 text-sm text-white px-4 py-2  hover:bg-green-700 transition-colors"
//           >
//             Appliquer
//           </button>
//           <button
//             onClick={handleResetFilter}
//             className="bg-gray-200 text-gray-700 px-4 py-2 text-sm hover:bg-gray-300 transition-colors"
//           >
//             Réinitialiser
//           </button>
//         </div>
//       </div>

//       {/* Cartes KPI */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded- shadow-sm border border-gray-200 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Visites</p>
//               <p className="text-2xl font-bold text-gray-900">{statistiques?.total || 0}</p>
//             </div>
//             <div className="bg-blue-100 rounded-full p-3">
//               <Users className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded- shadow-sm border border-gray-200 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Visites Reçues</p>
//               <p className="text-2xl font-bold text-green-600">
//                 {(statistiques?.par_statut['Reçue'] || 0) + (statistiques?.par_statut['Confirmée'] || 0)}
//               </p>
//             </div>
//             <div className="bg-green-100 rounded-full p-3">
//               <CheckCircle className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded- shadow-sm border border-gray-200 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">En Attente</p>
//               <p className="text-2xl font-bold text-yellow-600">{statistiques?.par_statut['En attente'] || 0}</p>
//             </div>
//             <div className="bg-yellow-100 rounded-full p-3">
//               <Clock className="w-6 h-6 text-yellow-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded- shadow-sm border border-gray-200 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Taux de Complétion</p>
//               <p className="text-2xl font-bold text-purple-600">{getTauxCompletion().toFixed(1)}%</p>
//             </div>
//             <div className="bg-purple-100 rounded-full p-3">
//               <AlertCircle className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Graphiques */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Graphique des visites par jour */}
//         <div className="bg-white rounded- shadow-sm border border-gray-200 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">
//             Visites par {prepareDataParJour().length > 0 && prepareDataParJour()[0]?.date?.includes('S') ? 'Semaine' : 'Jour'}
//           </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={prepareDataParJour()}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis 
//                 dataKey="date" 
//                 angle={prepareDataParJour().length > 10 ? -45 : 0}
//                 textAnchor={prepareDataParJour().length > 10 ? "end" : "middle"}
//                 height={prepareDataParJour().length > 10 ? 60 : 30}
//                 interval={prepareDataParJour().length > 20 ? Math.floor(prepareDataParJour().length / 10) : 0}
//               />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="visites" 
//                 stroke="#3B82F6" 
//                 strokeWidth={2} 
//                 dot={{ fill: '#3B82F6', r: 4 }}
//                 activeDot={{ r: 6 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//           {prepareDataParJour().length > 20 && (
//             <p className="text-xs text-gray-500 text-center mt-2">
//               * L'axe X montre un échantillon des dates pour une meilleure lisibilité
//             </p>
//           )}
//         </div>

//         {/* Graphique des statuts en Doughnut avec légende en bas */}
//         <div className="bg-white rounded- shadow-sm border border-gray-200 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Visites par Statut</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={statutData}
//                 cx="50%"
//                 cy="45%"
//                 innerRadius={60}
//                 outerRadius={90}
//                 paddingAngle={2}
//                 dataKey="value"
//                 stroke="none"
//               >
//                 {statutData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//           {/* Légende en bas */}
//           <div className="flex flex-wrap justify-center gap-4 mt-4 pt-2 border-t border-gray-100">
//             {statutData.map((item, index) => {
//               const percentage = totalVisites > 0 ? ((item.value / totalVisites) * 100).toFixed(1) : 0
//               return (
//                 <div key={index} className="flex items-center gap-2">
//                   <div 
//                     className="w-3 h-3 rounded-full" 
//                     style={{ backgroundColor: item.color }}
//                   />
//                   <span className="text-sm text-gray-700">
//                     {item.name}: <span className="font-semibold">{item.value}</span>
//                     <span className="text-gray-500 text-xs ml-1">({percentage}%)</span>
//                   </span>
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         {/* Graphique des motifs */}
//         <div className="bg-white rounded- shadow-sm border border-gray-200 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Visites par Motif</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={prepareDataParMotif()} layout="vertical">
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis type="number" />
//               <YAxis type="category" dataKey="name" width={100} />
//               <Tooltip />
//               <Bar dataKey="value" fill="#3B82F6">
//                 {prepareDataParMotif().map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={MOTIF_COLORS[index % MOTIF_COLORS.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Membres vs Non-Membres */}
//         <div className="bg-white rounded- shadow-sm border border-gray-200 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Membres vs Non-Membres</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={getMembresVsNonMembres()}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => {
//                   const percentage = percent ? (percent * 100).toFixed(0) : '0'
//                   return `${name}: ${percentage}%`
//                 }}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {getMembresVsNonMembres().map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Tableau des visites récentes avec pagination */}
//       <div className="bg-white rounded- shadow-sm border border-gray-200 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-gray-900">Détail des Visites</h2>
//           <div className="text-sm text-gray-500">
//             Total: <span className="font-semibold">{visites.length}</span> visites
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visiteur</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motif</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {currentVisites.map((visite) => (
//                 <tr key={visite.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</div>
//                     <div className="text-sm text-gray-500">{visite.telephone}</div>
//                    </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visite.date_visite}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visite.heure}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visite.motif}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       visite.statut === 'Reçue' || visite.statut === 'Confirmée' ? 'bg-green-100 text-green-800' :
//                       visite.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
//                       visite.statut === 'Annulée' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {visite.statut}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       visite.est_membre ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {visite.est_membre ? 'Membre' : 'Non-Membre'}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//               {visites.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
//                     Aucune visite trouvée sur cette période
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         {/* Pagination */}
//         {visites.length > 0 && (
//           <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//             <div className="text-sm text-gray-500">
//               Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, visites.length)} sur {visites.length} visites
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={handlePrevPage}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded-md flex items-center gap-1 ${
//                   currentPage === 1
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <ChevronLeft className="w-4 h-4" />
//                 Précédent
//               </button>
//               <div className="flex gap-1">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`px-3 py-1 rounded-md ${
//                       currentPage === page
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//               </div>
//               <button
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 rounded-md flex items-center gap-1 ${
//                   currentPage === totalPages
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Suivant
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// app/secretaire/statistiques/page.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Calendar, Users, Clock, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { getStatistiques, getAllVisites } from '@/actions/visites'

// Types
interface Statistiques {
  total: number
  par_motif: Record<string, number>
  par_statut: Record<string, number>
  par_jour: Record<string, number>
}

interface Visite {
  id: number
  nom_visiteur: string
  telephone: string
  motif: string
  statut: string
  date_visite: string
  heure: string
  est_membre: boolean
  observations?: string
}

const STATUT_COLORS: Record<string, string> = {
  'Reçue': '#10B981',
  'Confirmée': '#10B981',
  'En attente': '#F59E0B',
  'Annulée': '#EF4444',
}

const DEFAULT_COLOR = '#9CA3AF'
const MOTIF_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16', '#F97316']

export default function StatistiquesPage() {
  // États pour les dates affichées dans les inputs
  const [dateDebutInput, setDateDebutInput] = useState('')
  const [dateFinInput, setDateFinInput] = useState('')
  
  // États pour les dates utilisées pour le filtrage
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  
  const [statistiques, setStatistiques] = useState<Statistiques | null>(null)
  const [visites, setVisites] = useState<Visite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Flag pour éviter les appels multiples (comme dans TableauVisites)
  const [hasLoaded, setHasLoaded] = useState(false)
  const isMounted = useRef(true)

  // Calculer les dates par défaut (il y a une semaine jusqu'à aujourd'hui)
  const getDefaultDates = () => {
    const today = new Date()
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(today.getDate() - 7)
    
    const formatDate = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    
    return {
      debut: formatDate(oneWeekAgo),
      fin: formatDate(today)
    }
  }

  // Initialiser les dates par défaut au chargement (une seule fois)
  useEffect(() => {
    const defaultDates = getDefaultDates()
    setDateDebutInput(defaultDates.debut)
    setDateFinInput(defaultDates.fin)
    setDateDebut(defaultDates.debut)
    setDateFin(defaultDates.fin)
  }, [])

  // Fonction pour charger toutes les données (similaire à TableauVisites)
  const loadAllData = useCallback(async (debut: string, fin: string) => {
    if (!debut || !fin) return
    
    try {
      setLoading(true)
      setError(null)
      
      console.log('📊 Chargement des statistiques pour la période:', debut, '->', fin)
      
      // Charger les statistiques
      const statsResult = await getStatistiques(debut, fin)
      
      if (!statsResult.success) {
        throw new Error(statsResult.error || 'Erreur lors du chargement des statistiques')
      }
      
      if (isMounted.current) {
        setStatistiques(statsResult.stats)
      }
      
      // Charger TOUTES les visites (comme dans TableauVisites)
      console.log('📋 Chargement de toutes les visites...')
      const visitesResult = await getAllVisites()
      
      if (!visitesResult.success) {
        throw new Error(visitesResult.error || 'Erreur lors du chargement des visites')
      }
      
      if (visitesResult.data && Array.isArray(visitesResult.data) && isMounted.current) {
        console.log(`✅ ${visitesResult.data.length} visites chargées au total`)
        
        // Filtrer les visites par date
        const filteredVisites = visitesResult.data.filter((visite: Visite) => {
          return visite.date_visite >= debut && visite.date_visite <= fin
        })
        
        console.log(`📊 ${filteredVisites.length} visites dans la période sélectionnée`)
        setVisites(filteredVisites)
      } else if (isMounted.current) {
        setVisites([])
      }
      
    } catch (err) {
      console.error('❌ Erreur dans loadAllData:', err)
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données')
      }
    } finally {
      if (isMounted.current) {
        setLoading(false)
      }
    }
  }, [])

  // Charger les données quand les dates changent et que le composant est monté
  useEffect(() => {
    if (dateDebut && dateFin && !hasLoaded) {
      loadAllData(dateDebut, dateFin)
      setHasLoaded(true)
    }
  }, [dateDebut, dateFin, loadAllData, hasLoaded])

  // Réinitialiser hasLoaded quand les dates changent (pour recharger)
  useEffect(() => {
    if (dateDebut && dateFin) {
      setHasLoaded(false)
    }
  }, [dateDebut, dateFin])

  // Nettoyage du composant
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // Réinitialiser la page quand les visites changent
  useEffect(() => {
    setCurrentPage(1)
  }, [visites])

  // Appliquer le filtre manuellement
  const handleApplyFilter = () => {
    if (dateDebutInput && dateFinInput) {
      setDateDebut(dateDebutInput)
      setDateFin(dateFinInput)
    }
  }

  // Réinitialiser les filtres
  const handleResetFilter = () => {
    const defaultDates = getDefaultDates()
    setDateDebutInput(defaultDates.debut)
    setDateFinInput(defaultDates.fin)
    setDateDebut(defaultDates.debut)
    setDateFin(defaultDates.fin)
  }

  // Préparer les données pour les graphiques
  const prepareDataParStatut = () => {
    if (!statistiques) return []
    return Object.entries(statistiques.par_statut).map(([name, value]) => ({
      name,
      value,
      color: STATUT_COLORS[name] || DEFAULT_COLOR
    }))
  }

  const prepareDataParMotif = () => {
    if (!statistiques) return []
    return Object.entries(statistiques.par_motif)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }

  const prepareDataParJour = () => {
    if (!statistiques) return []
    
    // Convertir l'objet en tableau et trier par date
    let data = Object.entries(statistiques.par_jour)
      .map(([date, visites]) => ({ date, visites }))
      .sort((a, b) => a.date.localeCompare(b.date))
    
    // Si la période est longue (plus de 31 jours), on peut agréger par semaine
    const startDate = new Date(dateDebut)
    const endDate = new Date(dateFin)
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    
    if (daysDiff > 31) {
      // Agréger par semaine
      const weeklyData: Record<string, number> = {}
      data.forEach(item => {
        const date = new Date(item.date)
        const weekNumber = getWeekNumber(date)
        const year = date.getFullYear()
        const weekKey = `${year}-S${weekNumber}`
        weeklyData[weekKey] = (weeklyData[weekKey] || 0) + item.visites
      })
      
      data = Object.entries(weeklyData)
        .map(([week, visites]) => ({ date: week, visites }))
        .sort((a, b) => a.date.localeCompare(b.date))
    }
    
    return data
  }

  // Helper pour obtenir le numéro de semaine
  const getWeekNumber = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
    const week1 = new Date(d.getFullYear(), 0, 4)
    return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
  }

  // Statistiques supplémentaires
  const getMembresVsNonMembres = () => {
    const membres = visites.filter(v => v.est_membre).length
    const nonMembres = visites.filter(v => !v.est_membre).length
    return [
      { name: 'Membres', value: membres, color: '#3B82F6' },
      { name: 'Non-Membres', value: nonMembres, color: '#9CA3AF' }
    ]
  }

  const getTauxCompletion = () => {
    if (!statistiques) return 0
    const recues = statistiques.par_statut['Reçue'] || 0
    const confirmees = statistiques.par_statut['Confirmée'] || 0
    const totalRecues = recues + confirmees
    return statistiques.total > 0 ? (totalRecues / statistiques.total) * 100 : 0
  }

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentVisites = visites.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(visites.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Custom Tooltip pour éviter l'erreur percent
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const total = prepareDataParStatut().reduce((sum, item) => sum + item.value, 0)
      const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : 0
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-gray-600">Nombre: <span className="font-bold">{data.value}</span></p>
          <p className="text-gray-600">Pourcentage: <span className="font-bold">{percentage}%</span></p>
        </div>
      )
    }
    return null
  }

  if (loading && !statistiques) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-t-gray-600"></div>
          <p className="mt-4 text-sm text-gray-500">Chargement des statistiques...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => {
              setHasLoaded(false)
              setLoading(true)
              setError(null)
              if (dateDebut && dateFin) {
                loadAllData(dateDebut, dateFin)
              }
            }} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  const statutData = prepareDataParStatut()
  const totalVisites = statutData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistiques des Visites</h1>
          <p className="text-gray-600 mt-1">Analyse détaillée des visites sur la période</p>
        </div>
        
        {/* Filtres de date */}
        <div className="flex gap-3 items-end flex-wrap">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
            <input
              type="date"
              value={dateDebutInput}
              onChange={(e) => setDateDebutInput(e.target.value)}
              className="border text-sm px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
            <input
              type="date"
              value={dateFinInput}
              onChange={(e) => setDateFinInput(e.target.value)}
              className="border text-sm px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleApplyFilter}
            className="bg-green-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Appliquer
          </button>
          <button
            onClick={handleResetFilter}
            className="bg-gray-200 text-gray-700 px-4 py-2 text-sm rounded-lg hover:bg-gray-300 transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Visites</p>
              <p className="text-2xl font-bold text-gray-900">{statistiques?.total || 0}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Visites Reçues</p>
              <p className="text-2xl font-bold text-green-600">
                {(statistiques?.par_statut['Reçue'] || 0) + (statistiques?.par_statut['Confirmée'] || 0)}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-yellow-600">{statistiques?.par_statut['En attente'] || 0}</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux de Complétion</p>
              <p className="text-2xl font-bold text-purple-600">{getTauxCompletion().toFixed(1)}%</p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des visites par jour */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Visites par {prepareDataParJour().length > 0 && prepareDataParJour()[0]?.date?.includes('S') ? 'Semaine' : 'Jour'}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareDataParJour()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                angle={prepareDataParJour().length > 10 ? -45 : 0}
                textAnchor={prepareDataParJour().length > 10 ? "end" : "middle"}
                height={prepareDataParJour().length > 10 ? 60 : 30}
                interval={prepareDataParJour().length > 20 ? Math.floor(prepareDataParJour().length / 10) : 0}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="visites" 
                stroke="#3B82F6" 
                strokeWidth={2} 
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          {prepareDataParJour().length > 20 && (
            <p className="text-xs text-gray-500 text-center mt-2">
              * L'axe X montre un échantillon des dates pour une meilleure lisibilité
            </p>
          )}
        </div>

        {/* Graphique des statuts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Visites par Statut</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statutData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {statutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Légende en bas */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 pt-2 border-t border-gray-100">
            {statutData.map((item, index) => {
              const percentage = totalVisites > 0 ? ((item.value / totalVisites) * 100).toFixed(1) : 0
              return (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">
                    {item.name}: <span className="font-semibold">{item.value}</span>
                    <span className="text-gray-500 text-xs ml-1">({percentage}%)</span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Graphique des motifs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Visites par Motif</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareDataParMotif()} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6">
                {prepareDataParMotif().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={MOTIF_COLORS[index % MOTIF_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Membres vs Non-Membres */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Membres vs Non-Membres</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getMembresVsNonMembres()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => {
                  const percentage = percent ? (percent * 100).toFixed(0) : '0'
                  return `${name}: ${percentage}%`
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {getMembresVsNonMembres().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tableau des visites avec pagination */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Détail des Visites</h2>
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold">{visites.length}</span> visites
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visiteur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motif</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentVisites.map((visite) => (
                <tr key={visite.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</div>
                    <div className="text-sm text-gray-500">{visite.telephone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visite.date_visite}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visite.heure}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visite.motif}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      visite.statut === 'Reçue' || visite.statut === 'Confirmée' ? 'bg-green-100 text-green-800' :
                      visite.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                      visite.statut === 'Annulée' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {visite.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      visite.est_membre ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {visite.est_membre ? 'Membre' : 'Non-Membre'}
                    </span>
                  </td>
                </tr>
              ))}
              {visites.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Aucune visite trouvée sur cette période
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {visites.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-500">
              Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, visites.length)} sur {visites.length} visites
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}