import MarkdownEditor from '../components/editor/MarkdownEditor/MarkdownEditor'
import EditorHeader from '../components/editor/EditorHeader'
import { Button } from '../components/Button'

function Test() {
  return (
    <div className="flex min-h-screen flex-col items-center overflow-y-auto bg-gray-50 py-20">
      <div className="flex flex-col gap-13">
        {/* 헤더 */}
        <EditorHeader />

        {/* 에디터 및 버튼 */}
        <div className="flex flex-col gap-5">
          <MarkdownEditor />

          <div className="flex justify-end pt-5">
            <Button
              variant="fill"
              className="h-14 w-[142px] rounded-lg text-lg font-bold"
            >
              등록하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test
