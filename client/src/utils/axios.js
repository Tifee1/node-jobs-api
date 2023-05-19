import axios from 'axios'
import { clearAllValues } from '../features/user/userSlice'
import { getLocalStorage } from './localStorage'

export const customFetch = axios.create({
  baseURL: '/api/v1',
})

customFetch.interceptors.request.use((config) => {
  const user = getLocalStorage()
  if (user) {
    config.headers.common['Authorization'] = `Bearer ${user.token}`
  }
  return config
})

// export const checkForUnauthorizedRequest = (error, thunkAPI) => {
//   if (error.response.status === 401) {
//     thunkAPI.dispatch(clearAllValues('Unauthorized Request, Logging out...'))
//     return thunkAPI.rejectWithValue(error.response.data.msg)
//   }
//   return thunkAPI.rejectWithValue(
//     error.response ? error.response.data.msg : 'Something went wrong'
//   )
//   // return thunkAPI.rejectWithValue(error.response.data.msg)
// }
