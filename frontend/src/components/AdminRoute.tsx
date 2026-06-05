import { Navigate } from 'react-router-dom'
import { getAuthToken, getUserData } from '../api/auth'

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const token = getAuthToken()
  const user = getUserData()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/shop" replace />
  }

  return <>{children}</>
}
