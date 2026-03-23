import { useQuery } from '@tanstack/react-query'

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

export interface Category {
  id: number
  name: string
}

export function useCategoryList() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/v1/posts/categories')

      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      return response.json() as Promise<Category[]>
    },
  })
}

export function usePostList(params: PostListParams) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams()

      if (params.categoryId) {
        searchParams.append('category_id', params.categoryId.toString())
      }
      if (params.sort) {
        searchParams.append('sort', params.sort)
      }
      if (params.search) {
        searchParams.append('search', params.search)
      }
      if (params.page) {
        searchParams.append('page', params.page.toString())
      }
      if (params.pageSize) {
        searchParams.append('page_size', params.pageSize.toString())
      }

      const response = await fetch(`/api/v1/posts?${searchParams.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      return response.json() as Promise<PostListResponse>
    },
  })
}
