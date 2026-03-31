import { useState } from 'react'
import { useParams } from 'react-router'
import { CommentSort } from '../components/CommunityCommentSort'
import { CommentInput } from '../components/CommentInput'
import { CommentItem } from '../components/CommunityCommentItem'
import { Modal } from '../components/Modal'
import { MessageCircle } from 'lucide-react'
import { useUserInfoStore } from '../store/useUserInfoStore'
import {
  useComments,
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from '../hooks/queries/useCommentQueries'
import { useAccessTokenStore } from '../store/useAccessTokenStore'
import { useToastStore } from '../store/useToastStore'

export const CommentSection = () => {
  const { id } = useParams()
  const postId = Number(id)
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)

  const { isValidToken } = useAccessTokenStore()
  const { showToast } = useToastStore()

  const handleBlocked = () => {
    showToast(
      'default',
      '로그인 필요',
      '로그인 한 사용자만 댓글 작성이 가능합니다'
    )
  }

  const { userInfo } = useUserInfoStore()

  const { data, isLoading } = useComments(postId)
  const { mutate: createComment } = useCreateComment(postId)
  const { mutate: deleteComment } = useDeleteComment(postId)
  const { mutate: updateComment } = useUpdateComment(postId)

  if (isLoading) {
    return (
      <div className="py-10 text-center text-gray-500">
        댓글을 불러오는 중...
      </div>
    )
  }

  const rawComments = data?.results || []
  const commentCount = data?.count || 0

  const sortedComments = [...rawComments].sort((a, b) => {
    const timeA = new Date(a.created_at).getTime()
    const timeB = new Date(b.created_at).getTime()
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
      <div className="mb-6">
        <CommentInput
          onSubmit={(content) => {
            if (!isValidToken()) {
              handleBlocked()
              return
            }
            createComment({ content })
          }}
          onClick={() => {
            if (!isValidToken()) {
              handleBlocked()
            }
          }}
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-gray-600" />
          <h3 className="text-xl leading-[110%] font-bold text-gray-900">
            댓글 {commentCount}개
          </h3>
        </div>
        <CommentSort sortOrder={sortOrder} onChange={setSortOrder} />
      </div>

      <div className="flex flex-col">
        {sortedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            authorName={comment.author.nickname}
            date={new Date(comment.created_at).toLocaleDateString()}
            content={comment.content}
            isMyComment={userInfo?.id === comment.author.id}
            onDelete={() => {
              setDeleteTargetId(comment.id)
              setIsModalOpen(true)
            }}
            onEdit={(newContent) => {
              updateComment({ commentId: comment.id, content: newContent })
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
