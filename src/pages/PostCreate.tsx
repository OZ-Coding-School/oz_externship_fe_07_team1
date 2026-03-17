import EditorHeader from '../components/editor/EditorHeader'
import MarkdownEditor from '../components/editor/MarkdownEditor/MarkdownEditor'
import { Button } from '../components/Button'

function PostCreate() {
  return (
    <div className="bg-surface-default flex w-full justify-center pt-27">
      <div className="flex w-236 flex-col gap-13">
        <EditorHeader />

        <MarkdownEditor />

        <div className="flex w-full justify-end">
          <Button>등록하기</Button>
        </div>
      </div>
    </div>
  )
}

export default PostCreate
