import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getJobsThunk, getStatsThunk } from './allJobsSliceThunk'

const initialFilter = {
  search: '',
  sort: 'latest',
  jobType: 'all',
  status: 'all',
  page: 1,
}

const initialState = {
  jobs: [],
  numOfPages: 0,
  totalJobs: 0,
  monthlyApplications: [],
  pending: 0,
  interview: 0,
  declined: 0,
  isLoading: false,
  ...initialFilter,
}

export const getJobs = createAsyncThunk('allJobs/getJobs', getJobsThunk)

export const getStats = createAsyncThunk('allJobs/getStats', getStatsThunk)

const allJobSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state.page = 1
      const name = payload.name
      const value = payload.value
      state[name] = value
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilter }
    },
    changePage: (state, { payload }) => {
      state.page = payload
    },
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    clearAllJobs: () => {
      return { ...initialState }
    },
  },

  extraReducers: {
    [getJobs.pending]: (state) => {
      state.isLoading = true
    },
    [getJobs.fulfilled]: (state, { payload }) => {
      const { jobs, numOfPages, totalJobs } = payload
      state.isLoading = false
      state.jobs = jobs
      state.numOfPages = numOfPages
      state.totalJobs = totalJobs
    },
    [getJobs.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },

    [getStats.pending]: (state) => {
      state.isLoading = true
    },
    [getStats.fulfilled]: (state, { payload }) => {
      const { monthlyApplications, defaultStats } = payload
      const { pending, interview, declined } = defaultStats
      state.isLoading = false
      state.monthlyApplications = monthlyApplications
      state.pending = pending
      state.interview = interview
      state.declined = declined
    },
    [getStats.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export default allJobSlice.reducer

export const {
  handleChange,
  changePage,
  showLoading,
  hideLoading,
  clearFilters,
  clearAllJobs,
} = allJobSlice.actions
