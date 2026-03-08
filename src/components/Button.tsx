import { forwardRef, type ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[4px] text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none text-center cursor-pointer',
  {
    variants: {
      variant: {
        fill: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active disabled:bg-grey-2 disabled:text-grey-4',
        outline:
          'border border-primary text-primary bg-white hover:bg-primary-light disabled:border-grey-3 disabled:text-grey-3',
        ghost: 'bg-transparent text-grey-5 hover:bg-grey-2 active:bg-grey-3',
      },
      size: {
        default: 'w-[155px] h-[48px]',
        sm: 'w-[112px] h-[48px]',
        full: 'w-[478px] h-[52px]',
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
