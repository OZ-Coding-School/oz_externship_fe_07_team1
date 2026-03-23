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
  author: {
    id: number
    nickname: string
    profile_img_url: string
  }
  category: {
    id: number
    name: string
  }
  content: string
  view_count: number
  like_count: number
  created_at: string
  updated_at: string
}
