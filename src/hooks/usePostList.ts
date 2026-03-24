import { useQuery } from '@tanstack/react-query'
import { getPostsAPI, getPostCategoriesAPI } from '../api/postAPI'
import type { PostCategory } from '../types'

export interface PostListParams {
  categoryId?: number
  sort?: 'latest' | 'oldest' | 'most_views' | 'most_likes' | 'most_comments'
  search?: string
  page?: number
  pageSize?: number
}

export interface Post {
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
  updated_at: string
  category_id: number
}

export interface PostListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Post[]
}

export function useCategoryList() {
  return useQuery<PostCategory[]>({
    queryKey: ['categories'],
    queryFn: () => getPostCategoriesAPI(),
  })
}

export function usePostList(params: PostListParams) {
  return useQuery<PostListResponse>({
    queryKey: ['posts', params],
    queryFn: () =>
      getPostsAPI({
        page: params.page,
        page_size: params.pageSize,
        search: params.search,
        category_id: params.categoryId,
        sort: params.sort,
      }),
  })
}
