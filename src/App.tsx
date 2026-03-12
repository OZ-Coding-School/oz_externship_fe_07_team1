import { Routes, Route } from 'react-router'
import Landing from './pages/Landing'
import Test from './pages/Test'

function App() {
  return (
    <Routes>
      {/* 메인 랜딩 페이지 */}
      <Route path="/" element={<Landing />} />

      {/* 기능 테스트를 위한 페이지 */}
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App
