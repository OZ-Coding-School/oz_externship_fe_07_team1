export interface PostCategory {
  id: number
  name: string
}

export interface CreatePostRequest {
  title: string
  content: string
  category_id: number
}

export interface UpdatePostRequest {
  title: string
  content: string
  category_id: number
}

export interface PostDetailResponse {
  id: number
  title: string
  content: string
  name: string
  category_id: number
  created_at: string
  updated_at: string
}
