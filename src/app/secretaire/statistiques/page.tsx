
// // 'use client'

// // import { useState, useEffect } from 'react'
// // import { getStatistiques, StatsData } from '@/actions/statistiques'
// // import {
// //   LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
// //   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// //   AreaChart, Area
// // } from 'recharts'
// // import { format, subDays, startOfWeek, endOfWeek } from 'date-fns'
// // import { fr } from 'date-fns/locale'
// // import ExportButtons from './ExportButtons'
// // import { getUser } from '@/actions/auth'
// // import { redirect } from 'next/navigation'
// // import Image from 'next/image'
// // import * as Icons from 'lucide-react'

// // // Couleurs professionnelles
// // const COLORS = {
// //   primary: '#374151',
// //   secondary: '#6B7280',
// //   accent: '#9CA3AF',
// //   success: '#10B981',
// //   warning: '#F59E0B',
// //   danger: '#EF4444',
// //   info: '#3B82F6',
// //   gray: {
// //     50: '#F9FAFB',
// //     100: '#F3F4F6',
// //     200: '#E5E7EB',
// //     300: '#D1D5DB',
// //     400: '#9CA3AF',
// //     500: '#6B7280',
// //     600: '#4B5563',
// //     700: '#374151',
// //     800: '#1F2937',
// //     900: '#111827'
// //   }
// // }

// // const CHART_COLORS = [
// //   COLORS.gray[700],
// //   COLORS.gray[600],
// //   COLORS.gray[500],
// //   COLORS.gray[400],
// //   COLORS.gray[300],
// //   '#2D3748',
// //   '#4A5568',
// //   '#718096'
// // ]

// // interface StatutCount {
// //   'En attente': number
// //   'Confirmée': number
// //   'Reçue': number
// //   'Reportée': number
// //   'Annulée': number
// // }

// // export default function StatistiquesPage() {
// //   const [loading, setLoading] = useState(true)
// //   const [stats, setStats] = useState<StatsData | null>(null)
// //   const [periode, setPeriode] = useState<'semaine' | 'mois' | 'annee'>('mois')
// //   const [selectedStatut, setSelectedStatut] = useState<string>('tous')

// //   useEffect(() => {
// //     loadStats()
// //   }, [periode])

// //   const loadStats = async () => {
// //     setLoading(true)
// //     const user = await getUser()
    
// //     if (!user || !['admin', 'secretaire'].includes(user.role?.nom)) {
// //       redirect('/profile')
// //       return
// //     }

// //     const result = await getStatistiques(periode)
// //     if (result.success && result.data) {
// //       setStats(result.data)
// //     }
// //     setLoading(false)
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
// //           <p className="text-gray-500">Chargement des statistiques...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!stats) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <Icons.AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //           <p className="text-gray-500">Aucune donnée disponible</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   // Statistiques par statut
// //   const statutCounts: StatutCount = {
// //     'En attente': stats.parStatut['En attente'] || 0,
// //     'Confirmée': stats.parStatut['Confirmée'] || 0,
// //     'Reçue': stats.parStatut['Reçue'] || 0,
// //     'Reportée': stats.parStatut['Reportée'] || 0,
// //     'Annulée': stats.parStatut['Annulée'] || 0
// //   }

// //   const totalParStatut = Object.values(statutCounts).reduce((a, b) => a + b, 0)

// //   // Préparer les données pour les graphiques
// //   const donneesParJour = Object.entries(stats.parJour).map(([date, count]) => ({
// //     date: format(new Date(date), 'dd MMM', { locale: fr }),
// //     visites: count,
// //     fullDate: date
// //   }))

// //   const donneesParMotif = Object.entries(stats.parMotif).map(([motif, count]) => ({
// //     motif,
// //     visites: count,
// //     pourcentage: ((count / stats.totalVisites) * 100).toFixed(1)
// //   }))

// //   const donneesParStatut = Object.entries(statutCounts).map(([statut, count]) => ({
// //     statut,
// //     visites: count,
// //     pourcentage: ((count / totalParStatut) * 100).toFixed(1)
// //   }))

