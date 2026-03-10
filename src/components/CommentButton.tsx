import { forwardRef, type ComponentProps } from 'react'
import { cn } from '../lib/utils'

type CommentButtonProps = ComponentProps<'button'>
export const CommentButton = forwardRef<HTMLButtonElement, CommentButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center transition-all focus-visible:outline-none disabled:pointer-events-none',

          'h-9 rounded-full px-6 text-sm font-medium',

          'bg-primary hover:bg-primary-hover active:bg-primary-active text-white',

          'disabled:bg-grey-3 disabled:text-grey-5'
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

CommentButton.displayName = 'CommentButton'
