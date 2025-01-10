import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchLearningPath, selectCurrentPath, selectLearningState } from '@/store/slices/learningSlice'
import { LearningStep } from '@/components/learning/LearningStep'
import LoadingSpinner  from '@/components/ui/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/lib/constants/routes'

export default function LearningPathPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentPath, loading, error, currentStepIndex } = useAppSelector(selectLearningState)

  useEffect(() => {
    const initializeLearningPath = async () => {
      try {
        const resultAction = await dispatch(fetchLearningPath()).unwrap()
        if (!resultAction) {
          // If no learning path, redirect to onboarding
          navigate(ROUTES.ONBOARDING.ROOT)
        }
      } catch (error) {
        if (error === 'Onboarding not complete') {
          // Will be handled by onboarding service redirect
          return
        }
        // Handle other errors
        console.error('Failed to fetch learning path:', error)
      }
    }

    initializeLearningPath()
  }, [dispatch, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  if (!currentPath) {
    return null // or a placeholder component
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Learning Path</h1>
      <div className="space-y-4">
        {currentPath.steps.map((step, index) => (
          <LearningStep 
            key={step.id} 
            step={step}
            isActive={index === currentStepIndex}
          />
        ))}
      </div>
    </div>
  )
}
