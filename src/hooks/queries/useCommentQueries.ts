import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCommentsAPI,
  createCommentAPI,
  deleteCommentAPI,
  updateCommentAPI,
} from '../../api/commentAPI'
import type { CreateCommentRequest } from '../../types'

export function useComments(postId: number, page: number = 1) {
  return useQuery({
    queryKey: ['comments', postId, page],
    queryFn: () => getCommentsAPI(postId, page),
  })
}

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCommentRequest) => createCommentAPI(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })
}

export function useDeleteComment(postId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (commentId: number) => deleteCommentAPI(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })
}

export function useUpdateComment(postId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number
      content: string
    }) => updateCommentAPI(postId, commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })
}
