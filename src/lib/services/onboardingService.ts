import type { LanguageCode } from '@/constants/languages'
import type { IOnboardingApi } from '@/lib/api/interfaces/IOnboardingApi'
import { MockOnboardingApi } from '@/lib/api/mock/MockOnboardingApi'
import { OnboardingApi } from '@/lib/api/OnboardingApi'

import type {
  PronunciationPromptResponse,
  VocabularyPromptResponse,
  GrammarPromptResponse,
  ComprehensionPromptResponse
} from '@/lib/models/responses/prompts/PromptResponseIndex'
import {  LanguagePreferenceRequest, LanguagePreferencesResponse } from '@/lib/models/languages/LanguagePreferencesModel'
import { storageService } from './storageService'
import { ComprehensionAssessmentRequest, GrammarAssessmentRequest, PronunciationAssessmentRequest, VocabularyAssessmentRequest } from '../models/requests/assessments/AssessmentRequests'
import { AssessmentOrder, OnboardingSession, OnboardingStep } from '../types/onboardingTypes'
import { AssessmentType } from '../types/onboardingTypes'
import { ROUTES } from '@/lib/constants/routes'

class OnboardingService {
  private api: IOnboardingApi
  private promptQueue: Map<AssessmentType, Promise<any>>

  constructor(api?: IOnboardingApi) {
    this.api = api || (import.meta.env.DEV 
      ? new MockOnboardingApi()
      : OnboardingApi.getInstance())
    this.promptQueue = new Map()
  }

  async initializePromptQueue(firstType: AssessmentType) {
    // First, start fetching the first prompt immediately
    const priorityPromptPromise = this.fetchPrompt(firstType)
    
    // Start fetching remaining prompts in parallel
    const remainingTypes = AssessmentOrder.filter(type => type !== firstType)
    remainingTypes.forEach(type => {
      const promise = this.fetchPrompt(type)
      this.promptQueue.set(type, promise)
    })

    // Wait only for the first prompt to return
    const priorityPrompt = await priorityPromptPromise
    return priorityPrompt
  }
  
  private async fetchPrompt(type: AssessmentType) {
    const methods = {
      [AssessmentType.Pronunciation]: this.api.getPronunciationPrompt.bind(this.api),
      [AssessmentType.Vocabulary]: this.api.getVocabularyPrompt.bind(this.api),
      [AssessmentType.Grammar]: this.api.getGrammarPrompt.bind(this.api),
      [AssessmentType.Comprehension]: this.api.getComprehensionPrompt.bind(this.api)
    }
  
    try {
      const response = await methods[type]()
      await this.updatePromptLoadStatus(type, true)
      return response.data
    } catch (error) {
      await this.updatePromptLoadStatus(type, false)
      throw new Error(`Failed to fetch ${type} prompt`)
    }
  }

 

  async getPrompt(type: AssessmentType) {
    try {
      // Check if prompt is already in queue
      const queuedPrompt = this.promptQueue.get(type)
      if (queuedPrompt) {
        const prompt = await queuedPrompt
        // Remove from queue after retrieving
        this.promptQueue.delete(type)
        return prompt
      }
      // If not in queue, fetch directly
      return await this.fetchPrompt(type)
    } catch (error) {
      throw new Error(`Failed to get ${type} prompt`)
    }
  }

  private async updatePromptLoadStatus(type: AssessmentType, loaded: boolean) {
    const session = await storageService.getOnboardingSession()
    if (session) {
      storageService.updateOnboardingSession({
        promptLoadStatus: {
          ...session.promptLoadStatus,
          [type]: loaded
        }
      })
    }
  }

  async startAssessment(firstType: AssessmentType) {
    try {
      const initialSession: OnboardingSession = {
        assessmentId: null,
        currentStep: OnboardingStep.Assessment,
        assessmentType: firstType,
        assessmentProgress: 0,
        prompts: {},
        responses: {},
        promptLoadStatus: await this.getPromptLoadStatus()
      }
      
      await storageService.setOnboardingSession(initialSession)
      
      // Get first prompt from queue if available
      const firstPrompt = await this.getPrompt(firstType)
      
      // Update session with first prompt
      await storageService.updateOnboardingSession({
        prompts: {
          [firstType]: firstPrompt
        }
      })

      return firstPrompt
    } catch (error) {
      throw new Error('Failed to start assessment')
    }
  }

  async submitLanguagePreferences(preferences: { 
    nativeLanguage: LanguageCode
    targetLanguage: LanguageCode 
  }): Promise<LanguagePreferencesResponse> {
    try {
      const request: LanguagePreferenceRequest = {
        nativeLanguage: preferences.nativeLanguage,
        targetLanguage: preferences.targetLanguage
      }
      const response = await this.api.submitLanguages(request)
      return response.data
    } catch (error) {
      throw new Error('Failed to submit language preferences')
    }
  }

  async getStoredLanguages() {
    try {
      return await this.api.getStoredLanguages()
    } catch {
      return null
    }
  }

  async submitFinalAssessment(assessmentId: string) {
    try {
      const response = await this.api.submitFinalAssessment(assessmentId)
      return response.data
    } catch (error) {
      throw new Error('Failed to submit assessment')
    }
  }

