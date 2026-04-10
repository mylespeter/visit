
// 'use client';

// import { useState, useEffect } from 'react';
// import { format, parseISO, addDays, subDays, getDay } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import { 
//   Plus, 
//   CheckCircle, 
//   XCircle, 
//   Edit2, 
//   Calendar, 
//   Users, 
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   Trash2,
//   TrendingUp,
//   X,
//   Check
// } from 'lucide-react';
// import { 
//   createVisite, 
//   updateStatut, 
//   getVisitesParDate,
//   checkVisiteurExists,
//   updateVisite,
//   annulerVisite,
//   marquerCommeRecu
// } from '@/actions/visites';
// import { getConfiguration } from '@/actions/configuration';

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
//   membre?: {
//     nom_complet: string;
//     membre_profile: string;
//   };
// }

// interface Statistiques {
//   total: number;
//   en_attente: number;
//   recus: number;
//   annules: number;
//   quota: number;
// }

// // Fonction pour obtenir le prochain mardi ou mercredi
// function getNextValidDate(date: Date): Date {
//   const dayOfWeek = getDay(date);
//   // Dimanche=0, Lundi=1, Mardi=2, Mercredi=3, Jeudi=4, Vendredi=5, Samedi=6
  
//   if (dayOfWeek === 2 || dayOfWeek === 3) {
//     return date;
//   } else if (dayOfWeek < 2) {
//     // Dimanche ou Lundi -> prochain mardi
//     return addDays(date, 2 - dayOfWeek);
//   } else {
//     // Jeudi, Vendredi, Samedi -> prochain mardi
//     return addDays(date, (9 - dayOfWeek));
//   }
// }

// // Fonction pour vérifier si une date est valide (mardi ou mercredi)
// function isValidVisitDate(date: Date): boolean {
//   const dayOfWeek = getDay(date);
//   return dayOfWeek === 2 || dayOfWeek === 3;
// }

