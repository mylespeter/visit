
// 'use client'

// import { Users, FileText, Search, Mail, MapPin, Download, Eye, Briefcase } from 'lucide-react'
// import { useSupabase } from '@/providers/supabase-provider'
// import { useState, useEffect } from 'react'

// interface DashboardEmployerProps {
//   profile: {
//     id: string
//     email: string
//     role: 'employer'
//     full_name: string
//     company_name?: string
//   }
// }

// interface SeekerProfile {
//   id: string
//   full_name: string
//   email: string
//   avatar_url: string | null
//   headline: string | null
//   location: string | null
//   experience_years: number | null
//   skills: string[] | null
//   cv_url: string | null
//   cv_name: string | null
//   sectors: string[] | null
//   created_at: string
// }

// export default function DashboardEmployer({ profile }: DashboardEmployerProps) {
//   const { supabase, signOut } = useSupabase()
//   const [seekers, setSeekers] = useState<SeekerProfile[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedSeeker, setSelectedSeeker] = useState<SeekerProfile | null>(null)
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     fetchSeekers()
//   }, [])

//   const fetchSeekers = async () => {
//     try {
//       const { data: profiles, error: profilesError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('role', 'seeker')
//         .order('created_at', { ascending: false })

//       if (profilesError) throw profilesError
      
//       const seekersData = await Promise.all(
//         (profiles || []).map(async (profile) => {
//           const { data: seekerData } = await supabase
//             .from('seekers')
//             .select('*')
//             .eq('profile_id', profile.id)
//             .single()

//           return {
//             id: profile.id,
//             full_name: profile.full_name || '',
//             email: profile.email,
//             avatar_url: profile.avatar_url,
//             headline: seekerData?.headline || null,
//             location: seekerData?.location || null,
//             experience_years: seekerData?.experience_years || null,
//             skills: seekerData?.skills || null,
//             cv_url: seekerData?.cv_url || null,
//             cv_name: seekerData?.cv_name || null,
//             sectors: seekerData?.sectors || null,
//             created_at: profile.created_at
//           }
//         })
//       )
      
//       setSeekers(seekersData)
//     } catch (error) {
//       console.error('Error fetching seekers:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getAvatarUrl = (avatarUrl: string | null) => {
//     if (!avatarUrl) return null
    
//     try {
//       if (avatarUrl.includes('supabase.co')) {
//         return avatarUrl
//       }
      
//       const { data } = supabase.storage.from('avatars').getPublicUrl(avatarUrl)
//       return data.publicUrl
//     } catch (error) {
//       console.error('Error getting avatar URL:', error)
//       return null
//     }
//   }

//   const downloadCV = async (seeker: SeekerProfile) => {
//     if (!seeker.cv_url) {
//       alert('CV non disponible')
//       return
//     }

//     try {
//       let cvPath = seeker.cv_url
      
//       if (cvPath.includes('supabase.co/storage/v1/object/public/cvs/')) {
//         cvPath = cvPath.split('supabase.co/storage/v1/object/public/cvs/')[1]
//       }
      
//       const { data: { publicUrl } } = supabase.storage
//         .from('cvs')
//         .getPublicUrl(cvPath)

//       const response = await fetch(publicUrl)
//       if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)
      
//       const blob = await response.blob()
//       const url = window.URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = seeker.cv_name || `CV_${seeker.full_name.replace(/\s+/g, '_')}.pdf`
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//       document.body.removeChild(a)
//     } catch (error) {
//       console.error('Error downloading CV:', error)
//       alert('Erreur lors du téléchargement du CV')
//     }
//   }

//   const stats = [
//     { 
//       label: 'Candidats', 
//       value: seekers.length, 
//       icon: Users,
//       color: 'text-blue-600 bg-blue-50'
//     },
//     { 
//       label: 'CV disponibles', 
//       value: seekers.filter(s => s.cv_url && s.cv_url.trim() !== '').length, 
//       icon: FileText,
//       color: 'text-green-600 bg-green-50'
//     },
//   ]

//   const filteredSeekers = seekers.filter(seeker =>
//     searchTerm === '' ||
//     seeker.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     seeker.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     seeker.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 ">
//       <div className="max-w-7xl mx-auto space-y-4">
      

