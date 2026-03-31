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
import { getRefreshTokenAPI } from './api/authAPI'

function App() {
  const { accessToken, setAccessToken } = useAccessTokenStore()
  const { setUserInfo } = useUserInfoStore()
  const { data: newUserInfo, isSuccess } = useUserInfo({
    enabled: !!accessToken,
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

  // 액세스 토큰 보유 시 내 정보 조회
  useEffect(() => {
    if (isSuccess) {
      setUserInfo(newUserInfo)
    }
  }, [isSuccess])

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to="/posts" replace />} />

        {/* 목록 페이지 */}
        <Route path="/posts" element={<PostList />} />

        {/* 상세 페이지 */}
        <Route path="/posts/:id" element={<CommunityDetailPage />} />

        {/* 게시글 작성 페이지 */}
        <Route path="/posts/create" element={<PostCreate />} />

        {/* 게시글 수정 페이지 */}
        <Route path="/posts/:id/edit" element={<PostEdit />} />
      </Route>

      {/* UI 테스트 페이지 */}
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App
