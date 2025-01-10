import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/lib/constants/routes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ProtectedLayout: FC = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)
  const location = useLocation()

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={ROUTES.AUTH.LOGIN} 
        replace 
        state={{ from: location.pathname }}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default ProtectedLayout