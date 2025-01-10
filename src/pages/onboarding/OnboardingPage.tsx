import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/lib/constants/routes'
import { 
  selectCurrentStep, 
  submitLanguagePreferences,
  rehydrateState 
} from '@/store/slices/onboardingSlice'
import { OnboardingStep } from '@/lib/types/onboardingTypes'
import LanguageSelector from '@/components/onboarding/LanguageSelector'
import { LanguageCode } from '@/lib/constants/languages'

interface LanguagePreferences {
  nativeLanguage: LanguageCode
  targetLanguage: LanguageCode
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector(selectCurrentStep)

  useEffect(() => {
    // Rehydrate state on initial load
    dispatch(rehydrateState())
  }, [dispatch])

  useEffect(() => {
    if (currentStep !== OnboardingStep.Language) {
      navigate(ROUTES.ONBOARDING.ASSESSMENT.INTRO)
    }
  }, [currentStep, navigate])

  const handleLanguageSubmit = async (nativeLanguage: LanguageCode, targetLanguage: LanguageCode) => {
    try {
      const preferences: LanguagePreferences = { nativeLanguage, targetLanguage }
      await dispatch(submitLanguagePreferences(preferences)).unwrap()
      navigate(ROUTES.ONBOARDING.ASSESSMENT.INTRO)
    } catch (error) {
      console.error('Failed to submit language preferences:', error)
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Select Your Languages</h1>
      <LanguageSelector onSubmit={handleLanguageSubmit} />
    </div>
  )
}
