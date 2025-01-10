import type { 
  LearningPathResponse, 
  LearningStep, 
  StepStatus 
} from '@/lib/models/responses/LearningResponses'

export interface LearningState {
  currentPath: LearningPathResponse | null
  loading: boolean
  error: string | null
  currentStepIndex: number
}

// Add any additional state-specific interfaces here
export interface LearningPath extends LearningPathResponse {
  currentStepIndex: number
}

// Update the step interface to include state-specific properties
export interface LearningStepState extends LearningStep {
  status: StepStatus
}
