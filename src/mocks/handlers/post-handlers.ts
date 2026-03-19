import { http, HttpResponse } from 'msw'
import { categoryData } from '../data/categoryData'
import type { CreatePostRequest, CreatePostResponse } from '../../types'

let postPk = 1

const mockPosts: {
  pk: number
  title: string
  content: string
  category_id: number
}[] = []

const BASE_URL = 'https://api.ozcodingschool.site/api/v1'

export const postHandlers = [
  http.get(`${BASE_URL}/posts/categories`, () => {
    return HttpResponse.json(categoryData, { status: 200 })
  }),

  http.post(`${BASE_URL}/posts`, async ({ request }) => {
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

    const newPost = {
      pk: postPk,
      title: body.title,
      content: body.content,
      category_id: body.category_id,
    }

    mockPosts.push(newPost)

    const response: CreatePostResponse = {
      detail: '게시글이 성공적으로 등록되었습니다.',
      pk: postPk++,
    }

    return HttpResponse.json(response, { status: 201 })
  }),

  http.get(`${BASE_URL}/posts/:postId`, ({ params }) => {
    const postId = Number(params.postId)
    const post = mockPosts.find((item) => item.pk === postId)

    if (!post) {
      return HttpResponse.json(
        {
          error_detail: '게시글을 찾을 수 없습니다.',
        },
        { status: 404 }
      )
    }

    const category = categoryData.find((item) => item.id === post.category_id)

    return HttpResponse.json(
      {
        id: post.pk,
        title: post.title,
        content: post.content,
        category: {
          id: category?.id ?? post.category_id,
          name: category?.name ?? '',
        },
      },
      { status: 200 }
    )
  }),

  http.put(`${BASE_URL}/posts/:postId`, async ({ params, request }) => {
    const postId = Number(params.postId)
    const body = (await request.json()) as CreatePostRequest

    const postIndex = mockPosts.findIndex((item) => item.pk === postId)

    if (postIndex === -1) {
      return HttpResponse.json(
        {
          error_detail: '해당 게시글을 찾을 수 없습니다.',
        },
        { status: 404 }
      )
    }

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

    mockPosts[postIndex] = {
      pk: postId,
      title: body.title,
      content: body.content,
      category_id: body.category_id,
    }

    return HttpResponse.json(
      {
        id: postId,
        title: body.title,
        content: body.content,
        category_id: body.category_id,
      },
      { status: 200 }
    )
  }),
]
