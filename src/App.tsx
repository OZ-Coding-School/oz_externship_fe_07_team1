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

function App() {
  const { accessToken } = useAccessTokenStore()
  const { setUserInfo } = useUserInfoStore()
  const { data: newUserInfo, isSuccess } = useUserInfo({
    enabled: !!accessToken,
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

        {/* 목록 페이지 */}
        <Route path="/posts" element={<PostList />} />

        {/* 상세 페이지 */}
        <Route path="/posts/:id" element={<CommunityDetailPage />} />

        {/* 게시글 작성 페이지 */}
        <Route path="/posts/create" element={<PostCreate />} />

        {/* 게시글 수정 페이지 */}
        <Route path="/posts/edit/:id" element={<PostEdit />} />
      </Route>

      {/* UI 테스트 페이지 */}
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App
