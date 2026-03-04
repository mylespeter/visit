// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { createVisite } from '@/actions/visites'
// import { getMembres } from '@/actions/membres'
// import toast from 'react-hot-toast'

// interface NouvelleVisiteProps {
//   config: Record<string, string> | null
// }

// export default function NouvelleVisite({ config }: NouvelleVisiteProps) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [estMembre, setEstMembre] = useState(false)
//   const [membres, setMembres] = useState<any[]>([])
//   const [motif, setMotif] = useState('Conseil')
//   const [date, setDate] = useState('')
//   const [quotaInfo, setQuotaInfo] = useState<{ used: number; total: number } | null>(null)

//   useEffect(() => {
//     // Charger la liste des membres
//     const loadMembres = async () => {
//       const result = await getMembres()
//       if (result.success && result.data) {
//         setMembres(result.data)
//       }
//     }
//     loadMembres()

//     // Définir la date par défaut au prochain mardi/mercredi
//     const today = new Date()
//     const day = today.getDay()
//     let nextDate = new Date(today)
    
//     if (day < 2) { // Avant mardi
//       nextDate.setDate(today.getDate() + (2 - day))
//     } else if (day > 3) { // Après mercredi
//       nextDate.setDate(today.getDate() + (9 - day))
//     } else {
//       nextDate = today
//     }
    
//     setDate(nextDate.toISOString().split('T')[0])
//   }, [])

//   const handleSubmit = async (formData: FormData) => {
//     setIsLoading(true)
//     const result = await createVisite(formData)
    
//     if (result.error) {
//       toast.error(result.error)
//     } else {
//       toast.success('Rendez-vous enregistré')
//       router.refresh()
//     }
//     setIsLoading(false)
//   }

//   const motifs = ['Conseil', 'Prière', 'Orientation', 'Autre']

//   return (
//     <div className="bg-white rounded-lg border border-gray-100 p-6">
//       <h2 className="text-sm font-medium text-gray-900 mb-4">
//         Nouveau rendez-vous
//       </h2>

//       <form action={handleSubmit} className="space-y-4">
//         {/* Est-ce un membre ? */}
//         <div className="flex gap-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="est_membre"
//               value="false"
//               checked={!estMembre}
//               onChange={() => setEstMembre(false)}
//               className="text-gray-600 focus:ring-gray-500"
//             />
//             <span className="text-sm text-gray-600">Visiteur</span>
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="est_membre"
//               value="true"
//               checked={estMembre}
//               onChange={() => setEstMembre(true)}
//               className="text-gray-600 focus:ring-gray-500"
//             />
//             <span className="text-sm text-gray-600">Membre</span>
//           </label>
//         </div>

//         {estMembre ? (
//           // Sélection membre
//           <div>
//             <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//               Sélectionner un membre
//             </label>
//             <select
//               name="membre_id"
//               required
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//             >
//               <option value="">Choisir...</option>
//               {membres.map(m => (
//                 <option key={m.id} value={m.id}>
//                   {m.nom_complet} - {m.numero}
//                 </option>
//               ))}
//             </select>
//           </div>
//         ) : (
//           // Formulaire visiteur
//           <>
//             <div>
//               <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//                 Nom complet
//               </label>
//               <input
//                 type="text"
//                 name="nom_visiteur"
//                 required
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//                 Téléphone
//               </label>
//               <input
//                 type="tel"
//                 name="telephone"
//                 required
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//                 Sexe
//               </label>
//               <select
//                 name="sexe"
//                 required
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//               >
//                 <option value="">Choisir...</option>
//                 <option value="Homme">Homme</option>
//                 <option value="Femme">Femme</option>
//               </select>
//             </div>
//           </>
//         )}

//         {/* Motif */}
//         <div>
//           <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//             Motif
//           </label>
//           <select
//             name="motif"
//             value={motif}
//             onChange={(e) => setMotif(e.target.value)}
//             required
//             className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//           >
//             {motifs.map(m => (
//               <option key={m} value={m}>{m}</option>
//             ))}
//           </select>
//         </div>

//         {motif === 'Autre' && (
//           <div>
//             <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//               Précisez
//             </label>
//             <input
//               type="text"
//               name="autre_motif"
//               required
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//             />
//           </div>
//         )}

//         {/* Date et Heure */}
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//               Date
//             </label>
//             <input
//               type="date"
//               name="date_visite"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Mardi ou Mercredi uniquement
//             </p>
//           </div>

//           <div>
//             <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//               Heure
//             </label>
//             <input
//               type="time"
//               name="heure"
//               min={config?.heures_ouverture || '08:00'}
//               max={config?.heures_fermeture || '16:00'}
//               required
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//             />
//           </div>
//         </div>

//         {/* Observations */}
//         <div>
//           <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
//             Observations
//           </label>
//           <textarea
//             name="observations"
//             rows={3}
//             className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
//         >
//           {isLoading ? 'Enregistrement...' : 'Enregistrer'}
//         </button>
//       </form>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createVisite } from '@/actions/visites'
import { getMembres } from '@/actions/membres'
import toast from 'react-hot-toast'
import RechercheMembre from './RechercheMembre'
import CreneauxDisponibles from './CreneauxDisponibles'
import Image from 'next/image'

