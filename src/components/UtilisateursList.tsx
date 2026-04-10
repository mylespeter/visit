// // components/UtilisateursList.tsx
// 'use client'

// import { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import Link from 'next/link'
// import Image from 'next/image'
// import UserActions from './UserActions'
// import { useRouter } from 'next/navigation'

// interface Role {
//   id: number
//   nom: string
// }

// interface User {
//   id: number
//   nom_complet: string
//   email: string
//   numero: string
//   adresse: string
//   profile_img: string
//   role_id: number
//   created_at: string
//   role: Role
// }

// export default function UtilisateursList() {
//   const [users, setUsers] = useState<User[]>([])
//   const [roles, setRoles] = useState<Role[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedRole, setSelectedRole] = useState('tous')
//   const router = useRouter()

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     setLoading(true)
    
//     // Récupérer les utilisateurs
//     const { data: usersData } = await supabase
//       .from('compte')
//       .select('*, role:role_id(id, nom)')
//       .order('created_at', { ascending: false })

//     // Récupérer les rôles
//     const { data: rolesData } = await supabase
//       .from('role')
//       .select('*')
//       .order('id')

//     if (usersData) setUsers(usersData)
//     if (rolesData) setRoles(rolesData)
    
//     setLoading(false)
//   }

//   // Filtrer les utilisateurs
//   const filteredUsers = users.filter(user => {
//     const matchesSearch = 
//       user.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.numero?.includes(searchTerm)
    
//     const matchesRole = selectedRole === 'tous' || user.role?.nom === selectedRole
    
//     return matchesSearch && matchesRole
//   })

//   return (
//     <div>
//       {/* Barre d'outils */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
//         <div className="flex gap-3">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Rechercher..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-9 pr-4 py-2 text-sm border border-gray-100 rounded-lg focus:outline-none focus:border-gray-200 w-64"
//             />
//             <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <select
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//             className="px-3 py-2 text-sm border border-gray-100 rounded-lg focus:outline-none focus:border-gray-200 bg-white"
//           >
//             <option value="tous">Tous les rôles</option>
//             {roles.map(role => (
//               <option key={role.id} value={role.nom}>{role.nom}</option>
//             ))}
//           </select>
//         </div>
        
//         <Link
//           href="/admin/utilisateurs/nouveau"
//           className="px-4 py-2  text-white bg-green-600 text-sm transition-colors flex items-center gap-2 w-fit"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
//           </svg>
//           Nouvel utilisateur
//         </Link>
//       </div>

