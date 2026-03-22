import { ThumbsUp, MessageCircle, Eye } from 'lucide-react'

export interface PostCardProps {
  id: string
  author: {
    id: string
    nickname: string
    profile_img_url: string
  }
  title: string
  thumbnail_img_url: string | null
  content_preview: string
  comment_count: number
  view_count: number
  like_count: number
  created_at: string
  category_id: number
}

interface Props {
  post: PostCardProps
  onClick: () => void
}

function PostCard({ post, onClick }: Props) {
  const getTimeAgo = (createdAt: string) => {
    const now = new Date()
    const postTime = new Date(createdAt)
    const diffMs = now.getTime() - postTime.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return '방금 전'
    if (diffMins < 60) return `${diffMins}분 전`
    if (diffHours < 24) return `${diffHours}시간 전`
    if (diffDays < 7) return `${diffDays}일 전`
    return postTime.toLocaleDateString('ko-KR')
  }

  return (
    <div
      onClick={onClick}
      className="border-gray-250 flex h-52 w-full cursor-pointer gap-6 border-b py-8 transition hover:bg-gray-100"
    >
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-3">
          <span className="text-12 text-text-sub">카테고리</span>

          <h3 className="text-16 text-text-main line-clamp-1 font-semibold">
            {post.title}
          </h3>

          <p className="text-14 text-text-light line-clamp-1">
            {post.content_preview}
          </p>
        </div>

        <div className="flex w-full justify-between">
          <div className="flex gap-4">
            <div className="text-text-light flex items-center gap-1">
              <ThumbsUp className="size-4" />
              <span className="text-12">{post.like_count}</span>
            </div>
            <div className="text-text-light flex items-center gap-1">
              <MessageCircle className="size-4" />
              <span className="text-12">{post.comment_count}</span>
            </div>
            <div className="text-text-light flex items-center gap-1">
              <Eye className="size-4" />
              <span className="text-12">{post.view_count}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {post.author.profile_img_url ? (
                <img
                  src={post.author.profile_img_url}
                  alt="author-profile-image"
                  className="size-6 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-6 items-center justify-center rounded-full bg-gray-200">
                  👤
                </div>
              )}
              <span className="text-12 text-text-sub">
                {post.author.nickname}
              </span>
            </div>

            <span className="text-12 text-text-light">
              {getTimeAgo(post.created_at)}
            </span>
          </div>
        </div>
      </div>

      {post.thumbnail_img_url && (
        <img
          src={post.thumbnail_img_url}
          alt="post-image"
          className="rounded-4 h-40 w-40 object-cover"
        />
      )}
    </div>
  )
}

export default PostCard