// export default function VisitesPage() {
//   const [currentDate, setCurrentDate] = useState(getNextValidDate(new Date()));
//   const [visites, setVisites] = useState<Visite[]>([]);
//   const [stats, setStats] = useState<Statistiques>({
//     total: 0,
//     en_attente: 0,
//     recus: 0,
//     annules: 0,
//     quota: 50
//   });
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingVisite, setEditingVisite] = useState<Visite | null>(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [config, setConfig] = useState<any>({});
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [visiteToConfirm, setVisiteToConfirm] = useState<number | null>(null);
//   const [showAnnulerModal, setShowAnnulerModal] = useState(false);
//   const [visiteToAnnuler, setVisiteToAnnuler] = useState<number | null>(null);
//   const [annulerCommentaire, setAnnulerCommentaire] = useState('');

//   const [formData, setFormData] = useState({
//     nom_visiteur: '',
//     telephone: '',
//     email: '',
//     est_membre: true,
//     motif: '',
//     autre_motif: '',
//     date_visite: format(getNextValidDate(new Date()), 'yyyy-MM-dd'),
//     heure: '12:00',
//     observations: ''
//   });

//   // Charger la configuration
//   useEffect(() => {
//     const loadConfig = async () => {
//       const result = await getConfiguration();
//       if (result.success) {
//         const configObj: any = {};
//         result.data?.forEach((item: any) => {
//           configObj[item.cle] = item.valeur;
//         });
//         setConfig(configObj);
//         setStats(prev => ({ ...prev, quota: parseInt(configObj.quota_journalier || '20') }));
//       }
//     };
//     loadConfig();
//   }, []);

//   // Charger les visites
//   const loadVisites = async () => {
//     setLoading(true);
//     const dateStr = format(currentDate, 'yyyy-MM-dd');
    
//     const result = await getVisitesParDate(dateStr);
    
//     if (result.success && result.data) {
//       setVisites(result.data as Visite[]);
      
//       // Calculer les statistiques
//       const en_attente = (result.data as Visite[]).filter((v: Visite) => v.statut === 'En attente').length;
//       const recus = (result.data as Visite[]).filter((v: Visite) => v.statut === 'Reçue').length;
//       const annules = (result.data as Visite[]).filter((v: Visite) => v.statut === 'Annulée').length;
      
//       setStats(prev => ({
//         ...prev,
//         total: (result.data as Visite[]).length,
//         en_attente,
//         recus,
//         annules
//       }));
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadVisites();
//   }, [currentDate]);

//   // Changement de date avec validation (reste sur mardi/mercredi)
//   const previousDay = () => {
//     let newDate = subDays(currentDate, 1);
//     while (!isValidVisitDate(newDate)) {
//       newDate = subDays(newDate, 1);
//     }
//     setCurrentDate(newDate);
//   };
  
//   const nextDay = () => {
//     let newDate = addDays(currentDate, 1);
//     while (!isValidVisitDate(newDate)) {
//       newDate = addDays(newDate, 1);
//     }
//     setCurrentDate(newDate);
//   };
  
//   const today = () => {
//     const todayDate = new Date();
//     if (isValidVisitDate(todayDate)) {
//       setCurrentDate(todayDate);
//     } else {
//       setCurrentDate(getNextValidDate(todayDate));
//     }
//   };

//   // Gestion du changement de date dans le formulaire
//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedDate = new Date(e.target.value);
    
//     if (isValidVisitDate(selectedDate)) {
//       setFormData({...formData, date_visite: e.target.value});
//       setError('');
//     } else {
//       const nextValid = getNextValidDate(selectedDate);
//       const nextValidStr = format(nextValid, 'yyyy-MM-dd');
//       const dayName = format(nextValid, 'EEEE', { locale: fr });
      
//       setError(`❌ Les visites ont lieu uniquement les MARDIS et MERCREDIS. Prochaine date disponible : ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })}`);
      
//       // Optionnel : proposer automatiquement la date corrigée
//       if (confirm(`Voulez-vous utiliser le ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })} à la place ?`)) {
//         setFormData({...formData, date_visite: nextValidStr});
//         setError('');
//       }
//     }
//   };

//   // Ouvrir le modal de confirmation pour marquer comme reçu
//   const openConfirmModal = (id: number) => {
//     setVisiteToConfirm(id);
//     setShowConfirmModal(true);
//   };

//   // Marquer comme reçu
//   const marquerRecu = async () => {
//     if (!visiteToConfirm) return;
    
//     const result = await marquerCommeRecu(visiteToConfirm);
//     if (result.success) {
//       loadVisites();
//     } else {
//       setError(result.error || 'Erreur lors du marquage');
//     }
//     setShowConfirmModal(false);
//     setVisiteToConfirm(null);
//   };

//   // Ouvrir le modal d'annulation
//   const openAnnulerModal = (id: number) => {
//     setVisiteToAnnuler(id);
//     setAnnulerCommentaire('');
//     setShowAnnulerModal(true);
//   };

//   // Annuler visite
//   const confirmerAnnulation = async () => {
//     if (!visiteToAnnuler) return;
    
//     const result = await annulerVisite(visiteToAnnuler, annulerCommentaire);
//     if (result.success) {
//       loadVisites();
//       setShowAnnulerModal(false);
//       setVisiteToAnnuler(null);
//       setAnnulerCommentaire('');
//     } else {
//       setError(result.error || 'Erreur lors de l\'annulation');
//     }
//   };

//   // Ouvrir le modal pour modifier (remplit le formulaire)
//   const openEditModal = (visite: Visite) => {
//     setEditingVisite(visite);
//     setFormData({
//       nom_visiteur: visite.nom_visiteur,
//       telephone: visite.telephone,
//       email: '',
//       est_membre: visite.est_membre,
//       motif: visite.motif,
//       autre_motif: visite.autre_motif || '',
//       date_visite: visite.date_visite,
//       heure: visite.heure,
//       observations: visite.observations || ''
//     });
//     setShowModal(true);
//   };

//   // Fermer le modal et réinitialiser
//   const closeModal = () => {
//     setShowModal(false);
//     setEditingVisite(null);
//     setError('');
//     setFormData({
//       nom_visiteur: '',
//       telephone: '',
//       email: '',
//       est_membre: true,
//       motif: '',
//       autre_motif: '',
//       date_visite: format(getNextValidDate(currentDate), 'yyyy-MM-dd'),
//       heure: '12:00',
//       observations: ''
//     });
//   };

//   // Créer ou modifier une visite
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError('');

//     // Vérifier si la date est valide
//     const selectedDate = new Date(formData.date_visite);
//     if (!isValidVisitDate(selectedDate)) {
//       setError('❌ Les visites pastorales ont lieu uniquement les MARDIS et MERCREDIS');
//       setSubmitting(false);
//       return;
//     }

//     // Vérifier si le visiteur existe déjà (uniquement pour nouvelle visite)
//     if (!editingVisite) {
//       const checkResult = await checkVisiteurExists(formData.date_visite, formData.telephone);
//       if (checkResult.exists) {
//         setError('Ce numéro de téléphone a déjà un rendez-vous pour cette date');
//         setSubmitting(false);
//         return;
//       }
//     }

//     const formDataObj = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null && value !== undefined) {
//         formDataObj.append(key, value.toString());
//       }
//     });

//     let result;
//     if (editingVisite) {
//       formDataObj.append('id', editingVisite.id.toString());
//       result = await updateVisite(formDataObj);
//     } else {
//       result = await createVisite(formDataObj);
//     }
    
//     if (result.success) {
//       closeModal();
//       loadVisites();
//     } else {
//       setError(result.error || `Erreur lors de la ${editingVisite ? 'modification' : 'création'}`);
//     }
//     setSubmitting(false);
//   };

//   const getStatutColor = (statut: string) => {
//     switch(statut) {
//       case 'En attente': return 'bg-yellow-100 text-yellow-800';
//       case 'Reçue': return 'bg-green-100 text-green-800';
//       case 'Annulée': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
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

//   const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
//   const placesRestantes = stats.quota - stats.total;
//   const pourcentage = (stats.total / stats.quota) * 100;
  
//   // Déterminer la couleur de la barre de progression
//   const getProgressBarColor = () => {
//     if (pourcentage >= 100) return 'bg-red-500';
//     if (pourcentage >= 80) return 'bg-orange-500';
//     if (pourcentage >= 60) return 'bg-yellow-500';
//     return 'bg-green-500';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Header avec navigation des dates */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={previousDay}
//               className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition group"
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
//               <span className="text-sm text-gray-600 hidden sm:inline">
//                 {format(subDays(currentDate, 1), 'dd/MM', { locale: fr })}
//               </span>
//             </button>
            
//             <button
//               onClick={today}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
//                 isToday 
//                   ? 'bg-blue-600 text-white shadow-sm' 
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               <Calendar className="w-4 h-4" />
//               <span>
//                 {isToday ? "Aujourd'hui" : format(currentDate, 'EEEE d MMMM', { locale: fr })}
//               </span>
//             </button>
            
//             <button
//               onClick={nextDay}
//               className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition group"
//             >
//               <span className="text-sm text-gray-600 hidden sm:inline">
//                 {format(addDays(currentDate, 1), 'dd/MM', { locale: fr })}
//               </span>
//               <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
//             </button>
//           </div>
          
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-green-600 text-sm hover:bg-green-700 text-white px-4 py-2  flex items-center gap-2 transition shadow-sm"
//           >
//             <Plus className="w-3 h-3" />
//             Nouvelle Visite
//           </button>
//         </div>

//         {/* Quota avec barre de progression */}
//         <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
//           <div className="flex justify-between items-start mb-3">
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-1">
//                 <TrendingUp className="w-5 h-5 text-gray-500" />
//                 <span className="text-sm font-medium text-gray-600">
//                   Quota journalier
//                 </span>
//                 {isToday && (
//                   <span className={`text-xs px-2 py-0.5 rounded-full ${
//                     placesRestantes <= 0 ? 'bg-red-100 text-red-700' : 
//                     placesRestantes <= 5 ? 'bg-orange-100 text-orange-700' : 
//                     'bg-green-100 text-green-700'
//                   }`}>
//                     {placesRestantes <= 0 ? 'Complet' : `${placesRestantes} places restantes`}
//                   </span>
//                 )}
//               </div>
              
//               <div className="flex items-baseline gap-2">
//                 <span className="text-3xl font-bold text-gray-800">{stats.total}</span>
//                 <span className="text-lg text-gray-500">/ {stats.quota}</span>
//                 <span className="text-sm text-gray-500 ml-2">
//                   ({Math.round(pourcentage)}%)
//                 </span>
//               </div>
//             </div>
            
//             {!isToday && (
//               <div className="text-right">
//                 <p className="text-sm text-gray-500">Total visites</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
//               </div>
//             )}
//           </div>
          
//           {/* Barre de progression */}
//           {isToday && (
//             <div className="mt-3">
//               <div className="w-full bg-gray-200  h-2 overflow-hidden">
//                 <div 
//                   className={`h-2  transition-all duration-500 ease-out ${getProgressBarColor()}`}
//                   style={{ width: `${Math.min(pourcentage, 100)}%` }}
//                 />
//               </div>
//               {pourcentage >= 100 && (
//                 <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
//                   <XCircle className="w-3 h-3" />
//                   Quota atteint ! Impossible d'ajouter de nouvelles visites pour aujourd'hui.
//                 </p>
//               )}
//               {pourcentage >= 80 && pourcentage < 100 && (
//                 <p className="text-xs text-orange-600 mt-2">
//                   Attention : Plus que {placesRestantes} place{placesRestantes > 1 ? 's' : ''} disponible{placesRestantes > 1 ? 's' : ''}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Cartes statistiques */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {/* Total */}
//           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-blue-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total visites</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
//               </div>
//               <Users className="w-6 h-6 text-blue-500" />
//             </div>
//           </div>
          
//           {/* En attente */}
//           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-yellow-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">En attente</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.en_attente}</p>
//               </div>
//               <Clock className="w-6 h-6 text-yellow-500" />
//             </div>
//           </div>
          
//           {/* Reçues */}
//           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-green-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Reçues</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.recus}</p>
//               </div>
//               <CheckCircle className="w-6 h-6 text-green-500" />
//             </div>
//           </div>
          
//           {/* Annulées */}
//           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-red-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Annulées</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.annules}</p>
//               </div>
//               <XCircle className="w-6 h-6 text-red-500" />
//             </div>
//           </div>
//         </div>

//         {/* Date détaillée */}
//         <div className="mb-4 pb-2 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <Calendar className="w-5 h-5 text-gray-500" />
//             {format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })}
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             {visites.length} visite{visites.length > 1 ? 's' : ''} programmée{visites.length > 1 ? 's' : ''}
//           </p>
//         </div>

//         {/* Tableau des visites */}
//         <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
//             </div>
//           ) : visites.length === 0 ? (
//             <div className="text-center py-12">
//               <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500">Aucune visite prévue pour cette journée</p>
//               {isToday && pourcentage < 100 && (
//                 <button
//                   onClick={() => setShowModal(true)}
//                   className="mt-4 text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Programmer une visite
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Heure</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Nom du Visiteur</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Membre</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Téléphone</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Motif</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Statut</th>
//                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {visites.map((visite) => (
//                     <tr key={visite.id} className="hover:bg-gray-50 transition">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm font-medium text-gray-900">{visite.heure}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs l ${visite.est_membre ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>
//                           {visite.est_membre ? 'Membre' : 'Non-membre'}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visite.telephone}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-gray-700">{visite.motif}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs text-bo font-semibold ${getStatutColor(visite.statut)}`}>
//                           {visite.statut}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center ">
//                           {visite.statut === 'En attente' && (
//                             <button
//                               onClick={() => openConfirmModal(visite.id)}
//                               className="p-1 bg-green-600 hover:bg-green-700  transition"
//                               title="Marquer comme reçu"
//                             >
//                               <Check className="w-5 h-5 text-white" />
//                             </button>
//                           )}
//                           <button
//                             onClick={() => openEditModal(visite)}
//                             className="p-1 bg-blue-600 hover:bg-blue-700  transition"
//                             title="Modifier"
//                           >
//                             <Edit2 className="w-5 h-5 text-white" />
//                           </button>
//                           {visite.statut !== 'Annulée' && (
//                             <button
//                               onClick={() => openAnnulerModal(visite.id)}
//                               className="p-1 bg-red-600 hover:bg-red-700  transition"
//                               title="Annuler"
//                             >
//                               <X className="w-5 h-5 text-white" />
//                             </button>
//                           )}
//                         </div>
//                        </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Indication des jours */}
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-500">
//             📅 Les visites pastorales ont lieu les <span className="font-semibold">Mardis</span> et <span className="font-semibold">Mercredis</span>
//           </p>
//         </div>
//       </div>

//       {/* Modal de confirmation pour marquer comme reçu */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white shadow-xl max-w-md w-full">
//             <div className="bg-green-600 text-white px-6 py-4">
//               <h2 className="text-lg font-semibold">Confirmation</h2>
//             </div>
//             <div className="p-6">
//               <p className="text-gray-700">Êtes-vous sûr de vouloir marquer cette visite comme reçue ?</p>
//             </div>
//             <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setShowConfirmModal(false);
//                   setVisiteToConfirm(null);
//                 }}
//                 className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
//               >
//                 Annuler
//               </button>
//               <button
//                 onClick={marquerRecu}
//                 className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white transition font-medium flex items-center gap-2"
//               >
//                 <Check className="w-4 h-4" />
//                 Marquer comme reçu
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal d'annulation */}
//       {showAnnulerModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white shadow-xl max-w-md w-full">
//             <div className="bg-red-600 text-white px-6 py-4">
//               <h2 className="text-lg font-semibold">Annuler la visite</h2>
//             </div>
//             <div className="p-6">
//               <p className="text-gray-700 mb-4">Êtes-vous sûr de vouloir annuler cette visite ?</p>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Commentaire (optionnel)
//               </label>
//               <textarea
//                 value={annulerCommentaire}
//                 onChange={(e) => setAnnulerCommentaire(e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                 placeholder="Raison de l'annulation..."
//               />
//             </div>
//             <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setShowAnnulerModal(false);
//                   setVisiteToAnnuler(null);
//                   setAnnulerCommentaire('');
//                 }}
//                 className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
//               >
//                 Retour
//               </button>
//               <button
//                 onClick={confirmerAnnulation}
//                 className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white transition font-medium flex items-center gap-2"
//               >
//                 <X className="w-4 h-4" />
//                 Confirmer l'annulation
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal Nouvelle Visite */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-blue-600 text-white border-b border-gray-200 px-6 py-4">
//               <h2 className="text-lg font-semibold">
//                 {editingVisite ? 'Modifier la visite' : 'Créer une Nouvelle Visite'}
//               </h2>
//             </div>
            
//             <form onSubmit={handleSubmit} className="p-6">
//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-5">
//                   {error}
//                 </div>
//               )}
              
//               <div className="grid grid-cols-2 gap-x-5 gap-y-4">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Nom du Visiteur <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.nom_visiteur}
//                       onChange={(e) => setFormData({...formData, nom_visiteur: e.target.value})}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Entrez le nom complet"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Téléphone <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={formData.telephone}
//                       onChange={(e) => setFormData({...formData, telephone: e.target.value})}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Numéro de téléphone"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({...formData, email: e.target.value})}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="adresse@email.com"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Membre <span className="text-red-500">*</span>
//                     </label>
//                     <div className="flex gap-4">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           checked={formData.est_membre === true}
//                           onChange={() => setFormData({...formData, est_membre: true})}
//                           className="w-4 h-4 text-blue-600"
//                         />
//                         <span className="text-sm text-gray-700">Oui</span>
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           checked={formData.est_membre === false}
//                           onChange={() => setFormData({...formData, est_membre: false})}
//                           className="w-4 h-4 text-blue-600"
//                         />
//                         <span className="text-sm text-gray-700">Non</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Motif <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       required
//                       value={formData.motif}
//                       onChange={(e) => setFormData({...formData, motif: e.target.value})}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">Sélectionner un motif</option>
//                       <option value="Conseil">Conseil</option>
//                       <option value="Prière">Prière</option>
//                       <option value="Orientation">Orientation</option>
//                       <option value="Autre">Autre</option>
//                     </select>
//                   </div>
                  
//                   {formData.motif === 'Autre' && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Précisez le motif
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.autre_motif}
//                         onChange={(e) => setFormData({...formData, autre_motif: e.target.value})}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Décrivez le motif"
//                       />
//                     </div>
//                   )}
                  
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Date <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         required
//                         value={formData.date_visite}
//                         onChange={handleDateChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Heure <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="time"
//                         required
//                         value={formData.heure}
//                         onChange={(e) => setFormData({...formData, heure: e.target.value})}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Notes
//                     </label>
//                     <textarea
//                       value={formData.observations}
//                       onChange={(e) => setFormData({...formData, observations: e.target.value})}
//                       rows={3}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                       placeholder="Ajouter des notes..."
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-6 pt-4 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting || (isToday && stats.total >= stats.quota && !editingVisite)}
//                   className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
//                 >
//                   {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
//                   {editingVisite ? 'Mettre à jour' : 'Créer la visite'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, addDays, subDays, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Plus, 
  CheckCircle, 
  XCircle, 
  Edit2, 
  Calendar, 
  Users, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  TrendingUp,
  X,
  Check,
  Download
} from 'lucide-react';
import { 
  createVisite, 
  updateStatut, 
  getVisitesParDate,
  checkVisiteurExists,
  updateVisite,
  annulerVisite,
  marquerCommeRecu
} from '@/actions/visites';
import { getConfiguration } from '@/actions/configuration';
import * as XLSX from 'xlsx';

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
  membre?: {
    nom_complet: string;
    membre_profile: string;
  };
}

