// // app/historique/page.tsx
// import { getUser } from '@/actions/auth'
// import { redirect } from 'next/navigation'
// import { supabase } from '@/lib/supabase'
// import HistoriqueSuivi from './HistoriqueSuivi'
// import { ArrowLeft, Calendar } from 'lucide-react'
// import Link from 'next/link'

// // Interface pour le type de retour de Supabase
// interface SupabaseVisite {
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
//     email: string
//     numero: string
//     membre_profile: string | null
//   }[] | null
// }

// export default async function HistoriquePage() {
//   const user = await getUser()

//   if (!user || !['admin', 'secretaire'].includes(user.role?.nom)) {
//     redirect('/profile')
//   }

//   // Récupérer tout l'historique des visites (toutes les dates)
//   const { data: supabaseVisites, error } = await supabase
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
//     .order('date_visite', { ascending: false })
//     .order('heure', { ascending: true }) as { data: SupabaseVisite[] | null, error: any }

//   if (error) {
//     console.error('Erreur chargement historique:', error)
//   }

//   // Transformer les données pour correspondre au format attendu par HistoriqueSuivi
//   const visites = supabaseVisites?.map(visite => ({
//     id: visite.id,
//     nom_visiteur: visite.nom_visiteur,
//     telephone: visite.telephone,
//     heure: visite.heure,
//     motif: visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif,
//     statut: visite.statut,
//     date_visite: visite.date_visite,
//     est_membre: visite.est_membre,
//     membre: visite.membre && visite.membre.length > 0 ? {
//       id: visite.membre[0].id,
//       nom_complet: visite.membre[0].nom_complet,
//       membre_profile: visite.membre[0].membre_profile
//     } : null
//   })) || []

//   // Statistiques globales
//   const stats = {
//     total: visites.length,
//     enAttente: visites.filter(v => v.statut === 'En attente').length,
//     confirmees: visites.filter(v => v.statut === 'Confirmée').length,
//     recues: visites.filter(v => v.statut === 'Reçue').length,
//     reportees: visites.filter(v => v.statut === 'Reportée').length,
//     annulees: visites.filter(v => v.statut === 'Annulée').length
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* En-tête avec navigation */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="/visites"
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="h-5 w-5 text-gray-500" />
//               </Link>
//               <div>
//                 <h1 className="text-2xl font-semibold text-gray-900">
//                   Historique complet des visites
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Consultez et filtrez l'ensemble des visites enregistrées
//                 </p>
//               </div>
//             </div>

//             {/* Mini stats */}
//             <div className="flex gap-6 bg-white px-6 py-3 rounded-lg border border-gray-200">
//               <div className="text-center">
//                 <div className="text-2xl font-light text-gray-900">{stats.total}</div>
//                 <div className="text-xs text-gray-400">Total</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-light text-green-600">{stats.recues}</div>
//                 <div className="text-xs text-gray-400">Reçues</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-light text-blue-600">{stats.confirmees}</div>
//                 <div className="text-xs text-gray-400">Confirmées</div>
//               </div>
//             </div>
//           </div>

//           {/* Période couverte */}
//           {visites.length > 0 && (
//             <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
//               <Calendar className="h-4 w-4" />
//               <span>
//                 Du {new Date(visites[visites.length - 1].date_visite).toLocaleDateString('fr-FR')} 
//                 {' au '}
//                 {new Date(visites[0].date_visite).toLocaleDateString('fr-FR')}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Composant d'historique */}
//         <HistoriqueSuivi visites={visites} />
//       </div>
//     </div>
//   )
// }

// app/historique/page.tsx
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import HistoriqueSuivi from './HistoriqueSuivi'
import { ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'

// Interface pour le type de retour de Supabase
interface SupabaseVisite {
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
    email: string
    numero: string
    membre_profile: string | null
  }[] | null
}

export default async function HistoriquePage() {
  const user = await getUser()

  if (!user || !['admin', 'secretaire'].includes(user.role?.nom)) {
    redirect('/profile')
  }

  // Date du jour pour ne récupérer que l'historique (avant aujourd'hui)
  const today = new Date().toISOString().split('T')[0]

  // Récupérer l'historique des visites (uniquement les dates avant aujourd'hui)
  const { data: supabaseVisites, error } = await supabase
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
    .lt('date_visite', today) // Uniquement les dates avant aujourd'hui
    .order('date_visite', { ascending: false })
    .order('heure', { ascending: true })

  if (error) {
    console.error('Erreur chargement historique:', error)
  }

  // Transformer les données pour correspondre au format attendu par HistoriqueSuivi
  const visites = supabaseVisites?.map(visite => ({
    id: visite.id,
    nom_visiteur: visite.nom_visiteur,
    telephone: visite.telephone,
    heure: visite.heure,
    motif: visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif,
    statut: visite.statut,
    date_visite: visite.date_visite,
    est_membre: visite.est_membre,
    membre: visite.membre && visite.membre.length > 0 ? {
      id: visite.membre[0].id,
      nom_complet: visite.membre[0].nom_complet,
      membre_profile: visite.membre[0].membre_profile // Déjà géré par HistoriqueSuivi pour l'affichage photo/initiales
    } : null
  })) || []

  // Statistiques globales
  const stats = {
    total: visites.length,
    enAttente: visites.filter(v => v.statut === 'En attente').length,
    confirmees: visites.filter(v => v.statut === 'Confirmée').length,
    recues: visites.filter(v => v.statut === 'Reçue').length,
    reportees: visites.filter(v => v.statut === 'Reportée').length,
    annulees: visites.filter(v => v.statut === 'Annulée').length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête avec navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/visites"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Historique des visites passées
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Consultez toutes les visites qui ont eu lieu avant aujourd'hui
                </p>
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex gap-6 bg-white px-6 py-3 rounded-lg border border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900">{stats.total}</div>
                <div className="text-xs text-gray-400">Total visites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-green-600">{stats.recues}</div>
                <div className="text-xs text-gray-400">Reçues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-yellow-600">{stats.enAttente + stats.confirmees}</div>
                <div className="text-xs text-gray-400">À traiter</div>
              </div>
            </div>
          </div>

          {/* Période couverte */}
          {visites.length > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-lg">
              <Calendar className="h-4 w-4" />
              <span>
                Du {new Date(visites[visites.length - 1].date_visite).toLocaleDateString('fr-FR')} 
                {' au '}
                {new Date(visites[0].date_visite).toLocaleDateString('fr-FR')}
              </span>
              <span className="text-xs text-gray-400 ml-2">
                ({visites.length} visite{visites.length > 1 ? 's' : ''})
              </span>
            </div>
          )}

          {visites.length === 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
              <Calendar className="h-4 w-4" />
              <span>Aucune visite passée pour le moment</span>
            </div>
          )}
        </div>

        {/* Composant d'historique */}
        <HistoriqueSuivi visites={visites} />
      </div>
    </div>
  )
}