import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

interface Category {
  id: number
  name: string
}

interface CategoryTabsProps {
  categories: Category[]
  selectedCategoryId: number
  onSelectCategory: (categoryId: number) => void
}

function CategoryTabs({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -200 : 200,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => handleScroll('left')}>
        <ChevronLeft className="size-5 text-gray-800" />
      </button>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-1 overflow-x-auto"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`text-16 flex h-11 items-center px-5 font-semibold whitespace-nowrap ${
              selectedCategoryId === cat.id
                ? 'text-primary-default'
                : 'text-text-sub'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <button onClick={() => handleScroll('right')}>
        <ChevronRight className="size-5 text-gray-800" />
      </button>
    </div>
  )
}

export default CategoryTabs
