import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cva } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { Button } from './Button'

const modalVariants = cva(
  'bg-surface-default flex flex-col justify-between rounded-xl',
  {
    variants: {
      variant: {
        delete: 'h-[195px] w-107 p-7 shadow-[var(--shadow-modal-delete)]',
        alert: 'h-[173px] w-107 p-7 shadow-[var(--shadow-modal)]',
      },
    },
    defaultVariants: {
      variant: 'delete',
    },
  }
)

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  message: ReactNode
  variant?: 'delete' | 'alert'
  confirmText?: string
}

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  variant = 'delete',
  confirmText = '확인',
}: ModalProps) => {
  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(modalVariants({ variant }))}
      >
        <div className="text-text-main text-base leading-[1.4] font-normal tracking-[-0.03em]">
          {message}
        </div>
        {/* 하단 버튼 영역 */}
        <div
          className={cn(
            'flex',
            'flex justify-end',
            variant === 'delete' && 'gap-2'
          )}
        >
          {variant === 'delete' && (
            <Button
              variant="ghost"
              onClick={onClose}
              className="bg-primary-100 text-primary-default hover:bg-primary-200 h-auto rounded-full px-6 py-2.5"
            >
              취소
            </Button>
          )}
          <Button
            variant="fill"
            onClick={onConfirm}
            className={cn(
              'h-auto rounded-full py-2.5',
              variant === 'delete' ? 'px-6' : 'px-8'
            )}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  )
}
