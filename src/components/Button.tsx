import { forwardRef, type ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  // 공통 스타일
  'inline-flex items-center justify-center transition-all focus-visible:outline-none disabled:pointer-events-none text-center cursor-pointer tracking-tighter leading-tight font-semibold whitespace-nowrap',
  {
    variants: {
      variant: {
        // 메인 버튼
        fill: 'bg-primary-default text-surface-default hover:bg-primary-active active:bg-primary-active disabled:bg-surface-disabled disabled:text-text-disabled',

        // 서브 버튼
        sub: 'bg-primary-100 text-primary-default border border-primary-default hover:bg-primary-200 active:bg-primary-200',

        // 아웃라인 버튼
        outline:
          'border border-primary-default text-primary-default bg-surface-default hover:bg-primary-100 disabled:border-gray-250 disabled:text-gray-250',

        // 배경 없는 버튼
        ghost:
          'bg-transparent text-gray-500 hover:bg-gray-100 active:bg-gray-250',
      },
      size: {
        // 기본 사이즈
        default: 'h-12 w-28 text-base',
        // 고정 사이즈
        fix: 'h-12 w-36 text-base',
        // 중간 사이즈
        medium: 'h-12 w-36 text-base',
        // 전체 너비
        full: 'w-full h-12',
      },
      shape: {
        // 사각형 테두리
        rect: 'rounded-sm',
        // 라운드 테두리
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'fill',
      size: 'default',
      shape: 'round',
    },
  }
)

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, shape }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
