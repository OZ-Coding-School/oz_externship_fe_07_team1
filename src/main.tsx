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

/* API 준비 및 앱 렌더링 */
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ToastContainer />

      <BrowserRouter>
        {/* 라우팅 로직 */}
        <App />
      </BrowserRouter>
    </StrictMode>
  )
})
