
// // import { getUser } from '@/actions/auth'
// // import { redirect } from 'next/navigation'
// // import { supabase } from '@/lib/supabase'
// // import VisitesTabs from './VisitesTabs'

// // export default async function VisitesPage() {
// //   const user = await getUser()

// //   if (!user || !['admin', 'secretaire'].includes(user.role?.nom)) {
// //     redirect('/profile')
// //   }

// //   // Récupérer les configurations
// //   const { data: configs, error: configError } = await supabase
// //     .from('configuration')
// //     .select('*')

// //   if (configError) {
// //     console.error('Erreur configuration:', configError)
// //   }

// //   const config = configs?.reduce((acc, item) => {
// //     acc[item.cle] = item.valeur
// //     return acc
// //   }, {} as Record<string, string>) || {}

// //   // Date du jour formatée
// //   const today = new Date().toISOString().split('T')[0]
// //   console.log('Date du jour:', today) // Pour debug

// //   // Récupérer les visites du jour
// //   const { data: visitesJour, error: errorJour } = await supabase
// //     .from('visites')
// //     .select(`
// //       id,
// //       nom_visiteur,
// //       telephone,
// //       sexe,
// //       est_membre,
// //       membre_id,
// //       motif,
// //       autre_motif,
// //       date_visite,
// //       heure,
// //       observations,
// //       statut,
// //       created_at,
// //       membre:membre_id (
// //         id,
// //         nom_complet,
// //         email,
// //         numero,
// //         membre_profile
// //       )
// //     `)
// //     .eq('date_visite', today)
// //     .order('heure', { ascending: true })

// //   if (errorJour) {
// //     console.error('Erreur visites jour:', errorJour)
// //   }

// //   // Récupérer les visites à venir (après aujourd'hui)
// //   const { data: visitesAVenir, error: errorAVenir } = await supabase
// //     .from('visites')
// //     .select(`
// //       id,
// //       nom_visiteur,
// //       telephone,
// //       sexe,
// //       est_membre,
// //       membre_id,
// //       motif,
// //       autre_motif,
// //       date_visite,
// //       heure,
// //       observations,
// //       statut,
// //       created_at,
// //       membre:membre_id (
// //         id,
// //         nom_complet,
// //         email,
// //         numero,
// //         membre_profile
// //       )
// //     `)
// //     .gt('date_visite', today)
// //     .order('date_visite', { ascending: true })
// //     .order('heure', { ascending: true })

// //   if (errorAVenir) {
// //     console.error('Erreur visites à venir:', errorAVenir)
// //   }

// //   // Récupérer l'historique des visites (avant aujourd'hui)
// //   const { data: historiqueVisites, error: errorHistorique } = await supabase
// //     .from('visites')
// //     .select(`
// //       id,
// //       nom_visiteur,
// //       telephone,
// //       sexe,
// //       est_membre,
// //       membre_id,
// //       motif,
// //       autre_motif,
// //       date_visite,
// //       heure,
// //       observations,
// //       statut,
// //       created_at,
// //       membre:membre_id (
// //         id,
// //         nom_complet,
// //         email,
// //         numero,
// //         membre_profile
// //       )
// //     `)
// //     .lt('date_visite', today)
// //     .order('date_visite', { ascending: false })
// //     .limit(50)

// //   if (errorHistorique) {
// //     console.error('Erreur historique:', errorHistorique)
// //   }

// //   // Logs pour debug
// //   console.log('Visites jour trouvées:', visitesJour?.length || 0)
// //   console.log('Visites à venir trouvées:', visitesAVenir?.length || 0)
// //   console.log('Historique trouvé:', historiqueVisites?.length || 0)

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
// //         {/* En-tête */}
// //         <div className="py-4 px-3">
// //           <div className='flex gap-2 items-center '>

// // <img src="/logo.png" alt="ÉgliseApp" className="w-12" /> Eglise Parole Eternelle( Belaire)
// //           </div>

// //           <div className="flex items-center justify-between">

// //             <div>
// //               <p className="text-sm text-gray-500 mt-2">
// //                 Gérez les rendez-vous des visiteurs (Mardis et Mercredis uniquement)
// //               </p>
// //             </div>
            
         
// //             <div className="flex gap-6">
// //               <div className="text-right">
// //                 <div className="text-3xl font-light text-gray-900">
// //                   {visitesJour?.length || 0}
// //                 </div>
// //                 <div className="text-xs text-gray-400 mt-1">Aujourd'hui</div>
// //               </div>
// //               <div className="text-right">
// //                 <div className="text-3xl font-light text-gray-900">
// //                   {visitesAVenir?.length || 0}
// //                 </div>
// //                 <div className="text-xs text-gray-400 mt-1">À venir</div>
// //               </div>
// //               <div className="text-right">
// //                 <div className="text-3xl font-light text-gray-900">
// //                   {historiqueVisites?.length || 0}
// //                 </div>
// //                 <div className="text-xs text-gray-400 mt-1">Historique</div>
// //               </div>
// //             </div>
// //           </div>

       
// //         </div>

// //         {/* Tabs avec tout le contenu */}
// //         <VisitesTabs 
// //           config={config}
// //           visitesJour={visitesJour || []}
// //           visitesAVenir={visitesAVenir || []}
// //           historiqueVisites={historiqueVisites || []}
// //         />
// //       </div>
// //     </div>
// //   )
// // }

// // app/secretaire/visites/page.tsx
// 'use client'

// import { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import { format, addDays, subDays, isTuesday, isWednesday, nextTuesday, nextWednesday, previousTuesday, previousWednesday } from 'date-fns'
// import { fr } from 'date-fns/locale'
// import { Calendar, ChevronLeft, ChevronRight, Plus, Search, Clock, Users } from 'lucide-react'

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
//   membre?: {
//     nom_complet: string
//     membre_profile: string | null
//   } | null
// }

