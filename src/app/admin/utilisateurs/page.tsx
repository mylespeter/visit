import { supabase } from '@/lib/supabase'
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import UserActions from './UserActions'
import Link from 'next/link'

export default async function UtilisateursPage() {
  const user = await getUser()

  if (!user || user.role?.nom !== 'admin') {
    redirect('/profile')
  }

  // Récupérer tous les utilisateurs avec leurs rôles
  const { data: users, error } = await supabase
    .from('compte')
    .select('*, role:role_id(id, nom)')
    .order('created_at', { ascending: false })

  // Récupérer tous les rôles pour le formulaire
  const { data: roles } = await supabase
    .from('role')
    .select('*')
    .order('id')

  if (error) {
    console.error('Erreur:', error)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Utilisateurs</h1>
          <p className="text-sm text-gray-500 mt-1">
            {users?.length || 0} utilisateur(s) enregistré(s)
          </p>
        </div>
        
        {/* Bouton d'ajout */}
        <Link
          href="/admin/utilisateurs/nouveau"
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
          </svg>
          Nouvel utilisateur
        </Link>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-50">
          <thead>
            <tr className="bg-gray-50/50">
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Utilisateur
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rôle
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Inscription
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users?.map((userItem) => (
              <tr key={userItem.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {/* Photo de profil */}
                    <div className="relative flex-shrink-0">
                      {userItem.profile_img ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                          <Image
                            src={userItem.profile_img}
                            alt={userItem.nom_complet}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-100">
                          <span className="text-sm font-medium text-gray-400">
                            {userItem.nom_complet?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Nom */}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {userItem.nom_complet}
                      </div>
                      <div className="text-xs text-gray-400">
                        ID: {userItem.id}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {userItem.numero}
                  </div>
                  {userItem.adresse && (
                    <div className="text-xs text-gray-400 mt-1">
                      {userItem.adresse}
                    </div>
                  )}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {userItem.email || '-'}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    userItem.role?.nom === 'admin' 
                      ? 'bg-gray-900 text-white' 
                      : userItem.role?.nom === 'pasteur'
                      ? 'bg-blue-50 text-blue-700'
                      : userItem.role?.nom === 'secretaire'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-500'
                  }`}>
                    {userItem.role?.nom}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-400">
                    {new Date(userItem.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <UserActions 
                    user={userItem} 
                    roles={roles || []} 
                    currentUserId={user.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* État vide */}
        {(!users || users.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-300 text-sm">
              Aucun utilisateur pour le moment
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-300 text-right">
        Dernière mise à jour : {new Date().toLocaleDateString()}
      </div>
    </div>
  )
}