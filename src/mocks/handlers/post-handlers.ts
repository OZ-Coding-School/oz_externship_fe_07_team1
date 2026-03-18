import { http, HttpResponse } from 'msw'
import { categoryData } from '../data/categoryData'
import type { CreatePostRequest, CreatePostResponse } from '../../types'

let postPk = 1

export const postHandlers = [
  http.get('/api/v1/posts/categories', () => {
    return HttpResponse.json(categoryData, { status: 200 })
  }),

  http.post('/api/v1/posts', async ({ request }) => {
    const body = (await request.json()) as CreatePostRequest

    const errors: Record<string, string[]> = {}

    if (!body.title) {
      errors.title = ['이 필드는 필수 항목입니다.']
    }

    if (!body.content) {
      errors.content = ['이 필드는 필수 항목입니다.']
    }

    if (!body.category_id) {
      errors.category_id = ['이 필드는 필수 항목입니다.']
    }

    if (Object.keys(errors).length > 0) {
      return HttpResponse.json(
        {
          error_detail: errors,
        },
        { status: 400 }
      )
    }

    const response: CreatePostResponse = {
      detail: '게시글이 성공적으로 등록되었습니다.',
      pk: postPk++,
    }

    return HttpResponse.json(response, { status: 201 })
  }),
]
