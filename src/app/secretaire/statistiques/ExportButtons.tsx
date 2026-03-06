

// 'use client'

// import { useState } from 'react'
// import * as XLSX from 'xlsx'
// import jsPDF from 'jspdf'
// import autoTable from 'jspdf-autotable'
// import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from 'date-fns'
// import { fr } from 'date-fns/locale'

// interface ExportButtonsProps {
//   data: any[]
//   stats: any
//   onPeriodChange?: (period: string) => void
// }

// type PeriodType = 'jour' | 'semaine' | 'mois' | 'personnalise'

// export default function ExportButtons({ data, stats, onPeriodChange }: ExportButtonsProps) {
//   const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('semaine')
//   const [customStartDate, setCustomStartDate] = useState('')
//   const [customEndDate, setCustomEndDate] = useState('')
//   const [showCustomPicker, setShowCustomPicker] = useState(false)

//   const getPeriodDates = (period: PeriodType) => {
//     const now = new Date()
//     switch (period) {
//       case 'jour':
//         return {
//           start: format(now, 'yyyy-MM-dd'),
//           end: format(now, 'yyyy-MM-dd'),
//           label: format(now, 'dd MMMM yyyy', { locale: fr })
//         }
//       case 'semaine':
//         return {
//           start: format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd'),
//           end: format(endOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd'),
//           label: `Semaine du ${format(startOfWeek(now, { weekStartsOn: 1 }), 'dd MMMM', { locale: fr })} au ${format(endOfWeek(now, { weekStartsOn: 1 }), 'dd MMMM yyyy', { locale: fr })}`
//         }
//       case 'mois':
//         return {
//           start: format(startOfMonth(now), 'yyyy-MM-dd'),
//           end: format(endOfMonth(now), 'yyyy-MM-dd'),
//           label: format(now, 'MMMM yyyy', { locale: fr })
//         }
//       case 'personnalise':
//         return {
//           start: customStartDate,
//           end: customEndDate,
//           label: customStartDate && customEndDate ? 
//             `Du ${format(new Date(customStartDate), 'dd MMMM')} au ${format(new Date(customEndDate), 'dd MMMM yyyy', { locale: fr })}` : 
//             'Période personnalisée'
//         }
//       default:
//         return {
//           start: format(now, 'yyyy-MM-dd'),
//           end: format(now, 'yyyy-MM-dd'),
//           label: format(now, 'dd MMMM yyyy', { locale: fr })
//         }
//     }
//   }

//   const handlePeriodChange = (period: PeriodType) => {
//     setSelectedPeriod(period)
//     setShowCustomPicker(period === 'personnalise')
//     if (onPeriodChange) {
//       const dates = getPeriodDates(period)
//       onPeriodChange(JSON.stringify(dates))
//     }
//   }

//   const exportToExcel = () => {
//     const period = getPeriodDates(selectedPeriod)
    
//     // Statistiques avancées
//     const visitesParJour = data.reduce((acc: any, visite) => {
//       const jour = format(new Date(visite.date_visite), 'dd/MM/yyyy')
//       acc[jour] = (acc[jour] || 0) + 1
//       return acc
//     }, {})

//     const visitesParHeure = data.reduce((acc: any, visite) => {
//       const heure = visite.heure.substring(0, 5) // HH:MM
//       acc[heure] = (acc[heure] || 0) + 1
//       return acc
//     }, {})

//     // Membres vs Non-membres
//     const statsMembres = {
//       membres: data.filter(v => v.est_membre).length,
//       nonMembres: data.filter(v => !v.est_membre).length
//     }

//     // Préparer les données pour Excel
//     const worksheet = XLSX.utils.json_to_sheet(
//       data.map(v => ({
//         Date: format(new Date(v.date_visite), 'dd/MM/yyyy'),
//         Heure: v.heure,
//         'Jour semaine': format(new Date(v.date_visite), 'EEEE', { locale: fr }),
//         Visiteur: v.nom_visiteur,
//         Téléphone: v.telephone,
//         Sexe: v.sexe || 'Non spécifié',
//         Membre: v.est_membre ? 'Oui' : 'Non',
//         'ID Membre': v.membre_id || '',
//         Motif: v.motif,
//         'Autre motif': v.autre_motif || '',
//         Observations: v.observations || '',
//         Statut: v.statut,
//         'Créé le': v.created_at ? format(new Date(v.created_at), 'dd/MM/yyyy HH:mm') : ''
//       }))
//     )

