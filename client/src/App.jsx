import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Error, Home, Login } from './pages'
import { ToastContainer } from 'react-toastify'
import {
  Stats,
  Dashboard,
  Profile,
  AddJob,
  AllJobs,
  PrivateRoute,
} from './pages/dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/add-job' element={<AddJob />} />
          <Route path='/all-jobs' element={<AllJobs />} />
        </Route>
        <Route path='home' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  )
}
export default App
