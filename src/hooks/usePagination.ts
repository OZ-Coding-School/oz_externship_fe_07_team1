import { useState, useEffect, useRef } from 'react'

export const usePagination = (currentPage: number, totalPages: number) => {
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

  // 페이지 블록 계산
  const currentBlock = Math.ceil(currentPage / maxVisiblePages)
  const startPage = (currentBlock - 1) * maxVisiblePages + 1
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  // 컴포넌트에서 쓸 수 있게 반환
  return {
    containerRef,
    pages,
    isFirstPage,
    isLastPage,
  }
}
