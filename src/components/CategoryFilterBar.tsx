import { cn } from '../lib/utils'

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
  const handleButtonClick = (value: categoryDataType) => {
    onCategoryClick(value)
  }

  return (
    <div className="flex gap-1">
      {categoryList.map((el) => (
        <button
          key={el.id}
          className={cn(
            'hover:bg-primary-100 cursor-pointer rounded-sm p-5 text-base font-semibold text-gray-600 transition-all duration-200',
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
