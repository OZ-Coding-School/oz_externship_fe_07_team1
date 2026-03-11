import { Check } from 'lucide-react'

export default function ToastItem({ type }: { type: 'default' | 'complete' }) {
  // 피그마 공통
  const commonShadow = { boxShadow: '4px 4px 4px 0px #83838340' }

  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
      {/* 전송 완료 안내용 */}
      {type === 'default' && (
        <div
          style={commonShadow}
          className="flex h-[48px] w-[248px] items-center gap-[12px] rounded-[4px] border border-[#ECECEC] bg-[#FAFAFA] px-[16px] py-[12px]"
        >
          {/* 체크 아이콘 */}
          <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#14C786]">
            <Check
              className="h-[14px] w-[14px] text-[#FAFAFA]"
              strokeWidth={3}
            />
          </div>
          {/* 안내 텍스트 */}
          <span className="text-[14px] leading-[140%] font-normal tracking-[-3%] text-[#4D4D4D]">
            전송 완료! 이메일을 확인해주세요.
          </span>
        </div>
      )}

      {/* 비밀번호 변경 완료용 */}
      {type === 'complete' && (
        <div
          style={commonShadow}
          className="flex h-[128px] w-[396px] flex-col items-center justify-center rounded-[12px] border border-[#ECECEC] bg-[#FFFFFF] p-[24px]"
        >
          {/* 상단 체크 아이콘 */}
          <div className="mb-[8px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#14C786]">
            <Check
              className="h-[14px] w-[14px] text-[#FAFAFA]"
              strokeWidth={3}
            />
          </div>

          {/* 중앙 텍스트 */}
          <div className="flex flex-col items-center gap-[4px] text-center">
            {/* 메인 */}
            <h3 className="text-[20px] leading-[140%] font-bold tracking-[-3%] text-[#121212]">
              비밀번호 변경 완료!
            </h3>
            {/* 안내 문구 */}
            <p className="text-[14px] leading-[140%] font-normal tracking-[-3%] text-[#4D4D4D]">
              잠시 후 로그인 페이지로 이동합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
