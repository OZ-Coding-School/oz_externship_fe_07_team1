import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createPostAPI,
  getPostCategoriesAPI,
  getPostDetailAPI,
  updatePostAPI,
} from '../../api/postAPI'
import { useToast } from '../useToast'
import type {
  CreatePostRequest,
  CreatePostResponse,
  PostCategory,
  UpdatePostRequest,
} from '../../types'

// 카테고리 목록 조회
function usePostCategories() {
  return useQuery<PostCategory[]>({
    queryKey: ['postCategories'],
    queryFn: getPostCategoriesAPI,
  })
}

// 게시글 생성
function useCreatePost() {
  const { showToast } = useToast()

  return useMutation<CreatePostResponse, Error, CreatePostRequest>({
    mutationFn: createPostAPI,

    onSuccess: () => {
      showToast('success', '게시글 등록 완료', '게시글이 등록되었습니다!')
    },

    onError: () => {
      showToast(
        'default',
        '입력 오류',
        '카테고리, 제목, 내용은 필수 입력 사항입니다.'
      )
    },
  })
}

// 게시글 상세 조회
function usePostDetail(postId: string) {
  return useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetailAPI(Number(postId)),
    enabled: !!postId,
  })
}

// 게시글 수정
function useUpdatePost() {
  const { showToast } = useToast()

  return useMutation({
    mutationFn: ({
      postId,
      params,
    }: {
      postId: string
      params: UpdatePostRequest
    }) => updatePostAPI(postId, params),

    onSuccess: () => {
      showToast('success', '게시글 수정 완료', '게시글이 수정되었습니다!')
    },

    onError: () => {
      showToast(
        'default',
        '게시글 수정 실패',
        '게시글 수정 중 오류가 발생했습니다.'
      )
    },
  })
}

export { usePostCategories, useCreatePost, usePostDetail, useUpdatePost }
