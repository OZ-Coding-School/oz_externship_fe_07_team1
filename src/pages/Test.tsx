import TestWrapper from '../components/test/TestWrapper'
import MarkdownEditor from '../components/editor/MarkdownEditor'
import EditorToolbar from '../components/editor/EditorToolbar'
import { Button } from '../components/Button'

function Test() {
  return (
    <div className="bg-primary-100 flex h-dvh flex-col items-center gap-10 overflow-y-auto p-10">
      <h1 className="text-4xl font-bold text-gray-700">
        Test 페이지 ^~^ (UI 확인용)
      </h1>

      {/* Button */}
      <TestWrapper label="button">
        <div className="flex w-[236] flex-col gap-6 rounded-xl border border-dashed border-purple-200 bg-white p-8">
          {/* Default */}
          <div className="flex items-center gap-10">
            <span className="w-16 text-sm text-gray-500">Default</span>
            <div className="flex items-center gap-4">
              <Button variant="fill">답변하기</Button>
              <Button variant="sub" size="fix">
                답변 수정하기
              </Button>
              <Button variant="fill">저장하기</Button>
            </div>
          </div>
          {/* Hover 상태 */}
          <div className="flex items-center gap-10">
            <span className="w-16 text-sm text-gray-500">Hover</span>
            <div className="flex items-center gap-4">
              <Button className="bg-primary-active">답변하기</Button>
              <div className="w-[142px]" />
              <Button className="bg-primary-active">저장하기</Button>
            </div>
          </div>
        </div>
      </TestWrapper>

      {/* Tool Bar */}
      <TestWrapper label="tool bar">
        <div className="flex w-[236] justify-center rounded-xl border border-dashed border-purple-200 bg-white p-10">
          <EditorToolbar />
        </div>
      </TestWrapper>

      {/* Mark Down */}
      <TestWrapper label="mark down">
        <div className="flex justify-center">
          <MarkdownEditor />
        </div>
      </TestWrapper>
    </div>
  )
}

export default Test
