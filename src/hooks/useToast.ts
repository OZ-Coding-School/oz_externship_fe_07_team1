import { useToastStore } from '../store/useToastStore'

export const useToast = () => {
  // 스토어에서 함수 가져오기
  const showToastStore = useToastStore((state) => state.showToast)
  const hideToast = useToastStore((state) => state.hideToast)

  // 호출할 토스트 함수
  const showToast = (type: 'default' | 'complete') => {
    showToastStore(type)
  }

  return { showToast, hideToast }
}