// //   // Statistiques de tendance
// //   const tendance = donneesParJour.length > 1 
// //     ? ((donneesParJour[donneesParJour.length - 1].visites - donneesParJour[0].visites) / donneesParJour[0].visites * 100).toFixed(1)
// //     : 0

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* En-tête avec titre et actions */}
// //         <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //           <div>
// //             <div className="flex items-center gap-3">
// //               <div className="p-2 bg-white rounded-xl shadow-sm">
// //                 <Icons.BarChart3 className="w-6 h-6 text-gray-700" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-semibold text-gray-900">Statistiques des visites</h1>
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   Analyse complète des rendez-vous et visites
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             {/* Sélecteur de période */}
// //             <div className="flex bg-white rounded-lg border border-gray-200 p-1">
// //               {[
// //                 { value: 'semaine', label: 'Semaine', icon: Icons.CalendarDays },
// //                 { value: 'mois', label: 'Mois', icon: Icons.CalendarRange },
// //                 { value: 'annee', label: 'Année', icon: Icons.Calendar }
// //               ].map((p) => {
// //                 const Icon = p.icon
// //                 return (
// //                   <button
// //                     key={p.value}
// //                     onClick={() => setPeriode(p.value as any)}
// //                     className={`
// //                       px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2
// //                       ${periode === p.value
// //                         ? 'bg-gray-900 text-white shadow-sm'
// //                         : 'text-gray-500 hover:text-gray-700'
// //                       }
// //                     `}
// //                   >
// //                     <Icon className="w-4 h-4" />
// //                     {p.label}
// //                   </button>
// //                 )
// //               })}
// //             </div>

// //             {/* Boutons d'export */}
// //             <ExportButtons data={[]} stats={stats} />
// //           </div>
// //         </div>

// //         {/* Cartes KPI principales */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //           <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-4">
// //               <div className="p-2 bg-gray-100 rounded-lg">
// //                 <Icons.Users className="w-5 h-5 text-gray-700" />
// //               </div>
// //               <span className="text-xs text-gray-400">Total</span>
// //             </div>
// //             <div className="text-3xl font-light text-gray-900">{stats.totalVisites}</div>
// //             <div className="text-sm text-gray-500 mt-1">Visites enregistrées</div>
// //             <div className="mt-3 flex items-center gap-2">
// //               <div className={`text-xs ${Number(tendance) >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
// //                 {Number(tendance) >= 0 ? <Icons.TrendingUp className="w-3 h-3" /> : <Icons.TrendingDown className="w-3 h-3" />}
// //                 {Math.abs(Number(tendance))}%
// //               </div>
// //               <span className="text-xs text-gray-400">vs période précédente</span>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-4">
// //               <div className="p-2 bg-blue-50 rounded-lg">
// //                 <Icons.Clock className="w-5 h-5 text-blue-600" />
// //               </div>
// //               <span className="text-xs text-gray-400">En attente</span>
// //             </div>
// //             <div className="text-3xl font-light text-gray-900">{statutCounts['En attente']}</div>
// //             <div className="text-sm text-gray-500 mt-1">À traiter</div>
// //             <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
// //               <div 
// //                 className="bg-blue-500 h-1.5 rounded-full"
// //                 style={{ width: `${(statutCounts['En attente'] / totalParStatut) * 100}%` }}
// //               />
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-4">
// //               <div className="p-2 bg-green-50 rounded-lg">
// //                 <Icons.CheckCircle className="w-5 h-5 text-green-600" />
// //               </div>
// //               <span className="text-xs text-gray-400">Reçues</span>
// //             </div>
// //             <div className="text-3xl font-light text-gray-900">{statutCounts['Reçue']}</div>
// //             <div className="text-sm text-gray-500 mt-1">Visites effectuées</div>
// //             <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
// //               <div 
// //                 className="bg-green-500 h-1.5 rounded-full"
// //                 style={{ width: `${(statutCounts['Reçue'] / totalParStatut) * 100}%` }}
// //               />
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-4">
// //               <div className="p-2 bg-purple-50 rounded-lg">
// //                 <Icons.TrendingUp className="w-5 h-5 text-purple-600" />
// //               </div>
// //               <span className="text-xs text-gray-400">Taux de conversion</span>
// //             </div>
// //             <div className="text-3xl font-light text-gray-900">
// //               {totalParStatut > 0 ? Math.round((statutCounts['Reçue'] / totalParStatut) * 100) : 0}%
// //             </div>
// //             <div className="text-sm text-gray-500 mt-1">Visites converties</div>
// //           </div>
// //         </div>

