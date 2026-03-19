// handlers.ts
import { http, HttpResponse } from 'msw'
import {
  getPostCategoriesMOCK,
  createPostMOCK,
  getPostDetailMOCK,
  updatePostMOCK,
} from './handlers/post-handlers'

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.json({ message: 'Hello, world!', code: 200 })
  }),

  getPostCategoriesMOCK,
  createPostMOCK,
  getPostDetailMOCK,
  updatePostMOCK,
]
