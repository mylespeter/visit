// actions/notes-pasteur.ts
'use server'

import { supabase } from '@/lib/supabase'
import { getUser } from './auth'
import { revalidatePath } from 'next/cache'

interface CreateNoteData {
  pasteur_id: number
  titre: string
  contenu: string
  visite_id: string | null
}

interface UpdateNoteData {
  titre: string
  contenu: string
  visite_id: string | null
}

export async function createNote(data: CreateNoteData) {
  try {
    const user = await getUser()
    if (!user || user.role?.nom !== 'pasteur') {
      return { error: 'Non autorisé' }
    }

    const { data: note, error } = await supabase
      .from('notes_pasteur')
      .insert({
        pasteur_id: data.pasteur_id,
        titre: data.titre,
        contenu: data.contenu,
        visite_id: data.visite_id ? parseInt(data.visite_id) : null
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath('/pasteur/visites')
    return { success: true, note }
  } catch (error) {
    console.error('Erreur création note:', error)
    return { error: 'Erreur lors de la création de la note' }
  }
}

export async function updateNote(noteId: number, data: UpdateNoteData) {
  try {
    const user = await getUser()
    if (!user || user.role?.nom !== 'pasteur') {
      return { error: 'Non autorisé' }
    }

    const { data: note, error } = await supabase
      .from('notes_pasteur')
      .update({
        titre: data.titre,
        contenu: data.contenu,
        visite_id: data.visite_id ? parseInt(data.visite_id) : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', noteId)
      .select()
      .single()

    if (error) throw error

    revalidatePath('/pasteur/visites')
    return { success: true, note }
  } catch (error) {
    console.error('Erreur mise à jour note:', error)
    return { error: 'Erreur lors de la mise à jour de la note' }
  }
}

export async function deleteNote(noteId: number) {
  try {
    const user = await getUser()
    if (!user || user.role?.nom !== 'pasteur') {
      return { error: 'Non autorisé' }
    }

    const { error } = await supabase
      .from('notes_pasteur')
      .delete()
      .eq('id', noteId)

    if (error) throw error

    revalidatePath('/pasteur/visites')
    return { success: true }
  } catch (error) {
    console.error('Erreur suppression note:', error)
    return { error: 'Erreur lors de la suppression de la note' }
  }
}