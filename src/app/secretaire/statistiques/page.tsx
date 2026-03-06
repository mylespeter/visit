
'use client'

import { useState, useEffect } from 'react'
import { getStatistiques, StatsData } from '@/actions/statistiques'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import { format, subDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import ExportButtons from './ExportButtons'
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import * as Icons from 'lucide-react'

// Palette minimaliste
const COLORS = {
  primary: '#2563eb',
  secondary: '#7c3aed',
  accent: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
}

// Dégradés pour les graphiques
const CHART_COLORS = [
  '#2563eb',
  '#7c3aed',
  '#059669',
  '#d97706',
  '#dc2626',
  '#4f46e5',
  '#db2777',
  '#6b7280'
]

interface StatutCount {
  'En attente': number
  'Confirmée': number
  'Reçue': number
  'Reportée': number
  'Annulée': number
}

export default function StatistiquesPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatsData | null>(null)
  const [periode, setPeriode] = useState<'semaine' | 'mois' | 'annee'>('mois')
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    loadStats()
  }, [periode])

  const loadStats = async () => {
    setLoading(true)
    const user = await getUser()
    
    if (!user || !['admin', 'secretaire'].includes(user.role?.nom)) {
      redirect('/profile')
      return
    }

    const result = await getStatistiques(periode)
    if (result.success && result.data) {
      setStats(result.data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Icons.AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Aucune donnée disponible</p>
        </div>
      </div>
    )
  }

  const statutCounts: StatutCount = {
    'En attente': stats.parStatut['En attente'] || 0,
    'Confirmée': stats.parStatut['Confirmée'] || 0,
    'Reçue': stats.parStatut['Reçue'] || 0,
    'Reportée': stats.parStatut['Reportée'] || 0,
    'Annulée': stats.parStatut['Annulée'] || 0
  }

  const totalParStatut = Object.values(statutCounts).reduce((a, b) => a + b, 0)

  const donneesParJour = Object.entries(stats.parJour).map(([date, count]) => ({
    date: format(new Date(date), 'dd MMM', { locale: fr }),
    visites: count
  }))

  const donneesParMotif = Object.entries(stats.parMotif).map(([motif, count]) => ({
    motif,
    visites: count
  }))

  const donneesParStatut = Object.entries(statutCounts).map(([statut, count]) => ({
    statut,
    visites: count
  }))

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        
        {/* Header mobile-friendly */}
        <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm py-3 mb-4 border-b border-slate-200/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 px-1">
              <Icons.BarChart3 className="w-5 h-5 text-slate-600" />
              <h1 className="text-base sm:text-lg font-medium text-slate-800">Statistiques & Historiques</h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Période selector mobile-friendly */}
              <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                {[
                  { value: 'semaine', label: '7j' },
                  { value: 'mois', label: '30j' },
                  { value: 'annee', label: '12m' }
                ].map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPeriode(p.value as any)}
                    className={`px-3 py-1.5 text-xs rounded-md transition flex-1 sm:flex-none ${
                      periode === p.value
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              
            
            </div>
          </div>
        </div>
  {/* Export button mobile-friendly */}
              <div className="flex-1 sm:flex-none">
                <ExportButtons data={[]} stats={stats} />
              </div>
        {/* KPIs - Grid responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="p-1 sm:p-1.5 bg-slate-100 rounded-md">
                <Icons.Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600" />
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400">Total</span>
            </div>
            <div className="text-lg sm:text-xl font-light text-slate-800">{stats.totalVisites}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="p-1 sm:p-1.5 bg-blue-50 rounded-md">
                <Icons.Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400">En attente</span>
            </div>
            <div className="text-lg sm:text-xl font-light text-blue-600">{statutCounts['En attente']}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="p-1 sm:p-1.5 bg-emerald-50 rounded-md">
                <Icons.CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400">Reçues</span>
            </div>
            <div className="text-lg sm:text-xl font-light text-emerald-600">{statutCounts['Reçue']}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="p-1 sm:p-1.5 bg-purple-50 rounded-md">
                <Icons.TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400">Conversion</span>
            </div>
            <div className="text-lg sm:text-xl font-light text-slate-800">
              {totalParStatut > 0 ? Math.round((statutCounts['Reçue'] / totalParStatut) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Graphiques - Stack vertical sur mobile */}
        <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-3 mb-4 sm:mb-6">
          
          {/* Évolution - Full width sur mobile */}
          <div className="sm:col-span-2 bg-white rounded-lg p-3 sm:p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Icons.Activity className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">Évolution</span>
            </div>
            <div className="h-[160px] sm:h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={donneesParJour}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[100]} />
                  <XAxis dataKey="date" stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                  <YAxis stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} width={30} />
                  <Tooltip contentStyle={{ fontSize: '11px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="visites" 
                    stroke={COLORS.primary} 
                    strokeWidth={1.5}
                    fill="url(#colorVisits)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Répartition statuts */}
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Icons.PieChart className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">Statuts</span>
            </div>
            <div className="h-[140px] sm:h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donneesParStatut}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="visites"
                  >
                    {donneesParStatut.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Légende responsive */}
            <div className="grid grid-cols-2 gap-1 mt-3">
              {donneesParStatut.slice(0, 4).map((item, index) => (
                <div key={item.statut} className="flex items-center gap-1.5 text-[10px] sm:text-xs">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                  <span className="text-slate-500 truncate">{item.statut}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deuxième ligne - Stack vertical sur mobile */}
        <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3 mb-4 sm:mb-6">
          
          {/* Motifs */}
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Icons.BarChart2 className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">Motifs principaux</span>
            </div>
            <div className="h-[140px] sm:h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={donneesParMotif.slice(0, 5)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[100]} horizontal={false} />
                  <XAxis type="number" stroke={COLORS.gray[300]} tick={{ fontSize: 10 }} />
                  <YAxis 
                    dataKey="motif" 
                    type="category" 
                    stroke={COLORS.gray[300]} 
                    tick={{ fontSize: 10 }} 
                    width={70}
                    tickFormatter={(value) => value.length > 12 ? value.substring(0, 10) + '...' : value}
                  />
                  <Tooltip />
                  <Bar dataKey="visites" fill={COLORS.secondary} radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top membres - Scrollable sur mobile */}
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Icons.Crown className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">Top membres</span>
            </div>
            <div className="space-y-2 max-h-[180px] overflow-y-auto">
              {stats.parMembre.slice(0, 5).map((membre, index) => (
                <div key={membre.membre} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-4 flex-shrink-0">{index + 1}</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {membre.photo ? (
                      <Image src={membre.photo} alt="" width={24} height={24} className="object-cover w-full h-full" />
                    ) : (
                      <Icons.User className="w-3 h-3 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 truncate">{membre.membre}</p>
                    <p className="text-[10px] text-slate-400">{membre.count} visites</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mini tableau des statuts - Scroll horizontal sur mobile */}
        <div className="bg-white rounded-lg border border-slate-100 overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <div className="min-w-[500px] sm:min-w-0 grid grid-cols-5 divide-x divide-slate-100">
              {Object.entries(statutCounts).map(([statut, count]) => {
                const icons = {
                  'En attente': Icons.Clock,
                  'Confirmée': Icons.CalendarCheck,
                  'Reçue': Icons.CheckCircle,
                  'Reportée': Icons.CalendarX,
                  'Annulée': Icons.XCircle
                }
                const colors = {
                  'En attente': 'text-blue-600',
                  'Confirmée': 'text-emerald-600',
                  'Reçue': 'text-green-600',
                  'Reportée': 'text-orange-600',
                  'Annulée': 'text-red-600'
                }
                const bgColors = {
                  'En attente': 'bg-blue-50',
                  'Confirmée': 'bg-emerald-50',
                  'Reçue': 'bg-green-50',
                  'Reportée': 'bg-orange-50',
                  'Annulée': 'bg-red-50'
                }
                const Icon = icons[statut as keyof typeof icons] || Icons.HelpCircle

                return (
                  <div key={statut} className="p-2 sm:p-3 text-center">
                    <div className="flex justify-center mb-1.5">
                      <div className={`p-1 sm:p-1.5 rounded-md ${bgColors[statut as keyof typeof bgColors]}`}>
                        <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${colors[statut as keyof typeof colors]}`} />
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-400 mb-0.5 truncate px-1">{statut}</div>
                    <div className={`text-sm sm:text-base font-light ${colors[statut as keyof typeof colors]}`}>{count}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Icons.Info className="w-3 h-3 flex-shrink-0" />
            <span className="whitespace-nowrap">
              {format(subDays(new Date(), periode === 'semaine' ? 7 : periode === 'mois' ? 30 : 365), 'dd MMM', { locale: fr })} - {format(new Date(), 'dd MMM yyyy', { locale: fr })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Visites</span>
            </div>
            <div className="flex items-center gap-1">
              <Icons.CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Reçues</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}