interface NouvelleVisiteProps {
  config: Record<string, string> | null
}

export default function NouvelleVisite({ config }: NouvelleVisiteProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [estMembre, setEstMembre] = useState(false)
  const [membreSelectionne, setMembreSelectionne] = useState<any>(null)
  const [motif, setMotif] = useState('Conseil')
  const [datesDisponibles, setDatesDisponibles] = useState<string[]>([])
  const [dateSelectionnee, setDateSelectionnee] = useState('')
  const [heureSelectionnee, setHeureSelectionnee] = useState('')

  useEffect(() => {
    // Générer les prochains mardis et mercredis (4 semaines)
    const dates: string[] = []
    const today = new Date()
    
    for (let i = 0; i < 28; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const day = date.getDay()
      
      if (day === 2 || day === 3) { // Mardi ou Mercredi
        dates.push(date.toISOString().split('T')[0])
      }
    }
    
    setDatesDisponibles(dates)
    if (dates.length > 0) {
      setDateSelectionnee(dates[0])
    }
  }, [])

  const handleSelectMembre = (membre: any) => {
    setMembreSelectionne(membre)
    setEstMembre(true)
  }

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    
    // Ajouter les données du membre si sélectionné
    if (membreSelectionne) {
      formData.set('membre_id', membreSelectionne.id.toString())
      formData.set('nom_visiteur', membreSelectionne.nom_complet)
      formData.set('telephone', membreSelectionne.numero)
      formData.set('sexe', membreSelectionne.sexe)
    }

    const result = await createVisite(formData)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Rendez-vous enregistré')
      // Réinitialiser le formulaire
      setMembreSelectionne(null)
      setEstMembre(false)
      setMotif('Conseil')
      router.refresh()
    }
    setIsLoading(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
    

      <form action={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-2 gap-3">

          <div className='space-y-4'>

{/* Option Visiteur/Membre */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="est_membre"
              value="false"
              checked={!estMembre}
              onChange={() => {
                setEstMembre(false)
                setMembreSelectionne(null)
              }}
              className="text-gray-600 focus:ring-gray-500"
            />
            <span className="text-sm text-gray-600">Visiteur</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="est_membre"
              value="true"
              checked={estMembre}
              onChange={() => setEstMembre(true)}
              className="text-gray-600 focus:ring-gray-500"
            />
            <span className="text-sm text-gray-600">Membre</span>
          </label>
        </div>

        {estMembre ? (
          <>
            {/* Recherche de membre */}
            <RechercheMembre onSelect={handleSelectMembre} />

            {/* Membre sélectionné */}
            {membreSelectionne && (
              <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                <div className="flex-shrink-0">
                  {membreSelectionne.membre_profile ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={membreSelectionne.membre_profile}
                        alt={membreSelectionne.nom_complet}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-500">
                      {getInitials(membreSelectionne.nom_complet)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {membreSelectionne.nom_complet}
                  </div>
                  <div className="text-xs text-gray-400">
                    {membreSelectionne.numero} • {membreSelectionne.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMembreSelectionne(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Champs cachés pour les infos du membre */}
            {membreSelectionne && (
              <>
                <input type="hidden" name="nom_visiteur" value={membreSelectionne.nom_complet} />
                <input type="hidden" name="telephone" value={membreSelectionne.numero} />
                <input type="hidden" name="sexe" value={membreSelectionne.sexe} />
              </>
            )}
          </>
        ) : (
          // Formulaire visiteur
          <>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                Nom complet
              </label>
              <input
                type="text"
                name="nom_visiteur"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
              />
            </div>
<div className='grid  grid-cols-2 gap-1'>


            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                Sexe
              </label>
              <select
                name="sexe"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
              >
                <option value="">Choisir...</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
</div>
          </>
        )}

        {/* Motif */}
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
            Motif
          </label>
          <select
            name="motif"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
          >
            <option value="Conseil">Conseil</option>
            <option value="Prière">Prière</option>
            <option value="Orientation">Orientation</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {motif === 'Autre' && (
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
              Précisez
            </label>
            <input
              type="text"
              name="autre_motif"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
            />
          </div>

        )}
          {/* Observations */}
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
            Observations
          </label>
          <textarea
            name="observations"
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
          />
        </div>

          </div>

          <div className='space-y-4'>
    <button
          type="submit"
          disabled={isLoading || (estMembre && !membreSelectionne) || !heureSelectionnee}
          className="w-full px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
  {/* Sélection de date */}
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
            Date du rendez-vous
          </label>
          <select
            name="date_visite"
            value={dateSelectionnee}
            onChange={(e) => setDateSelectionnee(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
          >
            {datesDisponibles.map((date) => {
              const d = new Date(date)
              const jour = d.toLocaleDateString('fr-FR', { weekday: 'long' })
              const dateStr = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
              return (
                <option key={date} value={date}>
                  {jour} {dateStr}
                </option>
              )
            })}
          </select>
        </div>

        {/* Créneaux disponibles */}
        <CreneauxDisponibles 
          date={dateSelectionnee}
          onSelect={setHeureSelectionnee}
          selectedHeure={heureSelectionnee}
        />

      
          </div>
        </div>
        
      

    
      </form>
    </div>
  )
}