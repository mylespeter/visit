import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  const { data, error } = await supabase
    .from('membres')
    .select('id, nom_complet, numero, email, sexe, membre_profile')
    .ilike('nom_complet', `%${q}%`)
    .order('nom_complet')
    .limit(10)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}