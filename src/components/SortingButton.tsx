import { forwardRef, type ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const sortingButtonVariants = cva(
  // 피그마 수치
  'inline-flex items-center justify-center w-[82px] h-[42px] rounded bg-transparent text-base font-semibold transition-all duration-200 gap-2.5 outline-none tracking-tight leading-relaxed cursor-pointer',
  {
    variants: {
      status: {
        disabled: 'bg-transparent text-grey-600 hover:bg-gray-200',
        enabled: 'bg-primary-100 text-primary-default',
      },
    },
    defaultVariants: {
      status: 'disabled',
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
