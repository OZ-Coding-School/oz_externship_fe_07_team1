import { Navigate } from 'react-router'
import { useAccessTokenStore } from '../../store/useAccessTokenStore'
import type { ReactNode } from 'react'

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isValidToken } = useAccessTokenStore()

  if (!isValidToken()) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default PrivateRoute
