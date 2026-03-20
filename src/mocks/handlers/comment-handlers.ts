import { http, HttpResponse } from 'msw'
import { mockCommentsData } from '../data/comment-data'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const commentHandlers = [
  // BASE_URL을 붙여서 100% 완벽하게 낚아채도록 함
  http.get(`${BASE_URL}/posts/:postId/comments`, () => {
    return HttpResponse.json(mockCommentsData, { status: 200 })
  }),

  http.post(`${BASE_URL}/posts/:postId/comments`, () => {
    return HttpResponse.json(
      { detail: '댓글이 등록되었습니다.' },
      { status: 201 }
    )
  }),

  http.delete(`${BASE_URL}/posts/:postId/comments/:commentId`, () => {
    return HttpResponse.json(
      { detail: '댓글이 삭제되었습니다.' },
      { status: 200 }
    )
  }),
]
