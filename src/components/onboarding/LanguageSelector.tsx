import { useState } from 'react'
import { LANGUAGES, LanguageCode } from '@/lib/constants/languages'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface LanguageSelectorProps {
  onSubmit: (nativeLanguage: LanguageCode, targetLanguage: LanguageCode) => Promise<void>
}

export default function LanguageSelector({ onSubmit }: LanguageSelectorProps) {
  const [nativeLanguage, setNativeLanguage] = useState<LanguageCode | ''>('')
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode | ''>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nativeLanguage || !targetLanguage) return

    setIsSubmitting(true)
    try {
      await onSubmit(nativeLanguage, targetLanguage)
    } catch (error) {
      console.error('Failed to submit languages:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = nativeLanguage && targetLanguage && nativeLanguage !== targetLanguage

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nativeLanguage" className="block text-sm font-medium text-gray-700">
          Native Language
        </label>
        <select
          id="nativeLanguage"
          value={nativeLanguage}
          onChange={(e) => setNativeLanguage(e.target.value as LanguageCode)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        >
          <option value="">Select your native language</option>
          {LANGUAGES.map(({ code, name }) => (
            <option key={code} value={code} disabled={code === targetLanguage}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="targetLanguage" className="block text-sm font-medium text-gray-700">
          Language to Learn
        </label>
        <select
          id="targetLanguage"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value as LanguageCode)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        >
          <option value="">Select language to learn</option>
          {LANGUAGES.map(({ code, name }) => (
            <option key={code} value={code} disabled={code === nativeLanguage}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <LoadingSpinner size="small" color="white" />
        ) : (
          'Continue'
        )}
      </button>
    </form>
  )
}