import type { CreateCommentRequest, GetCommentsResponse } from '../types'
import { apiInstance } from './apiInstance'

export async function getCommentsAPI(postId: number, page: number = 1) {
  const response = await apiInstance.get<GetCommentsResponse>(
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
  const response = await apiInstance.post(`/posts/${postId}/comments`, data)
  return response.data
}

export async function deleteCommentAPI(postId: number, commentId: number) {
  const response = await apiInstance.delete(
    `/posts/${postId}/comments/${commentId}`
  )
  return response.data
}

export async function updateCommentAPI(
  postId: number,
  commentId: number,
  content: string
) {
  const response = await apiInstance.put(
    `/posts/${postId}/comments/${commentId}`,
    { content }
  )
  return response.data
}
