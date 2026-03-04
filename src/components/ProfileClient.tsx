// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { uploadProfileImage } from '@/actions/auth'
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

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // Vérifier le type de fichier
//     if (!file.type.startsWith('image/')) {
//       toast.error('Veuillez sélectionner une image')
//       return
//     }

//     // Vérifier la taille (max 5MB)
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
//         toast.success('Photo de profil mise à jour avec succès')
//         router.refresh()
//       }
//     } catch (error) {
//       toast.error('Erreur lors de l\'upload')
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const getRoleColor = (role: string) => {
//     const colors = {
//       admin: 'bg-purple-100 text-purple-800 border-purple-200',
//       pasteur: 'bg-blue-100 text-blue-800 border-blue-200',
//       secretaire: 'bg-green-100 text-green-800 border-green-200',
//       visiteur: 'bg-gray-100 text-gray-800 border-gray-200'
//     }
//     return colors[role as keyof typeof colors] || colors.visiteur
//   }

//   const getRoleBadge = (role: string) => {
//     const badges = {
//       admin: 'Administrateur',
//       pasteur: 'Pasteur',
//       secretaire: 'Secrétaire',
//       visiteur: 'Visiteur'
//     }
//     return badges[role as keyof typeof badges] || role
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* En-tête avec titre et badge de rôle */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               Mon Profil
//               <span className={`text-sm font-medium px-3 py-1 rounded-full border capitalize ${getRoleColor(user.role.nom)}`}>
//                 {getRoleBadge(user.role.nom)}
//               </span>
//             </h1>
//             <p className="mt-2 text-gray-600">
//               Gérez vos informations personnelles et votre photo de profil
//             </p>
//           </div>
          
//           {/* Date d'inscription */}
//           <div className="text-right">
//             <p className="text-sm text-gray-500">Membre depuis</p>
//             <p className="font-medium text-gray-900">
//               {new Date(user.created_at).toLocaleDateString('fr-FR', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}
//             </p>
//           </div>
//         </div>

//         {/* Carte de profil principale */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Bannière de couleur selon le rôle */}
//           <div className={`h-3 ${
//             user.role.nom === 'admin' ? 'bg-purple-600' :
//             user.role.nom === 'pasteur' ? 'bg-blue-600' :
//             user.role.nom === 'secretaire' ? 'bg-green-600' :
//             'bg-gray-600'
//           }`} />

//           <div className="p-8">
//             <div className="flex flex-col md:flex-row gap-8">
//               {/* Section photo de profil */}
//               <div className="md:w-1/3">
//                 <div className="bg-gray-50 rounded-xl p-6 text-center">
//                   <div className="relative inline-block">
//                     {/* Photo de profil */}
//                     <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
//                       {profileImage ? (
//                         <img
//                           src={profileImage}
//                           alt={user.nom_complet}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className={`w-full h-full flex items-center justify-center text-6xl font-bold text-white ${
//                           user.role.nom === 'admin' ? 'bg-purple-500' :
//                           user.role.nom === 'pasteur' ? 'bg-blue-500' :
//                           user.role.nom === 'secretaire' ? 'bg-green-500' :
//                           'bg-gray-500'
//                         }`}>
//                           {user.nom_complet.charAt(0).toUpperCase()}
//                         </div>
//                       )}
//                     </div>

//                     {/* Bouton de téléchargement */}
//                     <label
//                       htmlFor="photo-upload"
//                       className={`absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110 ${
//                         isUploading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
//                       }`}
//                     >
//                       {isUploading ? (
//                         <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                       )}
//                     </label>
//                     <input
//                       type="file"
//                       id="photo-upload"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       disabled={isUploading}
//                     />
//                   </div>

//                   <p className="mt-4 text-sm text-gray-500">
//                     {isUploading ? 'Téléchargement...' : 'Cliquez sur l\'icône pour changer votre photo'}
//                   </p>
//                 </div>
//               </div>

//               {/* Section informations */}
//               <div className="md:w-2/3">
//                 <div className="bg-gray-50 rounded-xl p-6">
//                   <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                     Informations personnelles
//                   </h2>

//                   <div className="space-y-6">
//                     {/* Nom complet */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Nom complet
//                       </label>
//                       <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                         </svg>
//                         <span className="text-gray-900">{user.nom_complet}</span>
//                       </div>
//                     </div>

//                     {/* Numéro de téléphone */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Numéro de téléphone
//                       </label>
//                       <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                         </svg>
//                         <span className="text-gray-900">{user.numero}</span>
//                       </div>
//                     </div>

//                     {/* Email */}
//                         <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Adresse email
//                         </label>
//                         <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
//                             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                             </svg>
//                             <span className="text-gray-900">{user.email}</span>
//                         </div>
//                         </div>

//                     {/* Adresse */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Adresse
//                       </label>
//                       <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
//                         <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-gray-900">{user.adresse || 'Non renseignée'}</span>
//                       </div>
//                     </div>

//                     {/* Rôle */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Rôle
//                       </label>
//                       <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                         </svg>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
//                           user.role.nom === 'admin' ? 'bg-purple-100 text-purple-800' :
//                           user.role.nom === 'pasteur' ? 'bg-blue-100 text-blue-800' :
//                           user.role.nom === 'secretaire' ? 'bg-green-100 text-green-800' :
//                           'bg-gray-100 text-gray-800'
//                         }`}>
//                           {user.role.nom}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions supplémentaires */}
//         <div className="mt-8 flex justify-end gap-4">
//           <button
//             onClick={() => router.push('/')}
//             className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//             </svg>
//             Accueil
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { uploadProfileImage } from '@/actions/auth'
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

export default function ProfileClient({ user }: ProfileClientProps) {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [profileImage, setProfileImage] = useState(user.profile_img)

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

  const getRoleBadgeStyle = (role: string) => {
    const styles = {
      admin: 'bg-gray-100 text-gray-700',
      pasteur: 'bg-gray-100 text-gray-700',
      secretaire: 'bg-gray-100 text-gray-700',
      visiteur: 'bg-gray-100 text-gray-700'
    }
    return styles[role as keyof typeof styles] || styles.visiteur
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header gris très léger */}
      <div className="h-32 bg-gray-50 border-b border-gray-100" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-12">
        {/* Carte principale */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          {/* Zone photo de profil */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100">
            <div className="flex items-start gap-8">
              {/* Avatar - taille XL */}
              <div className="relative group flex-shrink-0">
                <div className="w-32 h-32 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user.nom_complet}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-light text-gray-400">
                        {user.nom_complet.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Bouton upload discret */}
                <label
                  htmlFor="photo-upload"
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {isUploading ? (
                    <svg className="animate-spin w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
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

              {/* Infos principales */}
              <div className="flex-1 pt-2">
                <h1 className="text-2xl font-medium text-gray-900 mb-1">
                  {user.nom_complet}
                </h1>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle(user.role.nom)}`}>
                    {user.role.nom}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(user.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-4">
                <div className="w-10 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                    Téléphone
                  </p>
                  <p className="text-gray-900">{user.numero}</p>
                </div>
              </div>

              {/* Adresse */}
              <div className="flex items-start gap-4">
                <div className="w-10 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                    Adresse
                  </p>
                  <p className="text-gray-900">{user.adresse || 'Non renseignée'}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => router.push('/')}
                className="px-5 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Retour à l'accueil
              </button>
              <button className="px-5 py-2 text-sm bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}