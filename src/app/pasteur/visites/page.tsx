// // app/pasteur/visites/page.tsx
// import { getUser } from '@/actions/auth'
// import { redirect } from 'next/navigation'
// import { supabase } from '@/lib/supabase'
// import PasteurVisitesTabs from './PasteurVisitesTabs'

// // Types adaptés à votre structure
// export interface Visite {
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
//   membre: {
//     id: number
//     nom_complet: string
//     email: string | null
//     numero: string
//     membre_profile: string | null
//   } | null
// }

// export interface NotePrivee {
//   id: number
//   pasteur_id: number
//   titre: string
//   contenu: string
//   visite_id: number | null
//   created_at: string
//   updated_at: string
// }

// export default async function PasteurVisitesPage() {
//   const user = await getUser()

//   if (!user || user.role?.nom !== 'pasteur') {
//     redirect('/profile')
//   }

//   // Récupérer les configurations
//   const { data: configs, error: configError } = await supabase
//     .from('configuration')
//     .select('*')

//   if (configError) {
//     console.error('Erreur configuration:', configError)
//   }

//   const config = configs?.reduce((acc, item) => {
//     acc[item.cle] = item.valeur
//     return acc
//   }, {} as Record<string, string>) || {}

//   // Date du jour formatée
//   const today = new Date().toISOString().split('T')[0]
  
//   // Calculer les dates des prochains mardi et mercredi
//   const getNextDayDate = (dayIndex: number) => {
//     const today = new Date()
//     const currentDay = today.getDay()
//     let daysToAdd = dayIndex - currentDay
//     if (daysToAdd <= 0) daysToAdd += 7
//     const nextDate = new Date(today)
//     nextDate.setDate(today.getDate() + daysToAdd)
//     return nextDate.toISOString().split('T')[0]
//   }

//   const nextTuesday = getNextDayDate(2)
//   const nextWednesday = getNextDayDate(3)

//   // Récupérer les visites de la semaine
//   const nextWeekDate = new Date()
//   nextWeekDate.setDate(nextWeekDate.getDate() + 7)
//   const nextWeekDateStr = nextWeekDate.toISOString().split('T')[0]

//   const { data: visitesSemaine, error: errorSemaine } = await supabase
//     .from('visites')
//     .select(`
//       id,
//       nom_visiteur,
//       telephone,
//       sexe,
//       est_membre,
//       membre_id,
//       motif,
//       autre_motif,
//       date_visite,
//       heure,
//       observations,
//       statut,
//       created_at,
//       membre:membre_id (
//         id,
//         nom_complet,
//         email,
//         numero,
//         membre_profile
//       )
//     `)
//     .gte('date_visite', today)
//     .lte('date_visite', nextWeekDateStr)
//     .order('date_visite', { ascending: true })
//     .order('heure', { ascending: true })

//   if (errorSemaine) {
//     console.error('Erreur visites semaine:', errorSemaine)
//   }

//   // Compter les visites pour mardi et mercredi prochains
//   const visitesMardiProchain = visitesSemaine?.filter(v => v.date_visite === nextTuesday) || []
//   const visitesMercrediProchain = visitesSemaine?.filter(v => v.date_visite === nextWednesday) || []

//   // Récupérer les visites planifiées (à venir)
//   const { data: visitesPlanifiees, error: errorPlanifiees } = await supabase
//     .from('visites')
//     .select(`
//       id,
//       nom_visiteur,
//       telephone,
//       sexe,
//       est_membre,
//       membre_id,
//       motif,
//       autre_motif,
//       date_visite,
//       heure,
//       observations,
//       statut,
//       created_at,
//       membre:membre_id (
//         id,
//         nom_complet,
//         email,
//         numero,
//         membre_profile
//       )
//     `)
//     .gte('date_visite', today)
//     .order('date_visite', { ascending: true })
//     .order('heure', { ascending: true })

//   if (errorPlanifiees) {
//     console.error('Erreur visites planifiées:', errorPlanifiees)
//   }

//   // Récupérer l'historique des visites
//   const { data: historiqueVisites, error: errorHistorique } = await supabase
//     .from('visites')
//     .select(`
//       id,
//       nom_visiteur,
//       telephone,
//       sexe,
//       est_membre,
//       membre_id,
//       motif,
//       autre_motif,
//       date_visite,
//       heure,
//       observations,
//       statut,
//       created_at,
//       membre:membre_id (
//         id,
//         nom_complet,
//         email,
//         numero,
//         membre_profile
//       )
//     `)
//     .lt('date_visite', today)
//     .order('date_visite', { ascending: false })
//     .limit(50)

