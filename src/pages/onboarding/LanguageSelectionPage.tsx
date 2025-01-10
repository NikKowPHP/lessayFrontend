import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { submitLanguagePreferences } from '@/store/slices/onboardingSlice'
import { ROUTES } from '@/lib/constants/routes'
import type { LanguageCode } from '@/constants/languages'
import LanguageSelector from '@/components/onboarding/LanguageSelector'
import { useError } from '@/lib/providers/ErrorProvider'

export default function LanguageSelectionPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { setError } = useError()
  const handleSubmit = async (nativeLanguage: LanguageCode, targetLanguage: LanguageCode) => {
    try {
      await dispatch(submitLanguagePreferences({
        nativeLanguage,
        targetLanguage
      })).unwrap()
      navigate(ROUTES.ONBOARDING.ASSESSMENT.QUESTION)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      console.error('Failed to submit language preferences:', errorMessage)
      setError(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Languages
          </h1>
          <p className="text-gray-600">
            Select your native language and the language you want to learn
          </p>
        </div>

        <LanguageSelector onSubmit={handleSubmit} />
      </div>
    </div>
  )
}