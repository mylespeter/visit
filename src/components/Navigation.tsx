
// // 'use client'

// // import Link from 'next/link'
// // import { usePathname } from 'next/navigation'
// // import { logout } from '@/actions/auth'
// // import { useState, useEffect } from 'react'
// // import Image from 'next/image'
// // import {
// //   UserCircle,
// //   LogOut,
// //   Menu,
// //   ChevronLeft,
// //   Calendar,
// //   History,
// //   BarChart3,
// //   LayoutDashboard,
// //   Settings,
// //   Users,
// //   BarChart,
// //   ChartNoAxesCombined,
// //   UserCircle2,
// // } from 'lucide-react'
// // import { FaUserShield } from 'react-icons/fa'

// // interface User {
// //   id: number
// //   nom_complet: string
// //   role: {
// //     nom: string
// //   }
// //   profile_img?: string | null
// // }

// // interface NavigationProps {
// //   user: User | null
// //   children: React.ReactNode
// // }

// // export default function Navigation({ user, children }: NavigationProps) {
// //   const pathname = usePathname()
// //   const [isLoggingOut, setIsLoggingOut] = useState(false)
// //   const [mounted, setMounted] = useState(false)
// //   const [isCollapsed, setIsCollapsed] = useState(false)
// //   const [isMobileOpen, setIsMobileOpen] = useState(false)

// //   useEffect(() => {
// //     setMounted(true)
// //   }, [])

// //   if (pathname === '/login' || pathname === '/register') {
// //     return <>{children}</>
// //   }

// //   if (!mounted) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <div className="fixed left-0 top-0 h-screen bg-[#1e40af] border-r border-blue-800 w-64">
// //           <div className="p-4 text-blue-100">Chargement...</div>
// //         </div>
// //         <div className="ml-64">{children}</div>
// //       </div>
// //     )
// //   }

// //   if (!user) {
// //     return <>{children}</>
// //   }

// //   const handleLogout = async () => {
// //     setIsLoggingOut(true)
// //     try {
// //       await logout()
// //     } catch (error) {
// //       console.error('Erreur déconnexion:', error)
// //       setIsLoggingOut(false)
// //     }
// //   }

// //   const getInitials = (name: string) => {
// //     return name
// //       .split(' ')
// //       .map((word) => word[0])
// //       .join('')
// //       .toUpperCase()
// //       .slice(0, 2)
// //   }

// //   // Navigation links exactly as in the image
// //   const navLinks = [
// //     { href: '/visites', label: 'Planning', icon: Calendar },
// //     { href: '/historique', label: 'Historique', icon: History },
// //     { href: '/rapports', label: 'Rapports', icon: ChartNoAxesCombined },
// //     { href: '/tableau', label: 'Tableau', icon: LayoutDashboard },
// //     { href: '/administration', label: 'Administration', icon: FaUserShield },
// //   ]

// //   const bottomLinks = [
// //     { href: '/mon-profil', label: 'Mon Profil', icon: UserCircle },
// //     { href: '/parametres', label: 'Paramètres', icon: Settings },
// //   ]

// //   const isActive = (href: string) => pathname === href

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Mobile menu button */}
// //       <button
// //         onClick={() => setIsMobileOpen(!isMobileOpen)}
// //         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
// //       >
// //         <Menu size={20} className="text-gray-600" />
// //       </button>

// //       {/* Overlay for mobile */}
// //       {isMobileOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
// //           onClick={() => setIsMobileOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <aside
// //         className={`
// //           fixed left-0 top-0 h-screen bg-blue-600 border-r border-blue-800
// //           transition-all flex flex-col justify-between duration-300 ease-in-out z-50
// //           ${isCollapsed ? 'w-20' : 'w-64'}
// //           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
// //         `}
// //       >
// //         <div>
// //           {/* Header avec logo et bouton collapse */}
// //           <div className="h-24 flex items-center justify-between px-4 border-b border-blue-700">
// //             {!isCollapsed ? (
// //               <Link href="/" className="flex bg-white rounded-full p-2">
// //                 <img src="/logo.png" alt="Logo" className="w-12 h-12" />
// //               </Link>
// //             ) : (
// //               <Link href="/" className="mx-auto">
// //                 <img src="/logo.png" alt="Logo" className="w-8 h-8" />
// //               </Link>
// //             )}