//         {/* STATS COMPACT */}
//         <div className="grid grid-cols-3 gap-3">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-lg border p-3">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-lg font-bold text-gray-900">{stat.value}</p>
//                   <p className="text-xs text-gray-500">{stat.label}</p>
//                 </div>
//                 <div className={`p-1.5 rounded-full ${stat.color}`}>
//                   <stat.icon className="w-4 h-4" />
//                 </div>
//               </div>
//             </div>
//           ))}
//             {/* HEADER MINIMAL */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-lg font-semibold text-gray-900">
//               {profile.company_name || 'Votre entreprise'}
//             </h1>
//             <p className="text-sm text-gray-500">Tableau de bord recruteur</p>
//           </div>
//           <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm">
//             <Briefcase className="w-3.5 h-3.5" />
//             Nouvelle offre
//           </button>
//         </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-4">
//           {/* MAIN CONTENT */}
//           <div className="lg:col-span-2 space-y-4">
//             {/* SEARCH BAR */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Rechercher un candidat..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm bg-white"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* SEEKERS LIST */}
//             <div className="bg-white rounded-lg border">
//               <div className="px-4 py-3 border-b">
//                 <h2 className="font-medium text-gray-900 text-sm">
//                   Candidats ({filteredSeekers.length})
//                 </h2>
//               </div>
              
//               {loading ? (
//                 <div className="p-6 text-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mx-auto"></div>
//                   <p className="mt-2 text-xs text-gray-500">Chargement...</p>
//                 </div>
//               ) : filteredSeekers.length === 0 ? (
//                 <div className="p-6 text-center">
//                   <Users className="w-6 h-6 text-gray-300 mx-auto mb-1" />
//                   <p className="text-sm text-gray-500">Aucun candidat trouvé</p>
//                 </div>
//               ) : (
//                 <div className="divide-y">
//                   {filteredSeekers.map((seeker) => {
//                     const avatarUrl = getAvatarUrl(seeker.avatar_url)
//                     const hasCV = seeker.cv_url && seeker.cv_url.trim() !== ''
                    
//                     return (
//                       <div key={seeker.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
//                         <div className="flex items-start justify-between gap-2">
//                           <div className="flex gap-3 min-w-0">
//                             {/* AVATAR */}
//                             <div className="flex-shrink-0">
//                               {avatarUrl ? (
//                                 <img
//                                   src={avatarUrl}
//                                   alt={seeker.full_name}
//                                   className="w-8 h-8 rounded-full object-cover border"
//                                   onError={(e) => {
//                                     const target = e.target as HTMLImageElement
//                                     target.style.display = 'none'
//                                     const parent = target.parentElement
//                                     if (parent) {
//                                       parent.innerHTML = `
//                                         <div class="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center">
//                                           <span class="text-xs font-medium text-gray-600">
//                                             ${seeker.full_name.charAt(0)}
//                                           </span>
//                                         </div>
//                                       `
//                                     }
//                                   }}
//                                 />
//                               ) : (
//                                 <div className="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center">
//                                   <span className="text-xs font-medium text-gray-600">
//                                     {seeker.full_name.charAt(0)}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>

//                             {/* INFO */}
//                             <div className="min-w-0 flex-1">
//                               <div className="flex items-start justify-between mb-0.5">
//                                 <h3 className="font-medium text-gray-900 text-sm truncate">
//                                   {seeker.full_name}
//                                 </h3>
//                                 {hasCV && (
//                                   <span className="text-xs text-green-600 font-medium">CV</span>
//                                 )}
//                               </div>
                              
//                               <p className="text-xs text-gray-600 truncate mb-1">
//                                 {seeker.headline || 'Chercheur d\'emploi'}
//                               </p>
                              
//                               {/* COMPÉTENCES */}
//                               {seeker.skills && seeker.skills.length > 0 && (
//                                 <div className="flex items-center gap-1 mb-1">
//                                   {seeker.skills.slice(0, 2).map((skill, index) => (
//                                     <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-xs text-gray-600 rounded">
//                                       {skill}
//                                     </span>
//                                   ))}
//                                   {seeker.skills.length > 2 && (
//                                     <span className="text-xs text-gray-500">
//                                       +{seeker.skills.length - 2}
//                                     </span>
//                                   )}
//                                 </div>
//                               )}
                              
//                               <div className="flex items-center gap-2 text-xs text-gray-500">
//                                 {seeker.location && (
//                                   <span className="flex items-center gap-0.5">
//                                     <MapPin className="w-3 h-3" />
//                                     {seeker.location}
//                                   </span>
//                                 )}
//                                 {seeker.experience_years !== null && (
//                                   <span>
//                                     {seeker.experience_years} {seeker.experience_years === 1 ? 'an' : 'ans'}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </div>

