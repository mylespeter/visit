
//action/auth.ts
'use server'

import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const nom_complet = formData.get('nom_complet') as string
  const email = formData.get('email') as string
  const numero = formData.get('numero') as string
  const adresse = formData.get('adresse') as string
  const mot_de_passe = formData.get('mot_de_passe') as string
  const role_nom = formData.get('role') as string || 'visiteur'

  // Vérifier si l'email existe déjà
  const { data: existingEmail } = await supabase
    .from('compte')
    .select('id')
    .eq('email', email)
    .single()

  if (existingEmail) {
    return { error: 'Cet email est déjà utilisé' }
  }

  // Vérifier si le numéro existe déjà
  const { data: existingPhone } = await supabase
    .from('compte')
    .select('id')
    .eq('numero', numero)
    .single()

  if (existingPhone) {
    return { error: 'Ce numéro est déjà utilisé' }
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(mot_de_passe, 10)

  // Récupérer l'ID du rôle choisi
  const { data: roleData } = await supabase
    .from('role')
    .select('id')
    .eq('nom', role_nom)
    .single()

  if (!roleData) {
    return { error: 'Rôle invalide' }
  }

  // Créer l'utilisateur
  const { data: newUser, error } = await supabase
    .from('compte')
    .insert([
      {
        nom_complet,
        email,
        numero,
        adresse,
        mot_de_passe: hashedPassword,
        role_id: roleData.id
      }
    ])
    .select('*, role:role_id(nom)')
    .single()

  if (error) {
    console.error('Erreur inscription:', error)
    return { error: 'Erreur lors de l\'inscription' }
  }

  // Connecter l'utilisateur automatiquement
  const cookieStore = await cookies()
  cookieStore.set('userId', newUser.id.toString())
  cookieStore.set('userRole', newUser.role_id.toString())
  cookieStore.set('userEmail', newUser.email)
  cookieStore.set('userRoleName', newUser.role.nom)

  // Rediriger vers la page appropriée
  const redirectPath = getRedirectPathByRole(role_nom)
  redirect(redirectPath)
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const numero = formData.get('numero') as string
  const mot_de_passe = formData.get('mot_de_passe') as string

  let query = supabase
    .from('compte')
    .select('*, role:role_id(nom)')

  // Connexion par email ou téléphone
  if (email) {
    query = query.eq('email', email)
  } else if (numero) {
    query = query.eq('numero', numero)
  } else {
    return { error: 'Email ou téléphone requis' }
  }

  const { data: user, error } = await query.single()

  if (error || !user) {
    return { error: 'Email/téléphone ou mot de passe incorrect' }
  }

  // Vérifier le mot de passe
  const isValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe)

  if (!isValid) {
    return { error: 'Email/téléphone ou mot de passe incorrect' }
  }

  // Connecter l'utilisateur
  const cookieStore = await cookies()
  cookieStore.set('userId', user.id.toString())
  cookieStore.set('userRole', user.role_id.toString())
  cookieStore.set('userEmail', user.email)
  cookieStore.set('userRoleName', user.role.nom)

  // Rediriger selon le rôle
  const redirectPath = getRedirectPathByRole(user.role.nom)
  redirect(redirectPath)
}

// Le reste des fonctions reste identique...
export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('userId')
  cookieStore.delete('userRole')
  cookieStore.delete('userEmail')
  cookieStore.delete('userRoleName')
  redirect('/login')
}

export async function getUser() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    if (!userId) {
      return null
    }

    const { data: user, error } = await supabase
      .from('compte')
      .select('*, role:role_id(nom)')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Erreur getUser:', error)
    return null
  }
}

function getRedirectPathByRole(role: string): string {
  const paths: Record<string, string> = {
    'admin': '/admin/membres',
    'pasteur': '/pasteur/visites',
    'secretaire': '/secretaire/visites',
    'visiteur': '/visiteur/dashboard'
  }
  return paths[role] || '/profile'
}



export async function uploadProfileImage(formData: FormData) {
  try {
    const file = formData.get('image') as File
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    if (!userId) {
      return { error: 'Utilisateur non connecté' }
    }

    if (!file) {
      return { error: 'Fichier manquant' }
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      return { error: 'Le fichier doit être une image' }
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { error: 'L\'image ne doit pas dépasser 5MB' }
    }

    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `profiles/${fileName}`

    // Convertir le fichier en ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload de l'image vers Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true
      })

    if (uploadError) {
      console.error('Erreur upload:', uploadError)
      return { error: 'Erreur lors de l\'upload de l\'image' }
    }

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath)

    // Mettre à jour le profil de l'utilisateur
    const { error: updateError } = await supabase
      .from('compte')
      .update({ 
        profile_img: publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Erreur mise à jour:', updateError)
      return { error: 'Erreur lors de la mise à jour du profil' }
    }

    return { success: true, imageUrl: publicUrl }
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return { error: 'Une erreur inattendue est survenue' }
  }
}

// actions/auth.ts - Ajoutez ces fonctions

export async function updateUserProfile(data: {
  nom_complet: string
  numero: string
  adresse: string
  email: string
}) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    if (!userId) {
      return { error: 'Non authentifié' }
    }

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    const { data: existingEmail } = await supabase
      .from('compte')
      .select('id')
      .eq('email', data.email)
      .neq('id', userId)
      .single()

    if (existingEmail) {
      return { error: 'Cet email est déjà utilisé par un autre compte' }
    }

    // Vérifier si le numéro est déjà utilisé par un autre utilisateur
    const { data: existingPhone } = await supabase
      .from('compte')
      .select('id')
      .eq('numero', data.numero)
      .neq('id', userId)
      .single()

    if (existingPhone) {
      return { error: 'Ce numéro est déjà utilisé par un autre compte' }
    }

    // Mettre à jour le profil
    const { error: updateError } = await supabase
      .from('compte')
      .update({
        nom_complet: data.nom_complet,
        numero: data.numero,
        adresse: data.adresse,
        email: data.email,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Erreur mise à jour:', updateError)
      return { error: 'Erreur lors de la mise à jour du profil' }
    }

    // Mettre à jour l'email dans les cookies
    cookieStore.set('userEmail', data.email)

    return { success: true }
  } catch (error) {
    console.error('Update profile error:', error)
    return { error: 'Erreur lors de la mise à jour du profil' }
  }
}

export async function changePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    if (!userId) {
      return { error: 'Non authentifié' }
    }

    // Récupérer l'utilisateur avec son mot de passe
    const { data: user, error: userError } = await supabase
      .from('compte')
      .select('mot_de_passe')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return { error: 'Utilisateur non trouvé' }
    }

    // Vérifier l'ancien mot de passe
    const isValid = await bcrypt.compare(data.currentPassword, user.mot_de_passe)
    if (!isValid) {
      return { error: 'Mot de passe actuel incorrect' }
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(data.newPassword, 10)

    // Mettre à jour le mot de passe
    const { error: updateError } = await supabase
      .from('compte')
      .update({
        mot_de_passe: hashedPassword,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Erreur changement mot de passe:', updateError)
      return { error: 'Erreur lors du changement de mot de passe' }
    }

    return { success: true }
  } catch (error) {
    console.error('Change password error:', error)
    return { error: 'Erreur lors du changement de mot de passe' }
  }
}
