import { customFetch } from '../../utils/axios'
import { clearAllJobs } from '../allJobs/allJobsSlice'
import { clearValues } from '../jobs/jobsSlice'
import { clearAllValues, logout } from './userSlice'

export const loginThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/auth/login', user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const registerThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/auth/register', user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const updateThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch('/auth/updateUser', user)
    console.log(resp)
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

export const clearAllValuesThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(clearAllJobs())
    thunkAPI.dispatch(clearValues())
    thunkAPI.dispatch(logout(message))
    return Promise.resolve()
  } catch (error) {
    return Promise.reject()
  }
}
