// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createMembre } from '@/actions/membres'
// import toast from 'react-hot-toast'

// export default function NouveauMembre() {
//   const router = useRouter()
//   const [isOpen, setIsOpen] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsLoading(true)

//     const formData = new FormData(e.currentTarget)
//     const result = await createMembre(formData)

//     if (result.error) {
//       toast.error(result.error)
//     } else {
//       toast.success('Membre ajouté avec succès')
//       setIsOpen(false)
//       router.refresh()
//     }
//     setIsLoading(false)
//   }

//   return (
//     <>
//       {/* Bouton d'ajout */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
//       >
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
//         </svg>
//         Nouveau membre
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <h3 className="text-lg font-light text-gray-900 mb-4">
//               Ajouter un membre
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//                   Nom complet
//                 </label>
//                 <input
//                   type="text"
//                   name="nom_complet"
//                   required
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//                   Téléphone
//                 </label>
//                 <input
//                   type="tel"
//                   name="numero"
//                   required
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//                   Adresse
//                 </label>
//                 <textarea
//                   name="adresse"
//                   rows={2}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//                     Sexe
//                   </label>
//                   <select
//                     name="sexe"
//                     required
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//                   >
//                     <option value="">Choisir</option>
//                     <option value="Homme">Homme</option>
//                     <option value="Femme">Femme</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//                     Date naissance
//                   </label>
//                   <input
//                     type="date"
//                     name="date_naissance"
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
//                 >
//                   {isLoading ? 'Ajout...' : 'Ajouter'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createMembre, uploadMembreProfile } from '@/actions/membres'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function NouveauMembre() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    
    // Créer le membre d'abord
    const result = await createMembre(formData)

    if (result.error) {
      toast.error(result.error)
      setIsLoading(false)
      return
    }

    // Si un fichier est sélectionné et que le membre a été créé avec succès
        if (selectedFile && 'membreId' in result && result.membreId) {
          const imageFormData = new FormData()
          imageFormData.append('image', selectedFile)
          imageFormData.append('membreId', result.membreId.toString())
    
          const uploadResult = await uploadMembreProfile(imageFormData)
          
          if (uploadResult.error) {
            toast.error('Membre créé mais erreur lors de l\'upload de l\'image')
          } else {
            toast.success('Membre ajouté avec photo')
          }
        } else {
          toast.success('Membre ajouté avec succès')
        }

    // Réinitialiser et fermer
    setPreviewImage(null)
    setSelectedFile(null)
    setIsOpen(false)
    router.refresh()
    setIsLoading(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    setPreviewImage(null)
    setSelectedFile(null)
  }

  return (
    <>
      {/* Bouton d'ajout */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
        </svg>
        Nouveau membre
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-light text-gray-900 mb-4">
              Ajouter un membre
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Upload image */}
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-50 border-2 border-gray-100">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Prévisualisation"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors border-2 border-white"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                  <input
                    type="file"
                    id="photo-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <p className="text-xs text-gray-400">Photo du membre (optionnel)</p>
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="nom_complet"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="numero"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Adresse
                </label>
                <textarea
                  name="adresse"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Sexe
                  </label>
                  <select
                    name="sexe"
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                  >
                    <option value="">Choisir</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Date naissance
                  </label>
                  <input
                    type="date"
                    name="date_naissance"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Ajout...' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}