// //             <button
// //               onClick={() => setIsCollapsed(!isCollapsed)}
// //               className="hidden lg:block p-1.5 rounded-lg hover:bg-blue-700 transition-colors"
// //             >
// //               <ChevronLeft
// //                 size={18}
// //                 className={`text-blue-200 transition-transform duration-300 ${
// //                   isCollapsed ? 'rotate-180' : ''
// //                 }`}
// //               />
// //             </button>
// //           </div>

// //           {/* Navigation principale */}
// //           <nav className="flex-1 overflow-y-auto py-4 px-3">
// //             <ul className="space-y-1">
// //               {navLinks.map((link) => {
// //                 const Icon = link.icon
// //                 const active = isActive(link.href)

// //                 return (
// //                   <li key={link.href}>
// //                     <Link
// //                       href={link.href}
// //                       onClick={() => setIsMobileOpen(false)}
// //                       className={`
// //                         flex items-center px-3 py-2.5 rounded-lg transition-all
// //                         ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
// //                         ${
// //                           active
// //                             ? 'bg-white/20 text-white'
// //                             : 'text-blue-100 hover:bg-blue-700 hover:text-white'
// //                         }
// //                       `}
// //                       title={isCollapsed ? link.label : ''}
// //                     >
// //                       <Icon size={20} />
// //                       {!isCollapsed && (
// //                         <span className="text-sm font-medium">{link.label}</span>
// //                       )}
// //                     </Link>
// //                   </li>
// //                 )
// //               })}
// //             </ul>
// //           </nav>
// //         </div>

// //         {/* Partie basse : Profil utilisateur + Paramètres + Déconnexion */}
// //         <div className="border-t border-blue-700 pt-4 pb-4">
// //           {/* Profil utilisateur */}
// //           <div className={`px-3 mb-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
// //             <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
// //               <div className="relative flex-shrink-0">
// //                 {user.profile_img ? (
// //                   <Image
// //                     src={user.profile_img}
// //                     alt={user.nom_complet}
// //                     width={40}
// //                     height={40}
// //                     className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-300"
// //                   />
// //                 ) : (
// //                   <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-blue-300">
// //                     <span className="text-sm font-medium text-white">
// //                       {getInitials(user.nom_complet)}
// //                     </span>
// //                   </div>
// //                 )}
// //               </div>

// //               {!isCollapsed && (
// //                 <div className="flex-1 min-w-0">
// //                   <p className="text-sm font-medium text-white truncate">
// //                     {user.nom_complet}
// //                   </p>
// //                   <p className="text-xs text-blue-200 truncate">
// //                     {user.role?.nom}
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Liens du bas (Mon Profil, Paramètres) */}
// //           <ul className="space-y-1 px-3 mt-3">
// //             {bottomLinks.map((link) => {
// //               const Icon = link.icon
// //               const active = isActive(link.href)

// //               return (
// //                 <li key={link.href}>
// //                   <Link
// //                     href={link.href}
// //                     onClick={() => setIsMobileOpen(false)}
// //                     className={`
// //                       flex items-center px-3 py-2 rounded-lg transition-all
// //                       ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
// //                       ${
// //                         active
// //                           ? 'bg-white/20 text-white'
// //                           : 'text-blue-100 hover:bg-blue-700 hover:text-white'
// //                       }
// //                     `}
// //                     title={isCollapsed ? link.label : ''}
// //                   >
// //                     <Icon size={18} />
// //                     {!isCollapsed && (
// //                       <span className="text-sm font-medium">{link.label}</span>
// //                     )}
// //                   </Link>
// //                 </li>
// //               )
// //             })}
// //           </ul>

