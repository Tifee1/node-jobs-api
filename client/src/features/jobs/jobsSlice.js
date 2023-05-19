import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk'

const initialState = {
  position: '',
  company: '',
  jobLocation: '',
  status: 'pending',
  jobType: 'full-time',
  isLoading: false,
  isEditing: false,
  editId: '',
}

export const createJob = createAsyncThunk('jobs/createJob', createJobThunk)

export const deleteJob = createAsyncThunk('jobs/deleteJob', deleteJobThunk)

export const editJob = createAsyncThunk('jobs/editJob', editJobThunk)

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    handleInput: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    clearValues: () => {
      return { ...initialState }
    },
    setIsEditing: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false
      toast.success('Job Added')
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [editJob.pending]: (state) => {
      state.isLoading = true
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false
      toast.success('Job Modified')
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [deleteJob.fulfilled]: () => {
      toast.success('Job Deleted')
    },
    [deleteJob.rejected]: (_, { payload }) => {
      toast.error(payload)
    },
  },
})

export default jobsSlice.reducer

export const { handleInput, clearValues, setIsEditing } = jobsSlice.actions
