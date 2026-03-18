import { useEffect } from 'react'
import { AlertCircle, Check, X } from 'lucide-react'
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
    <div className="animate-toast-in">
      {/* 전송 완료 안내 */}
      {(type === 'default' || type === 'success') && (
        <div className="shadow-toast bg-surface-default flex min-h-16 w-96 items-start gap-4 rounded border border-gray-200 px-5 py-4">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              type === 'success' ? 'bg-answer-active' : 'bg-red-500'
            }`}
          >
            {type === 'success' ? (
              <Check className="text-surface-default h-4 w-4" strokeWidth={3} />
            ) : (
              <AlertCircle
                className="text-surface-default h-4 w-4"
                strokeWidth={2.5}
              />
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <span className="text-text-main text-sm font-semibold tracking-tight">
              {title || (type === 'success' ? '완료' : '오류')}
            </span>
            <span className="text-text-sub text-sm font-normal tracking-tight">
              {content ||
                (type === 'success'
                  ? '요청이 정상적으로 처리되었습니다.'
                  : '요청 처리 중 문제가 발생했습니다.')}
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
