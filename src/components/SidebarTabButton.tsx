import { forwardRef, type ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

// 피그마 치수
const sidebarTabVariants = cva(
  'relative inline-flex items-center justify-start w-38 h-8 rounded px-5 outline-none border-none appearance-none cursor-pointer shrink-0 transition-all duration-200',
  {
    variants: {
      status: {
        default: 'bg-transparent text-grey-5 font-semibold gap-2.5',

        hover: 'bg-primary-light text-primary font-semibold gap-2.5',

        active:
          'bg-transparent text-primary font-semibold gap-2.5 before:absolute before:left-0 before:top-0 before:h-full before:w-0.75 before:bg-primary',

        disabled:
          'bg-grey-2 text-grey-4 font-normal gap-2.5 pointer-events-none',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
)

interface SidebarTabProps
  extends ComponentProps<'button'>,
    VariantProps<typeof sidebarTabVariants> {
  label: string
  icon?: React.ReactNode
}

const SidebarTabButton = forwardRef<HTMLButtonElement, SidebarTabProps>(
  ({ className, status, label, icon, ...props }, ref) => {
    return (
      <button
        className={cn(sidebarTabVariants({ status }), className)}
        ref={ref}
        disabled={status === 'disabled'}
        {...props}
      >
        {/* 아이콘 */}
        {icon && (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            {icon}
          </span>
        )}

        {/* 텍스트 */}
        <span className="truncate text-left text-lg leading-tight tracking-tighter">
          {label}
        </span>
      </button>
    )
  }
)

SidebarTabButton.displayName = 'SidebarTabButton'

export { SidebarTabButton, sidebarTabVariants }
