import { instance } from './instance'
import type { CreateCommentRequest, GetCommentsResponse } from '../types'

export async function getCommentsAPI(postId: number, page: number = 1) {
  const response = await instance.get<GetCommentsResponse>(
    `/posts/${postId}/comments`,
    {
      params: { page, page_size: 10 },
    }
  )
  return response.data
}

export async function createCommentAPI(
  postId: number,
  data: CreateCommentRequest
) {
  const response = await instance.post(`/posts/${postId}/comments`, data)
  return response.data
}

export async function deleteCommentAPI(postId: number, commentId: number) {
  const response = await instance.delete(
    `/posts/${postId}/comments/${commentId}`
  )
  return response.data
}
