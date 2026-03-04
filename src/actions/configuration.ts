'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updateConfiguration(values: Record<string, string>) {
  try {
    for (const [cle, valeur] of Object.entries(values)) {
      const { error } = await supabase
        .from('configuration')
        .update({ valeur })
        .eq('cle', cle)

      if (error) throw error
    }

    revalidatePath('/admin/configuration')
    return { success: true }
  } catch (error) {
    return { error: 'Erreur lors de la mise à jour' }
  }
}