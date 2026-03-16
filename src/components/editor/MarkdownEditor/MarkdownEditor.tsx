import { useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import EditorToolbar from './EditorToolbar'
import previewImage from '../../../assets/images/markdownimage1.png'

export default function MarkdownEditor() {
  // 에디터
  const editorWrapperRef = useRef<HTMLDivElement | null>(null)

  // 마크다운
  const [value, setValue] = useState<string | undefined>(`# h1 title
## h2 title
### h3 title
#### h4 title
##### h5 title
###### h6 title

**Bold text**
*Italic text*
***Italic bold text***

> Blockquotes text

- Not numbered list items
- Not numbered list items
- Not numbered list items

1. Numbered list items
2. Numbered list items
3. Numbered list items

* Not numbered list items
* Not numbered list items
* Not numbered list items

![Image name](${previewImage})

\`\`\`cpp
std::cout << "Hello World!" << std::endl;
\`\`\`
`)

  // textarea 찾기
  const getTextarea = () => {
    return editorWrapperRef.current?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement | null
  }

  // 커서
  const updateSelection = (
    nextValue: string,
    selectionStart: number,
    selectionEnd: number
  ) => {
    setValue(nextValue)

    requestAnimationFrame(() => {
      const textarea = getTextarea()
      if (!textarea) return

      textarea.focus()
      textarea.setSelectionRange(selectionStart, selectionEnd)
    })
  }

  // 인라인
  const applyInlineFormat = (before: string, after: string = before) => {
    const textarea = getTextarea()
    const currentValue = value ?? ''

    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = currentValue.slice(start, end)

    if (!selectedText) {
      const insertText = 'text'

      const nextValue =
        currentValue.slice(0, start) +
        before +
        insertText +
        after +
        currentValue.slice(end)

      const nextSelectionStart = start + before.length
      const nextSelectionEnd = start + before.length + insertText.length

      updateSelection(nextValue, nextSelectionStart, nextSelectionEnd)
      return
    }

    const beforeText = currentValue.slice(start - before.length, start)
    const afterText = currentValue.slice(end, end + after.length)
    const isWrapped = beforeText === before && afterText === after

    if (isWrapped) {
      const nextValue =
        currentValue.slice(0, start - before.length) +
        selectedText +
        currentValue.slice(end + after.length)

      const nextSelectionStart = start - before.length
      const nextSelectionEnd = nextSelectionStart + selectedText.length

      updateSelection(nextValue, nextSelectionStart, nextSelectionEnd)
      return
    }

    const nextValue =
      currentValue.slice(0, start) +
      before +
      selectedText +
      after +
      currentValue.slice(end)

    const nextSelectionStart = start + before.length
    const nextSelectionEnd = end + before.length

    updateSelection(nextValue, nextSelectionStart, nextSelectionEnd)
  }

  // 리스트
  const applyLinePrefix = (type: 'ul' | 'ol') => {
    const textarea = getTextarea()
    const currentValue = value ?? ''

    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const lineStart = currentValue.lastIndexOf('\n', start - 1) + 1
    const lineEndIndex = currentValue.indexOf('\n', end)
    const lineEnd = lineEndIndex === -1 ? currentValue.length : lineEndIndex

    const selectedBlock = currentValue.slice(lineStart, lineEnd)
    const lines = selectedBlock.split('\n')

    const isUnordered =
      type === 'ul' &&
      lines.every((line) => /^(\s*[-*]\s)/.test(line) || line.trim() === '')

    const isOrdered =
      type === 'ol' &&
      lines.every((line) => /^(\s*\d+\.\s)/.test(line) || line.trim() === '')

    let formattedLines: string[]

    if (isUnordered || isOrdered) {
      formattedLines = lines.map((line) =>
        line.replace(/^(\s*)([-*] |\d+\. )/, '$1')
      )
    } else if (type === 'ul') {
      formattedLines = lines.map((line) => {
        if (line.trim() === '') return line
        return `- ${line.replace(/^(\s*)([-*] |\d+\. )/, '')}`
      })
    } else {
      let order = 1
      formattedLines = lines.map((line) => {
        if (line.trim() === '') return line
        const formatted = `${order}. ${line.replace(/^(\s*)([-*] |\d+\. )/, '')}`
        order += 1
        return formatted
      })
    }

    const replacedBlock = formattedLines.join('\n')

    const nextValue =
      currentValue.slice(0, lineStart) +
      replacedBlock +
      currentValue.slice(lineEnd)

    updateSelection(nextValue, lineStart, lineStart + replacedBlock.length)
  }

  // 링크
  const insertLink = () => {
    const textarea = getTextarea()
    const currentValue = value ?? ''

    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = currentValue.slice(start, end) || 'link text'
    const markdown = `[${selectedText}](https://example.com)`

    const nextValue =
      currentValue.slice(0, start) + markdown + currentValue.slice(end)

    updateSelection(nextValue, start + 1, start + 1 + selectedText.length)
  }

  // 이미지 삽입
  const insertImage = () => {
    const textarea = getTextarea()
    const currentValue = value ?? ''

    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const markdown = `![Image name](${previewImage})`

    const nextValue =
      currentValue.slice(0, start) + markdown + currentValue.slice(end)

    updateSelection(nextValue, start, start + markdown.length)
  }

  return (
    // 전체 박스
    <div className="bg-surface-default border-gray-250 rounded-5 flex w-236 flex-col overflow-hidden border">
      {/* 툴바 */}
      <div className="bg-surface-default border-gray-250 rounded-t-5 flex h-25 w-full items-center gap-5 overflow-hidden border-b p-8">
        <EditorToolbar
          onBold={() => applyInlineFormat('**')}
          onItalic={() => applyInlineFormat('*')}
          onUnderline={() => applyInlineFormat('<u>', '</u>')}
          onStrike={() => applyInlineFormat('~~')}
          onLink={insertLink}
          onImage={insertImage}
          onUnorderedList={() => applyLinePrefix('ul')}
          onOrderedList={() => applyLinePrefix('ol')}
        />
      </div>

      {/* 에디터 */}
      <div
        ref={editorWrapperRef}
        className="custom-editor-container"
        data-color-mode="light"
      >
        <MDEditor
          value={value}
          onChange={setValue}
          preview="live"
          hideToolbar
          visibleDragbar={false}
          height={573}
          className="custom-editor"
        />
      </div>
    </div>
  )
}
