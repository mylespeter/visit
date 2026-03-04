'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface User {
  id: number
  nom_complet: string
  email: string
  numero: string
  adresse: string
  role_id: number
  role: {
    id: number
    nom: string
  }
}

interface Role {
  id: number
  nom: string
}

interface UserActionsProps {
  user: User
  roles: Role[]
  currentUserId: number
}

export default function UserActions({ user, roles, currentUserId }: UserActionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({
    nom_complet: user.nom_complet,
    email: user.email || '',
    numero: user.numero,
    adresse: user.adresse || '',
    role_id: user.role_id
  })
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await supabase
      .from('compte')
      .update({
        nom_complet: formData.nom_complet,
        email: formData.email,
        numero: formData.numero,
        adresse: formData.adresse,
        role_id: formData.role_id
      })
      .eq('id', user.id)

    if (error) {
      toast.error('Erreur lors de la modification')
    } else {
      toast.success('Utilisateur modifié avec succès')
      setIsEditing(false)
      router.refresh()
    }
  }

  const handleDelete = async () => {
    if (user.id === currentUserId) {
      toast.error('Vous ne pouvez pas supprimer votre propre compte')
      return
    }

    const confirm = window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.nom_complet} ?`)
    if (!confirm) return

    setIsDeleting(true)
    
    const { error } = await supabase
      .from('compte')
      .delete()
      .eq('id', user.id)

    setIsDeleting(false)

    if (error) {
      toast.error('Erreur lors de la suppression')
    } else {
      toast.success('Utilisateur supprimé avec succès')
      router.refresh()
    }
  }

  return (
    <div className="relative">
      {/* Menu des actions */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-100 shadow-lg z-20 py-1">
            <button
              onClick={() => {
                setIsEditing(true)
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier
            </button>
            <button
              onClick={() => {
                handleDelete()
                setIsOpen(false)
              }}
              disabled={isDeleting}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {isDeleting ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        </>
      )}

      {/* Modal d'édition */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Modifier l'utilisateur
            </h3>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  required
                  value={formData.nom_complet}
                  onChange={(e) => setFormData({...formData, nom_complet: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.numero}
                  onChange={(e) => setFormData({...formData, numero: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Adresse
                </label>
                <textarea
                  value={formData.adresse}
                  onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Rôle
                </label>
                <select
                  value={formData.role_id}
                  onChange={(e) => setFormData({...formData, role_id: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}