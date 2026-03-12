import { ThumbsUp } from 'lucide-react'

function PostCard() {
  return (
    <div>
      {/* 카테고리 */}
      <span className="text-xs text-gray-600">구인/협업</span>

      {/* 제목 */}
      <h3 className="truncate text-lg font-semibold text-black">
        데이터 분석 프로젝트 구합니다!
      </h3>

      {/* 내용 (한 줄) */}
      <p className="truncate text-sm text-gray-400">
        저는 완전 기초인데 혹시 같이 프로젝트 만드실분 계신가요?!
      </p>

      <div>
        {/* 좋아요 / 댓글 / 조회 수 */}
        <div>
          <div className="flex items-center gap-1 text-gray-500">
            <ThumbsUp className="size-5" />
            <span>좋아요 156</span>
          </div>
          <div className="flex items-center gap-1">
            <span>댓글 6</span>
          </div>
          <div className="flex items-center gap-1">
            <span>조회수 60</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 프로필 사진 / 이름 */}
          <div className="flex items-center gap-1">
            <img
              src=""
              alt="조조야-profile-image"
              className="size-6 rounded-full"
            />
            <span className="text-xs text-gray-600">조조야</span>
          </div>

          {/* 작성 시기 */}
          <span className="text-xs text-gray-400">1시간 전</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard
