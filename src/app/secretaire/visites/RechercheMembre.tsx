'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Membre {
  id: number
  nom_complet: string
  numero: string
  email: string | null
  sexe: string
  membre_profile: string | null
}

interface RechercheMembreProps {
  onSelect: (membre: Membre) => void
}

export default function RechercheMembre({ onSelect }: RechercheMembreProps) {
  const [search, setSearch] = useState('')
  const [membres, setMembres] = useState<Membre[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchMembres = async () => {
      if (search.length < 2) {
        setMembres([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/membres/search?q=${encodeURIComponent(search)}`)
        const data = await response.json()
        setMembres(data)
        setIsOpen(true)
      } catch (error) {
        console.error('Erreur recherche:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(searchMembres, 300)
    return () => clearTimeout(timeoutId)
  }, [search])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div ref={searchRef} className="relative">
      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
        Rechercher un membre
      </label>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => search.length >= 2 && setIsOpen(true)}
          placeholder="Tapez au moins 2 caractères..."
          className="w-full px-3 py-2 pl-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
        />
        <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Résultats de recherche */}
      {isOpen && membres.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border border-gray-100 shadow-lg max-h-60 overflow-y-auto">
          {membres.map((membre) => (
            <button
              key={membre.id}
              onClick={() => {
                onSelect(membre)
                setSearch('')
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
            >
              {/* Photo */}
              <div className="flex-shrink-0">
                {membre.membre_profile ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                    <Image
                      src={membre.membre_profile}
                      alt={membre.nom_complet}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500">
                    {getInitials(membre.nom_complet)}
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {membre.nom_complet}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{membre.numero}</span>
                  {membre.email && (
                    <>
                      <span>•</span>
                      <span className="truncate">{membre.email}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Sexe */}
              <span className="text-xs text-gray-300">
                {membre.sexe === 'Homme' ? '♂' : '♀'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}