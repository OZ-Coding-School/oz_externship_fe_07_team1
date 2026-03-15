import Dropdown from '../Dropdown'

export default function EditorHeader() {
  return (
    // 헤더
    <div className="flex w-236 flex-col gap-10">
      {/* 제목 */}
      <div className="flex h-11 items-center">
        <h1 className="text-gray-primary text-8 leading-14 font-bold tracking-tighter">
          커뮤니티 게시글 작성
        </h1>
      </div>

      {/* 구분선 */}
      <div className="bg-gray-250 h-px w-full" />

      {/* 입력 박스 */}
      <div className="border-gray-250 bg-surface-default rounded-5 flex h-50 w-full flex-col justify-center gap-5 border px-10">
        <div className="flex w-full flex-col gap-5">
          {/* 카테고리 */}
          <div className="flex h-10 w-full items-center">
            <div className="border-gray-disabled flex h-10 w-full items-center rounded border bg-gray-100">
              <Dropdown placeholder="카테고리 선택" />
            </div>
          </div>

          {/* 제목 입력 */}
          <div className="bg-primary-100 flex h-15 items-center rounded px-4">
            <input
              type="text"
              placeholder="제목을 입력해 주세요"
              className="text-chatbot w-full bg-transparent text-lg font-normal outline-none placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
