import { create } from 'zustand'

// 토스트 디자인
type ToastType = 'default' | 'complete'

interface ToastState {
  isOpen: boolean
  type: ToastType
  showToast: (type: ToastType) => void // 열기
  hideToast: () => void // 닫기
}

export const useToastStore = create<ToastState>((set) => ({
  isOpen: false, // 열림
  type: 'default', // 디자인

  // 상태 변경
  showToast: (type) => set({ isOpen: true, type }),

  // 상태 변경
  hideToast: () => set({ isOpen: false }),
}))
