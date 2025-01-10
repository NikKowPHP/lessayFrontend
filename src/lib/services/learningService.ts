import type { ILearningApi } from '@/lib/api/interfaces/ILearningApi'
import { MockLearningApi } from '@/lib/api/mock/MockLearningApi'
import { LearningApi } from '@/lib/api/LearningApi'
import type { 
  LearningPathResponse, 
  StepCompletionRequest,
  StepCompletionResponse 
} from '@/lib/models/responses/LearningResponses'
import { onboardingService } from '@/lib/services/onboardingService'

class LearningService {
  private api: ILearningApi

  constructor(api?: ILearningApi) {
    this.api = api || (import.meta.env.DEV 
      ? new MockLearningApi()
      : LearningApi.getInstance())
  }

  async getLearningPath(): Promise<LearningPathResponse> {
    try {
      await onboardingService.checkAndRedirectOnboarding()
      
      const response = await this.api.getLearningPath()
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch learning path')
    }
  }

  async completeStep(request: StepCompletionRequest): Promise<StepCompletionResponse> {
    try {
      const response = await this.api.completeStep(request)
      return response.data
    } catch (error) {
      throw new Error('Failed to complete step')
    }
  }

  async resetProgress(): Promise<void> {
    try {
      await this.api.resetProgress()
    } catch (error) {
      throw new Error('Failed to reset progress')
    }
  }
}

// Export a singleton instance
export const learningService = new LearningService()

// Export the class for testing purposes
export { LearningService }
