import { instance } from './instance'
import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostCategoriesResponse,
  UpdatePostRequest,
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

// 게시글 상세 조회
async function getPostDetailAPI(postId: string) {
  const response = await instance.get(`/posts/${postId}`)
  return response.data
}

// 게시글 수정
async function updatePostAPI(postId: string, params: UpdatePostRequest) {
  const response = await instance.put(`/posts/${postId}`, params)
  return response.data
}

export { getPostCategoriesAPI, createPostAPI, getPostDetailAPI, updatePostAPI }
