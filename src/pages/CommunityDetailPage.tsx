import { useState } from 'react'
import ShareButton from '../components/ShareButton'
import LikeButton from '../components/LikeButton'
import { CommentSection } from '../components/CommunityCommentSection'
import { Modal } from '../components/Modal'

export default function CommunityDetailPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-10">
      {/* 게시글 상세 영역 */}
      <header className="mb-6 border-b border-gray-200 pb-6">
        {/* 카테고리 */}
        <div className="text-primary-default mb-2 text-sm font-semibold">
          구인/협업
        </div>

        {/* 제목 & 프로필 */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            러닝 메이트 함께해요.
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
              {/* 이미지자리 */}
            </div>
            <span className="text-[text-gray-600 text-base text-sm leading-[140%] font-normal tracking-[-3%]">
              김태산
            </span>
          </div>
        </div>

        {/* 조회수 / 좋아요 / 시간  */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>조회수 60</span>
          <span>·</span>
          <span>좋아요 2</span>
          <span>·</span>
          <span>15 시간 전</span>
        </div>
      </header>

      {/* 본문 */}
      <main className="min-h-[200px] pb-10 text-base leading-[140%] tracking-[-3%] text-gray-900">
        <p className="mb-6">
          <a
            href="https://www.codeit.kr/costudy/join/684e26b75155062e46211e77"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-default underline"
          >
            https://www.codeit.kr/costudy/join/684e26b75155062e46211e77
          </a>
        </p>
        <p className="font-normal">함께 열공해요</p>
      </main>

      {/* 좋아요 / 공유 버튼 */}
      <div className="mb-8 flex justify-end gap-2 border-b border-gray-200 pb-8">
        <LikeButton
          status={isLiked ? 'enabled' : 'disabled'}
          likeCount={2}
          onClick={() => setIsLiked(!isLiked)}
        />
        <ShareButton />
      </div>

      {/* 댓글 영역 (댓글 입력창 + 댓글 리스트) */}
      <CommentSection />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        message="게시글을 정말로 삭제하시겠습니까?"
      />
    </div>
  )
}
