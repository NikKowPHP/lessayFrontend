export const ROUTES = {
  LANDING: {
    PATH: '/',
  },
  AUTH: {
    // LOGIN: '/auth/login',
    // SIGNUP: '/auth/signup',
    ROOT: '/auth',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  ONBOARDING: {
    ROOT: '/onboarding',
    LANGUAGE: '/onboarding/language',
    ASSESSMENT: {
      INTRO: '/onboarding/assessment/intro',
      QUESTION: '/onboarding/assessment/question',
      COMPLETE: '/onboarding/assessment/complete',
    },
  },
  LEARNING: {
    PATH: '/learning/path',
    EXERCISE: '/learning/exercise/:id',
    PROGRESS: '/learning/progress',
  },
  ASSESSMENT: {
    START: '/assessment/start',
    QUESTION: '/assessment/:id',
    RESULT: '/assessment/result',
  },
  HOME: '/',
  DASHBOARD: '/dashboard',
} as const

export type AppRoute = typeof ROUTES