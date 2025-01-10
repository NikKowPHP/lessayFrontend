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

const assessmentAreas = [
  {
    title: 'Pronunciation',
    description: 'Evaluate your accent and speaking clarity',
    icon: '🗣️'
  },
  {
    title: 'Vocabulary',
    description: 'Test your word knowledge and usage',
    icon: '📚'
  },
  {
    title: 'Grammar',
    description: 'Check your understanding of language rules',
    icon: '✍️'
  },
  {
    title: 'Comprehension',
    description: 'Assess your listening and understanding skills',
    icon: '👂'
  }
]

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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Language Skills Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's evaluate your current language proficiency across four key areas
          </p>
        </div>

        {/* Assessment Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          {assessmentAreas.map((area) => (
            <div 
              key={area.title}
              className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-primary transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                <span className="text-3xl">{area.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {area.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Time Estimate */}
        <div className="text-center text-gray-600 text-sm">
          Estimated time: 15-20 minutes
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleStartAssessment}
            className="
              inline-flex items-center justify-center
              px-8 py-3 
              border border-transparent 
              text-base font-medium rounded-md 
              text-white bg-primary 
              hover:bg-primary-dark 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
              transition-colors duration-300
              shadow-sm
              w-full sm:w-auto
            "
          >
            Begin Assessment
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 flex items-center space-x-2 text-sm text-gray-500">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <span>Step 2 of 3: Skills Assessment</span>
      </div>
    </div>
  )
}