// //         {/* Graphiques principaux */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
// //           {/* Évolution temporelle */}
// //           <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
// //             <div className="flex items-center justify-between mb-6">
// //               <div className="flex items-center gap-3">
// //                 <Icons.Activity className="w-5 h-5 text-gray-500" />
// //                 <h2 className="text-sm font-medium text-gray-700">Évolution des visites</h2>
// //               </div>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => setSelectedStatut('tous')}
// //                   className={`px-3 py-1 text-xs rounded-full transition-colors ${
// //                     selectedStatut === 'tous'
// //                       ? 'bg-gray-900 text-white'
// //                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
// //                   }`}
// //                 >
// //                   Tous
// //                 </button>
// //               </div>
// //             </div>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <AreaChart data={donneesParJour}>
// //                 <defs>
// //                   <linearGradient id="colorVisites" x1="0" y1="0" x2="0" y2="1">
// //                     <stop offset="5%" stopColor={COLORS.gray[600]} stopOpacity={0.3}/>
// //                     <stop offset="95%" stopColor={COLORS.gray[600]} stopOpacity={0}/>
// //                   </linearGradient>
// //                 </defs>
// //                 <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[200]} />
// //                 <XAxis 
// //                   dataKey="date" 
// //                   stroke={COLORS.gray[400]}
// //                   tick={{ fill: COLORS.gray[500], fontSize: 12 }}
// //                 />
// //                 <YAxis 
// //                   stroke={COLORS.gray[400]}
// //                   tick={{ fill: COLORS.gray[500], fontSize: 12 }}
// //                 />
// //                 <Tooltip 
// //                   contentStyle={{ 
// //                     backgroundColor: 'white',
// //                     border: `1px solid ${COLORS.gray[200]}`,
// //                     borderRadius: '8px',
// //                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
// //                   }}
// //                 />
// //                 <Area 
// //                   type="monotone" 
// //                   dataKey="visites" 
// //                   stroke={COLORS.gray[700]} 
// //                   strokeWidth={2}
// //                   fillOpacity={1}
// //                   fill="url(#colorVisites)"
// //                 />
// //               </AreaChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Répartition par statut */}
// //           <div className="bg-white rounded-xl border border-gray-200 p-6">
// //             <div className="flex items-center gap-3 mb-6">
// //               <Icons.PieChart className="w-5 h-5 text-gray-500" />
// //               <h2 className="text-sm font-medium text-gray-700">Répartition par statut</h2>
// //             </div>
// //             <ResponsiveContainer width="100%" height={200}>
// //               <PieChart>
// //                 <Pie
// //                   data={donneesParStatut}
// //                   cx="50%"
// //                   cy="50%"
// //                   innerRadius={60}
// //                   outerRadius={80}
// //                   paddingAngle={2}
// //                   dataKey="visites"
// //                 >
// //                   {donneesParStatut.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //               </PieChart>
// //             </ResponsiveContainer>
// //             <div className="mt-4 space-y-2">
// //               {donneesParStatut.map((item, index) => (
// //                 <div key={item.statut} className="flex items-center justify-between text-sm">
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[index] }} />
// //                     <span className="text-gray-600">{item.statut}</span>
// //                   </div>
// //                   <div className="flex items-center gap-3">
// //                     <span className="font-medium text-gray-900">{item.visites}</span>
// //                     <span className="text-xs text-gray-400">{item.pourcentage}%</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Deuxième ligne de graphiques */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// //           {/* Barres par motif */}
// //           <div className="bg-white rounded-xl border border-gray-200 p-6">
// //             <div className="flex items-center gap-3 mb-6">
// //               <Icons.BarChart2 className="w-5 h-5 text-gray-500" />
// //               <h2 className="text-sm font-medium text-gray-700">Visites par motif</h2>
// //             </div>
// //             <ResponsiveContainer width="100%" height={250}>
// //               <BarChart data={donneesParMotif} layout="vertical">
// //                 <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[200]} />
// //                 <XAxis type="number" stroke={COLORS.gray[400]} />
// //                 <YAxis 
// //                   dataKey="motif" 
// //                   type="category" 
// //                   stroke={COLORS.gray[400]}
// //                   tick={{ fill: COLORS.gray[500], fontSize: 12 }}
// //                   width={100}
// //                 />
// //                 <Tooltip />
// //                 <Bar dataKey="visites" fill={COLORS.gray[600]} radius={[0, 4, 4, 0]} />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Évolution hebdomadaire */}
// //           <div className="bg-white rounded-xl border border-gray-200 p-6">
// //             <div className="flex items-center gap-3 mb-6">
// //               <Icons.Calendar className="w-5 h-5 text-gray-500" />
// //               <h2 className="text-sm font-medium text-gray-700">Tendance hebdomadaire</h2>
// //             </div>
// //             <ResponsiveContainer width="100%" height={250}>
// //               <LineChart data={stats.evolutionHebdo}>
// //                 <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[200]} />
// //                 <XAxis dataKey="semaine" stroke={COLORS.gray[400]} />
// //                 <YAxis stroke={COLORS.gray[400]} />
// //                 <Tooltip />
// //                 <Line 
// //                   type="monotone" 
// //                   dataKey="count" 
// //                   stroke={COLORS.gray[700]} 
// //                   strokeWidth={2}
// //                   dot={{ fill: COLORS.gray[700], r: 4 }}
// //                 />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Tableau détaillé des statuts */}
// //         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
// //           <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
// //             <div className="flex items-center gap-3">
// //               <Icons.List className="w-5 h-5 text-gray-500" />
// //               <h3 className="text-sm font-medium text-gray-700">Détail des statuts</h3>
// //             </div>
// //           </div>
// //           <div className="p-6">
// //             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
// //               {Object.entries(statutCounts).map(([statut, count], index) => {
// //                 const icons = {
// //                   'En attente': Icons.Clock,
// //                   'Confirmée': Icons.CalendarCheck,
// //                   'Reçue': Icons.CheckCircle,
// //                   'Reportée': Icons.CalendarX,
// //                   'Annulée': Icons.XCircle
// //                 }
// //                 const colors = {
// //                   'En attente': 'text-blue-600 bg-blue-50',
// //                   'Confirmée': 'text-green-600 bg-green-50',
// //                   'Reçue': 'text-emerald-600 bg-emerald-50',
// //                   'Reportée': 'text-yellow-600 bg-yellow-50',
// //                   'Annulée': 'text-red-600 bg-red-50'
// //                 }
// //                 const Icon = icons[statut as keyof typeof icons] || Icons.HelpCircle

