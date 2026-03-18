import { useMutation, useQuery } from '@tanstack/react-query'
import { createPostAPI, getPostCategoriesAPI } from '../../api/postAPI'
import { useToast } from '../useToast'
import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostCategoriesResponse,
} from '../../types'

function usePostCategories() {
  return useQuery<GetPostCategoriesResponse>({
    queryKey: ['postCategories'],
    queryFn: getPostCategoriesAPI,
  })
}

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

export { usePostCategories, useCreatePost }
