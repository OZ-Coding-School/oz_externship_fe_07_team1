import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'

interface DropdownProps {
  options: string[]
  placeholder?: string
  onSelect?: (value: string) => void
  selected?: string
}

export default function Dropdown({
  options,
  placeholder = '해당되는 항목을 선택해 주세요.',
  onSelect,
  selected: selectedProp,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(selectedProp ?? placeholder)

  useEffect(() => {
    setSelected(selectedProp ?? placeholder)
  }, [selectedProp, placeholder])

  return (
    <div className="relative flex w-full flex-col gap-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'border-gray-disabled flex h-10 w-full items-center justify-between rounded border bg-gray-100 px-4 text-sm transition-all outline-none',
          isOpen ? 'text-text-main font-medium' : 'text-text-disabled'
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

      {isOpen && (
        <div className="shadow-box bg-surface-default absolute top-11 z-50 flex w-full flex-col rounded border border-gray-500 py-1">
          <ul className="scrollbar scrollbar-w-2 scrollbar-thumb-gray-disabled scrollbar-track-transparent scrollbar-thumb-rounded-sm flex max-h-60 flex-col gap-2.5 overflow-y-auto p-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option)
                  onSelect?.(option)
                  setIsOpen(false)
                }}
                className={cn(
                  'hover:bg-primary-100 flex h-12 w-full shrink-0 cursor-pointer items-center justify-between rounded-sm px-4 py-2.5 text-sm transition-colors',
                  selected === option
                    ? 'text-primary-default font-semibold'
                    : 'text-text-main'
                )}
              >
                {option}
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
        </div>
      )}
    </div>
  )
}
