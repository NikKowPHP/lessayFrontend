import { FC, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { ROUTES } from '@/lib/constants/routes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { selectIsOnboardingComplete, selectCurrentStep, selectOnboardingLoading } from '@/store/slices/onboardingSlice'
import { OnboardingStep } from '@/lib/types/onboardingTypes'
import { initializeOnboardingFlow } from '@/store/slices/onboardingSlice'

const ProtectedLayout: FC = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, loading: authLoading } = useAppSelector((state) => state.auth)
  const isOnboardingComplete = useAppSelector(selectIsOnboardingComplete)
  const currentStep = useAppSelector(selectCurrentStep)
  const onboardingLoading = useAppSelector(selectOnboardingLoading)
  const location = useLocation()
  const navigate = useNavigate()

  // Map OnboardingStep to route paths
  const stepToRoute = {
    [OnboardingStep.Language]: ROUTES.ONBOARDING.LANGUAGE,
    [OnboardingStep.AssessmentIntro]: ROUTES.ONBOARDING.ASSESSMENT.INTRO,
    [OnboardingStep.Assessment]: ROUTES.ONBOARDING.ASSESSMENT.QUESTION,
    [OnboardingStep.Complete]: ROUTES.ONBOARDING.ASSESSMENT.COMPLETE,
  }

  // Initialize onboarding state
  useEffect(() => {
    const initialize = async () => {
      if (isAuthenticated) {
        try {
          const { isComplete } = await dispatch(initializeOnboardingFlow()).unwrap()
          
          // Handle routing based on completion status
          const isOnboardingRoute = location.pathname.startsWith(ROUTES.ONBOARDING.ROOT)
          const isLearningRoute = location.pathname.startsWith(ROUTES.LEARNING.PATH)
          
          if (isComplete && isOnboardingRoute) {
            navigate(ROUTES.LEARNING.PATH, { replace: true })
          } else if (!isComplete && isLearningRoute) {
            // Get the correct redirect path based on current step
            const redirectPath = currentStep ? 
              stepToRoute[currentStep] : 
              ROUTES.ONBOARDING.LANGUAGE
            navigate(redirectPath, { replace: true })
          }
        } catch (error) {
          console.error('Failed to initialize onboarding:', error)
          // On error, redirect to start of onboarding
          navigate(ROUTES.ONBOARDING.LANGUAGE, { replace: true })
        }
      }
    }
    initialize()
  }, [dispatch, isAuthenticated, navigate, location.pathname])

  // Show loading state while checking auth or onboarding
  if (authLoading || onboardingLoading) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedLayout