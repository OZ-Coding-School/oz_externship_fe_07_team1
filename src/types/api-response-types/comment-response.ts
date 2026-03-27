export interface CommentItemResponse {
  id: number
  post: number
  author: number
  nickname: string
  profile_img_url?: string
  content: string
  created_at: string
  updated_at: string
}

export interface GetCommentsResponse {
  count: number
  next: string | null
  previous: string | null
  results: CommentItemResponse[]
}
