

// 'use client'

// import { useState } from 'react'
// import NouvelleVisite from './NouvelleVisite'
// import VisitesList from './VisitesList'
// import CalendrierVisites from './CalendrierVisites'
// import VisitesDuJour from './VisitesDuJour'
// import HistoriqueSuivi from './HistoriqueSuivi'

// interface VisitesTabsProps {
//   config: Record<string, string> | null
//   visitesJour: any[]
//   visitesAVenir: any[]
//   historiqueVisites: any[]
// }

// export default function VisitesTabs({ 
//   config, 
//   visitesJour, 
//   visitesAVenir, 
//   historiqueVisites 
// }: VisitesTabsProps) {
//   const [activeTab, setActiveTab] = useState<'aujourdhui' | 'a-venir' | 'calendrier' | 'historique' | 'nouvelle'>('aujourdhui')

//   const tabs = [
//     { id: 'aujourdhui', label: "Aujourd'hui", count: visitesJour.length },
//     { id: 'a-venir', label: 'À venir', count: visitesAVenir.length },
//     { id: 'calendrier', label: 'Calendrier' },
//     { id: 'historique', label: 'Historique', count: historiqueVisites.length },
//     { id: 'nouvelle', label: '+ Nouvelle visite' }
//   ] as const

//   return (
//     <div>
//       {/* Navigation des tabs */}
//       <div className="border-b border-gray-200 mb-6">
//         <nav className="flex -mb-px space-x-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`
//                 py-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
//                 ${activeTab === tab.id
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }
//                 ${tab.id === 'nouvelle' ? 'ml-auto text-blue-600 hover:text-blue-700' : ''}
//               `}
//             >
//               {tab.label}
//               {'count' in tab && tab.count !== undefined && tab.count > 0 && (
//                 <span className={`
//                   ml-2 py-0.5 px-2 rounded-full text-xs
//                   ${activeTab === tab.id
//                     ? 'bg-blue-100 text-blue-600'
//                     : 'bg-gray-100 text-gray-600'
//                   }
//                 `}>
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Contenu des tabs */}
//       <div className="mt-6">
//         {activeTab === 'nouvelle' && (
//           <div className="max-w-4xl mx-auto">
//             <NouvelleVisite config={config} />
//           </div>
//         )}

//         {activeTab === 'aujourdhui' && (
//           <div>
//             {visitesJour.length > 0 ? (
//               <VisitesDuJour visites={visitesJour} />
//             ) : (
//               <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
//                 <p className="text-gray-400">Aucune visite prévue aujourd'hui</p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'a-venir' && (
//           <div>
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Visites à venir</h2>
//             {visitesAVenir.length > 0 ? (
//               <div className="space-y-6">
//                 {Object.entries(
//                   visitesAVenir.reduce<Record<string, any[]>>((acc, visite) => {
//                     const date = visite.date_visite
//                     if (!acc[date]) acc[date] = []
//                     acc[date].push(visite)
//                     return acc
//                   }, {})
//                 )
//                   .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
//                   .map(([date, visites]) => (
//                     <VisitesList key={date} visites={visites} />
//                   ))}
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
//                 <p className="text-gray-400">Aucune visite à venir</p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'calendrier' && (
//           <div>
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Calendrier des visites</h2>
//             <div className="bg-white rounded-lg border border-gray-200 p-4">
//               <CalendrierVisites 
//                 visites={[
//                   ...visitesJour,
//                   ...visitesAVenir,
//                   ...historiqueVisites
//                 ]} 
//               />
//             </div>
//           </div>
//         )}

//         {activeTab === 'historique' && (
//           <div>
//             <HistoriqueSuivi visites={historiqueVisites} />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, History, Plus, ChevronDown } from 'lucide-react'
import NouvelleVisite from './NouvelleVisite'
import VisitesList from './VisitesList'
import CalendrierVisites from './CalendrierVisites'
import VisitesDuJour from './VisitesDuJour'
import HistoriqueSuivi from './HistoriqueSuivi'

interface VisitesTabsProps {
  config: Record<string, string> | null
  visitesJour: any[]
  visitesAVenir: any[]
  historiqueVisites: any[]
}