// //                 return (
// //                   <div key={statut} className="bg-gray-50 rounded-lg p-4">
// //                     <div className="flex items-center gap-3 mb-3">
// //                       <div className={`p-2 rounded-lg ${colors[statut as keyof typeof colors]}`}>
// //                         <Icon className="w-4 h-4" />
// //                       </div>
// //                       <span className="text-sm font-medium text-gray-700">{statut}</span>
// //                     </div>
// //                     <div className="text-2xl font-light text-gray-900 mb-2">{count}</div>
// //                     <div className="w-full bg-gray-200 rounded-full h-1.5">
// //                       <div 
// //                         className={`h-1.5 rounded-full ${
// //                           statut === 'En attente' ? 'bg-blue-500' :
// //                           statut === 'Confirmée' ? 'bg-green-500' :
// //                           statut === 'Reçue' ? 'bg-emerald-500' :
// //                           statut === 'Reportée' ? 'bg-yellow-500' :
// //                           'bg-red-500'
// //                         }`}
// //                         style={{ width: `${(count / totalParStatut) * 100}%` }}
// //                       />
// //                     </div>
// //                     <div className="mt-2 text-xs text-gray-400">
// //                       {((count / totalParStatut) * 100).toFixed(1)}% du total
// //                     </div>
// //                   </div>
// //                 )
// //               })}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Top membres */}
// //         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
// //           <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
// //             <div className="flex items-center gap-3">
// //               <Icons.Crown className="w-5 h-5 text-gray-500" />
// //               <h3 className="text-sm font-medium text-gray-700">Top 10 des membres les plus actifs</h3>
// //             </div>
// //           </div>
// //           <div className="p-6">
// //             <div className="space-y-4">
// //               {stats.parMembre.map((membre, index) => (
// //                 <div key={membre.membre} className="flex items-center gap-4">
// //                   <div className="flex items-center justify-center w-8 h-8">
// //                     {index === 0 && <Icons.Crown className="w-5 h-5 text-yellow-500" />}
// //                     {index === 1 && <Icons.Award className="w-5 h-5 text-gray-400" />}
// //                     {index === 2 && <Icons.Award className="w-5 h-5 text-amber-600" />}
// //                     {index > 2 && <span className="text-sm text-gray-400">{index + 1}</span>}
// //                   </div>
                  
// //                   <div className="flex-shrink-0">
// //                     {membre.photo ? (
// //                       <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
// //                         <Image
// //                           src={membre.photo}
// //                           alt={`Membre ${membre.membre}`}
// //                           width={40}
// //                           height={40}
// //                           className="object-cover"
// //                         />
// //                       </div>
// //                     ) : (
// //                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
// //                         <Icons.User className="w-5 h-5 text-gray-400" />
// //                       </div>
// //                     )}
// //                   </div>