// interface Configuration {
//   quota_journalier: number
//   heures_ouverture: string
//   heures_fermeture: string
//   intervalle_rendez_vous: number
// }

// export default function VisitesPage() {
//   const [visites, setVisites] = useState<Visite[]>([])
//   const [loading, setLoading] = useState(true)
//   const [dateCourante, setDateCourante] = useState(new Date())
//   const [config, setConfig] = useState<Configuration>({
//     quota_journalier: 15,
//     heures_ouverture: '08:00',
//     heures_fermeture: '16:00',
//     intervalle_rendez_vous: 30
//   })
//   const [stats, setStats] = useState({
//     total: 0,
//     en_attente: 0,
//     confirmees: 0,
//     recues: 0,
//     membres: 0,
//     non_membres: 0
//   })
//   const [showModal, setShowModal] = useState(false)
//   const [showMembreSearch, setShowMembreSearch] = useState(false)
//   const [membres, setMembres] = useState<any[]>([])
//   const [searchMembre, setSearchMembre] = useState('')
//   const [formData, setFormData] = useState({
//     nom_visiteur: '',
//     telephone: '',
//     sexe: 'Homme',
//     est_membre: false,
//     membre_id: '',
//     motif: 'Conseil',
//     autre_motif: '',
//     heure: '',
//     observations: ''
//   })

//   // Charger la configuration au démarrage
//   useEffect(() => {
//     chargerConfiguration()
//   }, [])

//   // Charger les visites quand la date change
//   useEffect(() => {
//     chargerVisites()
//   }, [dateCourante])

//   const chargerConfiguration = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('configuration')
//         .select('cle, valeur')

//       if (error) throw error

//       const configMap: Record<string, string> = {}
//       data?.forEach(item => {
//         configMap[item.cle] = item.valeur
//       })

//       setConfig({
//         quota_journalier: parseInt(configMap['quota_journalier'] || '15'),
//         heures_ouverture: configMap['heures_ouverture'] || '08:00',
//         heures_fermeture: configMap['heures_fermeture'] || '16:00',
//         intervalle_rendez_vous: parseInt(configMap['intervalle_rendez_vous'] || '30')
//       })
//     } catch (error) {
//       console.error('Erreur chargement configuration:', error)
//     }
//   }

//   const chargerVisites = async () => {
//     try {
//       setLoading(true)
//       const dateStr = format(dateCourante, 'yyyy-MM-dd')
      
//       const { data, error } = await supabase
//         .from('visites')
//         .select(`
//           *,
//           membre:membre_id (nom_complet, membre_profile)
//         `)
//         .eq('date_visite', dateStr)
//         .order('heure', { ascending: true })

//       if (error) throw error

//       setVisites(data || [])
      
//       // Calculer les statistiques
//       const statsCalcul = {
//         total: data?.length || 0,
//         en_attente: data?.filter(v => v.statut === 'En attente').length || 0,
//         confirmees: data?.filter(v => v.statut === 'Confirmée').length || 0,
//         recues: data?.filter(v => v.statut === 'Reçue').length || 0,
//         membres: data?.filter(v => v.est_membre).length || 0,
//         non_membres: data?.filter(v => !v.est_membre).length || 0
//       }

//       setStats(statsCalcul)
//     } catch (error) {
//       console.error('Erreur chargement visites:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const navigationPrecedente = () => {
//     let nouvelleDate = subDays(dateCourante, 1)
//     // Chercher le jour ouvrable précédent (mardi ou mercredi)
//     while (!isTuesday(nouvelleDate) && !isWednesday(nouvelleDate)) {
//       nouvelleDate = subDays(nouvelleDate, 1)
//     }
//     setDateCourante(nouvelleDate)
//   }

//   const navigationSuivante = () => {
//     let nouvelleDate = addDays(dateCourante, 1)
//     // Chercher le jour ouvrable suivant (mardi ou mercredi)
//     while (!isTuesday(nouvelleDate) && !isWednesday(nouvelleDate)) {
//       nouvelleDate = addDays(nouvelleDate, 1)
//     }
//     setDateCourante(nouvelleDate)
//   }

//   const allerAujourdhui = () => {
//     const aujourdhui = new Date()
//     // Si aujourd'hui n'est pas un jour ouvrable, aller au prochain jour ouvrable
//     if (!isTuesday(aujourdhui) && !isWednesday(aujourdhui)) {
//       const prochain = isTuesday(aujourdhui) ? aujourdhui : nextWednesday(aujourdhui)
//       setDateCourante(prochain)
//     } else {
//       setDateCourante(aujourdhui)
//     }
//   }

//   const rechercherMembres = async (search: string) => {
//     if (search.length < 2) return
    
//     try {
//       const { data, error } = await supabase
//         .from('membres')
//         .select('id, nom_complet, numero, membre_profile')
//         .ilike('nom_complet', `%${search}%`)
//         .limit(10)

//       if (error) throw error
//       setMembres(data || [])
//     } catch (error) {
//       console.error('Erreur recherche:', error)
//     }
//   }

//   const handleMembreSelect = (membre: any) => {
//     setFormData({
//       ...formData,
//       nom_visiteur: membre.nom_complet,
//       telephone: membre.numero,
//       est_membre: true,
//       membre_id: membre.id.toString()
//     })
//     setShowMembreSearch(false)
//     setSearchMembre('')
//     setMembres([])
//   }

//   const verifierVisiteurExistant = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('visites')
//         .select('id')
//         .eq('date_visite', format(dateCourante, 'yyyy-MM-dd'))
//         .eq('telephone', formData.telephone)
//         .in('statut', ['En attente', 'Confirmée'])

//       if (error) throw error
//       return data && data.length > 0
//     } catch (error) {
//       console.error('Erreur vérification:', error)
//       return false
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Vérifier le quota
//     if (stats.total >= config.quota_journalier) {
//       alert(`Quota journalier atteint (${config.quota_journalier} visites maximum)`)
//       return
//     }

