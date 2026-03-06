
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { getVisitesParDate } from '@/actions/visites'
import Image from 'next/image'

interface Visite {
  id: string
  date_visite: string
  statut: string
  heure?: string
  nom_visiteur?: string
  telephone?: string
  motif?: string
  membre?: {
    id: string
    nom_complet: string
    membre_profile?: string
  }
}

interface CalendrierVisitesProps {
  visites: Visite[]
}

export default function CalendrierVisites({ visites }: CalendrierVisitesProps) {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [visitesDate, setVisitesDate] = useState<Visite[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Grouper les visites par date
  const visitesParDate = useMemo(() => {
    return visites.reduce((acc, visite) => {
      if (!acc[visite.date_visite]) {
        acc[visite.date_visite] = []
      }
      acc[visite.date_visite].push(visite)
      return acc
    }, {} as Record<string, Visite[]>)
  }, [visites])

  // Obtenir le mois et l'année
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  // Premier jour du mois (0 = Dimanche, 1 = Lundi, ...)
  const firstDay = new Date(year, month, 1)
  let startDay = firstDay.getDay()
  // Adapter pour que Lundi = 0, Dimanche = 6
  startDay = startDay === 0 ? 6 : startDay - 1

  // Nombre de jours dans le mois
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Créer le tableau des jours
  const days = []

  // Jours du mois précédent
  for (let i = 0; i < startDay; i++) {
    const day = new Date(year, month, -i).getDate()
    const date = new Date(Date.UTC(year, month - 1, day)).toISOString().split('T')[0]
    days.unshift({
      day,
      date,
      isCurrentMonth: false,
      isSelectable: false,
      visitesCount: 0
    })
  }

  // Jours du mois courant
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(Date.UTC(year, month, i)).toISOString().split('T')[0]
    const dayOfWeek = new Date(year, month, i).getDay()
    const isMardiMercredi = dayOfWeek === 2 || dayOfWeek === 3
    const visitesCount = visitesParDate[date]?.length || 0
    
    days.push({
      day: i,
      date,
      isCurrentMonth: true,
      isSelectable: isMardiMercredi,
      visitesCount
    })
  }

  // Compléter avec les jours du mois suivant
  const totalDays = days.length
  const nextMonthDays = 42 - totalDays
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(Date.UTC(year, month + 1, i)).toISOString().split('T')[0]
    days.push({
      day: i,
      date,
      isCurrentMonth: false,
      isSelectable: false,
      visitesCount: 0
    })
  }

  const handleDateClick = async (date: string) => {
    setSelectedDate(date)
    setIsLoading(true)
    const result = await getVisitesParDate(date)
    if (result.success) {
      setVisitesDate(result.data || [])
    }
    setIsLoading(false)
  }

  const getStatutColor = (statut: string) => {
    const colors: Record<string, string> = {
      'En attente': 'bg-yellow-100 text-yellow-800',
      'Confirmée': 'bg-green-100 text-green-800',
      'Reçue': 'bg-blue-100 text-blue-800',
      'Reportée': 'bg-orange-100 text-orange-800',
      'Annulée': 'bg-red-100 text-red-800'
    }
    return colors[statut] || 'bg-gray-100 text-gray-800'
  }

  const joursSemaine = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T12:00:00') // Ajout de l'heure midi pour éviter les problèmes de fuseau
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Colonne gauche - Calendrier */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {/* En-tête du calendrier */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900">
              {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-2 py-1 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded"
              >
                Aujourd'hui
              </button>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-1">
            {/* Jours de la semaine */}
            {joursSemaine.map(jour => (
              <div key={jour} className="text-center text-xs font-medium text-gray-400 py-1">
                {jour}
              </div>
            ))}

            {/* Cases du calendrier */}
            {days.map((day, index) => {
              const isSelected = selectedDate === day.date
              const today = new Date().toISOString().split('T')[0]
              const isToday = day.date === today

              return (
                <button
                  key={index}
                  onClick={() => day.isSelectable && handleDateClick(day.date)}
                  disabled={!day.isSelectable}
                  className={`
                    relative p-2 text-sm rounded-lg transition-all
                    ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                    ${day.isSelectable 
                      ? 'hover:bg-gray-50 cursor-pointer hover:shadow-sm' 
                      : 'cursor-default opacity-50'
                    }
                    ${isSelected ? 'ring-2 ring-blue-200 bg-blue-50' : ''}
                    ${isToday && day.isCurrentMonth ? 'font-bold text-blue-600' : ''}
                  `}
                >
                  <span>{day.day}</span>
                  {day.visitesCount > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {[...Array(Math.min(day.visitesCount, 3))].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1 h-1 rounded-full ${
                            day.visitesCount > 3 && i === 2 ? 'bg-gray-600' : 'bg-gray-400'
                          }`} 
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Légende */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-100 border border-green-200" />
              <span className="text-gray-500">Mardi/Mercredi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <div className="w-1 h-1 rounded-full bg-gray-400" />
              </div>
              <span className="text-gray-500">Visites</span>
            </div>
          </div>
        </div>
      </div>

      {/* Colonne droite - Liste des visiteurs */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {selectedDate ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Visites du {formatDate(selectedDate)}
                </h3>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {visitesDate.length} visite{visitesDate.length > 1 ? 's' : ''}
                </span>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600"></div>
                  <p className="text-sm text-gray-400 mt-2">Chargement...</p>
                </div>
              ) : visitesDate.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-400">Aucune visite prévue ce jour</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {visitesDate.map((visite) => (
                    <div 
                      key={visite.id} 
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                      onClick={() => router.push(`/dashboard/visites/${visite.id}`)}
                    >
                      {/* Photo du visiteur */}
                      <div className="flex-shrink-0">
                        {visite.membre?.membre_profile ? (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <Image
                              src={visite.membre.membre_profile}
                              alt={visite.membre.nom_complet}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-lg font-light text-gray-400">
                              {visite.nom_visiteur?.charAt(0).toUpperCase() || 'V'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Informations visite */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-900">
                              {visite.heure}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatutColor(visite.statut)}`}>
                              {visite.statut}
                            </span>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        
                        <p className="text-sm text-gray-800 font-medium truncate">
                          {visite.nom_visiteur}
                        </p>
                        
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {visite.telephone}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                            </svg>
                            {visite.motif}
                          </span>
                        </div>

                        {/* Membre associé */}
                        {visite.membre && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Membre: {visite.membre.nom_complet}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-400">Sélectionnez une date dans le calendrier</p>
              <p className="text-xs text-gray-300 mt-1">pour voir les visites du jour</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}