// //                   <div className="flex-1">
// //                     <div className="flex items-center justify-between mb-1">
// //                       <span className="text-sm font-medium text-gray-700">
// //                         Membre #{membre.membre}
// //                       </span>
// //                       <span className="text-sm text-gray-600">{membre.count} visites</span>
// //                     </div>
// //                     <div className="w-full bg-gray-100 rounded-full h-2">
// //                       <div 
// //                         className="bg-gray-700 h-2 rounded-full"
// //                         style={{ width: `${(membre.count / stats.parMembre[0].count) * 100}%` }}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Pied de page avec période */}
// //         <div className="mt-8 flex items-center justify-between text-sm">
// //           <div className="flex items-center gap-2 text-gray-400">
// //             <Icons.Info className="w-4 h-4" />
// //             <span>
// //               Données du {format(subDays(new Date(), 30), 'dd MMMM yyyy', { locale: fr })} au {format(new Date(), 'dd MMMM yyyy', { locale: fr })}
// //             </span>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <div className="flex items-center gap-2">
// //               <div className="w-3 h-3 bg-gray-700 rounded-full" />
// //               <span className="text-xs text-gray-400">Visites</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Icons.CheckCircle className="w-4 h-4 text-green-500" />
// //               <span className="text-xs text-gray-400">Reçues</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Icons.Clock className="w-4 h-4 text-blue-500" />
// //               <span className="text-xs text-gray-400">En attente</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// 'use client'

// import { useState, useEffect } from 'react'
// import { getStatistiques, StatsData } from '@/actions/statistiques'
// import {
//   LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   AreaChart, Area
// } from 'recharts'
// import { format, subDays } from 'date-fns'
// import { fr } from 'date-fns/locale'
// import ExportButtons from './ExportButtons'
// import { getUser } from '@/actions/auth'
// import { redirect } from 'next/navigation'
// import Image from 'next/image'
// import * as Icons from 'lucide-react'

// // Palette minimaliste
// const COLORS = {
//   primary: '#2563eb',    // Bleu plus doux
//   secondary: '#7c3aed',  // Violet
//   accent: '#059669',     // Vert
//   warning: '#d97706',    // Orange
//   danger: '#dc2626',     // Rouge
//   gray: {
//     50: '#f8fafc',
//     100: '#f1f5f9',
//     200: '#e2e8f0',
//     300: '#cbd5e1',
//     400: '#94a3b8',
//     500: '#64748b',
//     600: '#475569',
//     700: '#334155',
//     800: '#1e293b',
//     900: '#0f172a'
//   }
// }

// // Dégradés pour les graphiques
// const CHART_COLORS = [
//   '#2563eb', // Bleu
//   '#7c3aed', // Violet
//   '#059669', // Vert
//   '#d97706', // Orange
//   '#dc2626', // Rouge
//   '#4f46e5', // Indigo
//   '#db2777', // Rose
//   '#6b7280'  // Gris
// ]

// interface StatutCount {
//   'En attente': number
//   'Confirmée': number
//   'Reçue': number
//   'Reportée': number
//   'Annulée': number
// }

// export default function StatistiquesPage() {
//   const [loading, setLoading] = useState(true)
//   const [stats, setStats] = useState<StatsData | null>(null)
//   const [periode, setPeriode] = useState<'semaine' | 'mois' | 'annee'>('mois')

//   useEffect(() => {
//     loadStats()
//   }, [periode])

//   const loadStats = async () => {
//     setLoading(true)
//     const user = await getUser()
    
//     if (!user || !['admin', 'secretaire'].includes(user.role?.nom)) {
//       redirect('/profile')
//       return
//     }

//     const result = await getStatistiques(periode)
//     if (result.success && result.data) {
//       setStats(result.data)
//     }
//     setLoading(false)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-600 mx-auto mb-3" />
//           <p className="text-sm text-slate-500">Chargement...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!stats) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <Icons.AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
//           <p className="text-sm text-slate-500">Aucune donnée</p>
//         </div>
//       </div>
//     )
//   }

//   const statutCounts: StatutCount = {
//     'En attente': stats.parStatut['En attente'] || 0,
//     'Confirmée': stats.parStatut['Confirmée'] || 0,
//     'Reçue': stats.parStatut['Reçue'] || 0,
//     'Reportée': stats.parStatut['Reportée'] || 0,
//     'Annulée': stats.parStatut['Annulée'] || 0
//   }

//   const totalParStatut = Object.values(statutCounts).reduce((a, b) => a + b, 0)

//   const donneesParJour = Object.entries(stats.parJour).map(([date, count]) => ({
//     date: format(new Date(date), 'dd MMM', { locale: fr }),
//     visites: count
//   }))

