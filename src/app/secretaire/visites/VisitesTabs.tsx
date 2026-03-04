// 'use client'

// import { useState } from 'react'
// import NouvelleVisite from './NouvelleVisite'
// import VisitesList from './VisitesList'
// import CalendrierVisites from './CalendrierVisites'
// import VisitesDuJour from './VisitesDuJour'

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
//               {'count' in tab && tab.count !== undefined && (
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
//             {/* <h2 className="text-lg font-medium text-gray-900 mb-4">Nouvelle visite</h2> */}
//             <NouvelleVisite config={config} />
//           </div>
//         )}

//         {activeTab === 'aujourdhui' && (
//           <div>
//             {/* <h2 className="text-lg font-medium text-gray-900 mb-4">Visites du jour</h2> */}
//             {visitesJour.length > 0 ? (
//               <VisitesDuJour visites={visitesJour} />
//             ) : (
//               <p className="text-gray-500 text-center py-8">Aucune visite prévue aujourd'hui</p>
//             )}
//           </div>
//         )}

//         {activeTab === 'a-venir' && (
//           <div>
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Visites à venir</h2>
//             {visitesAVenir.length > 0 ? (
//               <VisitesList visites={visitesAVenir} />
//             ) : (
//               <p className="text-gray-500 text-center py-8">Aucune visite à venir</p>
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
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Historique des visites</h2>
//             {historiqueVisites.length > 0 ? (
//               <VisitesList visites={historiqueVisites} />
//             ) : (
//               <p className="text-gray-500 text-center py-8">Aucun historique</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
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

  const tabs = [
    { id: 'aujourdhui', label: "Aujourd'hui", count: visitesJour.length },
    { id: 'a-venir', label: 'À venir', count: visitesAVenir.length },
    { id: 'calendrier', label: 'Calendrier' },
    { id: 'historique', label: 'Historique', count: historiqueVisites.length },
    { id: 'nouvelle', label: '+ Nouvelle visite' }
  ] as const

  return (
    <div>
      {/* Navigation des tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px space-x-8">
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
      <div className="mt-6">
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