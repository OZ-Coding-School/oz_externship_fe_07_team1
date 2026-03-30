import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCommentsAPI,
  createCommentAPI,
  deleteCommentAPI,
  updateCommentAPI,
  searchUserAPI,
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
export function useSearchUser(nickname: string) {
  return useQuery({
    queryKey: ['searchUser', nickname],
    queryFn: () => searchUserAPI(nickname),
    // nickname이 빈 칸이 아닐 때만 API 쏘기 (서버 과부하 방지)
    enabled: !!nickname,
    // 키보드 칠 때마다 너무 API 쏘지 않게 살짝 딜레이를 주는 캐시 설정
    staleTime: 1000 * 60 * 5,
  })
}
