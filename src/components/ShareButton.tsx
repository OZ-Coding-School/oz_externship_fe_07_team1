import { cn } from '../lib/utils'
import type { ComponentProps } from 'react'
import { Link } from 'lucide-react'

type shareButtonProps = ComponentProps<'button'>

function ShareButton({ className, ...props }: shareButtonProps) {
  return (
    <button
      className={cn(
        'border-gray-250 flex cursor-pointer items-center gap-1 rounded-full border border-solid px-3 py-2.5 text-xs font-normal text-gray-500 transition-all duration-200 hover:bg-gray-200',
        className
      )}
      {...props}
    >
      <Link className={cn('size-4.5')} /> 공유하기
    </button>
  )
}

export default ShareButton
