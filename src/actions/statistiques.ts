'use server'

import { supabase } from '@/lib/supabase'
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from 'date-fns'
import { fr } from 'date-fns/locale'

export interface StatsData {
  totalVisites: number
  parJour: Record<string, number>
  parMois: Record<string, number>
  parMotif: Record<string, number>
  parStatut: Record<string, number>
  parMembre: {
    membre: string
    count: number
    photo?: string | null
  }[]
  evolutionHebdo: {
    semaine: string
    count: number
  }[]
  evolutionMensuelle: {
    mois: string
    count: number
  }[]
}

export async function getStatistiques(periode: 'semaine' | 'mois' | 'annee' = 'mois') {
  try {
    const today = new Date()
    let debut: Date
    let fin: Date = today

    switch (periode) {
      case 'semaine':
        debut = startOfWeek(today, { weekStartsOn: 1 }) // Commence lundi
        break
      case 'mois':
        debut = startOfMonth(today)
        break
      case 'annee':
        debut = new Date(today.getFullYear(), 0, 1)
        break
      default:
        debut = startOfMonth(today)
    }

    const debutStr = format(debut, 'yyyy-MM-dd')
    const finStr = format(fin, 'yyyy-MM-dd')

    // Récupérer toutes les visites de la période
    const { data: visites, error } = await supabase
      .from('visites')
      .select(`
        *,
        membre:membre_id (
          id,
          nom_complet,
          membre_profile
        )
      `)
      .gte('date_visite', debutStr)
      .lte('date_visite', finStr)
      .order('date_visite', { ascending: true })

    if (error) throw error

    // Statistiques par jour
    const parJour: Record<string, number> = {}
    // Statistiques par mois
    const parMois: Record<string, number> = {}
    // Statistiques par motif
    const parMotif: Record<string, number> = {}
    // Statistiques par statut
    const parStatut: Record<string, number> = {}
    // Statistiques par membre
    const membreMap = new Map<string, { count: number; photo?: string | null }>()

    visites?.forEach(visite => {
      // Par jour
      parJour[visite.date_visite] = (parJour[visite.date_visite] || 0) + 1

      // Par mois
      const mois = format(new Date(visite.date_visite), 'MMMM yyyy', { locale: fr })
      parMois[mois] = (parMois[mois] || 0) + 1

      // Par motif
      parMotif[visite.motif] = (parMotif[visite.motif] || 0) + 1

      // Par statut
      parStatut[visite.statut] = (parStatut[visite.statut] || 0) + 1

      // Par membre
      if (visite.membre) {
        const key = visite.membre.id.toString()
        const current = membreMap.get(key) || { count: 0, photo: visite.membre.membre_profile }
        membreMap.set(key, { 
          count: current.count + 1, 
          photo: current.photo || visite.membre.membre_profile 
        })
      }
    })

    // Évolution hebdomadaire (8 dernières semaines)
    const evolutionHebdo = []
    for (let i = 7; i >= 0; i--) {
      const semaineDate = subWeeks(today, i)
      const debutSemaine = startOfWeek(semaineDate, { weekStartsOn: 1 })
      const finSemaine = endOfWeek(semaineDate, { weekStartsOn: 1 })
      
      const count = visites?.filter(v => {
        const date = new Date(v.date_visite)
        return date >= debutSemaine && date <= finSemaine
      }).length || 0

      evolutionHebdo.push({
        semaine: `S${format(semaineDate, 'w')}`,
        count
      })
    }

    // Évolution mensuelle (12 derniers mois)
    const evolutionMensuelle = []
    for (let i = 11; i >= 0; i--) {
      const moisDate = subMonths(today, i)
      const debutMois = startOfMonth(moisDate)
      const finMois = endOfMonth(moisDate)
      
      const count = visites?.filter(v => {
        const date = new Date(v.date_visite)
        return date >= debutMois && date <= finMois
      }).length || 0

      evolutionMensuelle.push({
        mois: format(moisDate, 'MMM yyyy', { locale: fr }),
        count
      })
    }

    // Convertir la Map des membres en tableau trié
    const parMembre = Array.from(membreMap.entries())
      .map(([id, data]) => ({
        membre: id,
        count: data.count,
        photo: data.photo
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10) // Top 10

    return {
      success: true,
      data: {
        totalVisites: visites?.length || 0,
        parJour,
        parMois,
        parMotif,
        parStatut,
        parMembre,
        evolutionHebdo,
        evolutionMensuelle
      }
    }
  } catch (error) {
    console.error('Erreur statistiques:', error)
    return { error: 'Erreur lors du chargement des statistiques' }
  }
}

export async function getStatistiquesParPeriode(debut: string, fin: string) {
  try {
    const { data: visites, error } = await supabase
      .from('visites')
      .select(`
        *,
        membre:membre_id (
          id,
          nom_complet,
          membre_profile
        )
      `)
      .gte('date_visite', debut)
      .lte('date_visite', fin)
      .order('date_visite', { ascending: true })

    if (error) throw error

    return { success: true, data: visites }
  } catch (error) {
    return { error: 'Erreur lors du chargement' }
  }
}