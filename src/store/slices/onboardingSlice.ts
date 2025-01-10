import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { onboardingService } from '@/lib/services/onboardingService'
import type { AppDispatch, RootState } from '@/store'
import { 
  AssessmentType, 
  OnboardingStep, 
  OnboardingState,
  AssessmentPrompts,
  AssessmentResponses,
  OnboardingFlowResult
} from '@/lib/types/onboardingTypes'
import type { LanguageCode } from '@/constants/languages'
import { BaseAssessmentRequest, ComprehensionAssessmentRequest, GrammarAssessmentRequest, PronunciationAssessmentRequest, VocabularyAssessmentRequest } from '@/lib/models/requests/assessments/AssessmentRequests'
import { onboardingStorage } from '@/lib/services/onboardingStorage'
import { LanguagePreferencesResponse } from '@/lib/models/languages/LanguagePreferencesModel'


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

// Add new thunk for initializing onboarding state
export const initializeOnboardingState = createThunkWithError(
  'onboarding/initialize',
  async () => {
    // 1. Try getting from storage first
    const session = await onboardingStorage.getSession()
    if (session) {
      return session
    }

    // 2. If no session, check for stored languages
    const storedLanguages = await onboardingService.getStoredLanguages()
    if (storedLanguages) {
      return {
        currentStep: OnboardingStep.AssessmentIntro,
        languages: storedLanguages,
        // ... other initial state
      }
    }

    // 3. If nothing stored, return fresh state
    return null
  }
)

// Add new selector for loading state
export const selectOnboardingLoading = (state: RootState) => 
  state.onboarding.loading || !state.onboarding.sessionLoaded

export const initializeOnboardingFlow = createAsyncThunk<
  OnboardingFlowResult,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>(
  'onboarding/initializeFlow',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // 1. First check if onboarding is complete
      const isComplete = await onboardingService.isOnboardingComplete()
      
      if (!isComplete) {
        // 2. Try to restore existing session
        const session = await onboardingStorage.getSession()
        if (session) {
          await dispatch(initializeOnboardingState(session)).unwrap()
          return {
            isComplete: false,
            currentStep: session.currentStep,
            languages: session.languages
          }
        }
        
        // 3. Get stored languages if no session
        const storedLanguages = await onboardingService.getStoredLanguages()
        if (storedLanguages) {
          // Ensure we return the full LanguagePreferencesResponse structure
          const languageResponse: LanguagePreferencesResponse = {
            status: 'success',
            data: {
              nativeLanguage: storedLanguages.data.nativeLanguage,
              targetLanguage: storedLanguages.data.targetLanguage,
              timestamp: storedLanguages.data.timestamp,
              preferences_id: storedLanguages.data.preferences_id
            }
          }
          
          return {
            isComplete: false,
            currentStep: OnboardingStep.AssessmentIntro,
            languages: languageResponse
          }
        }
      }
      
      // Return just completion status if no other data
      return { 
        isComplete 
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to initialize onboarding flow'
      )
    }
  }
)

const initialState: OnboardingState = {
  isComplete: false,
  currentStep: OnboardingStep.Language,
  languages: [],
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
   .addCase(initializeOnboardingState.fulfilled, (state, action) => {
        if (action.payload) {
          // Merge stored state with initial state
          return {
            ...initialState,
            ...action.payload
          }
        }
      })
      .addMatcher(
        (action) => action.type.startsWith('onboarding/'),
        (state) => {
          // Only persist meaningful state changes
          if (state.currentStep !== OnboardingStep.Language || state.languages) {
            onboardingStorage.setSession(state)
          }
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





