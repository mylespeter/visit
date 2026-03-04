import { supabase } from '@/lib/supabase'
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import NewUserForm from './NewUserForm'

export default async function NouvelUtilisateurPage() {
  const user = await getUser()

  if (!user || user.role?.nom !== 'admin') {
    redirect('/profile')
  }

  // Récupérer tous les rôles
  const { data: roles } = await supabase
    .from('role')
    .select('*')
    .order('id')

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-900">Nouvel utilisateur</h1>
        <p className="text-sm text-gray-500 mt-1">
          Créer un nouveau compte utilisateur
        </p>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <NewUserForm roles={roles || []} />
      </div>
    </div>
  )
}