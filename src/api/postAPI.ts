import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostCategoriesResponse,
} from '../types'

async function getPostCategoriesAPI() {
  const response = await fetch('/api/v1/posts/categories')

  if (!response.ok) {
    throw new Error('카테고리 목록 조회에 실패했습니다.')
  }

  const data: GetPostCategoriesResponse = await response.json()
  return data
}

async function createPostAPI(params: CreatePostRequest) {
  const response = await fetch('/api/v1/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    throw new Error('게시글 작성에 실패했습니다.')
  }

  const data: CreatePostResponse = await response.json()
  return data
}

export { getPostCategoriesAPI, createPostAPI }
