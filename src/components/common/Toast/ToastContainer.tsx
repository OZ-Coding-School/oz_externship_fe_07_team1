import { useToastStore } from '../../../store/useToastStore'
import ToastItem from './ToastItem'

export default function ToastContainer() {
  // 스토어 상태
  const { toasts } = useToastStore()

  return (
    <div className="fixed top-10 left-1/2 z-[9999] flex -translate-x-1/2 flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          content={toast.content}
        />
      ))}
    </div>
  )
}
