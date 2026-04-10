

// // components/ProfileClient.tsx
// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { uploadProfileImage, updateUserProfile, changePassword } from '@/actions/auth'
// import toast from 'react-hot-toast'

// interface User {
//   id: number
//   nom_complet: string
//   numero: string
//   adresse: string
//   email: string
//   profile_img: string | null
//   role_id: number
//   created_at: string
//   role: {
//     nom: string
//   }
// }

// interface ProfileClientProps {
//   user: User
// }

// export default function ProfileClient({ user }: ProfileClientProps) {
//   const router = useRouter()
//   const [isUploading, setIsUploading] = useState(false)
//   const [profileImage, setProfileImage] = useState(user.profile_img)
  
//   // États pour le formulaire d'informations
//   const [formData, setFormData] = useState({
//     nom_complet: user.nom_complet,
//     numero: user.numero,
//     adresse: user.adresse || '',
//     email: user.email
//   })
//   const [isUpdating, setIsUpdating] = useState(false)
  
//   // États pour le formulaire de mot de passe
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   })
//   const [isChangingPassword, setIsChangingPassword] = useState(false)

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     if (!file.type.startsWith('image/')) {
//       toast.error('Veuillez sélectionner une image')
//       return
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('L\'image ne doit pas dépasser 5MB')
//       return
//     }

//     setIsUploading(true)
//     const formData = new FormData()
//     formData.append('image', file)

//     try {
//       const result = await uploadProfileImage(formData)
//       if (result.error) {
//         toast.error(result.error)
//       } else if (result.success && result.imageUrl) {
//         setProfileImage(result.imageUrl)
//         toast.success('Photo de profil mise à jour')
//         router.refresh()
//       }
//     } catch (error) {
//       toast.error('Erreur lors de l\'upload')
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleInfoSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsUpdating(true)

//     try {
//       const result = await updateUserProfile({
//         nom_complet: formData.nom_complet,
//         numero: formData.numero,
//         adresse: formData.adresse,
//         email: formData.email
//       })

//       if (result.error) {
//         toast.error(result.error)
//       } else {
//         toast.success('Profil mis à jour avec succès')
//         router.refresh()
//       }
//     } catch (error) {
//       toast.error('Erreur lors de la mise à jour')
//     } finally {
//       setIsUpdating(false)
//     }
//   }

//   const handlePasswordSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast.error('Les nouveaux mots de passe ne correspondent pas')
//       return
//     }

//     if (passwordData.newPassword.length < 6) {
//       toast.error('Le mot de passe doit contenir au moins 6 caractères')
//       return
//     }

//     setIsChangingPassword(true)

//     try {
//       const result = await changePassword({
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword
//       })

//       if (result.error) {
//         toast.error(result.error)
//       } else {
//         toast.success('Mot de passe changé avec succès')
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         })
//       }
//     } catch (error) {
//       toast.error('Erreur lors du changement de mot de passe')
//     } finally {
//       setIsChangingPassword(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-wxl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
       

//         <div className="space-y-6">
//           {/* Section Photo de profil */}
//           <div className="bg-white border border-gray-200 rounded-lg p-6">
//             <h2 className="text-base font-medium text-gray-900 mb-4">Photo de profil</h2>
//             <div className="flex items-center gap-6">
//               <div className="relative">
//                 <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
//                   {profileImage ? (
//                     <img
//                       src={profileImage}
//                       alt={user.nom_complet}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                       <span className="text-2xl font-medium text-gray-400">
//                         {user.nom_complet.charAt(0).toUpperCase()}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <label
//                   htmlFor="photo-upload"
//                   className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
//                 >
//                   {isUploading ? (
//                     <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   )}
//                 </label>
//                 <input
//                   type="file"
//                   id="photo-upload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={isUploading}
//                 />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">{user.nom_complet}</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   {user.role.nom.charAt(0).toUpperCase() + user.role.nom.slice(1)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Section Informations personnelles */}
//           <div className="bg-white border border-gray-200 rounded-lg">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-base font-medium text-gray-900">Informations personnelles</h2>
//             </div>
//             <form onSubmit={handleInfoSubmit} className="p-6">
//               <div className="grid grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Nom complet
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.nom_complet}
//                     onChange={(e) => setFormData({ ...formData, nom_complet: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-shadow"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-shadow"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Téléphone
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.numero}
//                     onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-shadow"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Adresse
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.adresse}
//                     onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-shadow"
//                     placeholder="Votre adresse"
//                   />
//                 </div>
//               </div>
              
