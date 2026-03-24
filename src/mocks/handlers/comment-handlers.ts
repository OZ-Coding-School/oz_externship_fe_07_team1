import { http, HttpResponse } from 'msw'
import { mockCommentsData } from '../data/comment-data'
import { MSW_BASE_URL } from '../../constants/baseUrl'

export const commentHandlers = [
  // BASE_URL을 붙여서 100% 완벽하게 낚아채도록 함
  http.get(`${MSW_BASE_URL}/posts/:postId/comments`, () => {
    return HttpResponse.json(mockCommentsData, { status: 200 })
  }),

  http.post(`${MSW_BASE_URL}/posts/:postId/comments`, () => {
    return HttpResponse.json(
      { detail: '댓글이 등록되었습니다.' },
      { status: 201 }
    )
  }),

  http.delete(`${MSW_BASE_URL}/posts/:postId/comments/:commentId`, () => {
    return HttpResponse.json(
      { detail: '댓글이 삭제되었습니다.' },
      { status: 200 }
    )
  }),
]
