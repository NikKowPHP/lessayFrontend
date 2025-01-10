import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { onboardingService } from '@/lib/services/onboardingService'
import type { RootState } from '@/store'
import { 
  AssessmentType, 
  OnboardingStep, 
  OnboardingState,
  AssessmentPrompts,
  AssessmentResponses
} from '@/lib/types/onboardingTypes'
import type { LanguageCode } from '@/constants/languages'
import { BaseAssessmentRequest, ComprehensionAssessmentRequest, GrammarAssessmentRequest, PronunciationAssessmentRequest, VocabularyAssessmentRequest } from '@/lib/models/requests/assessments/AssessmentRequests'
import { onboardingStorage } from '@/lib/services/onboardingStorage'


// Create thunks with error handling
const createThunkWithError = <ReturnType, ArgType>(
  typePrefix: string,
  payloadCreator: (arg: ArgType) => Promise<ReturnType>
) => {
  return createAsyncThunk<ReturnType, ArgType>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        return await payloadCreator(arg)
      } catch (error) {
        console.error('Error in thunk:', error)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'

        return rejectWithValue(errorMessage)
      }
    }
  )
}

// Async Thunks with error handling
export const startAssessment = createThunkWithError(
  'onboarding/startAssessment',
  async (firstType: AssessmentType) => {
    return await onboardingService.startAssessment(firstType)
  }
)

export const submitLanguagePreferences = createThunkWithError(
  'onboarding/submitLanguagePreferences',
  async (preferences: { nativeLanguage: LanguageCode; targetLanguage: LanguageCode }) => {
    return await onboardingService.submitLanguagePreferences(preferences)
  }
)

export const getPrompt = createThunkWithError(
  'onboarding/getPrompt',
  async (type: AssessmentType) => {
    return await onboardingService.getPrompt(type)
  }
)

export const submitAssessment = createThunkWithError(
  'onboarding/submitAssessment',
  async ({ type, data }: { type: AssessmentType; data: BaseAssessmentRequest }) => {
    switch (type) {
      case AssessmentType.Pronunciation:
        return await onboardingService.submitPronunciationAssessment(data as PronunciationAssessmentRequest)
      case AssessmentType.Vocabulary:
        return await onboardingService.submitVocabularyAssessment(data as VocabularyAssessmentRequest)
      case AssessmentType.Grammar:
        return await onboardingService.submitGrammarAssessment(data as GrammarAssessmentRequest)
      case AssessmentType.Comprehension:
        return await onboardingService.submitComprehensionAssessment(data as ComprehensionAssessmentRequest)
      default:
        throw new Error('Invalid assessment type')
    }
  }
)

export const submitFinalAssessment = createAsyncThunk(
  'onboarding/submitFinalAssessment',
  async (assessmentId: string) => {
    return await onboardingService.submitFinalAssessment(assessmentId)
  }
)

// New thunk for state rehydration
export const rehydrateState = createAsyncThunk(
  'onboarding/rehydrate',
  async () => {
    return await onboardingStorage.getSession()
  }
)

export const checkOnboardingStatus = createAsyncThunk(
  'onboarding/checkStatus',
  async (_, { }) => {
    const isComplete = await onboardingService.isOnboardingComplete()
    if (!isComplete) {
      await onboardingService.checkAndRedirectOnboarding()
    }
    return isComplete
  }
)

// Add new thunk for preloading prompts
export const preloadPrompts = createThunkWithError<Record<AssessmentType, boolean>, void>(
  'onboarding/preloadPrompts',
  async () => {
    return await onboardingService.preloadPrompts()
  }
)

const initialState: OnboardingState = {
  isComplete: false,
  currentStep: OnboardingStep.Language,
  assessmentType: null,
  loading: false,
  error: null,
  assessmentProgress: 0,
  assessmentId: null,
  prompts: {} as Record<AssessmentType, any>,
  responses: {} as Record<AssessmentType, any>,
  promptsLoaded: false,
  sessionLoaded: false,
  finalAssessment: null,
  promptLoadStatus: {} as Record<AssessmentType, boolean>
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
    setAssessmentType: (state, action) => {
      state.assessmentType = action.payload
    },
    updateAssessmentProgress: (state, action) => {
      state.assessmentProgress = action.payload
    },
    resetOnboarding: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Start Assessment
      .addCase(startAssessment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(startAssessment.fulfilled, (state, action) => {
        state.loading = false
        state.prompts[state.assessmentType!] = action.payload
        state.sessionLoaded = true
        state.error = null
      })
      .addCase(startAssessment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Failed to start assessment'
      })
      // Submit Language Preferences
      .addCase(submitLanguagePreferences.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submitLanguagePreferences.fulfilled, (state) => {
        state.loading = false
        state.currentStep = OnboardingStep.AssessmentIntro
        state.error = null
      })
      .addCase(submitLanguagePreferences.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Failed to submit language preferences'
      })
      // Get Prompt
      .addCase(getPrompt.fulfilled, (state, action) => {
        if (state.assessmentType) {
          state.prompts[state.assessmentType] = action.payload
        }
      })
      // Submit Assessment
      .addCase(submitAssessment.fulfilled, (state, action) => {
        if (state.assessmentType) {
          state.responses[state.assessmentType] = action.payload
        }
      })
      // Submit Final Assessment
      .addCase(submitFinalAssessment.fulfilled, (state, action) => {
        state.finalAssessment = action.payload
        state.currentStep = OnboardingStep.Complete
      })
      // Add rehydration case
      .addCase(rehydrateState.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            ...action.payload,
            isRehydrated: true
          }
        }
        return {
          ...state,
          isRehydrated: true
        }
      })
      // Persist state on all successful actions
      .addCase(checkOnboardingStatus.fulfilled, (state, action) => {
        state.isComplete = action.payload
      })
      // Add preload prompts case
      .addCase(preloadPrompts.fulfilled, (state, action) => {
        state.promptLoadStatus = action.payload
      })
      .addMatcher(
        (action) => action.type.startsWith('onboarding/') && action.type.endsWith('/fulfilled'),
        (state) => {
          onboardingStorage.setSession(state)
          return state
        }
      )
  }
})

// Selectors
export const selectOnboardingState = (state: RootState) => state.onboarding
export const selectCurrentStep = (state: RootState) => state.onboarding.currentStep
export const selectAssessmentType = (state: RootState) => state.onboarding.assessmentType
export const selectAssessmentProgress = (state: RootState) => state.onboarding.assessmentProgress
export const selectPrompts = (state: RootState) => state.onboarding.prompts
export const selectResponses = (state: RootState) => state.onboarding.responses
export const selectIsOnboardingComplete = (state: RootState) => 
  state.onboarding.currentStep === OnboardingStep.Complete && 
  state.onboarding.finalAssessment !== null

export const { 
  setCurrentStep, 
  setAssessmentType, 
  updateAssessmentProgress, 
  resetOnboarding 
} = onboardingSlice.actions

export default onboardingSlice.reducer