// //           {/* Déconnexion */}
// //           <div className="px-3 mt-3">
// //             <button
// //               onClick={handleLogout}
// //               disabled={isLoggingOut}
// //               className={`
// //                 w-full flex items-center px-3 py-2 rounded-lg
// //                 text-red-200 hover:bg-red-700 hover:text-white transition-all
// //                 ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
// //                 disabled:opacity-50
// //               `}
// //               title={isCollapsed ? 'Déconnexion' : ''}
// //             >
// //               <LogOut size={18} />
// //               {!isCollapsed && <span className="text-sm font-medium">Déconnexion</span>}
// //             </button>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main content */}
// //       <main
// //         className={`
// //           transition-all duration-300
// //           ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
// //         `}
// //       >
// //         {children}
// //       </main>
// //     </div>
// //   )
// // }

// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { logout } from '@/actions/auth'
// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import {
//   UserCircle,
//   LogOut,
//   Menu,
//   ChevronLeft,
//   Calendar,
//   History,
//   BarChart3,
//   LayoutDashboard,
//   Settings,
//   Users,
//   BarChart,
//   ChartNoAxesCombined,
//   UserCircle2,
// } from 'lucide-react'
// import { FaUserShield } from 'react-icons/fa'

// interface User {
//   id: number
//   nom_complet: string
//   role: {
//     nom: string
//   }
//   profile_img?: string | null
// }

// interface NavigationProps {
//   user: User | null
//   children: React.ReactNode
// }

// export default function Navigation({ user, children }: NavigationProps) {
//   const pathname = usePathname()
//   const [isLoggingOut, setIsLoggingOut] = useState(false)
//   const [mounted, setMounted] = useState(false)
//   const [isCollapsed, setIsCollapsed] = useState(false)
//   const [isMobileOpen, setIsMobileOpen] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   // Configuration des pages pour la top bar
//   const getPageConfig = (path: string) => {
//     switch (path) {
//       case '/visites':
//         return {
//           title: 'Planning des visites',
//           description: 'Consultez et gérez le planning des visites',
//         }
//       case '/historique':
//         return {
//           title: 'Historique des visites',
//           description: 'Consultez TOUTES les visites passées',
//         }
//       case '/rapports':
//         return {
//           title: 'Rapports et analyses',
//           description: 'Visualisez les statistiques et rapports détaillés',
//         }
//       case '/tableau':
//         return {
//           title: 'Tableau des visiteurs',
//           description: 'Consultez TOUS les visiteurs avec filtres et tri avancés',
//         }
//       case '/administration':
//         return {
//           title: 'Administration',
//           description: 'Gérez les utilisateurs et les permissions',
//         }
//       case '/profile':
//         return {
//           title: 'Mon profil',
//           description: 'Consultez et modifiez vos informations personnelles',
//         }
//       case '/parametres':
//         return {
//           title: 'Paramètres',
//           description: 'Personnalisez vos préférences',
//         }
//       default:
//         return {
//           title: 'Tableau de bord',
//           description: 'Bienvenue sur votre espace de travail',
//         }
//     }
//   }

//   const pageConfig = getPageConfig(pathname)

//   if (pathname === '/login' || pathname === '/register') {
//     return <>{children}</>
//   }

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="fixed left-0 top-0 h-screen bg-[#1e40af] border-r border-blue-800 w-64">
//           <div className="p-4 text-blue-100">Chargement...</div>
//         </div>
//         <div className="ml-64">{children}</div>
//       </div>
//     )
//   }

//   if (!user) {
//     return <>{children}</>
//   }

