import { http, HttpResponse } from 'msw'
import { postListData } from '../data/postListData'
import type { CreatePostRequest, CreatePostResponse } from '../../types'
import { MSW_BASE_URL } from '../../constants/baseUrl'

let postPk = 2

// 게시글 생성
export const createPostMOCK = http.post(
  `${MSW_BASE_URL}/posts`,
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
      id: postPk++,
    }

    return HttpResponse.json(response, { status: 201 })
  }
)

// 게시글 목록 조회
export const getPostListMOCK = http.get(`${MSW_BASE_URL}/posts`, () => {
  return HttpResponse.json({
    results: postListData,
    count: postListData.length,
  })
})

// 카테고리 목록 조회
export const getPostCategoriesMOCK = http.get(
  `${MSW_BASE_URL}/posts/categories`,
  () => {
    return HttpResponse.json({
      categories: [
        { id: 1, name: '자유 게시판' },
        { id: 2, name: '질문 게시판' },
        { id: 3, name: '구인/협업' },
      ],
    })
  }
)

// 게시글 상세 조회
export const getPostDetailMOCK = http.get(
  `${MSW_BASE_URL}/posts/:id`,
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
        is_liked: false,
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
      like_count: Number(post.like_count ?? 0),
      is_liked: Boolean(post.is_liked ?? false),
      created_at: post.createdAt,
      updated_at: post.createdAt,
      category_id: Number(post.category.id),
    })
  }
)

// 게시글 수정
export const updatePostMOCK = http.put(
  `${MSW_BASE_URL}/posts/:postId`,
  async ({ params, request }) => {
    const postId = Number(params.postId ?? 0)
    const body = (await request.json()) as any
    return HttpResponse.json({ id: postId, ...body })
  }
)

export const likePostMOCK = http.post(
  `${MSW_BASE_URL}/posts/:id/like`,
  ({ params }) => {
    const id = Number(params.id ?? 0)
    const post = postListData.find((p: any) => Number(p.id) === id)
    if (post) {
      post.is_liked = true
      post.like_count += 1
    }
    return HttpResponse.json({ success: true })
  }
)

export const unlikePostMOCK = http.delete(
  `${MSW_BASE_URL}/posts/:id/like`,
  ({ params }) => {
    const id = Number(params.id ?? 0)
    const post = postListData.find((p: any) => Number(p.id) === id)
    if (post) {
      post.is_liked = false
      post.like_count = Math.max(0, post.like_count - 1)
    }
    return HttpResponse.json({ success: true })
  }
)