//                           {/* ACTIONS */}
//                           <div className="flex items-center gap-0.5 flex-shrink-0">
//                             <button
//                               onClick={() => window.open(`mailto:${seeker.email}`)}
//                               className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//                               title="Contacter"
//                             >
//                               <Mail className="w-3.5 h-3.5" />
//                             </button>
//                             {hasCV && (
//                               <button
//                                 onClick={() => downloadCV(seeker)}
//                                 className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//                                 title="Télécharger CV"
//                               >
//                                 <Download className="w-3.5 h-3.5" />
//                               </button>
//                             )}
//                             <button
//                               onClick={() => setSelectedSeeker(seeker)}
//                               className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//                               title="Voir détails"
//                             >
//                               <Eye className="w-3.5 h-3.5" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* SIDEBAR */}
//           <div className="space-y-4">
//             {/* SELECTED SEEKER */}
//             {selectedSeeker && (
//               <div className="bg-white rounded-lg border">
//                 <div className="px-4 py-3 border-b flex items-center justify-between">
//                   <h3 className="font-medium text-gray-900 text-sm">Détails candidat</h3>
//                   <button
//                     onClick={() => setSelectedSeeker(null)}
//                     className="text-gray-400 hover:text-gray-600 p-0.5 rounded hover:bg-gray-100 text-lg"
//                   >
//                     ×
//                   </button>
//                 </div>
                
//                 <div className="p-4 space-y-4">
//                   <div className="flex items-center gap-3">
//                     {getAvatarUrl(selectedSeeker.avatar_url) ? (
//                       <img
//                         src={getAvatarUrl(selectedSeeker.avatar_url)!}
//                         alt={selectedSeeker.full_name}
//                         className="w-12 h-12 rounded-full object-cover border"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 rounded-full bg-gray-100 border flex items-center justify-center">
//                         <span className="text-sm font-medium text-gray-600">
//                           {selectedSeeker.full_name.charAt(0)}
//                         </span>
//                       </div>
//                     )}
//                     <div className="min-w-0">
//                       <h4 className="font-medium text-gray-900 text-sm truncate">{selectedSeeker.full_name}</h4>
//                       <p className="text-xs text-gray-600 truncate">{selectedSeeker.headline}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Localisation</span>
//                       <span className="text-gray-900">{selectedSeeker.location || '-'}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Expérience</span>
//                       <span className="text-gray-900">
//                         {selectedSeeker.experience_years || 0} ans
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Email</span>
//                       <span className="text-gray-900 truncate max-w-[120px]">{selectedSeeker.email}</span>
//                     </div>
                    
//                     {selectedSeeker.skills && selectedSeeker.skills.length > 0 && (
//                       <div className="pt-2">
//                         <span className="text-gray-500 block mb-1">Compétences</span>
//                         <div className="flex flex-wrap gap-1">
//                           {selectedSeeker.skills.slice(0, 4).map((skill, index) => (
//                             <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-xs text-gray-600 rounded">
//                               {skill}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="pt-3 border-t">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => window.open(`mailto:${selectedSeeker.email}`)}
//                         className="flex-1 px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-xs flex items-center justify-center gap-1"
//                       >
//                         <Mail className="w-3 h-3" />
//                         Contacter
//                       </button>
//                       {selectedSeeker.cv_url && selectedSeeker.cv_url.trim() !== '' && (
//                         <button
//                           onClick={() => downloadCV(selectedSeeker)}
//                           className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-xs flex items-center justify-center gap-1"
//                         >
//                           <Download className="w-3 h-3" />
//                           CV
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* PROFILE INFO */}
//             <div className="bg-white rounded-lg border p-4">
//               <div className="flex items-center gap-2 mb-3">
//                 <div className="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center">
//                   <span className="text-xs font-medium text-gray-600">
//                     {profile.full_name.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-900 text-sm">{profile.full_name}</h4>
//                   <p className="text-xs text-gray-500">Recruteur</p>
//                 </div>
//               </div>
              
//               <button
//                 onClick={() => signOut()}
//                 className="w-full text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 py-1.5 rounded transition-colors"
//               >
//                 Déconnexion
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { Users, FileText, Search, Mail, MapPin, Download, Eye, Briefcase, Calendar } from 'lucide-react'
import { useSupabase } from '@/providers/supabase-provider'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface DashboardEmployerProps {
  profile: {
    id: string
    email: string
    role: 'employer'
    full_name: string
    company_name?: string
  }
}

interface JobStats {
  total: number
  active: number
  applications: number
  pending: number
}

interface RecentApplication {
  id: string
  seeker_name: string
  job_title: string
  created_at: string
  status: string
}

