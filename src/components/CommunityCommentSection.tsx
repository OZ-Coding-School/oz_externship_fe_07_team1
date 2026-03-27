import { useState } from 'react'
import { useParams } from 'react-router'
import { CommentSort } from '../components/CommunityCommentSort'
import { CommentInput } from '../components/CommentInput'
import { CommentItem } from '../components/CommunityCommentItem'
import { Modal } from '../components/Modal'
import { MessageCircle } from 'lucide-react'
import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from '../hooks/queries/useCommentQueries'

export const CommentSection = () => {
  const { id } = useParams()
  const postId = Number(id)
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)

  // MSW 서버에서 진짜 데이터 땡겨오기
  const { data, isLoading } = useComments(postId)
  const { mutate: createComment } = useCreateComment(postId)
  const { mutate: deleteComment } = useDeleteComment(postId)

  // 데이터가 아직 안 왔으면 로딩 표시
  if (isLoading) {
    return (
      <div className="py-10 text-center text-gray-500">
        댓글을 불러오는 중...
      </div>
    )
  }

  // 서버에서 받은 댓글 목록과 개수
  const rawComments = data?.results || []
  const commentCount = data?.count || 0

  const sortedComments = [...rawComments].sort((a, b) => {
    const timeA = new Date(a.created_at).getTime()
    const timeB = new Date(b.created_at).getTime()

    // 최신순 오래된순 구현
    return sortOrder === 'latest' ? timeB - timeA : timeA - timeB
  })
  const handleDeleteConfirm = () => {
    if (deleteTargetId !== null) {
      deleteComment(deleteTargetId)
      setIsModalOpen(false)
      setDeleteTargetId(null)
    }
  }

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
        {sortedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            authorName={comment.nickname}
            date={new Date(comment.created_at).toLocaleDateString()}
            content={comment.content}
            isMyComment
            onDelete={() => {
              setDeleteTargetId(comment.id)
              setIsModalOpen(true)
            }}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="댓글을 삭제하시겠습니까?"
      />
    </section>
  )
}
