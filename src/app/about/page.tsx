'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import VisitesList from '../secretaire/visites/VisitesList'

interface VisitesAVenirProps {
  visites?: any[] // Rendre optionnel ou s'assurer que c'est toujours un tableau
}

export default function VisitesAVenir({ visites = [] }: VisitesAVenirProps) {
  const [currentDateIndex, setCurrentDateIndex] = useState(0)

  // Grouper les visites par date
  const visitesParDate = visites.reduce((acc, visite) => {
    if (!acc[visite.date_visite]) {
      acc[visite.date_visite] = []
    }
    acc[visite.date_visite].push(visite)
    return acc
  }, {} as Record<string, any[]>)

  // Trier les dates par ordre chronologique
  const dates = Object.keys(visitesParDate).sort()
  const currentDate = dates[currentDateIndex]
  const currentVisites = currentDate ? visitesParDate[currentDate] : []

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const goToPreviousDate = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(currentDateIndex - 1)
    }
  }

  const goToNextDate = () => {
    if (currentDateIndex < dates.length - 1) {
      setCurrentDateIndex(currentDateIndex + 1)
    }
  }

  if (dates.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-400">Aucune visite à venir</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Navigation entre les dates */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousDate}
            disabled={currentDateIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Jour précédent
          </button>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {formatDate(currentDate)}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {currentVisites.length} visite{currentVisites.length > 1 ? 's' : ''}
            </p>
          </div>

          <button
            onClick={goToNextDate}
            disabled={currentDateIndex === dates.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Jour suivant
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Indicateur de progression */}
        <div className="mt-4 flex items-center justify-center gap-1">
          {dates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDateIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentDateIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Liste des visites pour la date courante */}
      <VisitesList visites={currentVisites} />
    </div>
  )
}