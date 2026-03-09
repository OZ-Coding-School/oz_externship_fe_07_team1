import { Routes, Route } from 'react-router'
import './App.css'
import Landing from './pages/Landing'
import Test from './pages/Test'

function App() {
  return (
    <Routes>
      {/* 랜딩 */}
      <Route path="/" element={<Landing />} />

      {/* 테스트 */}
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App
