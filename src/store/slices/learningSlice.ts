// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { learningService } from '@/lib/services/learningService'
// import type { RootState } from '@/store'
// import type { LearningPath, LearningState } from '@/lib/types/learning'

// export const fetchLearningPath = createAsyncThunk(
//   'learning/fetchPath',
//   async () => {
//     return await learningService.getLearningPath()
//   }
// )

// export const completeStep = createAsyncThunk(
//   'learning/completeStep',
//   async (stepId: string) => {
//     return await learningService.completeStep({ stepId })
//   }
// )

// const initialState: LearningState = {
//   currentPath: null,
//   loading: false,
//   error: null
// }

// const learningSlice = createSlice({
//   name: 'learning',
//   initialState,
//   reducers: {
//     resetLearning: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLearningPath.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchLearningPath.fulfilled, (state, action) => {
//         state.loading = false
//         state.currentPath = action.payload
//       })
//       .addCase(fetchLearningPath.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.error.message || 'Failed to fetch learning path'
//       })
//       .addCase(completeStep.fulfilled, (state, action) => {
//         if (state.currentPath && action.payload.stepId) {
//           const stepIndex = state.currentPath.steps.findIndex(
//             step => step.id === action.payload.stepId
//           )
//           if (stepIndex !== -1) {
//             state.currentPath.steps[stepIndex].completed = true
//             state.currentPath.currentStepIndex = stepIndex + 1
//           }
//         }
//       })
//   }
// })

// export const selectLearningState = (state: RootState) => state.learning
// export const selectCurrentPath = (state: RootState) => state.learning.currentPath

// export const { resetLearning } = learningSlice.actions

// export default learningSlice.reducer