  // Pronunciation methods
  async getPronunciationPrompt(): Promise<PronunciationPromptResponse> {
    try {
      const response = await this.api.getPronunciationPrompt()
      return response.data
    } catch (error) {
      throw new Error('Failed to get pronunciation prompt')
    }
  }

  async submitPronunciationAssessment(data: PronunciationAssessmentRequest) {
    try {
      const response = await this.api.submitPronunciationAssessment(data)
      return response.data
    } catch (error) {
      throw new Error('Failed to submit pronunciation assessment')
    }
  }

  // Vocabulary methods
  async getVocabularyPrompt(): Promise<VocabularyPromptResponse> {
    try {
      const response = await this.api.getVocabularyPrompt()
      return response.data
    } catch (error) {
      throw new Error('Failed to get vocabulary prompt')
    }
  }

  async submitVocabularyAssessment(data: VocabularyAssessmentRequest) {
    try {
      const response = await this.api.submitVocabularyAssessment(data)
      return response.data
    } catch (error) {
      throw new Error('Failed to submit vocabulary assessment')
    }
  }

  // Grammar methods
  async getGrammarPrompt(): Promise<GrammarPromptResponse> {
    try {
      const response = await this.api.getGrammarPrompt()
      return response.data
    } catch (error) {
      throw new Error('Failed to get grammar prompt')
    }
  }

  async submitGrammarAssessment(data: GrammarAssessmentRequest) {
    try {
      const response = await this.api.submitGrammarAssessment(data)
      return response.data
    } catch (error) {
      throw new Error('Failed to submit grammar assessment')
    }
  }

  // Comprehension methods
  async getComprehensionPrompt(): Promise<ComprehensionPromptResponse> {
    try {
      const response = await this.api.getComprehensionPrompt()
      return response.data
    } catch (error) {
      throw new Error('Failed to get comprehension prompt')
    }
  }

  async submitComprehensionAssessment(data: ComprehensionAssessmentRequest) {
    try {
      const response = await this.api.submitComprehensionAssessment(data)
      return response.data
    } catch (error) {
      throw new Error('Failed to submit comprehension assessment')
    }
  }

  async isOnboardingComplete(): Promise<boolean> {
    try {
      const session = await storageService.getOnboardingSession()
      
      // Check if session exists and is complete
      if (!session) return false
      
      return session.currentStep === OnboardingStep.Complete && 
             session.finalAssessment !== null
    } catch (error) {
      console.error('Failed to check onboarding status:', error)
      return false
    }
  }

  async checkAndRedirectOnboarding(): Promise<void> {
    const isComplete = await this.isOnboardingComplete()
    
    if (!isComplete) {
      // Get current pathname
      const currentPath = window.location.pathname
      
      // Check if already on onboarding route
      const isOnboardingRoute = currentPath.startsWith(ROUTES.ONBOARDING.ROOT)
      
      if (!isOnboardingRoute) {
        // Redirect to last known onboarding step or start
        const session = await storageService.getOnboardingSession()
        const redirectPath = session 
          ? this.getOnboardingRedirectPath(session.currentStep)
          : ROUTES.ONBOARDING.LANGUAGE
        
        window.location.href = redirectPath
      }
    }
  }

  private getOnboardingRedirectPath(step: OnboardingStep): string {
    switch (step) {
      case OnboardingStep.Language:
        return ROUTES.ONBOARDING.LANGUAGE
      case OnboardingStep.AssessmentIntro:
        return ROUTES.ONBOARDING.ASSESSMENT.INTRO
      case OnboardingStep.Assessment:
        return ROUTES.ONBOARDING.ASSESSMENT.QUESTION
      case OnboardingStep.Complete:
        return ROUTES.ONBOARDING.ASSESSMENT.COMPLETE
      default:
        return ROUTES.ONBOARDING.LANGUAGE
    }
  }

  // Add new method for preloading prompts
  async preloadPrompts() {
    try {
      // Initialize the prompt queue for all assessment types
      const allTypes = Object.values(AssessmentType)
      
      // Start fetching all prompts in parallel
      allTypes.forEach(type => {
        const promise = this.fetchPrompt(type)
        this.promptQueue.set(type, promise)
      })

      // Return a loading status map
      const loadingStatus = allTypes.reduce((acc, type) => ({
        ...acc,
        [type]: false
      }), {} as Record<AssessmentType, boolean>)

      // Update session with initial prompt load status
      await storageService.updateOnboardingSession({
        promptLoadStatus: loadingStatus
      })

      return loadingStatus
    } catch (error) {
      console.error('Failed to preload prompts:', error)
      throw new Error('Failed to preload assessment prompts')
    }
  }

  // Helper method to get current prompt load status
  private async getPromptLoadStatus(): Promise<Record<AssessmentType, boolean>> {
    const session = await storageService.getOnboardingSession()
    return session?.promptLoadStatus || Object.values(AssessmentType).reduce((acc, type) => ({
      ...acc,
      [type]: false
    }), {} as Record<AssessmentType, boolean>)
  }
}

// Export a singleton instance
export const onboardingService = new OnboardingService()

// Export the class for testing purposes
export { OnboardingService } 