
// // app/page.tsx - Page d'accueil avec modal de connexion
// 'use client'

// import { useEffect, useState } from 'react'
// import { format } from 'date-fns'
// import { fr } from 'date-fns/locale'
// import { Calendar, ChevronLeft, ChevronRight, Clock, User, Mail, CheckCircle, XCircle, ClockIcon, LogIn, X, Phone, Lock, Building2 } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// interface Visite {
//   id: number
//   heure: string
//   nom_visiteur: string
//   email?: string
//   telephone: string
//   type?: string
//   statut: string
//   motif: string
// }

// export default function HomePage() {
//   const router = useRouter()
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [visites, setVisites] = useState<Visite[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
//   const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
//   const [isLoggingIn, setIsLoggingIn] = useState(false)
//   const [loginError, setLoginError] = useState<string | null>(null)
//   const [loginForm, setLoginForm] = useState({
//     email: '',
//     numero: '',
//     mot_de_passe: ''
//   })

//   const fetchVisites = async (date: Date) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const formattedDate = format(date, 'yyyy-MM-dd')
//       const response = await fetch(`/api/visites/public?date=${formattedDate}`)
//       const data = await response.json()
      
//       if (data.success) {
//         setVisites(data.data || [])
//       } else {
//         setError(data.error || 'Erreur de chargement')
//       }
//     } catch (err) {
//       setError('Erreur de connexion')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchVisites(currentDate)
//   }, [currentDate])

//   const goToPreviousDay = () => {
//     const newDate = new Date(currentDate)
//     newDate.setDate(currentDate.getDate() - 1)
//     setCurrentDate(newDate)
//   }

//   const goToNextDay = () => {
//     const newDate = new Date(currentDate)
//     newDate.setDate(currentDate.getDate() + 1)
//     setCurrentDate(newDate)
//   }

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoggingIn(true)
//     setLoginError(null)

//     const form = new FormData()
//     if (loginMethod === 'email') {
//       form.append('email', loginForm.email)
//     } else {
//       form.append('numero', loginForm.numero)
//     }
//     form.append('mot_de_passe', loginForm.mot_de_passe)

//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         body: form
//       })

//       const data = await response.json()

//       if (data.success) {
//         setIsLoginModalOpen(false)
//         router.push(data.redirectTo || '/secretaire/visites')
//         router.refresh()
//       } else {
//         setLoginError(data.error || 'Erreur de connexion')
//       }
//     } catch (err) {
//       setLoginError('Erreur de connexion au serveur')
//     } finally {
//       setIsLoggingIn(false)
//     }
//   }

//   const getStatusBadge = (statut: string) => {
//     switch (statut) {
//       case 'Reçue':
//         return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700"><CheckCircle className="w-3 h-3" /> Reçue</span>
//       case 'Annulée':
//         return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-100 text-red-700"><XCircle className="w-3 h-3" /> Annulée</span>
//       default:
//         return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700"><ClockIcon className="w-3 h-3" /> En attente</span>
//     }
//   }

//   const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Visites pastorales
//               </h1>
//               <p className="text-gray-500 text-sm mt-1">Gestion des visites et rendez-vous</p>
//             </div>
//             <button
//               onClick={() => setIsLoginModalOpen(true)}
//               className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
//             >
//               <LogIn className="w-4 h-4" />
//               Connexion
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
//         {/* Navigation jours */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={goToPreviousDay}
//               className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
//             >
//               <ChevronLeft className="w-5 h-5" />
//               <span className="hidden sm:inline">Précédent</span>
//             </button>
            
//             <div className="text-center">
//               <div className="flex items-center justify-center gap-2 text-gray-700">
//                 <Calendar className="w-5 h-5 text-blue-500" />
//                 <span className="text-lg font-semibold">
//                   {format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })}
//                 </span>
//               </div>
//               {isToday && (
//                 <span className="inline-block mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
//                   Aujourd'hui
//                 </span>
//               )}
//             </div>
            
//             <button
//               onClick={goToNextDay}
//               className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
//             >
//               <span className="hidden sm:inline">Suivant</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Info visiteurs */}
//         <div className="mb-6">
//           <p className="text-gray-600">
//             <span className="font-semibold text-blue-600">{visites.length}</span> visite{visites.length !== 1 ? 's' : ''} pour cette journée
//           </p>
//         </div>

//         {/* Tableau des visites */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-100">
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">HEURE</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">VISITEUR</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">EMAIL</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">TYPE</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">STATUT</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
//                       <div className="flex flex-col items-center gap-2">
//                         <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//                         <span>Chargement des visites...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : error ? (
//                   <tr>
//                     <td colSpan={5} className="px-4 py-12 text-center text-red-400">
//                       {error}
//                     </td>
//                   </tr>
//                 ) : visites.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
//                       <div className="flex flex-col items-center gap-2">
//                         <Calendar className="w-12 h-12 text-gray-300" />
//                         <span>Aucune visite programmée pour cette journée</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   visites.map((visite) => (
//                     <tr key={visite.id} className="hover:bg-gray-50 transition-colors duration-150">
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="font-medium text-gray-700">{visite.heure}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <User className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-700">{visite.nom_visiteur}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <Mail className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-500 text-sm">{visite.email || visite.telephone}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
//                           Visiteur
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         {getStatusBadge(visite.statut)}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Footer info */}
//         <div className="mt-6 text-center text-xs text-gray-400">
//           Les visites sont présentées selon l'ordre de programmation
//         </div>
//       </main>

