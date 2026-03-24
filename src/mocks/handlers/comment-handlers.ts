import { http, HttpResponse } from 'msw'
import { mockCommentsData } from '../data/comment-data'
import { MSW_BASE_URL } from '../../constants/baseUrl'

// 수정 가능한 전역 변수로 초기 데이터를 복사
let currentComments = [...mockCommentsData.results]

export const commentHandlers = [
  http.get(`${MSW_BASE_URL}/posts/:postId/comments`, () => {
    return HttpResponse.json(
      {
        ...mockCommentsData,
        count: currentComments.length, // 개수 최신화
        results: currentComments, // 배열 최신화
      },
      { status: 200 }
    )
  }),

  http.post(`${MSW_BASE_URL}/posts/:postId/comments`, async ({ request }) => {
    const body: any = await request.json()

    // 화면에 띄워줄 임시 새 댓글 객체 생성
    const newComment: any = {
      id: Date.now(), // 고유 아이디 대충 생성
      content: body.content, // 입력한 내용
      author: { nickname: '나(테스트)' }, // 임시 작성자
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tagged_users: [],
    }

    // 배열의 맨 앞에 새 댓글 추가
    currentComments = [newComment, ...currentComments]

    return HttpResponse.json(
      { detail: '댓글이 등록되었습니다.', comment: newComment },
      { status: 201 }
    )
  }),

  // 배열에서 해당 아이디를 찾아 지움
  http.delete(
    `${MSW_BASE_URL}/posts/:postId/comments/:commentId`,
    ({ params }) => {
      const targetId = Number(params.commentId)

      // 삭제 처리
      currentComments = currentComments.filter(
        (comment) => comment.id !== targetId
      )

      return HttpResponse.json(
        { detail: '댓글이 삭제되었습니다.' },
        { status: 200 }
      )
    }
  ),
]
