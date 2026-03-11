import { Check } from 'lucide-react'

export default function ToastItem({ type }: { type: 'default' | 'complete' }) {
  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
      {/* 1. 전송 완료 안내용 (type: default) */}
      {type === 'default' && (
        <div className="shadow-toast bg-surface-sub flex h-fit w-62 items-center gap-3 rounded border border-gray-100 px-4 py-3">
          {/* 체크 아이콘 */}
          <div className="bg-answer-active flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            <Check className="text-surface-sub h-3.5 w-3.5" strokeWidth={3} />
          </div>

          {/* 안내 텍스트 */}
          <span className="text-text-sub text-sm font-normal tracking-tight">
            전송 완료! 이메일을 확인해주세요.
          </span>
        </div>
      )}

      {/* 2. 비밀번호 변경 완료용 (type: complete) */}
      {type === 'complete' && (
        <div className="shadow-toast bg-surface-default flex h-fit w-99 flex-col items-center justify-center rounded-xl border border-gray-100 p-6">
          {/* 상단 체크 아이콘 */}
          <div className="bg-answer-active mb-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            <Check className="text-surface-sub h-3.5 w-3.5" strokeWidth={3} />
          </div>

          {/* 중앙 텍스트 */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-text-main text-xl font-bold tracking-tight">
              비밀번호 변경 완료!
            </h3>
            <p className="text-text-sub text-sm font-normal tracking-tight">
              잠시 후 로그인 페이지로 이동합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
