import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/lib/constants/routes'
import {
  selectCurrentStep,
  submitFinalAssessment
} from '@/store/slices/onboardingSlice'
import { OnboardingStep } from '@/lib/types/onboardingTypes'

export default function CompletePage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector(selectCurrentStep)

  useEffect(() => {
    if (currentStep !== OnboardingStep.Complete) {
      navigate(ROUTES.ONBOARDING.ROOT)
    }
  }, [currentStep, navigate])

  const handleComplete = async () => {
    try {
      await dispatch(submitFinalAssessment('')).unwrap()
      navigate(ROUTES.LEARNING.PATH)
    } catch (error) {
      console.error('Failed to complete assessment:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Assessment Complete!</h1>
      <p className="mb-8">
        Thank you for completing the assessment. We'll now create your personalized learning path.
      </p>
      <button
        onClick={handleComplete}
        className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark"
      >
        Continue to Learning Path
      </button>
    </div>
  )
}