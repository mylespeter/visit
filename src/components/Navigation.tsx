// // 'use client'

// // import Link from 'next/link'
// // import { usePathname } from 'next/navigation'
// // import { logout } from '@/actions/auth'
// // import { useState, useEffect } from 'react'
// // import Image from 'next/image'

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
// // }

// // export default function Navigation({ user }: NavigationProps) {
// //   const pathname = usePathname()
// //   const [isLoggingOut, setIsLoggingOut] = useState(false)
// //   const [mounted, setMounted] = useState(false)
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

// //   useEffect(() => {
// //     setMounted(true)
// //   }, [])

// //   if (pathname === '/login' || pathname === '/register') {
// //     return null
// //   }

// //   if (!mounted) {
// //     return (
// //       <nav className="bg-white border-b border-gray-100">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="text-gray-300 text-sm">Chargement...</div>
// //           </div>
// //         </div>
// //       </nav>
// //     )
// //   }

// //   if (!user) {
// //     return null
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

// //   const getNavLinks = () => {
// //     const role = user.role?.nom

// //     const commonLinks = [
// //       { href: '/profile', label: 'Profil' }
// //     ]

// //     switch(role) {
// //       case 'admin':
// //         return [
// //           { href: '/admin/dashboard', label: 'Dashboard' },
// //           { href: '/admin/utilisateurs', label: 'Utilisateurs' },
// //           ...commonLinks
// //         ]
// //       case 'pasteur':
// //         return [
// //           { href: '/pasteur/dashboard', label: 'Dashboard' },
// //           { href: '/pasteur/cultes', label: 'Cultes' },
// //           { href: '/pasteur/membres', label: 'Membres' },
// //           ...commonLinks
// //         ]
// //       case 'secretaire':
// //         return [
// //           { href: '/secretaire/dashboard', label: 'Dashboard' },
// //           { href: '/secretaire/evenements', label: 'Événements' },
// //           { href: '/secretaire/inscriptions', label: 'Inscriptions' },
// //           ...commonLinks
// //         ]
// //       case 'visiteur':
// //         return [
// //           { href: '/visiteur/dashboard', label: 'Dashboard' },
// //           { href: '/visiteur/activites', label: 'Activités' },
// //           ...commonLinks
// //         ]
// //       default:
// //         return commonLinks
// //     }
// //   }

// //   const getInitials = (name: string) => {
// //     return name
// //       .split(' ')
// //       .map(word => word[0])
// //       .join('')
// //       .toUpperCase()
// //       .slice(0, 2)
// //   }

// //   const navLinks = getNavLinks()
// //   const isActive = (href: string) => pathname === href

// //   return (
// //     <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-16">
// //           {/* Logo */}
// //           <div className="flex-shrink-0">
// //             <Link href="/" className="flex items-center">
// //               <Image
// //                 src="/logo.png"
// //                 alt="ÉgliseApp"
// //                 width={32}
// //                 height={32}
// //                 className="w-8 h-8"
// //               />
// //               <span className="ml-2 text-lg font-medium text-gray-900">
// //                 Église<span className="text-gray-500">App</span>
// //               </span>
// //             </Link>
// //           </div>

// //           {/* Navigation desktop */}
// //           <div className="hidden md:flex items-center space-x-1">
// //             {navLinks.map((link) => (
// //               <Link
// //                 key={link.href}
// //                 href={link.href}
// //                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
// //                   isActive(link.href)
// //                     ? 'bg-gray-100 text-gray-900'
// //                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
// //                 }`}
// //               >
// //                 {link.label}
// //               </Link>
// //             ))}
// //           </div>

// //           {/* Menu utilisateur */}
// //           <div className="flex items-center space-x-3">
// //             {/* Avatar et infos */}
// //             <div className="flex items-center space-x-3">
// //               <div className="hidden sm:block text-right">
// //                 <div className="text-sm font-medium text-gray-700">
// //                   {user.nom_complet}
// //                 </div>
// //                 <div className="text-xs text-gray-400">
// //                   {user.role?.nom}
// //                 </div>
// //               </div>
              
// //               <div className="relative">
// //                 {user.profile_img ? (
// //                   <Image
// //                     src={user.profile_img}
// //                     alt={user.nom_complet}
// //                     width={36}
// //                     height={36}
// //                     className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
// //                   />
// //                 ) : (
// //                   <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-2 ring-white">
// //                     <span className="text-sm font-medium text-gray-600">
// //                       {getInitials(user.nom_complet)}
// //                     </span>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Bouton déconnexion */}
// //             <button
// //               onClick={handleLogout}
// //               disabled={isLoggingOut}
// //               className="p-2 text-red-600 bg-red-600 bg-opacity-15 inline-flex text-sm items-center hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
// //               title="Déconnexion"
// //             > Deconnexion
              
// //             </button>

