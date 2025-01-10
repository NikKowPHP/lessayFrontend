import type { 
  LearningPathResponse, 
  StepCompletionRequest,
  StepCompletionResponse 
} from '@/lib/models/responses/LearningResponses'

export interface ILearningApi {
  getLearningPath(): Promise<{ data: LearningPathResponse }>
  completeStep(request: StepCompletionRequest): Promise<{ data: StepCompletionResponse }>
  resetProgress(): Promise<void>
}
