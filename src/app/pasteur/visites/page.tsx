
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { format, parseISO, addDays, subDays, getDay } from 'date-fns';
// // // import { fr } from 'date-fns/locale';
// // // import { 
// // //   Plus, 
// // //   CheckCircle, 
// // //   XCircle, 
// // //   Edit2, 
// // //   Calendar, 
// // //   Users, 
// // //   Clock,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Loader2,
// // //   Trash2,FileText,
// // //   TrendingUp,
// // //   X,
// // //   Check
// // // } from 'lucide-react';
// // // import { 
// // //   createVisite, 
// // //   updateStatut, 
// // //   getVisitesParDate,
// // //   checkVisiteurExists,
// // //   updateVisite,
// // //   annulerVisite,
// // //   marquerCommeRecu
// // // } from '@/actions/visites';
// // // import { getConfiguration } from '@/actions/configuration';
// // // import Link from 'next/link';

// // // // Types
// // // interface Visite {
// // //   id: number;
// // //   nom_visiteur: string;
// // //   telephone: string;
// // //   sexe: string;
// // //   est_membre: boolean;
// // //   membre_id: number | null;
// // //   motif: string;
// // //   autre_motif: string | null;
// // //   date_visite: string;
// // //   heure: string;
// // //   observations: string | null;
// // //   statut: string;
// // //   cree_par: number;
// // //   membre?: {
// // //     nom_complet: string;
// // //     membre_profile: string;
// // //   };
// // // }

// // // interface Statistiques {
// // //   total: number;
// // //   en_attente: number;
// // //   recus: number;
// // //   annules: number;
// // //   quota: number;
// // // }

// // // // Fonction pour obtenir le prochain mardi ou mercredi
// // // function getNextValidDate(date: Date): Date {
// // //   const dayOfWeek = getDay(date);
// // //   // Dimanche=0, Lundi=1, Mardi=2, Mercredi=3, Jeudi=4, Vendredi=5, Samedi=6
  
// // //   if (dayOfWeek === 2 || dayOfWeek === 3) {
// // //     return date;
// // //   } else if (dayOfWeek < 2) {
// // //     // Dimanche ou Lundi -> prochain mardi
// // //     return addDays(date, 2 - dayOfWeek);
// // //   } else {
// // //     // Jeudi, Vendredi, Samedi -> prochain mardi
// // //     return addDays(date, (9 - dayOfWeek));
// // //   }
// // // }

// // // // Fonction pour vérifier si une date est valide (mardi ou mercredi)
// // // function isValidVisitDate(date: Date): boolean {
// // //   const dayOfWeek = getDay(date);
// // //   return dayOfWeek === 2 || dayOfWeek === 3;
// // // }

// // // export default function VisitesPage() {
// // //   const [currentDate, setCurrentDate] = useState(getNextValidDate(new Date()));
// // //   const [visites, setVisites] = useState<Visite[]>([]);
// // //   const [stats, setStats] = useState<Statistiques>({
// // //     total: 0,
// // //     en_attente: 0,
// // //     recus: 0,
// // //     annules: 0,
// // //     quota: 50
// // //   });
// // //   const [loading, setLoading] = useState(true);
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [editingVisite, setEditingVisite] = useState<Visite | null>(null);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [config, setConfig] = useState<any>({});
// // //   const [showConfirmModal, setShowConfirmModal] = useState(false);
// // //   const [visiteToConfirm, setVisiteToConfirm] = useState<number | null>(null);
// // //   const [showAnnulerModal, setShowAnnulerModal] = useState(false);
// // //   const [visiteToAnnuler, setVisiteToAnnuler] = useState<number | null>(null);
// // //   const [annulerCommentaire, setAnnulerCommentaire] = useState('');

// // //   const [formData, setFormData] = useState({
// // //     nom_visiteur: '',
// // //     telephone: '',
// // //     email: '',
// // //     est_membre: true,
// // //     motif: '',
// // //     autre_motif: '',
// // //     date_visite: format(getNextValidDate(new Date()), 'yyyy-MM-dd'),
// // //     heure: '12:00',
// // //     observations: ''
// // //   });

// // //   // Charger la configuration
// // //   useEffect(() => {
// // //     const loadConfig = async () => {
// // //       const result = await getConfiguration();
// // //       if (result.success) {
// // //         const configObj: any = {};
// // //         result.data?.forEach((item: any) => {
// // //           configObj[item.cle] = item.valeur;
// // //         });
// // //         setConfig(configObj);
// // //         setStats(prev => ({ ...prev, quota: parseInt(configObj.quota_journalier || '20') }));
// // //       }
// // //     };
// // //     loadConfig();
// // //   }, []);

// // //   // Charger les visites
// // //   const loadVisites = async () => {
// // //     setLoading(true);
// // //     const dateStr = format(currentDate, 'yyyy-MM-dd');
    
// // //     const result = await getVisitesParDate(dateStr);
    
// // //     if (result.success && result.data) {
// // //       setVisites(result.data as Visite[]);
      
// // //       // Calculer les statistiques
// // //       const en_attente = (result.data as Visite[]).filter((v: Visite) => v.statut === 'En attente').length;
// // //       const recus = (result.data as Visite[]).filter((v: Visite) => v.statut === 'Reçue').length;
// // //       const annules = (result.data as Visite[]).filter((v: Visite) => v.statut === 'Annulée').length;
      
// // //       setStats(prev => ({
// // //         ...prev,
// // //         total: (result.data as Visite[]).length,
// // //         en_attente,
// // //         recus,
// // //         annules
// // //       }));
// // //     }
// // //     setLoading(false);
// // //   };

// // //   useEffect(() => {
// // //     loadVisites();
// // //   }, [currentDate]);

// // //   // Changement de date avec validation (reste sur mardi/mercredi)
// // //   const previousDay = () => {
// // //     let newDate = subDays(currentDate, 1);
// // //     while (!isValidVisitDate(newDate)) {
// // //       newDate = subDays(newDate, 1);
// // //     }
// // //     setCurrentDate(newDate);
// // //   };
  
// // //   const nextDay = () => {
// // //     let newDate = addDays(currentDate, 1);
// // //     while (!isValidVisitDate(newDate)) {
// // //       newDate = addDays(newDate, 1);
// // //     }
// // //     setCurrentDate(newDate);
// // //   };
  
// // //   const today = () => {
// // //     const todayDate = new Date();
// // //     if (isValidVisitDate(todayDate)) {
// // //       setCurrentDate(todayDate);
// // //     } else {
// // //       setCurrentDate(getNextValidDate(todayDate));
// // //     }
// // //   };

// // //   // Gestion du changement de date dans le formulaire
// // //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const selectedDate = new Date(e.target.value);
    
// // //     if (isValidVisitDate(selectedDate)) {
// // //       setFormData({...formData, date_visite: e.target.value});
// // //       setError('');
// // //     } else {
// // //       const nextValid = getNextValidDate(selectedDate);
// // //       const nextValidStr = format(nextValid, 'yyyy-MM-dd');
// // //       const dayName = format(nextValid, 'EEEE', { locale: fr });
      
// // //       setError(`❌ Les visites ont lieu uniquement les MARDIS et MERCREDIS. Prochaine date disponible : ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })}`);
      
// // //       // Optionnel : proposer automatiquement la date corrigée
// // //       if (confirm(`Voulez-vous utiliser le ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })} à la place ?`)) {
// // //         setFormData({...formData, date_visite: nextValidStr});
// // //         setError('');
// // //       }
// // //     }
// // //   };

// // //   // Ouvrir le modal de confirmation pour marquer comme reçu
// // //   const openConfirmModal = (id: number) => {
// // //     setVisiteToConfirm(id);
// // //     setShowConfirmModal(true);
// // //   };

// // //   // Marquer comme reçu
// // //   const marquerRecu = async () => {
// // //     if (!visiteToConfirm) return;
    
// // //     const result = await marquerCommeRecu(visiteToConfirm);
// // //     if (result.success) {
// // //       loadVisites();
// // //     } else {
// // //       setError(result.error || 'Erreur lors du marquage');
// // //     }
// // //     setShowConfirmModal(false);
// // //     setVisiteToConfirm(null);
// // //   };

// // //   // Ouvrir le modal d'annulation
// // //   const openAnnulerModal = (id: number) => {
// // //     setVisiteToAnnuler(id);
// // //     setAnnulerCommentaire('');
// // //     setShowAnnulerModal(true);
// // //   };

// // //   // Annuler visite
// // //   const confirmerAnnulation = async () => {
// // //     if (!visiteToAnnuler) return;
    
// // //     const result = await annulerVisite(visiteToAnnuler, annulerCommentaire);
// // //     if (result.success) {
// // //       loadVisites();
// // //       setShowAnnulerModal(false);
// // //       setVisiteToAnnuler(null);
// // //       setAnnulerCommentaire('');
// // //     } else {
// // //       setError(result.error || 'Erreur lors de l\'annulation');
// // //     }
// // //   };

// // //   // Ouvrir le modal pour modifier (remplit le formulaire)
// // //   const openEditModal = (visite: Visite) => {
// // //     setEditingVisite(visite);
// // //     setFormData({
// // //       nom_visiteur: visite.nom_visiteur,
// // //       telephone: visite.telephone,
// // //       email: '',
// // //       est_membre: visite.est_membre,
// // //       motif: visite.motif,
// // //       autre_motif: visite.autre_motif || '',
// // //       date_visite: visite.date_visite,
// // //       heure: visite.heure,
// // //       observations: visite.observations || ''
// // //     });
// // //     setShowModal(true);
// // //   };

// // //   // Fermer le modal et réinitialiser
// // //   const closeModal = () => {
// // //     setShowModal(false);
// // //     setEditingVisite(null);
// // //     setError('');
// // //     setFormData({
// // //       nom_visiteur: '',
// // //       telephone: '',
// // //       email: '',
// // //       est_membre: true,
// // //       motif: '',
// // //       autre_motif: '',
// // //       date_visite: format(getNextValidDate(currentDate), 'yyyy-MM-dd'),
// // //       heure: '12:00',
// // //       observations: ''
// // //     });
// // //   };

// // //   // Créer ou modifier une visite
// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setSubmitting(true);
// // //     setError('');

