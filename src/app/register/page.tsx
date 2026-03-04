// 'use client'

// import { register } from '@/actions/auth'
// import toast from 'react-hot-toast'
// import { useState } from 'react'

// export default function RegisterPage() {
//   const [isLoading, setIsLoading] = useState(false)

//   async function handleSubmit(formData: FormData) {
//     setIsLoading(true)
//     const result = await register(formData)
//     if (result?.error) {
//       toast.error(result.error)
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
//         <div>
//           <h1 className="text-3xl font-bold text-center text-gray-900">
//             Inscription
//           </h1>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Créez votre compte pour accéder à l'application
//           </p>
//         </div>
        
//         <form action={handleSubmit} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="nom_complet" className="block text-sm font-medium text-gray-700">
//                 Nom complet
//               </label>
//               <input
//                 type="text"
//                 id="nom_complet"
//                 name="nom_complet"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
//                 Numéro de téléphone
//               </label>
//               <input
//                 type="tel"
//                 id="numero"
//                 name="numero"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
//                 Adresse
//               </label>
//               <textarea
//                 id="adresse"
//                 name="adresse"
//                 rows={3}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                 Je suis
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="visiteur">Visiteur</option>
//                 <option value="pasteur">Pasteur</option>
//                 <option value="secretaire">Secrétaire</option>
//                 <option value="admin">Administrateur</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="mot_de_passe" className="block text-sm font-medium text-gray-700">
//                 Mot de passe
//               </label>
//               <input
//                 type="password"
//                 id="mot_de_passe"
//                 name="mot_de_passe"
//                 required
//                 minLength={6}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Inscription en cours...' : "S'inscrire"}
//           </button>

//           <p className="text-center text-sm text-gray-600">
//             Déjà inscrit ?{' '}
//             <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
//               Connectez-vous
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   )
// }
'use client'

import { register } from '@/actions/auth'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    const result = await register(formData)
    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Inscription
          </h1>
                    <img src='/logo.png' className='w-20 h-20 mx-auto my-4' alt='Logo' />

          <p className="mt-2 text-center text-sm text-gray-600">
            Créez votre compte pour accéder à l'application
          </p>
        </div>
        
        <form action={handleSubmit} className="mt-8 space-y-6">

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>

          <div className="space-y-4">
            <div>
              <label htmlFor="nom_complet" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                type="text"
                id="nom_complet"
                name="nom_complet"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Nouveau champ email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="exemple@email.com"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="numero"
                name="numero"
                required
                placeholder="+243 XX XXX XXXX"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

          </div>

        <div className="space-y-4">
            <div>
              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <textarea
                id="adresse"
                name="adresse"
                rows={3}
                placeholder="Votre adresse complète"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Je suis
              </label>
              <select
                id="role"
                name="role"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="visiteur">Visiteur</option>
                <option value="pasteur">Pasteur</option>
                <option value="secretaire">Secrétaire</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            <div>
              <label htmlFor="mot_de_passe" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="mot_de_passe"
                name="mot_de_passe"
                required
                minLength={6}
                placeholder="Minimum 6 caractères"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

        
            </div>
        </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Inscription en cours...' : "S'inscrire"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Déjà inscrit ?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Connectez-vous
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}