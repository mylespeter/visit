
// // // app/admin/page.tsx
// // import { supabase } from '@/lib/supabase'
// // import { getUser } from '@/actions/auth'
// // import { redirect } from 'next/navigation'
// // import Link from 'next/link'
// // import Image from 'next/image'
// // import AdminTabs from '@/components/AdminTabs'
// // import { Eye, Users, CalendarDays, Tag } from 'lucide-react'

// // export default async function AdminPage() {
// //   const user = await getUser()

// //   if (!user || user.role?.nom !== 'secretaire') {
// //     redirect('/profile')
// //   }

// //   // Récupérer les statistiques
// //   const { count: totalVisites } = await supabase
// //     .from('visites')
// //     .select('*', { count: 'exact', head: true })

// //   const { count: totalUtilisateurs } = await supabase
// //     .from('compte')
// //     .select('*', { count: 'exact', head: true })

// //   // Récupérer les visites du mois
// //   const debutMois = new Date()
// //   debutMois.setDate(1)
// //   debutMois.setHours(0, 0, 0, 0)
  
// //   const { count: visitesMois } = await supabase
// //     .from('visites')
// //     .select('*', { count: 'exact', head: true })
// //     .gte('created_at', debutMois.toISOString())

// //   const stats = {
// //     totalVisites: totalVisites || 0,
// //     utilisateurs: totalUtilisateurs || 0,
// //     visitesMois: visitesMois || 0,
// //     version: '1.0.0'
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* En-tête avec les statistiques */}
    
// // <div className="bg-white border-b border-gray-100">
// //   <div className="max-w-7xl mx-auto px-4 py-4">
// //     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      
// //       {/* Total Visites */}
// //       <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Total Visites</div>
// //             <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalVisites}</div>
// //           </div>
// //           <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
// //             <Eye className="w-5 h-5 text-blue-600" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Utilisateurs */}
// //       <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Utilisateurs</div>
// //             <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.utilisateurs}</div>
// //           </div>
// //           <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 group-hover:scale-110 transition-all duration-200">
// //             <Users className="w-5 h-5 text-green-600" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Visites ce Mois */}
// //       <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Visites ce Mois</div>
// //             <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.visitesMois}</div>
// //           </div>
// //           <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-200">
// //             <CalendarDays className="w-5 h-5 text-purple-600" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Version */}
// //       <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Version</div>
// //             <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.version}</div>
// //           </div>
// //           <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-200">
// //             <Tag className="w-5 h-5 text-orange-600" />
// //           </div>
// //         </div>
// //       </div>
      
// //     </div>
// //   </div>
// // </div>
// //       {/* Onglets */}
// //       <AdminTabs />
// //     </div>
// //   )
// // }

// // // app/admin/page.tsx
// // import { supabase } from '@/lib/supabase'
// // import { getUser } from '@/actions/auth'
// // import { redirect } from 'next/navigation'
// // import Link from 'next/link'
// // import Image from 'next/image'
// // import AdminTabs from '@/components/AdminTabs'
// // import { Eye, Users, CalendarDays, Tag } from 'lucide-react'

// // export default async function AdminPage() {
// //   const user = await getUser()

// //   if (!user || user.role?.nom !== 'secretaire') {
// //     redirect('/profile')
// //   }

// //   // Récupérer les statistiques
// //   const { count: totalVisites } = await supabase
// //     .from('visites')
// //     .select('*', { count: 'exact', head: true })

// //   const { count: totalUtilisateurs } = await supabase
// //     .from('compte')
// //     .select('*', { count: 'exact', head: true })

// //   // Récupérer les visites du mois
// //   const debutMois = new Date()
// //   debutMois.setDate(1)
// //   debutMois.setHours(0, 0, 0, 0)
  
// //   const { count: visitesMois } = await supabase
// //     .from('visites')
// //     .select('*', { count: 'exact', head: true })
// //     .gte('created_at', debutMois.toISOString())

// //   const stats = {
// //     totalVisites: totalVisites || 0,
// //     utilisateurs: totalUtilisateurs || 0,
// //     visitesMois: visitesMois || 0,
// //     version: '1.0.0'
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* En-tête avec les statistiques */}
    
// // <div className="bg-white border-b border-gray-100">
// //   <div className="max-w-7xl mx-auto px-4 py-4">
// //     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      
// //       {/* Total Visites */}
// //       <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Total Visites</div>
// //             <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalVisites}</div>
// //           </div>
// //           <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
// //             <Eye className="w-5 h-5 text-blue-600" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Utilisateurs */}
// //       <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Utilisateurs</div>
// //             <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.utilisateurs}</div>
// //           </div>
// //           <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 group-hover:scale-110 transition-all duration-200">
// //             <Users className="w-5 h-5 text-green-600" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Visites ce Mois */}
// //       <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Visites ce Mois</div>
// //             <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.visitesMois}</div>
// //           </div>
// //           <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-200">
// //             <CalendarDays className="w-5 h-5 text-purple-600" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Version */}
// //       <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Version</div>
// //             <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.version}</div>
// //           </div>
// //           <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-200">
// //             <Tag className="w-5 h-5 text-orange-600" />
// //           </div>
// //         </div>
// //       </div>
      
// //     </div>
// //   </div>
// // </div>
// //       {/* Onglets */}
// //       <AdminTabs />
// //     </div>
// //   )
// // }

// // app/admin/page.tsx
// import { supabase } from '@/lib/supabase'
// import { getUser } from '@/actions/auth'
// import { redirect } from 'next/navigation'
// import Link from 'next/link'
// import Image from 'next/image'
// import AdminTabs from '@/components/AdminTabs'
// import { TrendingUp, TrendingDown, Users, CalendarDays, Tag } from 'lucide-react'

// export default async function AdminPage() {
//   const user = await getUser()


//   // Récupérer les statistiques
//   const { count: totalVisites } = await supabase
//     .from('visites')
//     .select('*', { count: 'exact', head: true })

//   const { count: totalUtilisateurs } = await supabase
//     .from('compte')
//     .select('*', { count: 'exact', head: true })

//   // Mois actuel
//   const debutMoisActuel = new Date()
//   debutMoisActuel.setDate(1)
//   debutMoisActuel.setHours(0, 0, 0, 0)
  
//   const { count: visitesMoisActuel } = await supabase
//     .from('visites')
//     .select('*', { count: 'exact', head: true })
//     .gte('created_at', debutMoisActuel.toISOString())

//   // Mois précédent
//   const debutMoisPrecedent = new Date()
//   debutMoisPrecedent.setMonth(debutMoisPrecedent.getMonth() - 1)
//   debutMoisPrecedent.setDate(1)
//   debutMoisPrecedent.setHours(0, 0, 0, 0)
  
//   const finMoisPrecedent = new Date(debutMoisActuel)
//   finMoisPrecedent.setSeconds(finMoisPrecedent.getSeconds() - 1)

//   const { count: visitesMoisPrecedent } = await supabase
//     .from('visites')
//     .select('*', { count: 'exact', head: true })
//     .gte('created_at', debutMoisPrecedent.toISOString())
//     .lt('created_at', debutMoisActuel.toISOString())

//   // Calculer la tendance
//   const pourcentageChange = visitesMoisPrecedent && visitesMoisPrecedent > 0 && visitesMoisActuel
//     ? ((visitesMoisActuel - visitesMoisPrecedent) / visitesMoisPrecedent * 100).toFixed(1)
//     : visitesMoisActuel && visitesMoisActuel > 0 ? 100 : 0
  
//   const isPositive = Number(pourcentageChange) >= 0

//   const stats = {
//     totalVisites: totalVisites || 0,
//     utilisateurs: totalUtilisateurs || 0,
//     visitesMois: visitesMoisActuel || 0,
//     version: '1.0.0',
//     tendance: {
//       pourcentage: Math.abs(Number(pourcentageChange)),
//       positif: isPositive,
//       moisPrecedent: visitesMoisPrecedent || 0
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* En-tête avec les statistiques */}
//       <div className="bg-white border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            
//             {/* Total Visites avec tendance */}
//             <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Total Visites</div>
//                   <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalVisites}</div>
//                   <div className="flex items-center gap-1 mt-2">
//                     {stats.tendance.positif ? (
//                       <TrendingUp className="w-4 h-4 text-green-600" />
//                     ) : (
//                       <TrendingDown className="w-4 h-4 text-red-600" />
//                     )}
//                     <span className={`text-xs font-medium ${stats.tendance.positif ? 'text-green-600' : 'text-red-600'}`}>
//                       {stats.tendance.positif ? '+' : '-'}{stats.tendance.pourcentage}%
//                     </span>
//                     <span className="text-xs text-gray-400">vs mois dernier</span>
//                   </div>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
//                   <TrendingUp className="w-5 h-5 text-blue-600" />
//                 </div>
//               </div>
//             </div>

//             {/* Utilisateurs */}
//             <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Utilisateurs</div>
//                   <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.utilisateurs}</div>
//                 </div>
//                 <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 group-hover:scale-110 transition-all duration-200">
//                   <Users className="w-5 h-5 text-green-600" />
//                 </div>
//               </div>
//             </div>