//     // Vérifier si le visiteur existe déjà
//     const existe = await verifierVisiteurExistant()
//     if (existe) {
//       if (!confirm('Ce visiteur a déjà un rendez-vous aujourd\'hui. Voulez-vous continuer ?')) {
//         return
//       }
//     }

//     try {
//       // Récupérer l'utilisateur connecté (à adapter selon votre système d'auth)
//       const { data: { user } } = await supabase.auth.getUser()
      
//       const visiteData = {
//         nom_visiteur: formData.nom_visiteur,
//         telephone: formData.telephone,
//         sexe: formData.sexe,
//         est_membre: formData.est_membre,
//         membre_id: formData.est_membre ? parseInt(formData.membre_id) : null,
//         motif: formData.motif,
//         autre_motif: formData.motif === 'Autre' ? formData.autre_motif : null,
//         date_visite: format(dateCourante, 'yyyy-MM-dd'),
//         heure: formData.heure,
//         observations: formData.observations || null,
//         cree_par: user?.id || 1, // À adapter
//         statut: 'En attente'
//       }

//       const { error } = await supabase
//         .from('visites')
//         .insert([visiteData])

//       if (error) throw error

//       setShowModal(false)
//       resetForm()
//       chargerVisites()
//     } catch (error) {
//       console.error('Erreur création:', error)
//       alert('Erreur lors de la création')
//     }
//   }

//   const updateStatut = async (visiteId: number, nouveauStatut: string) => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser()

//       // Récupérer l'ancien statut
//       const { data: visite } = await supabase
//         .from('visites')
//         .select('statut')
//         .eq('id', visiteId)
//         .single()

//       // Mettre à jour le statut
//       const { error } = await supabase
//         .from('visites')
//         .update({ 
//           statut: nouveauStatut,
//           modifie_par: user?.id || 1
//         })
//         .eq('id', visiteId)

//       if (error) throw error

//       // Enregistrer dans l'historique
//       await supabase
//         .from('historique_visites')
//         .insert([{
//           visite_id: visiteId,
//           ancien_statut: visite?.statut,
//           nouveau_statut: nouveauStatut,
//           modifie_par: user?.id || 1
//         }])

//       chargerVisites()
//     } catch (error) {
//       console.error('Erreur mise à jour:', error)
//     }
//   }

//   const resetForm = () => {
//     setFormData({
//       nom_visiteur: '',
//       telephone: '',
//       sexe: 'Homme',
//       est_membre: false,
//       membre_id: '',
//       motif: 'Conseil',
//       autre_motif: '',
//       heure: '',
//       observations: ''
//     })
//     setMembres([])
//     setSearchMembre('')
//   }

//   const getStatutColor = (statut: string) => {
//     switch(statut) {
//       case 'Confirmée': return 'bg-green-100 text-green-800 border-green-200'
//       case 'En attente': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
//       case 'Reçue': return 'bg-blue-100 text-blue-800 border-blue-200'
//       case 'Annulée': return 'bg-red-100 text-red-800 border-red-200'
//       case 'Reportée': return 'bg-orange-100 text-orange-800 border-orange-200'
//       default: return 'bg-gray-100 text-gray-800 border-gray-200'
//     }
//   }

//   const getMotifIcon = (motif: string) => {
//     switch(motif) {
//       case 'Prière': return '🙏'
//       case 'Conseil': return '💬'
//       case 'Orientation': return '🧭'
//       default: return '📝'
//     }
//   }

//   const generateHeures = () => {
//     const heures = []
//     const [debutH, debutM] = config.heures_ouverture.split(':').map(Number)
//     const [finH, finM] = config.heures_fermeture.split(':').map(Number)
    
//     let current = new Date()
//     current.setHours(debutH, debutM, 0)
//     const fin = new Date()
//     fin.setHours(finH, finM, 0)

//     while (current <= fin) {
//       const heureStr = current.toTimeString().substring(0, 5)
      
//       // Vérifier si l'heure est déjà prise
//       const estPrise = visites.some(v => v.heure.substring(0, 5) === heureStr)
      
//       heures.push({
//         value: heureStr,
//         label: heureStr,
//         disponible: !estPrise
//       })
      
//       current.setMinutes(current.getMinutes() + config.intervalle_rendez_vous)
//     }
    
//     return heures
//   }

//   const placesRestantes = config.quota_journalier - stats.total

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Planning des Visites Pastorales
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Réception uniquement les mardis et mercredis
//               </p>
//             </div>
//             <button
//               onClick={() => setShowModal(true)}
//               disabled={placesRestantes <= 0}
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <Plus className="w-5 h-5 mr-2" />
//               Nouvelle Visite
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Navigation et Quota */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={navigationPrecedente}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-600" />
//               </button>
              
//               <div className="flex items-center space-x-3">
//                 <Calendar className="w-5 h-5 text-gray-500" />
//                 <span className="text-lg font-medium text-gray-900">
//                   {format(dateCourante, 'EEEE d MMMM yyyy', { locale: fr })}
//                 </span>
//                 <button
//                   onClick={allerAujourdhui}
//                   className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Aujourd'hui
//                 </button>
//               </div>

//               <button
//                 onClick={navigationSuivante}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>