// //             {/* Bouton menu mobile */}
// //             <button
// //               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //               className="md:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
// //             >
// //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 {isMobileMenuOpen ? (
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 ) : (
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //                 )}
// //               </svg>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Menu mobile */}
// //         {isMobileMenuOpen && (
// //           <div className="md:hidden py-3 border-t border-gray-100">
// //             <div className="flex flex-col space-y-1">
// //               {navLinks.map((link) => (
// //                 <Link
// //                   key={link.href}
// //                   href={link.href}
// //                   onClick={() => setIsMobileMenuOpen(false)}
// //                   className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
// //                     isActive(link.href)
// //                       ? 'bg-gray-100 text-gray-900'
// //                       : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
// //                   }`}
// //                 >
// //                   {link.label}
// //                 </Link>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   )
// // }
// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { logout } from '@/actions/auth'
// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import {
//   LayoutDashboard,
//   Users,
//   Settings,
//   UserCircle,
//   LogOut,
//   Menu,
//   ChevronLeft,
//   BarChart3,
//   CalendarCheck,
//   Church,
//   UserPlus,
//   Activity,
//   Home
// } from 'lucide-react'

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
// }

// export default function Navigation({ user }: NavigationProps) {
//   const pathname = usePathname()
//   const [isLoggingOut, setIsLoggingOut] = useState(false)
//   const [mounted, setMounted] = useState(false)
//   const [isCollapsed, setIsCollapsed] = useState(false)
//   const [isMobileOpen, setIsMobileOpen] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (pathname === '/login' || pathname === '/register') {
//     return null
//   }

//   if (!mounted) {
//     return (
//       <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 h-screen fixed left-0 top-0 transition-all duration-300`}>
//         <div className="p-4 text-gray-400">Chargement...</div>
//       </div>
//     )
//   }

//   if (!user) {
//     return null
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

//   const getNavLinks = () => {
//     const role = user.role?.nom

//     // Liens spécifiques selon le rôle avec les nouveaux chemins demandés
//     switch(role) {
//       case 'admin':
//         return [
//           { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//           { href: '/admin/utilisateur', label: 'Utilisateurs', icon: Users },
//           { href: '/configuration', label: 'Configuration', icon: Settings },
//           { href: '/profile', label: 'Profil', icon: UserCircle },
//         ]
//       case 'secretaire':
//         return [
//           { href: '/secretaire/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//           { href: '/membres', label: 'Membres', icon: Users },
//           { href: '/secretaire/statistiques', label: 'Statistiques', icon: BarChart3 },
//           { href: '/visites', label: 'Visites', icon: Activity },
//           { href: '/profile', label: 'Profil', icon: UserCircle },
//         ]
//       case 'pasteur':
//         return [
//           { href: '/pasteur/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//           { href: '/pasteur/cultes', label: 'Cultes', icon: Church },
//           { href: '/membres', label: 'Membres', icon: Users },
//           { href: '/profile', label: 'Profil', icon: UserCircle },
//         ]
//       case 'visiteur':
//         return [
//           { href: '/visiteur/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//           { href: '/visiteur/activites', label: 'Activités', icon: Activity },
//           { href: '/profile', label: 'Profil', icon: UserCircle },
//         ]
//       default:
//         return [
//           { href: '/profile', label: 'Profil', icon: UserCircle }
//         ]
//     }
//   }

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   const navLinks = getNavLinks()
//   const isActive = (href: string) => pathname === href

//   return (
//     <>
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
//           fixed left-0 top-0 h-screen bg-white border-r border-gray-200
//           transition-all duration-300 ease-in-out z-50
//           ${isCollapsed ? 'w-20' : 'w-64'}
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}
//       >
//         {/* Header avec logo et bouton collapse */}
//         <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
//           {!isCollapsed ? (
//             <Link href="/" className="flex items-center space-x-2">
//              <img src="/logo.png" alt="ÉgliseApp" className="w-8 h-8" />
//               <span className="font-semibold text-gray-900">ÉgliseApp</span>
//             </Link>
//           ) : (
//             <Link href="/" className="mx-auto">
//              <img src="/logo.png" alt="ÉgliseApp" className="w-8 h-8" />
//             </Link>
//           )}
          
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             <ChevronLeft
//               size={18}
//               className={`text-gray-500 transition-transform duration-300 ${
//                 isCollapsed ? 'rotate-180' : ''
//               }`}
//             />
//           </button>
//         </div>

//         {/* Profil utilisateur */}
//         <div className="p-4 border-b border-gray-200">
//           <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
//             <div className="relative flex-shrink-0">
//               {user.profile_img ? (
//                 <Image
//                   src={user.profile_img}
//                   alt={user.nom_complet}
//                   width={40}
//                   height={40}
//                   className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-2 ring-white">
//                   <span className="text-sm font-medium text-gray-600">
//                     {getInitials(user.nom_complet)}
//                   </span>
//                 </div>
//               )}
//             </div>
            
//             {!isCollapsed && (
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-900 truncate">
//                   {user.nom_complet}
//                 </p>
//                 <p className="text-xs text-gray-500 truncate">
//                   {user.role?.nom}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 overflow-y-auto py-4 px-3">
//           <ul className="space-y-1">
//             {navLinks.map((link) => {
//               const Icon = link.icon
//               const active = isActive(link.href)
              
