// import { Api } from './Api'
// import type { ILearningApi } from './interfaces/ILearningApi'
// import type { 
//   LearningPathResponse, 
//   StepCompletionRequest,
//   StepCompletionResponse 
// } from '@/lib/models/responses/LearningResponses'

// export class LearningApi extends Api implements ILearningApi {
//   private readonly BASE_PATH = '/learning'

//   async getLearningPath(): Promise<LearningPathResponse> {
//     return this.get<LearningPathResponse>(`${this.BASE_PATH}/path`)
//   }

//   async completeStep(request: StepCompletionRequest): Promise<StepCompletionResponse> {
//     return this.post<StepCompletionResponse>(
//       `${this.BASE_PATH}/step/complete`,
//       request
//     )
//   }

//   async resetProgress(): Promise<void> {
//     return this.post(`${this.BASE_PATH}/reset`, {})
//   }
// }