//   if (errorHistorique) {
//     console.error('Erreur historique:', errorHistorique)
//   }

//   // Récupérer les notes privées du pasteur
//   const { data: notesPrivees, error: errorNotes } = await supabase
//     .from('notes_pasteur')
//     .select('*')
//     .eq('pasteur_id', user.id)
//     .order('created_at', { ascending: false })

//   if (errorNotes) {
//     console.error('Erreur notes privées:', errorNotes)
//   }

//   // Fonction pour transformer les données Supabase
//   const transformVisite = (visite: any): Visite => ({
//     id: visite.id,
//     nom_visiteur: visite.nom_visiteur,
//     telephone: visite.telephone,
//     sexe: visite.sexe,
//     est_membre: visite.est_membre,
//     membre_id: visite.membre_id,
//     motif: visite.motif,
//     autre_motif: visite.autre_motif,
//     date_visite: visite.date_visite,
//     heure: visite.heure,
//     observations: visite.observations,
//     statut: visite.statut,
//     created_at: visite.created_at,
//      membre: visite.membre ? {
//     id: visite.membre.id,
//     nom_complet: visite.membre.nom_complet,
//     email: visite.membre.email,
//     numero: visite.membre.numero,
//     membre_profile: visite.membre.membre_profile // Make sure this is included
//   } : null
//     // membre: visite.membre && visite.membre.length > 0 ? visite.membre[0] : null
//   })

//   // Transformer les données
//   const visitesPlanifieesTransformees = (visitesPlanifiees || []).map(transformVisite)
//   const historiqueVisitesTransformees = (historiqueVisites || []).map(transformVisite)
//   const visitesSemaineTransformees = (visitesSemaine || []).map(transformVisite)

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* En-tête avec style calendrier */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-light text-gray-900">Pasteur - Planning des visites</h1>
//               <p className="text-sm text-gray-500 mt-2">
//                 Consultez et gérez les rendez-vous (Mardis et Mercredis uniquement)
//               </p>
//             </div>
            
//             {/* Badges pour mardi et mercredi prochains */}
//             <div className="flex gap-4">
//               <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center min-w-[180px] shadow-sm">
//                 <div className="text-sm font-medium text-blue-600 mb-2">Mardi prochain</div>
//                 <div className="text-4xl font-light text-blue-700 mb-1">
//                   {visitesMardiProchain.length}
//                 </div>
//                 <div className="text-xs text-blue-500">rendez-vous</div>
//                 <div className="text-xs text-blue-400 mt-2 font-medium">
//                   {new Date(nextTuesday).toLocaleDateString('fr-FR', { 
//                     weekday: 'long', 
//                     day: 'numeric', 
//                     month: 'long' 
//                   })}
//                 </div>
//               </div>
              
//               <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center min-w-[180px] shadow-sm">
//                 <div className="text-sm font-medium text-green-600 mb-2">Mercredi prochain</div>
//                 <div className="text-4xl font-light text-green-700 mb-1">
//                   {visitesMercrediProchain.length}
//                 </div>
//                 <div className="text-xs text-green-500">rendez-vous</div>
//                 <div className="text-xs text-green-400 mt-2 font-medium">
//                   {new Date(nextWednesday).toLocaleDateString('fr-FR', { 
//                     weekday: 'long', 
//                     day: 'numeric', 
//                     month: 'long' 
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Mini calendrier de la semaine */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-sm font-medium text-gray-700 mb-4">Aperçu de la semaine</h3>
//             <div className="grid grid-cols-7 gap-3">
//               {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((jour, index) => {
//                 const date = new Date()
//                 date.setDate(date.getDate() + ((index + 1) - date.getDay() + 7) % 7)
//                 const dateStr = date.toISOString().split('T')[0]
//                 const visitesJour = visitesSemaineTransformees.filter(v => v.date_visite === dateStr)
//                 const isToday = dateStr === today
//                 const isMardi = index === 1
//                 const isMercredi = index === 2
                
