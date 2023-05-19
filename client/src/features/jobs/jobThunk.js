import { customFetch } from '../../utils/axios'
import { getJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice'
import { clearAllValues } from '../user/userSlice'
import { clearValues } from './jobsSlice'

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job)
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(clearAllValues('Unauthorized Request, Logging out...'))
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
    // checkForUnauthorizedRequest(error, thunkAPI)
  }
}

export const deleteJobThunk = async (id, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const resp = await customFetch.delete(`/jobs/${id}`)
    thunkAPI.dispatch(getJobs())
    thunkAPI.dispatch(hideLoading())
    return resp.data
  } catch (error) {
    thunkAPI.dispatch(getJobs())
    thunkAPI.dispatch(hideLoading)
    if (error.response.status === 401) {
      thunkAPI.dispatch(clearAllValues('Unauthorized Request, Logging out...'))
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
    // checkForUnauthorizedRequest(error, thunkAPI)
  }
}

export const editJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${job.id}`, job)
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(clearAllValues('Unauthorized Request, Logging out...'))
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
    // checkForUnauthorizedRequest(error, thunkAPI)
  }
}
