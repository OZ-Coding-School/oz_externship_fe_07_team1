import upDownIcon from '../assets/images/up-down-icon.svg'

interface CommentSortProps {
  sortOrder: 'latest' | 'oldest'
  onChange: (order: 'latest' | 'oldest') => void
}

export const CommentSort = ({ sortOrder, onChange }: CommentSortProps) => {
  return (
    <button
      onClick={() => onChange(sortOrder === 'latest' ? 'oldest' : 'latest')}
      className="flex cursor-pointer items-center gap-1 transition-colors hover:text-gray-800"
    >
      <span className="text-base font-normal text-gray-600">
        {sortOrder === 'latest' ? '최신순' : '오래된 순'}
      </span>
      <img src={upDownIcon} alt="정렬 아이콘" className="h-4 w-4" />
    </button>
  )
}
