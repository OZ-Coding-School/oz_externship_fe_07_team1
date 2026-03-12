import { useEffect } from 'react'
import { Check, X } from 'lucide-react'
import { useToastStore } from '../../../store/useToastStore'

export default function ToastItem({
  id,
  type,
  title,
  content,
}: {
  id: number
  type: 'default' | 'complete' | 'success'
  title?: string
  content?: string
}) {
  const { hideToast } = useToastStore()

  // 토스트 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      hideToast(id)
    }, 3000)
    return () => clearTimeout(timer) // 컴포넌트가 사라질 때 타이머 초기화
  }, [id, hideToast])

  return (
    <div className="animate-in fade-in slide-in-from-top-2 fill-mode-forwards duration-300 ease-out">
      {/* 전송 완료 안내 (type: default) */}
      {(type === 'default' || type === 'success') && (
        <div className="shadow-toast bg-surface-sub flex h-fit w-62 items-center gap-3 rounded border border-gray-200 px-4 py-3">
          <div className="bg-answer-active flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            <Check className="text-surface-sub h-3.5 w-3.5" strokeWidth={3} />
          </div>

          <div className="flex flex-1 flex-col">
            <span className="text-text-sub text-sm font-normal tracking-tight">
              {title || '전송 완료! 이메일을 확인해주세요.'}
            </span>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={() => hideToast(id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 비밀번호 변경 완료 */}
      {type === 'complete' && (
        <div className="shadow-toast bg-surface-default relative flex h-fit w-99 flex-col items-center justify-center rounded-xl border border-gray-200 p-6">
          {/* 닫기 버튼 */}
          <button
            onClick={() => hideToast(id)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>

          <div className="bg-answer-active mb-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            <Check className="text-surface-sub h-3.5 w-3.5" strokeWidth={3} />
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-text-main text-xl font-bold tracking-tight">
              {title || '비밀번호 변경 완료!'}
            </h3>
            <p className="text-text-sub text-sm font-normal tracking-tight">
              {content || '잠시 후 로그인 페이지로 이동합니다.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
