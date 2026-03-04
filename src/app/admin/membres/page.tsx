// import { supabase } from '@/lib/supabase'
// import { getUser } from '@/actions/auth'
// import { redirect } from 'next/navigation'
// // import MembresList from './MembresList'
// import NouveauMembre from './NouveauMembre'

// export default async function MembresPage() {
//   const user = await getUser()

//   if (!user || user.role?.nom !== 'admin') {
//     redirect('/profile')
//   }

//   const { data: membres } = await supabase
//     .from('membres')
//     .select('*')
//     .order('nom_complet')

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* En-tête */}
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-light text-gray-900">Membres</h1>
//           <p className="text-sm text-gray-400 mt-1">
//             {membres?.length || 0} membre(s) enregistré(s)
//           </p>
//         </div>

//         <NouveauMembre />
//       </div>

//       {/* Liste */}
//       <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-50">
//           <thead>
//             <tr className="bg-gray-50/50">
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Nom</th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Contact</th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Sexe</th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Adhésion</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {membres?.map((membre) => (
//               <tr key={membre.id} className="hover:bg-gray-50/50">
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">{membre.nom_complet}</div>
//                   {membre.email && (
//                     <div className="text-xs text-gray-400">{membre.email}</div>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{membre.numero}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{membre.sexe}</td>
//                 <td className="px-6 py-4 text-sm text-gray-400">
//                   {new Date(membre.date_adhesion).toLocaleDateString('fr-FR')}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

import { supabase } from '@/lib/supabase'
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import MembresList from './MembresList'
import NouveauMembre from './NouveauMembre'

export default async function MembresPage() {
  const user = await getUser()

  if (!user || user.role?.nom !== 'admin') {
    redirect('/profile')
  }

  const { data: membres } = await supabase
    .from('membres')
    .select('*')
    .order('nom_complet')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Membres</h1>
          <p className="text-sm text-gray-400 mt-1">
            {membres?.length || 0} membre(s) enregistré(s)
          </p>
        </div>

        <NouveauMembre />
      </div>

      {/* Liste avec recherche */}
      <MembresList membres={membres || []} />
    </div>
  )
}