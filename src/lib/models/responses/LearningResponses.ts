import type { LanguageCode } from '@/constants/languages'

// Main Response Types
export interface LearningPathResponse {
  id: string
  userId: string
  steps: LearningStep[]
  createdAt: string
  updatedAt: string
  targetLevel: string
  progressMetrics: ProgressMetrics
  currentPriorityAreas: RecommendedArea[]
  pathSuggestions: LearningPathSuggestions
  exerciseHistory: CompletedExercise[]
  currentLanguage: LanguageCode
  nativeLanguage: LanguageCode
}

export interface StepCompletionRequest {
  stepId: string
}

export interface StepCompletionResponse {
  stepId: string
  completed: boolean
  nextStepId: string
  progress: {
    completed: number
    total: number
    percentage: number
  }
}

// Learning Step Types
export interface LearningStep {
  id: string
  title: string
  description: string
  type: StepType
  status: StepStatus
  date?: string
  feedback?: Record<string, any>
  progressMetrics?: ProgressMetrics
  choices?: AdaptiveChoice[]
  unlockCriteria?: UnlockCriteria
  preview?: StepPreview
  adaptiveReason?: string
  progressIndicators?: ProgressIndicators
  targetLevel?: string
}

export enum StepType {
  InitialAssessment = 'initialAssessment',
  VideoLearning = 'videoLearning',
  PracticeExercise = 'practiceExercise',
  ProgressCheck = 'progressCheck',
  Milestone = 'milestone',
  AdaptiveChoice = 'adaptiveChoice'
}

export enum StepStatus {
  Completed = 'completed',
  Current = 'current',
  Locked = 'locked',
  Pending = 'pending'
}

// Progress Types
export interface ProgressMetrics {
  pronunciation: number
  grammar: number
  vocabulary: number
  comprehension: number
  fluency: number
}

export interface ProgressIndicators {
  pronunciation: ProgressValue
  grammar: ProgressValue
  newVocabUsed: number
  fluencyImprovement: ProgressValue
}

export interface ProgressValue {
  value: number
  isPercentage: boolean
  displayValue: string
}

// Choice Types
export interface Choice {
  id: string
  title: string
  description: string
  type: string
  duration: string
  status: ChoiceStatus
  relevance: string
}

export enum ChoiceStatus {
  Completed = 'completed',
  Pending = 'pending'
}

export interface AdaptiveChoice extends Choice {
  targetSkill: string
  difficulty: string
  prerequisites: string[]
  adaptiveParameters?: Record<string, any>
  specificIssues?: SpecificIssue[]
}

// Additional Types
export interface UnlockCriteria {
  required: string[]
  progress: string
}

export interface StepPreview {
  newConcepts: string[]
  expectedDifficulty: string
}

export interface RecommendedArea {
  skill: string
  priority: number
  reason: string
}

export interface LearningPathSuggestions {
  nextSteps: string[]
  recommendedPractice: string[]
  focusAreas: string[]
}

export interface CompletedExercise {
  id: string
  type: string
  score: number
  timestamp: string
  details: Record<string, any>
}

export interface SpecificIssue {
  type: string
  description: string
  priority: number
}
