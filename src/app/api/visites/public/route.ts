// app/api/visites/public/route.ts - API route pour les visites publiques
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date requise' }, { status: 400 })
    }

    // Récupérer les visites du jour (uniquement les non annulées pour l'affichage public)
    const { data, error } = await supabase
      .from('visites')
      .select('id, heure, nom_visiteur, telephone, statut, motif')
      .eq('date_visite', date)
      .neq('statut', 'Annulée')
      .order('heure', { ascending: true })

    if (error) throw error

    // Ajouter un email fictif si non présent (pour l'affichage)
    const visitesWithEmail = data?.map(visite => ({
      ...visite,
      email: visite.telephone ? `${visite.telephone.replace(/\s/g, '')}@visiteur.local` : null
    })) || []

    return NextResponse.json({ success: true, data: visitesWithEmail })
  } catch (error) {
    console.error('Erreur API visites publiques:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}