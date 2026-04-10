
// // app/historique/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { format, parseISO, isValid } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import { 
//   Calendar, 
//   Users, 
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   CheckCircle,
//   XCircle,
//   TrendingUp,
//   Search,
//   Filter,
//   Phone,
//   User,
//   Tag,
//   UserCircle,
//   UserCircle2
// } from 'lucide-react';
// import { getAllVisites } from '@/actions/visites';

// // Types
// interface Visite {
//   id: number;
//   nom_visiteur: string;
//   telephone: string;
//   sexe: string;
//   est_membre: boolean;
//   membre_id: number | null;
//   motif: string;
//   autre_motif: string | null;
//   date_visite: string;
//   heure: string;
//   observations: string | null;
//   statut: string;
//   cree_par: number;
//   cree_par_nom?: string;
//   membre?: {
//     nom_complet: string;
//     membre_profile: string;
//   };
// }

// interface Statistiques {
//   total: number;
//   recues: number;
//   en_attente: number;
//   annulees: number;
//   reportees: number;
// }

// export default function HistoriquePage() {
//   const [visites, setVisites] = useState<Visite[]>([]);
//   const [filteredVisites, setFilteredVisites] = useState<Visite[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState<Statistiques>({
//     total: 0,
//     recues: 0,
//     en_attente: 0,
//     annulees: 0,
//     reportees: 0
//   });
  
//   // Filtres
//   const [dateDebut, setDateDebut] = useState(() => {
//     const date = new Date();
//     date.setDate(1);
//     return format(date, 'yyyy-MM-dd');
//   });
//   const [dateFin, setDateFin] = useState(() => format(new Date(), 'yyyy-MM-dd'));

//   // Fonction pour formater une date en français
//   const formatDateFr = (dateStr: string) => {
//     if (!dateStr) return '';
//     try {
//       const date = new Date(dateStr);
//       if (isNaN(date.getTime())) return '';
//       return format(date, 'dd MMMM yyyy', { locale: fr });
//     } catch {
//       return '';
//     }
//   };

//   // Charger toutes les visites
//   const loadVisites = async () => {
//     setLoading(true);
//     const result = await getAllVisites();
    
//     if (result.success && result.data) {
//       const allVisites = result.data as Visite[];
      
//       // Filtrer par date
//       const filtered = allVisites.filter(visite => {
//         const visiteDate = visite.date_visite;
//         return visiteDate >= dateDebut && visiteDate <= dateFin;
//       });
      
//       setVisites(filtered);
//       setFilteredVisites(filtered);
      
//       // Calculer les statistiques
//       const recues = filtered.filter(v => v.statut === 'Reçue' || v.statut === 'Confirmée').length;
//       const en_attente = filtered.filter(v => v.statut === 'En attente').length;
//       const annulees = filtered.filter(v => v.statut === 'Annulé' || v.statut === 'Annulée').length;
//       const reportees = filtered.filter(v => v.statut === 'Reportée').length;
      
//       setStats({
//         total: filtered.length,
//         recues,
//         en_attente,
//         annulees,
//         reportees
//       });
//     }
//     setLoading(false);
//   };

//   // Recharger quand les dates changent
//   useEffect(() => {
//     loadVisites();
//   }, [dateDebut, dateFin]);

//   const getStatutColor = (statut: string) => {
//     switch(statut) {
//       case 'En attente': return 'bg-yellow-100 text-yellow-800';
//       case 'Confirmée': return 'bg-green-100 text-green-800';
//       case 'Reçue': return 'bg-green-100 text-green-800';
//       case 'Reportée': return 'bg-orange-100 text-orange-800';
//       case 'Annulé':
//       case 'Annulée': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatutIcon = (statut: string) => {
//     switch(statut) {
//       case 'En attente': return <Clock className="w-3 h-3" />;
//       case 'Confirmée':
//       case 'Reçue': return <CheckCircle className="w-3 h-3" />;
//       case 'Reportée': return <Clock className="w-3 h-3" />;
//       case 'Annulé':
//       case 'Annulée': return <XCircle className="w-3 h-3" />;
//       default: return null;
//     }
//   };

//   const getMotifIcon = (motif: string) => {
//     switch(motif) {
//       case 'Conseil': return '💬';
//       case 'Prière': return '🙏';
//       case 'Orientation': return '🎯';
//       default: return '📝';
//     }
//   };

//   const formatDateTable = (dateStr: string) => {
//     if (!dateStr) return '';
//     try {
//       const date = new Date(dateStr);
//       if (isNaN(date.getTime())) return '';
//       return format(date, 'dd/MM/yyyy');
//     } catch {
//       return '';
//     }
//   };

//   const getMotifDisplay = (visite: Visite) => {
//     return visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-4 py-6">
        
       

