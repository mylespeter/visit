// // 'use client'

// // import { useState } from 'react'

// // interface Membre {
// //   id: number
// //   nom_complet: string
// //   numero: string
// //   email: string | null
// //   adresse: string | null
// //   sexe: string
// //   date_naissance: string | null
// //   date_adhesion: string
// //   est_actif: boolean
// // }

// // interface MembresListProps {
// //   membres: Membre[]
// // }

// // export default function MembresList({ membres }: MembresListProps) {
// //   const [search, setSearch] = useState('')

// //   const filteredMembres = membres.filter(membre =>
// //     membre.nom_complet.toLowerCase().includes(search.toLowerCase()) ||
// //     membre.numero.includes(search) ||
// //     membre.email?.toLowerCase().includes(search.toLowerCase())
// //   )

// //   return (
// //     <div>
// //       {/* Barre de recherche */}
// //       <div className="mb-4">
// //         <input
// //           type="text"
// //           placeholder="Rechercher un membre..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
// //         />
// //       </div>

// //       {/* Tableau */}
// //       <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
// //         <table className="min-w-full divide-y divide-gray-50">
// //           <thead>
// //             <tr className="bg-gray-50/50">
// //               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
// //                 Membre
// //               </th>
// //               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
// //                 Contact
// //               </th>
// //               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
// //                 Sexe
// //               </th>
// //               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
// //                 Adhésion
// //               </th>
// //               <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
// //                 Actions
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-50">
// //             {filteredMembres.map((membre) => (
// //               <tr key={membre.id} className="hover:bg-gray-50/50 transition-colors">
// //                 <td className="px-6 py-4">
// //                   <div className="text-sm font-medium text-gray-900">
// //                     {membre.nom_complet}
// //                   </div>
// //                   {membre.email && (
// //                     <div className="text-xs text-gray-400 mt-1">
// //                       {membre.email}
// //                     </div>
// //                   )}
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   <div className="text-sm text-gray-600">{membre.numero}</div>
// //                   {membre.adresse && (
// //                     <div className="text-xs text-gray-400 mt-1">
// //                       {membre.adresse}
// //                     </div>
// //                   )}
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   <span className="text-sm text-gray-600">{membre.sexe}</span>
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   <div className="text-sm text-gray-400">
// //                     {new Date(membre.date_adhesion).toLocaleDateString('fr-FR', {
// //                       day: 'numeric',
// //                       month: 'short',
// //                       year: 'numeric'
// //                     })}
// //                   </div>
// //                   {membre.date_naissance && (
// //                     <div className="text-xs text-gray-300 mt-1">
// //                       Né(e) le {new Date(membre.date_naissance).toLocaleDateString('fr-FR')}
// //                     </div>
// //                   )}
// //                 </td>
// //                 <td className="px-6 py-4 text-right">
// //                   <button
// //                     className="text-gray-400 hover:text-gray-600 transition-colors"
// //                     title="Voir l'historique des visites"
// //                   >
// //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //         {/* État vide */}
// //         {filteredMembres.length === 0 && (
// //           <div className="text-center py-12">
// //             <p className="text-sm text-gray-300">
// //               Aucun membre trouvé
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'

// interface Membre {
//   id: number
//   nom_complet: string
//   numero: string
//   email: string | null
//   adresse: string | null
//   sexe: string
//   date_naissance: string | null
//   date_adhesion: string
//   est_actif: boolean
//   membre_profile?: string | null
// }

// interface MembresListProps {
//   membres: Membre[]
// }

