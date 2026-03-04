// app/pasteur/visites/NotesPrivees.tsx
'use client'

import { useState } from 'react'
import { Lock, Plus, Trash2, Edit2, Calendar, User, Save, X, Clock, Paperclip } from 'lucide-react'
import { createNote, updateNote, deleteNote } from '@/actions/notes-pasteur'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface Note {
  id: number
  pasteur_id: number
  titre: string
  contenu: string
  visite_id: number | null
  created_at: string
  updated_at?: string
}

interface Visite {
  id: number
  nom_visiteur: string
  date_visite: string
  heure: string
  telephone?: string
  motif?: string
  membre?: {
    membre_profile?: string | null
    nom_complet?: string
  } | null
}

interface Props {
  notes: Note[]
  pasteurId: number
  visites: Visite[]
}

export default function NotesPrivees({ notes, pasteurId, visites }: Props) {
  const router = useRouter()
  const [showNewNoteForm, setShowNewNoteForm] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    visite_id: ''
  })

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingNote) {
        const result = await updateNote(editingNote.id, {
          titre: formData.titre,
          contenu: formData.contenu,
          visite_id: formData.visite_id || null
        })
        
        if (result.error) {
          toast.error(result.error)
        } else {
          toast.success('Note mise à jour')
        }
      } else {
        const result = await createNote({
          pasteur_id: pasteurId,
          titre: formData.titre,
          contenu: formData.contenu,
          visite_id: formData.visite_id || null
        })
        
        if (result.error) {
          toast.error(result.error)
        } else {
          toast.success('Note créée')
        }
      }
      
      setFormData({ titre: '', contenu: '', visite_id: '' })
      setShowNewNoteForm(false)
      setEditingNote(null)
      router.refresh()
    } catch (error) {
      toast.error('Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setFormData({
      titre: note.titre,
      contenu: note.contenu,
      visite_id: note.visite_id?.toString() || ''
    })
    setShowNewNoteForm(true)
  }

  const handleDelete = async (noteId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      const result = await deleteNote(noteId)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Note supprimée')
        router.refresh()
      }
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const notesTriees = [...notes].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <div className="space-y-6">
      {/* En-tête avec bouton d'ajout - style VisitesList */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700">
              Notes privées et confidentielles
            </h2>
          </div>
          <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
            {notesTriees.length} note{notesTriees.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-500">
            Ces notes ne sont visibles que par vous
          </p>
          <button
            onClick={() => {
              setShowNewNoteForm(true)
              setEditingNote(null)
              setFormData({ titre: '', contenu: '', visite_id: '' })
            }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            Nouvelle note
          </button>
        </div>
      </div>

      {/* Formulaire d'ajout/édition */}
      {showNewNoteForm && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700">
              {editingNote ? 'Modifier la note' : 'Nouvelle note'}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label htmlFor="titre" className="block text-xs font-medium text-gray-500 uppercase mb-1">
                Titre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="titre"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Titre de la note"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="visite" className="block text-xs font-medium text-gray-500 uppercase mb-1">
                Lier à une visite (optionnel)
              </label>
              <select
                id="visite"
                value={formData.visite_id}
                onChange={(e) => setFormData({ ...formData, visite_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                disabled={isSubmitting}
              >
                <option value="">Sélectionner une visite</option>
                {visites.map(visite => (
                  <option key={visite.id} value={visite.id}>
                    {visite.nom_visiteur} - {new Date(visite.date_visite).toLocaleDateString('fr-FR')} à {visite.heure}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contenu" className="block text-xs font-medium text-gray-500 uppercase mb-1">
                Contenu <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contenu"
                value={formData.contenu}
                onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Vos notes personnelles..."
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowNewNoteForm(false)
                  setEditingNote(null)
                  setFormData({ titre: '', contenu: '', visite_id: '' })
                }}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:opacity-50"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Enregistrement...' : (editingNote ? 'Mettre à jour' : 'Enregistrer')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des notes - style VisitesList */}
      {notesTriees.length === 0 && !showNewNoteForm ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Aucune note privée</h3>
          <p className="text-xs text-gray-500 mb-4">Commencez à prendre des notes sur vos entretiens</p>
          <button
            onClick={() => setShowNewNoteForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            Créer une note
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {notesTriees.map(note => {
            const visiteLiee = note.visite_id ? visites.find(v => v.id === note.visite_id) : null
            
            return (
              <div key={note.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                {/* En-tête de la note */}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {visiteLiee?.membre?.membre_profile ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 flex-shrink-0">
                        <Image
                          src={visiteLiee.membre.membre_profile}
                          alt={visiteLiee.nom_visiteur}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : visiteLiee ? (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-600 ring-2 ring-gray-200 flex-shrink-0">
                        {getInitials(visiteLiee.nom_visiteur)}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 ring-2 ring-gray-200 flex-shrink-0">
                        <Lock className="h-4 w-4" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">{note.titre}</h3>
                        {visiteLiee && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            #{visiteLiee.nom_visiteur}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(note.created_at)}
                        </span>
                        {visiteLiee && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(visiteLiee.date_visite).toLocaleDateString('fr-FR')} à {visiteLiee.heure}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-4">
                    <button
                      onClick={() => handleEdit(note)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Contenu de la note */}
                <div className="p-4">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {note.contenu}
                  </div>
                </div>

                {/* Badge confidentiel */}
                <div className="px-4 pb-4">
                  <div className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    <Lock className="h-3 w-3" />
                    Confidentiel
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}