//     // Créer un classeur
//     const workbook = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Visites')

//     // Feuille de synthèse
//     const summarySheet = XLSX.utils.json_to_sheet([
//       { 'Période': period.label },
//       { 'Date de génération': format(new Date(), 'dd/MM/yyyy HH:mm') },
//       { 'Total visites': stats.totalVisites },
//       { 'Membres': statsMembres.membres },
//       { 'Non-membres': statsMembres.nonMembres },
//       { 'Taux de membres': `${((statsMembres.membres / stats.totalVisites) * 100).toFixed(1)}%` },
//       {},
//       { 'RÉPARTITION PAR MOTIF': '' },
//       ...Object.entries(stats.parMotif).map(([motif, count]) => ({
//         'Motif': motif,
//         'Nombre': count,
//         'Pourcentage': `${((count as number / stats.totalVisites) * 100).toFixed(1)}%`
//       })),
//       {},
//       { 'RÉPARTITION PAR STATUT': '' },
//       ...Object.entries(stats.parStatut).map(([statut, count]) => ({
//         'Statut': statut,
//         'Nombre': count,
//         'Pourcentage': `${((count as number / stats.totalVisites) * 100).toFixed(1)}%`
//       })),
//       {},
//       { 'RÉPARTITION PAR JOUR': '' },
//       ...Object.entries(visitesParJour).map(([jour, count]) => ({
//         'Jour': jour,
//         'Nombre': count
//       })),
//       {},
//       { 'RÉPARTITION PAR HEURE': '' },
//       ...Object.entries(visitesParHeure).map(([heure, count]) => ({
//         'Heure': heure,
//         'Nombre': count
//       }))
//     ])
//     XLSX.utils.book_append_sheet(workbook, summarySheet, 'Synthèse')

//     // Télécharger
//     XLSX.writeFile(workbook, `statistiques_visites_${format(new Date(), 'yyyy-MM-dd')}.xlsx`)
//   }

//   const exportToPDF = () => {
//     const period = getPeriodDates(selectedPeriod)
//     const doc = new jsPDF()
    
//     // Titre
//     doc.setFontSize(20)
//     doc.text('Rapport des visites', 14, 22)
//     doc.setFontSize(12)
//     doc.text(`Période : ${period.label}`, 14, 32)
//     doc.setFontSize(10)
//     doc.text(`Généré le ${format(new Date(), 'dd MMMM yyyy à HH:mm', { locale: fr })}`, 14, 40)

//     // Statistiques principales
//     doc.setFontSize(14)
//     doc.text('Résumé des visites', 14, 55)
//     doc.setFontSize(10)
    
//     let y = 65
//     const statsData = [
//       [`Total des visites:`, `${stats.totalVisites}`],
//       [`Membres:`, `${data.filter(v => v.est_membre).length}`],
//       [`Non-membres:`, `${data.filter(v => !v.est_membre).length}`],
//     ]
    
//     statsData.forEach(([label, value]) => {
//       doc.text(label, 14, y)
//       doc.text(value, 80, y)
//       y += 7
//     })

//     // Répartition par motif
//     y += 5
//     doc.setFontSize(12)
//     doc.text('Répartition par motif', 14, y)
//     y += 7
//     doc.setFontSize(10)
    
//     Object.entries(stats.parMotif).forEach(([motif, count]) => {
//       const pourcentage = ((count as number / stats.totalVisites) * 100).toFixed(1)
//       doc.text(`${motif}: ${count} (${pourcentage}%)`, 20, y)
//       y += 6
//     })

//     // Répartition par statut
//     y += 5
//     doc.setFontSize(12)
//     doc.text('Répartition par statut', 14, y)
//     y += 7
//     doc.setFontSize(10)
    
