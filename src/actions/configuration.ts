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


export async function getConfiguration() {
  try {
    const { data, error } = await supabase
      .from('configuration')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur chargement configuration:', error);
    return { error: 'Erreur de chargement de la configuration' };
  }
}

// export async function updateConfiguration(cle: string, valeur: string) {
//   try {
//     const { error } = await supabase
//       .from('configuration')
//       .update({ valeur, updated_at: new Date().toISOString() })
//       .eq('cle', cle);

//     if (error) throw error;
//     return { success: true };
//   } catch (error) {
//     console.error('Erreur mise à jour configuration:', error);
//     return { error: 'Erreur de mise à jour' };
//   }
// }