// // //     // Vérifier si la date est valide
// // //     const selectedDate = new Date(formData.date_visite);
// // //     if (!isValidVisitDate(selectedDate)) {
// // //       setError('❌ Les visites pastorales ont lieu uniquement les MARDIS et MERCREDIS');
// // //       setSubmitting(false);
// // //       return;
// // //     }

// // //     // Vérifier si le visiteur existe déjà (uniquement pour nouvelle visite)
// // //     if (!editingVisite) {
// // //       const checkResult = await checkVisiteurExists(formData.date_visite, formData.telephone);
// // //       if (checkResult.exists) {
// // //         setError('Ce numéro de téléphone a déjà un rendez-vous pour cette date');
// // //         setSubmitting(false);
// // //         return;
// // //       }
// // //     }

// // //     const formDataObj = new FormData();
// // //     Object.entries(formData).forEach(([key, value]) => {
// // //       if (value !== null && value !== undefined) {
// // //         formDataObj.append(key, value.toString());
// // //       }
// // //     });

// // //     let result;
// // //     if (editingVisite) {
// // //       formDataObj.append('id', editingVisite.id.toString());
// // //       result = await updateVisite(formDataObj);
// // //     } else {
// // //       result = await createVisite(formDataObj);
// // //     }
    
// // //     if (result.success) {
// // //       closeModal();
// // //       loadVisites();
// // //     } else {
// // //       setError(result.error || `Erreur lors de la ${editingVisite ? 'modification' : 'création'}`);
// // //     }
// // //     setSubmitting(false);
// // //   };

// // //   const getStatutColor = (statut: string) => {
// // //     switch(statut) {
// // //       case 'En attente': return 'bg-yellow-100 text-yellow-800';
// // //       case 'Reçue': return 'bg-green-100 text-green-800';
// // //       case 'Annulée': return 'bg-red-100 text-red-800';
// // //       default: return 'bg-gray-100 text-gray-800';
// // //     }
// // //   };

// // //   const getMotifIcon = (motif: string) => {
// // //     switch(motif) {
// // //       case 'Conseil': return '💬';
// // //       case 'Prière': return '🙏';
// // //       case 'Orientation': return '🎯';
// // //       default: return '📝';
// // //     }
// // //   };

// // //   const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
// // //   const placesRestantes = stats.quota - stats.total;
// // //   const pourcentage = (stats.total / stats.quota) * 100;
  
// // //   // Déterminer la couleur de la barre de progression
// // //   const getProgressBarColor = () => {
// // //     if (pourcentage >= 100) return 'bg-red-500';
// // //     if (pourcentage >= 80) return 'bg-orange-500';
// // //     if (pourcentage >= 60) return 'bg-yellow-500';
// // //     return 'bg-green-500';
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
// // //         {/* Header avec navigation des dates */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
// // //           <div className="flex items-center gap-3">
// // //             <button
// // //               onClick={previousDay}
// // //               className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition group"
// // //             >
// // //               <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
// // //               <span className="text-sm text-gray-600 hidden sm:inline">
// // //                 {format(subDays(currentDate, 1), 'dd/MM', { locale: fr })}
// // //               </span>
// // //             </button>
            
// // //             <button
// // //               onClick={today}
// // //               className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
// // //                 isToday 
// // //                   ? 'bg-blue-600 text-white shadow-sm' 
// // //                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
// // //               }`}
// // //             >
// // //               <Calendar className="w-4 h-4" />
// // //               <span>
// // //                 {isToday ? "Aujourd'hui" : format(currentDate, 'EEEE d MMMM', { locale: fr })}
// // //               </span>
// // //             </button>
            
// // //             <button
// // //               onClick={nextDay}
// // //               className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition group"
// // //             >
// // //               <span className="text-sm text-gray-600 hidden sm:inline">
// // //                 {format(addDays(currentDate, 1), 'dd/MM', { locale: fr })}
// // //               </span>
// // //               <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
// // //             </button>
// // //           </div>
          
// // //           <button
// // //             onClick={() => setShowModal(true)}
// // //             className="bg-green-600 text-sm hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition shadow-sm"
// // //           >
// // //             <Plus className="w-3 h-3" />
// // //             Nouvelle Visite
// // //           </button>
// // //         </div>

// // //         {/* Quota avec barre de progression */}
// // //         <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
// // //           <div className="flex justify-between items-start mb-3">
// // //             <div className="flex-1">
// // //               <div className="flex items-center gap-2 mb-1">
// // //                 <TrendingUp className="w-5 h-5 text-gray-500" />
// // //                 <span className="text-sm font-medium text-gray-600">
// // //                   Quota journalier
// // //                 </span>
// // //                 {isToday && (
// // //                   <span className={`text-xs px-2 py-0.5 rounded-full ${
// // //                     placesRestantes <= 0 ? 'bg-red-100 text-red-700' : 
// // //                     placesRestantes <= 5 ? 'bg-orange-100 text-orange-700' : 
// // //                     'bg-green-100 text-green-700'
// // //                   }`}>
// // //                     {placesRestantes <= 0 ? 'Complet' : `${placesRestantes} places restantes`}
// // //                   </span>
// // //                 )}
// // //               </div>
              
// // //               <div className="flex items-baseline gap-2">
// // //                 <span className="text-3xl font-bold text-gray-800">{stats.total}</span>
// // //                 <span className="text-lg text-gray-500">/ {stats.quota}</span>
// // //                 <span className="text-sm text-gray-500 ml-2">
// // //                   ({Math.round(pourcentage)}%)
// // //                 </span>
// // //               </div>
// // //             </div>
            
// // //             {!isToday && (
// // //               <div className="text-right">
// // //                 <p className="text-sm text-gray-500">Total visites</p>
// // //                 <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
// // //               </div>
// // //             )}
// // //           </div>
          
// // //           {/* Barre de progression */}
// // //           {isToday && (
// // //             <div className="mt-3">
// // //               <div className="w-full bg-gray-200  h-2 overflow-hidden">
// // //                 <div 
// // //                   className={`h-2  transition-all duration-500 ease-out ${getProgressBarColor()}`}
// // //                   style={{ width: `${Math.min(pourcentage, 100)}%` }}
// // //                 />
// // //               </div>
// // //               {pourcentage >= 100 && (
// // //                 <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
// // //                   <XCircle className="w-3 h-3" />
// // //                   Quota atteint ! Impossible d'ajouter de nouvelles visites pour aujourd'hui.
// // //                 </p>
// // //               )}
// // //               {pourcentage >= 80 && pourcentage < 100 && (
// // //                 <p className="text-xs text-orange-600 mt-2">
// // //                   Attention : Plus que {placesRestantes} place{placesRestantes > 1 ? 's' : ''} disponible{placesRestantes > 1 ? 's' : ''}
// // //                 </p>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Cartes statistiques */}
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // //           {/* Total */}
// // //           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-blue-500 hover:shadow-md transition">
// // //             <div className="flex justify-between items-start">
// // //               <div>
// // //                 <p className="text-sm text-gray-500 mb-1">Total visites</p>
// // //                 <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
// // //               </div>
// // //               <Users className="w-6 h-6 text-blue-500" />
// // //             </div>
// // //           </div>
          
// // //           {/* En attente */}
// // //           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-yellow-500 hover:shadow-md transition">
// // //             <div className="flex justify-between items-start">
// // //               <div>
// // //                 <p className="text-sm text-gray-500 mb-1">En attente</p>
// // //                 <p className="text-2xl font-bold text-gray-800">{stats.en_attente}</p>
// // //               </div>
// // //               <Clock className="w-6 h-6 text-yellow-500" />
// // //             </div>
// // //           </div>
          
// // //           {/* Reçues */}
// // //           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-green-500 hover:shadow-md transition">
// // //             <div className="flex justify-between items-start">
// // //               <div>
// // //                 <p className="text-sm text-gray-500 mb-1">Reçues</p>
// // //                 <p className="text-2xl font-bold text-gray-800">{stats.recus}</p>
// // //               </div>
// // //               <CheckCircle className="w-6 h-6 text-green-500" />
// // //             </div>
// // //           </div>
          
// // //           {/* Annulées */}
// // //           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-red-500 hover:shadow-md transition">
// // //             <div className="flex justify-between items-start">
// // //               <div>
// // //                 <p className="text-sm text-gray-500 mb-1">Annulées</p>
// // //                 <p className="text-2xl font-bold text-gray-800">{stats.annules}</p>
// // //               </div>
// // //               <XCircle className="w-6 h-6 text-red-500" />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Date détaillée */}
// // //         <div className="mb-4 pb-2 border-b border-gray-200">
// // //           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
// // //             <Calendar className="w-5 h-5 text-gray-500" />
// // //             {format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })}
// // //           </h2>
// // //           <p className="text-sm text-gray-500 mt-1">
// // //             {visites.length} visite{visites.length > 1 ? 's' : ''} programmée{visites.length > 1 ? 's' : ''}
// // //           </p>
// // //         </div>

// // //         {/* Tableau des visites */}
// // //         <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
// // //           {loading ? (
// // //             <div className="flex justify-center items-center py-12">
// // //               <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
// // //             </div>
// // //           ) : visites.length === 0 ? (
// // //             <div className="text-center py-12">
// // //               <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
// // //               <p className="text-gray-500">Aucune visite prévue pour cette journée</p>
// // //               {isToday && pourcentage < 100 && (
// // //                 <button
// // //                   onClick={() => setShowModal(true)}
// // //                   className="mt-4 text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2"
// // //                 >
// // //                   <Plus className="w-4 h-4" />
// // //                   Programmer une visite
// // //                 </button>
// // //               )}
// // //             </div>
// // //           ) : (
// // //             <div className="overflow-x-auto">
// // //               <table className="w-full">
// // //                 <thead className="bg-gray-50 border-b border-gray-200">
// // //                   <tr>
// // //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Heure</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Nom du Visiteur</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Membre</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Téléphone</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Motif</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Statut</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Actions</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y divide-gray-200">
// // //                   {visites.map((visite) => (
// // //                     <tr key={visite.id} className="hover:bg-gray-50 transition">
// // //                       <td className="px-6 py-4 whitespace-nowrap">
// // //                         <div className="flex items-center gap-2">
// // //                           <Clock className="w-4 h-4 text-gray-400" />
// // //                           <span className="text-sm font-medium text-gray-900">{visite.heure}</span>
// // //                         </div>
// // //                        </td>
// // //                       <td className="px-6 py-4 whitespace-nowrap">
// // //                         <div className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</div>
// // //                        </td>
// // //                       <td className="px-6 py-4 whitespace-nowrap">
// // //                         <span className={`px-2 py-1 text-xs rounded-full ${visite.est_membre ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
// // //                           {visite.est_membre ? 'Membre' : 'Non-membre'}
// // //                         </span>
// // //                        </td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visite.telephone}</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap">
// // //                         <div className="flex items-center gap-2">
// // //                           <span className="text-lg">{getMotifIcon(visite.motif)}</span>
// // //                           <span className="text-sm text-gray-700">{visite.motif}</span>
// // //                         </div>
// // //                        </td>
// // //                       <td className="px-6 py-4 whitespace-nowrap">
// // //                         <span className={`px-2 py-1 text-xs rounded-full ${getStatutColor(visite.statut)}`}>
// // //                           {visite.statut}
// // //                         </span>
// // //                        </td>
// // //                        <td className="px-6 py-4 whitespace-nowrap">
// // //   <div className="flex items-center gap-1">
// // //     <Link
// // //       href={`/pasteur/visites/${visite.id}`}
// // //       className="p-1 bg-purple-600 hover:bg-purple-700  transition"
// // //       title="Voir les détails et notes"
// // //     >
      
