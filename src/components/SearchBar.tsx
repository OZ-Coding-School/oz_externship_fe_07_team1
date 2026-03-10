import { Search, XCircle } from 'lucide-react'
import { forwardRef, type ComponentProps, useState } from 'react'
import { cn } from '../lib/utils'

interface SearchBarProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  value?: string
  onValueChange?: (value: string) => void
}

const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div
        ref={ref}
        className={cn(
          // 공통 디자인
          'bg-grey-2 flex h-10 w-112 items-center gap-2.5 rounded-full border px-3 py-2.5 transition-all',

          // 디폴트
          // 포커스
          isFocused ? 'border-primary' : 'border-grey-3',
          className
        )}
        {...props}
      >
        <div className="flex h-5 flex-1 items-center gap-2">
          <Search className="text-grey-4 h-5 w-5" />
          <input
            type="text"
            value={value}
            placeholder="질문 검색"
            // 포커스: 클릭했을 때 상태 변경
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onValueChange?.(e.target.value)}
            // 디폴트
            // 텍스트넣은후
            className="text-grey-6 placeholder:text-grey-4 w-full border-none bg-transparent text-sm font-medium outline-none"
          />
        </div>

        {isFocused && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              onValueChange?.('')
            }}
            className="text-grey-3 hover:text-grey-4 flex items-center justify-center"
          >
            <XCircle className="fill-grey-3 text-grey-1 h-5 w-5" />
          </button>
        )}
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'

export { SearchBar }