export default function VisitesTabs({ 
  config, 
  visitesJour, 
  visitesAVenir, 
  historiqueVisites 
}: VisitesTabsProps) {
  const [activeTab, setActiveTab] = useState<'aujourdhui' | 'a-venir' | 'calendrier' | 'historique' | 'nouvelle'>('aujourdhui')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const tabs = [
    { id: 'aujourdhui', label: "Aujourd'hui", icon: Clock, count: visitesJour.length },
    { id: 'a-venir', label: 'À venir', icon: Calendar, count: visitesAVenir.length },
    { id: 'calendrier', label: 'Calendrier', icon: Calendar },
    { id: 'historique', label: 'Historique', icon: History, count: historiqueVisites.length },
    { id: 'nouvelle', label: 'Nouvelle visite', icon: Plus }
  ] as const

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  // Version mobile : menu déroulant + bouton d'ajout flottant
  if (isMobile) {
    return (
      <div className="pb-20"> {/* Padding bottom pour le bouton flottant */}
        {/* Header avec sélecteur de tab */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
          <div className="relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 text-left"
            >
              <div className="flex items-center gap-3">
                {activeTabData && (
                  <>
                    <activeTabData.icon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-gray-900">{activeTabData.label}</span>
                    {'count' in activeTabData && activeTabData.count > 0 && (
                      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                        {activeTabData.count}
                      </span>
                    )}
                  </>
                )}
              </div>
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Menu déroulant */}
            {isMobileMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-black/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 text-left
                        ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                      `}
                    >
                      <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="flex-1 font-medium">{tab.label}</span>
                      {'count' in tab && tab.count > 0 && (
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs
                          ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
                        `}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Contenu */}
        <div className="px-4 py-4">
          {activeTab === 'nouvelle' && (
            <NouvelleVisite config={config} />
          )}

          {activeTab === 'aujourdhui' && (
            <div>
              {visitesJour.length > 0 ? (
                <VisitesDuJour visites={visitesJour} />
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Clock className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Aucune visite prévue aujourd'hui</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'a-venir' && (
            <div>
              <h2 className="text-base font-medium text-gray-900 mb-3">Visites à venir</h2>
              {visitesAVenir.length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(
                    visitesAVenir.reduce<Record<string, any[]>>((acc, visite) => {
                      const date = visite.date_visite
                      if (!acc[date]) acc[date] = []
                      acc[date].push(visite)
                      return acc
                    }, {})
                  )
                    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                    .map(([date, visites]) => (
                      <div key={date} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                          <h3 className="text-sm font-medium text-gray-700">
                            {new Date(date).toLocaleDateString('fr-FR', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long' 
                            })}
                          </h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {visites.map((visite) => (
                            <div key={visite.id} className="p-4 hover:bg-gray-50">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                                  {visite.nom_visiteur?.charAt(0) || 'V'}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{visite.nom_visiteur}</div>
                                  <div className="text-xs text-gray-500">{visite.heure}</div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  visite.statut === 'Confirmée' ? 'bg-blue-100 text-blue-700' :
                                  visite.statut === 'En attente' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {visite.statut}
                                </span>
                              </div>
                              {visite.motif && (
                                <p className="text-xs text-gray-600 ml-11">
                                  {visite.motif === 'Autre' ? visite.autre_motif : visite.motif}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Aucune visite à venir</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'calendrier' && (
            <div>
              <h2 className="text-base font-medium text-gray-900 mb-3">Calendrier</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <CalendrierVisites 
                  visites={[
                    ...visitesJour,
                    ...visitesAVenir,
                    ...historiqueVisites
                  ]} 
                />
              </div>
            </div>
          )}

          {activeTab === 'historique' && (
            <HistoriqueSuivi visites={historiqueVisites} />
          )}
        </div>

        {/* Bouton flottant pour nouvelle visite (sauf si déjà sur l'onglet nouvelle) */}
        {activeTab !== 'nouvelle' && (
          <button
            onClick={() => setActiveTab('nouvelle')}
            className="fixed bottom-20 right-4 z-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-6 w-6" />
          </button>
        )}
      </div>
    )
  }

  // Version desktop (inchangée)
  return (
    <div>
      {/* Navigation des tabs */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <nav className="flex -mb-px space-x-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                ${tab.id === 'nouvelle' ? 'ml-auto text-blue-600 hover:text-blue-700' : ''}
              `}
            >
              {tab.label}
              {'count' in tab && tab.count !== undefined && tab.count > 0 && (
                <span className={`
                  ml-2 py-0.5 px-2 rounded-full text-xs
                  ${activeTab === tab.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu des tabs */}
      <div className="mt-6 px-4">
        {activeTab === 'nouvelle' && (
          <div className="max-w-4xl mx-auto">
            <NouvelleVisite config={config} />
          </div>
        )}

        {activeTab === 'aujourdhui' && (
          <div>
            {visitesJour.length > 0 ? (
              <VisitesDuJour visites={visitesJour} />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-400">Aucune visite prévue aujourd'hui</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'a-venir' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Visites à venir</h2>
            {visitesAVenir.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(
                  visitesAVenir.reduce<Record<string, any[]>>((acc, visite) => {
                    const date = visite.date_visite
                    if (!acc[date]) acc[date] = []
                    acc[date].push(visite)
                    return acc
                  }, {})
                )
                  .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                  .map(([date, visites]) => (
                    <VisitesList key={date} visites={visites} />
                  ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-400">Aucune visite à venir</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calendrier' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Calendrier des visites</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <CalendrierVisites 
                visites={[
                  ...visitesJour,
                  ...visitesAVenir,
                  ...historiqueVisites
                ]} 
              />
            </div>
          </div>
        )}

        {activeTab === 'historique' && (
          <div>
            <HistoriqueSuivi visites={historiqueVisites} />
          </div>
        )}
      </div>
    </div>
  )
}