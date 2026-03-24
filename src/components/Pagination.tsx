import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { usePagination } from '../hooks/usePagination'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { containerRef, pages } = usePagination(currentPage, totalPages)

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="mt-12 flex items-center justify-center gap-2"
    >
      {/* << */}
      <button
        onClick={() => onPageChange(1)}
        className="flex h-10 w-10 items-center justify-center"
      >
        <ChevronsLeft className="size-5" />
      </button>

      {/* < */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="flex h-10 w-10 items-center justify-center"
      >
        <ChevronLeft className="size-5" />
      </button>

      {/* 페이지 */}
      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`text-14 flex h-10 w-10 items-center justify-center rounded-md ${
              page === currentPage
                ? 'bg-primary-default text-white'
                : 'text-text-sub'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* > */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="flex h-10 w-10 items-center justify-center"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* >> */}
      <button
        onClick={() => onPageChange(totalPages)}
        className="flex h-10 w-10 items-center justify-center"
      >
        <ChevronsRight className="size-5" />
      </button>
    </div>
  )
}

export default Pagination
