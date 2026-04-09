'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Check, 
  Loader2,
  FileText,
  Calendar,
  User
} from 'lucide-react';
import { getNotesByVisite, createNotePasteur, updateNotePasteur, deleteNotePasteur } from '@/actions/visites';

interface Note {
  id: number;
  titre: string;
  contenu: string;
  created_at: string;
  updated_at: string;
  pasteur: {
    id: number;
    nom_complet: string;
    email: string;
  };
}

interface NotesPasteurProps {
  visiteId: number;
  visiteNom: string;
  onNoteAdded?: () => void;
}

export default function NotesPasteur({ visiteId, visiteNom, onNoteAdded }: NotesPasteurProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    titre: '',
    contenu: ''
  });

  // Charger les notes
  const loadNotes = async () => {
    setLoading(true);
    const result = await getNotesByVisite(visiteId);
    if (result.success && result.data) {
      setNotes(result.data as Note[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (visiteId) {
      loadNotes();
    }
  }, [visiteId]);

  // Ouvrir modal pour nouvelle note
  const openCreateModal = () => {
    setEditingNote(null);
    setFormData({ titre: '', contenu: '' });
    setError('');
    setShowModal(true);
  };

  // Ouvrir modal pour éditer
  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setFormData({
      titre: note.titre,
      contenu: note.contenu
    });
    setError('');
    setShowModal(true);
  };

  // Créer ou modifier une note
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const formDataObj = new FormData();
    formDataObj.append('visite_id', visiteId.toString());
    formDataObj.append('titre', formData.titre);
    formDataObj.append('contenu', formData.contenu);
    
    if (editingNote) {
      formDataObj.append('note_id', editingNote.id.toString());
    }

    const result = editingNote 
      ? await updateNotePasteur(formDataObj)
      : await createNotePasteur(formDataObj);
    
    if (result.success) {
      setShowModal(false);
      loadNotes();
      if (onNoteAdded) onNoteAdded();
      setFormData({ titre: '', contenu: '' });
    } else {
      setError(result.error || `Erreur lors de la ${editingNote ? 'modification' : 'création'} de la note`);
    }
    setSubmitting(false);
  };

  // Supprimer une note
  const handleDelete = async (noteId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      const result = await deleteNotePasteur(noteId);
      if (result.success) {
        loadNotes();
        if (onNoteAdded) onNoteAdded();
      } else {
        setError(result.error || 'Erreur lors de la suppression');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
  };

  return (
    <div className="mt-6">
      {/* En-tête avec bouton d'ajout */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Notes pastorales
          </h3>
          <span className="text-sm text-gray-500">
            ({notes.length} note{notes.length > 1 ? 's' : ''})
          </span>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
        >
          <Plus className="w-4 h-4" />
          Ajouter une note
        </button>
      </div>

      {/* Liste des notes */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Aucune note pour cette visite</p>
          <button
            onClick={openCreateModal}
            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Ajouter une première note
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{note.titre}</h4>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {note.pasteur?.nom_complet || 'Pasteur'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(note.created_at)}
                    </span>
                    {note.updated_at !== note.created_at && (
                      <span className="italic">(modifié)</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(note)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-gray-700 text-sm whitespace-pre-wrap">
                {note.contenu}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de création/édition */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-lg font-semibold">
                {editingNote ? 'Modifier la note' : 'Nouvelle note pastorale'}
              </h2>
              <p className="text-sm text-blue-100 mt-1">
                Visite de : {visiteNom}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="p-6 flex-1">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.titre}
                      onChange={(e) => setFormData({...formData, titre: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: Résumé de la visite, Points de prière..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contenu <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.contenu}
                      onChange={(e) => setFormData({...formData, contenu: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="Écrivez vos observations, conseils, prières, etc..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingNote ? 'Mettre à jour' : 'Créer la note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}