//         {/* Filtres */}
//         <div className="bg-white  shadow-sm p-5 mb-6 border border-gray-200">
//           <div className="flex items-center gap-2 mb-4">
//             <Filter className="w-4 h-4 text-gray-500" />
//             <h2 className="text-sm font-semibold text-gray-700">Filtres</h2>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">
//                 Date de Début
//               </label>
//               <input
//                 type="date"
//                 value={dateDebut}
//                 onChange={(e) => setDateDebut(e.target.value)}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">
//                 Date de Fin
//               </label>
//               <input
//                 type="date"
//                 value={dateFin}
//                 onChange={(e) => setDateFin(e.target.value)}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Cartes statistiques */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           {/* Total */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-blue-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total visites</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
//               </div>
//               <Users className="w-6 h-6 text-blue-500" />
//             </div>
//           </div>
          
//           {/* Reçues */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-green-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Reçues</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.recues}</p>
//               </div>
//               <CheckCircle className="w-6 h-6 text-green-500" />
//             </div>
//           </div>
          
//           {/* En attente */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-yellow-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">En attente</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.en_attente}</p>
//               </div>
//               <Clock className="w-6 h-6 text-yellow-500" />
//             </div>
//           </div>
          
//           {/* Reportées */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-orange-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Reportées</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.reportees}</p>
//               </div>
//               <Clock className="w-6 h-6 text-orange-500" />
//             </div>
//           </div>
          
//           {/* Annulées */}
//           <div className="bg-white  shadow-sm py-3 px-5 border-l-4 border-red-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Annulées</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.annulees}</p>
//               </div>
//               <XCircle className="w-6 h-6 text-red-500" />
//             </div>
//           </div>
//         </div>

//         {/* Période affichée */}
//         <div className="mb-4 pb-2 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <Calendar className="w-5 h-5 text-gray-500" />
//             Période du {formatDateFr(dateDebut)} au {formatDateFr(dateFin)}
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             {visites.length} visite{visites.length > 1 ? 's' : ''} trouvée{visites.length > 1 ? 's' : ''}
//           </p>
//         </div>

//         {/* Tableau des visites */}
//         <div className="bg-white  shadow-sm overflow-hidden border border-gray-200">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
//             </div>
//           ) : visites.length === 0 ? (
//             <div className="text-center py-12">
//               <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500">Aucune visite trouvée pour cette période</p>
//               <p className="text-sm text-gray-400 mt-1">Essayez de modifier les dates</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Heure</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Nom du Visiteur</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Téléphone</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Motif</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Membre</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Statut</th>
//                     {/* <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Créé par</th> */}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {visites.map((visite) => (
//                     <tr key={visite.id} className="hover:bg-gray-50 transition">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm font-medium text-gray-900">{formatDateTable(visite.date_visite)}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm text-gray-900">{visite.heure}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <UserCircle className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <Phone className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm text-gray-600">{visite.telephone}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-gray-700">{getMotifDisplay(visite)}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs rounded-full ${visite.est_membre ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
//                           {visite.est_membre ? 'Membre' : 'Non-membre'}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatutColor(visite.statut)}`}>
//                           {getStatutIcon(visite.statut)}
//                           {visite.statut}
//                         </span>
//                        </td>
                  
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Légende des statuts */}
//         <div className="mt-6 flex flex-wrap gap-4 justify-center">
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
//             <span className="text-xs text-gray-600">En attente</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-green-500"></span>
//             <span className="text-xs text-gray-600">Reçue/Confirmée</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-orange-500"></span>
//             <span className="text-xs text-gray-600">Reportée</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-red-500"></span>
//             <span className="text-xs text-gray-600">Annulée</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/historique/page.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Phone,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getAllVisites } from '@/actions/visites';

// Types
interface Visite {
  id: number;
  nom_visiteur: string;
  telephone: string;
  sexe: string;
  est_membre: boolean;
  membre_id: number | null;
  motif: string;
  autre_motif: string | null;
  date_visite: string;
  heure: string;
  observations: string | null;
  statut: string;
  cree_par: number;
  cree_par_nom?: string;
  membre?: {
    nom_complet: string;
    membre_profile: string;
  };
}

interface Statistiques {
  total: number;
  recues: number;
  en_attente: number;
  annulees: number;
  reportees: number;
}

