import { apiInstance } from './apiInstance'
import type { GetCommentsResponse } from '../types/api-response-types/comment-response'

import type {
  CreatePostRequest,
  CreatePostResponse,
  PostCategory,
  PostDetailResponse,
  UpdatePostRequest,
} from '../types'

// 게시글 목록 조회
async function getPostsAPI(params: {
  page?: number
  page_size?: number
  search?: string
  search_filter?: 'author' | 'title' | 'content' | 'title_or_content'
  category_id?: number
  sort?: 'latest' | 'oldest' | 'most_views' | 'most_likes' | 'most_comments'
}) {
  const response = await apiInstance.get('/posts', {
    params,
  })
  return response.data
}

// 카테고리 목록 조회
async function getPostCategoriesAPI() {
  const response = await apiInstance.get<PostCategory[]>('/posts/categories')
  return response.data || []
}

// 게시글 생성
async function createPostAPI(params: CreatePostRequest) {
  const response = await apiInstance.post<CreatePostResponse>('/posts', params)
  return response.data
}

// 게시글 수정
async function updatePostAPI(postId: string, params: UpdatePostRequest) {
  const response = await apiInstance.put(`/posts/${postId}`, params)
  return response.data
}

// 게시글 상세 조회
async function getPostDetailAPI(postId: number) {
  const response = await apiInstance.get<PostDetailResponse>(`/posts/${postId}`)
  return response.data
}

// 좋아요
async function likePostAPI(postId: number) {
  const response = await apiInstance.post(`/posts/${postId}/like`)
  return response.data
}

// 좋아요 취소
async function unlikePostAPI(postId: number) {
  const response = await apiInstance.delete(`/posts/${postId}/like`)
  return response.data
}

// 게시글 삭제
async function deletePostAPI(postId: number) {
  const response = await apiInstance.delete(`/posts/${postId}`)
  return response.data
}
// 댓글 목록 조회
async function getCommentListAPI(postId: number) {
  const response = await apiInstance.get<GetCommentsResponse>(
    `posts/${postId}/comments`
  )
  return response.data
}

export {
  getPostsAPI,
  getPostCategoriesAPI,
  createPostAPI,
  updatePostAPI,
  getPostDetailAPI,
  likePostAPI,
  unlikePostAPI,
  deletePostAPI,
  getCommentListAPI,
}
