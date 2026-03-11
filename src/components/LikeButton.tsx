import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { ComponentProps } from 'react'
import { ThumbsUp } from 'lucide-react'

const likeButtonVariants = cva(
  'px-4 py-2.5 flex gap-1 border border-solid text-xs rounded-full items-center cursor-pointer',
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
    VariantProps<typeof likeButtonVariants> {
  likeCount?: number
}

function LikeButton({
  status = 'disabled',
  likeCount = 0,
  className,
  ...props
}: likeButtonProps) {
  return (
    <button
      className={cn(likeButtonVariants({ status }), className)}
      {...props}
    >
      <ThumbsUp
        className={cn('size-4.5', status === 'disabled' && 'text-gray-500')}
      />{' '}
      {likeCount}
    </button>
  )
}

export default LikeButton
