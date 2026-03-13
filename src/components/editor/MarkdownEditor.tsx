import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import EditorHeader from './EditorHeader'
import EditorToolbar from './EditorToolbar'

export default function MarkdownEditor() {
  const [value, setValue] = useState<string | undefined>(
    `## 안녕하세요! 답변 드립니다.

## Images

![Checkboard](/image-placeholder.png)

요렇게 cleandoc(https://docs.python.org/ko/3/library/inspect.html#inspect.cleandoc) 메서드를 쓰는 방법도 있긴 합니당.`
  )

  return (
    // 메인 에디터 컨테이너
    <div className="bg-surface-default shadow-box rounded-5 border-gray-250 flex h-191 w-236 flex-col overflow-hidden border font-sans">
      {/* 상단 헤더 */}
      <div className="flex h-27 w-full items-center">
        <EditorHeader />
      </div>

      {/* 중앙 툴바 */}
      <div className="border-gray-250 flex h-21 w-full items-center border-y bg-white">
        <EditorToolbar />
      </div>

      {/* 하단 마크다운 에디터 본문 구역 */}
      <div className="custom-editor-container" data-color-mode="light">
        <div className="h-143 w-full">
          <MDEditor
            value={value}
            onChange={setValue}
            preview="live"
            hideToolbar
            height={573}
            visibleDragbar={false}
            style={{
              display: 'flex',
              backgroundColor: '#ECECEC',
              height: '100%',
              border: 'none',
            }}
            className="custom-editor"
          />
        </div>
      </div>
    </div>
  )
}
