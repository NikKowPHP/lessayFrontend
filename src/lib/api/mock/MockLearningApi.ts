import type { ILearningApi } from '../interfaces/ILearningApi'
import { 
  StepStatus,
  StepType,
  type LearningPathResponse, 
  type StepCompletionRequest,
  type StepCompletionResponse 
} from '@/lib/models/responses/LearningResponses'

type MockRoute = {
  path: string
  method: 'GET' | 'POST'
  response: any
}

const mockLearningPath: LearningPathResponse = {
  id: 'path_1',
  userId: 'user_1',
  steps: [
    {
      id: 'step_1',
      title: 'Initial Assessment',
      description: 'Let\'s determine your current language level',
      type: StepType.InitialAssessment,
      status: StepStatus.Current,
      progressIndicators: {
        pronunciation: {
          value: 75,
          isPercentage: true,
          displayValue: '75%'
        },
        grammar: {
          value: 80,
          isPercentage: true,
          displayValue: '80%'
        },
        newVocabUsed: 45,
        fluencyImprovement: {
          value: 60,
          isPercentage: true,
          displayValue: '60%'
        }
      }
    },
    {
      id: 'step_2',
      title: 'Basic Conversations',
      description: 'Practice everyday German conversations',
      type: StepType.VideoLearning,
      status: StepStatus.Locked,
      preview: {
        newConcepts: ['greetings', 'introductions', 'basic questions'],
        expectedDifficulty: 'A1'
      }
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  targetLevel: 'B1',
  progressMetrics: {
    pronunciation: 0.75,
    grammar: 0.8,
    vocabulary: 0.65,
    comprehension: 0.7,
    fluency: 0.6
  },
  currentPriorityAreas: [
    {
      skill: 'pronunciation',
      priority: 1,
      reason: 'Needs improvement in vowel sounds'
    },
    {
      skill: 'vocabulary',
      priority: 2,
      reason: 'Limited everyday vocabulary'
    }
  ],
  pathSuggestions: {
    nextSteps: ['pronunciation_practice', 'vocabulary_expansion'],
    recommendedPractice: ['daily_conversations', 'listening_exercises'],
    focusAreas: ['vowel_sounds', 'basic_vocabulary']
  },
  exerciseHistory: [
    {
      id: 'exercise_1',
      type: 'pronunciation',
      score: 0.75,
      timestamp: new Date().toISOString(),
      details: {
        accuracy: 0.8,
        fluency: 0.7
      }
    }
  ],
  currentLanguage: 'de',
  nativeLanguage: 'en'
}

export class MockLearningApi implements ILearningApi {
  private mockRoutes: MockRoute[] = [
    {
      path: '/learning/path',
      method: 'GET',
      response: { data: mockLearningPath }
    },
    {
      path: '/learning/step/complete',
      method: 'POST',
      response: {
        data: {
          stepId: 'step_1',
          completed: true,
          nextStepId: 'step_2',
          progress: {
            completed: 1,
            total: 10,
            percentage: 10
          }
        }
      }
    }
  ]

  private async handleMockRequest(path: string, method: 'GET' | 'POST', body?: any): Promise<any> {
    await this.delay(1000)
    
    const route = this.mockRoutes.find(r => 
      r.path === path && r.method === method
    )

    if (!route) {
      throw new Error(`Mock route not found: ${method} ${path}`)
    }

    if (typeof route.response === 'function') {
      return route.response(body)
    }

    return route.response
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getLearningPath(): Promise<{ data: LearningPathResponse }> {
    return this.handleMockRequest('/learning/path', 'GET')
  }

  async completeStep(request: StepCompletionRequest): Promise<{ data: StepCompletionResponse }> {
    return this.handleMockRequest('/learning/step/complete', 'POST', request)
  }

  async resetProgress(): Promise<void> {
    return this.handleMockRequest('/learning/reset', 'POST')
  }
}
