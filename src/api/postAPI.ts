import { instance } from './instance'
import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostCategoriesResponse,
} from '../types'

async function getPostCategoriesAPI() {
  const response =
    await instance.get<GetPostCategoriesResponse>('/posts/categories')
  return response.data
}

async function createPostAPI(params: CreatePostRequest) {
  const response = await instance.post<CreatePostResponse>('/posts', params)
  return response.data
}

export { getPostCategoriesAPI, createPostAPI }