//   const donneesParMotif = Object.entries(stats.parMotif).map(([motif, count]) => ({
//     motif,
//     visites: count
//   }))

//   const donneesParStatut = Object.entries(statutCounts).map(([statut, count]) => ({
//     statut,
//     visites: count
//   }))

//   return (
//     <div className="min-h-screen bg-slate-50 py-6">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header minimal */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-2">
//             <Icons.BarChart3 className="w-5 h-5 text-slate-600" />
//             <h1 className="text-lg font-medium text-slate-800">Statistiques</h1>
//           </div>
          
//           <div className="flex gap-2">
//             {[
//               { value: 'semaine', label: '7j' },
//               { value: 'mois', label: '30j' },
//               { value: 'annee', label: '12m' }
//             ].map((p) => (
//               <button
//                 key={p.value}
//                 onClick={() => setPeriode(p.value as any)}
//                 className={`px-3 py-1.5 text-xs rounded-md transition ${
//                   periode === p.value
//                     ? 'bg-slate-800 text-white'
//                     : 'text-slate-500 hover:text-slate-700'
//                 }`}
//               >
//                 {p.label}
//               </button>
//             ))}
//             <ExportButtons data={[]} stats={stats} />
//           </div>
//         </div>

//         {/* KPIs minimalistes */}
//         <div className="grid grid-cols-4 gap-3 mb-6">
//           <div className="bg-white rounded-lg p-4 border border-slate-100">
//             <div className="text-xs text-slate-400 mb-1">Total</div>
//             <div className="text-xl font-light text-slate-800">{stats.totalVisites}</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 border border-slate-100">
//             <div className="text-xs text-slate-400 mb-1">En attente</div>
//             <div className="text-xl font-light text-blue-600">{statutCounts['En attente']}</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 border border-slate-100">
//             <div className="text-xs text-slate-400 mb-1">Reçues</div>
//             <div className="text-xl font-light text-emerald-600">{statutCounts['Reçue']}</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 border border-slate-100">
//             <div className="text-xs text-slate-400 mb-1">Conversion</div>
//             <div className="text-xl font-light text-slate-800">
//               {totalParStatut > 0 ? Math.round((statutCounts['Reçue'] / totalParStatut) * 100) : 0}%
//             </div>
//           </div>
//         </div>

//         {/* Graphiques épurés */}
//         <div className="grid grid-cols-3 gap-3 mb-6">
          
//           {/* Évolution */}
//           <div className="col-span-2 bg-white rounded-lg p-4 border border-slate-100">
//             <div className="text-xs font-medium text-slate-400 mb-3">Évolution</div>
//             <ResponsiveContainer width="100%" height={160}>
//               <AreaChart data={donneesParJour}>
//                 <defs>
//                   <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
//                     <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[100]} />
//                 <XAxis dataKey="date" stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} />
//                 <YAxis stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} />
//                 <Tooltip contentStyle={{ fontSize: '11px' }} />
//                 <Area 
//                   type="monotone" 
//                   dataKey="visites" 
//                   stroke={COLORS.primary} 
//                   strokeWidth={1.5}
//                   fill="url(#colorVisits)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Répartition statuts */}
//           <div className="bg-white rounded-lg p-4 border border-slate-100">
//             <div className="text-xs font-medium text-slate-400 mb-3">Statuts</div>
//             <ResponsiveContainer width="100%" height={140}>
//               <PieChart>
//                 <Pie
//                   data={donneesParStatut}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={30}
//                   outerRadius={50}
//                   paddingAngle={2}
//                   dataKey="visites"
//                 >
//                   {donneesParStatut.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="grid grid-cols-2 gap-1 mt-2">
//               {donneesParStatut.slice(0, 4).map((item, index) => (
//                 <div key={item.statut} className="flex items-center gap-1 text-[10px]">
//                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index] }} />
//                   <span className="text-slate-500">{item.statut}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Deuxième ligne */}
//         <div className="grid grid-cols-2 gap-3 mb-6">
          
