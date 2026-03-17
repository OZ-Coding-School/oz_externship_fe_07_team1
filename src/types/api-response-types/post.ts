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
