import { ThumbsUp } from 'lucide-react'

function PostCard() {
  return (
    <div>
      {/* 카테고리 */}
      <div>구인/협업</div>

      {/* 제목 */}
      <h3>데이터 분석 프로젝트 구합니다!</h3>

      {/* 내용 (한 줄) */}
      <p>저는 완전 기초인데 혹시 같이 프로젝트 만드실분 계신가요?!</p>

      <div>
        {/* 좋아요 / 댓글 / 조회 수 */}
        <div>
          <div>
            <ThumbsUp className="size-5 text-gray-500" />
            <span>좋아요</span>
            <span>156</span>
          </div>
          <div>
            <span>댓글</span>
            <span>6</span>
          </div>
          <div>
            <span>조회수</span>
            <span>60</span>
          </div>
        </div>

        <div>
          {/* 프로필 사진 / 이름 */}
          <div>
            <img src="" alt="" />
            <span>조조야</span>
          </div>

          {/* 작성 시기 */}
          <span>1시간 전</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard
