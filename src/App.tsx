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
import { getRefreshTokenAPI } from './api/authAPI'

function App() {
  const { isValidToken, setAccessToken } = useAccessTokenStore()
  const { setUserInfo } = useUserInfoStore()

  const valid = isValidToken()

  const { data: newUserInfo, isSuccess } = useUserInfo({
    enabled: valid,
  })

  // 커뮤니티 사이트 진입 시 최초 1번 액세스 토큰 발급
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const { access_token: newAccessToken } = await getRefreshTokenAPI()
        setAccessToken(newAccessToken)
      } catch {
        return
      }
    }

    getAccessToken()
  }, [])

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