//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-600">Quota:</span>
//               <div className={`px-3 py-1 rounded-lg font-medium ${
//                 placesRestantes > 5 ? 'bg-green-100 text-green-800' :
//                 placesRestantes > 0 ? 'bg-yellow-100 text-yellow-800' :
//                 'bg-red-100 text-red-800'
//               }`}>
//                 {stats.total} / {config.quota_journalier} ({placesRestantes} restantes)
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Statistiques */}
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
//           <div className="bg-white rounded-lg shadow-sm p-4">
//             <div className="text-sm text-gray-600">Total</div>
//             <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-4">
//             <div className="text-sm text-gray-600">En attente</div>
//             <div className="text-2xl font-bold text-yellow-600">{stats.en_attente}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-4">
//             <div className="text-sm text-gray-600">Confirmées</div>
//             <div className="text-2xl font-bold text-green-600">{stats.confirmees}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-4">
//             <div className="text-sm text-gray-600">Reçues</div>
//             <div className="text-2xl font-bold text-blue-600">{stats.recues}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-4">
//             <div className="text-sm text-gray-600">Membres</div>
//             <div className="text-2xl font-bold text-gray-900">{stats.membres}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-4">
//             <div className="text-sm text-gray-600">Non-membres</div>
//             <div className="text-2xl font-bold text-gray-900">{stats.non_membres}</div>
//           </div>
//         </div>

//         {/* Tableau des visites */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visiteur</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motif</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
//                       Chargement...
//                     </td>
//                   </tr>
//                 ) : visites.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
//                       Aucune visite pour cette date
//                     </td>
//                   </tr>
//                 ) : (
//                   visites.map((visite) => (
//                     <tr key={visite.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <Clock className="w-4 h-4 text-gray-400 mr-2" />
//                           <span className="text-sm font-medium text-gray-900">
//                             {visite.heure.substring(0, 5)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           {visite.membre?.membre_profile && (
//                             <img 
//                               src={visite.membre.membre_profile} 
//                               alt={visite.nom_visiteur}
//                               className="w-8 h-8 rounded-full mr-3 object-cover"
//                             />
//                           )}
//                           <div className="text-sm font-medium text-gray-900">
//                             {visite.nom_visiteur}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs rounded-full ${
//                           visite.est_membre ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                         }`}>
//                           {visite.est_membre ? 'Membre' : 'Non membre'}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {visite.telephone}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-gray-900">
//                           <span className="mr-2">{getMotifIcon(visite.motif)}</span>
//                           {visite.motif}
//                           {visite.motif === 'Autre' && visite.autre_motif && (
//                             <span className="ml-1 text-xs text-gray-500">({visite.autre_motif})</span>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <select
//                           value={visite.statut}
//                           onChange={(e) => updateStatut(visite.id, e.target.value)}
//                           className={`text-xs rounded-full px-3 py-1 font-medium border ${getStatutColor(visite.statut)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                         >
//                           <option value="En attente">En attente</option>
//                           <option value="Confirmée">Confirmée</option>
//                           <option value="Reçue">Reçue</option>
//                           <option value="Reportée">Reportée</option>
//                           <option value="Annulée">Annulée</option>
//                         </select>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <button
//                           onClick={() => {/* Voir détails */}}
//                           className="text-blue-600 hover:text-blue-900 font-medium"
//                         >
//                           Détails
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Légende */}
//         <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
//           <span className="flex items-center">
//             <span className="w-3 h-3 bg-green-100 border border-green-200 rounded-full mr-2"></span>
//             Membre
//           </span>
//           <span className="flex items-center">
//             <span className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-full mr-2"></span>
//             Non membre
//           </span>
//           <span className="flex items-center">
//             <span className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded-full mr-2"></span>
//             En attente
//           </span>
//           <span className="flex items-center">
//             <span className="w-3 h-3 bg-green-100 border border-green-200 rounded-full mr-2"></span>
//             Confirmée
//           </span>
//           <span className="flex items-center">
//             <span className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-full mr-2"></span>
//             Reçue
//           </span>
//         </div>
//       </div>

//       {/* Modal Nouvelle Visite */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b bg-gray-50">
//               <h2 className="text-xl font-bold text-gray-900">
//                 Nouvelle Visite - {format(dateCourante, 'EEEE d MMMM yyyy', { locale: fr })}
//               </h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 Places disponibles: {placesRestantes} / {config.quota_journalier}
//               </p>
//             </div>
            
//             <form onSubmit={handleSubmit} className="p-6">
//               {/* Recherche membre */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Rechercher un membre existant
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchMembre}
//                     onChange={(e) => {
//                       setSearchMembre(e.target.value)
//                       rechercherMembres(e.target.value)
//                     }}
//                     placeholder="Nom du membre..."
//                     className="w-full border rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//                 </div>
//                 {membres.length > 0 && (
//                   <div className="mt-2 border rounded-lg max-h-60 overflow-y-auto">
//                     {membres.map((membre) => (
//                       <div
//                         key={membre.id}
//                         onClick={() => handleMembreSelect(membre)}
//                         className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center border-b last:border-b-0"
//                       >
//                         {membre.membre_profile && (
//                           <img src={membre.membre_profile} alt="" className="w-8 h-8 rounded-full mr-3 object-cover" />
//                         )}
//                         <div>
//                           <div className="font-medium">{membre.nom_complet}</div>
//                           <div className="text-xs text-gray-500">{membre.numero}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Formulaire */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Nom complet *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.nom_visiteur}
//                     onChange={(e) => setFormData({...formData, nom_visiteur: e.target.value})}
//                     className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Téléphone *
//                   </label>
//                   <input
//                     type="tel"
//                     required
//                     value={formData.telephone}
//                     onChange={(e) => setFormData({...formData, telephone: e.target.value})}
//                     className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Sexe
//                   </label>
//                   <select
//                     value={formData.sexe}
//                     onChange={(e) => setFormData({...formData, sexe: e.target.value})}
//                     className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="Homme">Homme</option>
//                     <option value="Femme">Femme</option>
//                   </select>
//                 </div>

