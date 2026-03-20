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

          // 레이아웃
          'h-10 w-20 gap-2.5 rounded-full',
          // 등록 글씨체
          'text-center text-base leading-snug font-semibold tracking-tight',
          // 활성화 상태 색상
          'border-primary-default bg-primary-100 text-primary-default hover:bg-primary-200 active:bg-primary-active active:text-white',
          // 비활성화 상태 색상
          'disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-600',

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
