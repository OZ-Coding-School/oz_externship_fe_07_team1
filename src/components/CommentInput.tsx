import { useState } from 'react'
import { Button } from './Button'
import { cn } from '../lib/utils'

interface CommentInputProps {
  onSubmit?: (content: string) => void
}

export const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!content.trim()) return // 입력값이 없거나 공백인 경우 무시
    onSubmit?.(content)
    setContent('') // 등록 후 입력 필드 비우기
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          'border-grey-3 bg-grey-1 focus-within:border-primary w-full rounded-md border p-4 transition-all focus-within:bg-white'
        )}
      >
        <textarea
          className="text-grey-6 placeholder:text-grey-4 min-h-[80px] w-full resize-none bg-transparent text-sm outline-none"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mt-2 flex justify-end">
          <Button
            variant="fill"
            disabled={!content.trim()}
            onClick={handleSubmit}
            className="h-9 rounded-full px-6 text-sm"
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  )
}
