// handlers.ts
import {
  createPostMOCK,
  getPostDetailMOCK,
  updatePostMOCK,
  likePostMOCK,
  unlikePostMOCK,
  getPostCategoriesMOCK,
  getPostListMOCK,
} from './handlers/post-handlers'
import { commentHandlers } from './handlers/comment-handlers'
import { getRefreshTokenMOCK } from './handlers/auth-handlers'
import {
  getPresignedUrlMOCK,
  uploadImageToS3MOCK,
} from './handlers/image-handlers'

export const handlers = [
  getPostListMOCK,
  createPostMOCK,
  getPostDetailMOCK,
  updatePostMOCK,
  likePostMOCK,
  unlikePostMOCK,
  getPostCategoriesMOCK,
  getRefreshTokenMOCK,
  getPresignedUrlMOCK,
  uploadImageToS3MOCK,
  ...commentHandlers,
]