// // //       <FileText className="w-5 h-5 text-white" />
// // //     </Link>
// // //     {visite.statut === 'En attente' && (
// // //       <button
// // //         onClick={() => openConfirmModal(visite.id)}
// // //         className="p-1 bg-green-600 hover:bg-green-700  transition"
// // //         title="Marquer comme reçu"
// // //       >
// // //         <Check className="w-5 h-5 text-white" />
// // //       </button>
// // //     )}
// // //     <button
// // //       onClick={() => openEditModal(visite)}
// // //       className="p-1 bg-blue-600 hover:bg-blue-700  transition"
// // //       title="Modifier"
// // //     >
// // //       <Edit2 className="w-5 h-5 text-white" />
// // //     </button>
// // //     {visite.statut !== 'Annulée' && (
// // //       <button
// // //         onClick={() => openAnnulerModal(visite.id)}
// // //         className="p-1 bg-red-600 hover:bg-red-700  transition"
// // //         title="Annuler"
// // //       >
// // //         <X className="w-5 h-5 text-white" />
// // //       </button>
// // //     )}
// // //   </div>
// // // </td>
// // //                       {/* <td className="px-6 py-4 whitespace-nowrap">
// // //                         <div className="flex items-center ">
// // //                           {visite.statut === 'En attente' && (
// // //                             <button
// // //                               onClick={() => openConfirmModal(visite.id)}
// // //                               className="p-1 bg-green-600 hover:bg-green-700  transition"
// // //                               title="Marquer comme reçu"
// // //                             >
// // //                               <Check className="w-5 h-5 text-white" />
// // //                             </button>
// // //                           )}
// // //                           <button
// // //                             onClick={() => openEditModal(visite)}
// // //                             className="p-1 bg-blue-600 hover:bg-blue-700  transition"
// // //                             title="Modifier"
// // //                           >
// // //                             <Edit2 className="w-5 h-5 text-white" />
// // //                           </button>
// // //                           {visite.statut !== 'Annulée' && (
// // //                             <button
// // //                               onClick={() => openAnnulerModal(visite.id)}
// // //                               className="p-1 bg-red-600 hover:bg-red-700  transition"
// // //                               title="Annuler"
// // //                             >
// // //                               <X className="w-5 h-5 text-white" />
// // //                             </button>
// // //                           )}
// // //                         </div>
// // //                        </td> */}
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Indication des jours */}
// // //         <div className="mt-4 text-center">
// // //           <p className="text-sm text-gray-500">
// // //             📅 Les visites pastorales ont lieu les <span className="font-semibold">Mardis</span> et <span className="font-semibold">Mercredis</span>
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* Modal de confirmation pour marquer comme reçu */}
// // //       {showConfirmModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white shadow-xl max-w-md w-full">
// // //             <div className="bg-green-600 text-white px-6 py-4">
// // //               <h2 className="text-lg font-semibold">Confirmation</h2>
// // //             </div>
// // //             <div className="p-6">
// // //               <p className="text-gray-700">Êtes-vous sûr de vouloir marquer cette visite comme reçue ?</p>
// // //             </div>
// // //             <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
// // //               <button
// // //                 onClick={() => {
// // //                   setShowConfirmModal(false);
// // //                   setVisiteToConfirm(null);
// // //                 }}
// // //                 className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
// // //               >
// // //                 Annuler
// // //               </button>
// // //               <button
// // //                 onClick={marquerRecu}
// // //                 className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white transition font-medium flex items-center gap-2"
// // //               >
// // //                 <Check className="w-4 h-4" />
// // //                 Marquer comme reçu
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Modal d'annulation */}
// // //       {showAnnulerModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white shadow-xl max-w-md w-full">
// // //             <div className="bg-red-600 text-white px-6 py-4">
// // //               <h2 className="text-lg font-semibold">Annuler la visite</h2>
// // //             </div>
// // //             <div className="p-6">
// // //               <p className="text-gray-700 mb-4">Êtes-vous sûr de vouloir annuler cette visite ?</p>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Commentaire (optionnel)
// // //               </label>
// // //               <textarea
// // //                 value={annulerCommentaire}
// // //                 onChange={(e) => setAnnulerCommentaire(e.target.value)}
// // //                 rows={3}
// // //                 className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
// // //                 placeholder="Raison de l'annulation..."
// // //               />
// // //             </div>
// // //             <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
// // //               <button
// // //                 onClick={() => {
// // //                   setShowAnnulerModal(false);
// // //                   setVisiteToAnnuler(null);
// // //                   setAnnulerCommentaire('');
// // //                 }}
// // //                 className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
// // //               >
// // //                 Retour
// // //               </button>
// // //               <button
// // //                 onClick={confirmerAnnulation}
// // //                 className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white transition font-medium flex items-center gap-2"
// // //               >
// // //                 <X className="w-4 h-4" />
// // //                 Confirmer l'annulation
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Modal Nouvelle Visite */}
// // //       {showModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
// // //             <div className="sticky top-0 bg-blue-600 text-white border-b border-gray-200 px-6 py-4">
// // //               <h2 className="text-lg font-semibold">
// // //                 {editingVisite ? 'Modifier la visite' : 'Créer une Nouvelle Visite'}
// // //               </h2>
// // //             </div>
            
// // //             <form onSubmit={handleSubmit} className="p-6">
// // //               {error && (
// // //                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-5">
// // //                   {error}
// // //                 </div>
// // //               )}
              
// // //               <div className="grid grid-cols-2 gap-x-5 gap-y-4">
// // //                 <div className="space-y-4">
// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                       Nom du Visiteur <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <input
// // //                       type="text"
// // //                       required
// // //                       value={formData.nom_visiteur}
// // //                       onChange={(e) => setFormData({...formData, nom_visiteur: e.target.value})}
// // //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                       placeholder="Entrez le nom complet"
// // //                     />
// // //                   </div>
                  
// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                       Téléphone <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <input
// // //                       type="tel"
// // //                       required
// // //                       value={formData.telephone}
// // //                       onChange={(e) => setFormData({...formData, telephone: e.target.value})}
// // //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                       placeholder="Numéro de téléphone"
// // //                     />
// // //                   </div>
                  
// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                       Email
// // //                     </label>
// // //                     <input
// // //                       type="email"
// // //                       value={formData.email}
// // //                       onChange={(e) => setFormData({...formData, email: e.target.value})}
// // //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                       placeholder="adresse@email.com"
// // //                     />
// // //                   </div>
                  
// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Membre <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <div className="flex gap-4">
// // //                       <label className="flex items-center gap-2 cursor-pointer">
// // //                         <input
// // //                           type="radio"
// // //                           checked={formData.est_membre === true}
// // //                           onChange={() => setFormData({...formData, est_membre: true})}
// // //                           className="w-4 h-4 text-blue-600"
// // //                         />
// // //                         <span className="text-sm text-gray-700">Oui</span>
// // //                       </label>
// // //                       <label className="flex items-center gap-2 cursor-pointer">
// // //                         <input
// // //                           type="radio"
// // //                           checked={formData.est_membre === false}
// // //                           onChange={() => setFormData({...formData, est_membre: false})}
// // //                           className="w-4 h-4 text-blue-600"
// // //                         />
// // //                         <span className="text-sm text-gray-700">Non</span>
// // //                       </label>
// // //                     </div>
// // //                   </div>
// // //                 </div>
                
// // //                 <div className="space-y-4">
// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                       Motif <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <select
// // //                       required
// // //                       value={formData.motif}
// // //                       onChange={(e) => setFormData({...formData, motif: e.target.value})}
// // //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                     >
// // //                       <option value="">Sélectionner un motif</option>
// // //                       <option value="Conseil">Conseil</option>
// // //                       <option value="Prière">Prière</option>
// // //                       <option value="Orientation">Orientation</option>
// // //                       <option value="Autre">Autre</option>
// // //                     </select>
// // //                   </div>
                  
// // //                   {formData.motif === 'Autre' && (
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                         Précisez le motif
// // //                       </label>
// // //                       <input
// // //                         type="text"
// // //                         value={formData.autre_motif}
// // //                         onChange={(e) => setFormData({...formData, autre_motif: e.target.value})}
// // //                         className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                         placeholder="Décrivez le motif"
// // //                       />
// // //                     </div>
// // //                   )}
                  
// // //                   <div className="grid grid-cols-2 gap-3">
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                         Date <span className="text-red-500">*</span>
// // //                       </label>
// // //                       <input
// // //                         type="date"
// // //                         required
// // //                         value={formData.date_visite}
// // //                         onChange={handleDateChange}
// // //                         className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                       />
// // //                     </div>
                    
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                         Heure <span className="text-red-500">*</span>
// // //                       </label>
// // //                       <input
// // //                         type="time"
// // //                         required
// // //                         value={formData.heure}
// // //                         onChange={(e) => setFormData({...formData, heure: e.target.value})}
// // //                         className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                       />
// // //                     </div>
// // //                   </div>
                  
// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                       Notes
// // //                     </label>
// // //                     <textarea
// // //                       value={formData.observations}
// // //                       onChange={(e) => setFormData({...formData, observations: e.target.value})}
// // //                       rows={3}
// // //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
// // //                       placeholder="Ajouter des notes..."
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>
              
// // //               <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-6 pt-4 flex justify-end gap-3">
// // //                 <button
// // //                   type="button"
// // //                   onClick={closeModal}
// // //                   className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
// // //                 >
// // //                   Annuler
// // //                 </button>
// // //                 <button
// // //                   type="submit"
// // //                   disabled={submitting || (isToday && stats.total >= stats.quota && !editingVisite)}
// // //                   className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
// // //                 >
// // //                   {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
// // //                   {editingVisite ? 'Mettre à jour' : 'Créer la visite'}
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { format, parseISO, addDays, subDays, getDay } from 'date-fns';
// // import { fr } from 'date-fns/locale';
// // import { 
// //   Plus, 
// //   CheckCircle, 
// //   XCircle, 
// //   Edit2, 
// //   Calendar, 
// //   Users, 
// //   Clock,
// //   ChevronLeft,
// //   ChevronRight,
// //   Loader2,
// //   TrendingUp,
// //   X,
// //   Check,
// //   FileText,
// //   StickyNote
// // } from 'lucide-react';
// // import { 
// //   createVisite, 
// //   updateStatut, 
// //   getVisitesParDate,
// //   checkVisiteurExists,
// //   updateVisite,
// //   annulerVisite,
// //   marquerCommeRecu,
// //   createNotePasteur,
// //   getNotesByVisite
// // } from '@/actions/visites';
// // import { getConfiguration } from '@/actions/configuration';

// // // Types
// // interface Visite {
// //   id: number;
// //   nom_visiteur: string;
// //   telephone: string;
// //   sexe: string;
// //   est_membre: boolean;
// //   membre_id: number | null;
// //   motif: string;
// //   autre_motif: string | null;
// //   date_visite: string;
// //   heure: string;
// //   observations: string | null;
// //   statut: string;
// //   cree_par: number;
// //   membre?: {
// //     nom_complet: string;
// //     membre_profile: string;
// //   };
// // }

// // interface Note {
// //   id: number;
// //   titre: string;
// //   contenu: string;
// //   created_at: string;
// //   pasteur?: {
// //     nom_complet: string;
// //   };
// // }

// // interface Statistiques {
// //   total: number;
// //   en_attente: number;
// //   recus: number;
// //   annules: number;
// //   quota: number;
// // }

// // // Fonction pour obtenir le prochain mardi ou mercredi
// // function getNextValidDate(date: Date): Date {
// //   const dayOfWeek = getDay(date);
  
// //   if (dayOfWeek === 2 || dayOfWeek === 3) {
// //     return date;
// //   } else if (dayOfWeek < 2) {
// //     return addDays(date, 2 - dayOfWeek);
// //   } else {
// //     return addDays(date, (9 - dayOfWeek));
// //   }
// // }

// // // Fonction pour vérifier si une date est valide (mardi ou mercredi)
// // function isValidVisitDate(date: Date): boolean {
// //   const dayOfWeek = getDay(date);
// //   return dayOfWeek === 2 || dayOfWeek === 3;
// // }

// // export default function VisitesPage() {
// //   const [currentDate, setCurrentDate] = useState(getNextValidDate(new Date()));
// //   const [visites, setVisites] = useState<Visite[]>([]);
// //   const [stats, setStats] = useState<Statistiques>({
// //     total: 0,
// //     en_attente: 0,
// //     recus: 0,
// //     annules: 0,
// //     quota: 50
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [showModal, setShowModal] = useState(false);
// //   const [editingVisite, setEditingVisite] = useState<Visite | null>(null);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [error, setError] = useState('');
// //   const [config, setConfig] = useState<any>({});
// //   const [showConfirmModal, setShowConfirmModal] = useState(false);
// //   const [visiteToConfirm, setVisiteToConfirm] = useState<number | null>(null);
// //   const [showAnnulerModal, setShowAnnulerModal] = useState(false);
// //   const [visiteToAnnuler, setVisiteToAnnuler] = useState<number | null>(null);
// //   const [annulerCommentaire, setAnnulerCommentaire] = useState('');
  
// //   // États pour le modal des notes
// //   const [showNoteModal, setShowNoteModal] = useState(false);
// //   const [selectedVisite, setSelectedVisite] = useState<Visite | null>(null);
// //   const [notes, setNotes] = useState<Note[]>([]);
// //   const [loadingNotes, setLoadingNotes] = useState(false);
// //   const [noteFormData, setNoteFormData] = useState({
// //     titre: '',
// //     contenu: ''
// //   });
// //   const [submittingNote, setSubmittingNote] = useState(false);
// //   const [noteError, setNoteError] = useState('');

// //   const [formData, setFormData] = useState({
// //     nom_visiteur: '',
// //     telephone: '',
// //     email: '',
// //     est_membre: true,
// //     motif: '',
// //     autre_motif: '',
// //     date_visite: format(getNextValidDate(new Date()), 'yyyy-MM-dd'),
// //     heure: '12:00',
// //     observations: ''
// //   });

// //   // Charger la configuration
// //   useEffect(() => {
// //     const loadConfig = async () => {
// //       const result = await getConfiguration();
// //       if (result.success) {
// //         const configObj: any = {};
// //         result.data?.forEach((item: any) => {
// //           configObj[item.cle] = item.valeur;
// //         });
// //         setConfig(configObj);
// //         setStats(prev => ({ ...prev, quota: parseInt(configObj.quota_journalier || '20') }));
// //       }
// //     };
// //     loadConfig();
// //   }, []);

// //   // Charger les visites
// //   const loadVisites = async () => {
// //     setLoading(true);
// //     const dateStr = format(currentDate, 'yyyy-MM-dd');
    
// //     const result = await getVisitesParDate(dateStr);
    
// //     if (result.success && result.data) {
// //       setVisites(result.data as Visite[]);
      
// //       const en_attente = (result.data as Visite[]).filter((v: Visite) => v.statut === 'En attente').length;
// //       const recus = (result.data as Visite[]).filter((v: Visite) => v.statut === 'Reçue').length;
// //       const annules = (result.data as Visite[]).filter((v: Visite) => v.statut === 'Annulée').length;
      
// //       setStats(prev => ({
// //         ...prev,
// //         total: (result.data as Visite[]).length,
// //         en_attente,
// //         recus,
// //         annules
// //       }));
// //     }
// //     setLoading(false);
// //   };

// //   // Charger les notes d'une visite
// //   const loadNotes = async (visiteId: number) => {
// //     setLoadingNotes(true);
// //     const result = await getNotesByVisite(visiteId);
// //     if (result.success && result.data) {
// //       setNotes(result.data as Note[]);
// //     }
// //     setLoadingNotes(false);
// //   };

// //   // Ouvrir le modal des notes
// //   const openNoteModal = async (visite: Visite) => {
// //     setSelectedVisite(visite);
// //     setNoteFormData({ titre: '', contenu: '' });
// //     setNoteError('');
// //     await loadNotes(visite.id);
// //     setShowNoteModal(true);
// //   };

// //   // Ajouter une note
// //   const handleAddNote = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setSubmittingNote(true);
// //     setNoteError('');

// //     const formDataObj = new FormData();
// //     formDataObj.append('visite_id', selectedVisite!.id.toString());
// //     formDataObj.append('titre', noteFormData.titre);
// //     formDataObj.append('contenu', noteFormData.contenu);

// //     const result = await createNotePasteur(formDataObj);
    
// //     if (result.success) {
// //       setNoteFormData({ titre: '', contenu: '' });
// //       await loadNotes(selectedVisite!.id);
// //     } else {
// //       setNoteError(result.error || 'Erreur lors de l\'ajout de la note');
// //     }
// //     setSubmittingNote(false);
// //   };

// //   useEffect(() => {
// //     loadVisites();
// //   }, [currentDate]);

// //   const previousDay = () => {
// //     let newDate = subDays(currentDate, 1);
// //     while (!isValidVisitDate(newDate)) {
// //       newDate = subDays(newDate, 1);
// //     }
// //     setCurrentDate(newDate);
// //   };
  
// //   const nextDay = () => {
// //     let newDate = addDays(currentDate, 1);
// //     while (!isValidVisitDate(newDate)) {
// //       newDate = addDays(newDate, 1);
// //     }
// //     setCurrentDate(newDate);
// //   };
  
// //   const today = () => {
// //     const todayDate = new Date();
// //     if (isValidVisitDate(todayDate)) {
// //       setCurrentDate(todayDate);
// //     } else {
// //       setCurrentDate(getNextValidDate(todayDate));
// //     }
// //   };

// //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const selectedDate = new Date(e.target.value);
    
// //     if (isValidVisitDate(selectedDate)) {
// //       setFormData({...formData, date_visite: e.target.value});
// //       setError('');
// //     } else {
// //       const nextValid = getNextValidDate(selectedDate);
// //       const nextValidStr = format(nextValid, 'yyyy-MM-dd');
// //       const dayName = format(nextValid, 'EEEE', { locale: fr });
      
// //       setError(`❌ Les visites ont lieu uniquement les MARDIS et MERCREDIS. Prochaine date disponible : ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })}`);
      
// //       if (confirm(`Voulez-vous utiliser le ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })} à la place ?`)) {
// //         setFormData({...formData, date_visite: nextValidStr});
// //         setError('');
// //       }
// //     }
// //   };

// //   const openConfirmModal = (id: number) => {
// //     setVisiteToConfirm(id);
// //     setShowConfirmModal(true);
// //   };

// //   const marquerRecu = async () => {
// //     if (!visiteToConfirm) return;
    
// //     const result = await marquerCommeRecu(visiteToConfirm);
// //     if (result.success) {
// //       loadVisites();
// //     } else {
// //       setError(result.error || 'Erreur lors du marquage');
// //     }
// //     setShowConfirmModal(false);
// //     setVisiteToConfirm(null);
// //   };

// //   const openAnnulerModal = (id: number) => {
// //     setVisiteToAnnuler(id);
// //     setAnnulerCommentaire('');
// //     setShowAnnulerModal(true);
// //   };

// //   const confirmerAnnulation = async () => {
// //     if (!visiteToAnnuler) return;
    
