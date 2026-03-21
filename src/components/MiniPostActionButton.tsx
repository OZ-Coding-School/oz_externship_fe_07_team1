import { cn } from '../lib/utils'

interface MiniPostActionButtonProps {
  type: 'edit' | 'delete'
  onClick?: () => void
}

export const MiniPostActionButton = ({
  type,
  onClick,
}: MiniPostActionButtonProps) => {
  const isEdit = type === 'edit'
  const text = isEdit ? '수정' : '삭제'
  const commonClasses = cn(
    'flex items-center justify-center transition-colors duration-200',
    'w-12 h-10 rounded',
    'whitespace-nowrap', // 줄바꿈 금지
    'text-base leading-[140%] tracking-[-3%]',
    'font-normal'
  )

  const variantClasses = isEdit
    ? cn('text-primary-default', 'hover:bg-primary-100 hover:font-semibold')
    : cn(
        'text-gray-500',
        'hover:bg-gray-100 hover:text-gray-700 hover:font-semibold'
      )

  return (
    <button onClick={onClick} className={cn(commonClasses, variantClasses)}>
      {text}
    </button>
  )
}
