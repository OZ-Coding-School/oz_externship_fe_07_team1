import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import ShareButton from '../components/ShareButton'
import LikeButton from '../components/LikeButton'
import { CommentSection } from '../components/CommunityCommentSection'
import { Modal } from '../components/Modal'
import { MiniPostActionButton } from '../components/MiniPostActionButton'
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
  const navigate = useNavigate() // 페이지 이동용
  const myUserId = 2 // 내 유저 ID (작성자 확인용 임시 데이터) 1로 하면 안보이고 2로해야 보임
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  //msw 요청
  const { data: post, isLoading } = usePostDetail(Number(id))
  // 로딩 중이거나 데이터 없을 때 화면
  if (isLoading) return <div className="py-20 text-center">불러오는 중...</div>
  if (!post)
    return <div className="py-20 text-center">게시글을 찾을 수 없습니다.</div>

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-10">
      {/* 게시글 상세 영역 */}
      <header className="mb-6 border-b border-gray-200">
        {/* 카테고리 연동 */}
        <div className="text-primary-default mb-2 text-sm font-semibold">
          {post.category?.name || '카테고리'}
        </div>
        {/* 제목 & 프로필 연동 (오른쪽 정렬) */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex shrink-0 items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
              {/* 프로필 이미지 ... */}
              {post.author.profile_img_url && (
                <img
                  src={post.author.profile_img_url}
                  alt="프로필"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <span className="text-base leading-[140%] font-semibold tracking-[-3%] text-gray-600">
              {post.author.nickname}
            </span>
          </div>
        </div>

        {/* 조회수 / 좋아요 연동 & 수정/삭제 버튼 */}
        <div className="mb-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>조회수 {post.view_count}</span>
            <span>·</span>
            <span>좋아요 {post.like_count}</span>
            <span>·</span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>

          {post.author.id === myUserId && (
            <div className="flex items-center">
              <MiniPostActionButton
                type="edit"
                onClick={() => alert('수정 페이지 이동 (구현 예정)')}
              />
              <div className="mx-0.5 h-6 w-[1px] bg-gray-300" />
              <MiniPostActionButton
                type="delete"
                onClick={() => setIsDeleteModalOpen(true)}
              />
            </div>
          )}
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
        onConfirm={() => {
          // 진짜 삭제 진행 후 목록 이동
          console.log(`${id}번 게시글 삭제 요청!`)
          setIsDeleteModalOpen(false)
          alert('게시글이 삭제되었습니다.')
          navigate('/posts') // 커뮤니티 목록으로 이동
        }}
        confirmText="삭제"
        variant="delete"
        message={
          <div className="text-left text-base leading-[140%] font-normal tracking-[-3%] text-gray-700">
            삭제된 내용은 복구할 수 없습니다.
            <br />
            게시글을 정말로 삭제하시겠습니까?
          </div>
        }
      />
    </div>
  )
}