//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Heure du rendez-vous *
//                   </label>
//                   <select
//                     required
//                     value={formData.heure}
//                     onChange={(e) => setFormData({...formData, heure: e.target.value})}
//                     className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Sélectionnez une heure</option>
//                     {generateHeures().map((heure) => (
//                       <option 
//                         key={heure.value} 
//                         value={heure.value}
//                         disabled={!heure.disponible}
//                         className={!heure.disponible ? 'text-gray-400' : ''}
//                       >
//                         {heure.label} {!heure.disponible ? '(Indisponible)' : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Motif *
//                   </label>
//                   <select
//                     required
//                     value={formData.motif}
//                     onChange={(e) => setFormData({...formData, motif: e.target.value})}
//                     className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="Conseil">Conseil</option>
//                     <option value="Prière">Prière</option>
//                     <option value="Orientation">Orientation</option>
//                     <option value="Autre">Autre</option>
//                   </select>
//                 </div>

//                 {formData.motif === 'Autre' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Précisez le motif
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.autre_motif}
//                       onChange={(e) => setFormData({...formData, autre_motif: e.target.value})}
//                       className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 )}

//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Observations
//                   </label>
//                   <textarea
//                     rows={3}
//                     value={formData.observations}
//                     onChange={(e) => setFormData({...formData, observations: e.target.value})}
//                     className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Informations complémentaires..."
//                   />
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false)
//                     resetForm()
//                   }}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={placesRestantes <= 0}
//                 >
//                   Créer la visite
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// app/secretaire/visites/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { format, addDays, subDays, isTuesday, isWednesday, nextTuesday, nextWednesday, parseISO, differenceInMinutes } from 'date-fns'
import { fr } from 'date-fns/locale'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Clock, 
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Filter,
  BarChart3,
  Settings
} from 'lucide-react'

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
    nom_complet: string
    membre_profile: string | null
    email?: string
    adresse?: string
  } | null
}

interface Configuration {
  quota_journalier: number
  heures_ouverture: string
  heures_fermeture: string
  intervalle_rendez_vous: number
}

interface StatistiquesJournalieres {
  total: number
  en_attente: number
  confirmees: number
  recues: number
  reportees: number
  annulees: number
  membres: number
  non_membres: number
  conseil: number
  priere: number
  orientation: number
  autre: number
}

