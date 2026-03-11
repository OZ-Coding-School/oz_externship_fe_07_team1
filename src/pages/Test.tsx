import TestWrapper from '../components/test/TestWrapper'
import { useToast } from '../hooks'

function Test() {
  const { showToast } = useToast()

  return (
    <div className="bg-primary-100 flex h-dvh flex-col items-center gap-10 overflow-y-auto p-10">
      <h1 className="text-4xl font-bold text-gray-700">
        Test 페이지 ^~^ (UI 확인용)
      </h1>

      {/* 기본 테스트 */}
      <TestWrapper label="Default Toast (248px)">
        <button
          onClick={() => showToast('default')}
          className="bg-primary-default rounded-md px-4 py-2 text-white transition-transform active:scale-95"
        >
          기본 토스트 확인
        </button>
      </TestWrapper>

      {/* 변경 완료 테스트 */}
      <TestWrapper label="Complete Toast (396px)">
        <button
          onClick={() => showToast('complete')}
          className="bg-answer-active rounded-md px-4 py-2 text-white transition-transform active:scale-95"
        >
          비밀번호 변경 완료 확인
        </button>
      </TestWrapper>
    </div>
  )
}

export default Test