//                 return (
//                   <div 
//                     key={jour} 
//                     className={`
//                       text-center p-3 rounded-xl transition-all
//                       ${isToday ? 'bg-indigo-50 border-2 border-indigo-200' : 'hover:bg-gray-50 border border-transparent'}
//                       ${isMardi ? 'bg-blue-50/50' : ''}
//                       ${isMercredi ? 'bg-green-50/50' : ''}
//                     `}
//                   >
//                     <div className={`text-xs font-medium mb-1 ${
//                       isToday ? 'text-indigo-600' : 
//                       isMardi ? 'text-blue-600' :
//                       isMercredi ? 'text-green-600' :
//                       'text-gray-500'
//                     }`}>
//                       {jour.substring(0, 3)}
//                     </div>
//                     <div className={`text-lg ${isToday ? 'font-bold text-indigo-700' : 'font-medium text-gray-700'}`}>
//                       {date.getDate()}
//                     </div>
//                     {visitesJour.length > 0 && (
//                       <div className={`
//                         text-xs font-medium mt-2 px-2 py-1 rounded-full
//                         ${isMardi ? 'bg-blue-100 text-blue-700' : 
//                           isMercredi ? 'bg-green-100 text-green-700' : 
//                           'bg-gray-100 text-gray-700'}
//                       `}>
//                         {visitesJour.length} visite{visitesJour.length > 1 ? 's' : ''}
//                       </div>
//                     )}
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Tabs avec les trois sections */}
//         <PasteurVisitesTabs 
//           config={config}
//           visitesPlanifiees={visitesPlanifieesTransformees}
//           historiqueVisites={historiqueVisitesTransformees}
//           notesPrivees={notesPrivees || []}
//           pasteurId={user.id}
//         />
//       </div>
//     </div>
//   )
// }



// app/pasteur/visites/page.tsx
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PasteurVisitesTabs from './PasteurVisitesTabs'

// Types adaptés à votre structure
export interface Visite {
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
  membre: {
    id: number
    nom_complet: string
    email: string | null
    numero: string
    membre_profile: string | null
  } | null
}

export interface NotePrivee {
  id: number
  pasteur_id: number
  titre: string
  contenu: string
  visite_id: number | null
  created_at: string
  updated_at: string
}

