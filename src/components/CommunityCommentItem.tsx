import { useState } from 'react'

interface CommentItemProps {
  authorName: string
  date: string
  content: string
  isMyComment?: boolean
  onDelete?: () => void
  onEdit?: (newContent: string) => void
}

export const CommentItem = ({
  authorName,
  date,
  content,
  isMyComment = false,
  onDelete,
  onEdit,
}: CommentItemProps) => {
  // 수정 모드 관리 상태
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content)

  // 수정 완료 버튼 눌렀을 때
  const handleSave = () => {
    if (!editContent.trim()) {
      alert('수정할 내용을 입력해주세요.')
      return
    }
    if (onEdit) {
      onEdit(editContent)
      setIsEditing(false)
    }
  }

  //  취소 버튼 눌렀을 때
  const handleCancel = () => {
    setIsEditing(false) // 수정 모드 끄기
    setEditContent(content) // 쓰던 거 날리고 원래 내용으로 복구
  }
  return (
    <div className="flex gap-3 border-b border-gray-200 py-5 last:border-0">
      {/* 왼쪽 프로필 이미지 */}
      <div className="bg-primary-100 mt-1 h-8 w-8 shrink-0 overflow-hidden rounded-full"></div>
      {/* 오른쪽 */}
      <div className="flex w-full flex-col">
        <div className="flex items-center gap-2">
          <span className="text-base leading-snug font-semibold tracking-tight text-gray-600">
            {authorName}
          </span>
          <span className="text-xs text-gray-400">{date}</span>

          {isMyComment && !isEditing && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-300">|</span>
              <button
                onClick={() => setIsEditing(true)}
                className="cursor-pointer text-xs font-medium text-gray-400 hover:underline"
              >
                수정
              </button>
              <button
                onClick={onDelete}
                className="text-primary-default cursor-pointer text-xs font-medium hover:underline"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          // 수정 모드일 때 (입력창 + 취소/저장 버튼)
          <div className="mt-2 flex flex-col gap-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="cursor-pointer rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="bg-primary-400 hover:bg-primary-default cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-white"
              >
                수정 완료
              </button>
            </div>
          </div>
        ) : (
          // 일반 모드일 때 (기존 텍스트)
          <div className="text-text-main mt-1 text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        )}
      </div>
    </div>
  )
}
