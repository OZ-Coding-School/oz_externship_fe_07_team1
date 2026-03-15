import { usePagination } from '../hooks/usePagination'
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
  const { containerRef, pages, isFirstPage, isLastPage } = usePagination(
    currentPage,
    totalPages
  )
  return (
    <nav
      ref={containerRef}
      className="mx-auto flex h-8 w-full max-w-150 items-center justify-center gap-2 overflow-hidden"
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
