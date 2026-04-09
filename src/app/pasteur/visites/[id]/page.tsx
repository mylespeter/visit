'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, User, Phone, Calendar as CalendarIcon, Clock, Tag, FileText } from 'lucide-react';
import { getVisitesParDate } from '@/actions/visites';
import NotesPasteur from '@/components/NotesPasteur';

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
  membre?: {
    nom_complet: string;
    membre_profile: string;
  };
}

export default function VisiteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [visite, setVisite] = useState<Visite | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisite = async () => {
      const result = await getVisitesParDate(format(new Date(), 'yyyy-MM-dd'));
      if (result.success && result.data) {
        const found = result.data.find((v: Visite) => v.id === parseInt(params.id as string));
        setVisite(found || null);
      }
      setLoading(false);
    };
    loadVisite();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!visite) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Visite non trouvée</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton retour */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à la liste
        </button>

        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {visite.nom_visiteur}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  visite.statut === 'Reçue' ? 'bg-green-100 text-green-800' :
                  visite.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {visite.statut}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  {format(new Date(visite.date_visite), 'EEEE d MMMM yyyy', { locale: fr })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {visite.heure}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            Informations du visiteur
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold">Téléphone</label>
              <p className="text-gray-800 mt-1 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                {visite.telephone}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold">Sexe</label>
              <p className="text-gray-800 mt-1">
                {visite.sexe === 'M' ? 'Homme' : visite.sexe === 'F' ? 'Femme' : visite.sexe}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold">Membre</label>
              <p className="text-gray-800 mt-1">
                {visite.est_membre ? (
                  <span className="text-green-600">✓ Membre</span>
                ) : (
                  <span className="text-gray-600">Non-membre</span>
                )}
              </p>
              {visite.est_membre && visite.membre && (
                <p className="text-sm text-gray-600 mt-1">
                  {visite.membre.nom_complet} ({visite.membre.membre_profile})
                </p>
              )}
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold">Motif</label>
              <p className="text-gray-800 mt-1 flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {visite.motif}
              </p>
              {visite.autre_motif && (
                <p className="text-sm text-gray-600 mt-1">: {visite.autre_motif}</p>
              )}
            </div>
          </div>
          {visite.observations && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="text-xs text-gray-500 uppercase font-semibold flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Observations
              </label>
              <p className="text-gray-700 mt-1 text-sm">{visite.observations}</p>
            </div>
          )}
        </div>

        {/* Section des notes pastorales */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <NotesPasteur 
            visiteId={visite.id} 
            visiteNom={visite.nom_visiteur}
          />
        </div>
      </div>
    </div>
  );
}