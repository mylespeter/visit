import { supabase } from '@/lib/supabase'
import { getUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import ConfigurationForm from './ConfigurationForm'

export default async function ConfigurationPage() {
  const user = await getUser()

  if (!user || user.role?.nom !== 'admin') {
    redirect('/profile')
  }

  const { data: configs } = await supabase
    .from('configuration')
    .select('*')
    .order('id')

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-900">Configuration</h1>
        <p className="text-sm text-gray-400 mt-1">
          Paramètres généraux de l'application
        </p>
      </div>

      {/* Formulaire */}
      <ConfigurationForm configs={configs || []} />
    </div>
  )
}