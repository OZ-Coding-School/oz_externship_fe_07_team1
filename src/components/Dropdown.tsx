import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'

interface DropdownProps {
  options?: string[]
  placeholder?: string
  onSelect?: (value: string) => void
}

export default function Dropdown({
  options = [
    'Select 01',
    'Select 02',
    'Select 03',
    'Select 04',
    '기타(직접입력)',
  ],
  placeholder = '해당되는 항목을 선택해 주세요.',
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(placeholder)
  const [customText, setCustomText] = useState('')

  const isCustomSelected = selected === '기타(직접입력)'
  const currentOptionNum = options.length

  return (
    /* 최상단 컨테이너 */
    <div className="flex w-full flex-col gap-0">
      {/* 상단 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'bg-surface-default flex h-12 w-full items-center justify-between rounded border px-4 py-2.5 text-sm transition-all outline-none',
          isOpen
            ? 'border-primary-400 text-text-main font-medium'
            : 'text-text-disabled border-gray-500'
        )}
      >
        <span>{selected}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 transition-transform',
            isOpen ? 'text-primary-400 rotate-180' : 'text-gray-500'
          )}
        />
      </button>

      {/* 하단 리스트/입력창 컨테이너 */}
      {isOpen && (
        <div
          className={cn(
            'shadow-box bg-surface-default mt-1 flex w-full flex-col rounded border border-gray-500 py-1',
            isCustomSelected
              ? 'h-auto'
              : currentOptionNum <= 5
                ? 'h-fit'
                : 'max-h-64'
          )}
        >
          {/* 옵션 리스트 */}
          <ul className="scrollbar scrollbar-w-2 scrollbar-thumb-gray-disabled scrollbar-track-transparent scrollbar-thumb-rounded-sm flex max-h-60 flex-col gap-2.5 overflow-y-auto p-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option)
                  if (onSelect) onSelect(option)
                  if (option !== '기타(직접입력)') setIsOpen(false)
                }}
                className={cn(
                  'hover:bg-primary-100 flex h-12 w-full shrink-0 cursor-pointer items-center justify-between rounded-sm px-4 py-2.5 text-sm transition-colors',
                  selected === option
                    ? 'text-primary-default font-semibold'
                    : 'text-text-main'
                )}
              >
                {option}
                {/* 체크 아이콘 */}
                {selected === option && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.3334 4L6.00008 11.3333L2.66675 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>

          {/* 기타 직접입력 박스 */}
          {isCustomSelected && (
            <div className="mt-1 flex w-full flex-col border-t border-gray-100 px-1 pb-1">
              <div className="bg-surface-sub mt-1 flex flex-col gap-1 rounded p-2">
                {/* 입력창 타이틀 */}
                <div className="text-text-main flex h-8 items-center px-2 text-sm font-semibold">
                  기타(직접입력)
                </div>
                {/* 텍스트 입력 */}
                <div className="bg-surface-default border-gray-250 flex flex-col rounded border px-3 py-2">
                  <textarea
                    value={customText}
                    onChange={(e) =>
                      setCustomText(e.target.value.slice(0, 100))
                    }
                    placeholder="탈퇴 사유를 입력해주세요."
                    className="placeholder:text-text-disabled text-text-main h-20 w-full resize-none bg-transparent text-sm outline-none"
                  />
                  {/* 글자수 카운트 */}
                  <span className="text-text-disabled mt-1 text-right text-xs">
                    {customText.length}/100
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