//       {/* Modal de connexion */}
//       {isLoginModalOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           {/* Overlay */}
//           <div 
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
//             onClick={() => setIsLoginModalOpen(false)}
//           />
          
//           {/* Modal */}
//           <div className="flex min-h-full items-center justify-center p-4">
//             <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
//               {/* Bouton fermer */}
//               <button
//                 onClick={() => setIsLoginModalOpen(false)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="p-6 sm:p-8">
//                 {/* Logo */}
//                 <div className="text-center mb-6">
//                   <div className="inline-flex items-center justify-center w mb-3">
//                     <img src='./logo.png' className='w-16 ' alt='Logo' />
//                   </div>
//                   <h2 className="text-xl font-bold text-gray-800">Connexion</h2>
//                   <p className="text-gray-500 text-sm mt-1">Accédez à votre espace privé</p>
//                 </div>

//                 {/* Error message */}
//                 {loginError && (
//                   <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
//                     {loginError}
//                   </div>
//                 )}

//                 {/* Login method toggle */}
//                 <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
//                   <button
//                     type="button"
//                     onClick={() => setLoginMethod('email')}
//                     className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       loginMethod === 'email'
//                         ? 'bg-white text-blue-600 shadow-sm'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <Mail className="w-4 h-4" />
//                     Email
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setLoginMethod('phone')}
//                     className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       loginMethod === 'phone'
//                         ? 'bg-white text-blue-600 shadow-sm'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <Phone className="w-4 h-4" />
//                     Téléphone
//                   </button>
//                 </div>

