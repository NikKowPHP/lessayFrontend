import { Api } from './Api'
import type { ILearningApi } from './interfaces/ILearningApi'
import type { 
  LearningPathResponse, 
  StepCompletionRequest,
  StepCompletionResponse 
} from '@/lib/models/responses/LearningResponses'

export class LearningApi extends Api implements ILearningApi {
  private static instance: LearningApi
  private static readonly ENDPOINTS = {
    GET_LEARNING_PATH: '/learning/path',
    COMPLETE_STEP: '/learning/step/complete',
    RESET_PROGRESS: '/learning/reset'
  } as const

  private constructor() {
    super(import.meta.env.VITE_API_URL || 'http://localhost:3000/api')
  }

  public static getInstance(): LearningApi {
    if (!LearningApi.instance) {
      LearningApi.instance = new LearningApi()
    }
    return LearningApi.instance
  }

  async getLearningPath(): Promise<{ data: LearningPathResponse }> {
    const response = await this.get<LearningPathResponse>(
      LearningApi.ENDPOINTS.GET_LEARNING_PATH
    )
    return { data: response }
  }

  async completeStep(request: StepCompletionRequest): Promise<{ data: StepCompletionResponse }> {
    const response = await this.post<StepCompletionResponse>(
      LearningApi.ENDPOINTS.COMPLETE_STEP,
      request
    )
    return { data: response }
  }

  async resetProgress(): Promise<void> {
    await this.post(LearningApi.ENDPOINTS.RESET_PROGRESS, {})
  }
}

// Export singleton instance
export const learningApi = LearningApi.getInstance()