export default async function PasteurVisitesPage() {
  const user = await getUser()

  if (!user || user.role?.nom !== 'pasteur') {
    redirect('/profile')
  }

  // Récupérer les configurations
  const { data: configs, error: configError } = await supabase
    .from('configuration')
    .select('*')

  if (configError) {
    console.error('Erreur configuration:', configError)
  }

  const config = configs?.reduce((acc, item) => {
    acc[item.cle] = item.valeur
    return acc
  }, {} as Record<string, string>) || {}

  // Date du jour formatée
  const today = new Date().toISOString().split('T')[0]
  
  // Calculer les dates des prochains mardi et mercredi
  const getNextDayDate = (dayIndex: number) => {
    const today = new Date()
    const currentDay = today.getDay()
    let daysToAdd = dayIndex - currentDay
    if (daysToAdd <= 0) daysToAdd += 7
    const nextDate = new Date(today)
    nextDate.setDate(today.getDate() + daysToAdd)
    return nextDate.toISOString().split('T')[0]
  }

  const nextTuesday = getNextDayDate(2)
  const nextWednesday = getNextDayDate(3)

  // Récupérer les visites de la semaine
  const nextWeekDate = new Date()
  nextWeekDate.setDate(nextWeekDate.getDate() + 7)
  const nextWeekDateStr = nextWeekDate.toISOString().split('T')[0]

  const { data: visitesSemaine, error: errorSemaine } = await supabase
    .from('visites')
    .select(`
      id,
      nom_visiteur,
      telephone,
      sexe,
      est_membre,
      membre_id,
      motif,
      autre_motif,
      date_visite,
      heure,
      observations,
      statut,
      created_at,
      membre:membre_id (
        id,
        nom_complet,
        email,
        numero,
        membre_profile
      )
    `)
    .gte('date_visite', today)
    .lte('date_visite', nextWeekDateStr)
    .order('date_visite', { ascending: true })
    .order('heure', { ascending: true })

  if (errorSemaine) {
    console.error('Erreur visites semaine:', errorSemaine)
  }

  // Compter les visites pour mardi et mercredi prochains
  const visitesMardiProchain = visitesSemaine?.filter(v => v.date_visite === nextTuesday) || []
  const visitesMercrediProchain = visitesSemaine?.filter(v => v.date_visite === nextWednesday) || []

  // Récupérer les visites planifiées (à venir)
  const { data: visitesPlanifiees, error: errorPlanifiees } = await supabase
    .from('visites')
    .select(`
      id,
      nom_visiteur,
      telephone,
      sexe,
      est_membre,
      membre_id,
      motif,
      autre_motif,
      date_visite,
      heure,
      observations,
      statut,
      created_at,
      membre:membre_id (
        id,
        nom_complet,
        email,
        numero,
        membre_profile
      )
    `)
    .gte('date_visite', today)
    .order('date_visite', { ascending: true })
    .order('heure', { ascending: true })

  if (errorPlanifiees) {
    console.error('Erreur visites planifiées:', errorPlanifiees)
  }

  // Récupérer l'historique des visites
  const { data: historiqueVisites, error: errorHistorique } = await supabase
    .from('visites')
    .select(`
      id,
      nom_visiteur,
      telephone,
      sexe,
      est_membre,
      membre_id,
      motif,
      autre_motif,
      date_visite,
      heure,
      observations,
      statut,
      created_at,
      membre:membre_id (
        id,
        nom_complet,
        email,
        numero,
        membre_profile
      )
    `)
    .lt('date_visite', today)
    .order('date_visite', { ascending: false })
    .limit(50)

  if (errorHistorique) {
    console.error('Erreur historique:', errorHistorique)
  }

  // Récupérer les notes privées du pasteur
  const { data: notesPrivees, error: errorNotes } = await supabase
    .from('notes_pasteur')
    .select('*')
    .eq('pasteur_id', user.id)
    .order('created_at', { ascending: false })

  if (errorNotes) {
    console.error('Erreur notes privées:', errorNotes)
  }

  // Fonction pour transformer les données Supabase
  const transformVisite = (visite: any): Visite => ({
    id: visite.id,
    nom_visiteur: visite.nom_visiteur,
    telephone: visite.telephone,
    sexe: visite.sexe,
    est_membre: visite.est_membre,
    membre_id: visite.membre_id,
    motif: visite.motif,
    autre_motif: visite.autre_motif,
    date_visite: visite.date_visite,
    heure: visite.heure,
    observations: visite.observations,
    statut: visite.statut,
    created_at: visite.created_at,
    membre: visite.membre ? {
      id: visite.membre.id,
      nom_complet: visite.membre.nom_complet,
      email: visite.membre.email,
      numero: visite.membre.numero,
      membre_profile: visite.membre.membre_profile
    } : null
  })

  // Transformer les données
  const visitesPlanifieesTransformees = (visitesPlanifiees || []).map(transformVisite)
  const historiqueVisitesTransformees = (historiqueVisites || []).map(transformVisite)
  const visitesSemaineTransformees = (visitesSemaine || []).map(transformVisite)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* En-tête avec style calendrier */}
        <div className="mb-6 sm:mb-8">
          {/* Titre et badges en colonne sur mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-light text-gray-900">
                Planning des visites
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                Mardis et Mercredis uniquement
              </p>
            </div>
            
            {/* Badges mardi/mercredi - horizontaux sur mobile mais empilés si besoin */}
            <div className="flex flex-row sm:flex-row gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0">
              <div className="flex-1 sm:flex-none bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 text-center min-w-[140px] sm:min-w-[180px] shadow-sm">
                <div className="text-xs sm:text-sm font-medium text-blue-600 mb-1 sm:mb-2">
                  Mardi prochain
                </div>
                <div className="text-3xl sm:text-4xl font-light text-blue-700 mb-1">
                  {visitesMardiProchain.length}
                </div>
                <div className="text-xs text-blue-500">rendez-vous</div>
                <div className="text-xs text-blue-400 mt-1 sm:mt-2 font-medium truncate">
                  {new Date(nextTuesday).toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </div>
              </div>
              
              <div className="flex-1 sm:flex-none bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 text-center min-w-[140px] sm:min-w-[180px] shadow-sm">
                <div className="text-xs sm:text-sm font-medium text-green-600 mb-1 sm:mb-2">
                  Mercredi prochain
                </div>
                <div className="text-3xl sm:text-4xl font-light text-green-700 mb-1">
                  {visitesMercrediProchain.length}
                </div>
                <div className="text-xs text-green-500">rendez-vous</div>
                <div className="text-xs text-green-400 mt-1 sm:mt-2 font-medium truncate">
                  {new Date(nextWednesday).toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mini calendrier de la semaine - scroll horizontal sur mobile */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Aperçu de la semaine
            </h3>
            
            {/* Version mobile avec défilement horizontal */}
            <div className="sm:hidden overflow-x-auto -mx-4 px-4">
              <div className="flex gap-2 min-w-max pb-2">
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((jour, index) => {
                  const date = new Date()
                  date.setDate(date.getDate() + ((index + 1) - date.getDay() + 7) % 7)
                  const dateStr = date.toISOString().split('T')[0]
                  const visitesJour = visitesSemaineTransformees.filter(v => v.date_visite === dateStr)
                  const isToday = dateStr === today
                  const isMardi = index === 1
                  const isMercredi = index === 2
                  
                  return (
                    <div 
                      key={jour} 
                      className={`
                        w-24 p-2 rounded-xl transition-all flex-shrink-0
                        ${isToday ? 'bg-indigo-50 border-2 border-indigo-200' : 'bg-white border border-gray-100'}
                        ${isMardi ? 'bg-blue-50/50' : ''}
                        ${isMercredi ? 'bg-green-50/50' : ''}
                      `}
                    >
                      <div className={`text-xs font-medium mb-1 ${
                        isToday ? 'text-indigo-600' : 
                        isMardi ? 'text-blue-600' :
                        isMercredi ? 'text-green-600' :
                        'text-gray-500'
                      }`}>
                        {jour.substring(0, 3)}
                      </div>
                      <div className={`text-base ${isToday ? 'font-bold text-indigo-700' : 'font-medium text-gray-700'}`}>
                        {date.getDate()}
                      </div>
                      {visitesJour.length > 0 && (
                        <div className={`
                          text-xs font-medium mt-1 px-1 py-0.5 rounded-full text-center
                          ${isMardi ? 'bg-blue-100 text-blue-700' : 
                            isMercredi ? 'bg-green-100 text-green-700' : 
                            'bg-gray-100 text-gray-700'}
                        `}>
                          {visitesJour.length}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Version desktop - grille normale */}
            <div className="hidden sm:grid grid-cols-7 gap-3">
              {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((jour, index) => {
                const date = new Date()
                date.setDate(date.getDate() + ((index + 1) - date.getDay() + 7) % 7)
                const dateStr = date.toISOString().split('T')[0]
                const visitesJour = visitesSemaineTransformees.filter(v => v.date_visite === dateStr)
                const isToday = dateStr === today
                const isMardi = index === 1
                const isMercredi = index === 2
                
                return (
                  <div 
                    key={jour} 
                    className={`
                      text-center p-3 rounded-xl transition-all
                      ${isToday ? 'bg-indigo-50 border-2 border-indigo-200' : 'hover:bg-gray-50 border border-transparent'}
                      ${isMardi ? 'bg-blue-50/50' : ''}
                      ${isMercredi ? 'bg-green-50/50' : ''}
                    `}
                  >
                    <div className={`text-xs font-medium mb-1 ${
                      isToday ? 'text-indigo-600' : 
                      isMardi ? 'text-blue-600' :
                      isMercredi ? 'text-green-600' :
                      'text-gray-500'
                    }`}>
                      {jour.substring(0, 3)}
                    </div>
                    <div className={`text-lg ${isToday ? 'font-bold text-indigo-700' : 'font-medium text-gray-700'}`}>
                      {date.getDate()}
                    </div>
                    {visitesJour.length > 0 && (
                      <div className={`
                        text-xs font-medium mt-2 px-2 py-1 rounded-full
                        ${isMardi ? 'bg-blue-100 text-blue-700' : 
                          isMercredi ? 'bg-green-100 text-green-700' : 
                          'bg-gray-100 text-gray-700'}
                      `}>
                        {visitesJour.length} visite{visitesJour.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tabs avec les trois sections */}
        <PasteurVisitesTabs 
          config={config}
          visitesPlanifiees={visitesPlanifieesTransformees}
          historiqueVisites={historiqueVisitesTransformees}
          notesPrivees={notesPrivees || []}
          pasteurId={user.id}
        />
      </div>
    </div>
  )
}