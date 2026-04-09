// components/AdminTabs.tsx
'use client'

import { useState } from 'react'
import ParametresFictif from '@/components/ParametresFictif'
import ActiviteFictif from '@/components/ActiviteFictif'

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState<'parametres' | 'activite'>('parametres')

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Navigation des onglets */}
      <div className="border-b border-gray-100">
        <nav className="flex gap-8">
        
          <button
            onClick={() => setActiveTab('parametres')}
            className={`pb-3 font-semibold text-sm transition-colors bg ${
              activeTab === 'parametres'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-800 hover:text-gray-600'
            }`}
          >
            Paramètres
          </button>
          <button
            onClick={() => setActiveTab('activite')}
            className={`pb-3 font-semibold text-sm transition-colors bg ${
              activeTab === 'activite'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-800 hover:text-gray-600'
            }`}
          >
            Activité
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="mt-6">
        {activeTab === 'parametres' && <ParametresFictif />}
        {activeTab === 'activite' && <ActiviteFictif />}
      </div>
    </div>
  )
}