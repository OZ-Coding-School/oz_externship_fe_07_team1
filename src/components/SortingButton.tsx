import { forwardRef, type ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const sortingButtonVariants = cva(
  // 피그마 수치
  'inline-flex items-center justify-center w-[82px] h-[42px] rounded-[4px] px-[20px] text-[12px] font-normal transition-all duration-200 gap-[10px] outline-none',
  {
    variants: {
      status: {
        // Default
        default: 'bg-main-1 text-main-6 hover:bg-grey-2 hover:text-grey-6',
        // Hover
        hover: 'bg-grey-2 text-grey-6',
        // Disabled
        disabled: 'bg-transparent text-grey-4 pointer-events-none',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
)

interface SortingButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof sortingButtonVariants> {
  label: string
}

const SortingButton = forwardRef<HTMLButtonElement, SortingButtonProps>(
  ({ className, status, label, ...props }, ref) => {
    return (
      <button
        className={cn(sortingButtonVariants({ status }), className)}
        ref={ref}
        disabled={status === 'disabled'}
        {...props}
      >
        <span className="truncate text-center">{label}</span>
      </button>
    )
  }
)

SortingButton.displayName = 'SortingButton'

export { SortingButton, sortingButtonVariants }
