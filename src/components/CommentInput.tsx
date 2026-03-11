import { useState, useRef, useEffect } from 'react'
import { CommentButton } from './CommentButton'
import { cn } from '../lib/utils'

interface CommentInputProps {
  onSubmit?: (content: string) => void
}

export const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const nextHeight = Math.max(120, textareaRef.current.scrollHeight)
      textareaRef.current.style.height = `${nextHeight}px`
    }
  }, [content])

  const handleSubmit = () => {
    if (!content.trim()) return // 입력값이 없거나 공백인 경우 무시
    onSubmit?.(content)
    setContent('') // 등록 후 입력 필드 비우기
  }

  return (
    <div
      className={cn(
        'flex w-full gap-10 rounded-xl p-5',
        'border-gray-250 bg-surface-default focus-within:border-primary-default border transition-all'
      )}
    >
      <textarea
        ref={textareaRef} // 높이 자동조절
        className="text-text-main placeholder:text-gray-250 min-h-30 w-full resize-none bg-transparent text-sm leading-[1.5] outline-none"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex items-end">
        <CommentButton disabled={!content.trim()} onClick={handleSubmit}>
          등록
        </CommentButton>
      </div>
    </div>
  )
}
