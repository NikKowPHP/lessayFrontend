import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/lib/constants/routes'
import RootLayout from '@/components/layout/RootLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import ProtectedLayout from '@/components/layout/ProtectedLayout'
import LandingPage from '@/pages/LandingPage'
import AuthPage from '@/pages/auth/AuthPage'
import OnboardingPage from '@/pages/onboarding/OnboardingPage'
import AssessmentIntroPage from '@/pages/onboarding/assessment/AssessmentIntroPage'
import AssessmentQuestionPage from '@/pages/onboarding/assessment/AssessmentQuestionPage'
import AssessmentCompletePage from '@/pages/onboarding/assessment/AssessmentCompletePage'
import LearningPathPage from '@/pages/learning/LearningPathPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.LANDING.PATH,
        element: <LandingPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.AUTH.ROOT,
            element: <AuthPage />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
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
    ],
  },
])