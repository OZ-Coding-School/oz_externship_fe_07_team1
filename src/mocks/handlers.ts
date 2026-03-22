// handlers.ts
import {
  getPostCategoriesMOCK,
  createPostMOCK,
  getPostDetailMOCK,
  updatePostMOCK,
  getPostListMOCK,
} from './handlers/post-handlers'
import { commentHandlers } from './handlers/comment-handlers'
import { getRefreshTokenMOCK } from './handlers/auth-handlers'

export const handlers = [
  getPostCategoriesMOCK,
  getPostListMOCK,
  createPostMOCK,
  getPostDetailMOCK,
  updatePostMOCK,
  getRefreshTokenMOCK,
  ...commentHandlers,
]