// export default function MembresList({ membres }: MembresListProps) {
//   const [search, setSearch] = useState('')
//   const [selectedMembre, setSelectedMembre] = useState<Membre | null>(null)

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   const getSexeColor = (sexe: string) => {
//     return sexe === 'Homme' 
//       ? 'bg-blue-50 text-blue-600' 
//       : 'bg-pink-50 text-pink-600'
//   }

//   const filteredMembres = membres.filter(membre =>
//     membre.nom_complet.toLowerCase().includes(search.toLowerCase()) ||
//     membre.numero.includes(search) ||
//     membre.email?.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <div>
//       {/* Barre de recherche */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Rechercher un membre..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//         />
//       </div>

//       {/* Statistiques rapides */}
//       <div className="grid grid-cols-3 gap-4 mb-4">
//         <div className="bg-white p-3 rounded-lg border border-gray-100">
//           <div className="text-xs text-gray-400">Total</div>
//           <div className="text-lg font-light text-gray-900">{membres.length}</div>
//         </div>
//         <div className="bg-white p-3 rounded-lg border border-gray-100">
//           <div className="text-xs text-gray-400">Hommes</div>
//           <div className="text-lg font-light text-gray-900">
//             {membres.filter(m => m.sexe === 'Homme').length}
//           </div>
//         </div>
//         <div className="bg-white p-3 rounded-lg border border-gray-100">
//           <div className="text-xs text-gray-400">Femmes</div>
//           <div className="text-lg font-light text-gray-900">
//             {membres.filter(m => m.sexe === 'Femme').length}
//           </div>
//         </div>
//       </div>

//       {/* Tableau */}
//       <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-50">
//           <thead>
//             <tr className="bg-gray-50/50">
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Membre
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Contact
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Sexe
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Adhésion
//               </th>
//               <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {filteredMembres.map((membre) => (
//               <tr key={membre.id} className="hover:bg-gray-50/50 transition-colors">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     {/* Avatar avec initiales ou photo membre_profile */}
//                     <div className="relative flex-shrink-0">
//                       {membre.membre_profile ? (
//                         <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-50">
//                           <Image
//                             src={membre.membre_profile}
//                             alt={membre.nom_complet}
//                             width={40}
//                             height={40}
//                             className="object-cover w-full h-full"
//                           />
//                         </div>
//                       ) : (
//                         <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ring-2 ring-gray-50 ${
//                           membre.sexe === 'Homme' 
//                             ? 'bg-blue-100 text-blue-600' 
//                             : 'bg-pink-100 text-pink-600'
//                         }`}>
//                           {getInitials(membre.nom_complet)}
//                         </div>
//                       )}
                      
//                       {/* Indicateur de statut actif/inactif */}
//                       <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
//                         membre.est_actif ? 'bg-green-400' : 'bg-gray-300'
//                       }`} />
//                     </div>

//                     {/* Nom et email */}
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">
//                         {membre.nom_complet}
//                       </div>
//                       {membre.email && (
//                         <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
//                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           {membre.email}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </td>
                
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-600 flex items-center gap-1">
//                     <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     {membre.numero}
//                   </div>
//                   {membre.adresse && (
//                     <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                       {membre.adresse}
//                     </div>
//                   )}
//                 </td>
                
//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSexeColor(membre.sexe)}`}>
//                     {membre.sexe}
//                   </span>
//                 </td>
                
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-400 flex items-center gap-1">
//                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     {new Date(membre.date_adhesion).toLocaleDateString('fr-FR', {
//                       day: 'numeric',
//                       month: 'short',
//                       year: 'numeric'
//                     })}
//                   </div>
//                   {membre.date_naissance && (
//                     <div className="text-xs text-gray-300 mt-1 flex items-center gap-1">
//                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
//                       </svg>
//                       {new Date(membre.date_naissance).toLocaleDateString('fr-FR', {
//                         day: 'numeric',
//                         month: 'short'
//                       })}
//                     </div>
//                   )}
//                 </td>
                
//                 <td className="px-6 py-4 text-right">
//                   <div className="flex items-center justify-end gap-2">
//                     <button
//                       onClick={() => setSelectedMembre(membre)}
//                       className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
//                       title="Voir les détails"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     </button>
//                     <button
//                       className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
//                       title="Voir l'historique des visites"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* État vide */}
//         {filteredMembres.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
//               <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H9a6 6 0 0112 0z" />
//               </svg>
//             </div>
//             <p className="text-sm text-gray-300">Aucun membre trouvé</p>
//             <p className="text-xs text-gray-200 mt-1">Essayez de modifier votre recherche</p>
//           </div>
//         )}
//       </div>

//       {/* Modal des détails (si sélectionné) */}
//       {selectedMembre && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <div className="flex items-center gap-4 mb-6">
//               {selectedMembre.membre_profile ? (
//                 <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-gray-50">
//                   <Image
//                     src={selectedMembre.membre_profile}
//                     alt={selectedMembre.nom_complet}
//                     width={64}
//                     height={64}
//                     className="object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium ring-4 ring-gray-50 ${
//                   selectedMembre.sexe === 'Homme' 
//                     ? 'bg-blue-100 text-blue-600' 
//                     : 'bg-pink-100 text-pink-600'
//                 }`}>
//                   {getInitials(selectedMembre.nom_complet)}
//                 </div>
//               )}
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900">{selectedMembre.nom_complet}</h3>
//                 <p className="text-sm text-gray-400">{selectedMembre.email || 'Pas d\'email'}</p>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="flex justify-between py-2 border-b border-gray-50">
//                 <span className="text-xs text-gray-400">Téléphone</span>
//                 <span className="text-sm text-gray-600">{selectedMembre.numero}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b border-gray-50">
//                 <span className="text-xs text-gray-400">Sexe</span>
//                 <span className={`text-sm ${selectedMembre.sexe === 'Homme' ? 'text-blue-600' : 'text-pink-600'}`}>
//                   {selectedMembre.sexe}
//                 </span>
//               </div>
//               {selectedMembre.adresse && (
//                 <div className="flex justify-between py-2 border-b border-gray-50">
//                   <span className="text-xs text-gray-400">Adresse</span>
//                   <span className="text-sm text-gray-600">{selectedMembre.adresse}</span>
//                 </div>
//               )}
//               <div className="flex justify-between py-2 border-b border-gray-50">
//                 <span className="text-xs text-gray-400">Membre depuis</span>
//                 <span className="text-sm text-gray-600">
//                   {new Date(selectedMembre.date_adhesion).toLocaleDateString('fr-FR')}
//                 </span>
//               </div>
//               {selectedMembre.date_naissance && (
//                 <div className="flex justify-between py-2 border-b border-gray-50">
//                   <span className="text-xs text-gray-400">Date naissance</span>
//                   <span className="text-sm text-gray-600">
//                     {new Date(selectedMembre.date_naissance).toLocaleDateString('fr-FR')}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end gap-2 mt-6">
//               <button
//                 onClick={() => setSelectedMembre(null)}
//                 className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 Fermer
//               </button>
//               <button
//                 className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
//               >
//                 Voir les visites
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import Image from 'next/image'
import EditMembre from './EditMembre'

interface Membre {
  id: number
  nom_complet: string
  numero: string
  email: string | null
  adresse: string | null
  sexe: string
  date_naissance: string | null
  date_adhesion: string
  est_actif: boolean
  membre_profile?: string | null
}

interface MembresListProps {
  membres: Membre[]
}

export default function MembresList({ membres }: MembresListProps) {
  const [search, setSearch] = useState('')
  const [editingMembre, setEditingMembre] = useState<Membre | null>(null)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const filteredMembres = membres.filter(membre =>
    membre.nom_complet.toLowerCase().includes(search.toLowerCase()) ||
    membre.numero.includes(search) ||
    membre.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un membre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
        />
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-3 rounded-lg border border-gray-100">
          <div className="text-xs text-gray-400">Total</div>
          <div className="text-lg font-light text-gray-900">{membres.length}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-100">
          <div className="text-xs text-gray-400">Hommes</div>
          <div className="text-lg font-light text-gray-900">
            {membres.filter(m => m.sexe === 'Homme').length}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-100">
          <div className="text-xs text-gray-400">Femmes</div>
          <div className="text-lg font-light text-gray-900">
            {membres.filter(m => m.sexe === 'Femme').length}
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-50">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Membre
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Sexe
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Adhésion
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredMembres.map((membre) => (
              <tr key={membre.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar avec initiales ou photo */}
                    <div className="relative flex-shrink-0">
                      {membre.membre_profile ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                          <Image
                            src={membre.membre_profile}
                            alt={membre.nom_complet}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 ring-2 ring-gray-100">
                          {getInitials(membre.nom_complet)}
                        </div>
                      )}
                      
                      {/* Indicateur de statut actif/inactif */}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                        membre.est_actif ? 'bg-gray-400' : 'bg-gray-200'
                      }`} />
                    </div>

                    {/* Nom et email */}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {membre.nom_complet}
                      </div>
                      {membre.email && (
                        <div className="text-xs text-gray-400 mt-0.5">
                          {membre.email}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{membre.numero}</div>
                  {membre.adresse && (
                    <div className="text-xs text-gray-400 mt-1">
                      {membre.adresse}
                    </div>
                  )}
                </td>
                
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{membre.sexe}</span>
                </td>
                
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-400">
                    {new Date(membre.date_adhesion).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </td>
                
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingMembre(membre)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Modifier"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Voir l'historique"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* État vide */}
        {filteredMembres.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H9a6 6 0 0112 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-300">Aucun membre trouvé</p>
          </div>
        )}
      </div>

      {/* Modal d'édition */}
      {editingMembre && (
        <EditMembre 
          membre={editingMembre} 
          onClose={() => setEditingMembre(null)} 
        />
      )}
    </div>
  )
}