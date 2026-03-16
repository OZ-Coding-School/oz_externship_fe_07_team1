import { Routes, Route, Navigate } from 'react-router'
import Test from './pages/Test'
import RootLayout from './components/layout/RootLayout'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import PostCreate from './pages/PostCreate'
import PostEdit from './pages/PostEdit'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to="/posts" replace />} />

        {/* 목록 페이지 */}
        <Route path="/posts" element={<PostList />} />

        {/* 상세 페이지 */}
        <Route path="/posts/:id" element={<PostDetail />} />

        {/* 게시글 추가 페이지 */}
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
