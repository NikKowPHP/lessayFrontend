import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '@/lib/constants/routes'
import AuthLayout from '@/components/layout/AuthLayout'
import ProtectedLayout from '@/components/layout/ProtectedLayout'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import OnboardingPage from '@/pages/auth/onboarding/AssessmentPage'
import AssessmentIntroPage from '@/pages/auth/onboarding/assessment/intro/page'
import AssessmentQuestionPage from '@/pages/auth/onboarding/assessment/question/page'
import AssessmentCompletePage from '@/pages/auth/onboarding/assessment/complete/page'
import LearningPathPage from '@/pages/learning/path/page'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.AUTH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.AUTH.SIGNUP,
        element: <SignupPage />,
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
  {
    path: '/',
    element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
  },
])