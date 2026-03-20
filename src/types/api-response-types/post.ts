export interface PostCategoryItem {
  id: number
  name: string
}

export type GetPostCategoriesResponse = PostCategoryItem[]

export interface CreatePostResponse {
  detail: string
  pk: number
}

export interface CreatePostErrorResponse {
  error_detail: Record<string, string[]> | string
}

export interface GetPostDetailResponse {
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
