export interface CreatePostResponse {
  detail: string
  id: number
}

export interface CreatePostErrorResponse {
  error_detail: Record<string, string[]> | string
}

export interface PostDetailResponse {
  id: number
  title: string
  author: {
    id: number
    nickname: string
    profile_img_url: string | null
  }
  category_id: number
  category_name: string
  content: string
  view_count: number
  like_count: number
  is_liked: boolean
  created_at: string
  updated_at: string
}

export interface PostListResponse {
  count: number
  next: string | null
  previous: string | null
  result: PostListType[]
}

export type PostListType = {
  id: number
  author: {
    id: number
    nickname: string
    profile_img_url: string
  }
  title: string
  thumbnail_img_url: string
  content_preview: string
  comment_count: number
  view_count: number
  like_count: number
  created_at: string
  updated_at: string
  category_name: string
}