//               <div className="mt-6">
//                 <button
//                   type="submit"
//                   disabled={isUpdating}
//                   className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
//                 >
//                   {isUpdating ? 'Enregistrement...' : 'Enregistrer les modifications'}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Section Sécurité */}
//           <div className="bg-white border border-gray-200 rounded-lg">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-base font-medium text-gray-900">Changer le mot de passe</h2>
//             </div>
//             <form onSubmit={handlePasswordSubmit} className="p-6">
//               <div className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mot de passe actuel
//                   </label>
//                   <input
//                     type="password"
//                     value={passwordData.currentPassword}
//                     onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-shadow"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Nouveau mot de passe
//                   </label>
//                   <input
//                     type="password"
//                     value={passwordData.newPassword}
//                     onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-shadow"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirmer le nouveau mot de passe
//                   </label>
//                   <input
//                     type="password"
//                     value={passwordData.confirmPassword}
//                     onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-shadow"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="mt-6">
//                 <button
//                   type="submit"
//                   disabled={isChangingPassword}
//                   className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
//                 >
//                   {isChangingPassword ? 'Changement...' : 'Changer le mot de passe'}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-between pt-4">
//             <button
//               onClick={() => router.push('/')}
//               className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
//             >
//               ← Retour
//             </button>
//             <button
//               onClick={() => router.push('/logout')}
//               className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
//             >
//               Déconnexion
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// components/ProfileClient.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { uploadProfileImage, updateUserProfile, changePassword } from '@/actions/auth'
import toast from 'react-hot-toast'

interface User {
  id: number
  nom_complet: string
  numero: string
  adresse: string
  email: string
  profile_img: string | null
  role_id: number
  created_at: string
  role: {
    nom: string
  }
}

interface ProfileClientProps {
  user: User
}

type TabType = 'info' | 'password'

export default function ProfileClient({ user }: ProfileClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('info')
  const [isUploading, setIsUploading] = useState(false)
  const [profileImage, setProfileImage] = useState(user.profile_img)
  
  // États pour le formulaire d'informations
  const [formData, setFormData] = useState({
    nom_complet: user.nom_complet,
    numero: user.numero,
    adresse: user.adresse || '',
    email: user.email
  })
  const [isUpdating, setIsUpdating] = useState(false)
  
  // États pour le formulaire de mot de passe
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 5MB')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const result = await uploadProfileImage(formData)
      if (result.error) {
        toast.error(result.error)
      } else if (result.success && result.imageUrl) {
        setProfileImage(result.imageUrl)
        toast.success('Photo de profil mise à jour')
        router.refresh()
      }
    } catch (error) {
      toast.error('Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      const result = await updateUserProfile({
        nom_complet: formData.nom_complet,
        numero: formData.numero,
        adresse: formData.adresse,
        email: formData.email
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Profil mis à jour avec succès')
        router.refresh()
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Les nouveaux mots de passe ne correspondent pas')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setIsChangingPassword(true)

    try {
      const result = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Mot de passe changé avec succès')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    } catch (error) {
      toast.error('Erreur lors du changement de mot de passe')
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Photo de profil */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-100 overflow-hidden border border-gray-200">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={user.nom_complet}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-xl font-medium text-gray-400">
                      {user.nom_complet.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {isUploading ? (
                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent animate-spin"></div>
                ) : (
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </label>
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user.nom_complet}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {user.role.nom.charAt(0).toUpperCase() + user.role.nom.slice(1)}
              </p>
              <p className="text-xs text-gray-400 mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'info'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Informations
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'password'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sécurité
            </button>
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="bg-white border border-gray-200">
          {activeTab === 'info' && (
            <form onSubmit={handleInfoSubmit} className="p-6">
              <div className="space grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.nom_complet}
                    onChange={(e) => setFormData({ ...formData, nom_complet: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Votre adresse"
                  />
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>

                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>
              </div>
                </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChangingPassword ? 'Changement...' : 'Changer le mot de passe'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}