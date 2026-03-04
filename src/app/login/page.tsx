
'use client'

import { login } from '@/actions/auth'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    const result = await login(formData)
    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          {/* <h1 className="text-lg font-bold text-center text-gray-900">
            Connexion
          </h1> */}
          <img src='/logo.png' className='w-20 h-20 mx-auto my-4' alt='Logo' />
          <p className="mt-2 text-center text-sm text-gray-600">
            Connectez-vous à votre compte
          </p>
        </div>
        
        {/* Sélecteur de méthode de connexion */}
        <div className="flex justify-center space-x-4 border-b">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`pb-2 px-4 text-sm font-medium ${
              loginMethod === 'email'
                ? 'text-blue-500 border-b-2 border-blue-400'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('phone')}
            className={`pb-2 px-4 text-sm font-medium ${
              loginMethod === 'phone'
                ? 'text-blue-500 border-b-2 border-blue-400'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Téléphone
          </button>
        </div>
        
        <form action={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {loginMethod === 'email' ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="exemple@email.com"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="numero"
                  name="numero"
                  required
                  placeholder="+243 XX XXX XXXX"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="mot_de_passe" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="mot_de_passe"
                name="mot_de_passe"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Pas encore inscrit ?{' '}
            <a href="/register" className="font-medium text-blue-500 hover:text-blue-400">
              Créez un compte
            </a>
          </p>
          <p>  
            Compte de test : <br />
            Email : admin@gmail.com (admin)<br />
            Email: sec@gmail.com (secretaire) <br />
            Email: jean@gmail.com (pasteur) <br />
            Mot de passe : 123456 ( partout)
          </p>
        </form>
      </div>
    </div>
  )
}