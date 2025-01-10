import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/lib/constants/routes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { selectIsOnboardingComplete, selectCurrentStep } from '@/store/slices/onboardingSlice'
import { OnboardingStep } from '@/lib/types/onboardingTypes'

const ProtectedLayout: FC = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)
  const isOnboardingComplete = useAppSelector(selectIsOnboardingComplete)
  const currentStep = useAppSelector(selectCurrentStep)
  const location = useLocation()

  // Map OnboardingStep to route paths
  const stepToRoute = {
    [OnboardingStep.Language]: ROUTES.ONBOARDING.LANGUAGE,
    [OnboardingStep.AssessmentIntro]: ROUTES.ONBOARDING.ASSESSMENT.INTRO,
    [OnboardingStep.Assessment]: ROUTES.ONBOARDING.ASSESSMENT.QUESTION,
    [OnboardingStep.Complete]: ROUTES.ONBOARDING.ASSESSMENT.COMPLETE,
  }

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
        to={ROUTES.AUTH.ROOT} 
        replace 
        state={{ from: location.pathname }}
      />
    )
  }

  // Handle onboarding routes and completion status
  const isOnboardingRoute = location.pathname.startsWith('/onboarding')
  const isLearningRoute = location.pathname.startsWith('/learning')

  if (isLearningRoute && !isOnboardingComplete) {
    // Use the mapping to get the correct route
    const redirectPath = currentStep ? 
      stepToRoute[currentStep] : 
      ROUTES.ONBOARDING.ROOT
    return <Navigate to={redirectPath} replace />
  }

  if (isOnboardingComplete && isOnboardingRoute) {
    // Redirect to learning path if onboarding is complete but trying to access onboarding routes
    return <Navigate to={ROUTES.LEARNING.PATH} replace />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedLayout