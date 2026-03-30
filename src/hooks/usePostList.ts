import { useQuery } from '@tanstack/react-query'
import { getPostsAPI, getPostCategoriesAPI } from '../api/postAPI'
import type { PostCategory, PostListResponse } from '../types'

export interface PostListParams {
  categoryId?: number
  sort?: 'latest' | 'oldest' | 'most_views' | 'most_likes' | 'most_comments'
  search?: string
  page?: number
  pageSize?: number
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
