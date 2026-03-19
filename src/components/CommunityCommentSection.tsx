import { useState } from 'react'
import { CommentSort } from '../components/CommunityCommentSort'
import { CommentInput } from '../components/CommentInput'
import { CommentItem } from '../components/CommunityCommentItem'
import { MessageCircle } from 'lucide-react'
import {
  useComments,
  useCreateComment,
} from '../hooks/queries/useCommentQueries'

// 임시로 postId 1번 게시글이라고 가정하고 렌더링
const TEMP_POST_ID = 1

export const CommentSection = () => {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest')

  // MSW 서버에서 진짜 데이터 땡겨오기
  const { data, isLoading } = useComments(TEMP_POST_ID)
  const { mutate: createComment } = useCreateComment(TEMP_POST_ID)

  // 데이터가 아직 안 왔으면 로딩 표시
  if (isLoading) {
    return (
      <div className="py-10 text-center text-gray-500">
        댓글을 불러오는 중...
      </div>
    )
  }

  // 서버에서 받은 댓글 목록과 개수
  const comments = data?.results || []
  const commentCount = data?.count || 0

  return (
    <section>
      {/*  댓글 입력창 */}
      <div className="mb-6">
        {/* 등록 버튼 누르면 서버로 보냄 */}
        <CommentInput onSubmit={(content) => createComment({ content })} />
      </div>

      {/* 댓글 헤더 및 정렬 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-gray-600" />
          <h3 className="text-xl leading-[110%] font-bold text-gray-900">
            댓글 {commentCount}개
          </h3>
        </div>
        <CommentSort sortOrder={sortOrder} onChange={setSortOrder} />
      </div>

      {/* 3. 댓글 리스트 */}
      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            authorName={comment.author.nickname}
            // 서버에서 온 날짜를 예쁘게 포맷팅
            date={new Date(comment.created_at).toLocaleDateString()}
            content={comment.content}
            isMyComment={false}
            onDelete={() => console.log(comment.id, '번 댓글 삭제')}
          />
        ))}
      </div>
    </section>
  )
}
