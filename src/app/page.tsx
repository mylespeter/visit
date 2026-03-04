import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Gestion des Visites Pastorales
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Organisez et digitalisez les rencontres pastorales en toute simplicité
        </p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  )
}