//     Object.entries(stats.parStatut).forEach(([statut, count]) => {
//       const pourcentage = ((count as number / stats.totalVisites) * 100).toFixed(1)
//       doc.text(`${statut}: ${count} (${pourcentage}%)`, 20, y)
//       y += 6
//     })

//     // Tableau détaillé des visites
//     if (data.length > 0) {
//       autoTable(doc, {
//         startY: y + 10,
//         head: [['Date', 'Heure', 'Visiteur', 'Tél', 'Membre', 'Motif', 'Statut']],
//         body: data.map(v => [
//           format(new Date(v.date_visite), 'dd/MM/yy'),
//           v.heure.substring(0, 5),
//           v.nom_visiteur,
//           v.telephone,
//           v.est_membre ? 'Oui' : 'Non',
//           v.motif === 'Autre' ? v.autre_motif || 'Autre' : v.motif,
//           v.statut
//         ]),
//         styles: { fontSize: 8 },
//         headStyles: { fillColor: [41, 128, 185] },
//         alternateRowStyles: { fillColor: [245, 245, 245] }
//       })
//     }

//     doc.save(`rapport_visites_${period.start}_${period.end}.pdf`)
//   }

//   return (
//     <div className="space-y-4">
//       {/* Sélecteur de période */}
//       <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-3 rounded-lg">
//         <span className="text-sm font-medium text-gray-700">Période :</span>
//         <button
//           onClick={() => handlePeriodChange('jour')}
//           className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
//             selectedPeriod === 'jour' 
//               ? 'bg-blue-600 text-white' 
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           Aujourd'hui
//         </button>
//         <button
//           onClick={() => handlePeriodChange('semaine')}
//           className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
//             selectedPeriod === 'semaine' 
//               ? 'bg-blue-600 text-white' 
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           Cette semaine
//         </button>
//         <button
//           onClick={() => handlePeriodChange('mois')}
//           className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
//             selectedPeriod === 'mois' 
//               ? 'bg-blue-600 text-white' 
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           Ce mois
//         </button>
//         <button
//           onClick={() => handlePeriodChange('personnalise')}
//           className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
//             selectedPeriod === 'personnalise' 
//               ? 'bg-blue-600 text-white' 
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           Personnalisé
//         </button>
//       </div>

//       {/* Période personnalisée */}
//       {showCustomPicker && (
//         <div className="flex flex-wrap items-center gap-3 bg-gray-50 p-3 rounded-lg">
//           <div>
//             <label className="block text-xs text-gray-600 mb-1">Date début</label>
//             <input
//               type="date"
//               value={customStartDate}
//               onChange={(e) => setCustomStartDate(e.target.value)}
//               className="px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-xs text-gray-600 mb-1">Date fin</label>
//             <input
//               type="date"
//               value={customEndDate}
//               onChange={(e) => setCustomEndDate(e.target.value)}
//               className="px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             onClick={() => handlePeriodChange('personnalise')}
//             className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 mt-5"
//             disabled={!customStartDate || !customEndDate}
//           >
//             Appliquer
//           </button>
//         </div>
//       )}

//       {/* Boutons d'export */}
//       <div className="flex gap-2">
//         <button
//           onClick={exportToExcel}
//           className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//           Excel
//         </button>
//         <button
//           onClick={exportToPDF}
//           className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//           PDF
//         </button>
//       </div>

//       {/* Indicateur de période active */}
//       <div className="text-sm text-gray-600">
//         <span className="font-medium">Période sélectionnée :</span>{' '}
//         {getPeriodDates(selectedPeriod).label}
//         {data.length > 0 && (
//           <span className="ml-2 text-blue-600">
//             ({data.length} visite{data.length > 1 ? 's' : ''})
//           </span>
//         )}
//       </div>
//     </div>
//   )
// }



'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ExportButtonsProps {
  data: any[]
  stats: any
  onPeriodChange?: (period: string) => void
}

type PeriodType = 'jour' | 'semaine' | 'mois' | 'personnalise'