//           {/* Motifs */}
//           <div className="bg-white rounded-lg p-4 border border-slate-100">
//             <div className="text-xs font-medium text-slate-400 mb-3">Motifs</div>
//             <ResponsiveContainer width="100%" height={140}>
//               <BarChart data={donneesParMotif.slice(0, 5)} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[100]} />
//                 <XAxis type="number" stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} />
//                 <YAxis dataKey="motif" type="category" stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} width={60} />
//                 <Tooltip />
//                 <Bar dataKey="visites" fill={COLORS.secondary} radius={[0, 3, 3, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Top membres */}
//           <div className="bg-white rounded-lg p-4 border border-slate-100">
//             <div className="text-xs font-medium text-slate-400 mb-3">Top membres</div>
//             <div className="space-y-2">
//               {stats.parMembre.slice(0, 5).map((membre, index) => (
//                 <div key={membre.membre} className="flex items-center gap-2">
//                   <span className="text-xs text-slate-400 w-4">{index + 1}</span>
//                   <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
//                     {membre.photo ? (
//                       <Image src={membre.photo} alt="" width={24} height={24} className="object-cover" />
//                     ) : (
//                       <Icons.User className="w-3 h-3 text-slate-400" />
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <div className="text-xs text-slate-600">{membre.count} visites</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mini tableau des statuts */}
//         <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
//           <div className="grid grid-cols-5 divide-x divide-slate-100">
//             {Object.entries(statutCounts).map(([statut, count]) => {
//               const colors = {
//                 'En attente': 'text-blue-600',
//                 'Confirmée': 'text-emerald-600',
//                 'Reçue': 'text-green-600',
//                 'Reportée': 'text-orange-600',
//                 'Annulée': 'text-red-600'
//               }
//               return (
//                 <div key={statut} className="p-3 text-center">
//                   <div className="text-xs text-slate-400 mb-1">{statut}</div>
//                   <div className={`text-base font-light ${colors[statut as keyof typeof colors]}`}>{count}</div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         {/* Footer discret */}
//         <div className="mt-4 text-center">
//           <p className="text-[10px] text-slate-400">
//             {format(subDays(new Date(), 30), 'dd MMM', { locale: fr })} - {format(new Date(), 'dd MMM yyyy', { locale: fr })}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { getStatistiques, StatsData } from '@/actions/statistiques'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import { format, subDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import ExportButtons from './ExportButtons'
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import * as Icons from 'lucide-react'

// Palette minimaliste
const COLORS = {
  primary: '#2563eb',    // Bleu
  secondary: '#7c3aed',  // Violet
  accent: '#059669',     // Vert
  warning: '#d97706',    // Orange
  danger: '#dc2626',     // Rouge
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
}

// Dégradés pour les graphiques
const CHART_COLORS = [
  '#2563eb', // Bleu
  '#7c3aed', // Violet
  '#059669', // Vert
  '#d97706', // Orange
  '#dc2626', // Rouge
  '#4f46e5', // Indigo
  '#db2777', // Rose
  '#6b7280'  // Gris
]

interface StatutCount {
  'En attente': number
  'Confirmée': number
  'Reçue': number
  'Reportée': number
  'Annulée': number
}