//             {/* Visites ce Mois avec tendance */}
//             <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Visites ce Mois</div>
//                   <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.visitesMois}</div>
//                   <div className="flex items-center gap-1 mt-2">
//                     {stats.tendance.positif ? (
//                       <TrendingUp className="w-4 h-4 text-green-600" />
//                     ) : (
//                       <TrendingDown className="w-4 h-4 text-red-600" />
//                     )}
//                     <span className={`text-xs font-medium ${stats.tendance.positif ? 'text-green-600' : 'text-red-600'}`}>
//                       {stats.tendance.positif ? '+' : '-'}{stats.tendance.pourcentage}%
//                     </span>
//                     <span className="text-xs text-gray-400">vs {stats.tendance.moisPrecedent} visites</span>
//                   </div>
//                 </div>
//                 <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-200">
//                   <CalendarDays className="w-5 h-5 text-purple-600" />
//                 </div>
//               </div>
//             </div>

//             {/* Version */}
//             <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Version</div>
//                   <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.version}</div>
//                 </div>
//                 <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-200">
//                   <Tag className="w-5 h-5 text-orange-600" />
//                 </div>
//               </div>
//             </div>
            
//           </div>
//         </div>
//       </div>
      
//       {/* Onglets */}
//       <AdminTabs />
//     </div>
//   )
// }

// app/admin/page.tsx
import { supabase } from '@/lib/supabase'
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AdminTabs from '@/components/AdminTabs'
import { TrendingUp, TrendingDown, Users, CalendarDays, Tag } from 'lucide-react'

export default async function AdminPage() {
  const user = await getUser()

  // Vérifier si l'utilisateur est connecté (mais pas de restriction de rôle)
  if (!user) {
    redirect('/login')
  }

  const isAdmin = user?.role?.nom?.toLowerCase() === 'admin'

  // Récupérer les statistiques
  const { count: totalVisites } = await supabase
    .from('visites')
    .select('*', { count: 'exact', head: true })

  const { count: totalUtilisateurs } = await supabase
    .from('compte')
    .select('*', { count: 'exact', head: true })

  // Mois actuel
  const debutMoisActuel = new Date()
  debutMoisActuel.setDate(1)
  debutMoisActuel.setHours(0, 0, 0, 0)
  
  const { count: visitesMoisActuel } = await supabase
    .from('visites')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', debutMoisActuel.toISOString())

  // Mois précédent
  const debutMoisPrecedent = new Date()
  debutMoisPrecedent.setMonth(debutMoisPrecedent.getMonth() - 1)
  debutMoisPrecedent.setDate(1)
  debutMoisPrecedent.setHours(0, 0, 0, 0)
  
  const finMoisPrecedent = new Date(debutMoisActuel)
  finMoisPrecedent.setSeconds(finMoisPrecedent.getSeconds() - 1)

  const { count: visitesMoisPrecedent } = await supabase
    .from('visites')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', debutMoisPrecedent.toISOString())
    .lt('created_at', debutMoisActuel.toISOString())

  // Calculer la tendance
  const pourcentageChange = visitesMoisPrecedent && visitesMoisPrecedent > 0 && visitesMoisActuel
    ? ((visitesMoisActuel - visitesMoisPrecedent) / visitesMoisPrecedent * 100).toFixed(1)
    : visitesMoisActuel && visitesMoisActuel > 0 ? 100 : 0
  
  const isPositive = Number(pourcentageChange) >= 0

  const stats = {
    totalVisites: totalVisites || 0,
    utilisateurs: totalUtilisateurs || 0,
    visitesMois: visitesMoisActuel || 0,
    version: '1.0.0',
    tendance: {
      pourcentage: Math.abs(Number(pourcentageChange)),
      positif: isPositive,
      moisPrecedent: visitesMoisPrecedent || 0
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête avec les statistiques */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            
            {/* Total Visites avec tendance */}
            <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Total Visites</div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalVisites}</div>
                  <div className="flex items-center gap-1 mt-2">
                    {stats.tendance.positif ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${stats.tendance.positif ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.tendance.positif ? '+' : '-'}{stats.tendance.pourcentage}%
                    </span>
                    <span className="text-xs text-gray-400">vs mois dernier</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Utilisateurs - visible uniquement pour les admins */}
            {isAdmin && (
              <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Utilisateurs</div>
                    <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.utilisateurs}</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 group-hover:scale-110 transition-all duration-200">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            )}

            {/* Visites ce Mois avec tendance */}
            <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Visites ce Mois</div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.visitesMois}</div>
                  <div className="flex items-center gap-1 mt-2">
                    {stats.tendance.positif ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${stats.tendance.positif ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.tendance.positif ? '+' : '-'}{stats.tendance.pourcentage}%
                    </span>
                    <span className="text-xs text-gray-400">vs {stats.tendance.moisPrecedent} visites</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-200">
                  <CalendarDays className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Version */}
            <div className="group bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Version</div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">{stats.version}</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-200">
                  <Tag className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Onglets */}
      <AdminTabs />
    </div>
  )
}