import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/lib/constants/routes'
import RootLayout from '@/components/layout/RootLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import ProtectedLayout from '@/components/layout/ProtectedLayout'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import LandingPage from '@/pages/LandingPage'
import AuthPage from '@/pages/auth/AuthPage'
import OnboardingPage from '@/pages/onboarding/OnboardingPage'
import LanguageSelectionPage from '@/pages/onboarding/LanguageSelectionPage'
import AssessmentIntroPage from '@/pages/onboarding/assessment/AssessmentIntroPage'
import AssessmentQuestionPage from '@/pages/onboarding/assessment/AssessmentQuestionPage'
import AssessmentCompletePage from '@/pages/onboarding/assessment/AssessmentCompletePage'
import LearningPathPage from '@/pages/learning/LearningPathPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: ROUTES.LANDING.PATH,
        element: <LandingPage />,
      },
      {
        element: <AuthLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: ROUTES.AUTH.ROOT,
            element: <AuthPage />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: ROUTES.ONBOARDING.ROOT,
            element: <OnboardingPage />,
          },
          {
            path: ROUTES.ONBOARDING.ASSESSMENT.INTRO,
            element: <AssessmentIntroPage />,
          },
          {
            path: ROUTES.ONBOARDING.LANGUAGE,
            element: <LanguageSelectionPage />,
          },
          {
            path: ROUTES.ONBOARDING.ASSESSMENT.QUESTION,
            element: <AssessmentQuestionPage />,
          },
          {
            path: ROUTES.ONBOARDING.ASSESSMENT.COMPLETE,
            element: <AssessmentCompletePage />,
          },
          {
            path: ROUTES.LEARNING.PATH,
            element: <LearningPathPage />,
          },
        ],
      },
      {
        path: '*',
        element: <ErrorBoundary />,
      },
    ],
  },
])