export default function StatistiquesPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatsData | null>(null)
  const [periode, setPeriode] = useState<'semaine' | 'mois' | 'annee'>('mois')

  useEffect(() => {
    loadStats()
  }, [periode])

  const loadStats = async () => {
    setLoading(true)
    const user = await getUser()
    
    if (!user || !['admin', 'secretaire'].includes(user.role?.nom)) {
      redirect('/profile')
      return
    }

    const result = await getStatistiques(periode)
    if (result.success && result.data) {
      setStats(result.data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Icons.AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Aucune donnée</p>
        </div>
      </div>
    )
  }

  const statutCounts: StatutCount = {
    'En attente': stats.parStatut['En attente'] || 0,
    'Confirmée': stats.parStatut['Confirmée'] || 0,
    'Reçue': stats.parStatut['Reçue'] || 0,
    'Reportée': stats.parStatut['Reportée'] || 0,
    'Annulée': stats.parStatut['Annulée'] || 0
  }

  const totalParStatut = Object.values(statutCounts).reduce((a, b) => a + b, 0)

  const donneesParJour = Object.entries(stats.parJour).map(([date, count]) => ({
    date: format(new Date(date), 'dd MMM', { locale: fr }),
    visites: count
  }))

  const donneesParMotif = Object.entries(stats.parMotif).map(([motif, count]) => ({
    motif,
    visites: count
  }))

  const donneesParStatut = Object.entries(statutCounts).map(([statut, count]) => ({
    statut,
    visites: count
  }))

  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header minimal */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icons.BarChart3 className="w-5 h-5 text-slate-600" />
            <h1 className="text-lg font-medium text-slate-800">Statistiques</h1>
          </div>
          
          <div className="flex gap-2">
            {[
              { value: 'semaine', label: '7j' },
              { value: 'mois', label: '30j' },
              { value: 'annee', label: '12m' }
            ].map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriode(p.value as any)}
                className={`px-3 py-1.5 text-xs rounded-md transition ${
                  periode === p.value
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
            <ExportButtons data={[]} stats={stats} />
          </div>
        </div>

        {/* KPIs avec icônes */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-slate-100 rounded-md">
                <Icons.Calendar className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <span className="text-xs text-slate-400">Total</span>
            </div>
            <div className="text-xl font-light text-slate-800">{stats.totalVisites}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-50 rounded-md">
                <Icons.Clock className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-xs text-slate-400">En attente</span>
            </div>
            <div className="text-xl font-light text-blue-600">{statutCounts['En attente']}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-emerald-50 rounded-md">
                <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <span className="text-xs text-slate-400">Reçues</span>
            </div>
            <div className="text-xl font-light text-emerald-600">{statutCounts['Reçue']}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-purple-50 rounded-md">
                <Icons.TrendingUp className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="text-xs text-slate-400">Conversion</span>
            </div>
            <div className="text-xl font-light text-slate-800">
              {totalParStatut > 0 ? Math.round((statutCounts['Reçue'] / totalParStatut) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Graphiques épurés */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          
          {/* Évolution */}
          <div className="col-span-2 bg-white rounded-lg p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Icons.Activity className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">Évolution</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={donneesParJour}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[100]} />
                <XAxis dataKey="date" stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} />
                <YAxis stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: '11px' }} />
                <Area 
                  type="monotone" 
                  dataKey="visites" 
                  stroke={COLORS.primary} 
                  strokeWidth={1.5}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Répartition statuts */}
          <div className="bg-white rounded-lg p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Icons.PieChart className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">Statuts</span>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={donneesParStatut}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="visites"
                >
                  {donneesParStatut.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {donneesParStatut.slice(0, 4).map((item, index) => (
                <div key={item.statut} className="flex items-center gap-1 text-[10px]">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index] }} />
                  <span className="text-slate-500">{item.statut}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deuxième ligne */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          
          {/* Motifs */}
          <div className="bg-white rounded-lg p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Icons.BarChart2 className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">Motifs</span>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={donneesParMotif.slice(0, 5)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[100]} />
                <XAxis type="number" stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="motif" type="category" stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} width={60} />
                <Tooltip />
                <Bar dataKey="visites" fill={COLORS.secondary} radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top membres */}
          <div className="bg-white rounded-lg p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Icons.Crown className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">Top membres</span>
            </div>
            <div className="space-y-2">
              {stats.parMembre.slice(0, 5).map((membre, index) => (
                <div key={membre.membre} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-4">{index + 1}</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                    {membre.photo ? (
                      <Image src={membre.photo} alt="" width={24} height={24} className="object-cover" />
                    ) : (
                      <Icons.User className="w-3 h-3 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-600">{membre.count} visites</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mini tableau des statuts avec icônes */}
        <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-5 divide-x divide-slate-100">
            {Object.entries(statutCounts).map(([statut, count]) => {
              const icons = {
                'En attente': Icons.Clock,
                'Confirmée': Icons.CalendarCheck,
                'Reçue': Icons.CheckCircle,
                'Reportée': Icons.CalendarX,
                'Annulée': Icons.XCircle
              }
              const colors = {
                'En attente': 'text-blue-600',
                'Confirmée': 'text-emerald-600',
                'Reçue': 'text-green-600',
                'Reportée': 'text-orange-600',
                'Annulée': 'text-red-600'
              }
              const bgColors = {
                'En attente': 'bg-blue-50',
                'Confirmée': 'bg-emerald-50',
                'Reçue': 'bg-green-50',
                'Reportée': 'bg-orange-50',
                'Annulée': 'bg-red-50'
              }
              const Icon = icons[statut as keyof typeof icons] || Icons.HelpCircle

              return (
                <div key={statut} className="p-3 text-center">
                  <div className="flex justify-center mb-2">
                    <div className={`p-1.5 rounded-md ${bgColors[statut as keyof typeof bgColors]}`}>
                      <Icon className={`w-3.5 h-3.5 ${colors[statut as keyof typeof colors]}`} />
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 mb-1">{statut}</div>
                  <div className={`text-base font-light ${colors[statut as keyof typeof colors]}`}>{count}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer discret */}
        <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-2">
            <Icons.Info className="w-3 h-3" />
            <span>
              {format(subDays(new Date(), 30), 'dd MMM', { locale: fr })} - {format(new Date(), 'dd MMM yyyy', { locale: fr })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Visites</span>
            </div>
            <div className="flex items-center gap-1">
              <Icons.CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Reçues</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}