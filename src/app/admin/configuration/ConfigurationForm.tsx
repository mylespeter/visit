'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateConfiguration } from '@/actions/configuration'
import toast from 'react-hot-toast'

interface Config {
  id: number
  cle: string
  valeur: string
  description: string
}

interface ConfigurationFormProps {
  configs: Config[]
}

export default function ConfigurationForm({ configs }: ConfigurationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState<Record<string, string>>(
    configs.reduce((acc, config) => ({ ...acc, [config.cle]: config.valeur }), {})
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await updateConfiguration(values)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Configuration mise à jour')
      router.refresh()
    }
    setIsLoading(false)
  }

  const configItems = [
    {
      cle: 'quota_journalier',
      label: 'Quota journalier',
      description: 'Nombre maximum de visites par jour',
      type: 'number',
      min: 1,
      max: 100
    },
    {
      cle: 'heures_ouverture',
      label: 'Heure d\'ouverture',
      description: 'Début des rendez-vous',
      type: 'time'
    },
    {
      cle: 'heures_fermeture',
      label: 'Heure de fermeture',
      description: 'Fin des rendez-vous',
      type: 'time'
    },
    {
      cle: 'intervalle_rendez_vous',
      label: 'Intervalle (minutes)',
      description: 'Espace entre chaque rendez-vous',
      type: 'number',
      min: 15,
      max: 120,
      step: 15
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <form onSubmit={handleSubmit} className="p-3  grid grid-cols-2 gap-3">
        {configItems.map((item) => (
          <div key={item.cle} className="space-y-2 ">
            <label className="block text-sm font-medium text-gray-700">
              {item.label}
            </label>
            <p className="text-xs text-gray-400">{item.description}</p>
           <div className='grid grid-cols-2'>
            
           </div>
            <input
              type={item.type}
              value={values[item.cle] || ''}
              onChange={(e) => setValues({ ...values, [item.cle]: e.target.value })}
              min={item.min}
              max={item.max}
              step={item.step}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
            />
          </div>
        ))}

        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>

      {/* Aperçu des paramètres */}
      <div className="border-t border-gray-100 bg-gray-50/50 p-6">
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
          Aperçu des plages horaires
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Lundi</span>
            <p className="text-gray-300 text-xs">Fermé</p>
          </div>
          <div>
            <span className="text-gray-400">Mardi</span>
            <p className="text-gray-600 text-xs">
              {values.heures_ouverture || '08:00'} - {values.heures_fermeture || '16:00'}
            </p>
          </div>
          <div>
            <span className="text-gray-400">Mercredi</span>
            <p className="text-gray-600 text-xs">
              {values.heures_ouverture || '08:00'} - {values.heures_fermeture || '16:00'}
            </p>
          </div>
          <div>
            <span className="text-gray-400">Jeudi</span>
            <p className="text-gray-300 text-xs">Fermé</p>
          </div>
          <div>
            <span className="text-gray-400">Vendredi</span>
            <p className="text-gray-300 text-xs">Fermé</p>
          </div>
          <div>
            <span className="text-gray-400">Samedi</span>
            <p className="text-gray-300 text-xs">Fermé</p>
          </div>
          <div>
            <span className="text-gray-400">Dimanche</span>
            <p className="text-gray-300 text-xs">Fermé</p>
          </div>
        </div>
      </div>
    </div>
  )
}