export default function ExportButtons({ data, stats, onPeriodChange }: ExportButtonsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('semaine')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [showCustomPicker, setShowCustomPicker] = useState(false)

  const getPeriodDates = (period: PeriodType) => {
    const now = new Date()
    switch (period) {
      case 'jour':
        return {
          start: format(now, 'yyyy-MM-dd'),
          end: format(now, 'yyyy-MM-dd'),
          label: format(now, 'dd MMMM yyyy', { locale: fr })
        }
      case 'semaine':
        return {
          start: format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd'),
          end: format(endOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd'),
          label: `Semaine du ${format(startOfWeek(now, { weekStartsOn: 1 }), 'dd MMMM', { locale: fr })} au ${format(endOfWeek(now, { weekStartsOn: 1 }), 'dd MMMM yyyy', { locale: fr })}`
        }
      case 'mois':
        return {
          start: format(startOfMonth(now), 'yyyy-MM-dd'),
          end: format(endOfMonth(now), 'yyyy-MM-dd'),
          label: format(now, 'MMMM yyyy', { locale: fr })
        }
      case 'personnalise':
        return {
          start: customStartDate,
          end: customEndDate,
          label: customStartDate && customEndDate ? 
            `Du ${format(new Date(customStartDate), 'dd MMMM')} au ${format(new Date(customEndDate), 'dd MMMM yyyy', { locale: fr })}` : 
            'Période personnalisée'
        }
      default:
        return {
          start: format(now, 'yyyy-MM-dd'),
          end: format(now, 'yyyy-MM-dd'),
          label: format(now, 'dd MMMM yyyy', { locale: fr })
        }
    }
  }

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period)
    setShowCustomPicker(period === 'personnalise')
    if (onPeriodChange) {
      const dates = getPeriodDates(period)
      onPeriodChange(JSON.stringify(dates))
    }
  }

  const exportToExcel = () => {
    const period = getPeriodDates(selectedPeriod)
    
    // Statistiques avancées
    const visitesParJour = data.reduce((acc: any, visite) => {
      const jour = format(new Date(visite.date_visite), 'dd/MM/yyyy')
      acc[jour] = (acc[jour] || 0) + 1
      return acc
    }, {})

    const visitesParHeure = data.reduce((acc: any, visite) => {
      const heure = visite.heure.substring(0, 5)
      acc[heure] = (acc[heure] || 0) + 1
      return acc
    }, {})

    const statsMembres = {
      membres: data.filter(v => v.est_membre).length,
      nonMembres: data.filter(v => !v.est_membre).length
    }

    // Créer le classeur
    const workbook = XLSX.utils.book_new()

    // 1. Feuille de synthèse
    const summaryData = [
      ['RAPPORT DES VISITES', ''],
      ['Période', period.label],
      ['Date de génération', format(new Date(), 'dd/MM/yyyy HH:mm')],
      ['', ''],
      ['INDICATEURS CLÉS', ''],
      ['Total des visites', stats.totalVisites],
      ['Membres', statsMembres.membres],
      ['Non-membres', statsMembres.nonMembres],
      ['Taux de membres', `${((statsMembres.membres / stats.totalVisites) * 100).toFixed(1)}%`],
      ['', ''],
      ['RÉPARTITION PAR MOTIF', ''],
      ...Object.entries(stats.parMotif).map(([motif, count]) => [
        motif,
        count,
        `${((count as number / stats.totalVisites) * 100).toFixed(1)}%`
      ]),
      ['', '', ''],
      ['RÉPARTITION PAR STATUT', ''],
      ...Object.entries(stats.parStatut).map(([statut, count]) => [
        statut,
        count,
        `${((count as number / stats.totalVisites) * 100).toFixed(1)}%`
      ]),
      ['', '', ''],
      ['RÉPARTITION PAR JOUR', ''],
      ...Object.entries(visitesParJour).map(([jour, count]) => [jour, count]),
      ['', ''],
      ['RÉPARTITION PAR HEURE', ''],
      ...Object.entries(visitesParHeure).map(([heure, count]) => [heure, count])
    ]

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
    
    // Style pour la feuille de synthèse
    summarySheet['!cols'] = [
      { wch: 30 }, // Largeur colonne A
      { wch: 15 }, // Largeur colonne B
      { wch: 10 }  // Largeur colonne C
    ]
    
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Synthèse')

    // 2. Feuille détaillée des visites
    const detailsData = data.map(v => ({
      'Date': format(new Date(v.date_visite), 'dd/MM/yyyy'),
      'Heure': v.heure.substring(0, 5),
      'Jour': format(new Date(v.date_visite), 'EEEE', { locale: fr }),
      'Visiteur': v.nom_visiteur,
      'Téléphone': v.telephone,
      'Sexe': v.sexe || 'Non spécifié',
      'Membre': v.est_membre ? 'Oui' : 'Non',
      'Motif': v.motif === 'Autre' ? v.autre_motif || 'Autre' : v.motif,
      'Statut': v.statut,
      'Observations': v.observations || ''
    }))

    const detailsSheet = XLSX.utils.json_to_sheet(detailsData)
    detailsSheet['!cols'] = [
      { wch: 12 }, // Date
      { wch: 8 },  // Heure
      { wch: 12 }, // Jour
      { wch: 25 }, // Visiteur
      { wch: 15 }, // Téléphone
      { wch: 8 },  // Sexe
      { wch: 8 },  // Membre
      { wch: 20 }, // Motif
      { wch: 12 }, // Statut
      { wch: 30 }  // Observations
    ]
    
    XLSX.utils.book_append_sheet(workbook, detailsSheet, 'Détail des visites')

    // Télécharger
    XLSX.writeFile(workbook, `rapport_visites_${period.start}_${period.end}.xlsx`)
  }

  const exportToPDF = () => {
    const period = getPeriodDates(selectedPeriod)
    const doc = new jsPDF()
    
    // En-tête du document
    doc.setFillColor(41, 128, 185)
    doc.rect(0, 0, 210, 40, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('RAPPORT DES VISITES', 105, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Période : ${period.label}`, 105, 30, { align: 'center' })
    
    // Informations de génération
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text(`Généré le ${format(new Date(), 'dd MMMM yyyy à HH:mm', { locale: fr })}`, 14, 50)
    
    // Indicateurs clés
    doc.setFillColor(240, 240, 240)
    doc.rect(14, 55, 182, 35, 'F')
    
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('INDICATEURS CLÉS', 14, 65)
    
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text(`Total visites : ${stats.totalVisites}`, 20, 75)
    doc.text(`Membres : ${data.filter(v => v.est_membre).length}`, 20, 82)
    doc.text(`Non-membres : ${data.filter(v => !v.est_membre).length}`, 100, 75)
    
    const tauxMembres = ((data.filter(v => v.est_membre).length / stats.totalVisites) * 100).toFixed(1)
    doc.text(`Taux de membres : ${tauxMembres}%`, 100, 82)
    
    // Tableau des motifs
    let y = 100
    
    // Répartition par motif
    doc.setFillColor(41, 128, 185)
    doc.rect(14, y, 90, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('RÉPARTITION PAR MOTIF', 18, y + 6)
    
    doc.setTextColor(0, 0, 0)
    y += 8
    
    const motifRows = Object.entries(stats.parMotif).map(([motif, count]) => [
      motif,
      (count as number).toString(),
      `${((count as number / stats.totalVisites) * 100).toFixed(1)}%`
    ])
    
    autoTable(doc, {
      startY: y,
      head: [['Motif', 'Nombre', '%']],
      body: motifRows,
      margin: { left: 14 },
      tableWidth: 90,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [60, 60, 60], textColor: [255, 255, 255] }
    })
    
    // Répartition par statut
    y = 100
    doc.setFillColor(41, 128, 185)
    doc.rect(108, y, 90, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.text('RÉPARTITION PAR STATUT', 112, y + 6)
    
    doc.setTextColor(0, 0, 0)
    y += 8
    
    const statutRows = Object.entries(stats.parStatut).map(([statut, count]) => [
      statut,
      (count as number).toString(),
      `${((count as number / stats.totalVisites) * 100).toFixed(1)}%`
    ])
    
    autoTable(doc, {
      startY: y,
      head: [['Statut', 'Nombre', '%']],
      body: statutRows,
      margin: { left: 108 },
      tableWidth: 90,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [60, 60, 60], textColor: [255, 255, 255] }
    })
    
    // Tableau détaillé des visites
    const finalY = (doc as any).lastAutoTable?.finalY || y + 50
    
    doc.setFillColor(41, 128, 185)
    doc.rect(14, finalY + 10, 182, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('DÉTAIL DES VISITES', 105, finalY + 16, { align: 'center' })
    
    if (data.length > 0) {
      autoTable(doc, {
        startY: finalY + 20,
        head: [['Date', 'Heure', 'Visiteur', 'Contact', 'Membre', 'Motif', 'Statut']],
        body: data.slice(0, 30).map(v => [
          format(new Date(v.date_visite), 'dd/MM/yy'),
          v.heure.substring(0, 5),
          v.nom_visiteur,
          v.telephone,
          v.est_membre ? 'Oui' : 'Non',
          v.motif === 'Autre' ? (v.autre_motif || 'Autre').substring(0, 15) : v.motif,
          v.statut
        ]),
        styles: { 
          fontSize: 8,
          cellPadding: 3,
          lineColor: [200, 200, 200],
          lineWidth: 0.1
        },
        headStyles: { 
          fillColor: [60, 60, 60],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center'
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { left: 14, right: 14 },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 15 },
          2: { cellWidth: 40 },
          3: { cellWidth: 25 },
          4: { cellWidth: 15 },
          5: { cellWidth: 30 },
          6: { cellWidth: 25 }
        }
      })

      // Note si plus de 30 visites
      if (data.length > 30) {
        const lastY = (doc as any).lastAutoTable?.finalY || 150
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        doc.text(`* Affichage des 30 premières visites sur ${data.length} au total`, 14, lastY + 5)
      }
    } else {
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text('Aucune visite pour cette période', 105, finalY + 30, { align: 'center' })
    }
    
    // Pied de page
    const pageCount = (doc as any).getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        `Document généré le ${format(new Date(), 'dd/MM/yyyy HH:mm')} - Page ${i} sur ${pageCount}`,
        105,
        287,
        { align: 'center' }
      )
    }

    doc.save(`rapport_visites_${period.start}_${period.end}.pdf`)
  }

  return (
    <div className="space-y-4">
      {/* Sélecteur de période */}
      <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-3 rounded-lg">
        <span className="text-sm font-medium text-gray-700">Période :</span>
        <button
          onClick={() => handlePeriodChange('jour')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            selectedPeriod === 'jour' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Aujourd'hui
        </button>
        <button
          onClick={() => handlePeriodChange('semaine')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            selectedPeriod === 'semaine' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Cette semaine
        </button>
        <button
          onClick={() => handlePeriodChange('mois')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            selectedPeriod === 'mois' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Ce mois
        </button>
        <button
          onClick={() => handlePeriodChange('personnalise')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            selectedPeriod === 'personnalise' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Personnalisé
        </button>
      </div>

      {/* Période personnalisée */}
      {showCustomPicker && (
        <div className="flex flex-wrap items-end gap-3 bg-gray-50 p-3 rounded-lg">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Date début</label>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Date fin</label>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => handlePeriodChange('personnalise')}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!customStartDate || !customEndDate}
          >
            Appliquer
          </button>
        </div>
      )}

      {/* Boutons d'export */}
      <div className="flex gap-2">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm hover:shadow"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exporter Excel
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm hover:shadow"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exporter PDF
        </button>
      </div>

      {/* Indicateur de période active */}
      <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded-lg">
        <span className="font-medium">Période sélectionnée :</span>{' '}
        <span className="text-blue-700">{getPeriodDates(selectedPeriod).label}</span>
        {data.length > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
            {data.length} visite{data.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  )
}