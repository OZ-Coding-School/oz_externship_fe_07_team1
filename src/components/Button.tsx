import { type ComponentProps, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

// 버튼 스타일
const buttonVariants = cva(
  // 기본 스타일
  'inline-flex items-center justify-center rounded-sm text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none text-center cursor-pointer h-fit px-8 py-4',
  {
    variants: {
      // 버튼 종류
      variant: {
        fill: 'bg-primary-default text-white hover:bg-primary-hover active:bg-primary-active disabled:bg-gray-250',
        sub: 'border border-primary-default text-primary-default bg-surface-default hover:bg-primary-100 disabled:border-gray-250 disabled:text-gray-250',
        ghost:
          'bg-transparent text-gray-500 hover:bg-gray-150 active:bg-gray-200',
      },
      size: {
        default: '',
        full: 'w-full',
      },
    },

    // 기본
    defaultVariants: {
      variant: 'fill',
      size: 'default',
    },
  }
)

// 버튼 props
interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

// 버튼 컴포넌트
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        // 스타일 적용
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

// export
export { Button, buttonVariants }
