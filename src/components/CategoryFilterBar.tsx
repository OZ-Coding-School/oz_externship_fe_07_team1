import { useState } from 'react'
import { categoryData } from '../mocks/data/categoryData'
import { cn } from '../lib/utils'

type categoryDataType = { id: number; name: string }

interface CategoryFilterBarProps {
  currentCategory: categoryDataType
  onCategoryClick: (value: categoryDataType) => void
}

function CategoryFilterBar({
  currentCategory,
  onCategoryClick,
}: CategoryFilterBarProps) {
  const [categoryList] = useState(categoryData) // 이후 api 요청으로 받아온 카테고리 데이터를 기본값으로 지정

  const handleButtonClick = (value: categoryDataType) => {
    onCategoryClick(value)
  }

  return (
    <div className="flex gap-1">
      {categoryList.map((el) => (
        <button
          key={el.id}
          className={cn(
            'hover:text-primary-default hover:bg-primary-100 rounded-sm p-5 text-base font-semibold',
            el.id === currentCategory.id &&
              'text-primary-default bg-primary-100'
          )}
          onClick={() => handleButtonClick(el)}
        >
          {el.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilterBar
