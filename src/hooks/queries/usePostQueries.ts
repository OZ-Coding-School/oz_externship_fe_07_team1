import { useMutation, useQuery } from '@tanstack/react-query'
import { createPostAPI, getPostCategoriesAPI } from '../../api/postAPI'
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
  return useMutation<CreatePostResponse, Error, CreatePostRequest>({
    mutationFn: createPostAPI,
  })
}

export { usePostCategories, useCreatePost }
