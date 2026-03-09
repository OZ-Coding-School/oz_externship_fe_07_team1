import { forwardRef, type ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const sortingButtonVariants = cva(
  // 피그마 수치
  'inline-flex items-center justify-center w-20 h-10 rounded bg-transparent text-base font-semibold transition-all duration-200 gap-2.5 outline-none tracking-tight leading-relaxed',
  {
    variants: {
      status: {
        default: 'bg-primary-light text-primary',

        hover: 'bg-grey-2 text-grey-6',

        disabled: 'bg-transparent text-grey-5 pointer-events-none opacity-100',
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
