'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface Visite {
  id: number
  nom_visiteur: string
  telephone: string
  heure: string
  motif: string
  statut: string
  date_visite: string
  est_membre?: boolean
  membre?: { 
    id: number
    nom_complet: string
    membre_profile?: string | null
  } | null
}

interface HistoriqueSuiviProps {
  visites: Visite[]
}

export default function HistoriqueSuivi({ visites }: HistoriqueSuiviProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMotif, setSelectedMotif] = useState<string>('')
  const [selectedStatut, setSelectedStatut] = useState<string>('')
  const [selectedMembre, setSelectedMembre] = useState<string>('')
  const [viewMode, setViewMode] = useState<'general' | 'parMembre'>('general')
  const [selectedDate, setSelectedDate] = useState<string>('')

  // Obtenir la liste unique des motifs
  const motifs = useMemo(() => {
    const uniqueMotifs = new Set(visites.map(v => v.motif))
    return ['Tous', ...Array.from(uniqueMotifs)]
  }, [visites])

  // Obtenir la liste unique des statuts
  const statuts = ['Tous', 'En attente', 'Confirmée', 'Reçue', 'Reportée', 'Annulée']

  // Obtenir la liste unique des membres
  const membres = useMemo(() => {
    const membresMap = new Map()
    visites.forEach(v => {
      if (v.membre) {
        membresMap.set(v.membre.id, {
          id: v.membre.id,
          nom: v.membre.nom_complet,
          photo: v.membre.membre_profile
        })
      }
    })
    return [
      { id: 'tous', nom: 'Tous les membres' },
      ...Array.from(membresMap.values())
    ]
  }, [visites])

  // Filtrer les visites
  const visitesFiltrees = useMemo(() => {
    return visites.filter(visite => {
      const matchesSearch = searchTerm === '' || 
        visite.nom_visiteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visite.telephone.includes(searchTerm)

      const matchesMotif = selectedMotif === '' || selectedMotif === 'Tous' || 
        visite.motif === selectedMotif

      const matchesStatut = selectedStatut === '' || selectedStatut === 'Tous' || 
        visite.statut === selectedStatut

      const matchesMembre = selectedMembre === '' || selectedMembre === 'tous' ||
        (visite.membre && visite.membre.id.toString() === selectedMembre)

      const matchesDate = selectedDate === '' || visite.date_visite === selectedDate

      return matchesSearch && matchesMotif && matchesStatut && matchesMembre && matchesDate
    })
  }, [visites, searchTerm, selectedMotif, selectedStatut, selectedMembre, selectedDate])

  // Grouper par date
  const visitesParDate = useMemo(() => {
    return visitesFiltrees.reduce((acc, visite) => {
      const date = visite.date_visite
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(visite)
      return acc
    }, {} as Record<string, Visite[]>)
  }, [visitesFiltrees])

  // Grouper par membre
  const visitesParMembre = useMemo(() => {
    const grouped: Record<string, { membre: any, visites: Visite[] }> = {}
    
    visitesFiltrees.forEach(visite => {
      if (visite.membre) {
        const key = visite.membre.id.toString()
        if (!grouped[key]) {
          grouped[key] = {
            membre: visite.membre,
            visites: []
          }
        }
        grouped[key].visites.push(visite)
      }
    })

    return Object.values(grouped).sort((a, b) => 
      a.membre.nom_complet.localeCompare(b.membre.nom_complet)
    )
  }, [visitesFiltrees])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatutIcon = (statut: string) => {
    const icons = {
      'En attente': '🔵',
      'Confirmée': '🟢',
      'Reçue': '✅',
      'Reportée': '🟡',
      'Annulée': '❌'
    }
    return icons[statut as keyof typeof icons] || '⚪'
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return format(date, 'EEEE d MMMM yyyy', { locale: fr })
      .replace(/^\w/, c => c.toUpperCase())
  }

  const formatDateCourt = (dateStr: string) => {
    const date = new Date(dateStr)
    return format(date, 'dd/MM/yyyy')
  }

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filtres</h3>
        
        {/* Recherche par nom */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par nom ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Grille de filtres */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Filtre par motif */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Motif</label>
            <select
              value={selectedMotif}
              onChange={(e) => setSelectedMotif(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
            >
              {motifs.map(motif => (
                <option key={motif} value={motif}>{motif}</option>
              ))}
            </select>
          </div>

          {/* Filtre par statut */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Statut</label>
            <select
              value={selectedStatut}
              onChange={(e) => setSelectedStatut(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
            >
              {statuts.map(statut => (
                <option key={statut} value={statut}>{statut}</option>
              ))}
            </select>
          </div>

          {/* Filtre par date */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
            />
          </div>

          {/* Bouton réinitialiser */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedMotif('')
                setSelectedStatut('')
                setSelectedMembre('')
                setSelectedDate('')
              }}
              className="w-full px-4 py-2 text-sm text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Sélecteur de vue et filtre membre */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('general')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                viewMode === 'general'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Par date
            </button>
            <button
              onClick={() => setViewMode('parMembre')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                viewMode === 'parMembre'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Par membre
            </button>
          </div>

          {viewMode === 'parMembre' && (
            <div className="w-64">
              <select
                value={selectedMembre}
                onChange={(e) => setSelectedMembre(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
              >
                {membres.map(membre => (
                  <option key={membre.id} value={membre.id}>
                    {membre.nom}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Résultats */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* En-tête avec compteur */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              {visitesFiltrees.length} visite(s) trouvée(s)
            </h3>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          {visitesFiltrees.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-gray-400">Aucune visite ne correspond aux filtres</p>
            </div>
          ) : viewMode === 'general' ? (
            // Vue par date
            <div className="space-y-8">
              {Object.entries(visitesParDate)
                .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                .map(([date, visites]) => (
                  <div key={date}>
                    <h4 className="text-sm font-medium text-gray-700 mb-3 pb-2 border-b border-gray-100">
                      {formatDate(date)}
                    </h4>
                    <div className="space-y-2">
                      {visites.map((visite) => (
                        <div key={visite.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100/50 transition-colors">
                          <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                              {visite.membre?.membre_profile ? (
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                  <Image
                                    src={visite.membre.membre_profile}
                                    alt={visite.nom_visiteur}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
                                  {getInitials(visite.nom_visiteur)}
                                </div>
                              )}
                            </div>

                            {/* Infos */}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">
                                  {visite.nom_visiteur}
                                </span>
                                {visite.membre && (
                                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                                    Membre
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                <span>{visite.heure}</span>
                                <span>•</span>
                                <span>{visite.telephone}</span>
                                <span>•</span>
                                <span>{visite.motif}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm">
                              {getStatutIcon(visite.statut)} {visite.statut}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            // Vue par membre
            <div className="space-y-4">
              {visitesParMembre.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">
                  Aucune visite de membre trouvée
                </p>
              ) : (
                visitesParMembre.map(({ membre, visites }) => (
                  <div key={membre.id} className="border border-gray-100 rounded-lg overflow-hidden">
                    {/* En-tête membre */}
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                      {membre.membre_profile ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={membre.membre_profile}
                            alt={membre.nom_complet}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
                          {getInitials(membre.nom_complet)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          {membre.nom_complet}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {visites.length} visite{visites.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Liste des visites du membre */}
                    <div className="divide-y divide-gray-50">
                      {visites.map((visite) => (
                        <div key={visite.id} className="p-3 hover:bg-gray-50/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">
                                  {formatDateCourt(visite.date_visite)}
                                </span>
                                <span className="text-xs font-medium text-gray-600">
                                  {visite.heure}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">
                                  {visite.motif}
                                </span>
                              </div>
                            </div>
                            <span className="text-sm">
                              {getStatutIcon(visite.statut)} {visite.statut}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Statistiques globales</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {statuts.filter(s => s !== 'Tous').map(statut => {
            const count = visites.filter(v => v.statut === statut).length
            return (
              <div key={statut} className="text-center">
                <div className="text-xl font-light text-gray-900">{count}</div>
                <div className="text-xs text-gray-400">{statut}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}