// //     const result = await annulerVisite(visiteToAnnuler, annulerCommentaire);
// //     if (result.success) {
// //       loadVisites();
// //       setShowAnnulerModal(false);
// //       setVisiteToAnnuler(null);
// //       setAnnulerCommentaire('');
// //     } else {
// //       setError(result.error || 'Erreur lors de l\'annulation');
// //     }
// //   };

// //   const openEditModal = (visite: Visite) => {
// //     setEditingVisite(visite);
// //     setFormData({
// //       nom_visiteur: visite.nom_visiteur,
// //       telephone: visite.telephone,
// //       email: '',
// //       est_membre: visite.est_membre,
// //       motif: visite.motif,
// //       autre_motif: visite.autre_motif || '',
// //       date_visite: visite.date_visite,
// //       heure: visite.heure,
// //       observations: visite.observations || ''
// //     });
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setEditingVisite(null);
// //     setError('');
// //     setFormData({
// //       nom_visiteur: '',
// //       telephone: '',
// //       email: '',
// //       est_membre: true,
// //       motif: '',
// //       autre_motif: '',
// //       date_visite: format(getNextValidDate(currentDate), 'yyyy-MM-dd'),
// //       heure: '12:00',
// //       observations: ''
// //     });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setSubmitting(true);
// //     setError('');

// //     const selectedDate = new Date(formData.date_visite);
// //     if (!isValidVisitDate(selectedDate)) {
// //       setError('❌ Les visites pastorales ont lieu uniquement les MARDIS et MERCREDIS');
// //       setSubmitting(false);
// //       return;
// //     }

// //     if (!editingVisite) {
// //       const checkResult = await checkVisiteurExists(formData.date_visite, formData.telephone);
// //       if (checkResult.exists) {
// //         setError('Ce numéro de téléphone a déjà un rendez-vous pour cette date');
// //         setSubmitting(false);
// //         return;
// //       }
// //     }

// //     const formDataObj = new FormData();
// //     Object.entries(formData).forEach(([key, value]) => {
// //       if (value !== null && value !== undefined) {
// //         formDataObj.append(key, value.toString());
// //       }
// //     });

// //     let result;
// //     if (editingVisite) {
// //       formDataObj.append('id', editingVisite.id.toString());
// //       result = await updateVisite(formDataObj);
// //     } else {
// //       result = await createVisite(formDataObj);
// //     }
    
// //     if (result.success) {
// //       closeModal();
// //       loadVisites();
// //     } else {
// //       setError(result.error || `Erreur lors de la ${editingVisite ? 'modification' : 'création'}`);
// //     }
// //     setSubmitting(false);
// //   };

// //   const getStatutColor = (statut: string) => {
// //     switch(statut) {
// //       case 'En attente': return 'bg-yellow-100 text-yellow-800';
// //       case 'Reçue': return 'bg-green-100 text-green-800';
// //       case 'Annulée': return 'bg-red-100 text-red-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const getMotifIcon = (motif: string) => {
// //     switch(motif) {
// //       case 'Conseil': return '💬';
// //       case 'Prière': return '🙏';
// //       case 'Orientation': return '🎯';
// //       default: return '📝';
// //     }
// //   };

// //   const formatDate = (dateString: string) => {
// //     return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
// //   };

// //   const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
// //   const placesRestantes = stats.quota - stats.total;
// //   const pourcentage = (stats.total / stats.quota) * 100;
  
// //   const getProgressBarColor = () => {
// //     if (pourcentage >= 100) return 'bg-red-500';
// //     if (pourcentage >= 80) return 'bg-orange-500';
// //     if (pourcentage >= 60) return 'bg-yellow-500';
// //     return 'bg-green-500';
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
// //         {/* Header avec navigation des dates */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={previousDay}
// //               className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition group"
// //             >
// //               <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
// //               <span className="text-sm text-gray-600 hidden sm:inline">
// //                 {format(subDays(currentDate, 1), 'dd/MM', { locale: fr })}
// //               </span>
// //             </button>
            
// //             <button
// //               onClick={today}
// //               className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
// //                 isToday 
// //                   ? 'bg-blue-600 text-white shadow-sm' 
// //                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
// //               }`}
// //             >
// //               <Calendar className="w-4 h-4" />
// //               <span>
// //                 {isToday ? "Aujourd'hui" : format(currentDate, 'EEEE d MMMM', { locale: fr })}
// //               </span>
// //             </button>
            
// //             <button
// //               onClick={nextDay}
// //               className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition group"
// //             >
// //               <span className="text-sm text-gray-600 hidden sm:inline">
// //                 {format(addDays(currentDate, 1), 'dd/MM', { locale: fr })}
// //               </span>
// //               <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
// //             </button>
// //           </div>
          
// //           <button
// //             onClick={() => setShowModal(true)}
// //             className="bg-green-600 text-sm hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition shadow-sm"
// //           >
// //             <Plus className="w-3 h-3" />
// //             Nouvelle Visite
// //           </button>
// //         </div>

// //         {/* Quota avec barre de progression */}
// //         <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
// //           <div className="flex justify-between items-start mb-3">
// //             <div className="flex-1">
// //               <div className="flex items-center gap-2 mb-1">
// //                 <TrendingUp className="w-5 h-5 text-gray-500" />
// //                 <span className="text-sm font-medium text-gray-600">
// //                   Quota journalier
// //                 </span>
// //                 {isToday && (
// //                   <span className={`text-xs px-2 py-0.5 rounded-full ${
// //                     placesRestantes <= 0 ? 'bg-red-100 text-red-700' : 
// //                     placesRestantes <= 5 ? 'bg-orange-100 text-orange-700' : 
// //                     'bg-green-100 text-green-700'
// //                   }`}>
// //                     {placesRestantes <= 0 ? 'Complet' : `${placesRestantes} places restantes`}
// //                   </span>
// //                 )}
// //               </div>
              
// //               <div className="flex items-baseline gap-2">
// //                 <span className="text-3xl font-bold text-gray-800">{stats.total}</span>
// //                 <span className="text-lg text-gray-500">/ {stats.quota}</span>
// //                 <span className="text-sm text-gray-500 ml-2">
// //                   ({Math.round(pourcentage)}%)
// //                 </span>
// //               </div>
// //             </div>
            
// //             {!isToday && (
// //               <div className="text-right">
// //                 <p className="text-sm text-gray-500">Total visites</p>
// //                 <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
// //               </div>
// //             )}
// //           </div>
          
// //           {isToday && (
// //             <div className="mt-3">
// //               <div className="w-full bg-gray-200 h-2 overflow-hidden">
// //                 <div 
// //                   className={`h-2 transition-all duration-500 ease-out ${getProgressBarColor()}`}
// //                   style={{ width: `${Math.min(pourcentage, 100)}%` }}
// //                 />
// //               </div>
// //               {pourcentage >= 100 && (
// //                 <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
// //                   <XCircle className="w-3 h-3" />
// //                   Quota atteint ! Impossible d'ajouter de nouvelles visites pour aujourd'hui.
// //                 </p>
// //               )}
// //               {pourcentage >= 80 && pourcentage < 100 && (
// //                 <p className="text-xs text-orange-600 mt-2">
// //                   Attention : Plus que {placesRestantes} place{placesRestantes > 1 ? 's' : ''} disponible{placesRestantes > 1 ? 's' : ''}
// //                 </p>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Cartes statistiques */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-blue-500 hover:shadow-md transition">
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <p className="text-sm text-gray-500 mb-1">Total visites</p>
// //                 <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
// //               </div>
// //               <Users className="w-6 h-6 text-blue-500" />
// //             </div>
// //           </div>
          
// //           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-yellow-500 hover:shadow-md transition">
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <p className="text-sm text-gray-500 mb-1">En attente</p>
// //                 <p className="text-2xl font-bold text-gray-800">{stats.en_attente}</p>
// //               </div>
// //               <Clock className="w-6 h-6 text-yellow-500" />
// //             </div>
// //           </div>
          
// //           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-green-500 hover:shadow-md transition">
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <p className="text-sm text-gray-500 mb-1">Reçues</p>
// //                 <p className="text-2xl font-bold text-gray-800">{stats.recus}</p>
// //               </div>
// //               <CheckCircle className="w-6 h-6 text-green-500" />
// //             </div>
// //           </div>
          
// //           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-red-500 hover:shadow-md transition">
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <p className="text-sm text-gray-500 mb-1">Annulées</p>
// //                 <p className="text-2xl font-bold text-gray-800">{stats.annules}</p>
// //               </div>
// //               <XCircle className="w-6 h-6 text-red-500" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Date détaillée */}
// //         <div className="mb-4 pb-2 border-b border-gray-200">
// //           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
// //             <Calendar className="w-5 h-5 text-gray-500" />
// //             {format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })}
// //           </h2>
// //           <p className="text-sm text-gray-500 mt-1">
// //             {visites.length} visite{visites.length > 1 ? 's' : ''} programmée{visites.length > 1 ? 's' : ''}
// //           </p>
// //         </div>

