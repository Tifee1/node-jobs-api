import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user)
  const auth = { email: user?.email || '', token: user?.token || '' }

  if (!auth.token || !auth.email) {
    return <Navigate to='/home' />
  }
  return children
}
export default PrivateRoute
