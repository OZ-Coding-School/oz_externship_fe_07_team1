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
import PrivateRoute from './components/common/PrivateRoute'

function App() {
  const { isValidToken } = useAccessTokenStore()
  const { setUserInfo } = useUserInfoStore()

  const valid = isValidToken()

  const { data: newUserInfo, isSuccess } = useUserInfo({
    enabled: valid,
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
