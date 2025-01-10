import { Button } from '@/components/ui/Button'
import type { LearningStep as LearningStepType } from '@/lib/models/responses/LearningResponses'
import { StepStatus } from '@/lib/models/responses/LearningResponses'

interface LearningStepProps {
  step: LearningStepType
  isActive: boolean
}

export function LearningStep({ step, isActive }: LearningStepProps) {
  const getStepStatusClass = (status: StepStatus) => {
    switch (status) {
      case StepStatus.Completed:
        return 'bg-green-100 border-green-500'
      case StepStatus.Current:
        return 'bg-blue-100 border-blue-500'
      case StepStatus.Locked:
        return 'bg-gray-100 border-gray-300'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div
      className={`p-4 rounded-lg border-2 ${getStepStatusClass(step.status)} 
        ${isActive ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
          {step.progressIndicators && (
            <div className="mt-2 text-sm text-gray-500">
              {Object.entries(step.progressIndicators).map(([key, value]) => (
                <div key={key}>
                  {key}: {value.displayValue}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {step.status === StepStatus.Current && (
            <Button variant="primary">
              Start
            </Button>
          )}
          {step.status === StepStatus.Completed && (
            <span className="text-green-500">✓ Completed</span>
          )}
          {step.status === StepStatus.Locked && (
            <span className="text-gray-400">🔒 Locked</span>
          )}
        </div>
      </div>
    </div>
  )
}