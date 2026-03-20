import Dropdown from '../Dropdown'

interface EditorHeaderProps {
  headerTitle?: string
  title: string
  onChangeTitle: (value: string) => void
  onChangeCategoryId: (value: number) => void
  selectedCategoryId?: number | null
  categories: {
    id: number
    name: string
  }[]
}

export default function EditorHeader({
  headerTitle = '커뮤니티 게시글 작성',
  title,
  onChangeTitle,
  onChangeCategoryId,
  selectedCategoryId,
  categories,
}: EditorHeaderProps) {
  return (
    // 헤더
    <div className="flex w-236 flex-col">
      {/* 제목 */}
      <div className="mb-4 flex items-center">
        <h1 className="text-gray-primary text-8 leading-11 font-bold tracking-tighter">
          {headerTitle}
        </h1>
      </div>

      {/* 구분선 */}
      <div className="bg-gray-250 mb-10 h-px w-full" />

      {/* 입력 박스 */}
      <div className="border-gray-250 bg-surface-default rounded-5 flex h-50 w-full flex-col justify-center gap-5 border px-10">
        <div className="flex w-full flex-col gap-5">
          {/* 카테고리 */}
          <div className="flex h-10 w-full items-center">
            <Dropdown
              placeholder="카테고리 선택"
              options={categories.map((c) => c.name)}
              selected={
                categories.find((c) => c.id === selectedCategoryId)?.name
              }
              onSelect={(value) => {
                const selected = categories.find((c) => c.name === value)
                if (selected) {
                  onChangeCategoryId(selected.id)
                }
              }}
            />
          </div>

          {/* 제목 입력 */}
          <div className="bg-primary-100 flex h-15 items-center rounded px-4">
            <input
              type="text"
              value={title}
              onChange={(event) => onChangeTitle(event.target.value)}
              placeholder="제목을 입력해 주세요"
              className="text-gray-primary w-full bg-transparent text-lg leading-6 font-normal outline-none placeholder:text-lg placeholder:leading-6 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
