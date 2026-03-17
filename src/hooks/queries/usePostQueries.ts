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
      showToast('complete')
    },

    onError: () => {
      showToast('default')
    },
  })
}

export { usePostCategories, useCreatePost }
