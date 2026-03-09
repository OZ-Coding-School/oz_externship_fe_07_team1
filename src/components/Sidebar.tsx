import { forwardRef, type ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

// 피그마 치수
const sidebarTabVariants = cva(
  'inline-flex items-center justify-start w-[152px] h-[32px] rounded-[4px] px-[20px] text-[12px] font-normal transition-all duration-200 gap-[10px] outline-none cursor-pointer',
  {
    variants: {
      status: {
        // Default
        default: 'bg-transparent text-grey-5 hover:bg-main-1 hover:text-main-6',

        // Hover
        hover: 'bg-main-1 text-main-6',

        // Active
        active:
          'relative bg-transparent text-main-6 font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-[18px] before:w-[2px] before:bg-main-6',

        // Disabled
        disabled: 'bg-grey-2 text-grey-4 pointer-events-none',
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

const SidebarTab = forwardRef<HTMLButtonElement, SidebarTabProps>(
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
          <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
            {icon}
          </span>
        )}

        {/* 텍스트 */}
        <span className="truncate text-left">{label}</span>
      </button>
    )
  }
)

SidebarTab.displayName = 'SidebarTab'

export { SidebarTab, sidebarTabVariants }
