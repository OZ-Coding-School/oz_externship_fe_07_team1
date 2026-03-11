import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { ComponentProps } from 'react'

const likeButtonVariants = cva(
  'px-4 py-2.5 flex gap-2.5 border border-solid text-xs',
  {
    variants: {
      status: {
        disabled: 'border-gray-250 text-gray-400 font-normal',
        enabled: 'border-primary-default text-primary-default font-bold',
      },
    },
    defaultVariants: {
      status: 'disabled',
    },
  }
)

interface likeButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof likeButtonVariants> {}

function LikeButton({ className, children, ...props }: likeButtonProps) {
  return (
    <button className={cn(likeButtonVariants, className)} {...props}>
      {/* 아이콘 적용 */}
      {children}
    </button>
  )
}

export default LikeButton
