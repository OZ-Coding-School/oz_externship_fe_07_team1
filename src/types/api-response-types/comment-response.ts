export interface CommentItemResponse {
  id: number
  post?: number
  author: {
    id: number
    nickname: string
    profile_img_url: string
  }
  tagged_users: {
    id: number
    nickname: string
  }[]
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
