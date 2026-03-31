import { Routes, Route, Navigate } from 'react-router'
import Test from './pages/Test'
import RootLayout from './components/layout/RootLayout'
import PostList from './pages/PostList'
import PostCreate from './pages/PostCreate'
import PostEdit from './pages/PostEdit'
import CommunityDetailPage from './pages/CommunityDetailPage'
import { useEffect } from 'react'
import { useAccessTokenStore } from './store/useAccessTokenStore'
import { useUserInfo } from './hooks/queries/useUserQueries'
import { useUserInfoStore } from './store/useUserInfoStore'
import type { ReactNode } from 'react'

function PrivateRoute({ children }: { children: ReactNode }) {
  const accessToken = useAccessTokenStore((state) => state.accessToken)

  const isValidToken =
    typeof accessToken === 'string' &&
    accessToken !== 'null' &&
    accessToken !== 'undefined' &&
    accessToken.trim() !== ''

  if (!isValidToken) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function App() {
  const { accessToken } = useAccessTokenStore()
  const { setUserInfo } = useUserInfoStore()

  const isValidToken =
    typeof accessToken === 'string' &&
    accessToken !== 'null' &&
    accessToken !== 'undefined' &&
    accessToken.trim() !== ''

  const { data: newUserInfo, isSuccess } = useUserInfo({
    enabled: isValidToken,
  })

  useEffect(() => {
    if (isSuccess) {
      setUserInfo(newUserInfo)
    }
  }, [isSuccess])

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to="/posts" replace />} />

        <Route path="/posts" element={<PostList />} />

        <Route path="/posts/:id" element={<CommunityDetailPage />} />

        <Route
          path="/posts/create"
          element={
            <PrivateRoute>
              <PostCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/posts/:id/edit"
          element={
            <PrivateRoute>
              <PostEdit />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App
