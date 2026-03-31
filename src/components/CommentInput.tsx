import { useState } from 'react'
import { useAccessTokenStore } from '../store/useAccessTokenStore'

interface CommentInputProps {
  onSubmit: (content: string) => void
  onClick?: () => void
}

export const CommentInput = ({ onSubmit, onClick }: CommentInputProps) => {
  const [content, setContent] = useState('')
  const { isValidToken } = useAccessTokenStore()

  const handleSubmit = () => {
    if (!isValidToken()) return
    if (!content.trim()) return
    onSubmit(content)
    setContent('')
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onClick={onClick}
        placeholder="댓글을 입력해주세요."
        className="focus:border-primary-default w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none"
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-primary-default rounded-md px-4 py-2 text-sm text-white"
        >
          등록
        </button>
      </div>
    </div>
  )
}
