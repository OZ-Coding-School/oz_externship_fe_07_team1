import { useState } from 'react'
import { CommentSort } from '../components/CommunityCommentSort'
import { CommentInput } from '../components/CommentInput'
import { CommentItem } from '../components/CommunityCommentItem'
import MessageCircle from '../assets/images/message-circle.svg'

// 테스트용 더미 데이터
const DUMMY_COMMENTS = [
  {
    id: 1,
    authorName: 'jnubugo',
    date: '2025년 6월 13일',
    content: '좋아요',
    isMyComment: false,
  },
  {
    id: 2,
    authorName: 'name2',
    date: '2025년 6월 13일',
    content: '굿굿',
    isMyComment: false,
  },
]

export const CommentSection = () => {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest')

  return (
    <section>
      {/* 1. 댓글 입력창 */}
      <div className="mb-6">
        <CommentInput onSubmit={(content) => console.log('등록:', content)} />
      </div>

      {/* 2. 댓글 헤더 및 정렬 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={MessageCircle} alt="댓글 아이콘" className="h-6 w-6" />
          <h3 className="font-['Roboto'] text-xl leading-[110%] font-bold text-gray-900">
            댓글 {DUMMY_COMMENTS.length}개
          </h3>
        </div>
        <CommentSort sortOrder={sortOrder} onChange={setSortOrder} />
      </div>

      {/* 3. 댓글 리스트 */}
      <div className="flex flex-col">
        {DUMMY_COMMENTS.map((comment) => (
          <CommentItem
            key={comment.id}
            authorName={comment.authorName}
            date={comment.date}
            content={comment.content}
            isMyComment={comment.isMyComment}
            onDelete={() => console.log(comment.id, '번 댓글 삭제')}
          />
        ))}
      </div>
    </section>
  )
}
