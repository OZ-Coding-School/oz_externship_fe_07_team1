import { create } from 'zustand'

// 토스트 디자인
type ToastType = 'default' | 'complete' | 'success'

// 개별 토스트 인터페이스 추가
interface Toast {
  id: number
  type: ToastType
  title?: string
  content?: string
}

interface ToastState {
  toasts: Toast[] // 배열
  showToast: (type: ToastType, title?: string, content?: string) => void // 열기
  hideToast: (id: number) => void // 닫기
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  // 상태 변경
  showToast: (type, title, content) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), type, title, content }],
    })),

  // 상태 변경
  hideToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))
