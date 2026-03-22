interface SortButtonProps {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

function SortButton({ isActive, onClick, children }: SortButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-4 text-14 flex h-10 items-center justify-center px-4 font-semibold transition ${
        isActive
          ? 'bg-primary-default text-white'
          : 'text-text-sub hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )
}

export default SortButton
