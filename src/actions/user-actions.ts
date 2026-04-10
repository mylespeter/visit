// actions/user-actions.ts
'use server'

import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function registerUser(formData: FormData) {
  const nom_complet = formData.get('nom_complet') as string
  const email = formData.get('email') as string
  const numero = formData.get('numero') as string
  const adresse = formData.get('adresse') as string
  const mot_de_passe = formData.get('mot_de_passe') as string
  const role_nom = formData.get('role') as string

  if (!nom_complet || !email || !numero || !mot_de_passe || !role_nom) {
    return { error: 'Tous les champs obligatoires doivent être remplis' }
  }

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
        adresse: adresse || null,
        mot_de_passe: hashedPassword,
        role_id: roleData.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])
    .select('*, role:role_id(nom)')
    .single()

  if (error) {
    console.error('Erreur création utilisateur:', error)
    return { error: 'Erreur lors de la création du compte' }
  }

  return { success: true, user: newUser }
}