import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  addToLocalStorage,
  getLocalStorage,
  removeFromLocalStorage,
} from '../../utils/localStorage'
import {
  clearAllValuesThunk,
  loginThunk,
  registerThunk,
  updateThunk,
} from './userThunk'

const initialState = {
  user: getLocalStorage(),
  isSidebar: false,
  isLoading: false,
  logged: false,
}

export const registerUser = createAsyncThunk('user/register', registerThunk)

export const loginUser = createAsyncThunk('user/login', loginThunk)

export const updateUser = createAsyncThunk('user/update', updateThunk)

export const clearAllValues = createAsyncThunk(
  'user/clearUsers',
  clearAllValuesThunk
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebar = !state.isSidebar
    },
    logout: (state, { payload }) => {
      state.user = null
      removeFromLocalStorage()
      state.logged = false
      if (payload) {
        toast.success(payload)
      }
    },
  },
  extraReducers: {
    // register
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addToLocalStorage(user)
      toast.success(`Hello there ${user.name}`)
      state.logged = true
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    // login
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addToLocalStorage(user)
      toast.success(`Welcome Back ${user.name}`)
      state.logged = true
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    // update
    [updateUser.pending]: (state) => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      toast.success(`Profile Edited`)
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export default userSlice.reducer

export const { toggleSidebar, logout } = userSlice.actions