export default function VisitesPage() {
  const [visites, setVisites] = useState<Visite[]>([])
  const [loading, setLoading] = useState(true)
  const [dateCourante, setDateCourante] = useState(new Date())
  const [config, setConfig] = useState<Configuration>({
    quota_journalier: 15,
    heures_ouverture: '08:00',
    heures_fermeture: '16:00',
    intervalle_rendez_vous: 30
  })
  const [stats, setStats] = useState<StatistiquesJournalieres>({
    total: 0,
    en_attente: 0,
    confirmees: 0,
    recues: 0,
    reportees: 0,
    annulees: 0,
    membres: 0,
    non_membres: 0,
    conseil: 0,
    priere: 0,
    orientation: 0,
    autre: 0
  })
  const [showModal, setShowModal] = useState(false)
  const [showMembreSearch, setShowMembreSearch] = useState(false)
  const [membres, setMembres] = useState<any[]>([])
  const [searchMembre, setSearchMembre] = useState('')
  const [searchMembreResults, setSearchMembreResults] = useState<any[]>([])
  const [formData, setFormData] = useState({
    nom_visiteur: '',
    telephone: '',
    sexe: 'Homme',
    est_membre: false,
    membre_id: '',
    motif: 'Conseil',
    autre_motif: '',
    heure: '',
    observations: ''
  })
  const [filtreStatut, setFiltreStatut] = useState<string>('')
  const [showStats, setShowStats] = useState(false)
  const [enregistrementEnCours, setEnregistrementEnCours] = useState(false)

  // Charger la configuration au démarrage
  useEffect(() => {
    chargerConfiguration()
  }, [])

  // Charger les visites quand la date change
  useEffect(() => {
    chargerVisites()
  }, [dateCourante])

  // Recherche de membres en temps réel
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchMembre.length >= 2) {
        rechercherMembres(searchMembre)
      } else {
        setSearchMembreResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchMembre])

  const chargerConfiguration = async () => {
    try {
      const { data, error } = await supabase
        .from('configuration')
        .select('cle, valeur')

      if (error) throw error

      const configMap: Record<string, string> = {}
      data?.forEach(item => {
        configMap[item.cle] = item.valeur
      })

      setConfig({
        quota_journalier: parseInt(configMap['quota_journalier'] || '15'),
        heures_ouverture: configMap['heures_ouverture'] || '08:00',
        heures_fermeture: configMap['heures_fermeture'] || '16:00',
        intervalle_rendez_vous: parseInt(configMap['intervalle_rendez_vous'] || '30')
      })
    } catch (error) {
      console.error('Erreur chargement configuration:', error)
    }
  }

  const chargerVisites = async () => {
    try {
      setLoading(true)
      const dateStr = format(dateCourante, 'yyyy-MM-dd')
      
      const { data, error } = await supabase
        .from('visites')
        .select(`
          *,
          membre:membre_id (nom_complet, membre_profile, email, adresse)
        `)
        .eq('date_visite', dateStr)
        .order('heure', { ascending: true })

      if (error) throw error

      setVisites(data || [])
      
      // Calculer les statistiques détaillées
      const statsCalcul: StatistiquesJournalieres = {
        total: data?.length || 0,
        en_attente: data?.filter(v => v.statut === 'En attente').length || 0,
        confirmees: data?.filter(v => v.statut === 'Confirmée').length || 0,
        recues: data?.filter(v => v.statut === 'Reçue').length || 0,
        reportees: data?.filter(v => v.statut === 'Reportée').length || 0,
        annulees: data?.filter(v => v.statut === 'Annulée').length || 0,
        membres: data?.filter(v => v.est_membre).length || 0,
        non_membres: data?.filter(v => !v.est_membre).length || 0,
        conseil: data?.filter(v => v.motif === 'Conseil').length || 0,
        priere: data?.filter(v => v.motif === 'Prière').length || 0,
        orientation: data?.filter(v => v.motif === 'Orientation').length || 0,
        autre: data?.filter(v => v.motif === 'Autre').length || 0
      }

      setStats(statsCalcul)
    } catch (error) {
      console.error('Erreur chargement visites:', error)
    } finally {
      setLoading(false)
    }
  }

  const navigationPrecedente = () => {
    let nouvelleDate = subDays(dateCourante, 1)
    while (!isTuesday(nouvelleDate) && !isWednesday(nouvelleDate)) {
      nouvelleDate = subDays(nouvelleDate, 1)
    }
    setDateCourante(nouvelleDate)
  }

  const navigationSuivante = () => {
    let nouvelleDate = addDays(dateCourante, 1)
    while (!isTuesday(nouvelleDate) && !isWednesday(nouvelleDate)) {
      nouvelleDate = addDays(nouvelleDate, 1)
    }
    setDateCourante(nouvelleDate)
  }

  const allerAujourdhui = () => {
    const aujourdhui = new Date()
    if (!isTuesday(aujourdhui) && !isWednesday(aujourdhui)) {
      const prochain = isTuesday(aujourdhui) ? aujourdhui : nextWednesday(aujourdhui)
      setDateCourante(prochain)
    } else {
      setDateCourante(aujourdhui)
    }
  }

  const rechercherMembres = async (search: string) => {
    try {
      const { data, error } = await supabase
        .from('membres')
        .select('id, nom_complet, numero, email, adresse, membre_profile')
        .ilike('nom_complet', `%${search}%`)
        .limit(10)

      if (error) throw error
      setSearchMembreResults(data || [])
    } catch (error) {
      console.error('Erreur recherche:', error)
    }
  }

  const handleMembreSelect = (membre: any) => {
    setFormData({
      ...formData,
      nom_visiteur: membre.nom_complet,
      telephone: membre.numero,
      est_membre: true,
      membre_id: membre.id.toString()
    })
    setSearchMembre('')
    setSearchMembreResults([])
  }

  const verifierVisiteurExistant = async () => {
    try {
      const { data, error } = await supabase
        .from('visites')
        .select('id, statut, heure')
        .eq('date_visite', format(dateCourante, 'yyyy-MM-dd'))
        .eq('telephone', formData.telephone)
        .in('statut', ['En attente', 'Confirmée'])

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erreur vérification:', error)
      return []
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnregistrementEnCours(true)

    try {
      // Vérifier le quota
      if (stats.total >= config.quota_journalier) {
        alert(`Quota journalier atteint (${config.quota_journalier} visites maximum)`)
        setEnregistrementEnCours(false)
        return
      }

      // Vérifier si le visiteur existe déjà
      const visitesExistantes = await verifierVisiteurExistant()
      if (visitesExistantes.length > 0) {
        const messages = visitesExistantes.map(v => 
          `- ${v.heure.substring(0, 5)} (${v.statut})`
        ).join('\n')
        
        if (!confirm(`Ce visiteur a déjà un ou plusieurs rendez-vous aujourd'hui :\n${messages}\n\nVoulez-vous continuer ?`)) {
          setEnregistrementEnCours(false)
          return
        }
      }

      // Récupérer l'utilisateur connecté
      const { data: { user } } = await supabase.auth.getUser()
      
      const visiteData = {
        nom_visiteur: formData.nom_visiteur,
        telephone: formData.telephone,
        sexe: formData.sexe,
        est_membre: formData.est_membre,
        membre_id: formData.est_membre ? parseInt(formData.membre_id) : null,
        motif: formData.motif,
        autre_motif: formData.motif === 'Autre' ? formData.autre_motif : null,
        date_visite: format(dateCourante, 'yyyy-MM-dd'),
        heure: formData.heure,
        observations: formData.observations || null,
        cree_par: user?.id || 1,
        statut: 'En attente'
      }

      const { error } = await supabase
        .from('visites')
        .insert([visiteData])

      if (error) throw error

      setShowModal(false)
      resetForm()
      chargerVisites()
    } catch (error) {
      console.error('Erreur création:', error)
      alert('Erreur lors de la création')
    } finally {
      setEnregistrementEnCours(false)
    }
  }

  const updateStatut = async (visiteId: number, nouveauStatut: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      // Récupérer l'ancien statut
      const { data: visite } = await supabase
        .from('visites')
        .select('statut')
        .eq('id', visiteId)
        .single()

      // Mettre à jour le statut
      const { error } = await supabase
        .from('visites')
        .update({ 
          statut: nouveauStatut,
          modifie_par: user?.id || 1
        })
        .eq('id', visiteId)

      if (error) throw error

      // Enregistrer dans l'historique
      await supabase
        .from('historique_visites')
        .insert([{
          visite_id: visiteId,
          ancien_statut: visite?.statut,
          nouveau_statut: nouveauStatut,
          modifie_par: user?.id || 1,
          commentaire: `Changement de statut via l'interface`
        }])

      chargerVisites()
    } catch (error) {
      console.error('Erreur mise à jour:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      nom_visiteur: '',
      telephone: '',
      sexe: 'Homme',
      est_membre: false,
      membre_id: '',
      motif: 'Conseil',
      autre_motif: '',
      heure: '',
      observations: ''
    })
    setSearchMembre('')
    setSearchMembreResults([])
  }

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'Confirmée': return 'bg-green-100 text-green-800 border-green-200'
      case 'En attente': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Reçue': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Annulée': return 'bg-red-100 text-red-800 border-red-200'
      case 'Reportée': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatutIcon = (statut: string) => {
    switch(statut) {
      case 'Confirmée': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'En attente': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'Reçue': return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'Annulée': return <XCircle className="w-4 h-4 text-red-600" />
      case 'Reportée': return <AlertCircle className="w-4 h-4 text-orange-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getMotifIcon = (motif: string) => {
    switch(motif) {
      case 'Prière': return '🙏'
      case 'Conseil': return '💬'
      case 'Orientation': return '🧭'
      default: return '📝'
    }
  }

  const generateHeures = () => {
    const heures = []
    const [debutH, debutM] = config.heures_ouverture.split(':').map(Number)
    const [finH, finM] = config.heures_fermeture.split(':').map(Number)
    
    let current = new Date()
    current.setHours(debutH, debutM, 0)
    const fin = new Date()
    fin.setHours(finH, finM, 0)

    // Récupérer les heures déjà prises
    const heuresPrises = visites
      .filter(v => v.statut !== 'Annulée' && v.statut !== 'Reportée')
      .map(v => v.heure.substring(0, 5))

    while (current <= fin) {
      const heureStr = current.toTimeString().substring(0, 5)
      const estPrise = heuresPrises.includes(heureStr)
      
      // Vérifier si l'heure est dans le passé
      const maintenant = new Date()
      const [heureCouranteH, heureCouranteM] = [maintenant.getHours(), maintenant.getMinutes()]
      const [heureSlotH, heureSlotM] = heureStr.split(':').map(Number)
      
      const estPassee = dateCourante.toDateString() === new Date().toDateString() && 
                       (heureSlotH < heureCouranteH || (heureSlotH === heureCouranteH && heureSlotM < heureCouranteM))
      
      heures.push({
        value: heureStr,
        label: heureStr,
        disponible: !estPrise && !estPassee,
        raison: estPrise ? 'Déjà réservé' : estPassee ? 'Heure passée' : 'Disponible'
      })
      
      current.setMinutes(current.getMinutes() + config.intervalle_rendez_vous)
    }
    
    return heures
  }

  const placesRestantes = config.quota_journalier - stats.total
  const pourcentageQuota = (stats.total / config.quota_journalier) * 100

  // Filtrer les visites par statut
  const visitesFiltrees = filtreStatut 
    ? visites.filter(v => v.statut === filtreStatut)
    : visites

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Planning des Visites Pastorales
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Réception uniquement les mardis et mercredis
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowStats(!showStats)}
                className="inline-flex items-center text-sm px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Stats
              </button>
              <button
                onClick={() => setShowModal(true)}
                disabled={placesRestantes <= 0}
                className="inline-flex text-sm items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Visite
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation et Quota avec Progress Line */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={navigationPrecedente}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">
                  {format(dateCourante, 'EEEE d MMMM yyyy', { locale: fr })}
                </span>
                <button
                  onClick={allerAujourdhui}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Aujourd'hui
                </button>
              </div>

              <button
                onClick={navigationSuivante}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Configuration:</span>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-lg">
                {config.heures_ouverture} - {config.heures_fermeture}
              </span>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-lg">
                {config.intervalle_rendez_vous} min
              </span>
            </div>
          </div>

          {/* Progress Line */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Quota journalier</span>
              <span className={`font-bold ${
                placesRestantes > 5 ? 'text-green-600' :
                placesRestantes > 0 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {stats.total} / {config.quota_journalier} ({placesRestantes} restantes)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-ful h-2">
              <div 
                className={`h-2 rounded-ful transition-all duration-500 ${
                  pourcentageQuota >= 100 ? 'bg-red-500' :
                  pourcentageQuota >= 80 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(pourcentageQuota, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>{Math.floor(config.quota_journalier * 0.25)}</span>
              <span>{Math.floor(config.quota_journalier * 0.5)}</span>
              <span>{Math.floor(config.quota_journalier * 0.75)}</span>
              <span>{config.quota_journalier}</span>
            </div>
          </div>
        </div>

        {/* Statistiques détaillées (toggle) */}
        {showStats && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Statistiques du jour
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Par statut</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600">En attente</span>
                    <span className="font-medium">{stats.en_attente}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Confirmées</span>
                    <span className="font-medium">{stats.confirmees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">Reçues</span>
                    <span className="font-medium">{stats.recues}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-600">Reportées</span>
                    <span className="font-medium">{stats.reportees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Annulées</span>
                    <span className="font-medium">{stats.annulees}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Par type</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Membres</span>
                    <span className="font-medium">{stats.membres}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Non-membres</span>
                    <span className="font-medium">{stats.non_membres}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Par motif</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Conseil</span>
                    <span className="font-medium">{stats.conseil}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Prière</span>
                    <span className="font-medium">{stats.priere}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Orientation</span>
                    <span className="font-medium">{stats.orientation}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Autre</span>
                    <span className="font-medium">{stats.autre}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Taux de remplissage</div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(pourcentageQuota)}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {stats.total} / {config.quota_journalier}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filtres rapides */}
        <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setFiltreStatut('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              !filtreStatut ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Tous ({stats.total})
          </button>
          <button
            onClick={() => setFiltreStatut('En attente')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filtreStatut === 'En attente' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            En attente ({stats.en_attente})
          </button>
          <button
            onClick={() => setFiltreStatut('Confirmée')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filtreStatut === 'Confirmée' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Confirmées ({stats.confirmees})
          </button>
          <button
            onClick={() => setFiltreStatut('Reçue')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filtreStatut === 'Reçue' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Reçues ({stats.recues})
          </button>
        </div>

        {/* Tableau des visites */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visiteur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motif</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Chargement des visites...</span>
                      </div>
                    </td>
                  </tr>
                ) : visitesFiltrees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center space-y-2">
                        <Calendar className="w-12 h-12 text-gray-300" />
                        <p>Aucune visite pour cette date</p>
                        {placesRestantes > 0 && (
                          <button
                            onClick={() => setShowModal(true)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            + Créer une visite
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  visitesFiltrees.map((visite) => (
                    <tr key={visite.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {visite.heure.substring(0, 5)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {visite.membre?.membre_profile ? (
                            <img 
                              src={visite.membre.membre_profile} 
                              alt={visite.nom_visiteur}
                              className="w-8 h-8 rounded-full mr-3 object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                {visite.nom_visiteur.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {visite.nom_visiteur}
                            </div>
                            {visite.est_membre && visite.membre && (
                              <div className="text-xs text-gray-500">
                                Membre depuis {format(parseISO(visite.created_at), 'dd/MM/yyyy')}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{visite.telephone}</div>
                        {visite.membre?.email && (
                          <div className="text-xs text-gray-500">{visite.membre.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          visite.est_membre ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {visite.est_membre ? 'Membre' : 'Non membre'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          {visite.motif}
                          {visite.motif === 'Autre' && visite.autre_motif && (
                            <span className="ml-1 text-xs text-gray-500">({visite.autre_motif})</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatutIcon(visite.statut)}
                          <select
                            value={visite.statut}
                            onChange={(e) => updateStatut(visite.id, e.target.value)}
                            className={`text-xs rounded-full px-3 py-1 font-medium border ${getStatutColor(visite.statut)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          >
                            <option value="En attente">En attente</option>
                            <option value="Confirmée">Confirmée</option>
                            <option value="Reçue">Reçue</option>
                            <option value="Reportée">Reportée</option>
                            <option value="Annulée">Annulée</option>
                          </select>
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => alert(`Détails de la visite:\n\nNom: ${visite.nom_visiteur}\nTéléphone: ${visite.telephone}\nMotif: ${visite.motif}${visite.autre_motif ? ` (${visite.autre_motif})` : ''}\nStatut: ${visite.statut}\nObservations: ${visite.observations || 'Aucune'}`)}
                          className="text-blue-600 hover:text-blue-900 font-medium mr-3"
                        >
                          Détails
                        </button>
                        {visite.observations && (
                          <span className="text-xs text-gray-400" title={visite.observations}>
                            📝
                          </span>
                        )}
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Légende */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm bg-white rounded-lg p-3">
          <span className="flex items-center">
            <span className="w-3 h-3 bg-green-100 border border-green-200 rounded-full mr-2"></span>
            Membre
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-full mr-2"></span>
            Non membre
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 text-yellow-600 mr-1" />
            En attente
          </span>
          <span className="flex items-center">
            <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
            Confirmée
          </span>
          <span className="flex items-center">
            <CheckCircle className="w-3 h-3 text-blue-600 mr-1" />
            Reçue
          </span>
          <span className="flex items-center">
            <AlertCircle className="w-3 h-3 text-orange-600 mr-1" />
            Reportée
          </span>
          <span className="flex items-center">
            <XCircle className="w-3 h-3 text-red-600 mr-1" />
            Annulée
          </span>
        </div>
      </div>

      {/* Modal Nouvelle Visite */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b bg-gray-50 sticky top-0">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Nouvelle Visite
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {format(dateCourante, 'EEEE d MMMM yyyy', { locale: fr })}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {/* Recherche membre */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rechercher un membre existant
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchMembre}
                    onChange={(e) => setSearchMembre(e.target.value)}
                    placeholder="Nom du membre..."
                    className="w-full border rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                {searchMembreResults.length > 0 && (
                  <div className="mt-2 border rounded-lg max-h-60 overflow-y-auto">
                    {searchMembreResults.map((membre) => (
                      <div
                        key={membre.id}
                        onClick={() => handleMembreSelect(membre)}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center border-b last:border-b-0"
                      >
                        {membre.membre_profile ? (
                          <img src={membre.membre_profile} alt="" className="w-8 h-8 rounded-full mr-3 object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                            <UserPlus className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{membre.nom_complet}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <Phone className="w-3 h-3 mr-1" />
                            {membre.numero}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Formulaire */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nom_visiteur}
                      onChange={(e) => setFormData({...formData, nom_visiteur: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom du visiteur"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Numéro de téléphone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sexe
                    </label>
                    <select
                      value={formData.sexe}
                      onChange={(e) => setFormData({...formData, sexe: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heure du rendez-vous *
                    </label>
                    <select
                      required
                      value={formData.heure}
                      onChange={(e) => setFormData({...formData, heure: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionnez une heure</option>
                      {generateHeures().map((heure) => (
                        <option 
                          key={heure.value} 
                          value={heure.value}
                          disabled={!heure.disponible}
                          className={!heure.disponible ? 'text-gray-400 bg-gray-50' : ''}
                        >
                          {heure.label} {!heure.disponible && `(${heure.raison})`}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Créneaux de {config.intervalle_rendez_vous} minutes
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motif *
                    </label>
                    <select
                      required
                      value={formData.motif}
                      onChange={(e) => setFormData({...formData, motif: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Conseil">Conseil 💬</option>
                      <option value="Prière">Prière 🙏</option>
                      <option value="Orientation">Orientation 🧭</option>
                      <option value="Autre">Autre 📝</option>
                    </select>
                  </div>

                  {formData.motif === 'Autre' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Précisez le motif
                      </label>
                      <input
                        type="text"
                        value={formData.autre_motif}
                        onChange={(e) => setFormData({...formData, autre_motif: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description du motif"
                      />
                    </div>
                  )}

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observations
                    </label>
                    <textarea
                      rows={3}
                      value={formData.observations}
                      onChange={(e) => setFormData({...formData, observations: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Informations complémentaires (motif détaillé, besoins particuliers, etc.)"
                    />
                  </div>
                </div>

                {/* Résumé */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Résumé de la visite</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-blue-600">Date:</div>
                    <div className="text-gray-800">{format(dateCourante, 'dd/MM/yyyy')}</div>
                    <div className="text-blue-600">Heure:</div>
                    <div className="text-gray-800">{formData.heure || 'Non définie'}</div>
                    <div className="text-blue-600">Statut initial:</div>
                    <div className="text-gray-800">En attente</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={enregistrementEnCours}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  disabled={placesRestantes <= 0 || enregistrementEnCours}
                >
                  {enregistrementEnCours ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    'Créer la visite'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}