// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    
    // Supprimer tous les cookies de session
    cookieStore.delete('userId')
    cookieStore.delete('userRole')
    cookieStore.delete('userEmail')
    cookieStore.delete('userRoleName')
    cookieStore.delete('userName')
    
    // Alternative: définir les cookies avec maxAge=0 pour forcer la suppression
    cookieStore.set('userId', '', { maxAge: 0 })
    cookieStore.set('userRole', '', { maxAge: 0 })
    cookieStore.set('userEmail', '', { maxAge: 0 })
    cookieStore.set('userRoleName', '', { maxAge: 0 })
    cookieStore.set('userName', '', { maxAge: 0 })
    
    // Retourner une réponse de succès
    return NextResponse.json({ 
      success: true, 
      message: 'Déconnexion réussie',
      redirectTo: '/'
    })
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    return NextResponse.json({ 
      error: 'Erreur lors de la déconnexion' 
    }, { status: 500 })
  }
}



// app/api/auth/logout/route.ts (ajoutez cette fonction)
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    
    // Supprimer tous les cookies de session
    cookieStore.delete('userId')
    cookieStore.delete('userRole')
    cookieStore.delete('userEmail')
    cookieStore.delete('userRoleName')
    cookieStore.delete('userName')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Déconnexion réussie' 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Erreur lors de la déconnexion' 
    }, { status: 500 })
  }
}