import { useEffect } from 'react'
import { useToastStore } from '../../../store/useToastStore'
import ToastItem from './ToastItem'

export default function ToastContainer() {
  // 스토어 상태
  const { isOpen, type, hideToast } = useToastStore()

  // 토스트 타이머
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(hideToast, 3000)
      return () => clearTimeout(timer) // 컴포넌트가 사라질 때 타이머 초기화
    }
  }, [isOpen, hideToast])

  // 토스트가 닫혀있는 상태면 아무것도 없음
  if (!isOpen) return null

  return (
    <div className="fixed top-10 left-1/2 z-[9999] -translate-x-1/2">
      {/* 실제 토스트 디자인 */}
      <ToastItem type={type} />
    </div>
  )
}
