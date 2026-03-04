'use client'

import { useState, useEffect } from 'react'

interface CreneauxDisponiblesProps {
  date: string
  onSelect: (heure: string) => void
  selectedHeure: string
}

export default function CreneauxDisponibles({ date, onSelect, selectedHeure }: CreneauxDisponiblesProps) {
  const [creneaux, setCreneaux] = useState<string[]>([])
  const [creneauxOccupes, setCreneauxOccupes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const chargerCreneaux = async () => {
      if (!date) return

      setIsLoading(true)
      try {
        // Récupérer les créneaux occupés
        const response = await fetch(`/api/visites/creneaux?date=${date}`)
        const data = await response.json()
        setCreneauxOccupes(data.occupes || [])

        // Générer tous les créneaux possibles
        const tousCreneaux = []
        const debut = 8 // 8h
        const fin = 16 // 16h
        const interval = 30 // 30 minutes

        for (let h = debut; h < fin; h++) {
          for (let m = 0; m < 60; m += interval) {
            const heure = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
            tousCreneaux.push(heure)
          }
        }
        setCreneaux(tousCreneaux)
      } catch (error) {
        console.error('Erreur chargement créneaux:', error)
      } finally {
        setIsLoading(false)
      }
    }

    chargerCreneaux()
  }, [date])

  const estOccupe = (heure: string) => creneauxOccupes.includes(heure)

  return (
    <div>
      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
        Créneaux disponibles
      </label>
      {isLoading ? (
        <div className="text-center py-4 text-sm text-gray-400">Chargement...</div>
      ) : (
        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
          {creneaux.map((heure) => {
            const occupe = estOccupe(heure)
            return (
              <button
                key={heure}
                type="button"
                onClick={() => !occupe && onSelect(heure)}
                disabled={occupe}
                className={`
                  px-3 py-2 text-xs rounded-lg transition-colors
                  ${occupe 
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                    : selectedHeure === heure
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {heure}
                {occupe && (
                  <span className="ml-1 text-gray-300">•</span>
                )}
              </button>
            )
          })}
        </div>
      )}
      <input type="hidden" name="heure" value={selectedHeure} />
    </div>
  )
}