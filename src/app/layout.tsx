// @ts-ignore
import { getUser } from '@/actions/auth'
import Navigation from '@/components/Navigation'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <Navigation user={user}>
          {children}
        </Navigation>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}