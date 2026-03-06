
'use client'

import { useState } from 'react'
import { Calendar, History, Lock, User, Phone, Calendar as CalendarIcon, FileText, ChevronRight } from 'lucide-react'
import NotesPrivees from './NotesPrivees'
import type { Visite, NotePrivee } from './page'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Props {
  config: Record<string, string>
  visitesPlanifiees: Visite[]
  historiqueVisites: Visite[]
  notesPrivees: NotePrivee[]
  pasteurId: number
}

export default function PasteurVisitesTabs({ 
  config, 
  visitesPlanifiees, 
  historiqueVisites,
  notesPrivees,
  pasteurId
}: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('planning')
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const statuts = ['En attente', 'Confirmée', 'Reçue', 'Reportée', 'Annulée']
  
  const statutColors = {
    'En attente': 'bg-yellow-100 text-yellow-800',
    'Confirmée': 'bg-blue-100 text-blue-800',
    'Reçue': 'bg-green-100 text-green-800',
    'Reportée': 'bg-orange-100 text-orange-800',
    'Annulée': 'bg-red-100 text-red-800'
  }

  const statutIcons = {
    'En attente': '⏳',
    'Confirmée': '✓',
    'Reçue': '✓✓',
    'Reportée': '↻',
    'Annulée': '✕'
  }

  // Grouper les visites par date
  const groupVisitesByDate = (visites: Visite[]) => {
    const grouped: { [key: string]: Visite[] } = {}
    visites.forEach(visite => {
      if (!grouped[visite.date_visite]) {
        grouped[visite.date_visite] = []
      }
      grouped[visite.date_visite].push(visite)
    })
    return grouped
  }

  const visitesParDate = groupVisitesByDate(visitesPlanifiees)
  const datesPlanifiees = Object.keys(visitesParDate).sort()

  const tabs = [
    { id: 'planning', label: 'Planning', icon: Calendar },
    { id: 'historique', label: 'Historique', icon: History },
    { id: 'notes', label: 'Notes privées', icon: Lock },
  ]

  // Calculer les statistiques des statuts pour le planning
  const getStatutCounts = (visites: Visite[]) => {
    const counts: { [key: string]: number } = {}
    statuts.forEach(statut => {
      counts[statut] = visites.filter(v => v.statut === statut).length
    })
    return counts
  }

  return (
    <div>
      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.id === 'notes' && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {notesPrivees.length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="py-6">
        {activeTab === 'planning' && (
          <div className="space-y-6">
            {datesPlanifiees.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune visite planifiée</h3>
                <p className="text-gray-500">Les prochains rendez-vous apparaîtront ici</p>
              </div>
            ) : (
              datesPlanifiees.map(date => {
                const visites = visitesParDate[date]
                const dateObj = new Date(date)
                const isMardi = dateObj.getDay() === 2
                const isMercredi = dateObj.getDay() === 3
                const statutCounts = getStatutCounts(visites)
                
                return (
                  <div key={date} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    {/* En-tête de date - style VisitesList */}
                    <div className={`
                      p-4 border-b border-gray-200 flex justify-between items-center
                      ${isMardi ? 'bg-blue-50' : isMercredi ? 'bg-green-50' : 'bg-gray-50'}
                    `}>
                      <div>
                        <h2 className="text-sm font-semibold text-gray-700">
                          {dateObj.toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                          {visites.length} rendez-vous planifié(s)
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {isMardi && (
                          <span className="text-xs font-medium bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                            Mardi
                          </span>
                        )}
                        {isMercredi && (
                          <span className="text-xs font-medium bg-green-200 text-green-800 px-2 py-1 rounded-full">
                            Mercredi
                          </span>
                        )}
                        <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
                          {visites.length} visite{visites.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Tableau des visites - style VisitesList exactement comme l'original */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                          <tr>
                            <th className="px-4 py-3 text-left">Heure</th>
                            <th className="px-4 py-3 text-left">Visiteur</th>
                            <th className="px-4 py-3 text-left">Téléphone</th>
                            <th className="px-4 py-3 text-left">Motif</th>
                            <th className="px-4 py-3 text-left">Statut</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {visites.map((visite) => (
                            <tr key={visite.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium text-gray-900">
                                {visite.heure}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  {/* Avatar avec photo ou initiales - EXACTEMENT comme l'original */}
                                  <div className="flex-shrink-0">
                                    {visite.membre?.membre_profile ? (
                                      <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
                                        <Image
                                          src={visite.membre.membre_profile}
                                          alt={visite.membre.nom_complet || visite.nom_visiteur}
                                          width={32}
                                          height={32}
                                          className="object-cover w-full h-full"
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 ring-2 ring-gray-100">
                                        {getInitials(visite.nom_visiteur)}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      {visite.nom_visiteur}
                                    </span>
                                    {visite.est_membre && visite.membre && (
                                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                        Membre
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-600">
                                {visite.telephone}
                              </td>
                              <td className="px-4 py-3 text-gray-600">
                                {visite.motif === 'Autre' ? visite.autre_motif : visite.motif}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`
                                  inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                                  ${statutColors[visite.statut as keyof typeof statutColors]}
                                `}>
                                  <span>{statutIcons[visite.statut as keyof typeof statutIcons]}</span>
                                  <span>{visite.statut}</span>
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <button className="text-xs text-gray-400 hover:text-indigo-600 font-medium flex items-center gap-1">
                                  Détails
                                  <ChevronRight className="h-3 w-3" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Résumé des statuts pour cette journée */}
                    {visites.length > 0 && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="grid grid-cols-5 gap-2 text-center text-xs">
                          {statuts.map(statut => {
                            const count = statutCounts[statut] || 0
                            return (
                              <div key={statut} className="space-y-1">
                                <div className={`text-sm font-bold ${
                                  statut === 'En attente' ? 'text-yellow-600' :
                                  statut === 'Confirmée' ? 'text-blue-600' :
                                  statut === 'Reçue' ? 'text-green-600' :
                                  statut === 'Reportée' ? 'text-orange-600' :
                                  'text-red-600'
                                }`}>
                                  {count}
                                </div>
                                <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                                  <span>{statutIcons[statut as keyof typeof statutIcons]}</span>
                                  <span>{statut}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}

        {activeTab === 'historique' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* En-tête de l'historique */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <History className="h-4 w-4" />
                Historique des visites
              </h2>
              <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
                {historiqueVisites.length} visite{historiqueVisites.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Tableau de l'historique */}
            {historiqueVisites.length === 0 ? (
              <div className="text-center py-12">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900 mb-2">Historique vide</h3>
                <p className="text-xs text-gray-500">Les anciennes visites apparaîtront ici</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Heure</th>
                      <th className="px-4 py-3 text-left">Visiteur</th>
                      <th className="px-4 py-3 text-left">Téléphone</th>
                      <th className="px-4 py-3 text-left">Motif</th>
                      <th className="px-4 py-3 text-left">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {historiqueVisites.map((visite) => {
                      const dateObj = new Date(visite.date_visite)
                      return (
                        <tr key={visite.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-600">
                            {dateObj.toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {visite.heure}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {/* Avatar avec photo ou initiales - EXACTEMENT comme l'original */}
                              <div className="flex-shrink-0">
                                {visite.membre?.membre_profile ? (
                                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
                                    <Image
                                      src={visite.membre.membre_profile}
                                      alt={visite.membre.nom_complet || visite.nom_visiteur}
                                      width={32}
                                      height={32}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 ring-2 ring-gray-100">
                                    {getInitials(visite.nom_visiteur)}
                                  </div>
                                )}
                              </div>
                              <div>
                                <span className="font-medium text-gray-900">
                                  {visite.nom_visiteur}
                                </span>
                                {visite.est_membre && visite.membre && (
                                  <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                    Membre
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {visite.telephone}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {visite.motif === 'Autre' ? visite.autre_motif : visite.motif}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`
                              inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                              ${statutColors[visite.statut as keyof typeof statutColors]}
                            `}>
                              <span>{statutIcons[visite.statut as keyof typeof statutIcons]}</span>
                              <span>{visite.statut}</span>
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Résumé des statuts pour l'historique */}
            {historiqueVisites.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  {statuts.map(statut => {
                    const count = historiqueVisites.filter(v => v.statut === statut).length
                    return (
                      <div key={statut} className="space-y-1">
                        <div className={`text-sm font-bold ${
                          statut === 'En attente' ? 'text-yellow-600' :
                          statut === 'Confirmée' ? 'text-blue-600' :
                          statut === 'Reçue' ? 'text-green-600' :
                          statut === 'Reportée' ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {count}
                        </div>
                        <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                          <span>{statutIcons[statut as keyof typeof statutIcons]}</span>
                          <span>{statut}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <NotesPrivees 
            notes={notesPrivees} 
            pasteurId={pasteurId}
            visites={[...visitesPlanifiees, ...historiqueVisites]}
          />
        )}
      </div>
    </div>
  )
}