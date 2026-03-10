import { forwardRef, type ComponentProps } from 'react'
import { cn } from '../lib/utils'

type CommentButtonProps = ComponentProps<'button'>
export const CommentButton = forwardRef<HTMLButtonElement, CommentButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center border transition-all focus-visible:outline-none disabled:pointer-events-none',
          'h-10 w-20 rounded-full text-sm font-medium',
          'bg-primary-100 border-primary-default text-primary-default hover:bg-primary-200 active:bg-primary-active active:text-white',
          'disabled:border-gray-250 disabled:text-text-disabled disabled:bg-gray-200',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

CommentButton.displayName = 'CommentButton'
