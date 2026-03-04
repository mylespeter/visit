import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ error: 'Date requise' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('visites')
    .select('heure')
    .eq('date_visite', date)
    .in('statut', ['En attente', 'Confirmée'])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const heuresOccupees = data.map(v => v.heure.slice(0, 5)) // Format HH:MM

  return NextResponse.json({ occupes: heuresOccupees })
}