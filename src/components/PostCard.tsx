import { ThumbsUp } from 'lucide-react'
import { postCardData } from '../mocks/data/postCardData'
import { formatCreatedTime } from '../utils/time'

function PostCard({
  category = postCardData.categoryName,
  title = postCardData.title,
  contentPreview = postCardData.contentPreview,
  likeCount = postCardData.likeCount,
  viewCount = postCardData.viewCount,
  commentCount = postCardData.commentCount,
  authorName = postCardData.author.nickname,
  authorProfileImg = postCardData.author.profileImgUrl,
  createdAt = postCardData.createdAt,
}) {
  const dateString = formatCreatedTime(createdAt)

  return (
    <div className="hover:bg-primary-50 flex h-56 w-full cursor-pointer gap-10 rounded-xl p-6 transition-all duration-200">
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-3">
          {/* 카테고리 */}
          <span className="text-xs text-gray-600">{category}</span>

          {/* 제목 */}
          <h3 className="truncate text-lg font-semibold text-black">{title}</h3>

          {/* 내용 (한 줄) */}
          <p className="truncate text-sm text-gray-400">{contentPreview}</p>
        </div>

        <div className="flex w-full justify-between">
          {/* 좋아요 / 댓글 / 조회 수 */}
          <div className="flex gap-3">
            <div className="flex items-center gap-1 text-gray-500">
              <ThumbsUp className="size-5" />
              <span className="text-xs">좋아요 {likeCount}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-xs">댓글 {commentCount}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-xs">조회수 {viewCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 프로필 사진 / 이름 */}
            <div className="flex items-center gap-1">
              <img
                src={authorProfileImg}
                alt="author-profile-image"
                className="size-6 rounded-full object-cover"
              />
              <span className="text-xs text-gray-600">{authorName}</span>
            </div>

            {/* 작성 시기 */}
            <span className="text-xs text-gray-400">{dateString}</span>
          </div>
        </div>
      </div>

      {/* 게시글 이미지 */}
      <img
        src="https://picsum.photos/600/400"
        alt="post-image"
        className="rounded-lg object-cover"
      />
    </div>
  )
}

export default PostCard
