'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Role {
  id: number
  nom: string
}

interface NewUserFormProps {
  roles: Role[]
}

export default function NewUserForm({ roles }: NewUserFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom_complet: '',
    email: '',
    numero: '',
    adresse: '',
    mot_de_passe: '',
    role_id: 4 // Visiteur par défaut
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Vérifier si l'email existe déjà
      const { data: existingEmail } = await supabase
        .from('compte')
        .select('id')
        .eq('email', formData.email)
        .single()

      if (existingEmail) {
        toast.error('Cet email est déjà utilisé')
        setIsLoading(false)
        return
      }

      // Vérifier si le numéro existe déjà
      const { data: existingPhone } = await supabase
        .from('compte')
        .select('id')
        .eq('numero', formData.numero)
        .single()

      if (existingPhone) {
        toast.error('Ce numéro est déjà utilisé')
        setIsLoading(false)
        return
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(formData.mot_de_passe, 10)

      // Créer l'utilisateur
      const { error } = await supabase
        .from('compte')
        .insert([{
          nom_complet: formData.nom_complet,
          email: formData.email,
          numero: formData.numero,
          adresse: formData.adresse,
          mot_de_passe: hashedPassword,
          role_id: formData.role_id
        }])

      if (error) {
        toast.error('Erreur lors de la création')
      } else {
        toast.success('Utilisateur créé avec succès')
        router.push('/admin/utilisateurs')
        router.refresh()
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
          Nom complet
        </label>
        <input
          type="text"
          required
          value={formData.nom_complet}
          onChange={(e) => setFormData({...formData, nom_complet: e.target.value})}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
          placeholder="Jean Dupont"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
          Email
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
          placeholder="jean@exemple.com"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
          Numéro de téléphone
        </label>
        <input
          type="tel"
          required
          value={formData.numero}
          onChange={(e) => setFormData({...formData, numero: e.target.value})}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
          placeholder="+243 XX XXX XXXX"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
          Adresse
        </label>
        <textarea
          value={formData.adresse}
          onChange={(e) => setFormData({...formData, adresse: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
          placeholder="Adresse complète"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={formData.mot_de_passe}
          onChange={(e) => setFormData({...formData, mot_de_passe: e.target.value})}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
          placeholder="Minimum 6 caractères"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
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

      <div className="flex justify-end gap-3 pt-4">
        <Link
          href="/admin/utilisateurs"
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Annuler
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Création...' : 'Créer l\'utilisateur'}
        </button>
      </div>
    </form>
  )
}