import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/lib/constants/routes'
import {
  selectAssessmentType,
  selectPrompts,
  selectAssessmentProgress,
  submitAssessment,
  getPrompt,
  updateAssessmentProgress
} from '@/store/slices/onboardingSlice'
import { AssessmentType, AssessmentOrder } from '@/lib/types/onboardingTypes'

export default function QuestionPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const assessmentType = useAppSelector(selectAssessmentType)
  const prompts = useAppSelector(selectPrompts)
  const progress = useAppSelector(selectAssessmentProgress)

  useEffect(() => {
    if (!assessmentType || !prompts[assessmentType]) {
      navigate(ROUTES.ONBOARDING.ASSESSMENT.INTRO)
    }
  }, [assessmentType, prompts, navigate])

  const handleSubmitAnswer = async (answer: any) => {
    try {
      await dispatch(submitAssessment({ 
        type: assessmentType!, 
        data: answer 
      })).unwrap()

      const currentIndex = AssessmentOrder.indexOf(assessmentType!)
      if (currentIndex < AssessmentOrder.length - 1) {
        const nextType = AssessmentOrder[currentIndex + 1]
        await dispatch(getPrompt(nextType))
        dispatch(updateAssessmentProgress((progress + 1) * 25))
        navigate(ROUTES.ONBOARDING.ASSESSMENT.QUESTION)
      } else {
        navigate(ROUTES.ONBOARDING.ASSESSMENT.COMPLETE)
      }
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }
  }

  if (!assessmentType || !prompts[assessmentType]) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}