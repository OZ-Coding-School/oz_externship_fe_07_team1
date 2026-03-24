import { http, HttpResponse } from 'msw'
import { postListData } from '../data/postListData'
import { categoryData } from '../data/categoryData'
import type { CreatePostRequest, CreatePostResponse } from '../../types'
import { MSW_BASE_URL } from '../../constants/baseUrl'

let postPk = 2

// 카테고리 목록
export const getPostCategoriesMOCK = http.get(
  `${MSW_BASE_URL}/api/v1/posts/categories`,
  () => {
    return HttpResponse.json(categoryData, { status: 200 })
  }
)

// 게시글 목록 조회
export const getPostListMOCK = http.get('*/api/v1/posts', ({ request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page') || 1)
  const pageSize = Number(url.searchParams.get('page_size') || 10)

  const totalCount = postListData.length
  const startIdx = (page - 1) * pageSize
  const endIdx = startIdx + pageSize

  return HttpResponse.json({
    count: totalCount,
    next: null,
    previous: null,
    results: postListData.slice(startIdx, endIdx).map((post: any) => ({
      id: Number(post.id),
      author: {
        id: Number(post.author.id),
        nickname: post.author.name,
        profile_img_url: post.author.profileImage || '',
      },
      title: post.title,
      thumbnail_img_url: post.imageUrl || null,
      content_preview: post.content.substring(0, 50),
      comment_count: Number(post.comments),
      view_count: Number(post.views),
      like_count: Number(post.likes),
      created_at: post.createdAt,
      updated_at: post.createdAt,
      category_id: Number(post.category.id),
    })),
  })
})

// 게시글 생성
export const createPostMOCK = http.post(
  `${MSW_BASE_URL}/api/v1/posts`,
  async ({ request }) => {
    const body = (await request.json()) as CreatePostRequest
    const errors: Record<string, string[]> = {}

    if (!body.title) errors.title = ['이 필드는 필수 항목입니다.']
    if (!body.content) errors.content = ['이 필드는 필수 항목입니다.']
    if (!body.category_id) errors.category_id = ['이 필드는 필수 항목입니다.']

    if (Object.keys(errors).length > 0) {
      return HttpResponse.json({ error_detail: errors }, { status: 400 })
    }

    const response: CreatePostResponse = {
      detail: '게시글이 성공적으로 등록되었습니다.',
      pk: postPk++,
    }

    return HttpResponse.json(response, { status: 201 })
  }
)

// 게시글 상세 조회
export const getPostDetailMOCK = http.get(
  '*/api/v1/posts/:id',
  ({ params }) => {
    const id = Number(params.id ?? 0)
    const post = postListData.find((p: any) => Number(p.id) === id)

    if (!post) {
      return HttpResponse.json({
        id,
        author: { id: 1, nickname: '임시유저', profile_img_url: '' },
        title: '작성된 게시글',
        content: '작성 직후 이동한 게시글입니다.',
        thumbnail_img_url: null,
        comment_count: 0,
        view_count: 0,
        like_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category_id: 1,
      })
    }

    return HttpResponse.json({
      id: Number(post.id),
      author: {
        id: Number(post.author.id),
        nickname: post.author.name,
        profile_img_url: post.author.profileImage || '',
      },
      title: post.title,
      content: post.content,
      thumbnail_img_url: post.imageUrl || null,
      comment_count: Number(post.comments),
      view_count: Number(post.views),
      like_count: Number(post.likes),
      created_at: post.createdAt,
      updated_at: post.createdAt,
      category_id: Number(post.category.id),
    })
  }
)

// 게시글 수정
export const updatePostMOCK = http.put(
  `${MSW_BASE_URL}/api/v1/posts/:postId`,
  async ({ params, request }) => {
    const id = Number(params.id ?? 0)
    const body = (await request.json()) as any
    return HttpResponse.json({ id, ...body })
  }
)
