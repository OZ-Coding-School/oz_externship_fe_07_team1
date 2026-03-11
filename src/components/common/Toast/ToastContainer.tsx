import { useEffect } from 'react'
import { useToastStore } from '../../../store/useToastStore'
import ToastItem from './ToastItem'

export default function ToastContainer() {
  // 스토어 상태 가져오기
  const { isOpen, type, hideToast } = useToastStore()

  //  토스트 타이머 설정
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        hideToast()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, hideToast])

  // 조건부 렌더링
  if (!isOpen) return null

  return (
    <div className="fixed top-10 left-1/2 z-[9999] -translate-x-1/2">
      <ToastItem type={type} />
    </div>
  )
}