//   const handleLogout = async () => {
//     setIsLoggingOut(true)
//     try {
//       await logout()
//     } catch (error) {
//       console.error('Erreur déconnexion:', error)
//       setIsLoggingOut(false)
//     }
//   }

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map((word) => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   // Navigation links exactly as in the image
//   const navLinks = [
//     { href: '/visites', label: 'Planning', icon: Calendar },
//     { href: '/historique', label: 'Historique', icon: History },
//     { href: '/rapports', label: 'Rapports', icon: ChartNoAxesCombined },
//     { href: '/tableau', label: 'Tableau', icon: LayoutDashboard },
//     { href: '/administration', label: 'Administration', icon: FaUserShield },
//   ]

//   const bottomLinks = [
//     { href: '/profile', label: 'Mon Profil', icon: UserCircle },
//     { href: '/parametres', label: 'Paramètres', icon: Settings },
//   ]

//   const isActive = (href: string) => pathname === href

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile menu button */}
//       <button
//         onClick={() => setIsMobileOpen(!isMobileOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
//       >
//         <Menu size={20} className="text-gray-600" />
//       </button>

//       {/* Overlay for mobile */}
//       {isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed left-0 top-0 h-screen bg-blue-600 border-r border-blue-800
//           transition-all flex flex-col justify-between duration-300 ease-in-out z-50
//           ${isCollapsed ? 'w-20' : 'w-64'}
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}
//       >
//         <div>
//           {/* Header avec logo et bouton collapse */}
//           <div className="h-24 flex items-center justify-between px-4 border-b border-blue-700">
//             {!isCollapsed ? (
//               <Link href="/" className="flex bg-white rounded-full p-2">
//                 <img src="/logo.png" alt="Logo" className="w-12 h-12" />
//               </Link>
//             ) : (
//               <Link href="/" className="mx-auto">
//                 <img src="/logo.png" alt="Logo" className="w-8 h-8" />
//               </Link>
//             )}

//             <button
//               onClick={() => setIsCollapsed(!isCollapsed)}
//               className="hidden lg:block p-1.5 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <ChevronLeft
//                 size={18}
//                 className={`text-blue-200 transition-transform duration-300 ${
//                   isCollapsed ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>
//           </div>

//           {/* Navigation principale */}
//           <nav className="flex-1 overflow-y-auto py-4 px-3">
//             <ul className="space-y-1">
//               {navLinks.map((link) => {
//                 const Icon = link.icon
//                 const active = isActive(link.href)

//                 return (
//                   <li key={link.href}>
//                     <Link
//                       href={link.href}
//                       onClick={() => setIsMobileOpen(false)}
//                       className={`
//                         flex items-center px-3 py-2.5  transition-all
//                         ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
//                         ${
//                           active
//                             ? 'bg-white/20 text-white border-l-2'
//                             : 'text-blue-100 hover:bg-blue-700 hover:text-white'
//                         }
//                       `}
//                       title={isCollapsed ? link.label : ''}
//                     >
//                       <Icon size={20} />
//                       {!isCollapsed && (
//                         <span className="text-sm font-medium">{link.label}</span>
//                       )}
//                     </Link>
//                   </li>
//                 )
//               })}
//             </ul>
//           </nav>
//         </div>

//         {/* Partie basse : Profil utilisateur + Paramètres + Déconnexion */}
//         <div className="border-t border-blue-700 pt-4 pb-4">
//           {/* Profil utilisateur */}
//           <div className={`px-3 mb-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
//             <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
//               <div className="relative flex-shrink-0">
//                 {user.profile_img ? (
//                   <Image
//                     src={user.profile_img}
//                     alt={user.nom_complet}
//                     width={40}
//                     height={40}
//                     className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-300"
//                   />
//                 ) : (
//                   <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-blue-300">
//                     <span className="text-sm font-medium text-white">
//                       {getInitials(user.nom_complet)}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {!isCollapsed && (
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-white truncate">
//                     {user.nom_complet}
//                   </p>
//                   <p className="text-xs text-blue-200 truncate">
//                     {user.role?.nom}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Liens du bas (Mon Profil, Paramètres) */}
//           <ul className="space-y-1 px-3 mt-3">
//             {bottomLinks.map((link) => {
//               const Icon = link.icon
//               const active = isActive(link.href)

