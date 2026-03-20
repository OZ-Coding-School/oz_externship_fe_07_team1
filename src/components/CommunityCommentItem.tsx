interface CommentItemProps {
  authorName: string
  date: string
  content: string
  isMyComment?: boolean
  onDelete?: () => void
}

export const CommentItem = ({
  authorName,
  date,
  content,
  isMyComment = false,
  onDelete,
}: CommentItemProps) => {
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

          {isMyComment && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-300">|</span>
              <button
                onClick={onDelete}
                className="text-primary-default cursor-pointer text-xs font-medium hover:underline"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="text-text-main mt-1 text-sm leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  )
}
