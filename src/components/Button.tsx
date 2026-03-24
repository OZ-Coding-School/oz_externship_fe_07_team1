import { type ComponentProps, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-2 text-14 font-medium transition focus-visible:outline-none disabled:pointer-events-none text-center cursor-pointer px-8 py-4',
  {
    variants: {
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
    defaultVariants: {
      variant: 'fill',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
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

export { Button, buttonVariants }
