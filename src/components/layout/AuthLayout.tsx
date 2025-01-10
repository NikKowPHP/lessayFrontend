import { FC, ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/lib/constants/routes'
import Footer from '@/components/Footer'

const AuthLayout: FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const location = useLocation()

  // Redirect authenticated users away from auth pages
  if (isAuthenticated) {
    return <Navigate to={ROUTES.LEARNING.PATH} replace />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AuthLayout