//                 <form onSubmit={handleLogin} className="space-y-4">
//                   {/* Email/Phone field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {loginMethod === 'email' ? 'Adresse email' : 'Numéro de téléphone'}
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {loginMethod === 'email' ? (
//                           <Mail className="h-5 w-5 text-gray-400" />
//                         ) : (
//                           <Phone className="h-5 w-5 text-gray-400" />
//                         )}
//                       </div>
//                       <input
//                         type={loginMethod === 'email' ? 'email' : 'tel'}
//                         value={loginMethod === 'email' ? loginForm.email : loginForm.numero}
//                         onChange={(e) => setLoginForm({
//                           ...loginForm,
//                           [loginMethod === 'email' ? 'email' : 'numero']: e.target.value
//                         })}
//                         placeholder={loginMethod === 'email' ? 'secretaire@example.com' : '06 12 34 56 78'}
//                         className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Password field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Mot de passe
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="password"
//                         value={loginForm.mot_de_passe}
//                         onChange={(e) => setLoginForm({ ...loginForm, mot_de_passe: e.target.value })}
//                         placeholder="••••••••"
//                         className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Submit button */}
//                   <button
//                     type="submit"
//                     disabled={isLoggingIn}
//                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
//                   >
//                     {isLoggingIn ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Connexion en cours...
//                       </>
//                     ) : (
//                       <>
//                         <LogIn className="w-4 h-4" />
//                         Se connecter
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 {/* Demo credentials */}
//                 <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
//                   <p className="text-xs text-gray-500 text-center mb-1">Compte de démonstration</p>
//                   <div className="text-center text-xs text-gray-600">
//                     <p>Email: <span className="font-mono text-blue-600">sec@gmail.com</span></p>
//                     <p>Mot de passe: <span className="font-mono text-blue-600">123456</span></p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// app/page.tsx - Page d'accueil avec modal de connexion
'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Calendar, ChevronLeft, ChevronRight, Clock, User, Mail, CheckCircle, XCircle, ClockIcon, LogIn, X, Phone, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Visite {
  id: number
  heure: string
  nom_visiteur: string
  email?: string
  telephone: string
  type?: string
  statut: string
  motif: string
}

export default function HomePage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [visites, setVisites] = useState<Visite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginForm, setLoginForm] = useState({
    email: '',
    numero: '',
    mot_de_passe: ''
  })

  // Vérifier si l'utilisateur est déjà connecté au chargement de la page
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        
        if (data.success && data.user) {
          // Utilisateur déjà connecté, rediriger selon son rôle
          const role = data.user.role?.nom?.toLowerCase()
          
          if (role === 'pasteur') {
            router.push('/pasteur/visites')
          } else if (role === 'admin') {
            router.push('/visites')
          } else if (role === 'secretaire') {
            router.push('/visites')
          } else {
            router.push('/visites')
          }
        }
      } catch (error) {
        // Non connecté, rien à faire
        console.log('Non connecté')
      }
    }
    
    checkAuth()
  }, [router])

  const fetchVisites = async (date: Date) => {
    setLoading(true)
    setError(null)
    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const response = await fetch(`/api/visites/public?date=${formattedDate}`)
      const data = await response.json()
      
      if (data.success) {
        setVisites(data.data || [])
      } else {
        setError(data.error || 'Erreur de chargement')
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVisites(currentDate)
  }, [currentDate])

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError(null)

    const form = new FormData()
    if (loginMethod === 'email') {
      form.append('email', loginForm.email)
    } else {
      form.append('numero', loginForm.numero)
    }
    form.append('mot_de_passe', loginForm.mot_de_passe)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: form
      })

      const data = await response.json()

      if (data.success) {
        setIsLoginModalOpen(false)
        // Rediriger vers le chemin fourni par l'API
        router.push(data.redirectTo || '/visites')
        router.refresh()
      } else {
        setLoginError(data.error || 'Erreur de connexion')
      }
    } catch (err) {
      setLoginError('Erreur de connexion au serveur')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'Reçue':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700"><CheckCircle className="w-3 h-3" /> Reçue</span>
      case 'Annulée':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-100 text-red-700"><XCircle className="w-3 h-3" /> Annulée</span>
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700"><ClockIcon className="w-3 h-3" /> En attente</span>
    }
  }

  const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Visites pastorales
              </h1>
              <p className="text-gray-500 text-sm mt-1">Gestion des visites et rendez-vous</p>
            </div>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogIn className="w-4 h-4" />
              Connexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Navigation jours */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousDay}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Précédent</span>
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-semibold">
                  {format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })}
                </span>
              </div>
              {isToday && (
                <span className="inline-block mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Aujourd'hui
                </span>
              )}
            </div>
            
            <button
              onClick={goToNextDay}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info visiteurs */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-blue-600">{visites.length}</span> visite{visites.length !== 1 ? 's' : ''} pour cette journée
          </p>
        </div>

        {/* Tableau des visites */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">HEURE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">VISITEUR</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">EMAIL</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">TYPE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">STATUT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span>Chargement des visites...</span>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-red-400">
                      {error}
                    </td>
                  </tr>
                ) : visites.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <Calendar className="w-12 h-12 text-gray-300" />
                        <span>Aucune visite programmée pour cette journée</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  visites.map((visite) => (
                    <tr key={visite.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-700">{visite.heure}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{visite.nom_visiteur}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500 text-sm">{visite.email || visite.telephone}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                          Visiteur
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(visite.statut)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Les visites sont présentées selon l'ordre de programmation
        </div>
      </main>

      {/* Modal de connexion */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsLoginModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
              {/* Bouton fermer */}
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8">
                {/* Logo */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w mb-3">
                    <img src='/logo.png' className='w-16' alt='Logo' />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Connexion</h2>
                  <p className="text-gray-500 text-sm mt-1">Accédez à votre espace privé</p>
                </div>

                {/* Error message */}
                {loginError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                    {loginError}
                  </div>
                )}

                {/* Login method toggle */}
                <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      loginMethod === 'email'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('phone')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      loginMethod === 'phone'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Téléphone
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email/Phone field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {loginMethod === 'email' ? 'Adresse email' : 'Numéro de téléphone'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {loginMethod === 'email' ? (
                          <Mail className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Phone className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <input
                        type={loginMethod === 'email' ? 'email' : 'tel'}
                        value={loginMethod === 'email' ? loginForm.email : loginForm.numero}
                        onChange={(e) => setLoginForm({
                          ...loginForm,
                          [loginMethod === 'email' ? 'email' : 'numero']: e.target.value
                        })}
                        placeholder={loginMethod === 'email' ? 'secretaire@example.com' : '06 12 34 56 78'}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={loginForm.mot_de_passe}
                        onChange={(e) => setLoginForm({ ...loginForm, mot_de_passe: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoggingIn ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connexion en cours...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        Se connecter
                      </>
                    )}
                  </button>
                </form>

                {/* Demo credentials */}
                <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 text-center mb-1">Compte de démonstration</p>
                  <div className="text-center text-xs text-gray-600">
                    <p>Email: <span className="font-mono text-blue-600">sec@gmail.com</span></p>
                    <p>Mot de passe: <span className="font-mono text-blue-600">123456</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}