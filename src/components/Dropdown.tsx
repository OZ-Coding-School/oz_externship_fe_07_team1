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

  return (
    /* 최상단 컨테이너 */
    <div className="flex w-72 flex-col gap-0">
      {/* 상단 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'bg-surface-default flex h-12 w-72 items-center justify-between rounded border px-4 py-2.5 text-sm transition-all outline-none',
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
          className="shadow-box bg-surface-default mt-1 flex w-72 flex-col rounded border border-gray-500 py-1"
          style={{
            height: isCustomSelected ? 'auto' : '270px',
          }}
        >
          {/* 옵션 리스트 */}
          <ul className="scrollbar-hide flex flex-col gap-2.5 overflow-y-auto p-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option)
                  if (onSelect) onSelect(option)
                  if (option !== '기타(직접입력)') setIsOpen(false)
                }}
                className={cn(
                  'flex h-12 w-full shrink-0 cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors',
                  selected === option
                    ? 'text-primary-default font-semibold'
                    : 'text-text-main',
                  'hover:bg-primary-100'
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
            <div className="mt-1 flex w-full flex-col px-1 pb-1">
              <div className="flex flex-col gap-1 rounded border border-gray-500 p-1">
                {/* 입력창 타이틀 */}
                <div className="text-text-main flex h-12 items-center px-4 text-sm font-normal">
                  기타(직접입력)
                </div>
                {/* 텍스트 입력 */}
                <div className="border-gray-250 flex flex-col rounded border px-3 pt-1 pb-20">
                  <textarea
                    value={customText}
                    onChange={(e) =>
                      setCustomText(e.target.value.slice(0, 100))
                    }
                    placeholder="탈퇴 사유를 입력해주세요."
                    className="placeholder:text-text-disabled text-text-main h-8 w-full resize-none bg-transparent text-sm outline-none"
                  />
                </div>
                {/* 글자수 카운트 */}
                <span className="text-text-disabled pr-1 text-right text-xs">
                  {customText.length}/100
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
