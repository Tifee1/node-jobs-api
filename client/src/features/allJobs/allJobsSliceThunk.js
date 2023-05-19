import { customFetch } from '../../utils/axios'

export const getJobsThunk = async (_, thunkAPI) => {
  try {
    const { status, jobType, page, search, sort } = thunkAPI.getState().allJobs
    let url = `/jobs?status=${status}&jobType=${jobType}&sort=${sort}&page=${page}`
    if (search) {
      url = url + `&search=${search}`
    }
    const resp = await customFetch.get(url)
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

export const getStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs/stats')

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
