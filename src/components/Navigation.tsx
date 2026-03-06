
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
//   Activity,
//   Home,
//   Church,
//   ChartArea
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

//   if (pathname === '/login' || pathname === '/register') {
//     return <>{children}</>
//   }

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 w-64">
//           <div className="p-4 text-gray-400">Chargement...</div>
//         </div>
//         <div className="ml-64">
//           {children}
//         </div>
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

//   const getNavLinks = () => {
//     const role = user.role?.nom

//     switch(role) {
//       case 'admin':
//         return [
//           { href: '/admin/membres', label: 'Membres', icon: LayoutDashboard },
//           { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
//           { href: '/admin/configuration', label: 'Configuration', icon: Settings },
//           { href: '/profile', label: 'Profil', icon: UserCircle },
//         ]
//       case 'secretaire':
//         return [
//         //   { href: '/secretaire/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//         //   { href: '/membres', label: 'Membres', icon: Users },
//           { href: '/secretaire/statistiques', label: 'Statistiques', icon: BarChart3 },
//           { href: '/secretaire/visites', label: 'Visites', icon: Activity },
//           { href: '/profile', label: 'Profil', icon: UserCircle },
//         ]
//       case 'pasteur':
//         return [
//           { href: '/pasteur/visites', label: 'Dashboard', icon: LayoutDashboard },
//           { href: '/pasteur/stats', label: 'Statistiques', icon: ChartArea },
//         //   { href: '/membres', label: 'Membres', icon: Users },
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
//           fixed left-0 top-0 h-screen bg-white border-r border-gray-200
//           transition-all duration-300 ease-in-out z-50
//           ${isCollapsed ? 'w-20' : 'w-64'}
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}
//       >
//         {/* Header avec logo et bouton collapse */}
//         <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
//           {!isCollapsed ? (
//             <Link href="/" className="flex  items-center space-x-2">
//              <img src="/logo.png" alt="ÉgliseApp" className="w-8 h-8" />
//               <span className="font-semibold text-gray-900">ÉgliseApp</span>
//             </Link>
//           ) : (
//             <Link href="/" className="mx-auto hidden">
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
//                 isCollapsed ? 'hidden' : ''
//               }`}
//               />
//               {isCollapsed && (<>
//                            <img src="/logo.png" alt="ÉgliseApp" className="w-8 h-8" />

//               </>)}
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

//       {/* Main content */}
//       <main
//         className={`
//           transition-all duration-300
//           ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
//         `}
//       >
//         {children}
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
  Church,
  ChartArea,
  Clock,
  Calendar
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
        <div className="fixed left-0 top-0 h-screen bg-[#1e40af] border-r border-blue-800 w-64">
          <div className="p-4 text-blue-100">Chargement...</div>
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
          { href: '/secretaire/visites', label: 'Planning visites', icon: Calendar },
          { href: '/secretaire/visites/historique', label: 'Historique visites', icon: Clock },
          { href: '/secretaire/statistiques', label: 'Rapport', icon: ChartArea },
          { href: '/profile', label: 'Profil', icon: UserCircle },
        ]
      case 'pasteur':
        return [
          { href: '/pasteur/visites', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/pasteur/stats', label: 'Statistiques', icon: ChartArea },
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
          fixed left-0 top-0 h-screen bg-[#234dda] border-r border-blue-800
          transition-all flex flex-col justify-between duration-300 ease-in-out z-50
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >

<div>
        {/* Header avec logo et bouton collapse */}
        <div className="h-24 flex items-center justify-between px-4 border-b border-blue-800">
          {!isCollapsed ? (
            <Link href="/" className="flex items-center space-x-2 bg-white  w-max p-3">
              <img src="/logo.png" alt="ÉgliseApp" className="w-16 " />
             
            </Link>
          ) : (
            <Link href="/" className="mx-auto hidden">
              <img src="/logo.png" alt="ÉgliseApp" className="w-8 h-8 brightness-0 invert" />
            </Link>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ChevronLeft
              size={18}
              className={`text-blue-200 transition-transform duration-300 ${
                isCollapsed ? 'hidden' : ''
              }`}
            />
            {isCollapsed && (
              <img src="/logo.png" alt="ÉgliseApp" className="w-8 h-8 brightness-0 invert" />
            )}
          </button>
        </div>

        {/* Profil utilisateur */}
        <div className="p-4 borde-b border-blue-00">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
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
                      flex items-center px-3 py-2.5 transition-all
                      ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
                      ${active 
                        ? 'border-r-2 bg-white/20 text-white' 
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
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
</div>

        {/* Footer avec déconnexion */}
        <div className="p-3 border-t border-blue-800">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`
              w-full flex items-center px-3 py-2.5 rounded-lg
              text-blue-100 hover:bg-red-700 bg-red-600 hover:text-white transition-all
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