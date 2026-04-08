// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const numero = formData.get('numero') as string
    const mot_de_passe = formData.get('mot_de_passe') as string

    // Validation des champs
    if (!mot_de_passe) {
      return NextResponse.json({ error: 'Mot de passe requis' }, { status: 400 })
    }

    if (!email && !numero) {
      return NextResponse.json({ error: 'Email ou téléphone requis' }, { status: 400 })
    }

    // Construction de la requête
    let query = supabase
      .from('compte')
      .select('*, role:role_id(id, nom)')

    if (email) {
      query = query.eq('email', email)
    } else if (numero) {
      // Nettoyer le numéro de téléphone (enlever espaces, tirets, etc.)
      const cleanNumero = numero.replace(/[\s\-\(\)\+]/g, '')
      query = query.eq('numero', cleanNumero)
    }

    const { data: user, error } = await query.single()

    if (error || !user) {
      return NextResponse.json({ error: 'Email/téléphone ou mot de passe incorrect' }, { status: 401 })
    }

    // Vérifier si le compte est actif (si vous avez un champ actif)
    if (user.actif === false) {
      return NextResponse.json({ error: 'Compte désactivé. Contactez l\'administrateur.' }, { status: 401 })
    }

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe)

    if (!isValid) {
      return NextResponse.json({ error: 'Email/téléphone ou mot de passe incorrect' }, { status: 401 })
    }

    // Définir les cookies de session
    const cookieStore = await cookies()
    
    // Cookie d'identifiant utilisateur (7 jours)
    cookieStore.set('userId', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 jours
    })
    
    // Cookie du rôle (7 jours)
    cookieStore.set('userRole', user.role_id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })
    
    // Cookie de l'email (accessible côté client si besoin)
    cookieStore.set('userEmail', user.email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })
    
    // Cookie du nom du rôle (accessible côté client)
    cookieStore.set('userRoleName', user.role.nom, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    // Cookie du nom complet (optionnel)
    if (user.nom_complet) {
      cookieStore.set('userName', user.nom_complet, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
      })
    }

    // Déterminer la redirection selon le rôle
    const redirectPaths: Record<string, string> = {
      'admin': '/admin/membres',
      'pasteur': '/pasteur/visites',
      'secretaire': '/secretaire/visites',
      'visiteur': '/visiteur/dashboard'
    }
    
    const redirectTo = redirectPaths[user.role.nom] || '/profile'

    // Mettre à jour la dernière connexion
    await supabase
      .from('compte')
      .update({ 
        derniere_connexion: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    return NextResponse.json({ 
      success: true, 
      redirectTo,
      user: {
        id: user.id,
        email: user.email,
        nom_complet: user.nom_complet,
        role: user.role.nom
      }
    })
  } catch (error) {
    console.error('Erreur login API:', error)
    return NextResponse.json({ error: 'Erreur serveur. Veuillez réessayer.' }, { status: 500 })
  }
}