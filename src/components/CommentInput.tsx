import { useState, useRef, useEffect } from 'react'
import { CommentButton } from './CommentButton'
import { cn } from '../lib/utils'
import { MOCK_MENTION_USERS } from '../mocks/data/users'

interface CommentInputProps {
  onSubmit?: (content: string) => void
}

export const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const [content, setContent] = useState('')

  // 태그 드롭다운 및 검색어 상태
  const [showMentionList, setShowMentionList] = useState(false)
  const [mentionFilter, setMentionFilter] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const nextHeight = Math.max(80, textareaRef.current.scrollHeight)
      textareaRef.current.style.height = `${nextHeight}px`
    }
  }, [content])

  // @ 감지 로직이 포함된 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)

    const cursorPosition = e.target.selectionStart
    const textBeforeCursor = value.slice(0, cursorPosition)
    const words = textBeforeCursor.split(/\s/)
    const lastWord = words[words.length - 1]

    if (lastWord.startsWith('@')) {
      setMentionFilter(lastWord.slice(1))
      setShowMentionList(true)
    } else {
      setShowMentionList(false)
    }
  }

  // 리스트에서 유저 선택 시 호출될 함수
  const handleUserSelect = (nickname: string) => {
    if (!textareaRef.current) return

    const cursorPosition = textareaRef.current.selectionStart
    const textBeforeCursor = content.slice(0, cursorPosition)
    const textAfterCursor = content.slice(cursorPosition)

    const words = textBeforeCursor.split(/\s/)
    words.pop() // @검색어 부분 제거

    const newText =
      (words.length > 0
        ? [...words, `@${nickname} `].join(' ')
        : `@${nickname} `) + textAfterCursor
    setContent(newText)
    setShowMentionList(false)
    textareaRef.current.focus()
  }

  const handleSubmit = () => {
    if (!content.trim()) return // 입력값이 없거나 공백인 경우 무시
    onSubmit?.(content)
    setContent('') // 등록 후 입력 필드 비우기
    setShowMentionList(false)
  }
  return (
    <div className="relative w-full">
      {' '}
      {showMentionList && (
        <div className="absolute bottom-full left-0 z-50 mb-2 w-[280px] rounded-xl bg-white p-3 shadow-[0_4px_16px_0_rgba(0,0,0,0.25)]">
          <ul className="flex max-h-[116px] flex-col gap-[10px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#BDBDBD] [&::-webkit-scrollbar-track]:bg-transparent">
            {MOCK_MENTION_USERS.filter((u) =>
              u.nickname.includes(mentionFilter)
            ).map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => handleUserSelect(user.nickname)}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-gray-200"
                >
                  <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    {user.profile_img_url && (
                      <img
                        src={user.profile_img_url}
                        alt={user.nickname}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">
                    {user.nickname}
                  </span>
                </button>
              </li>
            ))}

            {/* 검색 결과가 없을 때 */}
            {MOCK_MENTION_USERS.filter((u) =>
              u.nickname.includes(mentionFilter)
            ).length === 0 && (
              <li className="p-3 text-center text-xs text-gray-400">
                검색 결과가 없습니다.
              </li>
            )}
          </ul>
        </div>
      )}
      <div
        className={cn(
          'flex w-full gap-4 rounded-xl p-4',
          'bg-surface-default focus-within:border-primary-default border-gray-250 border transition-all'
        )}
      >
        <textarea
          ref={textareaRef}
          className="text-text-main min-h-20 w-full resize-none bg-transparent text-sm leading-[1.5] outline-none placeholder:text-gray-400"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다."
          value={content}
          onChange={handleChange} // 핸들러 변경
        />

        <div className="flex items-end">
          <CommentButton disabled={!content.trim()} onClick={handleSubmit}>
            등록
          </CommentButton>
        </div>
      </div>
    </div>
  )
}
