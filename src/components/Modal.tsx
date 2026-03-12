import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  message: string | ReactNode
  children: ReactNode
  variant?: 'delete' | 'alert'
}

export const Modal = ({
  isOpen,
  onClose,
  message,
  children,
  variant = 'delete',
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
        className={cn(
          'bg-surface-default flex flex-col justify-between rounded-xl',
          variant === 'delete' &&
            'h-[165px] w-[428px] p-[24px] shadow-[0px_4px_16px_0px_#00000040]',
          variant === 'alert' &&
            'h-[173px] w-[428px] p-[28px] shadow-[0px_0px_16px_0px_#A0A0A040]'
        )}
      >
        <div className="text-text-main mt-2 text-base leading-[1.4] font-normal tracking-[-0.03em]">
          {message}
        </div>

        {/* 하단 버튼 영역 */}
        <div
          className={cn(
            'flex',
            variant === 'delete' ? 'justify-end gap-2' : 'justify-end'
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  )
}
