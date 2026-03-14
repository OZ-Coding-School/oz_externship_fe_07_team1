import { useState, useEffect, useRef } from 'react'
import DoubleLeftIcon from '../assets/images/double-left.svg?react'
import LeftIcon from '../assets/images/left.svg?react'
import RightIcon from '../assets/images/right.svg?react'
import DoubleRightIcon from '../assets/images/double-right.svg?react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(10)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width

        // 화살표 4개(160px) 공간 확보
        const availableWidth = containerWidth - 160

        // 남은 공간을 숫자 버튼 너비(40px)로 나눔
        const calculatedPages = Math.floor(availableWidth / 40)

        // 최대 10개 고정 공간이 모자랄 때만 최소 5개까지 자연스럽게 축소
        const responsivePages = Math.max(5, Math.min(10, calculatedPages))

        setMaxVisiblePages(responsivePages)
      }
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const currentBlock = Math.ceil(currentPage / maxVisiblePages)
  const startPage = (currentBlock - 1) * maxVisiblePages + 1
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <nav
      ref={containerRef}
      className="mx-auto flex h-8 w-full max-w-[600px] items-center justify-center gap-2 overflow-hidden"
    >
      <button
        onClick={() => onPageChange(1)}
        disabled={isFirstPage}
        className="text-text-light hover:text-text-sub flex h-8 w-8 shrink-0 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        <DoubleLeftIcon />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="text-text-light hover:text-text-sub flex h-8 w-8 shrink-0 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        <LeftIcon />
      </button>

      <div className="flex gap-2">
        {pages.map((page) => {
          const isSelected = currentPage === page

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-2.5 text-sm font-medium transition-colors ${
                isSelected
                  ? 'bg-primary-default text-surface-default'
                  : 'bg-surface-default text-text-sub hover:bg-primary-100 hover:text-primary-default active:bg-primary-200 active:text-primary-default'
              } `}
            >
              {page}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="text-text-light hover:text-text-sub flex h-8 w-8 shrink-0 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        <RightIcon />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={isLastPage}
        className="text-text-light hover:text-text-sub flex h-8 w-8 shrink-0 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        <DoubleRightIcon />
      </button>
    </nav>
  )
}
