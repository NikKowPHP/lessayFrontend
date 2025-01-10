import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/lib/constants/routes'
import { 
  selectCurrentStep,
  startAssessment,
  setAssessmentType 
} from '@/store/slices/onboardingSlice'
import { AssessmentType, OnboardingStep } from '@/lib/types/onboardingTypes'

export default function AssessmentIntroPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector(selectCurrentStep)

  useEffect(() => {
    if (currentStep < OnboardingStep.AssessmentIntro) {
      navigate(ROUTES.ONBOARDING.ROOT)
    }
  }, [currentStep, navigate])

  const handleStartAssessment = async () => {
    try {
      const firstType = AssessmentType.Pronunciation
      await dispatch(setAssessmentType(firstType))
      await dispatch(startAssessment(firstType)).unwrap()
      navigate(ROUTES.ONBOARDING.ASSESSMENT.QUESTION)
    } catch (error) {
      console.error('Failed to start assessment:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Assessment Introduction</h1>
      <p className="mb-4">We'll assess your language skills in four areas:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Pronunciation</li>
        <li>Vocabulary</li>
        <li>Grammar</li>
        <li>Comprehension</li>
      </ul>
      <button
        onClick={handleStartAssessment}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
      >
        Start Assessment
      </button>
    </div>
  )
}