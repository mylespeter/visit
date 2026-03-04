'use server'

import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Créer une visite
export async function createVisite(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    if (!userId) {
      return { error: 'Non autorisé' }
    }

    const data = {
      nom_visiteur: formData.get('nom_visiteur') as string,
      telephone: formData.get('telephone') as string,
      sexe: formData.get('sexe') as string,
      est_membre: formData.get('est_membre') === 'true',
      membre_id: formData.get('membre_id') ? parseInt(formData.get('membre_id') as string) : null,
      motif: formData.get('motif') as string,
      autre_motif: formData.get('autre_motif') as string || null,
      date_visite: formData.get('date_visite') as string,
      heure: formData.get('heure') as string,
      observations: formData.get('observations') as string || null,
      cree_par: parseInt(userId),
      statut: 'En attente'
    }

    // Vérifier le quota journalier
    const { count } = await supabase
      .from('visites')
      .select('*', { count: 'exact', head: true })
      .eq('date_visite', data.date_visite)
      .in('statut', ['En attente', 'Confirmée'])

    const { data: config } = await supabase
      .from('configuration')
      .select('valeur')
      .eq('cle', 'quota_journalier')
      .single()

    const quota = parseInt(config?.valeur || '15')
    
    if (count && count >= quota) {
      return { error: 'Quota journalier atteint' }
    }

    const { data: visite, error } = await supabase
      .from('visites')
      .insert([data])
      .select()
      .single()

    if (error) throw error

    revalidatePath('/secretaire/visites')
    return { success: true, visite }
  } catch (error) {
    return { error: 'Erreur lors de la création' }
  }
}

// Mettre à jour le statut
export async function updateStatut(visiteId: number, nouveauStatut: string, commentaire?: string) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    if (!userId) {
      return { error: 'Non autorisé' }
    }

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
        modifie_par: parseInt(userId)
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
        modifie_par: parseInt(userId),
        commentaire
      }])

    revalidatePath('/secretaire/visites')
    return { success: true }
  } catch (error) {
    return { error: 'Erreur lors de la mise à jour' }
  }
}

// Récupérer les visites du jour
export async function getVisitesDuJour() {
  try {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('visites')
      .select(`
        *,
        membre:membre_id (nom_complet, numero),
        cree_par:id_cree (nom_complet)
      `)
      .eq('date_visite', today)
      .order('heure', { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    return { error: 'Erreur de chargement' }
  }
}

// Récupérer les statistiques
export async function getStatistiques(debut: string, fin: string) {
  try {
    const { data, error } = await supabase
      .from('visites')
      .select('*')
      .gte('date_visite', debut)
      .lte('date_visite', fin)

    if (error) throw error

    const stats = {
      total: data.length,
      par_motif: {} as Record<string, number>,
      par_statut: {} as Record<string, number>,
      par_jour: {} as Record<string, number>
    }

    data.forEach(visite => {
      stats.par_motif[visite.motif] = (stats.par_motif[visite.motif] || 0) + 1
      stats.par_statut[visite.statut] = (stats.par_statut[visite.statut] || 0) + 1
      stats.par_jour[visite.date_visite] = (stats.par_jour[visite.date_visite] || 0) + 1
    })

    return { success: true, stats }
  } catch (error) {
    return { error: 'Erreur de calcul' }
  }
}



export async function getVisitesParDate(date: string) {
  try {
    const { data, error } = await supabase
      .from('visites')
      .select(`
        *,
        membre:membre_id (nom_complet, membre_profile)
      `)
      .eq('date_visite', date)
      .order('heure', { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    return { error: 'Erreur de chargement' }
  }
}

export async function checkVisiteurExists(date: string, telephone: string) {
  try {
    const { data, error } = await supabase
      .from('visites')
      .select('id')
      .eq('date_visite', date)
      .eq('telephone', telephone)
      .in('statut', ['En attente', 'Confirmée'])

    if (error) throw error
    return { success: true, exists: data && data.length > 0 }
  } catch (error) {
    return { error: 'Erreur de vérification' }
  }
}