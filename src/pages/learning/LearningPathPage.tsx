// import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '@/store/hooks'
// import { fetchLearningPath } from '@/store/slices/learningSlice'
// import { LearningStep } from '@/components/learning/LearningStep'
// import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function LearningPathPage() {
  return <div>Learning Path Page</div>
}

// export const LearningPath = () => {
//   const dispatch = useAppDispatch()
//   const { currentPath, loading, error } = useAppSelector((state) => state.learning)

//   useEffect(() => {
//     dispatch(fetchLearningPath())
//   }, [dispatch])

//   if (loading) {
//     return <LoadingSpinner />
//   }

//   if (error) {
//     return <div>Error: {error}</div>
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Learning Path</h1>
//       <div className="space-y-4">
//         {currentPath?.steps?.map((step, index) => (
//           <LearningStep 
//             key={step.id} 
//             step={step}
//             isActive={index === currentPath.currentStepIndex}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default LearningPath