interface Statistiques {
  total: number;
  en_attente: number;
  recus: number;
  annules: number;
  quota: number;
}

// Fonction pour obtenir le prochain mardi ou mercredi
function getNextValidDate(date: Date): Date {
  const dayOfWeek = getDay(date);
  // Dimanche=0, Lundi=1, Mardi=2, Mercredi=3, Jeudi=4, Vendredi=5, Samedi=6
  
  if (dayOfWeek === 2 || dayOfWeek === 3) {
    return date;
  } else if (dayOfWeek < 2) {
    // Dimanche ou Lundi -> prochain mardi
    return addDays(date, 2 - dayOfWeek);
  } else {
    // Jeudi, Vendredi, Samedi -> prochain mardi
    return addDays(date, (9 - dayOfWeek));
  }
}

// Fonction pour vérifier si une date est valide (mardi ou mercredi)
function isValidVisitDate(date: Date): boolean {
  const dayOfWeek = getDay(date);
  return dayOfWeek === 2 || dayOfWeek === 3;
}

export default function VisitesPage() {
  const [currentDate, setCurrentDate] = useState(getNextValidDate(new Date()));
  const [visites, setVisites] = useState<Visite[]>([]);
  const [stats, setStats] = useState<Statistiques>({
    total: 0,
    en_attente: 0,
    recus: 0,
    annules: 0,
    quota: 50
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVisite, setEditingVisite] = useState<Visite | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [config, setConfig] = useState<any>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [visiteToConfirm, setVisiteToConfirm] = useState<number | null>(null);
  const [showAnnulerModal, setShowAnnulerModal] = useState(false);
  const [visiteToAnnuler, setVisiteToAnnuler] = useState<number | null>(null);
  const [annulerCommentaire, setAnnulerCommentaire] = useState('');

  const [formData, setFormData] = useState({
    nom_visiteur: '',
    telephone: '',
    email: '',
    est_membre: true,
    motif: '',
    autre_motif: '',
    date_visite: format(getNextValidDate(new Date()), 'yyyy-MM-dd'),
    heure: '12:00',
    observations: ''
  });

  // Charger la configuration
  useEffect(() => {
    const loadConfig = async () => {
      const result = await getConfiguration();
      if (result.success) {
        const configObj: any = {};
        result.data?.forEach((item: any) => {
          configObj[item.cle] = item.valeur;
        });
        setConfig(configObj);
        setStats(prev => ({ ...prev, quota: parseInt(configObj.quota_journalier || '20') }));
      }
    };
    loadConfig();
  }, []);

  // Charger les visites
  const loadVisites = async () => {
    setLoading(true);
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    
    const result = await getVisitesParDate(dateStr);
    
    if (result.success && result.data) {
      setVisites(result.data as Visite[]);
      
      // Calculer les statistiques
      const en_attente = (result.data as Visite[]).filter((v: Visite) => v.statut === 'En attente').length;
      const recus = (result.data as Visite[]).filter((v: Visite) => v.statut === 'Reçue').length;
      const annules = (result.data as Visite[]).filter((v: Visite) => v.statut === 'Annulée').length;
      
      setStats(prev => ({
        ...prev,
        total: (result.data as Visite[]).length,
        en_attente,
        recus,
        annules
      }));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadVisites();
  }, [currentDate]);

  // Changement de date avec validation (reste sur mardi/mercredi)
  const previousDay = () => {
    let newDate = subDays(currentDate, 1);
    while (!isValidVisitDate(newDate)) {
      newDate = subDays(newDate, 1);
    }
    setCurrentDate(newDate);
  };
  
  const nextDay = () => {
    let newDate = addDays(currentDate, 1);
    while (!isValidVisitDate(newDate)) {
      newDate = addDays(newDate, 1);
    }
    setCurrentDate(newDate);
  };
  
  const today = () => {
    const todayDate = new Date();
    if (isValidVisitDate(todayDate)) {
      setCurrentDate(todayDate);
    } else {
      setCurrentDate(getNextValidDate(todayDate));
    }
  };

  // Gestion du changement de date dans le formulaire
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    
    if (isValidVisitDate(selectedDate)) {
      setFormData({...formData, date_visite: e.target.value});
      setError('');
    } else {
      const nextValid = getNextValidDate(selectedDate);
      const nextValidStr = format(nextValid, 'yyyy-MM-dd');
      const dayName = format(nextValid, 'EEEE', { locale: fr });
      
      setError(`❌ Les visites ont lieu uniquement les MARDIS et MERCREDIS. Prochaine date disponible : ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })}`);
      
      // Optionnel : proposer automatiquement la date corrigée
      if (confirm(`Voulez-vous utiliser le ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })} à la place ?`)) {
        setFormData({...formData, date_visite: nextValidStr});
        setError('');
      }
    }
  };

  // Fonction d'export Excel
  const exportToExcel = () => {
    if (visites.length === 0) {
      alert('Aucune donnée à exporter pour cette date');
      return;
    }

    // Préparer les données pour l'export
    const exportData = visites.map(visite => ({
      'Heure': visite.heure,
      'Nom du Visiteur': visite.nom_visiteur,
      'Type': visite.est_membre ? 'Membre' : 'Non-membre',
      'Téléphone': visite.telephone,
      'Motif': visite.motif === 'Autre' ? visite.autre_motif || 'Autre' : visite.motif,
      'Statut': visite.statut,
      'Observations': visite.observations || '',
      'Date': format(new Date(visite.date_visite), 'dd/MM/yyyy'),
      'Jour': format(new Date(visite.date_visite), 'EEEE', { locale: fr })
    }));

    // Créer un classeur
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Ajuster la largeur des colonnes
    const colWidths = [
      { wch: 10 }, // Heure
      { wch: 25 }, // Nom
      { wch: 15 }, // Type
      { wch: 15 }, // Téléphone
      { wch: 20 }, // Motif
      { wch: 12 }, // Statut
      { wch: 30 }, // Observations
      { wch: 12 }, // Date
      { wch: 12 }  // Jour
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Visites_${format(currentDate, 'dd-MM-yyyy')}`);
    
    // Télécharger le fichier
    XLSX.writeFile(wb, `visites_${format(currentDate, 'yyyy-MM-dd')}.xlsx`);
  };

  // Ouvrir le modal de confirmation pour marquer comme reçu
  const openConfirmModal = (id: number) => {
    setVisiteToConfirm(id);
    setShowConfirmModal(true);
  };

  // Marquer comme reçu
  const marquerRecu = async () => {
    if (!visiteToConfirm) return;
    
    const result = await marquerCommeRecu(visiteToConfirm);
    if (result.success) {
      loadVisites();
    } else {
      setError(result.error || 'Erreur lors du marquage');
    }
    setShowConfirmModal(false);
    setVisiteToConfirm(null);
  };

  // Ouvrir le modal d'annulation
  const openAnnulerModal = (id: number) => {
    setVisiteToAnnuler(id);
    setAnnulerCommentaire('');
    setShowAnnulerModal(true);
  };

  // Annuler visite
  const confirmerAnnulation = async () => {
    if (!visiteToAnnuler) return;
    
    const result = await annulerVisite(visiteToAnnuler, annulerCommentaire);
    if (result.success) {
      loadVisites();
      setShowAnnulerModal(false);
      setVisiteToAnnuler(null);
      setAnnulerCommentaire('');
    } else {
      setError(result.error || 'Erreur lors de l\'annulation');
    }
  };

  // Ouvrir le modal pour modifier (remplit le formulaire)
  const openEditModal = (visite: Visite) => {
    setEditingVisite(visite);
    setFormData({
      nom_visiteur: visite.nom_visiteur,
      telephone: visite.telephone,
      email: '',
      est_membre: visite.est_membre,
      motif: visite.motif,
      autre_motif: visite.autre_motif || '',
      date_visite: visite.date_visite,
      heure: visite.heure,
      observations: visite.observations || ''
    });
    setShowModal(true);
  };

  // Fermer le modal et réinitialiser
  const closeModal = () => {
    setShowModal(false);
    setEditingVisite(null);
    setError('');
    setFormData({
      nom_visiteur: '',
      telephone: '',
      email: '',
      est_membre: true,
      motif: '',
      autre_motif: '',
      date_visite: format(getNextValidDate(currentDate), 'yyyy-MM-dd'),
      heure: '12:00',
      observations: ''
    });
  };

  // Créer ou modifier une visite
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // Vérifier si la date est valide
    const selectedDate = new Date(formData.date_visite);
    if (!isValidVisitDate(selectedDate)) {
      setError('❌ Les visites pastorales ont lieu uniquement les MARDIS et MERCREDIS');
      setSubmitting(false);
      return;
    }

    // Vérifier si le visiteur existe déjà (uniquement pour nouvelle visite)
    if (!editingVisite) {
      const checkResult = await checkVisiteurExists(formData.date_visite, formData.telephone);
      if (checkResult.exists) {
        setError('Ce numéro de téléphone a déjà un rendez-vous pour cette date');
        setSubmitting(false);
        return;
      }
    }

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataObj.append(key, value.toString());
      }
    });

    let result;
    if (editingVisite) {
      formDataObj.append('id', editingVisite.id.toString());
      result = await updateVisite(formDataObj);
    } else {
      result = await createVisite(formDataObj);
    }
    
    if (result.success) {
      closeModal();
      loadVisites();
    } else {
      setError(result.error || `Erreur lors de la ${editingVisite ? 'modification' : 'création'}`);
    }
    setSubmitting(false);
  };

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Reçue': return 'bg-green-100 text-green-800';
      case 'Annulée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMotifIcon = (motif: string) => {
    switch(motif) {
      case 'Conseil': return '💬';
      case 'Prière': return '🙏';
      case 'Orientation': return '🎯';
      default: return '📝';
    }
  };

  const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  const placesRestantes = stats.quota - stats.total;
  const pourcentage = (stats.total / stats.quota) * 100;
  
  // Déterminer la couleur de la barre de progression
  const getProgressBarColor = () => {
    if (pourcentage >= 100) return 'bg-red-500';
    if (pourcentage >= 80) return 'bg-orange-500';
    if (pourcentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header avec navigation des dates */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={previousDay}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              <span className="text-sm text-gray-600 hidden sm:inline">
                {format(subDays(currentDate, 1), 'dd/MM', { locale: fr })}
              </span>
            </button>
            
            <button
              onClick={today}
              className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
                isToday 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>
                {isToday ? "Aujourd'hui" : format(currentDate, 'EEEE d MMMM', { locale: fr })}
              </span>
            </button>
            
            <button
              onClick={nextDay}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition group"
            >
              <span className="text-sm text-gray-600 hidden sm:inline">
                {format(addDays(currentDate, 1), 'dd/MM', { locale: fr })}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </button>
          </div>
          
          <div className="flex gap-2">
            {visites.length > 0 && (
              <button
                onClick={exportToExcel}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 flex items-center gap-2 transition shadow-sm text-sm"
              >
                <Download className="w-3 h-3" />
                Excel
              </button>
            )}
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-sm hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2 transition shadow-sm"
            >
              <Plus className="w-3 h-3" />
              Nouvelle Visite
            </button>
          </div>
        </div>

        {/* Quota avec barre de progression */}
        <div className="bg-white shadow-sm p-5 mb-6 border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">
                  Quota journalier
                </span>
                {isToday && (
                  <span className={`text-xs px-2 py-0.5 ${
                    placesRestantes <= 0 ? 'bg-red-100 text-red-700' : 
                    placesRestantes <= 5 ? 'bg-orange-100 text-orange-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {placesRestantes <= 0 ? 'Complet' : `${placesRestantes} places restantes`}
                  </span>
                )}
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-800">{stats.total}</span>
                <span className="text-lg text-gray-500">/ {stats.quota}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({Math.round(pourcentage)}%)
                </span>
              </div>
            </div>
            
            {!isToday && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Total visites</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
            )}
          </div>
          
          {/* Barre de progression */}
          {isToday && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 h-2 overflow-hidden">
                <div 
                  className={`h-2 transition-all duration-500 ease-out ${getProgressBarColor()}`}
                  style={{ width: `${Math.min(pourcentage, 100)}%` }}
                />
              </div>
              {pourcentage >= 100 && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  Quota atteint ! Impossible d'ajouter de nouvelles visites pour aujourd'hui.
                </p>
              )}
              {pourcentage >= 80 && pourcentage < 100 && (
                <p className="text-xs text-orange-600 mt-2">
                  Attention : Plus que {placesRestantes} place{placesRestantes > 1 ? 's' : ''} disponible{placesRestantes > 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total */}
          <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-blue-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total visites</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          
          {/* En attente */}
          <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-yellow-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">En attente</p>
                <p className="text-2xl font-bold text-gray-800">{stats.en_attente}</p>
              </div>
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          
          {/* Reçues */}
          <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-green-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Reçues</p>
                <p className="text-2xl font-bold text-gray-800">{stats.recus}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          
          {/* Annulées */}
          <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-red-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Annulées</p>
                <p className="text-2xl font-bold text-gray-800">{stats.annules}</p>
              </div>
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        {/* Date détaillée */}
        <div className="mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            {format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {visites.length} visite{visites.length > 1 ? 's' : ''} programmée{visites.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Tableau des visites */}
        <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : visites.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune visite prévue pour cette journée</p>
              {isToday && pourcentage < 100 && (
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Programmer une visite
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Heure</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Nom du Visiteur</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Membre</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Téléphone</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Motif</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visites.map((visite) => (
                    <tr key={visite.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{visite.heure}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</div>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs ${visite.est_membre ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>
                          {visite.est_membre ? 'Membre' : 'Non-membre'}
                        </span>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visite.telephone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">{visite.motif}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold ${getStatutColor(visite.statut)}`}>
                          {visite.statut}
                        </span>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {visite.statut === 'En attente' && (
                            <button
                              onClick={() => openConfirmModal(visite.id)}
                              className="p-1 bg-green-600 hover:bg-green-700 transition"
                              title="Marquer comme reçu"
                            >
                              <Check className="w-5 h-5 text-white" />
                            </button>
                          )}
                          <button
                            onClick={() => openEditModal(visite)}
                            className="p-1 bg-blue-600 hover:bg-blue-700 transition"
                            title="Modifier"
                          >
                            <Edit2 className="w-5 h-5 text-white" />
                          </button>
                          {visite.statut !== 'Annulée' && (
                            <button
                              onClick={() => openAnnulerModal(visite.id)}
                              className="p-1 bg-red-600 hover:bg-red-700 transition"
                              title="Annuler"
                            >
                              <X className="w-5 h-5 text-white" />
                            </button>
                          )}
                        </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Indication des jours */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            📅 Les visites pastorales ont lieu les <span className="font-semibold">Mardis</span> et <span className="font-semibold">Mercredis</span>
          </p>
        </div>
      </div>

      {/* Modal de confirmation pour marquer comme reçu */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-xl max-w-md w-full">
            <div className="bg-green-600 text-white px-6 py-4">
              <h2 className="text-lg font-semibold">Confirmation</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">Êtes-vous sûr de vouloir marquer cette visite comme reçue ?</p>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setVisiteToConfirm(null);
                }}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
              >
                Annuler
              </button>
              <button
                onClick={marquerRecu}
                className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white transition font-medium flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Marquer comme reçu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'annulation */}
      {showAnnulerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-xl max-w-md w-full">
            <div className="bg-red-600 text-white px-6 py-4">
              <h2 className="text-lg font-semibold">Annuler la visite</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">Êtes-vous sûr de vouloir annuler cette visite ?</p>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commentaire (optionnel)
              </label>
              <textarea
                value={annulerCommentaire}
                onChange={(e) => setAnnulerCommentaire(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Raison de l'annulation..."
              />
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAnnulerModal(false);
                  setVisiteToAnnuler(null);
                  setAnnulerCommentaire('');
                }}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
              >
                Retour
              </button>
              <button
                onClick={confirmerAnnulation}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white transition font-medium flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Confirmer l'annulation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nouvelle Visite */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-blue-600 text-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold">
                {editingVisite ? 'Modifier la visite' : 'Créer une Nouvelle Visite'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-5">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du Visiteur <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nom_visiteur}
                      onChange={(e) => setFormData({...formData, nom_visiteur: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Entrez le nom complet"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Numéro de téléphone"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="adresse@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membre <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.est_membre === true}
                          onChange={() => setFormData({...formData, est_membre: true})}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Oui</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.est_membre === false}
                          onChange={() => setFormData({...formData, est_membre: false})}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Non</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Motif <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.motif}
                      onChange={(e) => setFormData({...formData, motif: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionner un motif</option>
                      <option value="Conseil">Conseil</option>
                      <option value="Prière">Prière</option>
                      <option value="Orientation">Orientation</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  
                  {formData.motif === 'Autre' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Précisez le motif
                      </label>
                      <input
                        type="text"
                        value={formData.autre_motif}
                        onChange={(e) => setFormData({...formData, autre_motif: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Décrivez le motif"
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date_visite}
                        onChange={handleDateChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Heure <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.heure}
                        onChange={(e) => setFormData({...formData, heure: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={formData.observations}
                      onChange={(e) => setFormData({...formData, observations: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="Ajouter des notes..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-6 pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting || (isToday && stats.total >= stats.quota && !editingVisite)}
                  className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingVisite ? 'Mettre à jour' : 'Créer la visite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}