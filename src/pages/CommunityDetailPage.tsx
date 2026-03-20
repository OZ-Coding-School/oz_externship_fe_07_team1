import { useState } from 'react'
import { useParams } from 'react-router'
import ShareButton from '../components/ShareButton'
import LikeButton from '../components/LikeButton'
import { CommentSection } from '../components/CommunityCommentSection'
import { Modal } from '../components/Modal'
import { usePostDetail } from '../hooks/queries/usePostDetailQueries'

// URL만 골라내서 <a> 태그로 바꿔주는 함수 추가
const renderContentWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g // 인터넷 주소 찾는 공식

  return text.split(urlRegex).map((part, index) => {
    // 만약 잘라낸 조각이 인터넷 주소라면 링크로 만들기
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-default underline"
        >
          {part}
        </a>
      )
    }
    // 주소가 아니면 그냥 일반 글씨로 냅두기
    return part
  })
}

export default function CommunityDetailPage() {
  const { id } = useParams() // 주소창에서 /posts/1 이면 1을 가져옴
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // 🚀 msw 요청
  const { data: post, isLoading } = usePostDetail(Number(id))

  // 로딩 중이거나 데이터 없을 때 화면
  if (isLoading) return <div className="py-20 text-center">불러오는 중...</div>
  if (!post)
    return <div className="py-20 text-center">게시글을 찾을 수 없습니다.</div>

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-10">
      {/* 게시글 상세 영역 */}
      <header className="mb-6 border-b border-gray-200 pb-6">
        {/* 카테고리 연동 */}
        <div className="text-primary-default mb-2 text-sm font-semibold">
          {post.category.name}
        </div>

        {/* 제목 & 프로필 연동 */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
              {/* 프로필 이미지 있으면 보여주기 */}
              {post.author.profile_img_url && (
                <img
                  src={post.author.profile_img_url}
                  alt="프로필"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <span className="text-[text-gray-600 text-base text-sm leading-[140%] font-normal tracking-[-3%]">
              {post.author.nickname}
            </span>
          </div>
        </div>

        {/* 조회수 / 좋아요 연동 */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>조회수 {post.view_count}</span>
          <span>·</span>
          <span>좋아요 {post.like_count}</span>
          <span>·</span>
          {/* 시간은 서버에서 준 날짜로 표시되게 처리 */}
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </header>

      {/* 본문 연동 */}
      <main className="min-h-[200px] pb-10 text-base leading-[140%] tracking-[-3%] whitespace-pre-wrap text-gray-900">
        {renderContentWithLinks(post.content)}
      </main>

      {/* 좋아요 / 공유 버튼 */}
      <div className="mb-8 flex justify-end gap-2 border-b border-gray-200 pb-8">
        <LikeButton
          status={isLiked ? 'enabled' : 'disabled'}
          likeCount={post.like_count} // 좋아요 수 데이터에서 가져오기
          onClick={() => setIsLiked(!isLiked)}
        />
        <ShareButton />
      </div>

      {/* 댓글 영역 */}
      <CommentSection />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        message="게시글을 정말로 삭제하시겠습니까?"
      />
    </div>
  )
}
