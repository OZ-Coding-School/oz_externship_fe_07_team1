export interface CreatePostResponse {
  detail: string
  pk: number
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
  created_at: string
  updated_at: string
}