//               return (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     onClick={() => setIsMobileOpen(false)}
//                     className={`
//                       flex items-center px-3 py-2.5 rounded-lg transition-all
//                       ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
//                       ${active 
//                         ? 'bg-gray-100 text-gray-900' 
//                         : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                       }
//                     `}
//                     title={isCollapsed ? link.label : ''}
//                   >
//                     <Icon size={20} />
//                     {!isCollapsed && <span className="text-sm font-medium">{link.label}</span>}
//                   </Link>
//                 </li>
//               )
//             })}
//           </ul>
//         </nav>

//         {/* Footer avec déconnexion */}
//         <div className="p-3 border-t border-gray-200">
//           <button
//             onClick={handleLogout}
//             disabled={isLoggingOut}
//             className={`
//               w-full flex items-center px-3 py-2.5 rounded-lg
//               text-red-600 hover:bg-red-50 transition-all
//               ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
//               disabled:opacity-50
//             `}
//             title={isCollapsed ? 'Déconnexion' : ''}
//           >
//             <LogOut size={20} />
//             {!isCollapsed && <span className="text-sm font-medium">Déconnexion</span>}
//           </button>
//         </div>
//       </aside>

//       {/* Main content spacer */}
//       <div className={`${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'} transition-all duration-300`} />
//     </>
//   )
// }

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/actions/auth'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  LayoutDashboard,
  Users,
  Settings,
  UserCircle,
  LogOut,
  Menu,
  ChevronLeft,
  BarChart3,
  Activity,
  Home,
  Church
} from 'lucide-react'

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

  if (pathname === '/login' || pathname === '/register') {
    return <>{children}</>
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 w-64">
          <div className="p-4 text-gray-400">Chargement...</div>
        </div>
        <div className="ml-64">
          {children}
        </div>
      </div>
    )
  }

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

  const getNavLinks = () => {
    const role = user.role?.nom

    switch(role) {
      case 'admin':
        return [
          { href: '/admin/membres', label: 'Membres', icon: LayoutDashboard },
          { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
          { href: '/admin/configuration', label: 'Configuration', icon: Settings },
          { href: '/profile', label: 'Profil', icon: UserCircle },
        ]
      case 'secretaire':
        return [
          { href: '/secretaire/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        //   { href: '/membres', label: 'Membres', icon: Users },
          { href: '/secretaire/statistiques', label: 'Statistiques', icon: BarChart3 },
          { href: '/secretaire/visites', label: 'Visites', icon: Activity },
          { href: '/profile', label: 'Profil', icon: UserCircle },
        ]
      case 'pasteur':
        return [
          { href: '/pasteur/visites', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/pasteur/statistiques', label: 'Cultes', icon: Church },
        //   { href: '/membres', label: 'Membres', icon: Users },
          { href: '/profile', label: 'Profil', icon: UserCircle },
        ]
      case 'visiteur':
        return [
          { href: '/visiteur/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/visiteur/activites', label: 'Activités', icon: Activity },
          { href: '/profile', label: 'Profil', icon: UserCircle },
        ]
      default:
        return [
          { href: '/profile', label: 'Profil', icon: UserCircle }
        ]
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const navLinks = getNavLinks()
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
          fixed left-0 top-0 h-screen bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out z-50
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header avec logo et bouton collapse */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!isCollapsed ? (
            <Link href="/" className="flex  items-center space-x-2">
             <img src="/logo.png" alt="ÉgliseApp" className="w-8 h-8" />
              <span className="font-semibold text-gray-900">ÉgliseApp</span>
            </Link>
          ) : (
            <Link href="/" className="mx-auto hidden">
             <img src="/logo.png" alt="ÉgliseApp" className="w-8 h-8" />
            </Link>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft
              size={18}
              className={`text-gray-500 transition-transform duration-300 ${
                isCollapsed ? 'hidden' : ''
              }`}
              />
              {isCollapsed && (<>
                           <img src="/logo.png" alt="ÉgliseApp" className="w-8 h-8" />

              </>)}
          </button>
        </div>

        {/* Profil utilisateur */}
        <div className="p-4 border-b border-gray-200">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="relative flex-shrink-0">
              {user.profile_img ? (
                <Image
                  src={user.profile_img}
                  alt={user.nom_complet}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-2 ring-white">
                  <span className="text-sm font-medium text-gray-600">
                    {getInitials(user.nom_complet)}
                  </span>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.nom_complet}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.role?.nom}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
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
                      flex items-center px-3 py-2.5 rounded-lg transition-all
                      ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
                      ${active 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                    title={isCollapsed ? link.label : ''}
                  >
                    <Icon size={20} />
                    {!isCollapsed && <span className="text-sm font-medium">{link.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer avec déconnexion */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`
              w-full flex items-center px-3 py-2.5 rounded-lg
              text-red-600 hover:bg-red-50 transition-all
              ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
              disabled:opacity-50
            `}
            title={isCollapsed ? 'Déconnexion' : ''}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`
          transition-all duration-300
          ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
      >
        {children}
      </main>
    </div>
  )
}