
//actions/membres.ts
'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getMembres() {
  try {
    const { data, error } = await supabase
      .from('membres')
      .select('*')
      .order('nom_complet')

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    return { error: 'Erreur de chargement' }
  }
}

export async function createMembre(formData: FormData) {
  try {
    const data = {
      nom_complet: formData.get('nom_complet') as string,
      numero: formData.get('numero') as string,
      email: formData.get('email') as string || null,
      adresse: formData.get('adresse') as string || null,
      sexe: formData.get('sexe') as string,
      date_naissance: formData.get('date_naissance') as string || null,
    }

    const { data: newMembre, error } = await supabase
      .from('membres')
      .insert([data])
      .select()
      .single()

    if (error) throw error

    revalidatePath('/admin/membres')
    return { success: true, membreId: newMembre.id }
  } catch (error) {
    return { error: 'Erreur lors de la création' }
  }
}

export async function updateMembre(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const data = {
      nom_complet: formData.get('nom_complet') as string,
      numero: formData.get('numero') as string,
      email: formData.get('email') as string || null,
      adresse: formData.get('adresse') as string || null,
      sexe: formData.get('sexe') as string,
      date_naissance: formData.get('date_naissance') as string || null,
    }

    const { error } = await supabase
      .from('membres')
      .update(data)
      .eq('id', id)

    if (error) throw error

    revalidatePath('/admin/membres')
    return { success: true }
  } catch (error) {
    return { error: 'Erreur lors de la mise à jour' }
  }
}

export async function uploadMembreProfile(formData: FormData) {
  try {
    const file = formData.get('image') as File
    const membreId = formData.get('membreId') as string

    if (!file || !membreId) {
      return { error: 'Fichier ou ID manquant' }
    }

    if (!file.type.startsWith('image/')) {
      return { error: 'Le fichier doit être une image' }
    }

    if (file.size > 5 * 1024 * 1024) {
      return { error: 'L\'image ne doit pas dépasser 5MB' }
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `membre-${membreId}-${Date.now()}.${fileExt}`
    const filePath = `membres/${fileName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600'
      })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath)

    const { error: updateError } = await supabase
      .from('membres')
      .update({ membre_profile: publicUrl })
      .eq('id', membreId)

    if (updateError) throw updateError

    revalidatePath('/admin/membres')
    return { success: true, imageUrl: publicUrl }
  } catch (error) {
    return { error: 'Erreur lors de l\'upload' }
  }
}