//               return (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     onClick={() => setIsMobileOpen(false)}
//                     className={`
//                       flex items-center px-3 py-2  transition-all
//                       ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
//                       ${
//                         active
//                           ? 'bg-white/20 text-white'
//                           : 'text-blue-100 hover:bg-blue-700 hover:text-white'
//                       }
//                     `}
//                     title={isCollapsed ? link.label : ''}
//                   >
//                     <Icon size={18} />
//                     {!isCollapsed && (
//                       <span className="text-sm font-medium">{link.label}</span>
//                     )}
//                   </Link>
//                 </li>
//               )
//             })}
//           </ul>

//           {/* Déconnexion */}
//           <div className="px-3 mt-3">
//             <button
//               onClick={handleLogout}
//               disabled={isLoggingOut}
//               className={`
//                 w-full flex items-center px-3 py-2 rounded-lg
//                 text-red-200 hover:bg-red-700 hover:text-white transition-all
//                 ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
//                 disabled:opacity-50
//               `}
//               title={isCollapsed ? 'Déconnexion' : ''}
//             >
//               <LogOut size={18} />
//               {!isCollapsed && <span className="text-sm font-medium">Déconnexion</span>}
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main
//         className={`
//           transition-all duration-300
//           ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
//         `}
//       >
//         {/* Top Bar */}
//         <div className="bg-white border-b border-gray-200 shadow-sm">
//           <div className="px-6 py-3">
//             <div className="flex items-center justify-between">
//               {/* Left side: Page title and description */}
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">
//                   {pageConfig.title}
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {pageConfig.description}
//                 </p>
//               </div>

//               {/* Right side: User profile */}
//               <div className="flex items-center space-x-4">
//                 <div className="text-right hidden sm:block">
//                   <p className="text-sm font-medium text-gray-900">
//                     {user.nom_complet}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {user.role?.nom}
//                   </p>
//                 </div>
//                 <div className="relative">
//                   {user.profile_img ? (
//                     <Image
//                       src={user.profile_img}
//                       alt={user.nom_complet}
//                       width={40}
//                       height={40}
//                       className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-blue-500">
//                       <span className="text-sm font-medium text-white">
//                         {getInitials(user.nom_complet)}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Page content */}
//         <div className="">
//           {children}
//         </div>
//       </main>
//     </div>
//   )
// }

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/actions/auth'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  UserCircle,
  LogOut,
  Menu,
  ChevronLeft,
  Calendar,
  History,
  ChartNoAxesCombined,
  LayoutDashboard,
  Settings,
} from 'lucide-react'
import { FaUserShield } from 'react-icons/fa'

interface User {
  id: number
  nom_complet: string
  role: {
    nom: string
  }
  profile_img?: string | null
}

interface NavigationProps {
  user: User | null
  children: React.ReactNode
}