//       {/* Tableau des utilisateurs */}
//       <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <table className="min-w-full divide-y divide-gray-50">
//             <thead>
//               <tr className="bg-gray-50/50">
//                 <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-900 uppercase tracking-wider">Utilisateur</th>
//                 {/* <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-900 uppercase tracking-wider">Contact</th> */}
//                 <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-900 uppercase tracking-wider">Email</th>
//                 <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-900 uppercase tracking-wider">Rôle</th>
//                 <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-900 uppercase tracking-wider">Inscription</th>
//                 <th className="px-6 py-4 text-right text-xs font-extrabold text-gray-900 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-3">
//                       {user.profile_img ? (
//                         <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
//                           <Image src={user.profile_img} alt={user.nom_complet} width={40} height={40} className="object-cover" />
//                         </div>
//                       ) : (
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-100">
//                           <span className="text-sm font-medium text-gray-400">{user.nom_complet?.charAt(0).toUpperCase()}</span>
//                         </div>
//                       )}
//                       <div>
//                         <div className="text-sm font-medium text-gray-900">{user.nom_complet}</div>
//                         <div className="text-xs text-gray-400">ID: {user.id}</div>
//                       </div>
//                     </div>
//                   </td>
//                   {/* <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-600">{user.numero}</div>
//                     {user.adresse && <div className="text-xs text-gray-400 mt-1">{user.adresse}</div>}
//                   </td> */}
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email || '-'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2.5 py-0.5  text-xs font-medium ${
//                       user.role?.nom === 'admin' ? 'bg-red-600 text-white' :
//                       user.role?.nom === 'pasteur' ? 'bg-blue-600 text-white' :
//                       user.role?.nom === 'secretaire' ? 'bg-green-600 text-white' :
//                       'bg-gray-50 text-gray-500'
//                     }`}>
//                       {user.role?.nom}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
//                     {new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right">
//                     <UserActions user={user} roles={roles} onUpdate={fetchData} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {!loading && filteredUsers.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-gray-300 text-sm">Aucun utilisateur trouvé</div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// components/UtilisateursList.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import UserActions from './UserActions'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/actions/user-actions'

interface Role {
  id: number
  nom: string
}

interface User {
  id: number
  nom_complet: string
  email: string
  numero: string
  adresse: string
  profile_img: string
  role_id: number
  created_at: string
  role: Role
}

export default function UtilisateursList() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('tous')
  const [showModal, setShowModal] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    nom_complet: '',
    email: '',
    numero: '',
    adresse: '',
    mot_de_passe: '',
    role: ''
  })
  
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    
    const { data: usersData } = await supabase
      .from('compte')
      .select('*, role:role_id(id, nom)')
      .order('created_at', { ascending: false })

    const { data: rolesData } = await supabase
      .from('role')
      .select('*')
      .order('id')

    if (usersData) setUsers(usersData)
    if (rolesData) setRoles(rolesData)
    
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setError('')

    const formDataObj = new FormData()
    formDataObj.append('nom_complet', formData.nom_complet)
    formDataObj.append('email', formData.email)
    formDataObj.append('numero', formData.numero)
    formDataObj.append('adresse', formData.adresse)
    formDataObj.append('mot_de_passe', formData.mot_de_passe)
    formDataObj.append('role', formData.role)

    const result = await registerUser(formDataObj)

    if (result.error) {
      setError(result.error)
      setFormLoading(false)
    } else {
      setShowModal(false)
      setFormData({
        nom_complet: '',
        email: '',
        numero: '',
        adresse: '',
        mot_de_passe: '',
        role: ''
      })
      fetchData()
      setFormLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.numero?.includes(searchTerm)
    
    const matchesRole = selectedRole === 'tous' || user.role?.nom === selectedRole
    
    return matchesSearch && matchesRole
  })

  return (
    <div>
      {/* Barre d'outils */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-64 transition-all"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
          >
            <option value="tous">Tous les rôles</option>
            {roles.map(role => (
              <option key={role.id} value={role.nom}>{role.nom}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 w-fit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
          </svg>
          Nouvel utilisateur
        </button>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscription</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {user.profile_img ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                          <Image src={user.profile_img} alt={user.nom_complet} width={40} height={40} className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-gray-100">
                          <span className="text-sm font-medium text-gray-600">{user.nom_complet?.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.nom_complet}</div>
                        <div className="text-xs text-gray-500">#{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                      user.role?.nom === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role?.nom === 'pasteur' ? 'bg-blue-100 text-blue-800' :
                      user.role?.nom === 'secretaire' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role?.nom}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <UserActions user={user} roles={roles} onUpdate={fetchData} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-sm">Aucun utilisateur trouvé</div>
          </div>
        )}
      </div>

      {/* Modal d'ajout d'utilisateur */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
              onClick={() => setShowModal(false)}
            />
            
            {/* Modal */}
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">Nouvel utilisateur</h3>
                <p className="text-sm text-gray-500 mt-0.5">Créez un nouveau compte utilisateur</p>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-4">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y- grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nom_complet}
                      onChange={(e) => setFormData({...formData, nom_complet: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="jean@exemple.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.numero}
                      onChange={(e) => setFormData({...formData, numero: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Adresse
                    </label>
                    <textarea
                      value={formData.adresse}
                      onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                      placeholder="Adresse complète"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.mot_de_passe}
                      onChange={(e) => setFormData({...formData, mot_de_passe: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Rôle
                    </label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                    >
                      <option value="">Sélectionnez un rôle</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.nom}>{role.nom}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Création...
                      </>
                    ) : (
                      'Créer'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}