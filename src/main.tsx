import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './index.css'
import App from './App.tsx'
import { ToastContainer } from './components/common/Toast'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const { worker } = await import('./mocks/browser.ts')

  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}

/* API 준비 렌더링 시작 */
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {/* 라우팅 컨텍스트 */}
      <BrowserRouter>
        <ToastContainer />

        {/* 메인 */}
        <App />
      </BrowserRouter>
    </StrictMode>
  )
})
