import { instance } from './instance'
import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostCategoriesResponse,
} from '../types'

async function getPostCategoriesAPI() {
  const response = await instance.get<GetPostCategoriesResponse>(
    '/v1/posts/categories'
  )
  return response.data
}

async function createPostAPI(params: CreatePostRequest) {
  const response = await instance.post<CreatePostResponse>('/v1/posts', params)
  return response.data
}

export { getPostCategoriesAPI, createPostAPI }
