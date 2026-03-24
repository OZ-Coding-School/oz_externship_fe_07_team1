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
import {
  getPresignedUrlMOCK,
  uploadImageToS3MOCK,
} from './handlers/image-handlers'

export const handlers = [
  getPostCategoriesMOCK,
  getPostListMOCK,
  createPostMOCK,
  getPostDetailMOCK,
  updatePostMOCK,
  getRefreshTokenMOCK,
  getPresignedUrlMOCK,
  uploadImageToS3MOCK,
  ...commentHandlers,
]
