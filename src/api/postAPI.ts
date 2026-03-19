import { instance } from './instance'
import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostCategoriesResponse,
  UpdatePostRequest,
  GetPostDetailResponse,
} from '../types'

// 카테고리 목록 조회
async function getPostCategoriesAPI() {
  const response =
    await instance.get<GetPostCategoriesResponse>('/posts/categories')
  return response.data
}

// 게시글 생성
async function createPostAPI(params: CreatePostRequest) {
  const response = await instance.post<CreatePostResponse>('/posts', params)
  return response.data
}

// 게시글 수정
async function updatePostAPI(postId: string, params: UpdatePostRequest) {
  const response = await instance.put(`/posts/${postId}`, params)
  return response.data
}

async function getPostDetailAPI(postId: number) {
  const response = await instance.get<GetPostDetailResponse>(`/posts/${postId}`)
  return response.data
}

async function likePostAPI(postId: number) {
  const response = await instance.post(`/posts/${postId}/like`)
  return response.data
}

async function unlikePostAPI(postId: number) {
  const response = await instance.delete(`/posts/${postId}/like`)
  return response.data
}

export {
  getPostCategoriesAPI,
  createPostAPI,
  updatePostAPI,
  getPostDetailAPI,
  likePostAPI,
  unlikePostAPI,
}
