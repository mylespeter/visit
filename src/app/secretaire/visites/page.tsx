
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import VisitesTabs from './VisitesTabs'

export default async function VisitesPage() {
  const user = await getUser()

  if (!user || !['admin', 'secretaire'].includes(user.role?.nom)) {
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
  console.log('Date du jour:', today) // Pour debug

  // Récupérer les visites du jour
  const { data: visitesJour, error: errorJour } = await supabase
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
    .eq('date_visite', today)
    .order('heure', { ascending: true })

  if (errorJour) {
    console.error('Erreur visites jour:', errorJour)
  }

  // Récupérer les visites à venir (après aujourd'hui)
  const { data: visitesAVenir, error: errorAVenir } = await supabase
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
    .gt('date_visite', today)
    .order('date_visite', { ascending: true })
    .order('heure', { ascending: true })

  if (errorAVenir) {
    console.error('Erreur visites à venir:', errorAVenir)
  }

  // Récupérer l'historique des visites (avant aujourd'hui)
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

  // Logs pour debug
  console.log('Visites jour trouvées:', visitesJour?.length || 0)
  console.log('Visites à venir trouvées:', visitesAVenir?.length || 0)
  console.log('Historique trouvé:', historiqueVisites?.length || 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* En-tête */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900">Visites</h1>
              <p className="text-sm text-gray-500 mt-2">
                Gérez les rendez-vous des visiteurs (Mardis et Mercredis uniquement)
              </p>
            </div>
            
         
            <div className="flex gap-6">
              <div className="text-right">
                <div className="text-3xl font-light text-gray-900">
                  {visitesJour?.length || 0}
                </div>
                <div className="text-xs text-gray-400 mt-1">Aujourd'hui</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-light text-gray-900">
                  {visitesAVenir?.length || 0}
                </div>
                <div className="text-xs text-gray-400 mt-1">À venir</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-light text-gray-900">
                  {historiqueVisites?.length || 0}
                </div>
                <div className="text-xs text-gray-400 mt-1">Historique</div>
              </div>
            </div>
          </div>

       
        </div>

        {/* Tabs avec tout le contenu */}
        <VisitesTabs 
          config={config}
          visitesJour={visitesJour || []}
          visitesAVenir={visitesAVenir || []}
          historiqueVisites={historiqueVisites || []}
        />
      </div>
    </div>
  )
}