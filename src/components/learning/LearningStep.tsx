// import { Button } from '@/components/ui/Button'
// import { useAppDispatch } from '@/store/hooks'
// import { completeStep } from '@/store/slices/learningSlice'
// import type { LearningStep as LearningStepType } from '@/lib/types/learning'

// interface LearningStepProps {
//   step: LearningStepType
//   isActive: boolean
// }

// export const LearningStep = ({ step, isActive }: LearningStepProps) => {
//   const dispatch = useAppDispatch()

//   const handleComplete = () => {
//     dispatch(completeStep(step.id))
//   }

//   return (
//     <div className={`p-4 border rounded-lg ${isActive ? 'border-blue-500' : 'border-gray-200'}`}>
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-semibold">{step.title}</h3>
//           <p className="text-sm text-gray-600">{step.description}</p>
//         </div>
//         {isActive && (
//           <Button 
//             onClick={handleComplete}
//             disabled={step.completed}
//           >
//             {step.completed ? 'Completed' : 'Complete Step'}
//           </Button>
//         )}
//       </div>
//       {step.progress > 0 && (
//         <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
//           <div 
//             className="bg-blue-600 h-2.5 rounded-full" 
//             style={{ width: `${step.progress}%` }}
//           />
//         </div>
//       )}
//     </div>
//   )
// }
