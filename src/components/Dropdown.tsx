import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'

const options = [
  'Select 01',
  'Select 02',
  'Select 03',
  'Select 04',
  '기타(직접입력)',
]

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('해당되는 항목을 선택해 주세요.')
  const [customText, setCustomText] = useState('')

  const isCustomSelected = selected === '기타(직접입력)'

  return (
    <div className="relative inline-block h-12 w-72">
      {/*Default */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-surface-default border-gray-disabled flex h-12 w-72 items-center justify-between rounded border px-4 py-2.5 text-sm hover:bg-gray-100"
        >
          <span className="text-text-disabled">{selected}</span>
          <ChevronDown className="text-gray-disabled h-5 w-5" />
        </button>
      )}

      {/* 컨데이너 */}
      {isOpen && (
        <div
          className="bg-surface-default shadow-box absolute top-0 left-0 z-10 flex w-82 flex-col items-center rounded border py-5"
          style={{
            height: '628px',
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%239747FF' stroke-width='1' stroke-dasharray='10%2c 5'/%3e%3c/svg%3e")`,
            border: 'none',
          }}
        >
          {/* Active Title */}
          <div
            onClick={() => setIsOpen(false)}
            className="border-primary-400 mb-1 flex h-12 w-72 cursor-pointer items-center justify-between rounded border px-4 py-2.5 text-sm font-medium"
          >
            <span className="text-text-main">{selected}</span>
            <ChevronDown className="text-primary-400 h-5 w-5 rotate-180" />
          </div>

          {/* Option List */}
          <ul className="flex flex-col gap-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option)
                  if (option !== '기타(직접입력)') setIsOpen(false)
                }}
                style={{ width: '278px' }}
                className={cn(
                  'flex h-12 cursor-pointer items-center justify-between rounded px-3 py-2 text-sm transition-colors',
                  selected === option
                    ? 'text-primary-default font-semibold'
                    : 'text-text-main',
                  // 호버 시에만 배경색
                  'hover:bg-primary-100'
                )}
              >
                {option}
                {/* Check Icon */}
                {selected === option && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.3334 4L6.00008 11.3333L2.66675 8"
                      stroke="#6201E0"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>

          {/* Custom Input Box */}
          {isCustomSelected && (
            <div className="mt-1 flex w-72 flex-col gap-1">
              <div className="flex flex-col gap-1 rounded border border-gray-500 p-1">
                {/* 텍스트 박스 타이틀 */}
                <div className="text-gray-primary flex h-12 items-center px-4 text-sm font-normal">
                  기타(직접입력)
                </div>
                {/* 텍스트 입력 */}
                <div className="border-gray-disabled flex flex-col rounded border px-3 pt-1 pb-20">
                  <textarea
                    value={customText}
                    onChange={(e) =>
                      setCustomText(e.target.value.slice(0, 100))
                    }
                    placeholder="탈퇴 사유를 입력해주세요."
                    className="text-text-main placeholder:text-text-disabled h-8 w-full resize-none bg-transparent text-sm outline-none"
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
