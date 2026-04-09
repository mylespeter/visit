// app/api/auth/me/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Non connecté' }, { status: 401 })
    }
    
    const { data: user, error } = await supabase
      .from('compte')
      .select('id, nom_complet, email, role:role_id(id, nom)')
      .eq('id', parseInt(userId))
      .single()
    
    if (error || !user) {
      return NextResponse.json({ success: false, error: 'Utilisateur non trouvé' }, { status: 401 })
    }
    
    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        nom_complet: user.nom_complet,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 })
  }
}