export default function Navigation({ user, children }: NavigationProps) {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Configuration des pages pour la top bar
  const getPageConfig = (path: string) => {
    switch (path) {
      case '/visites':
        return {
          title: 'Planning des visites',
          description: 'Consultez et gérez le planning des visites',
        }
      case '/historique':
        return {
          title: 'Historique des visites',
          description: 'Consultez TOUTES les visites passées',
        }
      case '/rapports':
        return {
          title: 'Rapports et analyses',
          description: 'Visualisez les statistiques et rapports détaillés',
        }
      case '/tableau':
        return {
          title: 'Tableau des visiteurs',
          description: 'Consultez TOUS les visiteurs avec filtres et tri avancés',
        }
      case '/administration':
        return {
          title: 'Administration',
          description: 'Gérez les utilisateurs et les permissions',
        }
      case '/profile':
        return {
          title: 'Mon profil',
          description: 'Consultez et modifiez vos informations personnelles',
        }
      case '/parametres':
        return {
          title: 'Paramètres',
          description: 'Personnalisez vos préférences',
        }
      default:
        return {
          title: 'Tableau de bord',
          description: 'Bienvenue sur votre espace de travail',
        }
    }
  }

  const pageConfig = getPageConfig(pathname)

  // Ne rien afficher du tout sur les pages login/register
  if (pathname === '/login' || pathname === '/register') {
    return <>{children}</>
  }

  // Pendant le chargement initial, ne rien afficher
  if (!mounted) {
    return <>{children}</>
  }

  // Si pas d'utilisateur, afficher seulement le contenu
  if (!user) {
    return <>{children}</>
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch (error) {
      console.error('Erreur déconnexion:', error)
      setIsLoggingOut(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Navigation links
  const navLinks = [
    { href: '/visites', label: 'Planning', icon: Calendar },
    { href: '/historique', label: 'Historique', icon: History },
    { href: '/rapports', label: 'Rapports', icon: ChartNoAxesCombined },
    { href: '/tableau', label: 'Tableau', icon: LayoutDashboard },
    { href: '/administration', label: 'Administration', icon: FaUserShield },
  ]

  const bottomLinks = [
    { href: '/profile', label: 'Mon Profil', icon: UserCircle },
    { href: '/parametres', label: 'Paramètres', icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
      >
        <Menu size={20} className="text-gray-600" />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-blue-600 border-r border-blue-800
          transition-all flex flex-col justify-between duration-300 ease-in-out z-50
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div>
          {/* Header avec logo et bouton collapse */}
          <div className="h-24 flex items-center justify-between px-4 border-b border-blue-700">
            {!isCollapsed ? (
              <Link href="/" className="flex bg-white rounded-full p-2">
                <img src="/logo.png" alt="Logo" className="w-12 h-12" />
              </Link>
            ) : (
              <Link href="/" className="mx-auto">
                <img src="/logo.png" alt="Logo" className="w-8 h-8" />
              </Link>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ChevronLeft
                size={18}
                className={`text-blue-200 transition-transform duration-300 ${
                  isCollapsed ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Navigation principale */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = isActive(link.href)

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        flex items-center px-3 py-2.5 transition-all
                        ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
                        ${
                          active
                            ? 'bg-white/20 text-white border-l-2'
                            : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                        }
                      `}
                      title={isCollapsed ? link.label : ''}
                    >
                      <Icon size={20} />
                      {!isCollapsed && (
                        <span className="text-sm font-medium">{link.label}</span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Partie basse : Profil utilisateur + Paramètres + Déconnexion */}
        <div className="border-t border-blue-700 pt-4 pb-4">
          {/* Profil utilisateur */}
          <div className={`px-3 mb-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
              <div className="relative flex-shrink-0">
                {user.profile_img ? (
                  <Image
                    src={user.profile_img}
                    alt={user.nom_complet}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-blue-300">
                    <span className="text-sm font-medium text-white">
                      {getInitials(user.nom_complet)}
                    </span>
                  </div>
                )}
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.nom_complet}
                  </p>
                  <p className="text-xs text-blue-200 truncate">
                    {user.role?.nom}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Liens du bas (Mon Profil, Paramètres) */}
          <ul className="space-y-1 px-3 mt-3">
            {bottomLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center px-3 py-2 transition-all
                      ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
                      ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                      }
                    `}
                    title={isCollapsed ? link.label : ''}
                  >
                    <Icon size={18} />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{link.label}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Déconnexion */}
          <div className="px-3 mt-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`
                w-full flex items-center px-3 py-2 rounded-lg
                text-red-200 hover:bg-red-700 hover:text-white transition-all
                ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
                disabled:opacity-50
              `}
              title={isCollapsed ? 'Déconnexion' : ''}
            >
              <LogOut size={18} />
              {!isCollapsed && <span className="text-sm font-medium">Déconnexion</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`
          transition-all duration-300
          ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
      >
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Left side: Page title and description */}
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {pageConfig.title}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {pageConfig.description}
                </p>
              </div>

              {/* Right side: User profile */}
              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user.nom_complet}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.role?.nom}
                  </p>
                </div>
                <div className="relative">
                  {user.profile_img ? (
                    <Image
                      src={user.profile_img}
                      alt={user.nom_complet}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-blue-500">
                      <span className="text-sm font-medium text-white">
                        {getInitials(user.nom_complet)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="">
          {children}
        </div>
      </main>
    </div>
  )
}