// //         {/* Tableau des visites */}
// //         <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
// //           {loading ? (
// //             <div className="flex justify-center items-center py-12">
// //               <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
// //             </div>
// //           ) : visites.length === 0 ? (
// //             <div className="text-center py-12">
// //               <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
// //               <p className="text-gray-500">Aucune visite prévue pour cette journée</p>
// //               {isToday && pourcentage < 100 && (
// //                 <button
// //                   onClick={() => setShowModal(true)}
// //                   className="mt-4 text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2"
// //                 >
// //                   <Plus className="w-4 h-4" />
// //                   Programmer une visite
// //                 </button>
// //               )}
// //             </div>
// //           ) : (
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50 border-b border-gray-200">
// //                   <tr>
// //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Heure</th>
// //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Nom du Visiteur</th>
// //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Membre</th>
// //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Téléphone</th>
// //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Motif</th>
// //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Statut</th>
// //                     <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {visites.map((visite) => (
// //                     <tr key={visite.id} className="hover:bg-gray-50 transition">
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="flex items-center gap-2">
// //                           <Clock className="w-4 h-4 text-gray-400" />
// //                           <span className="text-sm font-medium text-gray-900">{visite.heure}</span>
// //                         </div>
// //                        </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-medium text-gray-900">{visite.nom_visiteur}</div>
// //                        </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span className={`px-2 py-1 text-xs rounded-full ${visite.est_membre ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
// //                           {visite.est_membre ? 'Membre' : 'Non-membre'}
// //                         </span>
// //                        </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visite.telephone}</td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="flex items-center gap-2">
// //                           <span className="text-lg">{getMotifIcon(visite.motif)}</span>
// //                           <span className="text-sm text-gray-700">{visite.motif}</span>
// //                         </div>
// //                        </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span className={`px-2 py-1 text-xs rounded-full ${getStatutColor(visite.statut)}`}>
// //                           {visite.statut}
// //                         </span>
// //                        </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="flex items-center gap-1">
// //                           <button
// //                             onClick={() => openNoteModal(visite)}
// //                             className="p-1 bg-purple-600 hover:bg-purple-700  transition"
// //                             title="Ajouter une note"
// //                           >
// //                             <StickyNote className="w-5 h-5 text-white" />
// //                           </button>
// //                           {visite.statut === 'En attente' && (
// //                             <button
// //                               onClick={() => openConfirmModal(visite.id)}
// //                               className="p-1 bg-green-600 hover:bg-green-700  transition"
// //                               title="Marquer comme reçu"
// //                             >
// //                               <Check className="w-5 h-5 text-white" />
// //                             </button>
// //                           )}
// //                           <button
// //                             onClick={() => openEditModal(visite)}
// //                             className="p-1 bg-blue-600 hover:bg-blue-700  transition"
// //                             title="Modifier"
// //                           >
// //                             <Edit2 className="w-5 h-5 text-white" />
// //                           </button>
// //                           {visite.statut !== 'Annulée' && (
// //                             <button
// //                               onClick={() => openAnnulerModal(visite.id)}
// //                               className="p-1 bg-red-600 hover:bg-red-700  transition"
// //                               title="Annuler"
// //                             >
// //                               <X className="w-5 h-5 text-white" />
// //                             </button>
// //                           )}
// //                         </div>
// //                        </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>

// //         <div className="mt-4 text-center">
// //           <p className="text-sm text-gray-500">
// //             📅 Les visites pastorales ont lieu les <span className="font-semibold">Mardis</span> et <span className="font-semibold">Mercredis</span>
// //           </p>
// //         </div>
// //       </div>

// //       {/* Modal de confirmation pour marquer comme reçu */}
// //       {showConfirmModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white shadow-xl max-w-md w-full">
// //             <div className="bg-green-600 text-white px-6 py-4">
// //               <h2 className="text-lg font-semibold">Confirmation</h2>
// //             </div>
// //             <div className="p-6">
// //               <p className="text-gray-700">Êtes-vous sûr de vouloir marquer cette visite comme reçue ?</p>
// //             </div>
// //             <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
// //               <button
// //                 onClick={() => {
// //                   setShowConfirmModal(false);
// //                   setVisiteToConfirm(null);
// //                 }}
// //                 className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
// //               >
// //                 Annuler
// //               </button>
// //               <button
// //                 onClick={marquerRecu}
// //                 className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white transition font-medium flex items-center gap-2"
// //               >
// //                 <Check className="w-4 h-4" />
// //                 Marquer comme reçu
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Modal d'annulation */}
// //       {showAnnulerModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white shadow-xl max-w-md w-full">
// //             <div className="bg-red-600 text-white px-6 py-4">
// //               <h2 className="text-lg font-semibold">Annuler la visite</h2>
// //             </div>
// //             <div className="p-6">
// //               <p className="text-gray-700 mb-4">Êtes-vous sûr de vouloir annuler cette visite ?</p>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Commentaire (optionnel)
// //               </label>
// //               <textarea
// //                 value={annulerCommentaire}
// //                 onChange={(e) => setAnnulerCommentaire(e.target.value)}
// //                 rows={3}
// //                 className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
// //                 placeholder="Raison de l'annulation..."
// //               />
// //             </div>
// //             <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
// //               <button
// //                 onClick={() => {
// //                   setShowAnnulerModal(false);
// //                   setVisiteToAnnuler(null);
// //                   setAnnulerCommentaire('');
// //                 }}
// //                 className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
// //               >
// //                 Retour
// //               </button>
// //               <button
// //                 onClick={confirmerAnnulation}
// //                 className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white transition font-medium flex items-center gap-2"
// //               >
// //                 <X className="w-4 h-4" />
// //                 Confirmer l'annulation
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Modal des notes pastorales */}
// //       {showNoteModal && selectedVisite && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
// //             <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-t-lg">
// //               <div className="flex justify-between items-center">
// //                 <div>
// //                   <h2 className="text-lg font-semibold flex items-center gap-2">
// //                     <StickyNote className="w-5 h-5" />
// //                     Notes pastorales
// //                   </h2>
// //                   <p className="text-sm text-purple-100 mt-1">
// //                     Visite de : {selectedVisite.nom_visiteur} - {selectedVisite.heure}
// //                   </p>
// //                 </div>
// //                 <button
// //                   onClick={() => setShowNoteModal(false)}
// //                   className="text-white hover:text-purple-100 transition"
// //                 >
// //                   <X className="w-5 h-5" />
// //                 </button>
// //               </div>
// //             </div>
            
// //             <div className="flex-1 overflow-y-auto p-6">
// //               {/* Formulaire d'ajout de note */}
// //               <form onSubmit={handleAddNote} className="mb-6">
// //                 {noteError && (
// //                   <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
// //                     {noteError}
// //                   </div>
// //                 )}
                
// //                 <div className="space-y-3">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Titre <span className="text-red-500">*</span>
// //                     </label>
// //                     <input
// //                       type="text"
// //                       required
// //                       value={noteFormData.titre}
// //                       onChange={(e) => setNoteFormData({...noteFormData, titre: e.target.value})}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
// //                       placeholder="Ex: Résumé, Points de prière, Conseil..."
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Contenu <span className="text-red-500">*</span>
// //                     </label>
// //                     <textarea
// //                       required
// //                       value={noteFormData.contenu}
// //                       onChange={(e) => setNoteFormData({...noteFormData, contenu: e.target.value})}
// //                       rows={3}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
// //                       placeholder="Écrivez votre note pastorale ici..."
// //                     />
// //                   </div>
                  
// //                   <div className="flex justify-end">
// //                     <button
// //                       type="submit"
// //                       disabled={submittingNote}
// //                       className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
// //                     >
// //                       {submittingNote && <Loader2 className="w-4 h-4 animate-spin" />}
// //                       <Plus className="w-4 h-4" />
// //                       Ajouter la note
// //                     </button>
// //                   </div>
// //                 </div>
// //               </form>

// //               {/* Liste des notes existantes */}
// //               <div className="border-t border-gray-200 pt-4">
// //                 <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
// //                   <FileText className="w-4 h-4" />
// //                   Notes existantes ({notes.length})
// //                 </h3>
                
// //                 {loadingNotes ? (
// //                   <div className="flex justify-center py-8">
// //                     <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
// //                   </div>
// //                 ) : notes.length === 0 ? (
// //                   <div className="text-center py-8 bg-gray-50 rounded-lg">
// //                     <StickyNote className="w-12 h-12 text-gray-300 mx-auto mb-2" />
// //                     <p className="text-gray-500 text-sm">Aucune note pour cette visite</p>
// //                   </div>
// //                 ) : (
// //                   <div className="space-y-3 max-h-96 overflow-y-auto">
// //                     {notes.map((note) => (
// //                       <div key={note.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
// //                         <div className="flex justify-between items-start mb-2">
// //                           <h4 className="font-semibold text-gray-800 text-sm">{note.titre}</h4>
// //                           <span className="text-xs text-gray-500">
// //                             {formatDate(note.created_at)}
// //                           </span>
// //                         </div>
// //                         <p className="text-gray-700 text-sm whitespace-pre-wrap">
// //                           {note.contenu}
// //                         </p>
// //                         {note.pasteur && (
// //                           <p className="text-xs text-gray-500 mt-2">
// //                             Par : {note.pasteur.nom_complet}
// //                           </p>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
            
// //             <div className="border-t border-gray-200 px-6 py-4 flex justify-end bg-gray-50 rounded-b-lg">
// //               <button
// //                 onClick={() => setShowNoteModal(false)}
// //                 className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition font-medium"
// //               >
// //                 Fermer
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Modal Nouvelle Visite */}
// //       {showModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
// //             <div className="sticky top-0 bg-blue-600 text-white border-b border-gray-200 px-6 py-4">
// //               <h2 className="text-lg font-semibold">
// //                 {editingVisite ? 'Modifier la visite' : 'Créer une Nouvelle Visite'}
// //               </h2>
// //             </div>
            
// //             <form onSubmit={handleSubmit} className="p-6">
// //               {error && (
// //                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-5">
// //                   {error}
// //                 </div>
// //               )}
              
// //               <div className="grid grid-cols-2 gap-x-5 gap-y-4">
// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Nom du Visiteur <span className="text-red-500">*</span>
// //                     </label>
// //                     <input
// //                       type="text"
// //                       required
// //                       value={formData.nom_visiteur}
// //                       onChange={(e) => setFormData({...formData, nom_visiteur: e.target.value})}
// //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                       placeholder="Entrez le nom complet"
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Téléphone <span className="text-red-500">*</span>
// //                     </label>
// //                     <input
// //                       type="tel"
// //                       required
// //                       value={formData.telephone}
// //                       onChange={(e) => setFormData({...formData, telephone: e.target.value})}
// //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                       placeholder="Numéro de téléphone"
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       value={formData.email}
// //                       onChange={(e) => setFormData({...formData, email: e.target.value})}
// //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                       placeholder="adresse@email.com"
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Membre <span className="text-red-500">*</span>
// //                     </label>
// //                     <div className="flex gap-4">
// //                       <label className="flex items-center gap-2 cursor-pointer">
// //                         <input
// //                           type="radio"
// //                           checked={formData.est_membre === true}
// //                           onChange={() => setFormData({...formData, est_membre: true})}
// //                           className="w-4 h-4 text-blue-600"
// //                         />
// //                         <span className="text-sm text-gray-700">Oui</span>
// //                       </label>
// //                       <label className="flex items-center gap-2 cursor-pointer">
// //                         <input
// //                           type="radio"
// //                           checked={formData.est_membre === false}
// //                           onChange={() => setFormData({...formData, est_membre: false})}
// //                           className="w-4 h-4 text-blue-600"
// //                         />
// //                         <span className="text-sm text-gray-700">Non</span>
// //                       </label>
// //                     </div>
// //                   </div>
// //                 </div>
                
// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Motif <span className="text-red-500">*</span>
// //                     </label>
// //                     <select
// //                       required
// //                       value={formData.motif}
// //                       onChange={(e) => setFormData({...formData, motif: e.target.value})}
// //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     >
// //                       <option value="">Sélectionner un motif</option>
// //                       <option value="Conseil">Conseil</option>
// //                       <option value="Prière">Prière</option>
// //                       <option value="Orientation">Orientation</option>
// //                       <option value="Autre">Autre</option>
// //                     </select>
// //                   </div>
                  
// //                   {formData.motif === 'Autre' && (
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">
// //                         Précisez le motif
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={formData.autre_motif}
// //                         onChange={(e) => setFormData({...formData, autre_motif: e.target.value})}
// //                         className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                         placeholder="Décrivez le motif"
// //                       />
// //                     </div>
// //                   )}
                  
// //                   <div className="grid grid-cols-2 gap-3">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">
// //                         Date <span className="text-red-500">*</span>
// //                       </label>
// //                       <input
// //                         type="date"
// //                         required
// //                         value={formData.date_visite}
// //                         onChange={handleDateChange}
// //                         className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                       />
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">
// //                         Heure <span className="text-red-500">*</span>
// //                       </label>
// //                       <input
// //                         type="time"
// //                         required
// //                         value={formData.heure}
// //                         onChange={(e) => setFormData({...formData, heure: e.target.value})}
// //                         className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                       />
// //                     </div>
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Notes
// //                     </label>
// //                     <textarea
// //                       value={formData.observations}
// //                       onChange={(e) => setFormData({...formData, observations: e.target.value})}
// //                       rows={3}
// //                       className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
// //                       placeholder="Ajouter des notes..."
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-6 pt-4 flex justify-end gap-3">
// //                 <button
// //                   type="button"
// //                   onClick={closeModal}
// //                   className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
// //                 >
// //                   Annuler
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   disabled={submitting || (isToday && stats.total >= stats.quota && !editingVisite)}
// //                   className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
// //                 >
// //                   {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
// //                   {editingVisite ? 'Mettre à jour' : 'Créer la visite'}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // // }

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
//   TrendingUp,
//   X,
//   Check,
//   FileText,
//   StickyNote,
//   Save
// } from 'lucide-react';
// import { 
//   createVisite, 
//   updateStatut, 
//   getVisitesParDate,
//   checkVisiteurExists,
//   updateVisite,
//   annulerVisite,
//   marquerCommeRecu,
//   createNotePasteur,
//   getNotesByVisite,
//   updateNotePasteur
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

// interface Note {
//   id: number;
//   titre: string;
//   contenu: string;
//   created_at: string;
//   updated_at: string;
//   pasteur?: {
//     nom_complet: string;
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
  
//   if (dayOfWeek === 2 || dayOfWeek === 3) {
//     return date;
//   } else if (dayOfWeek < 2) {
//     return addDays(date, 2 - dayOfWeek);
//   } else {
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
  
//   // États pour le modal des notes
//   const [showNoteModal, setShowNoteModal] = useState(false);
//   const [selectedVisite, setSelectedVisite] = useState<Visite | null>(null);
//   const [existingNote, setExistingNote] = useState<Note | null>(null);
//   const [loadingNote, setLoadingNote] = useState(false);
//   const [noteContenu, setNoteContenu] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [submittingNote, setSubmittingNote] = useState(false);
//   const [noteError, setNoteError] = useState('');

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

//   // Charger la note d'une visite
//   const loadNote = async (visiteId: number) => {
//     setLoadingNote(true);
//     const result = await getNotesByVisite(visiteId);
//     if (result.success && result.data && result.data.length > 0) {
//       setExistingNote(result.data[0] as Note);
//       setNoteContenu(result.data[0].contenu);
//     } else {
//       setExistingNote(null);
//       setNoteContenu('');
//     }
//     setLoadingNote(false);
//   };

//   // Ouvrir le modal des notes
//   const openNoteModal = async (visite: Visite) => {
//     setSelectedVisite(visite);
//     setNoteError('');
//     setIsEditing(false);
//     await loadNote(visite.id);
//     setShowNoteModal(true);
//   };

//   // Activer le mode édition
//   const handleEditNote = () => {
//     setIsEditing(true);
//   };

//   // Annuler l'édition
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     if (existingNote) {
//       setNoteContenu(existingNote.contenu);
//     } else {
//       setNoteContenu('');
//     }
//     setNoteError('');
//   };

//   // Sauvegarder ou créer la note
//   const handleSaveNote = async () => {
//     if (!noteContenu.trim()) {
//       setNoteError('Le contenu de la note est requis');
//       return;
//     }

//     setSubmittingNote(true);
//     setNoteError('');

//     const formDataObj = new FormData();
//     formDataObj.append('visite_id', selectedVisite!.id.toString());
    
//     // Titre automatique
//     const autoTitle = `Note pastorale - ${selectedVisite!.nom_visiteur} - ${format(new Date(selectedVisite!.date_visite), 'dd/MM/yyyy')}`;
//     formDataObj.append('titre', autoTitle);
//     formDataObj.append('contenu', noteContenu);

//     let result;
//     if (existingNote) {
//       // Mise à jour
//       formDataObj.append('note_id', existingNote.id.toString());
//       result = await updateNotePasteur(formDataObj);
//     } else {
//       // Création
//       result = await createNotePasteur(formDataObj);
//     }
    
//     if (result.success) {
//       await loadNote(selectedVisite!.id);
//       setIsEditing(false);
//     } else {
//       setNoteError(result.error || 'Erreur lors de la sauvegarde de la note');
//     }
//     setSubmittingNote(false);
//   };

//   useEffect(() => {
//     loadVisites();
//   }, [currentDate]);

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
      
//       if (confirm(`Voulez-vous utiliser le ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })} à la place ?`)) {
//         setFormData({...formData, date_visite: nextValidStr});
//         setError('');
//       }
//     }
//   };

//   const openConfirmModal = (id: number) => {
//     setVisiteToConfirm(id);
//     setShowConfirmModal(true);
//   };

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

//   const openAnnulerModal = (id: number) => {
//     setVisiteToAnnuler(id);
//     setAnnulerCommentaire('');
//     setShowAnnulerModal(true);
//   };

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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError('');

//     const selectedDate = new Date(formData.date_visite);
//     if (!isValidVisitDate(selectedDate)) {
//       setError('❌ Les visites pastorales ont lieu uniquement les MARDIS et MERCREDIS');
//       setSubmitting(false);
//       return;
//     }

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

//   const formatDate = (dateString: string) => {
//     return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
//   };

//   const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
//   const placesRestantes = stats.quota - stats.total;
//   const pourcentage = (stats.total / stats.quota) * 100;
  
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
//             className="bg-green-600 text-sm hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition shadow-sm"
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
          
//           {isToday && (
//             <div className="mt-3">
//               <div className="w-full bg-gray-200 h-2 overflow-hidden">
//                 <div 
//                   className={`h-2 transition-all duration-500 ease-out ${getProgressBarColor()}`}
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
//           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-blue-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total visites</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
//               </div>
//               <Users className="w-6 h-6 text-blue-500" />
//             </div>
//           </div>
          
//           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-yellow-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">En attente</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.en_attente}</p>
//               </div>
//               <Clock className="w-6 h-6 text-yellow-500" />
//             </div>
//           </div>
          
//           <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-green-500 hover:shadow-md transition">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Reçues</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.recus}</p>
//               </div>
//               <CheckCircle className="w-6 h-6 text-green-500" />
//             </div>
//           </div>
          
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
//                         <span className={`px-2 py-1 text-xs rounded-full ${visite.est_membre ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
//                           {visite.est_membre ? 'Membre' : 'Non-membre'}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visite.telephone}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <span className="text-lg">{getMotifIcon(visite.motif)}</span>
//                           <span className="text-sm text-gray-700">{visite.motif}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs rounded-full ${getStatutColor(visite.statut)}`}>
//                           {visite.statut}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => openNoteModal(visite)}
//                             className="p-1 bg-purple-600 hover:bg-purple-700  transition"
//                             title="Note pastorale"
//                           >
//                             <StickyNote className="w-5 h-5 text-white" />
//                           </button>
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

//       {/* Modal des notes pastorales - Une seule note par visite */}
//       {showNoteModal && selectedVisite && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
//             <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-t-lg">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-semibold flex items-center gap-2">
//                     <StickyNote className="w-5 h-5" />
//                     Note Pastorale
//                   </h2>
//                   <p className="text-sm text-purple-100 mt-1">
//                     {selectedVisite.nom_visiteur} - {format(new Date(selectedVisite.date_visite), 'EEEE d MMMM yyyy', { locale: fr })} à {selectedVisite.heure}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowNoteModal(false)}
//                   className="text-white hover:text-purple-100 transition"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="flex-1 overflow-y-auto p-6">
//               {loadingNote ? (
//                 <div className="flex justify-center py-12">
//                   <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
//                 </div>
//               ) : (
//                 <>
//                   {/* Affichage du titre automatique */}
//                   <div className="mb-4 pb-3 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-xs text-gray-500 uppercase font-semibold">Titre</p>
//                         <p className="text-md font-semibold text-gray-800">
//                           Note pastorale - {selectedVisite.nom_visiteur} - {format(new Date(selectedVisite.date_visite), 'dd/MM/yyyy')}
//                         </p>
//                       </div>
//                       {existingNote && !isEditing && (
//                         <div className="text-xs text-gray-500">
//                           Créé le {formatDate(existingNote.created_at)}
//                           {existingNote.updated_at !== existingNote.created_at && (
//                             <span className="ml-2 italic">(modifié)</span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Affichage de la note existante ou formulaire */}
//                   {existingNote && !isEditing ? (
//                     <div className="space-y-4">
//                       <div>
//                         <div className="flex justify-between items-start mb-2">
//                           <p className="text-xs text-gray-500 uppercase font-semibold">Contenu</p>
//                           <button
//                             onClick={handleEditNote}
//                             className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                             Modifier
//                           </button>
//                         </div>
//                         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                           <p className="text-gray-700 whitespace-pre-wrap">{existingNote.contenu}</p>
//                         </div>
//                       </div>
//                       {existingNote.pasteur && (
//                         <p className="text-xs text-gray-500 text-right">
//                           Par : {existingNote.pasteur.nom_complet}
//                         </p>
//                       )}
//                     </div>
//                   ) : (
//                     <form onSubmit={(e) => { e.preventDefault(); handleSaveNote(); }} className="space-y-4">
//                       {noteError && (
//                         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//                           {noteError}
//                         </div>
//                       )}
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Contenu de la note <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                           required
//                           value={noteContenu}
//                           onChange={(e) => setNoteContenu(e.target.value)}
//                           rows={8}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
//                           placeholder="Écrivez votre note pastorale ici..."
//                           autoFocus
//                         />
//                       </div>
                      
//                       <div className="flex justify-end gap-3">
//                         {existingNote && (
//                           <button
//                             type="button"
//                             onClick={handleCancelEdit}
//                             className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
//                           >
//                             Annuler
//                           </button>
//                         )}
//                         <button
//                           type="submit"
//                           disabled={submittingNote}
//                           className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
//                         >
//                           {submittingNote && <Loader2 className="w-4 h-4 animate-spin" />}
//                           <Save className="w-4 h-4" />
//                           {existingNote ? 'Mettre à jour' : 'Créer la note'}
//                         </button>
//                       </div>
//                     </form>
//                   )}
//                 </>
//               )}
//             </div>
            
//             <div className="border-t border-gray-200 px-6 py-4 flex justify-end bg-gray-50 rounded-b-lg">
//               <button
//                 onClick={() => setShowNoteModal(false)}
//                 className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition font-medium"
//               >
//                 Fermer
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
  TrendingUp,
  X,
  Check,
  FileText,
  StickyNote,
  Save
} from 'lucide-react';
import { 
  createVisite, 
  updateStatut, 
  getVisitesParDate,
  checkVisiteurExists,
  updateVisite,
  annulerVisite,
  marquerCommeRecu,
  createNotePasteur,
  getNotesByVisite,
  updateNotePasteur
} from '@/actions/visites';
import { getConfiguration } from '@/actions/configuration';

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