export default function DashboardEmployer({ profile }: DashboardEmployerProps) {
  const router = useRouter()
  const { supabase, signOut } = useSupabase()
  const [jobStats, setJobStats] = useState<JobStats>({ total: 0, active: 0, applications: 0, pending: 0 })
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [seekerStats, setSeekerStats] = useState({ total: 0, withCV: 0 })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Récupérer l'employeur
      const { data: employer } = await supabase
        .from('employers')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (!employer) return

      // 1. Statistiques des jobs
      const { data: jobs, error: jobsError } = await supabase
        .from('job_offers')
        .select(`
          *,
          applications!left (
            id,
            status
          )
        `)
        .eq('employer_id', employer.id)

      if (!jobsError && jobs) {
        const total = jobs.length
        const active = jobs.filter(j => j.is_active).length
        const applications = jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0)
        const pending = jobs.reduce((acc, job) => 
          acc + (job.applications?.filter((app: any) => app.status === 'pending').length || 0), 0
        )
        
        setJobStats({ total, active, applications, pending })
      }

      // 2. Applications récentes
      const { data: recentApps } = await supabase
        .from('applications')
        .select(`
          id,
          created_at,
          status,
          job_offers!inner (
            title
          ),
          seekers!inner (
            profiles!inner (
              full_name
            )
          )
        `)
        .eq('job_offers.employer_id', employer.id)
        .order('created_at', { ascending: false })
        .limit(5)

      if (recentApps) {
        const formatted: RecentApplication[] = recentApps.map((app: any) => ({
          id: app.id,
          seeker_name: app.seekers?.profiles?.full_name || 'Candidat',
          job_title: app.job_offers?.title || 'Offre',
          created_at: app.created_at,
          status: app.status
        }))
        setRecentApplications(formatted)
      }

      // 3. Statistiques seekers (optionnel)
      const { data: seekers } = await supabase
        .from('seekers')
        .select('cv_url')
      
      if (seekers) {
        const total = seekers.length
        const withCV = seekers.filter(s => s.cv_url && s.cv_url.trim() !== '').length
        setSeekerStats({ total, withCV })
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24))
    
    if (diffDays === 0) return "Aujourd'hui"
    if (diffDays === 1) return 'Hier'
    if (diffDays < 7) return `Il y a ${diffDays} jours`
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  const stats = [
    { 
      label: 'Offres publiées', 
      value: jobStats.total, 
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-50',
      action: () => router.push('/employer/jobs')
    },
    { 
      label: 'Offres actives', 
      value: jobStats.active, 
      icon: FileText,
      color: 'text-green-600 bg-green-50'
    },
    { 
      label: 'Candidatures', 
      value: jobStats.applications, 
      icon: Users,
      color: 'text-purple-600 bg-purple-50',
      action: () => router.push('/employer/applications')
    },
    { 
      label: 'En attente', 
      value: jobStats.pending, 
      icon: Calendar,
      color: 'text-yellow-600 bg-yellow-50'
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-normal text-black mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            {profile.company_name || 'Votre entreprise'} • Recruteur
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.push('/employer/jobs/create')}
            className="px-4 py-2.5 bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm"
          >
            <Briefcase className="w-4 h-4" />
            Nouvelle offre
          </button>
          
          <button
            onClick={() => router.push('/employer/jobs')}
            className="px-4 py-2.5 border border-gray-300 hover:border-gray-400 transition-colors text-sm"
          >
            Gérer mes offres
          </button>
          
          <button
            onClick={() => router.push('/employer/applications')}
            className="px-4 py-2.5 border border-gray-300 hover:border-gray-400 transition-colors text-sm"
          >
            Voir les candidatures
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`border border-gray-300 p-5 ${stat.action ? 'cursor-pointer hover:border-gray-400 transition-colors' : ''}`}
              onClick={stat.action}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <div className={`p-2 rounded ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Candidatures récentes</h2>
            <button
              onClick={() => router.push('/employer/applications')}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Voir tout
            </button>
          </div>
          
          {recentApplications.length === 0 ? (
            <div className="border border-gray-300 p-6 text-center">
              <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">Aucune candidature récente</p>
            </div>
          ) : (
            <div className="border border-gray-300">
              {recentApplications.map((app) => (
                <div key={app.id} className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{app.seeker_name}</p>
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status === 'pending' ? 'En attente' : 
                           app.status === 'accepted' ? 'Acceptée' : app.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{app.job_title}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{formatDate(app.created_at)}</span>
                      <button
                        onClick={() => router.push(`/employer/jobs/${app.id}/applications`)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            className="border border-gray-300 p-5 hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => router.push('/employer/jobs')}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Mes offres</h3>
                <p className="text-sm text-gray-600">Gérer toutes vos offres</p>
              </div>
            </div>
          </div>
          
          <div 
            className="border border-gray-300 p-5 hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => router.push('/employer/applications')}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Toutes les candidatures</h3>
                <p className="text-sm text-gray-600">Voir et gérer les candidatures</p>
              </div>
            </div>
          </div>
          
          <div 
            className="border border-gray-300 p-5 hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => router.push('/employer/jobs/create')}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Créer une offre</h3>
                <p className="text-sm text-gray-600">Publier une nouvelle offre</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 border flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {profile.full_name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{profile.full_name}</h4>
                <p className="text-sm text-gray-600">{profile.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => signOut()}
              className="px-4 py-2 border border-gray-300 hover:border-gray-400 transition-colors text-sm"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}