export default function HistoriquePage() {
  const [visites, setVisites] = useState<Visite[]>([]);
  const [filteredVisites, setFilteredVisites] = useState<Visite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Filtres
  const [dateDebut, setDateDebut] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return format(date, 'yyyy-MM-dd');
  });
  const [dateFin, setDateFin] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const [searchTerm, setSearchTerm] = useState('');
  const [statutFilter, setStatutFilter] = useState('Tous');

  // Statistiques
  const [stats, setStats] = useState<Statistiques>({
    total: 0,
    recues: 0,
    en_attente: 0,
    annulees: 0,
    reportees: 0
  });

  // Formater la date
  const formatDateFr = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return format(date, 'dd MMM yyyy', { locale: fr });
    } catch {
      return '';
    }
  };

  const formatDateTable = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return format(date, 'dd/MM/yyyy');
    } catch {
      return '';
    }
  };

  // Charger toutes les visites (UNE SEULE FOIS)
  useEffect(() => {
    if (hasLoaded) return;

    const loadVisites = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('📊 Chargement des visites...');
        const result = await getAllVisites();
        
        if (result.success && result.data) {
          console.log(`✅ ${result.data.length} visites chargées`);
          setVisites(result.data as Visite[]);
        } else {
          setError(result.error || 'Erreur lors du chargement');
        }
      } catch (error) {
        console.error('❌ Erreur:', error);
        setError('Impossible de charger les visites');
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    };

    loadVisites();
  }, [hasLoaded]);

  // Appliquer les filtres (dates, recherche, statut)
  const applyFilters = useCallback(() => {
    let filtered = [...visites];

    // Filtre par date
    filtered = filtered.filter(visite => {
      const visiteDate = visite.date_visite;
      return visiteDate >= dateDebut && visiteDate <= dateFin;
    });

    // Recherche par nom ou téléphone
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(v => 
        v.nom_visiteur.toLowerCase().includes(term) ||
        v.telephone.includes(term)
      );
    }

    // Filtre par statut
    if (statutFilter !== 'Tous') {
      filtered = filtered.filter(v => {
        if (statutFilter === 'Reçue/Confirmée') {
          return v.statut === 'Reçue' || v.statut === 'Confirmée';
        }
        return v.statut === statutFilter;
      });
    }

    setFilteredVisites(filtered);
    setCurrentPage(1);

    // Calculer les statistiques
    const recues = filtered.filter(v => v.statut === 'Reçue' || v.statut === 'Confirmée').length;
    const en_attente = filtered.filter(v => v.statut === 'En attente').length;
    const annulees = filtered.filter(v => v.statut === 'Annulé' || v.statut === 'Annulée').length;
    const reportees = filtered.filter(v => v.statut === 'Reportée').length;

    setStats({
      total: filtered.length,
      recues,
      en_attente,
      annulees,
      reportees
    });
  }, [visites, dateDebut, dateFin, searchTerm, statutFilter]);

  // Appliquer les filtres quand les dépendances changent
  useEffect(() => {
    if (visites.length > 0) {
      applyFilters();
    }
  }, [applyFilters, visites.length]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVisites.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVisites.length / itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmée': return 'bg-green-100 text-green-800';
      case 'Reçue': return 'bg-green-100 text-green-800';
      case 'Reportée': return 'bg-orange-100 text-orange-800';
      case 'Annulé':
      case 'Annulée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMotifDisplay = (visite: Visite) => {
    return visite.motif === 'Autre' && visite.autre_motif ? visite.autre_motif : visite.motif;
  };

  // Reset filters
  const resetFilters = () => {
    const firstDay = new Date();
    firstDay.setDate(1);
    setDateDebut(format(firstDay, 'yyyy-MM-dd'));
    setDateFin(format(new Date(), 'yyyy-MM-dd'));
    setSearchTerm('');
    setStatutFilter('Tous');
  };

  // Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin border-4 border-solid rounded-full border-gray-300 border-t-gray-600"></div>
          <p className="mt-4 text-sm text-gray-500">Chargement des visites...</p>
        </div>
      </div>
    );
  }

  // Erreur
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => {
              setHasLoaded(false);
              setLoading(true);
              setError(null);
            }} 
            className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Filtres */}
        <div className="bg-white border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Filtres</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                Date début
              </label>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                Date fin
              </label>
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                Recherche
              </label>
              <input
                type="text"
                placeholder="Nom ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                Statut
              </label>
              <select
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="Tous">Tous</option>
                <option value="En attente">En attente</option>
                <option value="Reçue/Confirmée">Reçue / Confirmée</option>
                <option value="Reportée">Reportée</option>
                <option value="Annulée">Annulée</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Total:</span> {visites.length} visites
              {filteredVisites.length !== visites.length && (
                <span className="ml-2">
                  <span className="font-semibold text-gray-700">Filtré:</span> {filteredVisites.length}
                </span>
              )}
            </p>
            <button
              onClick={resetFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Reçues</p>
                <p className="text-2xl font-bold text-green-600">{stats.recues}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.en_attente}</p>
              </div>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Reportées</p>
                <p className="text-2xl font-bold text-orange-600">{stats.reportees}</p>
              </div>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Annulées</p>
                <p className="text-2xl font-bold text-red-600">{stats.annulees}</p>
              </div>
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
          </div>
        </div>

        {/* Période */}
        <div className="mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            {formatDateFr(dateDebut)} - {formatDateFr(dateFin)}
          </h2>
        </div>

        {/* Tableau */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Heure</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Visiteur</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Téléphone</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Motif</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Membre</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">Aucune visite trouvée</p>
                      <p className="text-xs text-gray-400 mt-1">Essayez de modifier les filtres</p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((visite, index) => (
                    <tr 
                      key={visite.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-700">{formatDateTable(visite.date_visite)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-700">{visite.heure}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{visite.telephone}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{getMotifDisplay(visite)}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2 py-0.5 ${
                          visite.est_membre ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {visite.est_membre ? 'Membre' : 'Non-membre'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${getStatutColor(visite.statut)}`}>
                          {visite.statut}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredVisites.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredVisites.length)} sur {filteredVisites.length}
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 border border-gray-300 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <span className="text-xs text-gray-600 px-2">
                Page {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 border border-gray-300 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}