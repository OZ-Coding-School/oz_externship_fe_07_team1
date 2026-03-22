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
          'border-gray-250 flex h-12 w-full items-center gap-2 rounded-full border bg-gray-100 px-4',
          isFocused && 'border-primary-default',
          className
        )}
        {...props}
      >
        <Search className="text-text-light size-5" />

        <input
          type="text"
          value={value}
          placeholder="질문 검색"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onValueChange?.(e.target.value)}
          className="text-14 text-text-main placeholder:text-text-light w-full bg-transparent outline-none"
        />

        {value && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              onValueChange?.('')
            }}
            className="text-text-light flex items-center justify-center"
          >
            <XCircle className="size-5" />
          </button>
        )}
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'

export { SearchBar }
