import { configureStore } from '@reduxjs/toolkit'
import allJobsSlice from './features/allJobs/allJobsSlice'
import jobsSlice from './features/jobs/jobsSlice'
import userSlice from './features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    jobs: jobsSlice,
    allJobs: allJobsSlice,
  },
})

export default store
