import { cn } from '../lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSlider } from '../hooks/useSlider'

type categoryDataType = { id: number; name: string }

interface CategoryFilterBarProps {
  currentCategory: categoryDataType
  onCategoryClick: (value: categoryDataType) => void
  categoryList: categoryDataType[]
}

function CategoryFilterBar({
  currentCategory,
  onCategoryClick,
  categoryList,
}: CategoryFilterBarProps) {
  const {
    sliderRef,
    trackRef,
    translateX,
    canSlideLeft,
    canSlideRight,
    slideLeft,
    slideRight,
  } = useSlider()

  return (
    <div className="flex gap-1">
      {/* 이전 버튼 */}
      <button
        className="group cursor-pointer"
        onClick={slideLeft}
        disabled={!canSlideLeft}
      >
        <ChevronLeft className="group-hover:text-primary-default group-disabled:text-gray-disabled size-6 text-gray-600" />
      </button>

      {/* 카테고리 탭 */}
      <div ref={sliderRef} className="flex-1 overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-1 transition-transform duration-300"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {categoryList.map((el) => (
            <button
              key={el.id}
              className={cn(
                'hover:bg-primary-100 transition-color shrink-0 cursor-pointer rounded-sm px-5 py-3 text-base font-semibold text-gray-600 duration-200',
                el.id === currentCategory.id &&
                  'text-primary-default bg-primary-100'
              )}
              onClick={() => onCategoryClick(el)}
            >
              {el.name}
            </button>
          ))}
        </div>
      </div>

      {/* 다음 버튼 */}
      <button
        className="group cursor-pointer"
        onClick={slideRight}
        disabled={!canSlideRight}
      >
        <ChevronRight className="group-hover:text-primary-default group-disabled:text-gray-disabled size-6 text-gray-600" />
      </button>
    </div>
  )
}

export default CategoryFilterBar