interface Note {
  id: number;
  titre: string;
  contenu: string;
  created_at: string;
  updated_at: string;
  pasteur?: {
    nom_complet: string;
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
  
  if (dayOfWeek === 2 || dayOfWeek === 3) {
    return date;
  } else if (dayOfWeek < 2) {
    return addDays(date, 2 - dayOfWeek);
  } else {
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
  
  // États pour le modal des notes
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedVisite, setSelectedVisite] = useState<Visite | null>(null);
  const [existingNote, setExistingNote] = useState<Note | null>(null);
  const [loadingNote, setLoadingNote] = useState(false);
  const [noteContenu, setNoteContenu] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [submittingNote, setSubmittingNote] = useState(false);
  const [noteError, setNoteError] = useState('');

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

  // Charger la note d'une visite
  const loadNote = async (visiteId: number) => {
    setLoadingNote(true);
    const result = await getNotesByVisite(visiteId);
    if (result.success && result.data && result.data.length > 0) {
      setExistingNote(result.data[0] as Note);
      setNoteContenu(result.data[0].contenu);
    } else {
      setExistingNote(null);
      setNoteContenu('');
    }
    setLoadingNote(false);
  };

  // Ouvrir le modal des notes
  const openNoteModal = async (visite: Visite) => {
    setSelectedVisite(visite);
    setNoteError('');
    setIsEditing(false);
    await loadNote(visite.id);
    setShowNoteModal(true);
  };

  // Activer le mode édition
  const handleEditNote = () => {
    setIsEditing(true);
  };

  // Annuler l'édition
  const handleCancelEdit = () => {
    setIsEditing(false);
    if (existingNote) {
      setNoteContenu(existingNote.contenu);
    } else {
      setNoteContenu('');
    }
    setNoteError('');
  };

  // Sauvegarder ou créer la note
  const handleSaveNote = async () => {
    if (!noteContenu.trim()) {
      setNoteError('Le contenu de la note est requis');
      return;
    }

    setSubmittingNote(true);
    setNoteError('');

    const formDataObj = new FormData();
    formDataObj.append('visite_id', selectedVisite!.id.toString());
    
    // Titre automatique
    const autoTitle = `Note pastorale - ${selectedVisite!.nom_visiteur} - ${format(new Date(selectedVisite!.date_visite), 'dd/MM/yyyy')}`;
    formDataObj.append('titre', autoTitle);
    formDataObj.append('contenu', noteContenu);

    let result;
    if (existingNote) {
      // Mise à jour
      formDataObj.append('note_id', existingNote.id.toString());
      result = await updateNotePasteur(formDataObj);
    } else {
      // Création
      result = await createNotePasteur(formDataObj);
    }
    
    if (result.success) {
      await loadNote(selectedVisite!.id);
      setIsEditing(false);
    } else {
      setNoteError(result.error || 'Erreur lors de la sauvegarde de la note');
    }
    setSubmittingNote(false);
  };

  useEffect(() => {
    loadVisites();
  }, [currentDate]);

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
      
      if (confirm(`Voulez-vous utiliser le ${dayName} ${format(nextValid, 'd MMMM', { locale: fr })} à la place ?`)) {
        setFormData({...formData, date_visite: nextValidStr});
        setError('');
      }
    }
  };

  const openConfirmModal = (id: number) => {
    setVisiteToConfirm(id);
    setShowConfirmModal(true);
  };

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

  const openAnnulerModal = (id: number) => {
    setVisiteToAnnuler(id);
    setAnnulerCommentaire('');
    setShowAnnulerModal(true);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const selectedDate = new Date(formData.date_visite);
    if (!isValidVisitDate(selectedDate)) {
      setError('❌ Les visites pastorales ont lieu uniquement les MARDIS et MERCREDIS');
      setSubmitting(false);
      return;
    }

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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
  };

  const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  const placesRestantes = stats.quota - stats.total;
  const pourcentage = (stats.total / stats.quota) * 100;
  
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
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              <span className="text-sm text-gray-600 hidden sm:inline">
                {format(subDays(currentDate, 1), 'dd/MM', { locale: fr })}
              </span>
            </button>
            
            <button
              onClick={today}
              className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
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
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition group"
            >
              <span className="text-sm text-gray-600 hidden sm:inline">
                {format(addDays(currentDate, 1), 'dd/MM', { locale: fr })}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </button>
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-sm hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition shadow-sm"
          >
            <Plus className="w-3 h-3" />
            Nouvelle Visite
          </button>
        </div>

        {/* Quota avec barre de progression */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">
                  Quota journalier
                </span>
                {isToday && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
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
          <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-blue-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total visites</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-yellow-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">En attente</p>
                <p className="text-2xl font-bold text-gray-800">{stats.en_attente}</p>
              </div>
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white shadow-sm py-3 px-5 border-l-4 border-green-500 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Reçues</p>
                <p className="text-2xl font-bold text-gray-800">{stats.recus}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          
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
                        <span className={`px-2 py-1 text-xs rounded-full ${visite.est_membre ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
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
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatutColor(visite.statut)}`}>
                          {visite.statut}
                        </span>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openNoteModal(visite)}
                            className="p-1 bg-purple-600 hover:bg-purple-700  transition"
                            title="Note pastorale"
                          >
                            <FileText className="w-5 h-5 text-white" />
                          </button>
                          {visite.statut === 'En attente' && (
                            <button
                              onClick={() => openConfirmModal(visite.id)}
                              className="p-1 bg-green-600 hover:bg-green-700  transition"
                              title="Marquer comme reçu"
                            >
                              <Check className="w-5 h-5 text-white" />
                            </button>
                          )}
                          <button
                            onClick={() => openEditModal(visite)}
                            className="p-1 bg-blue-600 hover:bg-blue-700  transition"
                            title="Modifier"
                          >
                            <Edit2 className="w-5 h-5 text-white" />
                          </button>
                          {visite.statut !== 'Annulée' && (
                            <button
                              onClick={() => openAnnulerModal(visite.id)}
                              className="p-1 bg-red-600 hover:bg-red-700  transition"
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

      {/* Modal des notes pastorales - Une seule note par visite */}
      {showNoteModal && selectedVisite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white  shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r bg-blue-500 text-white px-6 py-4 -t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Note Pastorale
                  </h2>
                 
                </div>
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="text-white hover:text-purple-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {loadingNote ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              ) : (
                <>
                  {/* Affichage du titre automatique */}
                  <div className="mb-4 pb-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Titre</p>
                        <p className="text-md font-semibold text-gray-800">
                          Note pastorale - {selectedVisite.nom_visiteur} - {format(new Date(selectedVisite.date_visite), 'dd/MM/yyyy')}
                        </p>
                      </div>
                      {existingNote && !isEditing && (
                        <div className="text-xs text-gray-500">
                          Créé le {formatDate(existingNote.created_at)}
                          {existingNote.updated_at !== existingNote.created_at && (
                            <span className="ml-2 italic">(modifié)</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Affichage de la note existante ou formulaire */}
                  {existingNote && !isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-xs text-gray-500 uppercase font-semibold">Contenu</p>
                          <button
                            onClick={handleEditNote}
                            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                          >
                            <Edit2 className="w-4 h-4" />
                            Modifier
                          </button>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p className="text-gray-700 whitespace-pre-wrap">{existingNote.contenu}</p>
                        </div>
                      </div>
                      {existingNote.pasteur && (
                        <p className="text-xs text-gray-500 text-right">
                          Par : {existingNote.pasteur.nom_complet}
                        </p>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveNote(); }} className="space-y-4">
                      {noteError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                          {noteError}
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contenu de la note <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={noteContenu}
                          onChange={(e) => setNoteContenu(e.target.value)}
                          rows={8}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                          placeholder="Écrivez votre note pastorale ici..."
                          autoFocus
                        />
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        {existingNote && (
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
                          >
                            Annuler
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={submittingNote}
                          className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                        >
                          {submittingNote && <Loader2 className="w-4 h-4 animate-spin" />}
                          <Save className="w-4 h-4" />
                          {existingNote ? 'Mettre à jour' : 'Créer la note'}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end bg-gray-50 ">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition font-medium"
              >
                Fermer
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