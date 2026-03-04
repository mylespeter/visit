'use client'

import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ExportButtonsProps {
  data: any[]
  stats: any
}

export default function ExportButtons({ data, stats }: ExportButtonsProps) {
  const exportToExcel = () => {
    // Préparer les données pour Excel
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(v => ({
        Date: format(new Date(v.date_visite), 'dd/MM/yyyy'),
        Heure: v.heure,
        Visiteur: v.nom_visiteur,
        Téléphone: v.telephone,
        Membre: v.membre ? 'Oui' : 'Non',
        Motif: v.motif,
        Statut: v.statut
      }))
    )

    // Créer un classeur
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Visites')

    // Ajouter une feuille de statistiques
    const statsSheet = XLSX.utils.json_to_sheet([
      { Statistique: 'Total visites', Valeur: stats.totalVisites },
      ...Object.entries(stats.parMotif).map(([motif, count]) => ({
        Statistique: `Motif: ${motif}`,
        Valeur: count
      })),
      ...Object.entries(stats.parStatut).map(([statut, count]) => ({
        Statistique: `Statut: ${statut}`,
        Valeur: count
      }))
    ])
    XLSX.utils.book_append_sheet(workbook, statsSheet, 'Statistiques')

    // Télécharger
    XLSX.writeFile(workbook, `statistiques_visites_${format(new Date(), 'yyyy-MM-dd')}.xlsx`)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    
    // Titre
    doc.setFontSize(18)
    doc.text('Rapport des visites', 14, 22)
    doc.setFontSize(11)
    doc.text(`Généré le ${format(new Date(), 'dd MMMM yyyy', { locale: fr })}`, 14, 32)

    // Résumé des statistiques
    doc.setFontSize(14)
    doc.text('Résumé', 14, 45)
    doc.setFontSize(10)
    doc.text(`Total des visites: ${stats.totalVisites}`, 14, 55)
    
    let y = 65
    Object.entries(stats.parMotif).forEach(([motif, count]) => {
      doc.text(`${motif}: ${count}`, 14, y)
      y += 7
    })

    // Tableau des visites
    autoTable(doc, {
      startY: y + 10,
      head: [['Date', 'Heure', 'Visiteur', 'Motif', 'Statut']],
      body: data.slice(0, 50).map(v => [
        format(new Date(v.date_visite), 'dd/MM/yyyy'),
        v.heure,
        v.nom_visiteur,
        v.motif,
        v.statut
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [75, 85, 99] }
    })

    doc.save(`rapport_visites_${format(new Date(), 'yyyy-MM-dd')}.pdf`)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToExcel}
        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Excel
      </button>
      <button
        onClick={exportToPDF}
        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        PDF
      </button>
    </div>
  )
}